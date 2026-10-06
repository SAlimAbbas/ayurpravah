<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventSession extends Model
{
    use SoftDeletes;

    protected $table = 'event_sessions';

    protected $fillable = [
        'conclave_id',
        'title',
        'description',
        'day_number',
        'session_date',
        'start_time',
        'end_time',
        'hall_room',
        'track',
        'type',
        'sort_order',
        'is_published',
    ];

    protected $casts = [
        'session_date' => 'date',
        'day_number' => 'integer',
        'is_published' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function conclave(): BelongsTo
    {
        return $this->belongsTo(Conclave::class);
    }

    public function speakers(): BelongsToMany
    {
        return $this->belongsToMany(Speaker::class, 'event_session_speaker')
            ->withPivot('role')
            ->withTimestamps();
    }
}
