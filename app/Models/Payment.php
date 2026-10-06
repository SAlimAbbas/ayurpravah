<?php

namespace App\Models;

use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    protected $fillable = [
        'registration_id',
        'gateway',
        'gateway_order_id',
        'gateway_payment_id',
        'amount',
        'currency',
        'status',
        'method',
        'raw_payload',
        'signature_verified',
        'captured_at',
    ];

    protected $casts = [
        'amount' => 'integer',
        'status' => PaymentStatus::class,
        'raw_payload' => 'array',
        'signature_verified' => 'boolean',
        'captured_at' => 'datetime',
    ];

    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }
}
