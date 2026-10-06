<?php

namespace App\Filament\Resources\ConclaveResource\Pages;

use App\Filament\Resources\ConclaveResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditConclave extends EditRecord
{
    protected static string $resource = ConclaveResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
