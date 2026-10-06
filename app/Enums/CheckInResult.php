<?php

namespace App\Enums;

enum CheckInResult: string
{
    case OK = 'ok';
    case DUPLICATE = 'duplicate';
    case INVALID = 'invalid';
    case VOID = 'void';
    case UNPAID = 'unpaid';

    public function label(): string
    {
        return match ($this) {
            self::OK => 'Verified Entry (OK)',
            self::DUPLICATE => 'Duplicate Scan (Already Checked In)',
            self::INVALID => 'Invalid Ticket Code',
            self::VOID => 'Void / Cancelled / Refunded',
            self::UNPAID => 'Registration Unpaid',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::OK => 'success',
            self::DUPLICATE => 'warning',
            self::INVALID, self::VOID, self::UNPAID => 'danger',
        };
    }
}
