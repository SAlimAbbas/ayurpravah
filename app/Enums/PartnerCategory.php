<?php

namespace App\Enums;

enum PartnerCategory: string
{
    case ORGANIZED_BY = 'Organized By';
    case KNOWLEDGE = 'Knowledge Partners';
    case ASSOCIATE = 'Associate Partners';
    case TECHNOLOGY = 'Technology Partners';
    case INDUSTRY = 'Industry Partners';
    case MEDIA = 'Media Partners';

    public function label(): string
    {
        return $this->value;
    }
}
