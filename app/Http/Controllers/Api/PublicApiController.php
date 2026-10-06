<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AbstractSubmission;
use App\Models\Conclave;
use App\Models\Enquiry;
use App\Models\EventSession;
use App\Models\ExhibitorLead;
use App\Models\Page;
use App\Models\Setting;
use App\Models\Speaker;
use App\Models\Sponsor;
use App\Models\TicketTier;
use App\Services\PricingService;
use App\Services\RegistrationService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PublicApiController extends Controller
{
    public function __construct(
        protected PricingService $pricingService,
        protected RegistrationService $registrationService
    ) {}

    /**
     * Public Event Settings & Countdown
     */
    public function getSettings(): JsonResponse
    {
        return response()->json([
            'event_name' => Setting::get('event_name', 'AYURPRAVAH 2027'),
            'event_name_prose' => Setting::get('event_name_prose', 'AyurPravah 2027'),
            'brand_hindi' => Setting::get('brand_hindi', 'आयुर प्रवाह'),
            'dates_label' => Setting::get('dates_label', '16th, 17th & 18th April 2027'),
            'start_date' => Setting::get('event_start_date', '2027-04-16'),
            'end_date' => Setting::get('event_end_date', '2027-04-18'),
            'countdown_date' => Setting::get('countdown_date', '2027-04-16 09:00:00'),
            'venue' => [
                'name' => Setting::get('venue_name', 'To Be Announced'),
                'city' => Setting::get('venue_city', 'TBC'),
                'map_url' => Setting::get('venue_map_url', ''),
            ],
            'departments' => Setting::get('departments', []),
            'social_links' => Setting::get('social_links', []),
            'whatsapp' => Setting::get('whatsapp_float_number', '+910000000000'),
            'meta' => [
                'title' => Setting::get('meta_title'),
                'description' => Setting::get('meta_description'),
            ],
        ]);
    }

    /**
     * Speakers Directory
     */
    public function getSpeakers(): JsonResponse
    {
        $speakers = Speaker::where('is_published', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json($speakers);
    }

    /**
     * Conclaves & Forums (13 Major Conclaves)
     */
    public function getConclaves(): JsonResponse
    {
        $conclaves = Conclave::where('is_published', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json($conclaves);
    }

    /**
     * Sessions & Day-wise Program Schedule
     */
    public function getSessions(Request $request): JsonResponse
    {
        $query = EventSession::with(['speakers', 'conclave'])
            ->where('is_published', true);

        if ($request->has('day')) {
            $query->where('day_number', $request->query('day'));
        }

        $sessions = $query->orderBy('day_number')
            ->orderBy('start_time')
            ->get();

        return response()->json($sessions);
    }

    /**
     * Active Ticket Tiers
     */
    public function getTiers(): JsonResponse
    {
        $tiers = TicketTier::orderBy('sort_order')->get();
        return response()->json($tiers);
    }

    /**
     * Sponsors & Partners Wall
     */
    public function getSponsors(): JsonResponse
    {
        $sponsors = Sponsor::where('is_published', true)
            ->orderBy('sort_order')
            ->get()
            ->groupBy('partner_category');

        return response()->json($sponsors);
    }

    /**
     * Pricing Quote calculation (Server-authoritative)
     */
    public function calculateQuote(Request $request): JsonResponse
    {
        $request->validate([
            'tier_id' => 'required|integer|exists:ticket_tiers,id',
            'coupon_code' => 'nullable|string|max:50',
            'quantity' => 'nullable|integer|min:1|max:10',
        ]);

        try {
            $quote = $this->pricingService->calculateQuote(
                $request->input('tier_id'),
                $request->input('coupon_code'),
                $request->input('quantity', 1)
            );
            return response()->json($quote);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    /**
     * Save draft registration & initiate checkout
     */
    public function saveDraftAndCheckout(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'tier_id' => 'required|integer|exists:ticket_tiers,id',
            'title' => 'required|string|max:20',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:30',
            'designation' => 'nullable|string|max:255',
            'organisation_college' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'registration_council_no' => 'nullable|string|max:100',
            'gstin' => 'nullable|string|max:30',
            'coupon_code' => 'nullable|string|max:50',
            'uuid' => 'nullable|string|uuid',
        ]);

        try {
            $registration = $this->registrationService->createOrUpdateDraft($validated, $request->input('uuid'));
            $checkoutResult = $this->registrationService->initiateCheckout($registration);

            return response()->json($checkoutResult);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    /**
     * Poll registration status by UUID
     */
    public function getRegistrationStatus(string $uuid): JsonResponse
    {
        $reg = \App\Models\Registration::with(['tier', 'ticket'])
            ->where('uuid', $uuid)
            ->firstOrFail();

        return response()->json([
            'uuid' => $reg->uuid,
            'reference' => $reg->reference,
            'status' => $reg->status->value,
            'status_label' => $reg->status->label(),
            'name' => $reg->title . ' ' . $reg->full_name,
            'tier' => $reg->tier->name,
            'total' => $reg->total,
            'ticket_code' => $reg->ticket?->ticket_code,
            'pdf_url' => $reg->ticket?->pdf_path ? "/storage/{$reg->ticket->pdf_path}" : null,
        ]);
    }

    /**
     * Submit Exhibitor Lead
     */
    public function submitExhibitorLead(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'contact_person' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:30',
            'website' => 'nullable|string|max:255',
            'category_industry' => 'nullable|string|max:255',
            'stall_interest' => 'nullable|string|max:100',
            'stall_size' => 'nullable|string|max:100',
            'products_brief' => 'nullable|string',
            'message' => 'nullable|string',
        ]);

        $validated['uuid'] = (string) Str::uuid();
        $validated['source'] = 'public_website';
        $lead = ExhibitorLead::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Thank you for your interest in exhibiting at AYURPRAVAH 2027. Our exhibition team will connect with you shortly.',
            'lead_id' => $lead->uuid,
        ]);
    }

    /**
     * Submit Abstract Paper
     */
    public function submitAbstract(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'author_name' => 'required|string|max:255',
            'author_email' => 'required|email|max:255',
            'author_phone' => 'required|string|max:30',
            'affiliation' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'track_category' => 'required|string|max:255',
            'conclave_id' => 'nullable|integer|exists:conclaves,id',
            'abstract_text' => 'required|string',
            'keywords' => 'nullable|string|max:255',
            'presentation_type' => 'required|in:oral,poster',
            'file' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
        ]);

        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('abstracts', 'public');
        }

        $abstract = AbstractSubmission::create([
            'uuid' => (string) Str::uuid(),
            'author_name' => $validated['author_name'],
            'author_email' => $validated['author_email'],
            'author_phone' => $validated['author_phone'],
            'affiliation' => $validated['affiliation'],
            'title' => $validated['title'],
            'track_category' => $validated['track_category'],
            'conclave_id' => $validated['conclave_id'] ?? null,
            'abstract_text' => $validated['abstract_text'],
            'keywords' => $validated['keywords'] ?? null,
            'presentation_type' => $validated['presentation_type'],
            'file_path' => $filePath,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Abstract paper submitted successfully for peer review.',
            'uuid' => $abstract->uuid,
        ]);
    }

    /**
     * Submit General / Partner / Sponsorship Enquiry
     */
    public function submitEnquiry(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'type' => 'required|in:partner,sponsorship,contact',
            'department' => 'nullable|string|max:50',
            'name' => 'required|string|max:255',
            'organisation' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:30',
            'message' => 'required|string',
        ]);

        Enquiry::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Thank you. Your message has been routed to the appropriate department coordinator.',
        ]);
    }
}
