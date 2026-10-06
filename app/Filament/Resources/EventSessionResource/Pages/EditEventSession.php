<?php

namespace App\Filament\Resources\EventSessionResource\Pages;

use App\Filament\Resources\EventSessionResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditEventSession extends EditRecord
{
    protected static string $resource = EventSessionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
