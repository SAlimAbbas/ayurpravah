<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PressItem extends Model
{
    protected $fillable = [
        'title',
        'source',
        'publication_date',
        'url',
        'excerpt',
        'media_path',
        'sort_order',
        'is_published',
    ];

    protected $casts = [
        'publication_date' => 'date',
        'is_published' => 'boolean',
        'sort_order' => 'integer',
    ];
}
