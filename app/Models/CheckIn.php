<?php

namespace App\Models;

use App\Enums\CheckInResult;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CheckIn extends Model
{
    protected $fillable = [
        'ticket_id',
        'scanned_by',
        'scanned_at',
        'device',
        'result',
        'gate_hall',
    ];

    protected $casts = [
        'scanned_at' => 'datetime',
        'result' => CheckInResult::class,
    ];

    public function ticket(): BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }

    public function staff(): BelongsTo
    {
        return $this->belongsTo(User::class, 'scanned_by');
    }
}
