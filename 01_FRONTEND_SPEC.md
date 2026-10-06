# 01 — FRONTEND SPEC (Design system, motion, pages, components)

> Stack: Inertia.js (SSR) + React + Tailwind + Framer Motion + GSAP/ScrollTrigger + Embla.
> Copy lives in `03_CONTENT_AND_DATA.md`. Global rules in `00_MASTER_BRIEF.md §8`.
> **Build the design system first (tokens, type, spacing, motion, interaction), then sections.**

---

## 1. Design system

### 1.1 Colour tokens (`resources/css/tokens.css`)

| Token | Hex | Use |
|---|---|---|
| `--green` | `#315208` | Headings, primary CTA, icons, key numbers, nav highlight, major feature sections |
| `--olive` | `#667852` | Feature panels, stats backgrounds, ecosystem sections, secondary states |
| `--gold` | `#B89A4A` | **Accent only**: hairline borders, dividers, lotus details, active states, subtle hover |
| `--ivory` | `#F7F5EC` | Primary page background |
| `--white` | `#FFFFFF` | Cards, nav, forms |
| `--brown` | `#493B32` | Body text, secondary headings |
| `--green-deep` | derived darker green | Final CTA + footer (derive from `--green`, keep in tokens) |

Ratio: **60–65% ivory/white · 20–25% green/olive · 5–10% gold · ~5% brown**. Order of dominance: light → green → gold. No bright/metallic yellow, no neon.
Define dark-section text colours explicitly (ivory on green) and verify AA contrast.

### 1.2 Typography

- Display / headings: an elegant serif (e.g. Cormorant Garamond or Playfair Display). Body/UI: clean humanist sans (e.g. Inter or Plus Jakarta Sans).
- **Devanagari:** Noto Serif Devanagari (or Tiro Devanagari Hindi) for the Hindi wordmark. The Hindi identity is **never a tiny subtitle** — it is visually co-equal in the hero.
- Fluid type scale with `clamp()`. Large editorial headlines, generous tracking on eyebrows (uppercase, small, letter-spaced, gold underline optional).
- Self-host fonts, `font-display: swap`, preload only the hero fonts.

### 1.3 Spacing, radius, depth

- 8px spacing grid; section padding responsive (`py-20 → py-32`).
- Radius **8–16px** only. No pill-everything. No giant radii.
- Shadows: **L1** near-invisible resting · **L2** medium interactive · **L3** deep (modal/lightbox).
- Borders: muted gold / olive / warm neutral; neutral → gold on interaction.

### 1.4 Cards (anti-template rule)

Do **not** repeat "white box + big radius + icon + paragraph + shadow". Use a mix: editorial bordered cards, image-backed cards, horizontal cards, offset/overlapping cards, circular badges, featured large cards. Radius 8–16px, subtle borders, very soft shadows.

### 1.5 Background layers (5–10% prominence, very low opacity)

1. **Background layer:** Indian architectural line-art silhouettes, lotus geometry, herbal botanical drawings, leaf contours, mandala geometry, fine world-map lines, organic curves.
2. **Content layer:** type, images, cards.
3. **Interaction layer:** floating lines, hover responses, CTAs.
Backgrounds are never flat. Implement as reusable SVG components (`<BotanicalLayer/>`, `<ArchLine/>`, `<WorldLines/>`, `<LotusGeometry/>`), inline SVG or optimised WebP.

### 1.5b Signature "Pravah" (flow) motif

A continuous **gold/green flowing line** visually travels through the whole page and connects major sections:
`Knowledge → Research → Clinical Practice → Innovation → Industry → Global Collaboration`.
Implement as one SVG path drawn on scroll (GSAP `DrawSVG`-style via `stroke-dashoffset`, or Framer `pathLength`) behind content, with nodes at section anchors. Also reused as: section dividers, hover underlines, background curves, map connection lines. This is the site's signature — keep it elegant and slow.

---

## 2. Motion language

**Hierarchy:** Major sections → meaningful movement · Cards → micro-interactions · Buttons → tactile feedback · Decorations → slow ambient movement.
**Balance:** ~70% calm / 30% expressive. Strongest moments: **Hero → Conclaves → Experience → Speakers → Expo → Registration.** Everything else breathes.

Allowed vocabulary: fade, slide, scale, zoom, blur→sharp, pop (spring), stagger, tilt, parallax, rotate (slow), soft shake (field-level only), border animation, underline draw, image reveal/mask, counters, magnetic hover. **Do not use every effect on every element.**

Tokens (`resources/js/motion/tokens.ts`): durations (fast 150 / base 300 / slow 700 / cinematic 1200 ms), easings (`easeOutExpo`, soft spring), stagger (60–90 ms), one shared set of Framer variants (`fadeUp`, `blurIn`, `scaleIn`, `maskReveal`, `stagger`).

**Performance:** animate `transform` + `opacity` (+ limited blur). Use `will-change` sparingly, IntersectionObserver for triggers (`once: true` for most), no scroll-handler layout reads.

**Reduced motion (`prefers-reduced-motion`):** disable tilt, magnetic hover, custom cursor effects, parallax, ambient spin, pinned scroll-jacking (fall back to normal stacked sections), simplify transitions to fades. **All content must remain.** Implement a `useMotionSafe()` hook used everywhere.

### Hero load sequence (cinematic)
1 background fades in → 2 architecture/botanical layer reveals (blur→sharp) → 3 Hindi title scales into place → 4 `AYURPRAVAH 2027` slides up → 5 gold divider draws → 6 tagline fades → 7 date/venue reveal → 8 CTAs pop (spring) → 9 subtle parallax begins.

### Preloader
Very short: lotus/circle motif draws → Hindi wordmark → `AYURPRAVAH 2027` → crossfade into hero. Max ~1.2s, skippable, shown once per session, never blocks on assets.

### Transitions
Page: fade + slight blur + small directional shift (Inertia). Modal open: scale 0.96→1 + fade; close: scale down + fade. No dramatic spins.

### Cursor (desktop, fine pointer only)
Small dot; expands on interactive elements; contextual label on images (`VIEW` / `EXPLORE` / `OPEN`). Disabled on touch and reduced-motion.

### Buttons
- **Primary** `REGISTER NOW →`: deep green + white text. Hover: lift, thin gold border, arrow nudge, soft shadow, ~1.02 scale. Press: 0.97 → spring back.
- **Secondary:** green outline on ivory. Hover: green fill + ivory text.

### Card hover (desktop)
Lift + 3D tilt (**max 5–7°**) + deeper shadow + border → gold + image zoom 1.04 + gold line grows + icon shifts a few px + title shifts subtly. Smooth return on leave.

### Touch / mobile
Swipe carousels, drag rails, tap-to-expand cards, accordions, swipe-to-close modals, tactile press feedback. **No info exclusive to hover.** Minimum touch target 44×44px.

---

## 3. Pages & routes

| Route | Page | Notes |
|---|---|---|
| `/` | Home (the story) | Section order in §4 |
| `/about` | About / Organisers | Foundation, AyurWings, AyurPravah, team (admin) |
| `/ayurpravah` | AyurPravah overview | Theme, ecosystem, "More than a conference" |
| `/conclaves`, `/conclaves/{slug}` | Conclave grid + detail (also modal from grid) | |
| `/speakers`, `/speakers/{slug}` | Directory with category filters + detail | Includes talk topic |
| `/program` | Day-wise schedule/agenda | Filter by day/track/venue hall |
| `/expo` | Expo & Wellness | Exhibitor profiles (Year 1: simple list) |
| `/partners` | Partner/sponsor wall by tier | |
| `/venue` | Venue / How to reach | Map, directions, travel |
| `/accommodation` | Stay options | Booking details/enquiry |
| `/gallery` | Image + video (album tabs) | Lightbox |
| `/register/delegate` | Multi-step delegate registration | Dynamic pricing |
| `/register/exhibitor` | Exhibitor registration + lead capture | |
| `/become-a-partner` | Partner enquiry | |
| `/submit-abstract` | Abstract submission | Optional-page in proposal; included because PDF lists it as a pathway |
| `/sponsorship-enquiry` | Sponsorship enquiry | Optional |
| `/payment/success/{ref}` | Payment success / ticket confirmation | QR + download |
| `/payment/failed/{ref}` | Failure + retry | |
| `/ticket/{code}` | Public ticket view | Signed URL |
| `/blog`, `/blog/{slug}` | Articles | |
| `/contact` | Contact form + dept-wise contacts | |
| `/privacy-policy` `/terms` `/refund-policy` | One template, 3 routes | CMS rich text |
| `/faq` `/press` `/archive` | Optional | Archive deferred to Year 2 |
| `/sitemap` + `/sitemap.xml` | Human + XML sitemap | |

Global: sticky navbar, floating WhatsApp/contact button (benchmark feature), mobile sticky **Register** bar, 404/500/maintenance pages, cookie notice if analytics IDs are set.

---

## 4. Home — section order & rhythm (alternating moods)

| # | Section | Mood | Key behaviour |
|---|---|---|---|
| 1 | **Hero** | Ivory / image-rich | Cinematic load; Hindi + English title; date/venue; **live countdown** (from admin date); CTAs; subtle circular ecosystem; botanical/arch/world-line layers |
| 2 | **About** | White | Short editorial copy + expandable "read more" |
| 3 | **Yasharth Veda Foundation** (8 pillars) | Ivory | Interactive pillar cards or ecosystem wheel. Desktop: hover → tilt, icon anim, border glow, description reveal. Mobile: swipe cards/accordion |
| 4 | **Yasharth Impact** | **Green** | 6 count-up stats, gold separators |
| 5 | **AyurWings** (+ at a glance) | White | Central AYURWINGS node with 8 orbiting nodes; 5 count-ups |
| 6 | **AyurPravah introduction** | Ivory | 9-dimension circular ecosystem; each activates on scroll |
| 7 | **Pinned story** "The Future of Ayurveda Is Collaborative" | (Ivory→Green) | GSAP pinned; 6 concepts appear one by one, then release. Reduced-motion → stacked |
| 8 | **Theme** (6-way convergence) | **Green** | Each term: hover enlarge, reveal description, bg change, line activates; mobile swipe |
| 9 | **Conclaves & Forums** | White | 13-card editorial grid with mixed layouts; click → modal (title, description, focus areas, related sessions, workshop info, CTA); mobile tap-expand + swipe |
| 10 | **More Than a Conference** | **Olive** | 6-stage interactive journey (central circular interface; scroll/tap changes active stage) — not 6 plain cards |
| 11 | **At a glance** (11 stats) | Green/Olive strip | Sequential count-up (never all pulsing at once) |
| 12 | **Speakers** | Ivory | Carousel: drag, swipe, arrows, pagination, keyboard; **no aggressive autoplay**; click → detailed modal |
| 13 | **Expo & Wellness** | White/Olive | Horizontal drag rail; focused item grows, neighbours soften |
| 14 | **Startup & Innovation** | Ivory | Contemporary connected-node visual, still in palette |
| 15 | **Global Collaboration** | Ivory | Fine-line world map; India origin; connection lines; hover/tap region → label + context card |
| 16 | **Venue** | White | Venue, dates, map, directions, travel, accommodation; `GET DIRECTIONS →`; hover elevation |
| 17 | **Registration pathways** | Ivory | 4 (+1) pathway cards → animated form modals |
| 18 | **Partners** | Ivory | Logo wall by category; neutral default, hover → prominence + soft container highlight |
| 19 | **Gallery** | White | Asymmetric masonry; hover zoom, reveal, lightbox, swipe, keyboard, captions, blurred backdrop |
| 20 | **Final CTA** | **Deep green** | Headline + `JOIN AYURPRAVAH 2027 →`; animated botanical + global lines |
| 21 | **Footer** | Deep green | See content file §21 |

Never build "hero → paragraph → 3 cards → paragraph → 4 cards → footer". Use large type, overlap, asymmetry, horizontal-scroll moments, pinned sections, masks, parallax, layered backgrounds.

---

## 5. Components (reusable, props-driven, content via props)

`Navbar` · `MobileMenu` · `Preloader` · `Hero` · `Countdown` · `StatsSection` · `StatCounter` · `FoundationSection` · `PillarCard` · `AyurWingsSection` · `OrbitDiagram` · `EcosystemCircle` · `PinnedStory` · `ThemeSection` · `ConclaveGrid` · `ConclaveCard` · `ConclaveModal` · `ExperienceJourney` · `SpeakerCarousel` · `SpeakerCard` · `SpeakerModal` · `ExpoRail` · `InnovationNodes` · `GlobalMap` · `VenueSection` · `RegistrationPathways` · `RegistrationModal` (+ `DelegateForm`, `ExhibitorForm`, `PartnerForm`, `AbstractForm`, `SponsorshipForm`) · `PartnerGrid` · `Gallery` · `Lightbox` · `FinalCTA` · `Footer` · `FlowLine` · `BotanicalLayer` · `TiltCard` · `MagneticButton` · `Cursor` · `Reveal` · `Modal` · `Accordion` · `FloatingLabelInput` · `WhatsAppFloat`.

---

## 6. Navbar behaviour

Light, spacious at top. On scroll: reduced height, subtle backdrop blur, soft shadow, slightly higher contrast, stays ivory/white. Active section indicator = refined gold/green underline (not pills). Items: `About · AyurPravah · Conclaves · Speakers · Sessions · Expo · Partners · Venue · Register`. **Mobile:** hamburger → full-screen ivory/deep-green menu, items stagger in, gold line draws, close button animates, language toggle placeholder, Register button, socials.

---

## 7. Forms & registration UX

- Floating labels, animated focus, clean inline validation, subtle border transitions, smooth success state.
- Errors: **field-level** small shake only. Never shake the page.
- Delegate form is **multi-step**: (1) category/tier → (2) personal & professional details → (3) coupon + price summary (live) → (4) review → pay. Resume-able (draft saved server-side by email token).
- Exhibitor form: company, contact, stall interest, lead capture (separate pipeline).
- Accessible: labelled inputs, `aria-invalid`, `aria-describedby`, error summary, keyboard-submittable, `autocomplete` attributes, honeypot + rate limit (backend).
- Modals: focus trap, `Esc` to close, return focus, `aria-modal`, swipe-down to close on mobile.

---

## 8. Accessibility (WCAG 2.2 AA target)

Semantic HTML landmarks · skip link · visible focus rings (gold/green) · keyboard operable carousels, modals, map hotspots, accordions · ARIA for dialogs/tabs/carousels · alt text from admin · contrast checked on green/olive sections · `prefers-reduced-motion` · `lang="hi"` on Hindi spans · no autoplay audio/video · captions for video where possible.

## 9. Performance budget

Lazy-load below-fold images · WebP/AVIF + `srcset` · route-level code splitting · lazy-load GSAP/map/lightbox · intersection observers · SSR critical content · defer non-critical scripts · LCP image preloaded · CLS < 0.1 (reserve image sizes) · limit JS per route · no layout-property animation.

## 10. SEO / metadata

Per-page title/description (admin-editable) · default title/description in content file §1 · OpenGraph + Twitter cards (1200×630) · canonical URLs · JSON-LD: `Event`, `Organization`, `Place`, plus `Person` (speakers) and `EventSession`/`Event` sub-events (sessions) · `sitemap.xml`, `robots.txt` · keep **AYURPRAVAH** spelling identical in all metadata and slugs.

## 11. Acceptance checks (frontend)

- Looks premium with all animation disabled.
- No hover-only information; all interactions keyboard-reachable.
- Forbidden-string grep passes (`Ayush Pravah`, `आयुष प्रवाह`).
- No fabricated people/partners/stats visible anywhere.
- Mobile: swipe works on carousels, rails, modals; mobile menu full-screen; sticky Register bar.
