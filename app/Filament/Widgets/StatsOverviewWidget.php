<?php

namespace App\Filament\Widgets;

use App\Enums\CheckInResult;
use App\Enums\RegistrationStatus;
use App\Models\CheckIn;
use App\Models\ExhibitorLead;
use App\Models\Registration;
use App\Models\Ticket;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverviewWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $totalPaid = Registration::where('status', RegistrationStatus::PAID)->count();
        $totalPending = Registration::where('status', RegistrationStatus::PENDING)->count();
        $grossRevenuePaise = Registration::where('status', RegistrationStatus::PAID)->sum('total');
        $leadsCount = ExhibitorLead::count();
        $todayCheckIns = CheckIn::whereDate('scanned_at', today())->where('result', CheckInResult::OK)->count();

        $grossRevenueFormatted = '₹' . number_format($grossRevenuePaise / 100, 2);

        return [
            Stat::make('Confirmed Delegates', number_format($totalPaid))
                ->description("Pending checkout: {$totalPending}")
                ->descriptionIcon('heroicon-m-user-group')
                ->color('success'),

            Stat::make('Gross Delegate Revenue', $grossRevenueFormatted)
                ->description('Minor unit verified total')
                ->descriptionIcon('heroicon-m-currency-rupee')
                ->color('primary'),

            Stat::make('Exhibitor Pipeline', number_format($leadsCount))
                ->description('Commercial & stall leads')
                ->descriptionIcon('heroicon-m-building-storefront')
                ->color('warning'),

            Stat::make("Today's Gate Check-ins", number_format($todayCheckIns))
                ->description('Contactless QR scans verified')
                ->descriptionIcon('heroicon-m-qr-code')
                ->color('info'),
        ];
    }
}
