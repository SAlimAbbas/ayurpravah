<?php

namespace App\Enums;

enum PaymentStatus: string
{
    case CREATED = 'created';
    case AUTHORIZED = 'authorized';
    case CAPTURED = 'captured';
    case FAILED = 'failed';
    case REFUNDED = 'refunded';

    public function label(): string
    {
        return match ($this) {
            self::CREATED => 'Order Created',
            self::AUTHORIZED => 'Authorized',
            self::CAPTURED => 'Captured / Successful',
            self::FAILED => 'Failed',
            self::REFUNDED => 'Refunded',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::CREATED => 'gray',
            self::AUTHORIZED => 'warning',
            self::CAPTURED => 'success',
            self::FAILED => 'danger',
            self::REFUNDED => 'info',
        };
    }
}
