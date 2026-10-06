<?php

namespace Database\Seeders;

use App\Models\Conclave;
use Illuminate\Database\Seeder;

class ConclaveSeeder extends Seeder
{
    public function run(): void
    {
        $conclaves = [
            [
                'title' => 'Global Experts Conclave',
                'slug' => 'global-experts-conclave',
                'layout' => 'featured',
                'short_description' => 'Flagship assembly of visionary global leaders, policymakers, institutional heads, and international luminaries charting the future trajectory of Ayurveda.',
                'description' => 'The Global Experts Conclave convenes senior leadership from premier international healthcare organizations, universities, and government bodies. Deliberations center on global policy integration, cross-border standardizations, and the strategic positioning of traditional systems within modern health infrastructures.',
                'focus_areas' => ['Global Policy Integration', 'Cross-Border Collaboration', 'Healthcare Systems Diplomacy', 'WHO Traditional Medicine Strategy'],
                'workshop_info' => 'High-level roundtables and bilateral institutional dialogues.',
                'sort_order' => 1,
            ],
            [
                'title' => 'Expert-Led Clinical Sessions',
                'slug' => 'expert-led-clinical-sessions',
                'layout' => 'standard',
                'short_description' => 'Deep clinical immersions into classical diagnostics, complex pathology management, and evidence-guided therapeutic outcomes.',
                'description' => 'Master clinicians share decades of bedside experience, dissecting challenging clinical case studies across autoimmune disorders, metabolic conditions, and chronic degenerative diseases.',
                'focus_areas' => ['Advanced Nadi Pariksha', 'Autoimmune Pathologies', 'Integrative Oncology Case Studies', 'Panchakarma Protocol Refinements'],
                'workshop_info' => 'Clinical diagnosis masterclasses with patient case discussions.',
                'sort_order' => 2,
            ],
            [
                'title' => 'Ayurveda Research & Publication Conclave',
                'slug' => 'research-publication-conclave',
                'layout' => 'image',
                'short_description' => 'Rigorous scientific inquiry, clinical trial methodologies, translational pharmacology, and high-impact academic publishing.',
                'description' => 'Bridging traditional epistemologies with randomized controlled trials, reverse pharmacology, genomics, and international peer-reviewed publication protocols.',
                'focus_areas' => ['RCT Methodologies for AYUSH', 'Reverse Pharmacology', 'Ayurgenomics', 'Indexing & High-Impact Journal Publishing'],
                'workshop_info' => 'Hands-on scientific writing and biostatistics for healthcare researchers.',
                'sort_order' => 3,
            ],
            [
                'title' => 'Hands-on Clinical Workshops',
                'slug' => 'hands-on-clinical-workshops',
                'layout' => 'horizontal',
                'short_description' => 'Intensive, practical skill-building workshops led by master practitioners across therapeutic modalities.',
                'description' => 'Dedicated skill transfer stations focusing on Marma Chikitsa, Agnikarma, Viddhakarma, and authentic classical formulation preparations.',
                'focus_areas' => ['Marma Chikitsa Precision', 'Agnikarma & Viddha Techniques', 'Specialized Netra Tarpana & Shirodhara', 'Emergency AYUSH Interventions'],
                'workshop_info' => 'Limited-batch practical workshop with individual practice stations.',
                'sort_order' => 4,
            ],
            [
                'title' => 'AYUSH Policy, Regulation & NABH Forum',
                'slug' => 'ayush-policy-regulation-nabh-forum',
                'layout' => 'standard',
                'short_description' => 'Deciphering hospital accreditation standards, regulatory compliance, pharmacovigilance, and quality governance.',
                'description' => 'Direct interaction with accreditation authorities, NABH assessors, and legal regulatory experts to streamline institutional compliance and elevate clinical safety standards.',
                'focus_areas' => ['NABH Entry & Full Level Accreditation', 'Drug Standardization & Pharmacopeia', 'Clinical Establishment Act Compliance', 'Pharmacovigilance Monitoring'],
                'workshop_info' => 'Hospital accreditation audit simulation and documentation clinic.',
                'sort_order' => 5,
            ],
            [
                'title' => 'Hospital & Healthcare Leadership Summit',
                'slug' => 'hospital-healthcare-leadership-summit',
                'layout' => 'offset',
                'short_description' => 'Executive strategies for hospital administrators, clinic chain founders, and healthcare institution builders.',
                'description' => 'Exploring sustainable financial models, patient journey engineering, talent retention, and cross-functional integration of integrative medicine units in tertiary hospitals.',
                'focus_areas' => ['Healthcare Facility Scaling', 'Patient Experience Optimization', 'Integrative Hospital Architecture', 'Clinical Talent Leadership'],
                'workshop_info' => 'Executive masterclass on clinic management systems and ROI modeling.',
                'sort_order' => 6,
            ],
            [
                'title' => 'AI, Digital Health & Technology Forum',
                'slug' => 'ai-digital-health-technology-forum',
                'layout' => 'image',
                'short_description' => 'The cutting edge of artificial intelligence, digital Prakriti assessment, telemetry, and modern health-tech for Ayurveda.',
                'description' => 'Examining diagnostic AI models trained on classical texts, computerized pulse diagnosis sensors, digital EHR integration, and tele-consultation infrastructure.',
                'focus_areas' => ['AI Diagnostic Algorithms', 'Sensory Pulse Analytics', 'Digital Health Record Standards (ABDM)', 'Telemedicine Innovations'],
                'workshop_info' => 'Demonstrations of modern health-tech integrations and API ecosystems.',
                'sort_order' => 7,
            ],
            [
                'title' => 'Startup & Innovation Conclave',
                'slug' => 'startup-innovation-conclave',
                'layout' => 'standard',
                'short_description' => 'Pitching arena, venture capital networking, and acceleration track for modern Ayurveda and wellness startups.',
                'description' => 'Connecting high-growth health-tech, nutraceutical, and clinical startups with angel networks, institutional venture capital, and commercial mentors.',
                'focus_areas' => ['Venture Pitching', 'D2C Brand Architecture', 'Supply Chain Transparency', 'Regulatory Pathways for New Formulations'],
                'workshop_info' => 'Live pitch sessions and 1-on-1 investor matchmaking meetings.',
                'sort_order' => 8,
            ],
            [
                'title' => 'B2B, D2C & Strategic Industry Connect',
                'slug' => 'b2b-d2c-industry-connect',
                'layout' => 'horizontal',
                'short_description' => 'Curated marketplace connecting raw herb cultivators, GMP manufacturers, distribution chains, and retail buyers.',
                'description' => 'Structured business-to-business networking sessions designed to eliminate supply friction, negotiate long-term procurement, and explore cross-territory distribution partnerships.',
                'focus_areas' => ['Contract Farming Procurement', 'GMP Formulation Sourcing', 'Omnichannel Retail Distribution', 'Global Export Packaging'],
                'workshop_info' => 'Speed-networking sessions and buyer-seller procurement summits.',
                'sort_order' => 9,
            ],
            [
                'title' => 'AYUSH Industry, Investment & Growth Summit',
                'slug' => 'ayush-industry-investment-growth-summit',
                'layout' => 'standard',
                'short_description' => 'Macro-economic analysis, sovereign funding instruments, export subsidies, and industrial manufacturing capacity building.',
                'description' => 'High-level economic dialogues with finance ministries, export development agencies, and financial institutions on manufacturing scale, capital expenditure, and international trade treaties.',
                'focus_areas' => ['Export Incentives & Subsidies', 'Capital Financing for Greenfields', 'Tariff & Non-Tariff Barriers', 'Sustainability in Sourcing'],
                'workshop_info' => 'Financial planning and subsidy navigation clinic for manufacturers.',
                'sort_order' => 10,
            ],
            [
                'title' => 'International Collaboration & Knowledge Exchange',
                'slug' => 'international-collaboration-knowledge-exchange',
                'layout' => 'image',
                'short_description' => 'Bilateral academic partnerships, international clinical research fellowships, and faculty exchange MoUs.',
                'description' => 'Formalizing academic tie-ups, reciprocal degree validations, and collaborative global clinical trials between Indian premier institutes and foreign medical universities.',
                'focus_areas' => ['Bilateral University MoUs', 'International Faculty Fellowships', 'Collaborative Clinical Trials', 'Global Student Exchanges'],
                'workshop_info' => 'MoU drafting and institutional partnership signing protocols.',
                'sort_order' => 11,
            ],
            [
                'title' => 'Public Awareness & Health Camp',
                'slug' => 'public-awareness-health-camp',
                'layout' => 'offset',
                'short_description' => 'Community health outreach, lifestyle consultations, preventive guidance, and free wellness screenings.',
                'description' => 'Demystifying classical wellness principles for the broader public through live demonstrations of Dinacharya, seasonal dietetics, and free medical consultations.',
                'focus_areas' => ['Preventive Dinacharya', 'Seasonal Ahara & Vihara', 'Free Geriatric Health Screenings', 'Community Herbal Remedies'],
                'workshop_info' => 'Public cooking masterclasses and therapeutic herb garden walks.',
                'sort_order' => 12,
            ],
            [
                'title' => 'AYUSH & Wellness Expo',
                'slug' => 'ayush-wellness-expo',
                'layout' => 'featured',
                'short_description' => 'Grand commercial exhibition showcasing 100+ premier brands, clinical technologies, raw herb innovations, and therapeutic services.',
                'description' => 'A premier exhibition pavilion bringing together over 50,000 visitors, clinicians, and trade buyers with interactive demonstration booths, live clinical displays, and brand showcases.',
                'focus_areas' => ['Brand Showcases', 'Live Formulation Processing', 'Diagnostic Machinery Demonstrations', 'Interactive Wellness Pavilions'],
                'workshop_info' => 'Continuous live booth demonstrations and experiential tasting arenas.',
                'sort_order' => 13,
            ],
        ];

        foreach ($conclaves as $conclave) {
            Conclave::firstOrCreate(['slug' => $conclave['slug']], $conclave);
        }
    }
}
