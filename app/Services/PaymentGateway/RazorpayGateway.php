<?php

namespace App\Services\PaymentGateway;

use App\Models\Payment;
use App\Models\Registration;
use Exception;
use Illuminate\Support\Facades\Log;
use Razorpay\Api\Api;

class RazorpayGateway implements PaymentGatewayInterface
{
    protected ?Api $api = null;
    protected string $keyId;
    protected string $keySecret;
    protected string $webhookSecret;

    public function __construct()
    {
        $this->keyId = config('services.razorpay.key', env('RAZORPAY_KEY_ID', 'rzp_test_placeholder'));
        $this->keySecret = config('services.razorpay.secret', env('RAZORPAY_KEY_SECRET', 'rzp_secret_placeholder'));
        $this->webhookSecret = env('RAZORPAY_WEBHOOK_SECRET', 'rzp_webhook_secret_placeholder');

        if ($this->keyId !== 'rzp_test_placeholder' && !empty($this->keySecret)) {
            $this->api = new Api($this->keyId, $this->keySecret);
        }
    }

    public function createOrder(Registration $registration): array
    {
        $amountPaise = $registration->total;
        $orderData = [
            'receipt' => $registration->reference,
            'amount' => $amountPaise,
            'currency' => $registration->currency ?? 'INR',
            'notes' => [
                'registration_uuid' => $registration->uuid,
                'email' => $registration->email,
                'tier' => $registration->tier->name,
            ],
        ];

        if ($this->api) {
            try {
                $razorpayOrder = $this->api->order->create($orderData);
                return [
                    'order_id' => $razorpayOrder['id'],
                    'amount' => $razorpayOrder['amount'],
                    'currency' => $razorpayOrder['currency'],
                    'key_id' => $this->keyId,
                ];
            } catch (Exception $e) {
                Log::error('Razorpay Order Creation Failed: ' . $e->getMessage(), ['uuid' => $registration->uuid]);
                throw $e;
            }
        }

        // Mock test mode when running with placeholder keys
        $mockOrderId = 'order_mock_' . bin2hex(random_bytes(8));
        return [
            'order_id' => $mockOrderId,
            'amount' => $amountPaise,
            'currency' => $registration->currency ?? 'INR',
            'key_id' => $this->keyId,
        ];
    }

    public function verifySignature(array $payload, string $signature): bool
    {
        if ($this->api) {
            try {
                $this->api->utility->verifyPaymentSignature([
                    'razorpay_order_id' => $payload['order_id'],
                    'razorpay_payment_id' => $payload['payment_id'],
                    'razorpay_signature' => $signature,
                ]);
                return true;
            } catch (Exception $e) {
                Log::warning('Razorpay signature verification failed: ' . $e->getMessage());
                return false;
            }
        }

        // Mock mode validation
        return !empty($signature);
    }

    public function verifyWebhookSignature(string $rawBody, string $signature, string $secret): bool
    {
        $expectedSignature = hash_hmac('sha256', $rawBody, $secret);
        return hash_equals($expectedSignature, $signature);
    }

    public function refund(Payment $payment, ?int $amountPaise = null, string $reason = 'Requested by admin'): array
    {
        $refundAmount = $amountPaise ?? $payment->amount;

        if ($this->api && $payment->gateway_payment_id) {
            try {
                $paymentObj = $this->api->payment->fetch($payment->gateway_payment_id);
                $refund = $paymentObj->refund([
                    'amount' => $refundAmount,
                    'notes' => ['reason' => $reason],
                ]);

                return [
                    'success' => true,
                    'refund_id' => $refund['id'],
                    'amount' => $refund['amount'],
                ];
            } catch (Exception $e) {
                Log::error('Razorpay Refund Failed: ' . $e->getMessage());
                return ['success' => false, 'error' => $e->getMessage()];
            }
        }

        return [
            'success' => true,
            'refund_id' => 'rfnd_mock_' . bin2hex(random_bytes(6)),
            'amount' => $refundAmount,
        ];
    }
}
