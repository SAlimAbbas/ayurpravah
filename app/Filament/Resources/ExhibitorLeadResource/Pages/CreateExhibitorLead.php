<?php

namespace App\Filament\Resources\ExhibitorLeadResource\Pages;

use App\Filament\Resources\ExhibitorLeadResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Str;

class CreateExhibitorLead extends CreateRecord
{
    protected static string $resource = ExhibitorLeadResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['uuid'] = (string) Str::uuid();
        return $data;
    }
}
