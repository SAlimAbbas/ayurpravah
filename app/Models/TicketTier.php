<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class TicketTier extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'category',
        'price', // minor units (paise)
        'currency',
        'gst_percent',
        'valid_from',
        'valid_until',
        'quota',
        'sold_count',
        'is_active',
        'sort_order',
        'inclusions',
    ];

    protected $casts = [
        'price' => 'integer',
        'gst_percent' => 'decimal:2',
        'valid_from' => 'datetime',
        'valid_until' => 'datetime',
        'quota' => 'integer',
        'sold_count' => 'integer',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'inclusions' => 'array',
    ];

    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class, 'tier_id');
    }

    public function isAvailable(): bool
    {
        if (!$this->is_active) {
            return false;
        }

        $now = now();
        if ($this->valid_from && $now->lt($this->valid_from)) {
            return false;
        }

        if ($this->valid_until && $now->gt($this->valid_until)) {
            return false;
        }

        if ($this->quota > 0 && $this->sold_count >= $this->quota) {
            return false;
        }

        return true;
    }
}
