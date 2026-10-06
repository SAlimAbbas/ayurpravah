<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SponsorResource\Pages;
use App\Models\Sponsor;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SponsorResource extends Resource
{
    protected static ?string $model = Sponsor::class;
    protected static ?string $navigationIcon = 'heroicon-o-sparkles';
    protected static ?string $navigationGroup = 'Expo & Industry';
    protected static ?string $navigationLabel = 'Partners & Sponsors';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Partner Organization')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Select::make('partner_category')
                            ->options([
                                'Organized By' => 'Organized By (Host Institution)',
                                'Knowledge Partners' => 'Knowledge Partner',
                                'Associate Partners' => 'Associate Partner',
                                'Technology Partners' => 'Technology Partner',
                                'Industry Partners' => 'Industry Partner',
                                'Media Partners' => 'Media Partner',
                            ])
                            ->default('Associate Partners')
                            ->required(),
                        Forms\Components\Select::make('tier')
                            ->options([
                                'Platinum' => 'Platinum Sponsor',
                                'Gold' => 'Gold Sponsor',
                                'Silver' => 'Silver Sponsor',
                                'Associate' => 'Associate / Supporting',
                            ])
                            ->default('Gold')
                            ->required(),
                        Forms\Components\TextInput::make('website')
                            ->url()
                            ->placeholder('https://'),
                        Forms\Components\TextInput::make('booth_number')
                            ->placeholder('e.g. Hall 1, Booth B12'),
                        Forms\Components\TextInput::make('category_tag')
                            ->placeholder('e.g. Official Herbal Extract Partner'),
                        Forms\Components\FileUpload::make('logo')
                            ->image()
                            ->directory('sponsors')
                            ->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('Display Order & Visibility')
                    ->schema([
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
                Tables\Columns\ImageColumn::make('logo')
                    ->square(),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('partner_category')
                    ->badge()
                    ->sortable(),
                Tables\Columns\TextColumn::make('tier')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Platinum' => 'success',
                        'Gold' => 'warning',
                        'Silver' => 'gray',
                        default => 'info',
                    }),
                Tables\Columns\TextColumn::make('booth_number')
                    ->placeholder('N/A'),
                Tables\Columns\IconColumn::make('is_published')
                    ->boolean(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->sortable(),
            ])
            ->defaultSort('sort_order', 'asc')
            ->filters([
                Tables\Filters\SelectFilter::make('partner_category'),
                Tables\Filters\SelectFilter::make('tier'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSponsors::route('/'),
            'create' => Pages\CreateSponsor::route('/create'),
            'edit' => Pages\EditSponsor::route('/{record}/edit'),
        ];
    }
}
