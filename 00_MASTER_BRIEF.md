# AYURPRAVAH 2027 — MASTER BRIEF (READ THIS FIRST)

> Audience: Antigravity agent(s) building the full product (public website + admin + registration/payments/ticketing + QR check-in).
> Read order: `00_MASTER_BRIEF.md` → `03_CONTENT_AND_DATA.md` → `01_FRONTEND_SPEC.md` → `02_BACKEND_SPEC.md`.

---

## 1. Mission

Build **AYURPRAVAH 2027 — International Ayurveda Conclave & Expo**: a premium, immersive, international-grade event platform with a distinctly Indian identity.

It is **two products in one repo**:

| Product | What it is | Spec |
|---|---|---|
| **Public website** | Cinematic, story-driven site. Must not look like a template conference site. | `01_FRONTEND_SPEC.md` |
| **Platform backend** | Admin/CMS, delegate + exhibitor registration, tiered pricing, coupons, payments (webhook-verified), tickets + QR, on-site check-in, abstracts, blog, analytics, exports, roles. | `02_BACKEND_SPEC.md` |

Creative core: **Ancient Wisdom × Modern Science × Clinical Excellence × Technology × Entrepreneurship × Global Collaboration**.
Final impression: *"Contemporary Ayurveda with International Prestige."*

Brand story (must be visible on the site as one coherent chain):
`YASHARTH VEDA FOUNDATION (builds the ecosystem) → AYURWINGS HEALTH TECH (powers it digitally) → AYURPRAVAH 2027 (brings it together)`

---

## 2. Reference material (attach to the workspace)

Put these in the repo at `/docs/reference/` so agents can open them:

| File | Use it for | Authority |
|---|---|---|
| `WEBSITE_DEVELOPMENT_PROMPT___AYURPRAVAH_2027.pdf` | Original design/motion/content intent | **Highest** for design + content |
| `Yasharth_Ayurveda_Website_Proposal.pdf` | Backend scope, pages, roles | **Highest** for backend scope |
| `refrence_images_-1/-2/-3.jpeg` | Layout, hierarchy, palette, card/footers/mobile patterns | **Visual direction only** |
| https://ayurmahotsava.com/ | Structure + feature benchmark (see §3) | **Benchmark only — do not copy** |

These `.md` files already contain everything from the PDFs. The PDFs and images are attached as *backup + visual reference*, not as a second source of truth. If they conflict with these `.md` files, **these `.md` files win** (conflicts were already resolved in §4).

---

## 3. Reference website analysis — https://ayurmahotsava.com/

**What it does well (benchmark these capabilities, not the look):**

- **Nav with grouped dropdowns:** About (Team, Archive by year) · Delegate (info, certificate download, exclusive invitation pass) · Exhibitors (interest form, why exhibit, profile, B2B networking, business awards) · Abstracts · Speakers · Gallery (image / video) · Press & Resource (press release, media coverage, articles) · Contact.
- **Hero:** title + date + venue + **live countdown** + 2 CTAs (Directions, Schedule).
- **Quick-link chip row** under hero: Partners, Exhibitors, Buyers, Knowledge Sessions, Paper Presentation, Awards, Visitors.
- **Stats strip** with icons (exhibitors, paper presentations, practitioners, delegates, visitors, venue sq. ft.).
- **Tabbed "Event experience"** (Expo & Networking / Clinical Sessions / Startup & Industry) — each tab: copy + 4 small feature icons.
- **Guests of Honour** and **Featured Speakers** grids — speaker cards include a **one-line talk topic**. Speakers are admin-managed.
- **Contact by department** (exhibitor enquiry, delegate enquiry, knowledge sessions, media) — each with its own email/phone.
- **Floating WhatsApp button**, footer with organiser + partner logos, archive links, policy links (Privacy, Terms, Refund), and a sitemap page.
- Likely Laravel-style stack (`/storage/speakers/...` asset paths) → confirms admin-managed content is the right model.

**Adopt (in our own design language):** countdown, department-wise contacts, speaker "topic" field, certificate download, visitor/exclusive-pass flow (optional), archive-by-year (Year 2+), WhatsApp float, sitemap page, grouped nav on inner pages.

**Do NOT copy:** visuals, copy, icons, layout, images, names. AYURPRAVAH must feel like the *next-generation evolution*, per the design prompt.

---

## 4. Conflicts & open items — already decided (build with these; put all in config so they're one-line changes)

| # | Issue | Decision |
|---|---|---|
| 1 | **Event dates** — PDF says **16, 17 & 18 April 2027**; mockup images say 12–15 March 2027 | Use **16–18 April 2027** (`EVENT_START=2027-04-16`, `EVENT_END=2027-04-18`). Countdown reads from admin setting. |
| 2 | **Venue** — PDF gives none; mockups show "Bharat Mandapam, New Delhi" (mockup text only, unconfirmed) | Use placeholder **`VENUE: To Be Announced`** everywhere. Never present Bharat Mandapam as fact. Admin-editable. |
| 3 | **Hindi wordmark spelling** — PDF text extracts as `आयरुप्रवाह`; mockups show `आयुर प्रवाह` | Store in ONE constant `brand.hindi` and render from the **official logo asset** once supplied. Until then use `आयुर प्रवाह` as a placeholder and flag in the PR notes. **Never** use "Ayush Pravah / आयुष प्रवाह". |
| 4 | "2340+ Expert-Led Sessions" in PDF is a page-number artefact (`23` + `40+`) | Use **40+**. Mark `// CONFIRM` in content file. |
| 5 | Yasharth Impact "03 International Knowledge Partnerships" | Use **03** (page-number artefact removed). |
| 6 | Mockup stats (500 speakers, 10,000 delegates, 300 exhibitors, etc.) | **Ignore.** Use PDF stats only (see content file). |
| 7 | Mockup speakers (names, photos, institutions) | **Fictional/AI. Never use.** Speakers come from DB; seed with clearly-marked placeholder cards. |
| 8 | Nav labels differ between PDF and mockups | Use PDF nav: `About · AyurPravah · Conclaves · Speakers · Sessions · Expo · Partners · Venue · Register`. |
| 9 | Proposal lists roles inconsistently (3 in features table, 4 in roles section) | Use **5 roles**: Super Admin, Content Editor, Finance, Registration Desk, Check-in Staff. |
| 10 | Ticket prices / tiers, payment gateway, sponsors, partners, accommodation | **Unknown.** Seed placeholders (`price=0`, `TBC`). Gateway behind an adapter interface; **Razorpay** implemented first (India default), swappable. |

---

## 5. Tech stack (decided)

**Backend / admin:** Laravel (latest stable 12.x) · MySQL 8 · Filament v3 admin panel · spatie/laravel-permission · spatie/laravel-activitylog · queue (database driver, Redis optional) · Laravel Scheduler.
**Frontend:** React 18/19 via **Inertia.js with SSR** (SEO-critical) · Tailwind CSS · Framer Motion (UI motion) · GSAP + ScrollTrigger (pinned storytelling only) · Embla Carousel (carousels).
**Payments:** Razorpay (Orders + signed webhooks) behind `PaymentGateway` interface.
**QR / tickets:** `endroid/qr-code` (generation) · `barryvdh/laravel-dompdf` (PDF ticket) · browser QR scanner PWA via `html5-qrcode` / `@yudiel/react-qr-scanner`.
**Exports:** `maatwebsite/excel` (or Filament export actions).
**Media:** spatie/laravel-medialibrary (WebP conversions, responsive sizes).

> The original prompt prefers Next.js. Inertia + React + Tailwind + Framer Motion + GSAP delivers the same React frontend while keeping auth, admin, payments, and SEO in **one deployable Laravel app** (simpler for a 3-day event on shared/VPS hosting). Do not split into two apps unless explicitly told.

---

## 6. Repo layout

```
/
├─ docs/                      # these .md files + /reference (PDFs, images)
├─ app/
│  ├─ Models/  Enums/  Services/ (Pricing, Coupons, Payments, Tickets, CheckIn)
│  ├─ Http/Controllers/  Http/Requests/  Policies/  Jobs/  Mail/  Notifications/
│  └─ Filament/ (Resources, Pages, Widgets)
├─ database/ (migrations, seeders, factories)
├─ resources/
│  ├─ js/ (Pages, Components, Sections, hooks, lib, motion, content)
│  ├─ css/ (tokens.css, app.css)
│  └─ views/ (app.blade.php, emails, tickets)
├─ routes/ (web.php, api.php, webhooks.php)
└─ tests/ (Feature, Unit, e2e)
```

---

## 7. Build phases (each ends with a verification gate — do not skip ahead)

| Phase | Deliver | Gate |
|---|---|---|
| **0 · Foundation** | Laravel + Inertia SSR + Tailwind + tokens (colour, type, spacing, shadow, radius, motion), `content/` config, preloader, layout shell | Token page renders; Lighthouse sanity run |
| **1 · Data + Admin** | All migrations, enums, seeders, Filament resources, roles/permissions, settings | Each role logs in and sees only what it should |
| **2 · Home experience** | Navbar, Hero, all home sections per spec, motion system, reduced-motion | Looks premium **with animations disabled** |
| **3 · Registration + Payments** | Delegate/Exhibitor/Partner/Abstract/Sponsorship flows, pricing engine, coupons, Razorpay + webhook, tickets, emails | Test-mode payment end-to-end incl. failed + duplicate webhook |
| **4 · Check-in** | QR PWA, scan API, duplicate/invalid handling, live counts | Scan works on a phone over HTTPS |
| **5 · Inner pages** | About, Speakers, Program, Conclaves, Expo, Venue, Accommodation, Gallery, Blog, Contact, legal, optional pages | All routes, SEO meta, sitemap |
| **6 · Hardening** | A11y, performance, security, tests, error pages, maintenance mode | Checklists in §9 pass |

Work in small PRs/commits per phase. After each phase produce a short walkthrough artifact (screens + what to verify).

---

## 8. Global non-negotiable rules

1. **Spelling:** `AYURPRAVAH` (all caps in titles) / `AyurPravah` (prose). Consistent in navbar, hero, `<title>`, buttons, meta/OG, footer, URL slugs, loader, forms, emails, modals, tickets.
2. **Never invent** speakers, designations, countries, sponsors, partners, venues, prices, statistics, testimonials, collaborations. Unknown → visible placeholder (`TBC`) + `// CONFIRM`.
3. **Content is data, not JSX.** All copy lives in `resources/js/content/*` or the DB. No hard-coded copy in components.
4. **Light first → green second → gold third.** Palette in `01_FRONTEND_SPEC.md`. No neon, no bright yellow, no cyberpunk.
5. **Motion: ~70% calm / 30% expressive.** Animate `transform` + `opacity` (+ limited `filter: blur`). No layout-thrashing animation.
6. **Impressive with animations off.** Design must stand alone.
7. **Essential info never hidden behind hover.** Every hover interaction has a tap/keyboard equivalent.
8. **Payments are confirmed by webhook only**, never by browser redirect alone.
9. **Secrets in `.env` only.** No keys in repo.
10. **Mobile is designed, not shrunk.**

---

## 9. Definition of Done

- [ ] All pages in `01_FRONTEND_SPEC.md §3` implemented; all admin modules in `02_BACKEND_SPEC.md` implemented.
- [ ] Registration → payment → webhook → ticket + QR + email works in Razorpay test mode; duplicate/failed/refunded paths handled.
- [ ] Check-in app scans QR, rejects duplicate/invalid, shows live counts.
- [ ] Each of 5 roles verified against permission matrix.
- [ ] `prefers-reduced-motion` verified; keyboard-only navigation works; focus visible; contrast ≥ WCAG AA.
- [ ] Lighthouse (mobile) target: Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95.
- [ ] Structured data (Event, Organization, Place) present; sitemap.xml + robots.txt.
- [ ] Feature + unit tests green; seeded demo data; `README` with setup, env vars, deploy steps.

---

## 10. Starter prompt to paste into Antigravity

```
Read /docs/00_MASTER_BRIEF.md first, then 03_CONTENT_AND_DATA.md, 01_FRONTEND_SPEC.md and 02_BACKEND_SPEC.md.
Reference visuals are in /docs/reference. Work phase by phase (Master Brief §7). 
Start with Phase 0 and Phase 1: produce an implementation plan artifact first, wait for approval, 
then build. Do not invent content; use placeholders as the docs specify. 
Stop at each phase gate and show me what to verify.
```

Optional: if your Antigravity version supports workspace rules, add a rule file pointing to `/docs/00_MASTER_BRIEF.md` §8 so the global rules stay loaded in every session.
