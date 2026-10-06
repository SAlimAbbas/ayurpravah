<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AccommodationResource\Pages;
use App\Models\Accommodation;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class AccommodationResource extends Resource
{
    protected static ?string $model = Accommodation::class;
    protected static ?string $navigationIcon = 'heroicon-o-home-modern';
    protected static ?string $navigationGroup = 'Hospitality & Logistics';
    protected static ?string $navigationLabel = 'Hotels & Accommodation';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Hotel Property Information')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('price_note')
                            ->placeholder('e.g. Special Conclave Rate: ₹4,500 / night'),
                        Forms\Components\TextInput::make('distance')
                            ->placeholder('e.g. 1.2 km from Main Conclave Venue'),
                        Forms\Components\TextInput::make('booking_url')
                            ->url()
                            ->placeholder('https://'),
                        Forms\Components\TextInput::make('contact_info')
                            ->placeholder('e.g. +91 11 2345 6789 / reservations@hotel.com'),
                        Forms\Components\TextInput::make('rooms_total')
                            ->numeric()
                            ->default(50),
                        Forms\Components\Textarea::make('description')
                            ->rows(3)
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('sort_order')
                            ->numeric()
                            ->default(0),
                        Forms\Components\Toggle::make('is_published')
                            ->default(true),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('distance')
                    ->badge(),
                Tables\Columns\TextColumn::make('price_note'),
                Tables\Columns\TextColumn::make('rooms_total')
                    ->label('Room Quota'),
                Tables\Columns\IconColumn::make('is_published')
                    ->boolean(),
            ])
            ->defaultSort('sort_order', 'asc')
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAccommodations::route('/'),
            'create' => Pages\CreateAccommodation::route('/create'),
            'edit' => Pages\EditAccommodation::route('/{record}/edit'),
        ];
    }
}
