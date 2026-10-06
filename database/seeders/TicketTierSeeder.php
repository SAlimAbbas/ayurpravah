<?php

namespace Database\Seeders;

use App\Models\Coupon;
use App\Models\TicketTier;
use Illuminate\Database\Seeder;

class TicketTierSeeder extends Seeder
{
    public function run(): void
    {
        $tiers = [
            [
                'name' => 'Delegate — Early Bird (TBC)',
                'category' => 'delegate',
                'price' => 0, // In minor units (paise)
                'currency' => 'INR',
                'gst_percent' => 18.00,
                'quota' => 1000,
                'sold_count' => 0,
                'is_active' => false, // Inactive until real price is entered by admin
                'sort_order' => 1,
                'inclusions' => [
                    'Access to all 13 Conclaves & Scientific Sessions',
                    'Delegate Welcome Kit & Souvenir',
                    'Networking Lunches on all 3 days',
                    'Digital Certificate of Participation',
                    'Access to Expo Pavilion',
                ],
            ],
            [
                'name' => 'Delegate — Regular (TBC)',
                'category' => 'delegate',
                'price' => 0,
                'currency' => 'INR',
                'gst_percent' => 18.00,
                'quota' => 2500,
                'sold_count' => 0,
                'is_active' => false,
                'sort_order' => 2,
                'inclusions' => [
                    'Access to all 13 Conclaves & Scientific Sessions',
                    'Delegate Welcome Kit & Souvenir',
                    'Networking Lunches on all 3 days',
                    'Digital Certificate of Participation',
                    'Access to Expo Pavilion',
                ],
            ],
            [
                'name' => 'Student Delegate (TBC)',
                'category' => 'student',
                'price' => 0,
                'currency' => 'INR',
                'gst_percent' => 18.00,
                'quota' => 1500,
                'sold_count' => 0,
                'is_active' => false,
                'sort_order' => 3,
                'inclusions' => [
                    'Access to all Conclaves & Workshops',
                    'Student Delegate Kit',
                    'Student Lunches & Refreshments',
                    'Digital Certificate of Participation',
                    'Eligibility for Poster & Abstract Presentations',
                ],
            ],
            [
                'name' => 'International Delegate (TBC)',
                'category' => 'international',
                'price' => 0,
                'currency' => 'USD',
                'gst_percent' => 18.00,
                'quota' => 500,
                'sold_count' => 0,
                'is_active' => false,
                'sort_order' => 4,
                'inclusions' => [
                    'Full Conclave & Global Forum Pass',
                    'Exclusive International Delegates Lounge Access',
                    'Bilateral Institutional Matchmaking Sessions',
                    'Gala Dinner & Cultural Evening Pass',
                    'Airport Transfer Assistance',
                ],
            ],
            [
                'name' => 'Exhibitor Stall Package (TBC)',
                'category' => 'exhibitor',
                'price' => 0,
                'currency' => 'INR',
                'gst_percent' => 18.00,
                'quota' => 100,
                'sold_count' => 0,
                'is_active' => false,
                'sort_order' => 5,
                'inclusions' => [
                    '3m x 3m Shell Scheme Stall',
                    '2 Complimentary Exhibitor Badges',
                    'Listing in Official Conclave Directory',
                    'Electric Power Connection & Fascia Board',
                ],
            ],
        ];

        foreach ($tiers as $tier) {
            TicketTier::firstOrCreate(['name' => $tier['name']], $tier);
        }

        // Sample coupon for admin preview
        Coupon::firstOrCreate([
            'code' => 'AYURWELCOME',
        ], [
            'discount_type' => 'percent',
            'value' => 10.00,
            'max_discount' => 1000.00,
            'usage_limit' => 500,
            'per_user_limit' => 1,
            'used_count' => 0,
            'is_active' => true,
        ]);
    }
}
