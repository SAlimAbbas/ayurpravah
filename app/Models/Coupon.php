<?php

namespace App\Models;

use App\Enums\DiscountType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Coupon extends Model
{
    protected $fillable = [
        'code',
        'discount_type',
        'value',
        'max_discount',
        'usage_limit',
        'per_user_limit',
        'used_count',
        'valid_from',
        'expires_at',
        'applicable_tier_ids',
        'is_active',
    ];

    protected $casts = [
        'discount_type' => DiscountType::class,
        'value' => 'decimal:2',
        'max_discount' => 'decimal:2',
        'usage_limit' => 'integer',
        'per_user_limit' => 'integer',
        'used_count' => 'integer',
        'valid_from' => 'datetime',
        'expires_at' => 'datetime',
        'applicable_tier_ids' => 'array',
        'is_active' => 'boolean',
    ];

    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }

    public function isValidForTier(int $tierId): bool
    {
        if (!$this->is_active) {
            return false;
        }

        $now = now();
        if ($this->valid_from && $now->lt($this->valid_from)) {
            return false;
        }

        if ($this->expires_at && $now->gt($this->expires_at)) {
            return false;
        }

        if ($this->usage_limit > 0 && $this->used_count >= $this->usage_limit) {
            return false;
        }

        if (!empty($this->applicable_tier_ids) && !in_array($tierId, $this->applicable_tier_ids)) {
            return false;
        }

        return true;
    }
}
