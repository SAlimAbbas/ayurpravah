<?php

namespace App\Enums;

enum DiscountType: string
{
    case PERCENT = 'percent';
    case FLAT = 'flat';

    public function label(): string
    {
        return match ($this) {
            self::PERCENT => 'Percentage (%)',
            self::FLAT => 'Flat Amount (INR)',
        };
    }
}
