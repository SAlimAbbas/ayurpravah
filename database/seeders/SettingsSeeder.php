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
            'event_eyebrow' => 'INTERNATIONAL AYUSH CONCLAVE & EXPO',
            'tagline' => 'One Vision. One Platform. One Future.',
            'supporting_message' => 'Uniting Global Experts, Researchers, Innovators & Industry Leaders to Shape the Future of AYUR.',
            'dates_label' => '16th, 17th & 18th April 2027',
            'event_start_date' => '2027-04-16',
            'event_end_date' => '2027-04-18',
            'countdown_date' => '2027-04-16 09:00:00',
            'venue_name' => 'Indian Institute of Technology Delhi, Hauz Khas',
            'venue_city' => 'New Delhi 110016',
            'venue_map_url' => 'https://maps.google.com/?q=IIT+Delhi+Hauz+Khas+New+Delhi',
            'primary_cta_label' => 'REGISTER AS DELEGATE',
            'primary_cta_url' => '/register/delegate',
            'secondary_cta_label' => 'EXPLORE PROGRAMME',
            'secondary_cta_url' => '/program',
            'organisers' => [
                'Indian Institute of Technology Delhi',
                'Yasharth Veda Foundation',
                'AyurWings HealthTech',
            ],
            'departments' => [
                'delegate' => [
                    'title' => 'General Enquiries & Secretariat',
                    'email' => 'info@ayurpravah.com',
                    'phone' => '+91 97043 21786',
                    'whatsapp' => '+91 97043 21786',
                ],
                'exhibitor' => [
                    'title' => 'Exhibition & Stalls',
                    'email' => 'expo@ayurpravah.com',
                    'phone' => '+91 97160 48074',
                    'whatsapp' => '+91 76690 89388',
                ],
                'knowledge' => [
                    'title' => 'Research, Abstracts & Publications',
                    'email' => 'ayurpravah.research@gmail.com',
                    'phone' => '+91 97043 21786',
                    'whatsapp' => '+91 97043 21786',
                ],
                'sponsorship' => [
                    'title' => 'Institutional MoUs & Patrons',
                    'email' => 'info@ayurpravah.com',
                    'phone' => '+91 97043 21786',
                    'whatsapp' => '+91 97043 21786',
                ],
                'media' => [
                    'title' => 'Startups, Innovation & Venture Pitch',
                    'email' => 'info@ayurpravah.com',
                    'phone' => '+91 85869 59638',
                    'whatsapp' => '+91 85869 59638',
                ],
            ],
            'social_links' => [
                'linkedin' => 'https://linkedin.com',
                'twitter' => 'https://x.com',
                'youtube' => 'https://youtube.com',
                'instagram' => 'https://instagram.com',
            ],
            'meta_title' => 'AYURPRAVAH 2027 | International AYUSH Conclave & Expo | IIT Delhi',
            'meta_description' => 'AYURPRAVAH 2027 (16–18 April 2027 at IIT Delhi) unites global experts, researchers, clinicians, innovators and healthcare leaders to shape the future of Ayurveda and AYUSH.',
            'ga_id' => '',
            'meta_pixel_id' => '',
            'maintenance_mode' => '0',
            'whatsapp_float_number' => '+919704321786',
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
