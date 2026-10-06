<?php

namespace App\Services\PaymentGateway;

use App\Models\Payment;
use App\Models\Registration;

interface PaymentGatewayInterface
{
    /**
     * Create gateway order for a payable registration.
     */
    public function createOrder(Registration $registration): array;

    /**
     * Verify payment signature from checkout callback.
     */
    public function verifySignature(array $payload, string $signature): bool;

    /**
     * Verify webhook signature.
     */
    public function verifyWebhookSignature(string $rawBody, string $signature, string $secret): bool;

    /**
     * Process refund for a captured payment.
     */
    public function refund(Payment $payment, ?int $amountPaise = null, string $reason = 'Requested by admin'): array;
}
