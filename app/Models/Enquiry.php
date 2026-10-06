<?php

namespace App\Models;

use App\Enums\EnquiryStatus;
use App\Enums\EnquiryType;
use Illuminate\Database\Eloquent\Model;

class Enquiry extends Model
{
    protected $fillable = [
        'type',
        'department',
        'name',
        'organisation',
        'email',
        'phone',
        'message',
        'status',
        'assigned_to',
        'notes',
    ];

    protected $casts = [
        'type' => EnquiryType::class,
        'status' => EnquiryStatus::class,
    ];
}
