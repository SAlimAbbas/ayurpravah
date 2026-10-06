<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SpeakerResource\Pages;
use App\Models\Speaker;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SpeakerResource extends Resource
{
    protected static ?string $model = Speaker::class;
    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';
    protected static ?string $navigationGroup = 'Event & Program';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Speaker Identity')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                        Forms\Components\Select::make('category')
                            ->options([
                                'Keynote' => 'Keynote Speaker',
                                'Ayurveda Experts' => 'Ayurveda Expert',
                                'Healthcare Leaders' => 'Healthcare Leader',
                                'Researchers' => 'Researcher / Academician',
                                'Industry Leaders' => 'Industry Leader',
                                'International' => 'International Dignitary',
                            ])
                            ->default('Ayurveda Experts')
                            ->required(),
                        Forms\Components\TextInput::make('talk_topic')
                            ->label('Talk / Session Topic')
                            ->placeholder('e.g. Translational Research in Classical Formulations')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('designation')
                            ->placeholder('e.g. Director, National Institute of Ayurveda')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('institution')
                            ->placeholder('e.g. Ministry of AYUSH / Harvard Medical School')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('country')
                            ->default('India')
                            ->maxLength(100),
                        Forms\Components\FileUpload::make('photo')
                            ->image()
                            ->directory('speakers')
                            ->imageEditor(),
                        Forms\Components\Textarea::make('bio')
                            ->rows(4)
                            ->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('Settings & Visibility')
                    ->schema([
                        Forms\Components\Toggle::make('is_featured')
                            ->label('Feature on Homepage Carousel')
                            ->default(false),
                        Forms\Components\Toggle::make('is_published')
                            ->label('Published on Website')
                            ->default(true),
                        Forms\Components\TextInput::make('sort_order')
                            ->numeric()
                            ->default(0),
                    ])->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('photo')
                    ->circular()
                    ->defaultImageUrl('/images/speaker-placeholder.svg'),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('category')
                    ->badge()
                    ->sortable(),
                Tables\Columns\TextColumn::make('designation')
                    ->searchable()
                    ->limit(30),
                Tables\Columns\TextColumn::make('talk_topic')
                    ->limit(30)
                    ->toggleable(),
                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean()
                    ->label('Featured'),
                Tables\Columns\IconColumn::make('is_published')
                    ->boolean()
                    ->label('Published'),
                Tables\Columns\TextColumn::make('sort_order')
                    ->sortable(),
            ])
            ->defaultSort('sort_order', 'asc')
            ->filters([
                Tables\Filters\SelectFilter::make('category'),
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
            'index' => Pages\ListSpeakers::route('/'),
            'create' => Pages\CreateSpeaker::route('/create'),
            'edit' => Pages\EditSpeaker::route('/{record}/edit'),
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
