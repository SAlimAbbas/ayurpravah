<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TicketTierResource\Pages;
use App\Models\TicketTier;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TicketTierResource extends Resource
{
    protected static ?string $model = TicketTier::class;
    protected static ?string $navigationIcon = 'heroicon-o-ticket';
    protected static ?string $navigationGroup = 'Registrations & Finance';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Tier Details & Pricing')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Select::make('category')
                            ->options([
                                'delegate' => 'Delegate Pass',
                                'student' => 'Student Delegate',
                                'international' => 'International Delegate',
                                'exhibitor' => 'Exhibitor Pass / Stall',
                            ])
                            ->default('delegate')
                            ->required(),
                        Forms\Components\TextInput::make('price')
                            ->label('Price in Minor Units (Paise) — e.g. 500000 = ₹5,000')
                            ->helperText('Enter 0 for placeholder / free tier')
                            ->numeric()
                            ->default(0)
                            ->required(),
                        Forms\Components\TextInput::make('currency')
                            ->default('INR')
                            ->required(),
                        Forms\Components\TextInput::make('gst_percent')
                            ->label('GST Percentage (%)')
                            ->numeric()
                            ->default(18.00)
                            ->required(),
                        Forms\Components\TextInput::make('quota')
                            ->label('Seat / Pass Quota (Capacity)')
                            ->numeric()
                            ->default(500)
                            ->required(),
                        Forms\Components\TagsInput::make('inclusions')
                            ->label('Inclusions / Benefits list')
                            ->placeholder('Add pass inclusion and press Enter'),
                    ])->columns(2),

                Forms\Components\Section::make('Availability Windows & Activation')
                    ->schema([
                        Forms\Components\DateTimePicker::make('valid_from'),
                        Forms\Components\DateTimePicker::make('valid_until'),
                        Forms\Components\Toggle::make('is_active')
                            ->label('Active for Online Booking')
                            ->helperText('Keep inactive until real confirmed price is determined')
                            ->default(false),
                        Forms\Components\TextInput::make('sort_order')
                            ->numeric()
                            ->default(0),
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
                Tables\Columns\TextColumn::make('category')
                    ->badge(),
                Tables\Columns\TextColumn::make('price')
                    ->formatStateUsing(fn ($record) => $record->price > 0 ? ($record->currency . ' ' . number_format($record->price / 100, 2)) : 'TBC (₹0)')
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('sold_count')
                    ->label('Sold / Quota')
                    ->formatStateUsing(fn ($record) => "{$record->sold_count} / {$record->quota}"),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->label('Active'),
                Tables\Columns\TextColumn::make('sort_order')
                    ->sortable(),
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
            'index' => Pages\ListTicketTiers::route('/'),
            'create' => Pages\CreateTicketTier::route('/create'),
            'edit' => Pages\EditTicketTier::route('/{record}/edit'),
        ];
    }
}
