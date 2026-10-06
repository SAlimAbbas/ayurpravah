<?php

namespace App\Models;

use App\Enums\AbstractStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AbstractSubmission extends Model
{
    protected $fillable = [
        'uuid',
        'author_name',
        'author_email',
        'author_phone',
        'affiliation',
        'co_authors',
        'title',
        'track_category',
        'conclave_id',
        'abstract_text',
        'keywords',
        'file_path',
        'presentation_type',
        'status',
        'reviewer_id',
        'review_notes',
        'score',
        'decision_at',
    ];

    protected $casts = [
        'co_authors' => 'array',
        'status' => AbstractStatus::class,
        'score' => 'decimal:2',
        'decision_at' => 'datetime',
    ];

    public function conclave(): BelongsTo
    {
        return $this->belongsTo(Conclave::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }
}
