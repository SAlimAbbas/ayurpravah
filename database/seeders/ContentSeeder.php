<?php

namespace Database\Seeders;

use App\Models\Accommodation;
use App\Models\Conclave;
use App\Models\EventSession;
use App\Models\Faq;
use App\Models\Speaker;
use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        // 1. FAQs
        $faqs = [
            [
                'category' => 'General',
                'question' => 'What is AYURPRAVAH 2027?',
                'answer' => 'AYURPRAVAH 2027 (आयुर प्रवाह) is the premier International Ayurveda Conclave & Expo organized by Yasharth Veda Foundation and AyurWings Health Tech. It is a unified platform bringing together over 5,000 global experts, clinicians, researchers, innovators, institutions, and industry leaders to shape the future of Ayurveda.',
                'sort_order' => 1,
            ],
            [
                'category' => 'General',
                'question' => 'When and where will AYURPRAVAH 2027 be held?',
                'answer' => 'AYURPRAVAH 2027 will take place over three days: 16th, 17th, and 18th April 2027. The premier venue will be announced shortly.',
                'sort_order' => 2,
            ],
            [
                'category' => 'Registration',
                'question' => 'Who can attend AYURPRAVAH 2027?',
                'answer' => 'The conclave welcomes Ayurveda physicians (BAMS/MD/MS), medical researchers, AYUSH students and interns, hospital administrators, wellness entrepreneurs, pharmaceutical manufacturers, and international integrative healthcare practitioners.',
                'sort_order' => 3,
            ],
            [
                'category' => 'Registration',
                'question' => 'What does my delegate registration pass include?',
                'answer' => 'Delegate passes grant access to all 13 conclave scientific halls, hands-on clinical workshops, the massive trade expo, delegate welcome kits, scientific abstract compendium, networking lunches & tea breaks, and an official verified Certificate of Participation.',
                'sort_order' => 4,
            ],
            [
                'category' => 'Exhibition',
                'question' => 'How can our company book an exhibition booth at the Expo?',
                'answer' => 'You can submit your stall interest via the "Register as Exhibitor" form on the Expo page or reach our Industry & Exhibition Cell at +91 94503 62145 / yasharthvedafoundation@gmail.com. We offer standard shell schemes and custom bare spaces with prime footfall visibility.',
                'sort_order' => 5,
            ],
            [
                'category' => 'Scientific Papers',
                'question' => 'How can I submit an abstract for oral or poster presentation?',
                'answer' => 'Abstract submissions are open through our online portal under "Submit Abstract". Submissions must align with one of the 13 thematic conclave tracks. Peer-reviewed accepted abstracts will be published in the AYURPRAVAH 2027 Indexed Scientific Proceedings.',
                'sort_order' => 6,
            ],
            [
                'category' => 'Accommodations',
                'question' => 'Are hotel accommodations provided for outstation delegates?',
                'answer' => 'We partner with accredited hospitality providers near the conclave venue offering exclusive discounted delegate rates. You can view recommended accommodations and register booking preferences through our portal.',
                'sort_order' => 7,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::updateOrCreate(
                ['question' => $faq['question']],
                $faq
            );
        }

        // 2. Accommodations
        $accommodations = [
            [
                'name' => 'Conclave Headquarters Partner Hotel (TBC)',
                'description' => 'Luxury 5-star hotel adjacent to the main convention center with dedicated delegate hospitality desks, complimentary shuttle, and high-speed Wi-Fi.',
                'price_note' => 'Special Delegate Rates: ₹5,500 – ₹8,500 / night',
                'distance' => 'Adjacent to Conclave Center (5 min walk)',
                'booking_url' => '#',
                'contact_info' => 'Hospitality Desk: +91 94503 62145',
                'rooms_total' => 120,
                'sort_order' => 1,
            ],
            [
                'name' => 'AyurPravah Official Business Partner Hotel',
                'description' => 'Executive business hotel offering spacious twin-sharing rooms, continental & Ayurvedic Sattvic breakfast, and continuous shuttle transit.',
                'price_note' => 'Corporate Package: ₹3,200 – ₹4,800 / night',
                'distance' => '1.8 km from Venue (8 min via shuttle)',
                'booking_url' => '#',
                'contact_info' => 'Desk: +91 80040 03000',
                'rooms_total' => 85,
                'sort_order' => 2,
            ],
            [
                'name' => 'Academic & Student Resident Partner Facility',
                'description' => 'Comfortable, budget-friendly residency tailored for PG scholars, researchers, and AYUSH university delegations with group dining facilities.',
                'price_note' => 'Student Subsidy: ₹1,200 – ₹2,000 / night (Shared)',
                'distance' => '3.5 km from Venue (15 min transit)',
                'booking_url' => '#',
                'contact_info' => 'Student Welfare: +91 94503 62145',
                'rooms_total' => 200,
                'sort_order' => 3,
            ],
        ];

        foreach ($accommodations as $acc) {
            Accommodation::updateOrCreate(
                ['name' => $acc['name']],
                $acc
            );
        }

        // 3. Event Sessions across the 3 Days
        $conclaves = Conclave::all()->keyBy('slug');
        $speakers = Speaker::all();

        $sessions = [
            // Day 1: 16 April 2027
            [
                'title' => 'Inaugural Plenary: The Convergence of Classical Epistemologies and 21st Century Medicine',
                'description' => 'Grand opening ceremony, ceremonial lighting, keynote addresses by visionary healthcare leaders on setting the global roadmap for Ayurveda 2030.',
                'day_number' => 1,
                'session_date' => '2027-04-16',
                'start_time' => '09:30:00',
                'end_time' => '11:00:00',
                'hall_room' => 'Plenary Hall Dhanvantari',
                'track' => 'Global Leadership',
                'type' => 'keynote',
                'conclave_slug' => 'global-ayurveda-conclave',
                'sort_order' => 1,
            ],
            [
                'title' => 'Symposium: Translational Pharmacology and Reverse Pharmacognosy',
                'description' => 'High-level scientific panel exploring bio-active molecular markers, standardized phytopharmacy, and bridging ancient formulation science with contemporary assays.',
                'day_number' => 1,
                'session_date' => '2027-04-16',
                'start_time' => '11:30:00',
                'end_time' => '13:00:00',
                'hall_room' => 'Hall Charaka (Track A)',
                'track' => 'Scientific Research',
                'type' => 'panel',
                'conclave_slug' => 'ayurveda-research-scientific-advancements',
                'sort_order' => 2,
            ],
            [
                'title' => 'Masterclass: Advanced Nadi Pariksha & Cardiovascular Bio-Sensors',
                'description' => 'Hands-on clinical workshop merging tactile pulse palpation with modern arterial compliance monitors and digital waveform analysis.',
                'day_number' => 1,
                'session_date' => '2027-04-16',
                'start_time' => '14:00:00',
                'end_time' => '16:00:00',
                'hall_room' => 'Clinical Workshop Arena 1',
                'track' => 'Clinical Practice',
                'type' => 'workshop',
                'conclave_slug' => 'clinical-ayurveda-integrative-medicine',
                'sort_order' => 3,
            ],
            [
                'title' => 'Pitch Arena: AYUSH Startups & Impact Venture Capital Summit',
                'description' => 'Curated healthcare founders pitch to domestic and international venture funds, angel networks, and sovereign biotech grantmakers.',
                'day_number' => 1,
                'session_date' => '2027-04-16',
                'start_time' => '16:30:00',
                'end_time' => '18:00:00',
                'hall_room' => 'Innovation Theatre',
                'track' => 'Entrepreneurship',
                'type' => 'presentation',
                'conclave_slug' => 'ayush-startups-entrepreneurship-conclave',
                'sort_order' => 4,
            ],

            // Day 2: 17 April 2027
            [
                'title' => 'Keynote: Artificial Intelligence, Omics & Prakriti Phenotyping',
                'description' => 'Pioneering lecture on training machine-learning models on classical Ayurvedic phenotyping datasets for targeted precision medicine.',
                'day_number' => 2,
                'session_date' => '2027-04-17',
                'start_time' => '09:30:00',
                'end_time' => '11:00:00',
                'hall_room' => 'Plenary Hall Dhanvantari',
                'track' => 'Digital Health',
                'type' => 'keynote',
                'conclave_slug' => 'digital-ayush-emerging-technologies-conclave',
                'sort_order' => 5,
            ],
            [
                'title' => 'Clinical Round Table: Managing Autoimmune & Metabolic Disorders with Panchakarma',
                'description' => 'Multi-center clinical evidence, standardized virechana protocols, and long-term biomarker remission data in rheumatoid arthritis and metabolic syndrome.',
                'day_number' => 2,
                'session_date' => '2027-04-17',
                'start_time' => '11:30:00',
                'end_time' => '13:00:00',
                'hall_room' => 'Hall Sushruta (Track B)',
                'track' => 'Clinical Mastery',
                'type' => 'panel',
                'conclave_slug' => 'panchakarma-chikitsa-excellence-conclave',
                'sort_order' => 6,
            ],
            [
                'title' => 'Interactive Workshop: Marma Chikitsa and Pain Modulation in Orthopedic Rehabilitation',
                'description' => 'Live demonstration of acute anatomical trigger point stimulation, instant pain alleviation techniques, and neuro-reflexology integration.',
                'day_number' => 2,
                'session_date' => '2027-04-17',
                'start_time' => '14:00:00',
                'end_time' => '16:00:00',
                'hall_room' => 'Clinical Workshop Arena 2',
                'track' => 'Practical Therapeutics',
                'type' => 'workshop',
                'conclave_slug' => 'clinical-ayurveda-integrative-medicine',
                'sort_order' => 7,
            ],
            [
                'title' => 'Global Regulatory Dialogue: Harmonizing Herbal Pharmacopoeias & Cross-Border Trade',
                'description' => 'Roundtable with international drug regulators, phytopharmaceutical compliance directors, and WTO trade counsel on botanical monographs.',
                'day_number' => 2,
                'session_date' => '2027-04-17',
                'start_time' => '16:30:00',
                'end_time' => '18:00:00',
                'hall_room' => 'Plenary Hall Dhanvantari',
                'track' => 'Global Policy',
                'type' => 'panel',
                'conclave_slug' => 'global-ayurveda-conclave',
                'sort_order' => 8,
            ],

            // Day 3: 18 April 2027
            [
                'title' => 'Young Innovators & Researchers Oral Scientific Presentations',
                'description' => 'The top-ranked peer-reviewed scientific papers presented by young AYUSH investigators before an international jury.',
                'day_number' => 3,
                'session_date' => '2027-04-18',
                'start_time' => '09:30:00',
                'end_time' => '11:00:00',
                'hall_room' => 'Hall Vagbhata',
                'track' => 'Scientific Research',
                'type' => 'presentation',
                'conclave_slug' => 'ayurveda-research-scientific-advancements',
                'sort_order' => 9,
            ],
            [
                'title' => 'Symposium: Sustainable Cultivation of Endangered Medicinal Plants & Fair Trade',
                'description' => 'Farm-to-formulation transparency, geo-tagging, GAP-certified clusters, and ecological conservation of red-listed Himalayan botanicals.',
                'day_number' => 3,
                'session_date' => '2027-04-18',
                'start_time' => '11:30:00',
                'end_time' => '13:00:00',
                'hall_room' => 'Hall Sushruta (Track B)',
                'track' => 'Botanicals & Supply Chain',
                'type' => 'panel',
                'conclave_slug' => 'medicinal-plants-cultivation-supply-chain',
                'sort_order' => 10,
            ],
            [
                'title' => 'Valedictory Plenary & AYURPRAVAH 2027 Declaration for Global Health',
                'description' => 'Declaration reading, felicitation of breakthrough researchers, awards ceremony for best startup and best research paper, and formal closing addresses.',
                'day_number' => 3,
                'session_date' => '2027-04-18',
                'start_time' => '14:30:00',
                'end_time' => '16:30:00',
                'hall_room' => 'Plenary Hall Dhanvantari',
                'track' => 'Grand Finale',
                'type' => 'keynote',
                'conclave_slug' => 'global-ayurveda-conclave',
                'sort_order' => 11,
            ],
        ];

        foreach ($sessions as $sessionData) {
            $conclaveSlug = $sessionData['conclave_slug'];
            unset($sessionData['conclave_slug']);

            if (isset($conclaves[$conclaveSlug])) {
                $sessionData['conclave_id'] = $conclaves[$conclaveSlug]->id;
            }

            $session = EventSession::updateOrCreate(
                ['title' => $sessionData['title']],
                $sessionData
            );

            // Attach 1-2 speakers if available
            if ($speakers->isNotEmpty()) {
                $sampleSpeakers = $speakers->random(min(2, $speakers->count()))->pluck('id')->toArray();
                $session->speakers()->sync($sampleSpeakers);
            }
        }

        // 4. Team Members
        $team = [
            [
                'name' => 'Patron & Advisory Board',
                'role' => 'AYURPRAVAH Governing Council',
                'bio' => 'Distinguished scholars, institutional directors, and healthcare leaders providing continuous scientific steering and institutional oversight.',
                'sort_order' => 1,
            ],
            [
                'name' => 'Organising Committee',
                'role' => 'Yasharth Veda Foundation & AyurWings',
                'bio' => 'Interdisciplinary team of clinicians, researchers, technologists, and conference directors orchestrating the 21 chapters of AYURPRAVAH 2027.',
                'sort_order' => 2,
            ],
            [
                'name' => 'Scientific Review Committee',
                'role' => 'Academic & Research Peer Panel',
                'bio' => 'Senior professors and clinical trial principal investigators managing blind peer-review of all oral and poster abstract submissions.',
                'sort_order' => 3,
            ],
        ];

        foreach ($team as $member) {
            TeamMember::updateOrCreate(
                ['name' => $member['name']],
                $member
            );
        }
    }
}
