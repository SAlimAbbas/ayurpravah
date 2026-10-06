<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventSessionResource\Pages;
use App\Models\EventSession;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EventSessionResource extends Resource
{
    protected static ?string $model = EventSession::class;
    protected static ?string $navigationIcon = 'heroicon-o-clock';
    protected static ?string $navigationGroup = 'Event & Program';
    protected static ?string $navigationLabel = 'Program Schedule';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Session Scheduling & Track')
                    ->schema([
                        Forms\Components\Select::make('conclave_id')
                            ->relationship('conclave', 'title')
                            ->searchable()
                            ->preload()
                            ->nullable(),
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Select::make('day_number')
                            ->options([
                                1 => 'Day 1 — 16 April 2027',
                                2 => 'Day 2 — 17 April 2027',
                                3 => 'Day 3 — 18 April 2027',
                            ])
                            ->default(1)
                            ->required(),
                        Forms\Components\DatePicker::make('session_date')
                            ->default('2027-04-16')
                            ->required(),
                        Forms\Components\TimePicker::make('start_time')
                            ->required(),
                        Forms\Components\TimePicker::make('end_time')
                            ->required(),
                        Forms\Components\TextInput::make('hall_room')
                            ->placeholder('e.g. Plenary Hall A / Charaka Auditorium')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('track')
                            ->placeholder('e.g. Clinical Research Track')
                            ->maxLength(255),
                        Forms\Components\Select::make('type')
                            ->options([
                                'keynote' => 'Keynote Address',
                                'panel' => 'Panel Discussion',
                                'clinical' => 'Clinical Case Presentation',
                                'workshop' => 'Hands-on Workshop',
                                'valedictory' => 'Inaugural / Valedictory Session',
                            ])
                            ->default('keynote'),
                        Forms\Components\Select::make('speakers')
                            ->relationship('speakers', 'name')
                            ->multiple()
                            ->preload()
                            ->searchable(),
                        Forms\Components\Textarea::make('description')
                            ->rows(3)
                            ->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('Publishing')
                    ->schema([
                        Forms\Components\Toggle::make('is_published')
                            ->default(true),
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
                Tables\Columns\TextColumn::make('day_number')
                    ->formatStateUsing(fn ($state) => "Day {$state}")
                    ->sortable()
                    ->badge(),
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->weight('bold')
                    ->limit(35),
                Tables\Columns\TextColumn::make('conclave.title')
                    ->limit(25)
                    ->toggleable(),
                Tables\Columns\TextColumn::make('start_time')
                    ->time('H:i')
                    ->sortable(),
                Tables\Columns\TextColumn::make('end_time')
                    ->time('H:i'),
                Tables\Columns\TextColumn::make('hall_room')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('speakers.name')
                    ->badge()
                    ->color('success')
                    ->limitList(2),
                Tables\Columns\IconColumn::make('is_published')
                    ->boolean(),
            ])
            ->defaultSort('start_time', 'asc')
            ->filters([
                Tables\Filters\SelectFilter::make('day_number')
                    ->options([
                        1 => 'Day 1',
                        2 => 'Day 2',
                        3 => 'Day 3',
                    ]),
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\RestoreAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEventSessions::route('/'),
            'create' => Pages\CreateEventSession::route('/create'),
            'edit' => Pages\EditEventSession::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
