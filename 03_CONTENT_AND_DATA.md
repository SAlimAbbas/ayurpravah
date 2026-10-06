# 03 — CONTENT & DATA (single source of truth for all copy)

> Implement as `resources/js/content/*.ts` (static story copy) and DB seeders (admin-editable data).
> Rule: **do not invent.** Anything marked `TBC` renders as a visibly-styled placeholder. Anything marked `// CONFIRM` is flagged in PR notes.

---

## 1. Brand & event constants (`content/brand.ts`)

```ts
export const brand = {
  name: "AYURPRAVAH 2027",
  nameProse: "AyurPravah 2027",
  hindi: "आयुर प्रवाह",            // CONFIRM exact spelling; render from official logo asset when supplied
  eyebrow: "INTERNATIONAL AYURVEDA CONCLAVE & EXPO",
  tagline: "One Vision. One Platform. One Future.",
  supporting: "Uniting Global Experts, Researchers, Innovators & Industry Leaders to Shape the Future of Ayurveda.",
  dates: { start: "2027-04-16", end: "2027-04-18", label: "16th, 17th & 18th April 2027" },
  venue: { name: "To Be Announced", city: "TBC", mapUrl: null },   // admin-editable
  primaryCta: "REGISTER NOW →",
  secondaryCta: "EXPLORE AYURPRAVAH",
  organisers: ["Yasharth Veda Foundation", "AyurWings Health Tech"],
};
export const seo = {
  title: "AYURPRAVAH 2027 | International Ayurveda Conclave & Expo",
  description: "A global platform bringing together Ayurveda experts, researchers, healthcare professionals, innovators, startups, institutions and industry leaders to shape the future of Ayurveda.",
};
```

Forbidden strings (add a CI grep): `Ayush Pravah`, `आयुष प्रवाह`, `Ayushpravah`.

---

## 2. Navigation

**Primary:** `About · AyurPravah · Conclaves · Speakers · Sessions · Expo · Partners · Venue · [Register]`
**Footer quick links:** Home, About, Conclaves, Speakers, Program, Expo, Partners, Venue, Accommodation, Gallery, Blog, Contact, Register, Privacy Policy, Terms, Refund Policy, Sitemap.

---

## 3. Brand architecture (Foundation → AyurWings → AyurPravah)

- **YASHARTH VEDA FOUNDATION** — Builds the ecosystem. *Ecosystem-building non-profit working across traditional knowledge, research, clinical excellence, education, technology, community health and global collaboration.*
- **AYURWINGS HEALTH TECH** — Powers the ecosystem digitally. *Digital platform empowering Ayurveda professionals through education, technology, digital solutions, professional development, research support and global connectivity.*
- **AYURPRAVAH 2027** — Brings the ecosystem together. *Flagship international platform where the Ayurveda and wider healthcare ecosystem unites around knowledge, science, clinical practice, technology, entrepreneurship, industry and global collaboration.*

---

## 4. Yasharth Veda Foundation

**Headline:** Reviving Tradition. Advancing Evidence. Shaping the Future of AYUSH.

**8 operational pillars** (title only is source-provided; descriptions = `TBC` placeholder text):

| # | Pillar |
|---|---|
| 01 | Digital Evolution of AYUSH |
| 02 | Global Knowledge Exchange & Collaboration |
| 03 | Academic Institutional Engagement & Pedagogical Modernization |
| 04 | Clinical Excellence & Skill Development |
| 05 | Conferences, Conclaves & Industry Summits |
| 06 | Digital AYUSH & Emerging Technologies |
| 07 | AYUSH Entrepreneurship & Industry Connect |
| 08 | Community Health & Social Impact |

**Impact stats (count-up, gold separators):**

| Value | Label |
|---|---|
| 450+ | Academic Institutions Connected |
| 1.5 Lakh+ | Healthcare Professionals & Students Reached |
| 80+ | Knowledge Webinars & Educational Sessions |
| 10+ | National & International Events & Initiatives |
| 20+ | Free Health Camps & Community Health Initiatives |
| 03 | International Knowledge Partnerships & Collaborations |

---

## 5. AyurWings Health Tech

**Headline:** Empowering Ayurveda Digitally
**Supports:** education · technology · professional development · research · digital solutions · online consultation · scientific writing · branding/marketing · professional networking.
**Ecosystem nodes (8):** Courses · Technology · Research · Digital Solutions · Professional Growth · Consultation · Scientific Writing · Global Networking.

**At a glance:**

| Value | Label |
|---|---|
| 50+ | Courses |
| 10,000+ | Doctors Trained |
| 1.5 Lakh+ | Digital Reach |
| 70+ | Eminent Faculty |
| 10+ | Workshops |

---

## 6. Transition into AyurPravah

**Headline:** A Platform Where Tradition Meets Transformation
Brings together: traditional knowledge + science + clinical excellence + technology + entrepreneurship + global collaboration.

**Circular ecosystem — centre `AYURPRAVAH`, 9 dimensions (activate on scroll):**
TRADITION · SCIENCE · CLINICAL PRACTICE · RESEARCH · AI · DIGITAL HEALTH · STARTUPS · INDUSTRY · GLOBAL COLLABORATION

---

## 7. Theme section

**Headline:** Uniting Global Experts, Researchers, Innovators & Industry Leaders to Shape the Future of Ayurveda
**Convergence (6, with × between):** Traditional Knowledge × Modern Science × Clinical Excellence × Innovation & Technology × Industry & Entrepreneurship × Global Collaboration.
Each: hover/tap → short description (`TBC`), connecting line activates, background visual swaps.

---

## 8. Pinned storytelling ("The Future of Ayurveda Is Collaborative")

Six concepts appear one by one on scroll, then section releases:
Research → Clinical Excellence → Technology → Entrepreneurship → Industry → Global Collaboration.

---

## 9. Major Conclaves & Forums (seed `conclaves` table — 13 items)

`layout` drives editorial variety (`featured` = large, `image` = image-backed, `standard`, `horizontal`, `offset`).

| # | Title | slug | layout |
|---|---|---|---|
| 1 | Global Experts Conclave | `global-experts-conclave` | featured |
| 2 | Expert-Led Clinical Sessions | `expert-led-clinical-sessions` | standard |
| 3 | Ayurveda Research & Publication Conclave | `research-publication-conclave` | image |
| 4 | Hands-on Clinical Workshops | `hands-on-clinical-workshops` | horizontal |
| 5 | AYUSH Policy, Regulation & NABH Forum | `ayush-policy-regulation-nabh-forum` | standard |
| 6 | Hospital & Healthcare Leadership Summit | `hospital-healthcare-leadership-summit` | offset |
| 7 | AI, Digital Health & Technology Forum | `ai-digital-health-technology-forum` | image |
| 8 | Startup & Innovation Conclave | `startup-innovation-conclave` | standard |
| 9 | B2B, D2C & Strategic Industry Connect | `b2b-d2c-industry-connect` | horizontal |
| 10 | AYUSH Industry, Investment & Growth Summit | `ayush-industry-investment-growth-summit` | standard |
| 11 | International Collaboration & Knowledge Exchange | `international-collaboration-knowledge-exchange` | image |
| 12 | Public Awareness & Health Camp | `public-awareness-health-camp` | offset |
| 13 | AYUSH & Wellness Expo | `ayush-wellness-expo` | featured |

Per conclave modal fields (all admin-editable; seed `TBC`): title, full description, focus areas[], related sessions[], workshop info, CTA.

---

## 10. "More Than a Conference" — six stages

**Headline:** More Than a Conference · **Sub:** An Ecosystem of Knowledge, Innovation & Collaboration

| Stage | Copy |
|---|---|
| LEARN | Insights from eminent national and international experts. |
| EXPERIENCE | Hands-on, practical learning. |
| CONNECT | Meet professionals, institutions and organisations. |
| DISCOVER | Explore new technologies and innovations. |
| COLLABORATE | Develop academic, clinical, institutional and international partnerships. |
| GROW | Discover professional, institutional and business opportunities. |

---

## 11. AYURPRAVAH 2027 at a glance (animate **sequentially**)

| Value | Label |
|---|---|
| 5,000+ | Delegates |
| 10+ | Countries |
| 50+ | Eminent Speakers |
| 40+ | Expert-Led Sessions  *// CONFIRM (source showed "2340+" — page-number artefact)* |
| 20+ | Hands-On Workshops |
| 100+ | Brands |
| 50,000+ | Visitors |
| 20+ | Pre-AyurPravah Conferences |
| 20+ | Pre-AyurPravah Health Camps |
| 30+ | Pre-AyurPravah Webinars |
| 1.5 Lakh+ | Digital AYUR Connect |

---

## 12. Speakers (DB-driven — NO fabricated people)

Seed 8 **placeholder** cards: `Speaker Name TBC · Designation TBC · Institution TBC`, neutral botanical silhouette image. Fields: name, slug, photo, designation, institution, country, bio, **talk_topic** (benchmark feature), social links, category (Keynote / Ayurveda Experts / Healthcare Leaders / Researchers / Industry Leaders / International), featured, sort_order.

---

## 13. Expo & Wellness

**Headline:** AYURVEDA & WELLNESS EXPO
**Sub:** Where Ancient Wisdom Meets Modern Innovation — Creating New Possibilities for the Future of Ayurveda.
**Showcase items (horizontal drag rail):** Ayurvedic products · Wellness products · Healthcare solutions · Medicinal farming innovation · Emerging brands · Technology · Startup solutions · Business opportunities.

## 14. Startup & Innovation

**Headline:** Innovation Meets Tradition
**Nodes:** AI · Digital Health · Health Tech · Startups · Product Innovation · Healthcare Solutions.

## 15. Global Collaboration (map)

Origin: India. Region hotspots (labels only, **no claimed partners**): North America · South America · Europe · Africa · Middle East · Central Asia · South Asia · East Asia · South-East Asia · Oceania. Each opens a card: `Region — collaboration details TBC`.

## 16. Venue

Venue: `TBC` · Dates: 16–18 April 2027 · Map embed/link (admin) · Directions · Travel info · Accommodation info · CTA `GET DIRECTIONS →`.

## 17. Registration pathways

`REGISTER AS DELEGATE` · `REGISTER AS EXHIBITOR` · `BECOME A PARTNER` · `SUBMIT ABSTRACT` · (optional) `SPONSORSHIP ENQUIRY`.

## 18. Partners (categories)

Organized By · Knowledge Partners · Associate Partners · Technology Partners · Industry Partners · Media Partners. Organised By is pre-seeded with Yasharth Veda Foundation + AyurWings Health Tech (logos to be supplied); all other categories empty-state "Announcing soon".

## 19. Final CTA

> **From Knowledge to Innovation.**
> **From Innovation to Impact.**
> **From India to the World.**

Support: *Build a globally connected, evidence-driven and future-ready Ayurveda ecosystem.* · CTA: `JOIN AYURPRAVAH 2027 →`

## 20. Contacts (department-wise — benchmark feature; values `TBC`, admin settings)

Delegate enquiry · Exhibitor enquiry · Knowledge sessions / abstracts · Sponsorship & partnerships · Media relations. Each: email + phone + WhatsApp (all TBC).

## 21. Footer content

AYURPRAVAH 2027 logo · Hindi wordmark · date · venue · contact · quick links · social · registration · Privacy · Terms · Refund · partner logos · muted gold separators · © line.

## 22. Pricing tiers (seed placeholders — NO invented prices)

| Category | Tier name | Price |
|---|---|---|
| Delegate | Early Bird (TBC) | 0 — TBC |
| Delegate | Regular (TBC) | 0 — TBC |
| Delegate | Student (TBC) | 0 — TBC |
| Delegate | International (TBC) | 0 — TBC |
| Exhibitor | Stall packages (TBC) | 0 — TBC |

Admin edits tiers, price, currency, validity window, quota, GST %. Seeder sets `is_active=false` until real prices are entered so no one can pay ₹0 by accident.
