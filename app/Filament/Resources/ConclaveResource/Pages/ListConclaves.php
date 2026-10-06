<?php

namespace App\Filament\Resources\ConclaveResource\Pages;

use App\Filament\Resources\ConclaveResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListConclaves extends ListRecords
{
    protected static string $resource = ConclaveResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
