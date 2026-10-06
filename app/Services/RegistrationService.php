<?php

namespace App\Services;

use App\Enums\PaymentStatus;
use App\Enums\RegistrationStatus;
use App\Enums\TicketStatus;
use App\Models\Payment;
use App\Models\Registration;
use App\Models\TicketTier;
use App\Services\PaymentGateway\PaymentGatewayInterface;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RegistrationService
{
    public function __construct(
        protected PricingService $pricingService,
        protected CouponService $couponService,
        protected PaymentGatewayInterface $gateway,
        protected TicketService $ticketService
    ) {}

    /**
     * Create or update draft registration.
     */
    public function createOrUpdateDraft(array $data, ?string $uuid = null): Registration
    {
        $regUuid = $uuid ?? (string) Str::uuid();
        
        $tier = TicketTier::findOrFail($data['tier_id']);
        $quote = $this->pricingService->calculateQuote($tier->id, $data['coupon_code'] ?? null);

        $reference = 'AP27-' . strtoupper(Str::random(6));

        $registration = Registration::updateOrCreate(
            ['uuid' => $regUuid],
            [
                'reference' => $reference,
                'type' => $data['type'] ?? 'delegate',
                'tier_id' => $tier->id,
                'status' => RegistrationStatus::DRAFT,
                'title' => $data['title'] ?? 'Dr.',
                'full_name' => $data['full_name'],
                'email' => strtolower(trim($data['email'])),
                'phone' => trim($data['phone']),
                'gender' => $data['gender'] ?? null,
                'organisation_college' => $data['organisation_college'] ?? null,
                'designation' => $data['designation'] ?? null,
                'city' => $data['city'] ?? null,
                'state' => $data['state'] ?? null,
                'country' => $data['country'] ?? 'India',
                'registration_council_no' => $data['registration_council_no'] ?? null,
                'gstin' => $data['gstin'] ?? null,
                'dietary_special_needs' => $data['dietary_special_needs'] ?? null,
                'coupon_id' => $quote['coupon_id'],
                'subtotal' => $quote['subtotal'],
                'discount' => $quote['discount'],
                'tax' => $quote['tax'],
                'total' => $quote['total'],
                'currency' => $quote['currency'],
                'utm_source' => $data['utm_source'] ?? null,
                'utm_medium' => $data['utm_medium'] ?? null,
                'utm_campaign' => $data['utm_campaign'] ?? null,
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
                'consent_terms' => true,
            ]
        );

        return $registration;
    }

    /**
     * Checkout initiation: creates gateway order or confirms free tier.
     */
    public function initiateCheckout(Registration $registration): array
    {
        return DB::transaction(function () use ($registration) {
            // Re-lock and calculate quote fresh
            $tier = TicketTier::where('id', $registration->tier_id)->lockForUpdate()->firstOrFail();

            if (!$tier->isAvailable()) {
                throw new Exception("Tier '{$tier->name}' quota is full or unavailable.");
            }

            // Reserve hold for 15 minutes
            $registration->update([
                'status' => RegistrationStatus::PENDING,
                'hold_expires_at' => now()->addMinutes(15),
            ]);

            // If 100% discount or free order
            if ($registration->total === 0) {
                return $this->completeFreeRegistration($registration);
            }

            // Create gateway order
            $gatewayOrder = $this->gateway->createOrder($registration);

            // Record initial payment record
            Payment::create([
                'registration_id' => $registration->id,
                'gateway' => 'razorpay',
                'gateway_order_id' => $gatewayOrder['order_id'],
                'amount' => $registration->total,
                'currency' => $registration->currency,
                'status' => PaymentStatus::CREATED,
            ]);

            return [
                'type' => 'gateway',
                'order' => $gatewayOrder,
                'registration' => [
                    'uuid' => $registration->uuid,
                    'reference' => $registration->reference,
                    'name' => $registration->full_name,
                    'email' => $registration->email,
                    'phone' => $registration->phone,
                    'total' => $registration->total,
                ],
            ];
        });
    }

    /**
     * Handle payment webhook confirmation (source of truth).
     */
    public function handlePaymentCaptured(string $orderId, string $paymentId, array $rawPayload): Registration
    {
        return DB::transaction(function () use ($orderId, $paymentId, $rawPayload) {
            $payment = Payment::where('gateway_order_id', $orderId)->lockForUpdate()->firstOrFail();
            $registration = $payment->registration()->lockForUpdate()->firstOrFail();

            if ($registration->status === RegistrationStatus::PAID) {
                // Idempotent: already confirmed
                return $registration;
            }

            $payment->update([
                'gateway_payment_id' => $paymentId,
                'status' => PaymentStatus::CAPTURED,
                'raw_payload' => $rawPayload,
                'signature_verified' => true,
                'captured_at' => now(),
            ]);

            $registration->update([
                'status' => RegistrationStatus::PAID,
                'hold_expires_at' => null,
            ]);

            // Increment sold count on tier
            $registration->tier()->increment('sold_count');

            // Record coupon usage
            if ($registration->coupon_id) {
                $this->couponService->recordUsage($registration->coupon_id);
            }

            // Issue ticket & generate pass
            $this->ticketService->issueTicket($registration);

            return $registration;
        });
    }

    /**
     * Manual offline status override (for bank transfer / desk payments).
     */
    public function manualOverride(Registration $registration, string $staffName, string $reason): Registration
    {
        return DB::transaction(function () use ($registration, $staffName, $reason) {
            $registration->update([
                'status' => RegistrationStatus::PAID,
                'manual_override' => true,
                'override_by' => $staffName,
                'override_reason' => $reason,
                'hold_expires_at' => null,
            ]);

            $registration->tier()->increment('sold_count');
            $this->ticketService->issueTicket($registration);

            return $registration;
        });
    }

    /**
     * Process registration refund.
     */
    public function refundRegistration(Registration $registration, string $staffName, string $notes): void
    {
        DB::transaction(function () use ($registration, $staffName, $notes) {
            $registration->update([
                'status' => RegistrationStatus::REFUNDED,
                'refund_flag' => true,
                'refund_notes' => "Processed by {$staffName}: {$notes}",
                'refunded_at' => now(),
            ]);

            // Void associated ticket
            if ($registration->ticket) {
                $registration->ticket->update(['status' => TicketStatus::VOID]);
            }

            // Release tier quota
            $registration->tier()->where('sold_count', '>', 0)->decrement('sold_count');

            // Refund payments via gateway if online
            foreach ($registration->payments as $payment) {
                if ($payment->status === PaymentStatus::CAPTURED) {
                    $this->gateway->refund($payment, $payment->amount, $notes);
                    $payment->update(['status' => PaymentStatus::REFUNDED]);
                }
            }
        });
    }

    protected function completeFreeRegistration(Registration $registration): array
    {
        $registration->update([
            'status' => RegistrationStatus::PAID,
            'hold_expires_at' => null,
        ]);

        $registration->tier()->increment('sold_count');

        if ($registration->coupon_id) {
            $this->couponService->recordUsage($registration->coupon_id);
        }

        $ticket = $this->ticketService->issueTicket($registration);

        return [
            'type' => 'free_confirmed',
            'ticket_code' => $ticket->ticket_code,
            'reference' => $registration->reference,
        ];
    }
}
