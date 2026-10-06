<?php

namespace App\Filament\Resources\AbstractSubmissionResource\Pages;

use App\Filament\Resources\AbstractSubmissionResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAbstractSubmissions extends ListRecords
{
    protected static string $resource = AbstractSubmissionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
