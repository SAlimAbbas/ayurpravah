<?php

namespace App\Filament\Resources;

use App\Enums\RegistrationStatus;
use App\Filament\Resources\RegistrationResource\Pages;
use App\Models\Registration;
use App\Services\RegistrationService;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class RegistrationResource extends Resource
{
    protected static ?string $model = Registration::class;
    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationGroup = 'Registrations & Finance';
    protected static ?string $navigationLabel = 'Delegates';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Delegate Credentials')
                    ->schema([
                        Forms\Components\TextInput::make('reference')
                            ->disabled()
                            ->label('Booking Reference'),
                        Forms\Components\Select::make('status')
                            ->options(collect(RegistrationStatus::cases())->mapWithKeys(fn ($case) => [$case->value => $case->label()]))
                            ->required(),
                        Forms\Components\Select::make('tier_id')
                            ->relationship('tier', 'name')
                            ->required(),
                        Forms\Components\TextInput::make('title')
                            ->default('Dr.'),
                        Forms\Components\TextInput::make('full_name')
                            ->required(),
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required(),
                        Forms\Components\TextInput::make('phone')
                            ->tel()
                            ->required(),
                        Forms\Components\TextInput::make('designation'),
                        Forms\Components\TextInput::make('organisation_college'),
                        Forms\Components\TextInput::make('city'),
                        Forms\Components\TextInput::make('state'),
                        Forms\Components\TextInput::make('country')
                            ->default('India'),
                        Forms\Components\TextInput::make('registration_council_no')
                            ->label('State AYUSH Council Reg No.'),
                        Forms\Components\TextInput::make('gstin')
                            ->label('GSTIN (Tax Invoice)'),
                    ])->columns(2),

                Forms\Components\Section::make('Financial Details & Breakdown')
                    ->schema([
                        Forms\Components\TextInput::make('subtotal')
                            ->formatStateUsing(fn ($state) => '₹' . number_format($state / 100, 2))
                            ->disabled(),
                        Forms\Components\TextInput::make('discount')
                            ->formatStateUsing(fn ($state) => '₹' . number_format($state / 100, 2))
                            ->disabled(),
                        Forms\Components\TextInput::make('tax')
                            ->label('GST Tax')
                            ->formatStateUsing(fn ($state) => '₹' . number_format($state / 100, 2))
                            ->disabled(),
                        Forms\Components\TextInput::make('total')
                            ->formatStateUsing(fn ($state) => '₹' . number_format($state / 100, 2))
                            ->disabled(),
                    ])->columns(4),

                Forms\Components\Section::make('Manual Status Override & Audit')
                    ->schema([
                        Forms\Components\Toggle::make('manual_override')
                            ->label('Mark as Offline / Manual Override')
                            ->disabled(),
                        Forms\Components\TextInput::make('override_by')
                            ->label('Override Staff Officer')
                            ->disabled(),
                        Forms\Components\Textarea::make('override_reason')
                            ->rows(2)
                            ->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('Refund Status')
                    ->schema([
                        Forms\Components\Toggle::make('refund_flag')
                            ->label('Refund Issued'),
                        Forms\Components\Textarea::make('refund_notes')
                            ->rows(2)
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('reference')
                    ->searchable()
                    ->weight('bold')
                    ->copyable(),
                Tables\Columns\TextColumn::make('full_name')
                    ->searchable()
                    ->sortable()
                    ->description(fn ($record) => $record->email),
                Tables\Columns\TextColumn::make('tier.name')
                    ->badge(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (RegistrationStatus $state): string => $state->color())
                    ->formatStateUsing(fn (RegistrationStatus $state) => $state->label()),
                Tables\Columns\TextColumn::make('total')
                    ->formatStateUsing(fn ($state) => '₹' . number_format($state / 100, 2))
                    ->sortable(),
                Tables\Columns\TextColumn::make('state')
                    ->toggleable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(collect(RegistrationStatus::cases())->mapWithKeys(fn ($case) => [$case->value => $case->label()])),
                Tables\Filters\SelectFilter::make('tier_id')
                    ->relationship('tier', 'name'),
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\Action::make('manual_confirm')
                    ->label('Confirm Paid (Override)')
                    ->icon('heroicon-o-check-badge')
                    ->color('success')
                    ->requiresConfirmation()
                    ->form([
                        Forms\Components\Textarea::make('reason')
                            ->label('Reason for Offline Override (e.g. Bank Transfer Ref / Cash Desk)')
                            ->required(),
                    ])
                    ->action(function (Registration $record, array $data, RegistrationService $service) {
                        $service->manualOverride($record, auth()->user()->name ?? 'Staff', $data['reason']);
                        Notification::make()
                            ->title('Registration Marked as Paid')
                            ->success()
                            ->send();
                    })
                    ->visible(fn (Registration $record) => $record->status !== RegistrationStatus::PAID),

                Tables\Actions\Action::make('download_pass')
                    ->label('Pass PDF')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->url(fn (Registration $record) => $record->ticket?->pdf_path ? "/storage/{$record->ticket->pdf_path}" : null)
                    ->openUrlInNewTab()
                    ->visible(fn (Registration $record) => $record->ticket !== null),

                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListRegistrations::route('/'),
            'edit' => Pages\EditRegistration::route('/{record}/edit'),
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
