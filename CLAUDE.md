# SecureNet Fiber 2026 — Project Handoff

## What this is

Marketing/customer-facing website for **SecureNet Fiber**, a local ISP serving the Kanawha Valley (WV) and Danville (VA). Built with Next.js 15 App Router, deployed to Vercel via GitHub (`yojoshio/securenet-2026`).

This is NOT a web app with auth/dashboard. It is a public-facing site with plans, coverage info, contact forms, FCC broadband labels, and SEO structured data.

---

## Rules (non-negotiable)

1. **NEVER add AI attribution** — no `Co-Authored-By`, no "built with Claude", nothing. Josh has said this multiple times.
2. **NEVER take screenshots** — Josh explicitly told us to stop.
3. **No Tailwind** — plain CSS with custom properties. The project was intentionally set up this way.
4. **No README creation** unless asked.
5. **Just fix things** — don't ask for permission on obvious fixes. Josh prefers action over discussion.
6. **Git email is `yojoshio@hotmail.com`** — Vercel Hobby requires commits from the linked GitHub account email.
7. **Always build before pushing** — run `npx next build` and confirm zero errors.

---

## Tech stack

- **Next.js 15.5** (App Router) + **React 19** + **TypeScript 5.9**
- **Plain CSS** (`public/css/style.css`) — no Tailwind, no CSS modules, no styled-components
- **Output mode**: `standalone` (in `next.config.ts`)
- **Hosting**: Vercel (auto-deploys from `main` branch)
- **Repo**: `https://github.com/yojoshio/securenet-2026.git`
- **Path alias**: `@/*` maps to project root

---

## Directory structure

```
securenet-2026/
├── app/
│   ├── layout.tsx              # Root layout — Inter font, global CSS, Header/Footer, JSON-LD schemas
│   ├── page.tsx                # Homepage — hero, plan preview, availability check, about blurb
│   ├── residential/page.tsx    # Residential plans — PlanCardWithLabel, why fiber, what's included
│   ├── business/page.tsx       # Business plans + phone + services + quote form
│   ├── coverage/page.tsx       # Market areas (Kanawha Valley, Danville) + availability check
│   ├── about/page.tsx          # Story, values, stats, CTA
│   ├── contact/page.tsx        # Contact info (real WV/VA phones) + ContactForm component
│   ├── status/page.tsx         # Network status — banner, per-market metrics, incidents
│   ├── speedtest/page.tsx      # Speed test — CTA to securenet.speedtest.net, iframe, tips
│   ├── legal/
│   │   ├── privacy/page.tsx    # Placeholder
│   │   ├── terms/page.tsx      # Placeholder
│   │   └── acceptable-use/page.tsx  # Placeholder
│   └── api/
│       └── broadband-labels/route.ts  # Machine-readable FCC label JSON (GET, 24hr cache)
├── components/
│   ├── Header.tsx              # Client — fixed nav, mobile menu, scroll detection
│   ├── Footer.tsx              # Server — links to all pages, legal, external accounts
│   ├── PlanCard.tsx            # Server — renders a single plan card
│   ├── PlanCardWithLabel.tsx   # Client — PlanCard + collapsible BroadbandLabel toggle
│   ├── BroadbandLabel.tsx      # Server — FCC nutrition label (speeds, fees, data, policies)
│   ├── AvailabilityCheck.tsx   # Client — address form with success state
│   ├── ContactForm.tsx         # Client — contact form with success state
│   ├── QuoteForm.tsx           # Client — business quote form with success state
│   └── SchemaOrg.tsx           # Server — OrganizationSchema, LocalBusinessSchema, PlanSchema, BreadcrumbSchema
├── lib/
│   └── plans.ts                # Central data — Plan + Fee interfaces, COMPANY_INFO, all plan arrays
├── public/
│   ├── css/style.css           # ALL styles (~1800 lines) — variables, components, responsive, FCC labels
│   └── img/                    # Logo variants + favicon
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Key files in detail

### `lib/plans.ts` — The data layer

Everything plan-related lives here. Exports:

- `Plan` interface — id, name, speed, price, features, FCC fields (fccId, typicalDownload/Upload, typicalLatency, dataAllowance, fees, contractRequired, planType)
- `Fee` interface — name, amount, frequency, note
- `COMPANY_INFO` constant — phones (WV/VA), email, hours, policy URLs, social links, locations, signupUrl, billPayUrl, speedTestUrl
- `residentialPlans` — 500Mbps/$52, 1Gig/$72, 5Gig/$152
- `businessPlans` — FiberStart 500Mbps/$72, FiberGrow 1Gig/$92, FiberPro 2Gbps/$132
- `homePreviewPlans` — subset shown on homepage (same plans, shorter feature lists)

### `public/css/style.css` — Single stylesheet

All styling in one file. Uses CSS custom properties:
- `--navy: #2E368F` (primary brand)
- `--accent: #3C91E6` (links, CTAs)
- `--green: #16a34a` (status, checkmarks)
- `--red: #ED254E` (errors)
- `--bg-deep: #f7f8fb`, `--bg-surface: #eef0f5`, `--bg-card: #ffffff`

Sections: reset, layout, buttons, header/nav, hero, plans, benefits, availability, about, contact, footer, mobile menu, responsive breakpoints (64rem, 48rem, 30rem), page hero, coverage, about page, contact page, included grid, dot patterns, form success, broadband labels, network status, speed test.

### `components/SchemaOrg.tsx` — JSON-LD structured data

Four exports: `OrganizationSchema`, `LocalBusinessSchema`, `PlanSchema`, `BreadcrumbSchema`. All render `<script type="application/ld+json">`. Organization + LocalBusiness are in the root layout `<head>`. Plan + Breadcrumb are on residential and business pages.

---

## Real contact info (from securenetfiber.com/contact/)

- **WV**: (304) 744-4034
- **VA**: (434) 354-0101
- **Email**: info@securenetfiber.com
- **Office hours**: Monday – Friday, 9 AM – 5 PM
- **Support hours**: Monday – Friday, 8 AM – 8 PM | Saturday – Sunday, 12 PM – 8 PM
- **Sign up**: https://securenetfiber.com/service-request/
- **Bill pay**: https://billing.securenetfiber.com
- **Speed test**: https://securenet.speedtest.net

---

## Navigation structure

**Header** (4 links + 2 buttons): Residential, Business, Coverage, Contact | Bill Pay (ghost), Sign Up (primary)

"About" was intentionally removed from the header — it lives in the footer and on the homepage only.

**Footer columns**: Service (Residential, Business, Coverage Areas, Network Status, Speed Test) | Account (Bill Pay, Sign Up) | Company (About Us, Contact) | Legal (Privacy Policy, Terms of Service, Acceptable Use)

---

## Forms

All forms are client-side only with success states (no backend yet). They use `useState` to toggle between form and confirmation message on submit. No API routes for form handling exist yet.

- `ContactForm.tsx` — name, email, message
- `QuoteForm.tsx` — name, company, email, phone, message
- `AvailabilityCheck.tsx` — single address field, shows entered address on success

---

## What's been built (complete)

- [x] Full Next.js migration from static HTML prototype
- [x] All page routes (15 total including legal placeholders + API)
- [x] Real contact info on contact page
- [x] Client-side form success states
- [x] FCC broadband nutrition labels (collapsible per plan card)
- [x] Machine-readable `/api/broadband-labels` endpoint
- [x] JSON-LD structured data (Organization, LocalBusiness, Product, Breadcrumb)
- [x] Network status page (placeholder data)
- [x] Speed test page (links to securenet.speedtest.net)
- [x] Footer links to all new pages
- [x] Legal placeholder pages

## What's planned (not started)

- [ ] Announcement/alert bar (top of page, dismissible)
- [ ] MDX or headless CMS blog
- [ ] FAQ page/section
- [ ] API routes for form submissions (ContactForm, QuoteForm, AvailabilityCheck)
- [ ] Real status page data (connect to monitoring API)
- [ ] Legal page real content (privacy policy, terms, acceptable use)

---

## Build & deploy

```bash
cd C:\Users\JoshKing\Code\securenet-2026
npx next build          # Must pass with 0 errors before pushing
git push                # Triggers Vercel auto-deploy
```

Current build: 15 routes, zero errors, ~102KB shared JS.

---

## Commit history

```
ef45ee9 Remove About from header nav, drop redundant status metric from market cards
ee418f5 Fix status page layout — dedicated metric styles, prominent status banner
2258856 Add FCC broadband labels, network status, schema markup, speed test
c5a395c Demo-ready: real contact info, form success states, legal pages
53075ff Initial Next.js migration from static HTML prototype
```
