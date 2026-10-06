<?php

namespace App\Http\Controllers;

use App\Services\CheckInService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class CheckInController extends Controller
{
    public function __construct(
        protected CheckInService $checkInService
    ) {}

    /**
     * Scanner Web App View (/checkin)
     */
    public function index(): View
    {
        $stats = $this->checkInService->getLiveStats();
        return view('checkin.scanner', compact('stats'));
    }

    /**
     * Process Scan Request (API)
     */
    public function scan(Request $request): JsonResponse
    {
        $request->validate([
            'qr_code' => 'required|string',
            'device' => 'nullable|string|max:100',
            'gate_hall' => 'nullable|string|max:100',
        ]);

        $result = $this->checkInService->processScan(
            $request->input('qr_code'),
            auth()->user(),
            $request->input('device', 'Camera Scanner'),
            $request->input('gate_hall', 'Main Gate')
        );

        $result['live_stats'] = $this->checkInService->getLiveStats();

        return response()->json($result);
    }

    /**
     * Real-time Scanner Stats (API)
     */
    public function stats(): JsonResponse
    {
        return response()->json($this->checkInService->getLiveStats());
    }
}
