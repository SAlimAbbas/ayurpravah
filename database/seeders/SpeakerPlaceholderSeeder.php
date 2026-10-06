<?php

namespace Database\Seeders;

use App\Models\Speaker;
use Illuminate\Database\Seeder;

class SpeakerPlaceholderSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Keynote',
            'Ayurveda Experts',
            'Healthcare Leaders',
            'Researchers',
            'Industry Leaders',
            'International',
        ];

        for ($i = 1; $i <= 8; $i++) {
            Speaker::firstOrCreate([
                'slug' => "speaker-placeholder-{$i}",
            ], [
                'name' => "Speaker Name TBC (#{$i})",
                'photo' => null, // neutral botanical silhouette placeholder rendered in UI
                'designation' => 'Designation TBC',
                'institution' => 'Institution TBC',
                'country' => 'TBC',
                'bio' => 'Official speaker bio and credential details will be announced following confirmation by the academic committee.',
                'talk_topic' => 'Topic Announcement Pending (TBC)',
                'social_links' => [
                    'linkedin' => '#',
                    'twitter' => '#',
                ],
                'category' => $categories[($i - 1) % count($categories)],
                'is_featured' => $i <= 4,
                'sort_order' => $i,
                'is_published' => true,
            ]);
        }
    }
}
