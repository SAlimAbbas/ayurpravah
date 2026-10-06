<?php

namespace App\Filament\Resources\TicketTierResource\Pages;

use App\Filament\Resources\TicketTierResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListTicketTiers extends ListRecords
{
    protected static string $resource = TicketTierResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
