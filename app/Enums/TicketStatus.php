<?php

namespace App\Enums;

enum TicketStatus: string
{
    case ACTIVE = 'active';
    case CHECKED_IN = 'checked_in';
    case VOID = 'void';

    public function label(): string
    {
        return match ($this) {
            self::ACTIVE => 'Active & Valid',
            self::CHECKED_IN => 'Checked In',
            self::VOID => 'Void / Cancelled',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::ACTIVE => 'success',
            self::CHECKED_IN => 'info',
            self::VOID => 'danger',
        };
    }
}
