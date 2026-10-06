# 02 — BACKEND SPEC (Admin, Registration, Payments, Ticketing, Check-in)

> Source: *Yasharth Ayurveda Website Proposal* + master design prompt. Stack: Laravel 12 · MySQL 8 · Filament v3 · Inertia (public site) · Razorpay (adapter) · spatie/permission · spatie/activitylog · spatie/medialibrary.
> Goal: the organiser runs everything **without a developer**: content, speakers, schedule, coupons, registrations, finance, exports, on-site check-in.

---

## 1. Architecture

- One Laravel app. Public site = Inertia controllers. Admin = Filament panel at `/admin`. Check-in app = PWA route group `/checkin` (own login, minimal UI).
- Service layer for business logic: `PricingService`, `CouponService`, `RegistrationService`, `PaymentService` (+ `PaymentGateway` interface, `RazorpayGateway`), `TicketService`, `CheckInService`, `ExportService`.
- Queues (database driver) for emails, PDF tickets, webhook post-processing, exports.
- Policies + permissions on every resource; no logic only in the UI.
- Enums (PHP 8.1+): `RegistrationStatus`, `PaymentStatus`, `RegistrationType`, `TicketStatus`, `PostStatus`, `AbstractStatus`, `DiscountType`.

---

## 2. Data model (migrations)

Use `id` (bigint), `uuid` where public-facing, `timestamps`, `softDeletes` on content + people tables.

**Content**
- `settings` — key/value (JSON) singleton store: event name, dates, countdown_date, venue (name, address, lat/lng, map_url), contact details **per department**, social links, logos (header/footer via media), GA ID, Meta Pixel ID, maintenance flag, WhatsApp number, SEO defaults.
- `pages` — slug, title, meta_title, meta_description, body (rich text), is_published (About/Terms/Privacy/Refund etc.).
- `hero_slides`/`homepage` — headline, subtext, image(s), CTA labels/links (single editable hero).
- `speakers` — name, slug, photo, designation, institution, country, bio, **talk_topic**, social_links (json), category, is_featured, sort_order, is_published.
- `sessions` — title, description, day/date, start/end, hall/room, track, conclave_id, type (keynote/panel/workshop/etc.); pivot `session_speaker` (role: speaker/chair/moderator).
- `conclaves` — title, slug, layout, short_description, description, focus_areas (json), workshop_info, image, icon, sort_order, is_published.
- `sponsors` — name, logo, tier (Platinum/Gold/Silver) **and** `partner_category` (Organized By / Knowledge / Associate / Technology / Industry / Media), website, booth_number, category_tag, sort_order.
- `team_members` — name, role, photo, bio, sort_order.
- `albums` + `gallery_items` — album (Day 1, Day 2, Workshops…), type (image/video), media or video_url (YouTube/Vimeo), caption, alt, sort_order.
- `posts` — title, slug (auto, editable), excerpt, body (WYSIWYG), featured_image + alt, author_id (team/speakers), status (draft/scheduled/published), published_at, meta_title, meta_description; `categories`, `tags`, pivots (admin can create on the fly).
- `faqs`, `press_items` (optional pages).
- `accommodations` — name, description, images, price_note, distance, booking_url/contact, `rooms_total`; `accommodation_bookings` — registration_id (nullable), name, contact, check_in, check_out, room_type, rooms, status, allocated_room_ref, notes.

**Commerce**
- `ticket_tiers` — name, category (delegate/student/international/…), price (minor units), currency, gst_percent, valid_from, valid_until, quota, sold_count, is_active, sort_order, description/inclusions (json).
- `coupons` — code (unique, case-insens.), discount_type (percent/flat), value, max_discount, usage_limit, per_user_limit, used_count, valid_from, expires_at, applicable_tier_ids (json nullable), is_active.
- `registrations` — uuid, reference (human-readable, e.g. `AP27-000123`), type (delegate), tier_id, status (`draft/pending/paid/failed/refunded/cancelled`), personal fields (title, full_name, email, phone, gender optional, organisation/college, designation, city, state, country, registration_council_no optional), GSTIN optional, `dietary/special_needs` optional, coupon_id, subtotal, discount, tax, total, currency, **manual_override** (bool) + `override_by`/`override_reason` (offline / bank transfer), refund_flag + refund_notes + refunded_at, `utm_*`, ip, user_agent, consent flags.
- `payments` — registration_id/exhibitor_id (polymorphic or two FKs), gateway, gateway_order_id, gateway_payment_id, amount, currency, status (`created/authorized/captured/failed/refunded`), method, raw_payload (json), signature_verified, captured_at.
- `webhook_events` — gateway, event_id (**unique** → idempotency), type, payload, processed_at, status, error.
- `tickets` — registration_id, ticket_code (unique, unguessable, e.g. ULID-based), qr_payload (signed), status (`active/checked_in/void`), issued_at, pdf_path.
- `check_ins` — ticket_id, scanned_by (user), scanned_at, device, result (`ok/duplicate/invalid/void`), gate/hall (nullable).

**Exhibitors (separate pipeline — never mixed with delegates)**
- `exhibitor_leads` — uuid, company, contact person, email, phone, website, category/industry, stall_interest/size, products, budget_note, message, status (`new/contacted/qualified/confirmed/lost`), assigned_to, notes, source/utm.
- `exhibitor_payments` use the same `payments` table via FK/polymorphic; stall confirmation + invoice optional.

**Other**
- `abstract_submissions` — author, co-authors (json), affiliation, title, track/category, abstract text, keywords, file (PDF/DOCX), type (oral/poster), status (`submitted/under_review/accepted/rejected/revision`), reviewer_id, review_notes, score, decision_at.
- `partner_enquiries`, `sponsorship_enquiries`, `contact_messages` — name, org, email, phone, message, department, status, assigned_to.
- Users/roles/permissions tables (spatie), `activity_log` (spatie).

Indexes: registrations(`email`, `status`, `tier_id`, `created_at`), payments(`gateway_order_id`), tickets(`ticket_code`), webhook_events(`event_id` unique).

---

## 3. Roles & permission matrix

| Module | Super Admin | Content Editor | Finance | Registration Desk | Check-in Staff |
|---|:-:|:-:|:-:|:-:|:-:|
| Users & roles, settings, maintenance | ✔ | – | – | – | – |
| Pages, hero, speakers, sessions, conclaves, gallery, blog, FAQ, press, partners/sponsors | ✔ | ✔ | – | – | – |
| Registrations (view/search) | ✔ | – | ✔ | ✔ | – |
| Registration edit / status override / refund flag | ✔ | – | ✔ | edit only (no money) | – |
| Payments, refunds, coupons, tiers, finance exports | ✔ | – | ✔ | – | – |
| Exhibitor leads, enquiries, accommodation allocation | ✔ | – | – | ✔ | – |
| Abstract review | ✔ | ✔ | – | – | – |
| Analytics dashboard | ✔ | – | ✔ | basic | – |
| Activity log | ✔ | – | – | – | – |
| `/checkin` scanner | ✔ | – | – | ✔ | ✔ (only this) |

Enforce via Policies + Filament `canViewAny/canAccess`. Check-in Staff must be **blocked from `/admin` entirely**. Seed one user per role in local/staging only.

---

## 4. Filament admin — resources & pages

1. **Dashboard** — widgets: total registrations, paid / pending / failed / refunded counts, revenue (gross, net of refunds), tier-wise breakdown, **daily registration + revenue trend**, coupon usage, exhibitor pipeline, today's check-ins (live). Role-aware.
2. **SpeakerResource** — photo, bio, designation, institution, country, talk topic, social links, featured toggle, **drag-to-reorder**, bulk archive (soft delete), restore.
3. **SponsorResource** — logo, tier, partner category, link, booth, tag, reorder.
4. **TeamMemberResource**.
5. **SessionResource / ConclaveResource** — with speaker relation manager, agenda ordering.
6. **GalleryResource** — **bulk drag-drop upload**, albums, YouTube/Vimeo embed by link, captions/alt.
7. **PageResource** — WYSIWYG for About/Terms/Privacy/Refund, meta title/description per page.
8. **HomepageSettings** — hero image, headline, subtext, CTAs; **single `countdown_date`** powering every countdown site-wide.
9. **PostResource** — slug auto-gen + editable, rich editor (embedded images + YouTube), featured image + alt, categories/tags (create inline, multi-select), author dropdown (from team/speakers), meta title/desc, Draft / Scheduled / Published (scheduler auto-publishes), **preview**.
10. **TicketTierResource**, **CouponResource** (code, type, value, usage limit, per-user limit, expiry, tier scope, generate-bulk action).
11. **RegistrationResource** — searchable/filterable table (name, email, tier, payment status, state, college/organisation, date, coupon); **manual status override** (requires reason, logged); **refund flag + notes**; resend ticket/email; view payments timeline; one-click **Excel/CSV export** of filtered set.
12. **ExhibitorLeadResource** — pipeline statuses, assignment, notes, export.
13. **AbstractSubmissionResource** — review workflow, assign reviewer, scoring, decision emails.
14. **AccommodationResource + BookingResource** — room allocation tracking tied to bookings.
15. **EnquiryResources** — contact, partner, sponsorship (inbox style, status, assign).
16. **UserResource / RoleResource** — create staff, assign role, **self-service password reset** (Laravel reset flow, no developer needed).
17. **ActivityLogResource** — who changed what, when (read-only, filter by user/model).
18. **SiteSettings page** — contact details **per department**, social links, logo (header/footer), GA ID, Meta Pixel ID, WhatsApp number, venue + map, maintenance-mode toggle, SEO defaults.

Soft-delete everywhere content is concerned: **nothing is permanently lost by accident.**

---

## 5. Delegate registration engine

**Flow**
1. `POST /api/registrations/draft` → validate step data, create `draft` (returns resume token).
2. Pricing preview `POST /api/pricing/quote` (tier + coupon) → returns subtotal, discount, tax, total (server-authoritative; client never sends prices).
3. `POST /api/registrations/{uuid}/checkout` → re-validates tier availability/quota/window, applies coupon atomically (DB transaction + row lock), sets `pending`, creates Razorpay order, returns order payload.
4. Client pays via Razorpay checkout.
5. **Source of truth = webhook** (§7). Redirect/handler only polls our status endpoint.
6. On `captured` → status `paid` → issue ticket → queue email + PDF.

**Rules**
- Dynamic tier availability by date window + quota (auto-switch Early Bird → Regular).
- Duplicate guard: same email + same tier already `paid` → block with friendly message (Registration Desk can override).
- Free (₹0 after coupon) orders skip the gateway: mark paid + issue ticket directly.
- Reserve quota at `pending` with a 15-minute hold; release via scheduler.
- Rate-limit (per IP/email), honeypot field, CSRF, strong server validation (FormRequests), phone/email normalisation.
- Optional GST: collect GSTIN, compute tax per tier `gst_percent`, store tax breakdown for invoice (invoice PDF = optional, behind a feature flag).

## 6. Coupon engine

Percent or flat; `max_discount` cap; `usage_limit` (global) and `per_user_limit`; `valid_from`/`expires_at`; optional tier restriction; case-insensitive lookup; atomic increment on successful checkout; decrement/release if payment fails or hold expires; admin bulk-generate; usage report per coupon.

## 7. Payment gateway (webhook-first)

```
interface PaymentGateway {
  createOrder(Registration|ExhibitorLead $payable, Money $amount): GatewayOrder;
  verifySignature(array $payload, string $signature): bool;
  parseWebhook(Request $r): WebhookEvent;
  refund(Payment $payment, ?Money $amount, string $reason): RefundResult;
}
```

- Route `POST /webhooks/razorpay` — **no CSRF**, **raw body** HMAC verification with webhook secret, reject invalid (400), always log to `webhook_events`.
- **Idempotency:** unique `event_id`; replayed events are acknowledged (200) and ignored.
- Handle: `payment.authorized/captured`, `payment.failed`, `order.paid`, `refund.processed`. Map to payment + registration status transitions via a single state-machine method (invalid transitions rejected + logged).
- Process heavy work in queued jobs; respond to gateway fast.
- Reconciliation command `php artisan payments:reconcile` (scheduler hourly): fetch gateway status for `pending` older than 10 min and fix stragglers → prevents "paid but no ticket".
- Amounts stored in minor units (paise); never trust client amount; verify captured amount == expected.
- Gateway choice **TBC with organiser** → keep behind interface; add `config/payments.php` with `default` driver.

## 8. Ticketing & QR

- On `paid`: create `tickets` row; `ticket_code` = unguessable ULID; QR payload = signed token (HMAC) containing code + registration uuid (no PII).
- QR PNG/SVG via `endroid/qr-code`; **PDF ticket** (dompdf) with name, tier, event date/venue, QR, reference; emailed + downloadable from success page and signed `/ticket/{code}` URL.
- Resend from admin. Void ticket on refund/cancel.
- Success page: `/payment/success/{ref}` polls status until `paid` (max ~60s) then shows ticket.

## 9. On-site Check-in (PWA, no special hardware)

- Route group `/checkin` — separate lightweight layout, installable PWA (manifest + service worker for shell caching), requires HTTPS for camera.
- Camera QR scan (html5-qrcode / equivalent) + **manual search by name/email/reference/phone** fallback.
- `POST /api/checkin/scan` → verifies signature → returns one of: `OK` (shows name, tier, photo-free), `DUPLICATE` (shows first scan time/by), `INVALID`, `VOID/REFUNDED`, `UNPAID`. Records `check_ins` row with staff + timestamp.
- UI: huge green/red/amber result states, vibration + sound cue, auto-reset to scan, running counters (checked-in / total paid).
- Optional offline mode (phase 6 stretch): download paid ticket hash list, queue scans, sync when online.
- Per-hall/day check-in optional via `gate` param.
- Access: roles Super Admin, Registration Desk, Check-in Staff only. Check-in Staff see **nothing else**.

## 10. Exhibitor flow

- `/register/exhibitor` creates `exhibitor_leads` (separate table & dashboard). Auto-email acknowledgement + internal notification to exhibitor-enquiry email.
- Admin pipeline statuses + assignment + notes; export; convert lead → "confirmed exhibitor" (creates/links `sponsors`/exhibitor profile for public Expo page).
- Stall payment (optional): generate payment link/order from admin using the same gateway.

## 11. Abstracts, partners, sponsorship, contact

- Abstract submission: file upload (PDF/DOCX, size/type validated, virus-scan hook optional), confirmation email, reviewer workflow, decision email templates, export. Deadline configured in settings (submission closes automatically).
- Partner / sponsorship / contact forms → inbox resources, routed to department emails from settings, spam-protected (honeypot + throttle + optional hCaptcha/Turnstile).

## 12. Blog / CMS-lite

As in §4.9. Public: list (paginated, category/tag filter), detail with JSON-LD `Article`, scheduled publish via scheduler (`posts:publish-due` every minute).

## 13. Analytics

- Dashboard (see §4.1). Extra: CSV of daily registrations; tier-wise sales; coupon performance; funnel (draft → pending → paid) to spot drop-off; UTM source breakdown.
- Inject GA/Meta Pixel from settings (only if IDs set; respect consent).

## 14. Exports

One-click **Excel/CSV** for: delegates (filtered), exhibitors/leads, payments, coupons usage, abstracts, check-in log, accommodation. Queued for large sets; download notification. Column sets defined per export class. Finance exports require Finance/Super Admin.

## 15. Email & notifications (queued, branded, plain-text fallback)

Registration received · Payment success + ticket (PDF + QR) · Payment failed (retry link) · Refund processed · Exhibitor acknowledgement · Abstract received / decision · Contact auto-reply · Admin alerts (new exhibitor lead, failed webhook, low quota). Templates editable in code; sender/from from settings. Use a real SMTP/SES provider via `.env`.

## 16. Public API surface (JSON, throttled)

`GET /api/settings/public` · `GET /api/speakers` · `GET /api/sessions` · `GET /api/conclaves` · `GET /api/sponsors` · `GET /api/gallery` · `GET /api/tiers` · `POST /api/pricing/quote` · `POST /api/registrations/draft|…/checkout` · `GET /api/registrations/{uuid}/status` · `POST /api/exhibitors` · `POST /api/abstracts` · `POST /api/enquiries/{type}` · `POST /api/checkin/scan` (auth).
Public pages are server-rendered via Inertia props; API used for interactive widgets (quote, status poll, forms).

## 17. Security

CSRF everywhere except signed webhooks · HMAC-verified webhooks · rate limits on auth, forms, coupon, quote · password policy + optional 2FA for Super Admin/Finance · signed URLs for tickets · upload validation (mime, size, extension, random names, private disk for abstracts) · no PII in QR · XSS-safe rich text (sanitise WYSIWYG output, e.g. HTMLPurifier) · SQL via Eloquent/bindings · security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy) · `APP_DEBUG=false` in prod · audit log for money/status overrides · DPDP-aware: consent checkbox, privacy policy link, data export/delete on request process documented.

## 18. Scheduler & commands

`posts:publish-due` (1 min) · `registrations:release-holds` (5 min) · `payments:reconcile` (hourly) · `backup:run` (daily, spatie/laravel-backup) · `queue:work` supervised · `sitemap:generate` (daily).

## 19. Environment variables (`.env.example`)

`APP_*`, `DB_*`, `QUEUE_CONNECTION`, `MAIL_*`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `PAYMENT_DRIVER=razorpay`, `TICKET_HMAC_SECRET`, `FILESYSTEM_DISK`, `AWS_*` (optional S3), `TURNSTILE_*` (optional), `EVENT_START`, `EVENT_END`.

## 20. Seeders

`RolesAndPermissionsSeeder` · `SettingsSeeder` (placeholders, dates 16–18 Apr 2027, venue TBC) · `ConclaveSeeder` (13 from content file) · `PillarsSeeder` (if DB-driven) · `SponsorSeeder` (Organised By only) · `SpeakerPlaceholderSeeder` (8 clearly-marked placeholders) · `TicketTierSeeder` (inactive, price 0 TBC) · `DemoUsersSeeder` (local/staging only) · `DemoRegistrationsSeeder` (local only, for dashboard demo).

## 21. Testing (must pass before Phase 3 and 6 gates)

- **Unit:** PricingService (tiers, windows, coupon caps, tax), CouponService (limits/expiry), state-machine transitions.
- **Feature:** draft → quote → checkout → webhook(captured) → ticket issued; failed payment; **duplicate webhook ignored**; invalid signature rejected; quota hold + release; free-order path; role permissions per module; check-in `OK/DUPLICATE/INVALID/VOID`; export access control.
- **E2E (Playwright):** delegate registration happy path in Razorpay test mode; mobile menu; modal a11y; reduced-motion run.
- Static analysis: Pint + PHPStan/Larastan level ≥ 6; ESLint + TypeScript strict.

## 22. Acceptance checklist (backend)

- [ ] Organiser can add/edit/reorder/archive speakers, sponsors, sessions, gallery, posts with no code.
- [ ] Single `countdown_date` updates every countdown.
- [ ] Coupons created from a form; limits and expiry enforced.
- [ ] Registrations searchable/filterable; manual override + refund flag + notes work and are audit-logged.
- [ ] Payment confirmed **only** via verified webhook; reconcile job fixes stuck payments.
- [ ] Ticket PDF + QR emailed; QR scan at `/checkin` works on a phone; duplicates rejected.
- [ ] Exhibitor leads in their own table/dashboard.
- [ ] 5 roles behave exactly per the matrix; Check-in Staff cannot reach `/admin`.
- [ ] Activity log shows who changed what and when.
- [ ] Maintenance mode toggle works; GA/Pixel IDs injected from settings.
- [ ] One-click Excel/CSV exports for delegates and exhibitors.
