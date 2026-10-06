<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Conclave extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'layout',
        'short_description',
        'description',
        'focus_areas',
        'workshop_info',
        'image',
        'icon',
        'sort_order',
        'is_published',
    ];

    protected $casts = [
        'focus_areas' => 'array',
        'is_published' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function sessions(): HasMany
    {
        return $this->hasMany(EventSession::class)->orderBy('session_date')->orderBy('start_time');
    }
}
