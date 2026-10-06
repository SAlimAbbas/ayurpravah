<?php

namespace App\Filament\Resources;

use App\Enums\ExhibitorStatus;
use App\Filament\Resources\ExhibitorLeadResource\Pages;
use App\Models\ExhibitorLead;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ExhibitorLeadResource extends Resource
{
    protected static ?string $model = ExhibitorLead::class;
    protected static ?string $navigationIcon = 'heroicon-o-building-storefront';
    protected static ?string $navigationGroup = 'Expo & Industry';
    protected static ?string $navigationLabel = 'Exhibitor Leads';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Company & Contact Person')
                    ->schema([
                        Forms\Components\TextInput::make('company')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('contact_person')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required(),
                        Forms\Components\TextInput::make('phone')
                            ->tel()
                            ->required(),
                        Forms\Components\TextInput::make('website')
                            ->url()
                            ->placeholder('https://'),
                        Forms\Components\TextInput::make('category_industry')
                            ->placeholder('e.g. GMP Pharma / Herbal Extracts / Health Tech'),
                    ])->columns(2),

                Forms\Components\Section::make('Stall Requirements & Products')
                    ->schema([
                        Forms\Components\Select::make('stall_interest')
                            ->options([
                                'standard_shell' => 'Standard Shell Scheme (3x3m)',
                                'custom_bare' => 'Bare Space / Custom Fabricated Pavilion',
                                'startups_pod' => 'Startup Innovation Pod',
                                'sponsor_booth' => 'Sponsorship Pavilion Bundle',
                            ]),
                        Forms\Components\TextInput::make('stall_size')
                            ->placeholder('e.g. 9 sq m / 18 sq m'),
                        Forms\Components\TextInput::make('budget_note')
                            ->placeholder('e.g. ₹2.5 Lakhs'),
                        Forms\Components\Textarea::make('products_brief')
                            ->rows(3)
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('message')
                            ->rows(3)
                            ->columnSpanFull(),
                    ])->columns(3),

                Forms\Components\Section::make('Sales Pipeline & Assignment')
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->options(collect(ExhibitorStatus::cases())->mapWithKeys(fn ($case) => [$case->value => $case->label()]))
                            ->default('new')
                            ->required(),
                        Forms\Components\TextInput::make('assigned_to')
                            ->placeholder('Sales Officer Name'),
                        Forms\Components\Textarea::make('notes')
                            ->label('Internal Call Notes & Negotiation History')
                            ->rows(3)
                            ->columnSpanFull(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('company')
                    ->searchable()
                    ->weight('bold')
                    ->sortable(),
                Tables\Columns\TextColumn::make('contact_person')
                    ->searchable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('phone')
                    ->searchable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (ExhibitorStatus $state): string => $state->color())
                    ->formatStateUsing(fn (ExhibitorStatus $state) => $state->label()),
                Tables\Columns\TextColumn::make('assigned_to')
                    ->placeholder('Unassigned')
                    ->badge(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d M Y')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(collect(ExhibitorStatus::cases())->mapWithKeys(fn ($case) => [$case->value => $case->label()])),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListExhibitorLeads::route('/'),
            'create' => Pages\CreateExhibitorLead::route('/create'),
            'edit' => Pages\EditExhibitorLead::route('/{record}/edit'),
        ];
    }
}
