<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AccommodationBooking extends Model
{
    protected $fillable = [
        'registration_id',
        'name',
        'email',
        'phone',
        'check_in_date',
        'check_out_date',
        'room_type',
        'rooms_count',
        'status',
        'allocated_room_ref',
        'notes',
    ];

    protected $casts = [
        'check_in_date' => 'date',
        'check_out_date' => 'date',
        'rooms_count' => 'integer',
    ];

    public function accommodation(): BelongsTo
    {
        return $this->belongsTo(Accommodation::class);
    }

    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }
}
