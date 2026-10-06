<?php

namespace App\Models;

use App\Enums\RegistrationStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Registration extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'uuid',
        'reference',
        'type',
        'tier_id',
        'status',
        'title',
        'full_name',
        'email',
        'phone',
        'gender',
        'organisation_college',
        'designation',
        'city',
        'state',
        'country',
        'registration_council_no',
        'gstin',
        'dietary_special_needs',
        'coupon_id',
        'subtotal',
        'discount',
        'tax',
        'total',
        'currency',
        'manual_override',
        'override_by',
        'override_reason',
        'refund_flag',
        'refund_notes',
        'refunded_at',
        'hold_expires_at',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'ip_address',
        'user_agent',
        'consent_terms',
    ];

    protected $casts = [
        'status' => RegistrationStatus::class,
        'subtotal' => 'integer',
        'discount' => 'integer',
        'tax' => 'integer',
        'total' => 'integer',
        'manual_override' => 'boolean',
        'refund_flag' => 'boolean',
        'refunded_at' => 'datetime',
        'hold_expires_at' => 'datetime',
        'consent_terms' => 'boolean',
    ];

    public function tier(): BelongsTo
    {
        return $this->belongsTo(TicketTier::class, 'tier_id');
    }

    public function coupon(): BelongsTo
    {
        return $this->belongsTo(Coupon::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function ticket(): HasOne
    {
        return $this->hasOne(Ticket::class);
    }
}
