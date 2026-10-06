<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class ManageSiteSettings extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    protected static ?string $navigationGroup = 'Administration & Security';
    protected static ?string $navigationLabel = 'Site Settings & Countdown';
    protected static ?int $navigationSort = 2;
    protected static string $view = 'filament.pages.manage-site-settings';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'countdown_date' => Setting::get('countdown_date', '2027-04-16 09:00:00'),
            'venue_name' => Setting::get('venue_name', 'To Be Announced'),
            'venue_city' => Setting::get('venue_city', 'TBC'),
            'venue_map_url' => Setting::get('venue_map_url', ''),
            'dates_label' => Setting::get('dates_label', '16th, 17th & 18th April 2027'),
            'whatsapp_float_number' => Setting::get('whatsapp_float_number', '+910000000000'),
            'maintenance_mode' => (bool) Setting::get('maintenance_mode', false),
            'meta_title' => Setting::get('meta_title', 'AYURPRAVAH 2027 | International Ayurveda Conclave & Expo'),
            'meta_description' => Setting::get('meta_description', 'A global platform bringing together Ayurveda experts, researchers, healthcare professionals, innovators, startups, institutions and industry leaders to shape the future of Ayurveda.'),
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Master Countdown & Schedule Settings')
                    ->description('Powers the live countdown timer across the entire website and landing page')
                    ->schema([
                        Forms\Components\DateTimePicker::make('countdown_date')
                            ->label('Master Conclave Opening Timestamp')
                            ->required(),
                        Forms\Components\TextInput::make('dates_label')
                            ->label('Event Dates Label (Prose)')
                            ->required(),
                        Forms\Components\TextInput::make('venue_name')
                            ->label('Venue Name (Default: To Be Announced)')
                            ->required(),
                        Forms\Components\TextInput::make('venue_city')
                            ->label('Venue City (Default: TBC)')
                            ->required(),
                        Forms\Components\TextInput::make('venue_map_url')
                            ->label('Google Maps Embed / Navigation URL')
                            ->placeholder('https://maps.google.com/...'),
                    ])->columns(2),

                Forms\Components\Section::make('Global Contact & Floating Chat')
                    ->schema([
                        Forms\Components\TextInput::make('whatsapp_float_number')
                            ->label('Floating WhatsApp Support Number')
                            ->placeholder('+91 98765 43210'),
                        Forms\Components\Toggle::make('maintenance_mode')
                            ->label('Enable Maintenance Mode (Restricts Public Access)')
                            ->helperText('When enabled, non-admin visitors see a maintenance page'),
                    ])->columns(2),

                Forms\Components\Section::make('Default Search Engine Metadata (SEO)')
                    ->schema([
                        Forms\Components\TextInput::make('meta_title')
                            ->required(),
                        Forms\Components\Textarea::make('meta_description')
                            ->rows(3)
                            ->required(),
                    ]),
            ])
            ->statePath('data');
    }

    public function submit(): void
    {
        $state = $this->form->getState();

        foreach ($state as $key => $val) {
            Setting::set($key, $val);
        }

        Notification::make()
            ->title('Site settings updated successfully')
            ->success()
            ->send();
    }
}
