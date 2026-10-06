<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Confirmed — AYURPRAVAH 2027</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #F7F5EC; color: #503323; font-family: system-ui, -apple-system, sans-serif; }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4">
    <div class="bg-white border-2 border-[#B89A4A] rounded-2xl max-w-lg w-full p-8 text-center shadow-xl">
        <div class="w-16 h-16 bg-[#164a08] text-white rounded-full flex items-center justify-center mx-auto text-3xl mb-4 shadow-md">
            ✓
        </div>

        <div class="text-xs uppercase tracking-widest text-[#B89A4A] font-bold">Registration Confirmed</div>
        <h1 class="text-2xl font-bold text-[#164a08] mt-1">AYURPRAVAH 2027</h1>
        <p class="text-xs text-[#3e7405] mt-0.5">आयुर प्रवाह • 16, 17 & 18 April 2027</p>

        <div class="bg-[#F7F5EC] rounded-xl p-5 my-6 text-left border border-[#B89A4A]/20">
            <div class="flex justify-between items-center pb-3 border-b border-[#E8E4D5]">
                <span class="text-xs uppercase tracking-wider text-neutral-500">Booking Reference</span>
                <span class="font-mono font-bold text-sm text-[#164a08]">{{ $registration->reference }}</span>
            </div>
            <div class="py-2">
                <div class="text-xs text-neutral-500">Delegate Name</div>
                <div class="font-bold text-[#164a08]">{{ $registration->title }} {{ $registration->full_name }}</div>
            </div>
            <div class="py-1">
                <div class="text-xs text-neutral-500">Pass Category</div>
                <div class="font-semibold text-sm">{{ $registration->tier->name ?? 'Delegate Pass' }}</div>
            </div>
            <div class="pt-2 flex justify-between items-center border-t border-[#E8E4D5] mt-2">
                <span class="text-xs text-neutral-500">Amount Paid</span>
                <span class="font-bold text-base text-[#164a08]">₹{{ number_format($registration->total / 100, 2) }}</span>
            </div>
        </div>

        @if($registration->ticket)
            <div class="space-y-3">
                <a href="{{ route('ticket.view', $registration->ticket->ticket_code) }}" target="_blank"
                   class="inline-block w-full bg-[#164a08] text-white py-3.5 px-6 rounded-xl font-bold hover:bg-[#254006] transition shadow-md">
                    Download Official Pass (PDF) ➔
                </a>
            </div>
        @else
            <div class="text-xs text-neutral-500 italic">
                Your payment is being verified by webhook. Your official pass and QR badge will arrive by email shortly.
            </div>
        @endif

        <div class="mt-6 pt-4 border-t border-neutral-100">
            <a href="/" class="text-xs text-[#164a08] font-bold hover:underline">
                Return to AYURPRAVAH Home
            </a>
        </div>
    </div>
</body>
</html>
