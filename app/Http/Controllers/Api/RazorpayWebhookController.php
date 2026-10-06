<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WebhookEvent;
use App\Services\PaymentGateway\PaymentGatewayInterface;
use App\Services\RegistrationService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RazorpayWebhookController extends Controller
{
    public function __construct(
        protected PaymentGatewayInterface $gateway,
        protected RegistrationService $registrationService
    ) {}

    public function handle(Request $request): JsonResponse
    {
        $signature = $request->header('X-Razorpay-Signature', '');
        $rawBody = $request->getContent();
        $secret = env('RAZORPAY_WEBHOOK_SECRET', 'rzp_webhook_secret_placeholder');

        // Allow mock webhook bypass during local/testing mode if placeholder key is set
        $isTestMode = ($secret === 'rzp_webhook_secret_placeholder' && app()->environment('local', 'testing'));
        if (!$isTestMode && !$this->gateway->verifyWebhookSignature($rawBody, $signature, $secret)) {
            Log::warning('Razorpay webhook signature verification failed.');
            return response()->json(['error' => 'Invalid webhook signature'], 400);
        }

        $payload = json_decode($rawBody, true);
        if (!$payload || !isset($payload['event'])) {
            return response()->json(['error' => 'Invalid JSON payload'], 400);
        }

        $eventId = $payload['event_id'] ?? ('evt_' . md5($rawBody));
        $eventType = $payload['event'];

        // Idempotency: check if already received and processed
        $existingEvent = WebhookEvent::where('event_id', $eventId)->first();
        if ($existingEvent) {
            return response()->json(['status' => 'already_processed', 'event_id' => $eventId], 200);
        }

        $webhookLog = WebhookEvent::create([
            'gateway' => 'razorpay',
            'event_id' => $eventId,
            'type' => $eventType,
            'payload' => $payload,
            'status' => 'processing',
        ]);

        try {
            if ($eventType === 'payment.captured' || $eventType === 'order.paid') {
                $paymentEntity = $payload['payload']['payment']['entity'] ?? [];
                $orderId = $paymentEntity['order_id'] ?? ($payload['payload']['order']['entity']['id'] ?? null);
                $paymentId = $paymentEntity['id'] ?? 'mock_pay_id';

                if ($orderId) {
                    $this->registrationService->handlePaymentCaptured($orderId, $paymentId, $payload);
                }
            }

            $webhookLog->update([
                'status' => 'processed',
                'processed_at' => now(),
            ]);

            return response()->json(['status' => 'ok']);
        } catch (Exception $e) {
            Log::error("Webhook processing error for event {$eventId}: " . $e->getMessage());
            $webhookLog->update([
                'status' => 'failed',
                'error' => $e->getMessage(),
            ]);

            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
