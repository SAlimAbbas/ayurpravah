<?php

namespace App\Enums;

enum EnquiryType: string
{
    case PARTNER = 'partner';
    case SPONSORSHIP = 'sponsorship';
    case CONTACT = 'contact';

    public function label(): string
    {
        return match ($this) {
            self::PARTNER => 'Partner Enquiry',
            self::SPONSORSHIP => 'Sponsorship Enquiry',
            self::CONTACT => 'General / Department Contact',
        };
    }
}
