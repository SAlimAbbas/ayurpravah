<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    protected $fillable = [
        'headline',
        'subtext',
        'image_path',
        'cta_primary_label',
        'cta_primary_link',
        'cta_secondary_label',
        'cta_secondary_link',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];
}
