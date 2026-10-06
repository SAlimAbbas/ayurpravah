<?php

namespace Tests\Feature;

use App\Enums\CheckInResult;
use App\Enums\RegistrationStatus;
use App\Enums\TicketStatus;
use App\Models\Conclave;
use App\Models\Coupon;
use App\Models\Registration;
use App\Models\Speaker;
use App\Models\Ticket;
use App\Models\TicketTier;
use App\Models\User;
use App\Services\CheckInService;
use App\Services\RegistrationService;
use App\Services\TicketService;
use Filament\Facades\Filament;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class AyurpravahPlatformTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }
    /**
     * Test public settings endpoint.
     */
    public function test_public_settings_endpoint_returns_valid_data(): void
    {
        $response = $this->getJson('/api/settings/public');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'event_name',
                'brand_hindi',
                'dates_label',
                'countdown_date',
                'venue' => ['name', 'city'],
            ])
            ->assertJson([
                'event_name' => 'AYURPRAVAH 2027',
                'brand_hindi' => 'आयुर प्रवाह',
            ]);
    }

    /**
     * Test 13 conclaves are seeded and returned.
     */
    public function test_conclaves_endpoint_returns_thirteen_conclaves(): void
    {
        $response = $this->getJson('/api/conclaves');

        $response->assertStatus(200);
        $this->assertGreaterThanOrEqual(13, count($response->json()));
    }

    /**
     * Test pricing quote calculation with coupon discount.
     */
    public function test_pricing_quote_with_coupon_applies_discount_correctly(): void
    {
        $tier = TicketTier::firstOrCreate(
            ['name' => 'Test Delegate Tier'],
            [
                'category' => 'delegate',
                'price' => 100000, // ₹1,000 in minor units (paise)
                'currency' => 'INR',
                'gst_percent' => 18.00,
                'is_active' => true,
                'quota' => 500,
            ]
        );

        $coupon = Coupon::firstOrCreate(
            ['code' => 'TEST10'],
            [
                'discount_type' => 'percent',
                'value' => 10.00,
                'usage_limit' => 50,
                'is_active' => true,
            ]
        );

        $response = $this->postJson('/api/pricing/quote', [
            'tier_id' => $tier->id,
            'coupon_code' => 'TEST10',
            'quantity' => 1,
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'subtotal' => 100000,
                'discount' => 10000, // 10% of 100,000 = 10,000
                'tax' => 16200,      // 18% of 90,000 = 16,200
                'total' => 106200,    // 90,000 + 16,200 = 106,200 (₹1,062)
            ]);
    }

    /**
     * Test draft registration and checkout hold creation.
     */
    public function test_draft_registration_and_checkout_hold(): void
    {
        $tier = TicketTier::firstOrCreate(
            ['name' => 'Delegate Live Tier'],
            [
                'category' => 'delegate',
                'price' => 500000, // ₹5,000 in paise
                'currency' => 'INR',
                'gst_percent' => 18.00,
                'is_active' => true,
                'quota' => 100,
            ]
        );

        $response = $this->postJson('/api/registrations/draft', [
            'tier_id' => $tier->id,
            'title' => 'Dr.',
            'full_name' => 'Vaidya Sharma',
            'email' => 'vaidya.sharma@example.com',
            'phone' => '+91 9876543210',
            'designation' => 'Senior Ayurvedic Physician',
            'organisation_college' => 'Ayurvedic Medical College',
            'city' => 'Jaipur',
            'state' => 'Rajasthan',
            'country' => 'India',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'type',
                'order' => ['order_id', 'amount', 'currency'],
                'registration' => ['uuid', 'reference', 'name', 'email'],
            ]);

        $this->assertDatabaseHas('registrations', [
            'email' => 'vaidya.sharma@example.com',
            'status' => RegistrationStatus::PENDING->value,
        ]);
    }

    /**
     * Test Razorpay webhook confirms payment and issues ticket with signed QR.
     */
    public function test_webhook_confirms_payment_and_issues_ticket(): void
    {
        $tier = TicketTier::first();
        $registration = Registration::create([
            'uuid' => (string) Str::uuid(),
            'reference' => 'AP27-TEST01',
            'type' => 'delegate',
            'tier_id' => $tier->id,
            'status' => RegistrationStatus::PENDING,
            'title' => 'Dr.',
            'full_name' => 'Test Webhook Attendee',
            'email' => 'attendee@example.com',
            'phone' => '+91 9876500000',
            'subtotal' => 100000,
            'total' => 118000,
        ]);

        \App\Models\Payment::create([
            'registration_id' => $registration->id,
            'gateway' => 'razorpay',
            'gateway_order_id' => 'order_test_hook_123',
            'amount' => 118000,
            'currency' => 'INR',
            'status' => \App\Enums\PaymentStatus::CREATED,
        ]);

        $webhookPayload = [
            'event' => 'payment.captured',
            'event_id' => 'evt_test_capture_' . Str::random(8),
            'payload' => [
                'payment' => [
                    'entity' => [
                        'id' => 'pay_test_' . Str::random(8),
                        'order_id' => 'order_test_hook_123',
                        'amount' => 118000,
                        'currency' => 'INR',
                    ]
                ]
            ]
        ];

        $response = $this->postJson('/webhooks/razorpay', $webhookPayload);
        $response->assertStatus(200);

        $registration->refresh();
        $this->assertEquals(RegistrationStatus::PAID, $registration->status);
        $this->assertNotNull($registration->ticket);
        $this->assertEquals(TicketStatus::ACTIVE, $registration->ticket->status);
    }

    /**
     * Test QR check-in scanner verifies valid ticket and flags duplicate scan.
     */
    public function test_checkin_scan_verifies_ticket_and_detects_duplicate(): void
    {
        $tier = TicketTier::first();
        $registration = Registration::create([
            'uuid' => (string) Str::uuid(),
            'reference' => 'AP27-SCAN01',
            'type' => 'delegate',
            'tier_id' => $tier->id,
            'status' => RegistrationStatus::PAID,
            'title' => 'Dr.',
            'full_name' => 'Scan Test Attendee',
            'email' => 'scan.test@example.com',
            'phone' => '+91 9111122222',
            'total' => 0,
        ]);

        $ticketService = app(TicketService::class);
        $ticket = $ticketService->issueTicket($registration);

        $checkInService = app(CheckInService::class);

        // First scan: should be OK
        $firstScan = $checkInService->processScan($ticket->qr_payload);
        $this->assertEquals(CheckInResult::OK->value, $firstScan['result']);

        // Second scan: should be DUPLICATE
        $secondScan = $checkInService->processScan($ticket->qr_payload);
        $this->assertEquals(CheckInResult::DUPLICATE->value, $secondScan['result']);
    }

    /**
     * Test Role Access Control: Super Admin has admin access; Check-in Staff is blocked from admin.
     */
    public function test_role_access_control(): void
    {
        $superAdmin = User::where('email', 'admin@ayurpravah.org')->first();
        $checkInStaff = User::where('email', 'checkin@ayurpravah.org')->first();

        $panel = Filament::getPanel('admin');

        $this->assertTrue($superAdmin->canAccessPanel($panel));
        $this->assertFalse($checkInStaff->canAccessPanel($panel));
    }

    /**
     * Test check-in scanner PWA route loads.
     */
    public function test_checkin_pwa_route_loads(): void
    {
        $response = $this->get('/checkin');
        $response->assertStatus(200)
            ->assertSee('AYURPRAVAH 2027')
            ->assertSee('Rapid QR Scanner');
    }

    /**
     * Test XML sitemap route.
     */
    public function test_sitemap_xml_returns_valid_xml(): void
    {
        $response = $this->get('/sitemap.xml');
        $response->assertStatus(200)
            ->assertHeader('Content-Type', 'application/xml')
            ->assertSee('<loc>', false)
            ->assertSee('<urlset', false);
    }

    /**
     * Test Inertia homepage renders successfully with dynamic props.
     */
    public function test_homepage_renders_inertia_with_dynamic_props(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Home')
            ->has('conclaves', 13)
            ->has('speakers')
            ->has('tiers')
        );
    }

    /**
     * Test Conclaves directory renders with 13 conclaves.
     */
    public function test_conclaves_directory_renders(): void
    {
        $response = $this->get('/conclaves');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Conclaves')
            ->has('conclaves', 13)
        );
    }

    /**
     * Test single conclave detail page renders.
     */
    public function test_single_conclave_detail_renders(): void
    {
        $conclave = Conclave::first();
        $response = $this->get("/conclaves/{$conclave->slug}");
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('ConclaveDetail')
            ->where('conclave.slug', $conclave->slug)
        );
    }

    /**
     * Test public exhibitor lead submission.
     */
    public function test_exhibitor_lead_submission(): void
    {
        $response = $this->postJson('/api/exhibitors', [
            'company' => 'Charaka Botanicals Ltd',
            'contact_person' => 'Vaidya Harish',
            'email' => 'harish@charakabotanicals.com',
            'phone' => '+919876543210',
            'category_industry' => 'Ayurvedic Medicines & Formulations',
            'stall_interest' => '9 sqm Shell Scheme',
        ]);

        $response->assertStatus(200)
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('exhibitor_leads', [
            'company' => 'Charaka Botanicals Ltd',
            'email' => 'harish@charakabotanicals.com',
        ]);
    }

    /**
     * Test public abstract paper submission.
     */
    public function test_abstract_paper_submission(): void
    {
        $response = $this->postJson('/api/abstracts', [
            'author_name' => 'Dr. Meera Nambiar',
            'author_email' => 'meera@aiims.edu',
            'author_phone' => '+919876543211',
            'affiliation' => 'Dept of Integrative Medicine',
            'title' => 'Clinical Remission of Psoriasis with Standardized Virechana',
            'track_category' => 'Panchakarma & Clinical Therapeutics',
            'abstract_text' => 'This open-label trial evaluated 60 patients with chronic plaque psoriasis undergoing classical snehana, svedana, and virechana protocols.',
            'presentation_type' => 'oral',
        ]);

        $response->assertStatus(200)
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('abstract_submissions', [
            'author_name' => 'Dr. Meera Nambiar',
            'author_email' => 'meera@aiims.edu',
        ]);
    }

    /**
     * Test general enquiry submission.
     */
    public function test_enquiry_submission(): void
    {
        $response = $this->postJson('/api/enquiries', [
            'type' => 'contact',
            'department' => 'Delegate Registration',
            'name' => 'Dr. Suresh Kumar',
            'email' => 'suresh@ayush.gov.in',
            'phone' => '+919876543212',
            'message' => 'Requesting invoice format for institutional group delegation.',
        ]);

        $response->assertStatus(200)
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('enquiries', [
            'name' => 'Dr. Suresh Kumar',
            'email' => 'suresh@ayush.gov.in',
        ]);
    }
}

