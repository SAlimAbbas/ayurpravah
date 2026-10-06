<?php

namespace App\Services;

use App\Models\Coupon;
use App\Models\TicketTier;
use Exception;

class PricingService
{
    public function __construct(
        protected CouponService $couponService
    ) {}

    /**
     * Calculate server-authoritative pricing quote.
     * All monetary amounts are in minor units (paise).
     *
     * @param int $tierId
     * @param string|null $couponCode
     * @param int $quantity
     * @return array
     */
    public function calculateQuote(int $tierId, ?string $couponCode = null, int $quantity = 1): array
    {
        $tier = TicketTier::findOrFail($tierId);

        if (!$tier->isAvailable()) {
            throw new Exception("The selected ticket tier '{$tier->name}' is currently unavailable or sold out.");
        }

        $basePrice = $tier->price * $quantity;
        $discount = 0;
        $appliedCoupon = null;

        if (!empty($couponCode)) {
            $couponResult = $this->couponService->validateAndCalculate($couponCode, $tierId, $basePrice);
            if ($couponResult['valid']) {
                $discount = $couponResult['discount_amount'];
                $appliedCoupon = $couponResult['coupon'];
            }
        }

        $taxableAmount = max(0, $basePrice - $discount);
        $tax = (int) round(($taxableAmount * $tier->gst_percent) / 100);
        $total = $taxableAmount + $tax;

        return [
            'tier_id' => $tier->id,
            'tier_name' => $tier->name,
            'quantity' => $quantity,
            'currency' => $tier->currency,
            'unit_price' => $tier->price,
            'subtotal' => $basePrice,
            'discount' => $discount,
            'gst_percent' => (float) $tier->gst_percent,
            'tax' => $tax,
            'total' => $total,
            'coupon_id' => $appliedCoupon?->id,
            'coupon_code' => $appliedCoupon?->code,
            'is_free' => ($total === 0),
        ];
    }
}
