# SecureNet Fiber 2026 -- Project Handoff

## What this is

Marketing/customer-facing website for **SecureNet Fiber**, a local ISP serving the Kanawha Valley (WV) and Danville (VA). Built with Next.js 15 App Router, deployed to Vercel via GitHub (`yojoshio/securenet-2026`).

This is NOT a web app with auth/dashboard. It is a public-facing site with plans, coverage info, contact forms, FCC broadband labels, and SEO structured data.

---

## Rules (non-negotiable)

1. **NEVER add AI attribution** -- no `Co-Authored-By`, no "built with Claude", nothing. Josh has said this multiple times.
2. **NEVER take screenshots** -- Josh explicitly told us to stop.
3. **No Tailwind** -- plain CSS with custom properties. The project was intentionally set up this way.
4. **No README creation** unless asked.
5. **Just fix things** -- don't ask for permission on obvious fixes. Josh prefers action over discussion.
6. **Git email is `yojoshio@hotmail.com`** -- Vercel Hobby requires commits from the linked GitHub account email.
7. **Always build before pushing** -- run `npx next build` and confirm zero errors.
8. **No dashes as punctuation** -- no em dashes, en dashes, or `--` as separators. Rephrase sentences to use periods, commas, or restructure instead. Josh has been very clear about this.
9. **No emoji in UI** -- no emoji in badges, pills, labels, or any visible component. Text only.

---

## Tech stack

- **Next.js 15.5** (App Router) + **React 19** + **TypeScript 5.9**
- **Plain CSS** (`public/css/style.css`) -- no Tailwind, no CSS modules, no styled-components
- **Output mode**: `standalone` (in `next.config.ts`)
- **Hosting**: Vercel (auto-deploys from `main` branch)
- **Repo**: `https://github.com/yojoshio/securenet-2026.git`
- **Path alias**: `@/*` maps to project root

---

## Directory structure

```
securenet-2026/
├── app/
│   ├── layout.tsx              # Root layout -- Inter font, global CSS, Header/Footer, AlertBar, JSON-LD schemas
│   ├── page.tsx                # Homepage -- hero, plan preview, availability check, about blurb
│   ├── residential/page.tsx    # Residential plans -- PlanCardWithLabel, why fiber, what's included
│   ├── business/page.tsx       # Business plans + phone + services + quote form
│   ├── coverage/page.tsx       # Market areas (Kanawha Valley, Danville) + links to city pages + availability check
│   ├── coverage/south-charleston/  # City landing page -- HQ city, all 3 plans, why fiber
│   ├── coverage/nitro/             # City landing page -- all 3 plans, done with cable messaging
│   ├── coverage/dunbar/            # City landing page -- all 3 plans, community-focused
│   ├── coverage/danville/          # City landing page -- VA market, 2 plans (500M + 1G), VA phone
│   ├── coverage/st-albans/         # Pre-registration page -- timeline, pre-reg form, expanding market
│   ├── about/page.tsx          # Story, values, stats, CTA
│   ├── contact/page.tsx        # Contact info (real WV/VA phones) + ContactForm component
│   ├── status/page.tsx         # Network status -- banner, per-market metrics, incidents
│   ├── speedtest/page.tsx      # Speed comparison -- interactive widget comparing fiber vs cable/DSL
│   ├── faq/page.tsx            # FAQ -- accordion by category (general, install, billing, support)
│   ├── legal/
│   │   ├── privacy/page.tsx         # Full privacy policy (14 sections, effective Jan 2025)
│   │   ├── terms/page.tsx           # Full terms of service (16 sections, effective Jul 2025)
│   │   ├── terms-of-use/page.tsx    # Website terms of use (13 sections, DMCA agent info)
│   │   ├── acceptable-use/page.tsx  # Full AUP (7 sections with subsections)
│   │   └── open-internet/page.tsx   # Open Internet Policy (no blocking/throttling/paid prioritization)
│   └── api/
│       └── broadband-labels/route.ts  # Machine-readable FCC label JSON (GET, 24hr cache)
├── components/
│   ├── Header.tsx              # Client -- fixed nav, mobile menu (full-screen overlay), scroll detection, close on route change
│   ├── Footer.tsx              # Server -- links to all pages, legal, external accounts
│   ├── AlertBar.tsx            # Client -- dismissible alert bar, reads config from lib/alerts.ts
│   ├── SpeedComparison.tsx     # Client -- tier selector, animated SVG gauges, provider comparison cards
│   ├── FaqAccordion.tsx        # Client -- collapsible FAQ accordion component
│   ├── PlanCard.tsx            # Server -- renders a single plan card
│   ├── PlanCardWithLabel.tsx   # Client -- PlanCard + collapsible BroadbandLabel toggle
│   ├── BroadbandLabel.tsx      # Server -- FCC nutrition label (speeds, fees, data, policies)
│   ├── AvailabilityCheck.tsx   # Client -- address form with success state
│   ├── ContactForm.tsx         # Client -- contact form with success state
│   ├── QuoteForm.tsx           # Client -- business quote form with success state
│   ├── SchemaOrg.tsx           # Server -- OrganizationSchema, LocalBusinessSchema, PlanSchema, BreadcrumbSchema
│   ├── NetworkPerformance.tsx  # Client -- network stats, per-market uptime/latency, animated bars, feature badges
│   └── PreRegForm.tsx          # Client -- pre-registration form (name, email, address, phone) with success state
├── lib/
│   ├── plans.ts                # Central data -- Plan + Fee interfaces, COMPANY_INFO, all plan arrays
│   └── alerts.ts               # Alert bar config -- enabled flag, variant (info/warning/critical), message, link
├── public/
│   ├── css/style.css           # ALL styles (~2100 lines) -- variables, components, responsive, FCC labels, speed comparison, FAQ, alert bar
│   └── img/                    # Logo variants + favicon
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Key files in detail

### `lib/plans.ts` -- The data layer

Everything plan-related lives here. Exports:

- `Plan` interface -- id, name, speed, price, features, FCC fields (fccId, typicalDownload/Upload, typicalLatency, dataAllowance, fees, contractRequired, planType)
- `Fee` interface -- name, amount, frequency, note
- `COMPANY_INFO` constant -- phones (WV/VA), email, hours, policy URLs, social links, locations, signupUrl, billPayUrl, speedTestUrl
- `residentialPlans` -- 500Mbps/$52, 1Gig/$72, 5Gig/$152
- `businessPlans` -- FiberStart 500Mbps/$72, FiberGrow 1Gig/$92, FiberPro 2Gbps/$132
- `homePreviewPlans` -- subset shown on homepage (same plans, shorter feature lists)

### `lib/alerts.ts` -- Alert bar configuration

Toggle site-wide alert bar by setting `enabled: true`. Supports three variants:
- `info` -- navy background (general announcements)
- `warning` -- amber background (degraded service)
- `critical` -- red background (outage)

Includes optional `linkText` and `linkHref` for a CTA. Dismissible by user.

### `public/css/style.css` -- Single stylesheet

All styling in one file. Uses CSS custom properties:
- `--navy: #2E368F` (primary brand)
- `--accent: #3C91E6` (links, CTAs)
- `--green: #16a34a` (status, checkmarks)
- `--red: #ED254E` (errors)
- `--bg-deep: #f7f8fb`, `--bg-surface: #eef0f5`, `--bg-card: #ffffff`

CSS class prefixes for newer components:
- `sc-` -- speed comparison widget
- `faq-` -- FAQ accordion
- `alert-bar` -- alert/announcement bar
- `city-` -- city landing pages (hero, stats, plans, included, why, CTA)
- `prereg-` -- pre-registration page (St. Albans)
- `net-perf-` -- network performance section
- `legal-` -- legal page content layout
- `market-` -- coverage page market area cards

Sections: reset, layout, buttons, header/nav, hero, plans, benefits, availability, about, contact, footer, mobile menu, responsive breakpoints (64rem, 48rem, 30rem), page hero, coverage, about page, contact page, included grid, dot patterns, form success, broadband labels, network status, speed comparison, FAQ, alert bar, legal pages, city landing pages, pre-registration, network performance.

### `components/SchemaOrg.tsx` -- JSON-LD structured data

Four exports: `OrganizationSchema`, `LocalBusinessSchema`, `PlanSchema`, `BreadcrumbSchema`. All render `<script type="application/ld+json">`. Organization + LocalBusiness are in the root layout `<head>`. Plan + Breadcrumb are on residential and business pages.

---

## Real contact info (from securenetfiber.com/contact/)

- **WV**: (304) 744-4034
- **VA**: (434) 354-0101
- **Email**: info@securenetfiber.com
- **Office hours**: Monday-Friday, 9 AM - 5 PM
- **Support hours**: Monday-Friday, 8 AM - 8 PM | Saturday-Sunday, 12 PM - 8 PM
- **Sign up**: https://securenetfiber.com/service-request/
- **Bill pay**: https://billing.securenetfiber.com
- **Speed test**: https://securenet.speedtest.net

---

## Navigation structure

**Header** (4 links + 2 buttons): Residential, Business, Coverage, Contact | Bill Pay (ghost), Sign Up (primary)

"About" was intentionally removed from the header -- it lives in the footer and on the homepage only.

**Footer columns**: Service (Residential, Business, Coverage Areas, Network Status, Speed Comparison) | Account (Bill Pay, Sign Up) | Company (About Us, Contact, FAQ) | Legal (Privacy, Terms, Acceptable Use, Open Internet)

---

## Forms

All forms are client-side only with success states (no backend yet). They use `useState` to toggle between form and confirmation message on submit. No API routes for form handling exist yet.

- `ContactForm.tsx` -- name, email, message
- `QuoteForm.tsx` -- name, company, email, phone, message
- `AvailabilityCheck.tsx` -- single address field, shows entered address on success
- `PreRegForm.tsx` -- name, email, address (required), phone (optional). Used on St. Albans pre-reg page.

---

## Installation info (for FAQ / marketing accuracy)

- Installation is **two parts**: outside fiber drop (done ~1 day before), then NID/ONT install + router setup (60-90 minutes)
- Installation is **free**
- **$200 drop recovery fee** if customer cancels within first 90 days (Terms of Service says $200)
- Payment methods: checks, debit cards, bank bill pay

---

## What's been built (complete)

- [x] Full Next.js migration from static HTML prototype
- [x] All page routes (23 total including legal, city pages, pre-reg, API)
- [x] Real contact info on contact page
- [x] Client-side form success states (all 4 forms)
- [x] FCC broadband nutrition labels (collapsible per plan card)
- [x] Machine-readable `/api/broadband-labels` endpoint
- [x] JSON-LD structured data (Organization, LocalBusiness, Product, Breadcrumb)
- [x] Network status page (placeholder data)
- [x] Speed comparison page (interactive widget, tier selector, animated gauges, provider cards)
- [x] FAQ page (accordion, 4 categories, 13 questions)
- [x] Alert/announcement bar (toggleable via lib/alerts.ts, 3 severity levels, dismissible)
- [x] Mobile menu (full-screen overlay, body scroll lock, close on navigate)
- [x] Responsive styles (tested on 13" laptops, tablets, phones)
- [x] Footer links to all pages including FAQ and speed comparison
- [x] Legal pages with full content (privacy, terms, terms of use, acceptable use, open internet)
- [x] City landing pages (South Charleston, Nitro, Dunbar, Danville) with dark navy heroes, plan cards, included checklist, why fiber, CTA
- [x] St. Albans pre-registration page with build timeline and pre-reg form
- [x] Network performance section on coverage page (stats, per-market metrics, animated uptime bars)
- [x] Coverage page links to individual city pages with status badges

## What's planned (not started)

- [ ] API routes for form submissions (ContactForm, QuoteForm, AvailabilityCheck, PreRegForm)
- [ ] Real status page data (connect to LibreNMS monitoring API)
- [ ] MDX or headless CMS blog
- [ ] Serviceability lookup (check if address is in footprint)

## LibreNMS integration (blocked on access)

Need from engineers:
- LibreNMS URL (internal network)
- API token with read access
- Device-to-market mapping (which devices = Kanawha Valley, which = Danville)

Plan: cron job on internal network queries LibreNMS API, builds JSON, pushes to public endpoint. Next.js API route fetches and caches. Josh wants to handle this himself once he has access info.

---

## What we need from engineering for API integration

**Network Status / Alerts**
- Endpoint returning current status per market (operational, degraded, outage)
- Per-market metrics (uptime %, latency, packet loss)
- Active incidents list (start time, description, affected area, severity)
- Polling vs websocket -- polling with cache interval is fine

**Form Submissions**
- Where form data should POST (internal API, webhook, CRM)
- Expected fields per form (contact, quote, availability)
- Auth requirements (API key, open behind VPN, etc.)

**Availability Check**
- Is there a serviceability lookup API? (address in, yes/no out)
- What format does it expect (full address, lat/lng, etc.)

---

## Build & deploy

```bash
cd C:\Users\JoshKing\Code\securenet-2026
npx next build          # Must pass with 0 errors before pushing
git push                # Triggers Vercel auto-deploy
```

Current build: 23 routes, zero errors, ~102KB shared JS.

---

## Commit history

```
289bcf0 Fix visual issues: dark city heroes, plan card layout, kill dashes, clean footer
f0c5b66 Add city landing pages, St. Albans pre-reg, legal pages with real content
5ad2d35 Add network performance section to coverage page
c04b106 Update CLAUDE.md with Day 2 progress
39d9e82 Fix FAQ content, kill em dashes, tighten avail heading line-height
9ad782a Fix sizing consistency, scale up comparison widget, FAQ, tighten availability
c04c653 Mobile fixes, speed comparison, FAQ, alert bar
e78b1b0 Add CLAUDE.md project handoff doc
ef45ee9 Remove About from header nav, drop redundant status metric from market cards
ee418f5 Fix status page layout, dedicated metric styles, prominent status banner
2258856 Add FCC broadband labels, network status, schema markup, speed test
c5a395c Demo-ready: real contact info, form success states, legal pages
53075ff Initial Next.js migration from static HTML prototype
```
