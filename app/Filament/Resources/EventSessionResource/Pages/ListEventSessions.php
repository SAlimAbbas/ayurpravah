<?php

namespace App\Filament\Resources\EventSessionResource\Pages;

use App\Filament\Resources\EventSessionResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListEventSessions extends ListRecords
{
    protected static string $resource = EventSessionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
