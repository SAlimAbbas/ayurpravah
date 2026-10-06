<?php

namespace App\Http\Controllers;

use App\Models\Accommodation;
use App\Models\Album;
use App\Models\Conclave;
use App\Models\EventSession;
use App\Models\Faq;
use App\Models\GalleryItem;
use App\Models\Page;
use App\Models\Setting;
use App\Models\Speaker;
use App\Models\Sponsor;
use App\Models\TeamMember;
use App\Models\TicketTier;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InertiaPageController extends Controller
{
    /**
     * Homepage with dynamic sections
     */
    public function home(): Response
    {
        $conclaves = Conclave::where('is_published', true)
            ->orderBy('sort_order')
            ->get();

        $speakers = Speaker::where('is_published', true)
            ->orderBy('sort_order')
            ->take(8)
            ->get();

        $tiers = TicketTier::orderBy('sort_order')->get();

        $sponsors = Sponsor::where('is_published', true)
            ->orderBy('sort_order')
            ->get()
            ->groupBy('partner_category');

        $sessions = EventSession::with(['speakers', 'conclave'])
            ->where('is_published', true)
            ->orderBy('day_number')
            ->orderBy('start_time')
            ->take(6)
            ->get();

        $faqs = Faq::where('is_published', true)
            ->orderBy('sort_order')
            ->take(6)
            ->get();

        $galleryItems = GalleryItem::with('album')
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->take(6)
            ->get();

        return Inertia::render('Home', [
            'conclaves' => $conclaves,
            'speakers' => $speakers,
            'tiers' => $tiers,
            'sponsors' => $sponsors,
            'sessions' => $sessions,
            'faqs' => $faqs,
            'galleryItems' => $galleryItems,
        ]);
    }

    /**
     * About page
     */
    public function about(): Response
    {
        $team = TeamMember::where('is_published', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('About', [
            'team' => $team,
        ]);
    }

    /**
     * AyurPravah Core Concept & Convergence
     */
    public function ayurpravah(): Response
    {
        return Inertia::render('AyurPravah');
    }

    /**
     * 13 Conclaves Directory
     */
    public function conclaves(): Response
    {
        $conclaves = Conclave::withCount('sessions')
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Conclaves', [
            'conclaves' => $conclaves,
        ]);
    }

    /**
     * Single Conclave Deep Dive
     */
    public function conclaveDetail(string $slug): Response
    {
        $conclave = Conclave::with(['sessions.speakers'])
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $otherConclaves = Conclave::where('id', '!=', $conclave->id)
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->take(4)
            ->get();

        return Inertia::render('ConclaveDetail', [
            'conclave' => $conclave,
            'otherConclaves' => $otherConclaves,
        ]);
    }

    /**
     * Speakers Directory
     */
    public function speakers(Request $request): Response
    {
        $speakers = Speaker::where('is_published', true)
            ->orderBy('sort_order')
            ->get();

        $categories = Speaker::where('is_published', true)
            ->distinct()
            ->pluck('category')
            ->filter()
            ->values();

        return Inertia::render('Speakers', [
            'speakers' => $speakers,
            'categories' => $categories,
        ]);
    }

    /**
     * Single Speaker Detail
     */
    public function speakerDetail(string $slug): Response
    {
        $speaker = Speaker::with(['sessions.conclave'])
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $otherSpeakers = Speaker::where('id', '!=', $speaker->id)
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->take(4)
            ->get();

        return Inertia::render('SpeakerDetail', [
            'speaker' => $speaker,
            'otherSpeakers' => $otherSpeakers,
        ]);
    }

    /**
     * Day-wise Program Schedule
     */
    public function program(): Response
    {
        $sessions = EventSession::with(['speakers', 'conclave'])
            ->where('is_published', true)
            ->orderBy('day_number')
            ->orderBy('start_time')
            ->get();

        $conclaves = Conclave::where('is_published', true)
            ->orderBy('title')
            ->get(['id', 'title', 'slug']);

        return Inertia::render('Program', [
            'sessions' => $sessions,
            'conclaves' => $conclaves,
        ]);
    }

    /**
     * International Expo Pavilion
     */
    public function expo(): Response
    {
        return Inertia::render('Expo');
    }

    /**
     * Partners & Sponsors
     */
    public function partners(): Response
    {
        $sponsors = Sponsor::where('is_published', true)
            ->orderBy('sort_order')
            ->get()
            ->groupBy('partner_category');

        return Inertia::render('Partners', [
            'sponsors' => $sponsors,
        ]);
    }

    /**
     * Venue & Destination Guide
     */
    public function venue(): Response
    {
        return Inertia::render('Venue');
    }

    /**
     * Hospitality & Accommodations
     */
    public function accommodation(): Response
    {
        $accommodations = Accommodation::where('is_published', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Accommodation', [
            'accommodations' => $accommodations,
        ]);
    }

    /**
     * Photo & Video Gallery
     */
    public function gallery(): Response
    {
        $albums = Album::with(['items' => function ($q) {
            $q->where('is_published', true)->orderBy('sort_order');
        }])->where('is_published', true)->orderBy('sort_order')->get();

        return Inertia::render('Gallery', [
            'albums' => $albums,
        ]);
    }

    /**
     * Contact & Inquiries
     */
    public function contact(): Response
    {
        $faqs = Faq::where('is_published', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Contact', [
            'faqs' => $faqs,
        ]);
    }

    /**
     * Delegate Registration Page
     */
    public function registerDelegate(): Response
    {
        $tiers = TicketTier::orderBy('sort_order')->get();

        return Inertia::render('RegisterDelegate', [
            'tiers' => $tiers,
        ]);
    }

    /**
     * Exhibitor Registration Page
     */
    public function registerExhibitor(): Response
    {
        return Inertia::render('RegisterExhibitor');
    }

    /**
     * Call for Papers / Abstract Submission Page
     */
    public function submitAbstract(): Response
    {
        $conclaves = Conclave::where('is_published', true)
            ->orderBy('sort_order')
            ->get(['id', 'title', 'slug']);

        return Inertia::render('SubmitAbstract', [
            'conclaves' => $conclaves,
        ]);
    }

    /**
     * Dynamic CMS Page (Privacy, Terms, Refund, etc.)
     */
    public function dynamicPage(string $slug): Response
    {
        $page = Page::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return Inertia::render('Page', [
            'page' => $page,
        ]);
    }
}
