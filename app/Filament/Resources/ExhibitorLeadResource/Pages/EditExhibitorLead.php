<?php

namespace App\Filament\Resources\ExhibitorLeadResource\Pages;

use App\Filament\Resources\ExhibitorLeadResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditExhibitorLead extends EditRecord
{
    protected static string $resource = ExhibitorLeadResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
