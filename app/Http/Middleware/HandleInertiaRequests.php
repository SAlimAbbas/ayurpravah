<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'site_settings' => [
                'event_name' => Setting::get('event_name', 'AYURPRAVAH 2027'),
                'event_name_prose' => Setting::get('event_name_prose', 'AyurPravah 2027'),
                'brand_hindi' => Setting::get('brand_hindi', 'आयुर प्रवाह'),
                'eyebrow' => Setting::get('event_eyebrow', 'INTERNATIONAL AYUSH CONCLAVE & EXPO'),
                'tagline' => Setting::get('tagline', 'One Vision. One Platform. One Future.'),
                'supporting' => Setting::get('supporting_message', 'Uniting Global Experts, Researchers, Innovators & Industry Leaders to Shape the Future of AYUR.'),
                'dates_label' => Setting::get('dates_label', '16th, 17th & 18th April 2027'),
                'countdown_date' => Setting::get('countdown_date', '2027-04-16 09:00:00'),
                'venue' => [
                    'name' => Setting::get('venue_name', 'Indian Institute of Technology Delhi, Hauz Khas'),
                    'city' => Setting::get('venue_city', 'New Delhi 110016'),
                    'map_url' => Setting::get('venue_map_url', 'https://maps.google.com/?q=IIT+Delhi+Hauz+Khas+New+Delhi'),
                ],
                'departments' => Setting::get('departments', []),
                'social_links' => Setting::get('social_links', []),
                'whatsapp' => Setting::get('whatsapp_float_number', '+919704321786'),
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
