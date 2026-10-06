<?php

namespace App\Enums;

enum EnquiryStatus: string
{
    case NEW = 'new';
    case READ = 'read';
    case IN_PROGRESS = 'in_progress';
    case RESOLVED = 'resolved';
    case ARCHIVED = 'archived';

    public function label(): string
    {
        return match ($this) {
            self::NEW => 'New',
            self::READ => 'Read',
            self::IN_PROGRESS => 'In Progress',
            self::RESOLVED => 'Resolved',
            self::ARCHIVED => 'Archived',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::NEW => 'danger',
            self::READ => 'gray',
            self::IN_PROGRESS => 'warning',
            self::RESOLVED => 'success',
            self::ARCHIVED => 'gray',
        };
    }
}
