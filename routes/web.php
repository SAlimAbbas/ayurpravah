<?php

use App\Http\Controllers\Api\RazorpayWebhookController;
use App\Http\Controllers\CheckInController;
use App\Http\Controllers\InertiaPageController;
use App\Models\Registration;
use App\Models\Ticket;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| AYURPRAVAH 2027 — Web Routes
|--------------------------------------------------------------------------
*/

// Core Public Pages (Inertia + React)
Route::get('/', [InertiaPageController::class, 'home'])->name('home');
Route::get('/about', [InertiaPageController::class, 'about'])->name('about');
Route::get('/ayurpravah', [InertiaPageController::class, 'ayurpravah'])->name('ayurpravah');
Route::get('/conclaves', [InertiaPageController::class, 'conclaves'])->name('conclaves');
Route::get('/conclaves/{slug}', [InertiaPageController::class, 'conclaveDetail'])->name('conclaves.detail');
Route::get('/speakers', [InertiaPageController::class, 'speakers'])->name('speakers');
Route::get('/speakers/{slug}', [InertiaPageController::class, 'speakerDetail'])->name('speakers.detail');
Route::get('/program', [InertiaPageController::class, 'program'])->name('program');
Route::get('/expo', [InertiaPageController::class, 'expo'])->name('expo');
Route::get('/partners', [InertiaPageController::class, 'partners'])->name('partners');
Route::get('/venue', [InertiaPageController::class, 'venue'])->name('venue');
Route::get('/accommodation', [InertiaPageController::class, 'accommodation'])->name('accommodation');
Route::get('/gallery', [InertiaPageController::class, 'gallery'])->name('gallery');
Route::get('/contact', [InertiaPageController::class, 'contact'])->name('contact');

// Interactive Inbound Portals
Route::get('/register/delegate', [InertiaPageController::class, 'registerDelegate'])->name('register.delegate');
Route::get('/register/exhibitor', [InertiaPageController::class, 'registerExhibitor'])->name('register.exhibitor');
Route::get('/submit-abstract', [InertiaPageController::class, 'submitAbstract'])->name('submit.abstract');

// Dynamic Policy / CMS Pages
Route::get('/privacy-policy', fn() => app(InertiaPageController::class)->dynamicPage('privacy-policy'))->name('privacy');
Route::get('/terms', fn() => app(InertiaPageController::class)->dynamicPage('terms'))->name('terms');
Route::get('/refund-policy', fn() => app(InertiaPageController::class)->dynamicPage('refund-policy'))->name('refund');
Route::get('/page/{slug}', [InertiaPageController::class, 'dynamicPage'])->name('page.dynamic');

// Check-in Scanner PWA
Route::get('/checkin', [CheckInController::class, 'index'])->name('checkin.index');

// Webhook-First Payment Gateway Receiver
Route::post('/webhooks/razorpay', [RazorpayWebhookController::class, 'handle'])->name('webhooks.razorpay');

// Public Ticket View / Download (by unguessable ticket code)
Route::get('/ticket/{code}', function (string $code) {
    $ticket = Ticket::with(['registration.tier'])->where('ticket_code', $code)->firstOrFail();
    if ($ticket->pdf_path && file_exists(storage_path('app/public/' . $ticket->pdf_path))) {
        return response()->file(storage_path('app/public/' . $ticket->pdf_path));
    }
    return view('tickets.delegate_pass', [
        'ticket' => $ticket,
        'registration' => $ticket->registration,
        'qrCode' => 'data:image/svg+xml;base64,' . base64_encode(\SimpleSoftwareIO\QrCode\Facades\QrCode::size(180)->generate($ticket->qr_payload)),
    ]);
})->name('ticket.view');

// Payment Success Confirmation
Route::get('/payment/success/{ref}', function (string $ref) {
    $registration = Registration::with(['tier', 'ticket'])->where('reference', $ref)->firstOrFail();
    return view('payment.success', compact('registration'));
})->name('payment.success');

// Payment Failed Retry
Route::get('/payment/failed/{ref}', function (string $ref) {
    $registration = Registration::with(['tier'])->where('reference', $ref)->firstOrFail();
    return view('payment.failed', compact('registration'));
})->name('payment.failed');

// XML Sitemap
Route::get('/sitemap.xml', function () {
    $urls = [
        '/',
        '/about',
        '/ayurpravah',
        '/conclaves',
        '/speakers',
        '/program',
        '/expo',
        '/partners',
        '/venue',
        '/accommodation',
        '/gallery',
        '/contact',
        '/register/delegate',
        '/register/exhibitor',
        '/submit-abstract',
        '/privacy-policy',
        '/terms',
        '/refund-policy',
    ];

    $xml = '<?xml version="1.0" encoding="UTF-8"?>';
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    foreach ($urls as $url) {
        $xml .= '<url>';
        $xml .= '<loc>' . url($url) . '</loc>';
        $xml .= '<lastmod>' . date('Y-m-d') . '</lastmod>';
        $xml .= '<changefreq>daily</changefreq>';
        $xml .= '<priority>' . ($url === '/' ? '1.0' : '0.8') . '</priority>';
        $xml .= '</url>';
    }
    $xml .= '</urlset>';

    return response($xml, 200, ['Content-Type' => 'application/xml']);
});
