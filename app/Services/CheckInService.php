<?php

namespace App\Services;

use App\Enums\CheckInResult;
use App\Enums\RegistrationStatus;
use App\Enums\TicketStatus;
use App\Models\CheckIn;
use App\Models\Ticket;
use App\Models\User;

class CheckInService
{
    public function __construct(
        protected TicketService $ticketService
    ) {}

    /**
     * Process QR payload scan or manual code lookup.
     */
    public function processScan(string $qrOrCode, ?User $staffUser = null, ?string $device = null, ?string $gateHall = null): array
    {
        $ticketCode = $qrOrCode;

        // Check if input is base64 signed QR payload
        if (strlen($qrOrCode) > 50 && base64_decode($qrOrCode, true)) {
            $verification = $this->ticketService->verifyQrPayload($qrOrCode);
            if (!$verification['valid']) {
                return [
                    'result' => CheckInResult::INVALID->value,
                    'status' => 'INVALID',
                    'message' => 'Invalid or forged QR security signature.',
                    'ticket' => null,
                ];
            }
            $ticketCode = $verification['ticket_code'];
        }

        // Look up ticket by code or registration reference
        $ticket = Ticket::with(['registration.tier'])->where('ticket_code', $ticketCode)
            ->orWhereHas('registration', function ($query) use ($ticketCode) {
                $query->where('reference', $ticketCode)
                      ->orWhere('email', $ticketCode)
                      ->orWhere('phone', $ticketCode);
            })->first();

        if (!$ticket) {
            return [
                'result' => CheckInResult::INVALID->value,
                'status' => 'INVALID',
                'message' => 'No active registration or ticket found for this code.',
                'ticket' => null,
            ];
        }

        $reg = $ticket->registration;

        // Check unpaid / draft
        if ($reg->status !== RegistrationStatus::PAID) {
            CheckIn::create([
                'ticket_id' => $ticket->id,
                'scanned_by' => $staffUser?->id,
                'scanned_at' => now(),
                'device' => $device,
                'result' => CheckInResult::UNPAID,
                'gate_hall' => $gateHall,
            ]);

            return [
                'result' => CheckInResult::UNPAID->value,
                'status' => 'UNPAID',
                'message' => 'Registration is not paid. Status: ' . $reg->status->label(),
                'ticket' => $this->formatTicketDetails($ticket),
            ];
        }

        // Check void / refunded / cancelled
        if ($ticket->status === TicketStatus::VOID || $reg->refund_flag || $reg->status === RegistrationStatus::REFUNDED) {
            CheckIn::create([
                'ticket_id' => $ticket->id,
                'scanned_by' => $staffUser?->id,
                'scanned_at' => now(),
                'device' => $device,
                'result' => CheckInResult::VOID,
                'gate_hall' => $gateHall,
            ]);

            return [
                'result' => CheckInResult::VOID->value,
                'status' => 'VOID',
                'message' => 'Pass is VOID or has been refunded/cancelled.',
                'ticket' => $this->formatTicketDetails($ticket),
            ];
        }

        // Check duplicate check-in
        if ($ticket->status === TicketStatus::CHECKED_IN) {
            $firstScan = $ticket->checkIns()->where('result', CheckInResult::OK)->first();

            CheckIn::create([
                'ticket_id' => $ticket->id,
                'scanned_by' => $staffUser?->id,
                'scanned_at' => now(),
                'device' => $device,
                'result' => CheckInResult::DUPLICATE,
                'gate_hall' => $gateHall,
            ]);

            return [
                'result' => CheckInResult::DUPLICATE->value,
                'status' => 'DUPLICATE',
                'message' => 'Ticket already checked in at ' . ($firstScan?->scanned_at?->format('H:i:s d M') ?? 'earlier'),
                'first_scan_at' => $firstScan?->scanned_at?->toIso8601String(),
                'scanned_by_staff' => $firstScan?->staff?->name ?? 'Staff Desk',
                'ticket' => $this->formatTicketDetails($ticket),
            ];
        }

        // Successful check-in (OK)
        $ticket->update(['status' => TicketStatus::CHECKED_IN]);

        CheckIn::create([
            'ticket_id' => $ticket->id,
            'scanned_by' => $staffUser?->id,
            'scanned_at' => now(),
            'device' => $device,
            'result' => CheckInResult::OK,
            'gate_hall' => $gateHall,
        ]);

        return [
            'result' => CheckInResult::OK->value,
            'status' => 'OK',
            'message' => 'Verified Check-in Successful. Welcome!',
            'ticket' => $this->formatTicketDetails($ticket),
        ];
    }

    /**
     * Get real-time stats for the scanner header.
     */
    public function getLiveStats(): array
    {
        $totalPaid = Ticket::whereHas('registration', function ($q) {
            $q->where('status', RegistrationStatus::PAID);
        })->count();

        $checkedInCount = Ticket::where('status', TicketStatus::CHECKED_IN)->count();

        return [
            'total_paid' => $totalPaid,
            'checked_in' => $checkedInCount,
            'remaining' => max(0, $totalPaid - $checkedInCount),
            'percent' => $totalPaid > 0 ? round(($checkedInCount / $totalPaid) * 100, 1) : 0,
        ];
    }

    protected function formatTicketDetails(Ticket $ticket): array
    {
        $reg = $ticket->registration;
        return [
            'code' => $ticket->ticket_code,
            'reference' => $reg->reference,
            'name' => $reg->title . ' ' . $reg->full_name,
            'tier' => $reg->tier->name ?? 'Delegate',
            'organisation' => $reg->organisation_college ?? 'Independent Clinician',
            'city' => $reg->city,
            'state' => $reg->state,
            'country' => $reg->country,
        ];
    }
}
