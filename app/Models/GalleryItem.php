<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class GalleryItem extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'album_id',
        'type', // image, video
        'media_path',
        'video_url',
        'caption',
        'alt_text',
        'sort_order',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'sort_order' => 'integer',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        if (!$this->media_path) {
            return null;
        }

        if (str_starts_with($this->media_path, 'http://') || str_starts_with($this->media_path, 'https://')) {
            return $this->media_path;
        }

        return asset('storage/' . ltrim($this->media_path, '/'));
    }

    public function album(): BelongsTo
    {
        return $this->belongsTo(Album::class);
    }
}
