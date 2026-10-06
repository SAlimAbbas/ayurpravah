<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Incomplete — AYURPRAVAH 2027</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #F7F5EC; color: #503323; font-family: system-ui, -apple-system, sans-serif; }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4">
    <div class="bg-white border-2 border-rose-200 rounded-2xl max-w-lg w-full p-8 text-center shadow-xl">
        <div class="w-16 h-16 bg-rose-600 text-white rounded-full flex items-center justify-center mx-auto text-3xl mb-4 shadow-md">
            !
        </div>

        <div class="text-xs uppercase tracking-widest text-rose-600 font-bold">Payment Incomplete</div>
        <h1 class="text-2xl font-bold text-[#164a08] mt-1">AYURPRAVAH 2027</h1>

        <p class="text-sm text-neutral-600 mt-3">
            We could not complete your transaction or the payment session was cancelled. No charges were captured.
        </p>

        <div class="bg-[#F7F5EC] rounded-xl p-4 my-6 text-left border border-neutral-200 text-xs">
            <div><strong>Reference:</strong> <span class="font-mono">{{ $registration->reference }}</span></div>
            <div class="mt-1"><strong>Delegate:</strong> {{ $registration->title }} {{ $registration->full_name }}</div>
            <div class="mt-1"><strong>Selected Pass:</strong> {{ $registration->tier->name }}</div>
        </div>

        <div class="space-y-3">
            <a href="/register/delegate?resume={{ $registration->uuid }}"
               class="inline-block w-full bg-[#164a08] text-white py-3 px-6 rounded-xl font-bold hover:bg-[#254006] transition shadow-md">
                Retry Payment ➔
            </a>
            <a href="/" class="inline-block text-xs text-neutral-500 hover:text-black">
                Return to Homepage
            </a>
        </div>
    </div>
</body>
</html>
