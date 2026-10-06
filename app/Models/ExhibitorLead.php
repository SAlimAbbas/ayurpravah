<?php

namespace App\Models;

use App\Enums\ExhibitorStatus;
use Illuminate\Database\Eloquent\Model;

class ExhibitorLead extends Model
{
    protected $fillable = [
        'uuid',
        'company',
        'contact_person',
        'email',
        'phone',
        'website',
        'category_industry',
        'stall_interest',
        'stall_size',
        'products_brief',
        'budget_note',
        'message',
        'status',
        'assigned_to',
        'notes',
        'source',
    ];

    protected $casts = [
        'status' => ExhibitorStatus::class,
    ];
}
