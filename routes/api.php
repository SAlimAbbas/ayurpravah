<?php

use App\Http\Controllers\Api\PublicApiController;
use App\Http\Controllers\Api\RazorpayWebhookController;
use App\Http\Controllers\CheckInController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| AYURPRAVAH 2027 — Public & Platform API Routes
|--------------------------------------------------------------------------
*/

// Public Content & Event Data
Route::get('/settings/public', [PublicApiController::class, 'getSettings']);
Route::get('/speakers', [PublicApiController::class, 'getSpeakers']);
Route::get('/conclaves', [PublicApiController::class, 'getConclaves']);
Route::get('/sessions', [PublicApiController::class, 'getSessions']);
Route::get('/tiers', [PublicApiController::class, 'getTiers']);
Route::get('/sponsors', [PublicApiController::class, 'getSponsors']);

// Delegate Registration & Checkout
Route::post('/pricing/quote', [PublicApiController::class, 'calculateQuote']);
Route::post('/registrations/draft', [PublicApiController::class, 'saveDraftAndCheckout']);
Route::get('/registrations/{uuid}/status', [PublicApiController::class, 'getRegistrationStatus']);

// Interactive Inbound Submissions
Route::post('/exhibitors', [PublicApiController::class, 'submitExhibitorLead']);
Route::post('/abstracts', [PublicApiController::class, 'submitAbstract']);
Route::post('/enquiries', [PublicApiController::class, 'submitEnquiry']);

// On-site Scanner Endpoints
Route::post('/checkin/scan', [CheckInController::class, 'scan']);
Route::get('/checkin/stats', [CheckInController::class, 'stats']);
