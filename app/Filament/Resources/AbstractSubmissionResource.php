<?php

namespace App\Filament\Resources;

use App\Enums\AbstractStatus;
use App\Filament\Resources\AbstractSubmissionResource\Pages;
use App\Models\AbstractSubmission;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class AbstractSubmissionResource extends Resource
{
    protected static ?string $model = AbstractSubmission::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationGroup = 'Scientific & Research';
    protected static ?string $navigationLabel = 'Abstract Submissions';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Author Details')
                    ->schema([
                        Forms\Components\TextInput::make('author_name')
                            ->required(),
                        Forms\Components\TextInput::make('author_email')
                            ->email()
                            ->required(),
                        Forms\Components\TextInput::make('author_phone')
                            ->required(),
                        Forms\Components\TextInput::make('affiliation')
                            ->placeholder('Institution / Medical College')
                            ->required(),
                    ])->columns(2),

                Forms\Components\Section::make('Paper / Abstract Proposal')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->label('Scientific Title')
                            ->required()
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('track_category')
                            ->placeholder('e.g. Translational Pharmacology / Clinical Ayurveda'),
                        Forms\Components\Select::make('conclave_id')
                            ->relationship('conclave', 'title')
                            ->searchable()
                            ->nullable(),
                        Forms\Components\Select::make('presentation_type')
                            ->options([
                                'oral' => 'Oral Podium Presentation',
                                'poster' => 'E-Poster Display',
                            ])
                            ->default('oral')
                            ->required(),
                        Forms\Components\TextInput::make('keywords')
                            ->placeholder('e.g. Ashwagandha, RCT, Cortisol, Stress'),
                        Forms\Components\Textarea::make('abstract_text')
                            ->label('Structured Abstract (Background, Methods, Results, Conclusion)')
                            ->rows(6)
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('file_path')
                            ->label('Manuscript / Full Abstract File (PDF/DOCX)')
                            ->directory('abstracts'),
                    ])->columns(2),

                Forms\Components\Section::make('Peer Review & Evaluation')
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->options(collect(AbstractStatus::cases())->mapWithKeys(fn ($case) => [$case->value => $case->label()]))
                            ->default('submitted')
                            ->required(),
                        Forms\Components\Select::make('reviewer_id')
                            ->relationship('reviewer', 'name')
                            ->searchable()
                            ->preload()
                            ->nullable(),
                        Forms\Components\TextInput::make('score')
                            ->label('Review Score (out of 10.00)')
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(10),
                        Forms\Components\DateTimePicker::make('decision_at'),
                        Forms\Components\Textarea::make('review_notes')
                            ->rows(3)
                            ->columnSpanFull(),
                    ])->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->weight('bold')
                    ->limit(35),
                Tables\Columns\TextColumn::make('author_name')
                    ->searchable()
                    ->description(fn ($record) => $record->author_email),
                Tables\Columns\TextColumn::make('presentation_type')
                    ->badge(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (AbstractStatus $state): string => $state->color())
                    ->formatStateUsing(fn (AbstractStatus $state) => $state->label()),
                Tables\Columns\TextColumn::make('score')
                    ->sortable()
                    ->placeholder('Pending'),
                Tables\Columns\TextColumn::make('reviewer.name')
                    ->placeholder('Unassigned'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d M Y')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(collect(AbstractStatus::cases())->mapWithKeys(fn ($case) => [$case->value => $case->label()])),
                Tables\Filters\SelectFilter::make('presentation_type'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAbstractSubmissions::route('/'),
            'create' => Pages\CreateAbstractSubmission::route('/create'),
            'edit' => Pages\EditAbstractSubmission::route('/{record}/edit'),
        ];
    }
}
