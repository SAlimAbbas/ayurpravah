<?php

namespace App\Filament\Resources;

use App\Enums\EnquiryStatus;
use App\Enums\EnquiryType;
use App\Filament\Resources\EnquiryResource\Pages;
use App\Models\Enquiry;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class EnquiryResource extends Resource
{
    protected static ?string $model = Enquiry::class;
    protected static ?string $navigationIcon = 'heroicon-o-inbox';
    protected static ?string $navigationGroup = 'Communications & Inbox';
    protected static ?string $navigationLabel = 'Enquiries & Messages';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Sender Information')
                    ->schema([
                        Forms\Components\Select::make('type')
                            ->options(collect(EnquiryType::cases())->mapWithKeys(fn ($c) => [$c->value => $c->label()]))
                            ->required(),
                        Forms\Components\TextInput::make('department')
                            ->label('Target Department')
                            ->placeholder('delegate / exhibitor / media / sessions / partners'),
                        Forms\Components\TextInput::make('name')
                            ->required(),
                        Forms\Components\TextInput::make('organisation'),
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required(),
                        Forms\Components\TextInput::make('phone')
                            ->tel()
                            ->required(),
                        Forms\Components\Textarea::make('message')
                            ->rows(4)
                            ->columnSpanFull()
                            ->required(),
                    ])->columns(2),

                Forms\Components\Section::make('Workflow Status & Notes')
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->options(collect(EnquiryStatus::cases())->mapWithKeys(fn ($c) => [$c->value => $c->label()]))
                            ->default('new')
                            ->required(),
                        Forms\Components\TextInput::make('assigned_to')
                            ->placeholder('Staff Officer Name'),
                        Forms\Components\Textarea::make('notes')
                            ->label('Internal Resolution / Follow-up Notes')
                            ->rows(3)
                            ->columnSpanFull(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->color(fn (EnquiryType $state): string => match ($state) {
                        EnquiryType::PARTNER => 'success',
                        EnquiryType::SPONSORSHIP => 'warning',
                        EnquiryType::CONTACT => 'info',
                    }),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->weight('bold')
                    ->description(fn ($record) => $record->organisation ?? $record->email),
                Tables\Columns\TextColumn::make('department')
                    ->badge()
                    ->placeholder('General'),
                Tables\Columns\TextColumn::make('phone')
                    ->searchable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (EnquiryStatus $state): string => $state->color())
                    ->formatStateUsing(fn (EnquiryStatus $state) => $state->label()),
                Tables\Columns\TextColumn::make('assigned_to')
                    ->placeholder('Unassigned'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('type'),
                Tables\Filters\SelectFilter::make('status'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEnquiries::route('/'),
            'create' => Pages\CreateEnquiry::route('/create'),
            'edit' => Pages\EditEnquiry::route('/{record}/edit'),
        ];
    }
}
