<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>AYURPRAVAH 2027 — On-Site Check-in Scanner</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
    <style>
        body { background-color: #121E06; color: #F7F5EC; font-family: system-ui, -apple-system, sans-serif; }
        .gold-border { border-color: #B89A4A; }
        .gold-text { color: #B89A4A; }
        .ayur-green { background-color: #164a08; }
    </style>
</head>
<body class="min-h-screen flex flex-col justify-between p-4 max-w-md mx-auto select-none">

    <!-- Header & Brand -->
    <header class="text-center pt-2 pb-4 border-b border-[#164a08]">
        <div class="text-[11px] uppercase tracking-widest text-[#B89A4A] font-bold">On-Site Gate Control</div>
        <h1 class="text-xl font-bold tracking-wide text-white mt-0.5">AYURPRAVAH 2027</h1>
        <div class="text-xs text-[#8C9E78]">आयुर प्रवाह • Rapid QR Scanner</div>
        
        <!-- Live Counters -->
        <div class="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#23380B]">
            <div class="bg-[#1C2C0B] rounded-lg p-2 text-center">
                <div class="text-[10px] uppercase text-[#8C9E78]">Total Paid</div>
                <div id="statTotal" class="text-lg font-bold text-white">{{ $stats['total_paid'] }}</div>
            </div>
            <div class="bg-[#243B0E] rounded-lg p-2 text-center border border-[#B89A4A]/30">
                <div class="text-[10px] uppercase text-[#B89A4A]">Checked In</div>
                <div id="statCheckedIn" class="text-lg font-bold text-emerald-400">{{ $stats['checked_in'] }}</div>
            </div>
            <div class="bg-[#1C2C0B] rounded-lg p-2 text-center">
                <div class="text-[10px] uppercase text-[#8C9E78]">Remaining</div>
                <div id="statRemaining" class="text-lg font-bold text-amber-300">{{ $stats['remaining'] }}</div>
            </div>
        </div>
    </header>

    <!-- Main Scanner Region -->
    <main class="my-auto py-4">
        <!-- Result Overlay Banner -->
        <div id="resultCard" class="hidden rounded-xl p-5 mb-4 text-center transition-all duration-300 shadow-2xl">
            <div id="resultIcon" class="text-4xl mb-2"></div>
            <div id="resultTitle" class="text-2xl font-extrabold uppercase tracking-wide"></div>
            <div id="resultMessage" class="text-sm mt-1 opacity-90"></div>

            <div id="delegateCard" class="hidden mt-4 pt-4 border-t border-black/20 text-left bg-black/20 rounded-lg p-3">
                <div id="delName" class="font-bold text-base text-white"></div>
                <div id="delTier" class="text-xs font-semibold text-[#B89A4A] uppercase tracking-wider mt-0.5"></div>
                <div id="delOrg" class="text-xs text-neutral-200 mt-1"></div>
                <div id="delRef" class="text-[10px] font-mono opacity-75 mt-2"></div>
            </div>
            
            <button onclick="resumeScanning()" class="mt-4 px-4 py-2 rounded-lg bg-black/40 text-xs font-bold uppercase tracking-wider hover:bg-black/60 transition">
                Scan Next Attendee ➔
            </button>
        </div>

        <!-- Camera Scanner Element -->
        <div id="scannerBox" class="relative rounded-2xl overflow-hidden border-2 border-[#B89A4A] shadow-lg bg-black">
            <div id="reader" class="w-full"></div>
            <div class="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div class="w-48 h-48 border-2 border-dashed border-[#B89A4A] rounded-xl opacity-60"></div>
            </div>
        </div>

        <!-- Manual Lookup Option -->
        <div class="mt-4">
            <div class="flex gap-2">
                <input type="text" id="manualInput" placeholder="Enter Ref (AP27-...), Phone or Code"
                       class="flex-1 bg-[#1C2C0B] border border-[#164a08] text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#B89A4A]">
                <button onclick="handleManualSearch()" class="ayur-green text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 active:scale-95 transition">
                    Verify
                </button>
            </div>
        </div>
    </main>

    <!-- Footer Controls -->
    <footer class="pt-2 pb-1 border-t border-[#164a08] flex justify-between items-center text-xs text-[#8C9E78]">
        <div>Staff: <span class="text-white font-medium">{{ auth()->user()->name ?? 'Gate Scanner' }}</span></div>
        <a href="/admin" class="hover:text-white underline">Admin Panel ➔</a>
    </footer>

    <!-- Audio Synthesis & Scanner Engine -->
    <script>
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        function playBeep(success) {
            if (!audioCtx) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            if (success) {
                osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
                osc.frequency.setValueAtTime(1174, audioCtx.currentTime + 0.1); // D6
                gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
                gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.25);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.25);
            } else {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(220, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
                gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.4);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.4);
            }
        }

        let html5QrCode = null;
        let isProcessing = false;
        let resetTimer = null;

        function startScanner() {
            html5QrCode = new Html5Qrcode("reader");
            const config = { fps: 15, qrbox: { width: 250, height: 250 } };
            
            html5QrCode.start(
                { facingMode: "environment" },
                config,
                onScanSuccess
            ).catch(err => {
                console.warn("Camera start warning:", err);
            });
        }

        async function verifyCode(code) {
            if (isProcessing) return;
            isProcessing = true;

            try {
                const response = await fetch('/api/checkin/scan', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ qr_code: code })
                });

                const data = await response.json();
                showResult(data);
            } catch (err) {
                showResult({
                    result: 'invalid',
                    status: 'ERROR',
                    message: 'Network error or server unreachable.'
                });
            }
        }

        function onScanSuccess(decodedText) {
            verifyCode(decodedText);
        }

        function handleManualSearch() {
            const input = document.getElementById('manualInput');
            if (input.value.trim()) {
                verifyCode(input.value.trim());
                input.value = '';
            }
        }

        function showResult(data) {
            const card = document.getElementById('resultCard');
            const icon = document.getElementById('resultIcon');
            const title = document.getElementById('resultTitle');
            const msg = document.getElementById('resultMessage');
            const delCard = document.getElementById('delegateCard');

            card.className = "rounded-xl p-5 mb-4 text-center transition-all duration-300 shadow-2xl block ";

            if (data.result === 'ok') {
                playBeep(true);
                card.classList.add('bg-emerald-700', 'text-white');
                icon.innerHTML = '✅';
                title.innerText = 'ENTRY VERIFIED';
            } else if (data.result === 'duplicate') {
                playBeep(false);
                card.classList.add('bg-amber-600', 'text-white');
                icon.innerHTML = '⚠️';
                title.innerText = 'DUPLICATE SCAN';
            } else {
                playBeep(false);
                card.classList.add('bg-rose-700', 'text-white');
                icon.innerHTML = '⛔';
                title.innerText = data.status || 'ACCESS DENIED';
            }

            msg.innerText = data.message;

            if (data.ticket) {
                delCard.classList.remove('hidden');
                document.getElementById('delName').innerText = data.ticket.name;
                document.getElementById('delTier').innerText = data.ticket.tier;
                document.getElementById('delOrg').innerText = `${data.ticket.organisation} (${data.ticket.city || ''})`;
                document.getElementById('delRef').innerText = `Ref: ${data.ticket.reference}`;
            } else {
                delCard.classList.add('hidden');
            }

            if (data.live_stats) {
                document.getElementById('statTotal').innerText = data.live_stats.total_paid;
                document.getElementById('statCheckedIn').innerText = data.live_stats.checked_in;
                document.getElementById('statRemaining').innerText = data.live_stats.remaining;
            }

            clearTimeout(resetTimer);
            resetTimer = setTimeout(resumeScanning, 4500);
        }

        function resumeScanning() {
            clearTimeout(resetTimer);
            document.getElementById('resultCard').classList.add('hidden');
            isProcessing = false;
        }

        window.addEventListener('DOMContentLoaded', () => {
            startScanner();
        });
    </script>
</body>
</html>
