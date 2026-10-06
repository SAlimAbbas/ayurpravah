<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Accommodation extends Model
{
    protected $fillable = [
        'name',
        'description',
        'images',
        'price_note',
        'distance',
        'booking_url',
        'contact_info',
        'rooms_total',
        'is_published',
        'sort_order',
    ];

    protected $casts = [
        'images' => 'array',
        'rooms_total' => 'integer',
        'is_published' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function bookings(): HasMany
    {
        return $this->hasMany(AccommodationBooking::class);
    }
}
