<?php

namespace Database\Seeders;

use App\Models\Sponsor;
use Illuminate\Database\Seeder;

class SponsorSeeder extends Seeder
{
    public function run(): void
    {
        Sponsor::firstOrCreate([
            'name' => 'Yasharth Veda Foundation',
            'partner_category' => 'Organized By',
        ], [
            'tier' => 'Platinum',
            'website' => 'https://yasharthveda.org',
            'booth_number' => 'Hall 1 - A01',
            'category_tag' => 'Ecosystem Founder',
            'sort_order' => 1,
            'is_published' => true,
        ]);

        Sponsor::firstOrCreate([
            'name' => 'AyurWings Health Tech',
            'partner_category' => 'Organized By',
        ], [
            'tier' => 'Platinum',
            'website' => 'https://ayurwings.com',
            'booth_number' => 'Hall 1 - A02',
            'category_tag' => 'Digital Tech Partner',
            'sort_order' => 2,
            'is_published' => true,
        ]);
    }
}
