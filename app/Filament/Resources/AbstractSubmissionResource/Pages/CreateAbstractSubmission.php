<?php

namespace App\Filament\Resources\AbstractSubmissionResource\Pages;

use App\Filament\Resources\AbstractSubmissionResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Str;

class CreateAbstractSubmission extends CreateRecord
{
    protected static string $resource = AbstractSubmissionResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['uuid'] = (string) Str::uuid();
        return $data;
    }
}
