<?php

namespace App\Enums;

enum AbstractStatus: string
{
    case SUBMITTED = 'submitted';
    case UNDER_REVIEW = 'under_review';
    case ACCEPTED = 'accepted';
    case REJECTED = 'rejected';
    case REVISION = 'revision';

    public function label(): string
    {
        return match ($this) {
            self::SUBMITTED => 'Submitted',
            self::UNDER_REVIEW => 'Under Review',
            self::ACCEPTED => 'Accepted',
            self::REJECTED => 'Rejected',
            self::REVISION => 'Revision Requested',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::SUBMITTED => 'gray',
            self::UNDER_REVIEW => 'warning',
            self::ACCEPTED => 'success',
            self::REJECTED => 'danger',
            self::REVISION => 'info',
        };
    }
}
