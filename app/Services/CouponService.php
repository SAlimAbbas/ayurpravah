<?php

namespace App\Services;

use App\Enums\DiscountType;
use App\Models\Coupon;
use Illuminate\Support\Facades\DB;

class CouponService
{
    /**
     * Validate coupon and calculate discount on given base price.
     *
     * @param string $code
     * @param int $tierId
     * @param int $subtotal In minor units (paise)
     * @return array
     */
    public function validateAndCalculate(string $code, int $tierId, int $subtotal): array
    {
        $normalizedCode = strtoupper(trim($code));
        $coupon = Coupon::where('code', $normalizedCode)->first();

        if (!$coupon) {
            return [
                'valid' => false,
                'message' => 'Invalid promotional coupon code.',
                'discount_amount' => 0,
                'coupon' => null,
            ];
        }

        if (!$coupon->isValidForTier($tierId)) {
            return [
                'valid' => false,
                'message' => 'Coupon is expired, exhausted, or not applicable to this category.',
                'discount_amount' => 0,
                'coupon' => null,
            ];
        }

        $discount = 0;
        if ($coupon->discount_type === DiscountType::PERCENT) {
            $discount = (int) round(($subtotal * (float) $coupon->value) / 100);
            if ($coupon->max_discount !== null) {
                $maxPaise = (int) round((float) $coupon->max_discount * 100);
                $discount = min($discount, $maxPaise);
            }
        } elseif ($coupon->discount_type === DiscountType::FLAT) {
            $flatPaise = (int) round((float) $coupon->value * 100);
            $discount = min($subtotal, $flatPaise);
        }

        return [
            'valid' => true,
            'message' => 'Coupon applied successfully.',
            'discount_amount' => $discount,
            'coupon' => $coupon,
        ];
    }

    /**
     * Atomically increment usage of coupon.
     */
    public function recordUsage(int $couponId): void
    {
        DB::table('coupons')->where('id', $couponId)->increment('used_count');
    }

    /**
     * Release coupon usage in case of failed payment.
     */
    public function releaseUsage(int $couponId): void
    {
        DB::table('coupons')->where('id', $couponId)->where('used_count', '>', 0)->decrement('used_count');
    }
}
