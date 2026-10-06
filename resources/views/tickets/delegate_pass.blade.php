<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AYURPRAVAH 2027 — Official Delegate Pass</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 0;
        }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #F7F5EC;
            color: #503323;
            margin: 0;
            padding: 40px;
        }
        .pass-container {
            border: 2px solid #B89A4A;
            background: #FFFFFF;
            border-radius: 12px;
            padding: 30px;
            position: relative;
            box-shadow: 0 10px 25px rgba(49, 82, 8, 0.08);
        }
        .header-bar {
            text-align: center;
            border-bottom: 2px solid #F7F5EC;
            padding-bottom: 20px;
            margin-bottom: 25px;
        }
        .brand-eyebrow {
            font-size: 11px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #B89A4A;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .brand-title {
            font-size: 28px;
            font-weight: 800;
            color: #164a08;
            margin: 0;
            letter-spacing: 1px;
        }
        .brand-hindi {
            font-size: 18px;
            color: #3e7405;
            margin-top: 4px;
        }
        .details-grid {
            width: 100%;
            margin-bottom: 30px;
        }
        .details-grid td {
            vertical-align: top;
        }
        .info-col {
            width: 65%;
            padding-right: 20px;
        }
        .qr-col {
            width: 35%;
            text-align: center;
            border-left: 1px dashed #B89A4A;
            padding-left: 20px;
        }
        .field-label {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #8C8075;
            margin-bottom: 3px;
        }
        .field-value {
            font-size: 16px;
            font-weight: bold;
            color: #164a08;
            margin-bottom: 16px;
        }
        .field-value-lg {
            font-size: 20px;
            color: #164a08;
        }
        .tier-badge {
            display: inline-block;
            background-color: #164a08;
            color: #FFFFFF;
            padding: 6px 14px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 15px;
        }
        .qr-image {
            width: 150px;
            height: 150px;
            margin: 0 auto;
        }
        .ref-code {
            font-family: monospace;
            font-size: 13px;
            font-weight: bold;
            color: #164a08;
            margin-top: 8px;
            letter-spacing: 1px;
        }
        .footer-notice {
            border-top: 1px solid #EBE5D8;
            padding-top: 18px;
            font-size: 11px;
            color: #3e7405;
            line-height: 1.6;
        }
        .footer-chain {
            margin-top: 15px;
            font-size: 10px;
            text-align: center;
            color: #B89A4A;
            letter-spacing: 1px;
            font-weight: bold;
        }
    </style>
</head>
<body>

<div class="pass-container">
    <div class="header-bar">
        <div class="brand-eyebrow">International Ayurveda Conclave & Expo</div>
        <h1 class="brand-title">AYURPRAVAH 2027</h1>
        <div class="brand-hindi">आयुर प्रवाह</div>
    </div>

    <table class="details-grid">
        <tr>
            <td class="info-col">
                <div class="tier-badge">{{ $registration->tier->name ?? 'Delegate Pass' }}</div>

                <div class="field-label">Delegate Name</div>
                <div class="field-value field-value-lg">{{ $registration->title }} {{ $registration->full_name }}</div>

                <div class="field-label">Designation & Institution</div>
                <div class="field-value">
                    {{ $registration->designation ?? 'Healthcare Professional' }}<br>
                    <span style="font-size: 14px; color: #503323; font-weight: normal;">
                        {{ $registration->organisation_college ?? 'Independent Clinical Practice' }}
                    </span>
                </div>

                <div class="field-label">Location</div>
                <div class="field-value">
                    {{ $registration->city ?? 'N/A' }}, {{ $registration->state ?? 'N/A' }}, {{ $registration->country }}
                </div>

                <div class="field-label">Event Dates & Venue</div>
                <div class="field-value" style="font-size: 13px;">
                    16th, 17th & 18th April 2027<br>
                    <span style="font-weight: normal; color: #3e7405;">Venue: To Be Announced</span>
                </div>
            </td>

            <td class="qr-col">
                <div class="field-label" style="margin-bottom: 10px;">Security Check-in QR</div>
                <img src="{{ $qrCode }}" class="qr-image" alt="Pass QR Code">
                <div class="ref-code">{{ $registration->reference }}</div>
                <div style="font-size: 10px; color: #8C8075; margin-top: 6px;">Present at entrance scanner</div>
            </td>
        </tr>
    </table>

    <div class="footer-notice">
        <strong>Important Attendee Instructions:</strong><br>
        1. This electronic pass is non-transferable and must be presented at the registration verification desk.<br>
        2. Badges and physical kits will be issued upon scanning this digital pass.<br>
        3. For assistance, contact <strong>delegate@ayurpravah2027.com</strong>.
    </div>

    <div class="footer-chain">
        YASHARTH VEDA FOUNDATION &nbsp;•&nbsp; AYURWINGS HEALTH TECH &nbsp;•&nbsp; AYURPRAVAH 2027
    </div>
</div>

</body>
</html>
