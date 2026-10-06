<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\GalleryItem;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $albums = [
            [
                'title' => 'Scientific Conclaves & Symposia',
                'slug' => 'scientific-conclaves',
                'description' => 'Keynotes, panel debates, and research deliberations from premier academic assemblies.',
                'sort_order' => 1,
            ],
            [
                'title' => 'Hands-on Clinical Workshops',
                'slug' => 'clinical-workshops',
                'description' => 'Physician masterclasses across authentic panchakarma, nadi pariksha, and marma chikitsa.',
                'sort_order' => 2,
            ],
            [
                'title' => 'Community Health Initiatives',
                'slug' => 'community-health',
                'description' => 'Free preventive health camps, screenings, and public wellness literacy drives across India.',
                'sort_order' => 3,
            ],
            [
                'title' => 'Digital AYUSH & Innovation Summits',
                'slug' => 'digital-innovation',
                'description' => 'Showcasing artificial intelligence, diagnostic devices, and healthcare startup pitches.',
                'sort_order' => 4,
            ],
        ];

        $items = [
            [
                'album_slug' => 'scientific-conclaves',
                'caption' => 'Plenary Address on Translational Pharmacology & Evidence-based Formulations',
                'alt_text' => 'Conclave Plenary Lecture',
                'sort_order' => 1,
            ],
            [
                'album_slug' => 'scientific-conclaves',
                'caption' => 'International Roundtable: Global Regulatory Harmonization & Botanical Monographs',
                'alt_text' => 'Global Regulatory Dialogue',
                'sort_order' => 2,
            ],
            [
                'album_slug' => 'clinical-workshops',
                'caption' => 'Tactile Nadi Pariksha Masterclass: Arterial Compliance & Waveform Analysis',
                'alt_text' => 'Pulse Palpation Training',
                'sort_order' => 3,
            ],
            [
                'album_slug' => 'clinical-workshops',
                'caption' => 'Advanced Marma Chikitsa: Pain Modulation in Orthopedic Rehabilitation',
                'alt_text' => 'Marma Therapy Demonstration',
                'sort_order' => 4,
            ],
            [
                'album_slug' => 'community-health',
                'caption' => 'Comprehensive Rural Prakriti Assessment & Preventive Health Camp',
                'alt_text' => 'Grassroots Health Camp',
                'sort_order' => 5,
            ],
            [
                'album_slug' => 'digital-innovation',
                'caption' => 'AYUSH Startup Arena: Founders Pitching Bio-Sensory Diagnostics to Investors',
                'alt_text' => 'Startup Pitch Summit',
                'sort_order' => 6,
            ],
        ];

        foreach ($albums as $albumData) {
            Album::firstOrCreate(
                ['slug' => $albumData['slug']],
                $albumData
            );
        }

        $allAlbums = Album::all()->keyBy('slug');

        foreach ($items as $itemData) {
            $album = $allAlbums->get($itemData['album_slug']);
            GalleryItem::firstOrCreate(
                ['caption' => $itemData['caption']],
                [
                    'album_id' => $album?->id,
                    'type' => 'image',
                    'caption' => $itemData['caption'],
                    'alt_text' => $itemData['alt_text'],
                    'sort_order' => $itemData['sort_order'],
                    'is_published' => true,
                ]
            );
        }
    }
}
