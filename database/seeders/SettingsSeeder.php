<?php

namespace Database\Seeders;

use App\Models\HeroSlide;
use App\Models\Page;
use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'event_name' => 'AYURPRAVAH 2027',
            'event_name_prose' => 'AyurPravah 2027',
            'brand_hindi' => 'आयुर प्रवाह',
            'event_eyebrow' => 'INTERNATIONAL AYURVEDA CONCLAVE & EXPO',
            'tagline' => 'One Vision. One Platform. One Future.',
            'supporting_message' => 'Uniting Global Experts, Researchers, Innovators & Industry Leaders to Shape the Future of Ayurveda.',
            'dates_label' => '16th, 17th & 18th April 2027',
            'event_start_date' => '2027-04-16',
            'event_end_date' => '2027-04-18',
            'countdown_date' => '2027-04-16 09:00:00',
            'venue_name' => 'To Be Announced',
            'venue_city' => 'TBC',
            'venue_map_url' => '',
            'primary_cta_label' => 'REGISTER NOW →',
            'primary_cta_url' => '/register/delegate',
            'secondary_cta_label' => 'EXPLORE AYURPRAVAH',
            'secondary_cta_url' => '#ayurpravah',
            'organisers' => ['Yasharth Veda Foundation', 'AyurWings Health Tech'],
            'departments' => [
                'delegate' => [
                    'title' => 'Delegate Enquiries',
                    'email' => 'delegate@ayurpravah2027.com',
                    'phone' => '+91 (TBC)',
                    'whatsapp' => '+91 (TBC)',
                ],
                'exhibitor' => [
                    'title' => 'Exhibitor & Stall Enquiries',
                    'email' => 'exhibitor@ayurpravah2027.com',
                    'phone' => '+91 (TBC)',
                    'whatsapp' => '+91 (TBC)',
                ],
                'knowledge' => [
                    'title' => 'Knowledge Sessions & Abstracts',
                    'email' => 'sessions@ayurpravah2027.com',
                    'phone' => '+91 (TBC)',
                    'whatsapp' => '+91 (TBC)',
                ],
                'sponsorship' => [
                    'title' => 'Sponsorship & Partnerships',
                    'email' => 'partners@ayurpravah2027.com',
                    'phone' => '+91 (TBC)',
                    'whatsapp' => '+91 (TBC)',
                ],
                'media' => [
                    'title' => 'Media & Press Relations',
                    'email' => 'media@ayurpravah2027.com',
                    'phone' => '+91 (TBC)',
                    'whatsapp' => '+91 (TBC)',
                ],
            ],
            'social_links' => [
                'linkedin' => 'https://linkedin.com',
                'twitter' => 'https://x.com',
                'youtube' => 'https://youtube.com',
                'instagram' => 'https://instagram.com',
            ],
            'meta_title' => 'AYURPRAVAH 2027 | International Ayurveda Conclave & Expo',
            'meta_description' => 'A global platform bringing together Ayurveda experts, researchers, healthcare professionals, innovators, startups, institutions and industry leaders to shape the future of Ayurveda.',
            'ga_id' => '',
            'meta_pixel_id' => '',
            'maintenance_mode' => '0',
            'whatsapp_float_number' => '+910000000000',
        ];

        foreach ($settings as $key => $val) {
            Setting::set($key, $val);
        }

        // Hero Slide
        HeroSlide::firstOrCreate([
            'headline' => 'AYURPRAVAH 2027',
        ], [
            'subtext' => 'Ancient Wisdom × Modern Science × Clinical Excellence × Technology × Entrepreneurship × Global Collaboration',
            'cta_primary_label' => 'REGISTER NOW →',
            'cta_primary_link' => '/register/delegate',
            'cta_secondary_label' => 'EXPLORE AYURPRAVAH',
            'cta_secondary_link' => '#ayurpravah',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        // Default Legal & About Pages
        Page::firstOrCreate(['slug' => 'privacy-policy'], [
            'title' => 'Privacy Policy',
            'meta_title' => 'Privacy Policy | AYURPRAVAH 2027',
            'meta_description' => 'Official privacy policy for AYURPRAVAH 2027 International Ayurveda Conclave & Expo.',
            'body' => '<p>At AYURPRAVAH 2027, organized by Yasharth Veda Foundation and powered digitally by AyurWings Health Tech, we respect your privacy and are committed to protecting attendee and exhibitor data.</p>',
            'is_published' => true,
        ]);

        Page::firstOrCreate(['slug' => 'terms'], [
            'title' => 'Terms & Conditions',
            'meta_title' => 'Terms & Conditions | AYURPRAVAH 2027',
            'meta_description' => 'Official terms and conditions of registration and participation in AYURPRAVAH 2027.',
            'body' => '<p>By registering for AYURPRAVAH 2027, delegates and exhibitors agree to comply with event guidelines, code of conduct, and venue regulations.</p>',
            'is_published' => true,
        ]);

        Page::firstOrCreate(['slug' => 'refund-policy'], [
            'title' => 'Cancellation & Refund Policy',
            'meta_title' => 'Refund Policy | AYURPRAVAH 2027',
            'meta_description' => 'Official refund and cancellation policy for AYURPRAVAH 2027 delegate passes and bookings.',
            'body' => '<p>Registrations may be cancelled subject to organizer cancellation policy. Refunds will be processed through the original payment method upon administrative review.</p>',
            'is_published' => true,
        ]);
    }
}
