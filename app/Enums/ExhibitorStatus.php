<?php

namespace App\Enums;

enum ExhibitorStatus: string
{
    case NEW = 'new';
    case CONTACTED = 'contacted';
    case QUALIFIED = 'qualified';
    case CONFIRMED = 'confirmed';
    case LOST = 'lost';

    public function label(): string
    {
        return match ($this) {
            self::NEW => 'New Lead',
            self::CONTACTED => 'Contacted',
            self::QUALIFIED => 'Qualified',
            self::CONFIRMED => 'Confirmed Exhibitor',
            self::LOST => 'Lost / Closed',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::NEW => 'gray',
            self::CONTACTED => 'info',
            self::QUALIFIED => 'warning',
            self::CONFIRMED => 'success',
            self::LOST => 'danger',
        };
    }
}
