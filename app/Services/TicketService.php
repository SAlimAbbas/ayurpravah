<?php

namespace App\Services;

use App\Enums\TicketStatus;
use App\Models\Registration;
use App\Models\Ticket;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class TicketService
{
    /**
     * Issue official ticket for a confirmed registration.
     */
    public function issueTicket(Registration $registration): Ticket
    {
        // Check if ticket already exists
        if ($registration->ticket) {
            return $registration->ticket;
        }

        $ticketCode = (string) Str::ulid();
        $hmacSecret = config('app.ticket_hmac_secret', env('TICKET_HMAC_SECRET', 'ayurpravah_hmac_default_secret'));

        // Signed QR payload without PII
        $payloadData = [
            'code' => $ticketCode,
            'ref' => $registration->reference,
            'event' => 'AYURPRAVAH_2027',
        ];
        $payloadJson = json_encode($payloadData);
        $signature = hash_hmac('sha256', $payloadJson, $hmacSecret);

        $signedPayload = base64_encode(json_encode([
            'data' => $payloadData,
            'sig' => $signature,
        ]));

        $ticket = Ticket::create([
            'registration_id' => $registration->id,
            'ticket_code' => $ticketCode,
            'qr_payload' => $signedPayload,
            'status' => TicketStatus::ACTIVE,
            'issued_at' => now(),
        ]);

        // Generate PDF ticket asynchronously or directly
        $this->generatePdfTicket($ticket);

        return $ticket;
    }

    /**
     * Generate printable PDF Ticket using DomPDF.
     */
    public function generatePdfTicket(Ticket $ticket): string
    {
        $registration = $ticket->registration;
        
        // Generate QR code SVG as base64 data URI
        $qrSvg = QrCode::size(180)
            ->color(22, 74, 8) // Primary Ayurvedic Green (#164a08)
            ->generate($ticket->qr_payload);
        
        $qrBase64 = 'data:image/svg+xml;base64,' . base64_encode($qrSvg);

        $pdf = Pdf::loadView('tickets.delegate_pass', [
            'ticket' => $ticket,
            'registration' => $registration,
            'qrCode' => $qrBase64,
        ]);

        $filePath = 'tickets/' . $ticket->ticket_code . '.pdf';
        Storage::disk('public')->put($filePath, $pdf->output());

        $ticket->update(['pdf_path' => $filePath]);

        return $filePath;
    }

    /**
     * Verify ticket QR signature.
     */
    public function verifyQrPayload(string $rawPayload): array
    {
        $decoded = json_decode(base64_decode($rawPayload), true);
        if (!$decoded || !isset($decoded['data'], $decoded['sig'])) {
            return ['valid' => false, 'reason' => 'Invalid QR payload format'];
        }

        $hmacSecret = config('app.ticket_hmac_secret', env('TICKET_HMAC_SECRET', 'ayurpravah_hmac_default_secret'));
        $expectedSignature = hash_hmac('sha256', json_encode($decoded['data']), $hmacSecret);

        if (!hash_equals($expectedSignature, $decoded['sig'])) {
            return ['valid' => false, 'reason' => 'Security signature mismatch'];
        }

        return [
            'valid' => true,
            'ticket_code' => $decoded['data']['code'] ?? null,
            'reference' => $decoded['data']['ref'] ?? null,
        ];
    }
}
