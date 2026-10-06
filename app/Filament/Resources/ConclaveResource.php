<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ConclaveResource\Pages;
use App\Models\Conclave;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ConclaveResource extends Resource
{
    protected static ?string $model = Conclave::class;
    protected static ?string $navigationIcon = 'heroicon-o-presentation-chart-line';
    protected static ?string $navigationGroup = 'Event & Program';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Conclave Identity & Layout')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                        Forms\Components\Select::make('layout')
                            ->options([
                                'featured' => 'Featured (Large Double Width)',
                                'standard' => 'Standard Editorial Card',
                                'image' => 'Image-Backed Showcase Card',
                                'horizontal' => 'Horizontal Split Layout',
                                'offset' => 'Offset Accent Layout',
                            ])
                            ->default('standard')
                            ->required(),
                        Forms\Components\TagsInput::make('focus_areas')
                            ->placeholder('Add focus theme and press Enter'),
                        Forms\Components\Textarea::make('short_description')
                            ->rows(3)
                            ->columnSpanFull(),
                        Forms\Components\RichEditor::make('description')
                            ->label('Full Conclave Scope / Detail')
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('workshop_info')
                            ->label('Associated Workshops & Masterclasses')
                            ->rows(2)
                            ->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('Media & Display Order')
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->image()
                            ->directory('conclaves'),
                        Forms\Components\TextInput::make('sort_order')
                            ->numeric()
                            ->default(0),
                        Forms\Components\Toggle::make('is_published')
                            ->default(true),
                    ])->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('layout')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'featured' => 'success',
                        'image' => 'info',
                        'horizontal' => 'warning',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('short_description')
                    ->limit(40),
                Tables\Columns\IconColumn::make('is_published')
                    ->boolean(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->sortable(),
            ])
            ->defaultSort('sort_order', 'asc')
            ->filters([
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
            'index' => Pages\ListConclaves::route('/'),
            'create' => Pages\CreateConclave::route('/create'),
            'edit' => Pages\EditConclave::route('/{record}/edit'),
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
