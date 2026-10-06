<?php

namespace App\Filament\Resources;

use App\Enums\DiscountType;
use App\Filament\Resources\CouponResource\Pages;
use App\Models\Coupon;
use App\Models\TicketTier;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CouponResource extends Resource
{
    protected static ?string $model = Coupon::class;
    protected static ?string $navigationIcon = 'heroicon-o-gift';
    protected static ?string $navigationGroup = 'Registrations & Finance';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Coupon Code & Rules')
                    ->schema([
                        Forms\Components\TextInput::make('code')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->extraInputAttributes(['style' => 'text-transform:uppercase'])
                            ->maxLength(50),
                        Forms\Components\Select::make('discount_type')
                            ->options([
                                'percent' => 'Percentage Discount (%)',
                                'flat' => 'Flat Cash Discount (INR)',
                            ])
                            ->default('percent')
                            ->required(),
                        Forms\Components\TextInput::make('value')
                            ->label('Discount Value (% or INR)')
                            ->numeric()
                            ->required(),
                        Forms\Components\TextInput::make('max_discount')
                            ->label('Maximum Discount Cap (INR)')
                            ->numeric()
                            ->placeholder('e.g. 1000'),
                        Forms\Components\TextInput::make('usage_limit')
                            ->label('Global Total Usage Limit')
                            ->numeric()
                            ->default(100)
                            ->required(),
                        Forms\Components\TextInput::make('per_user_limit')
                            ->label('Usage Limit Per Delegate/User')
                            ->numeric()
                            ->default(1)
                            ->required(),
                        Forms\Components\Select::make('applicable_tier_ids')
                            ->label('Applicable Pass Tiers (Leave empty for all)')
                            ->multiple()
                            ->options(fn () => TicketTier::pluck('name', 'id')->toArray()),
                    ])->columns(2),

                Forms\Components\Section::make('Validity & Status')
                    ->schema([
                        Forms\Components\DateTimePicker::make('valid_from'),
                        Forms\Components\DateTimePicker::make('expires_at'),
                        Forms\Components\Toggle::make('is_active')
                            ->default(true),
                    ])->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('code')
                    ->searchable()
                    ->weight('bold')
                    ->copyable(),
                Tables\Columns\TextColumn::make('discount_type')
                    ->badge(),
                Tables\Columns\TextColumn::make('value')
                    ->formatStateUsing(fn ($record) => $record->discount_type === DiscountType::PERCENT ? "{$record->value}%" : "₹{$record->value}"),
                Tables\Columns\TextColumn::make('used_count')
                    ->label('Redeemed / Limit')
                    ->formatStateUsing(fn ($record) => "{$record->used_count} / {$record->usage_limit}"),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                Tables\Columns\TextColumn::make('expires_at')
                    ->dateTime('d M Y')
                    ->placeholder('Never'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCoupons::route('/'),
            'create' => Pages\CreateCoupon::route('/create'),
            'edit' => Pages\EditCoupon::route('/{record}/edit'),
        ];
    }
}
