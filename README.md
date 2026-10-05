# Caliche Plumbing — Nationwide Plumbing Lead-Gen Site

This project was built from the **Local Service Lead-Gen Website Playbook** (the SteadWell README, Part B). The playbook stays the process reference; this file documents this project.

**Stack:** Next.js 16 (App Router, static) · React 19 · TypeScript · Tailwind CSS v4 · Zod · sharp. Content is typed data in `src/content/`, shaped to match `prisma/schema.prisma`.

## Snapshot (2026-10-05, nationwide expansion)

| | |
|---|---|
| Market | All 50 states + DC. LeadSmart plumbing **call** coverage spans 24,627 ZIPs / 15,392 places (export 2026-10-04), so every state has real buyers |
| Services | **23 in 9 categories**: added Freeze & Flood Protection (frozen/burst pipe repair, sump pumps). All service pages and guides rewritten for a national audience |
| Locations | 51 state hubs · **389 city pages** · 3 hand-written city+service pages. Every other covered place is listed (unlinked) on its state hub |
| Indexable URLs | **487** in 6 sitemaps (pages, services, states, cities, city-services, guides), max click depth 2 |
| Audit | `npm run audit:seo`: **0 errors**, 28 similarity warnings (city pages at 0.70–0.77 Jaccard to a sibling) |
| Coverage ZIPs | `src/data/geo/zips.json` (server-only), served by `/api/zip/` to the ZIP checker and lead form |

### How the nationwide location pages work

- **Data:** `scripts/build-geo.mjs` joins the LeadSmart coverage shards with Census ACS 2023 5-year tables (B01003, B25034, B25040, B25024, B25003) aggregated over each place's covered ZCTAs, and writes `src/data/geo/{ST}.json`. Re-run it when coverage changes (instructions in the script header).
- **State facts:** `src/content/stateFacts.ts` holds licensing authority, freeze exposure, broad water hardness and 2–3 notes per state. Where licensing is local (NY, PA, MO, KS, NE, WY) it says so.
- **City pages:** `src/lib/localContent.ts` writes sections only when the numbers support them (pre-1960 housing ≥25%, 1980–99 ≥28%, gas heat ≥50%, oil ≥8%, etc.). A place gets a page when its covered ZIPs hold ≥100,000 people, plus each state's two largest places. Arizona's 16 hand-written cities override the generated version.
- **Quality gate:** `src/lib/quality.ts` (indexing) and the crawler's near-duplicate check (`scripts/seo-audit.mjs`, 5-word shingles, numbers normalized). Generated city+service pages exist in code but are **off** (`GENERATE_CITY_SERVICES`): they measured 0.89 similarity to siblings. Turn one on only after writing real local content for it.

## Snapshot (2026-09-27, Phoenix launch)

| | |
|---|---|
| Brand | **Caliche Plumbing** (short: Caliche). Domain `calicheplumbing.com`: RDAP 404, unregistered on 2026-09-27 |
| Market | Phoenix metro, Maricopa County, AZ. Chosen from the LeadSmart coverage map: AZ has the **highest avg plumbing CPL ($67.60)**; 84 of its 123 ZIPs pay the $76 tier |
| Business model | Call brand / referral for LeadSmart buyers. Disclosure in `src/content/site.ts` |
| Services | **21 in 8 new categories:** Hard Water & Filtration · Slab & Hidden Leaks · Repiping · Water Heaters · Pressure & Supply · Irrigation & Backflow · Drains & Sewer · Gas Lines |
| Locations | 1 state · **16 cities** in 5 regions · 3 city+service pages (Phoenix slab leak repair, Scottsdale softeners, Sun City West repiping) |
| Guides | 10 |
| PPC pages | 5 (`/lp/slab-leak`, `water-heater`, `emergency-plumber`, `water-softener`, `repipe`) |
| Indexable URLs | **62** in 4 sitemaps, max click depth 2 |
| Audit | `npm run audit:seo`: **0 errors, 0 warnings** |
| Coverage ZIPs | All 123 LeadSmart AZ plumbing ZIPs in `src/content/coverage.ts` (used by the ZIP checker and lead routing) |
| Temporary phone | `(602) 555-0147` (fictional range, kept out of schema) |

## Run it

```bash
npm install
cp .env.example .env.local
npm run dev
npm run build && npm start
BASE=http://localhost:3002 npm run audit:seo
npm run icons        # fills only missing favicons/logo
npm run indexnow     # after deploy
```

In dev, `GET /api/quality-report/` shows the quality gate result for every city and city+service page.

## Where things are

The layout follows playbook A3:

- **Content:** `src/content/`
  - `services.ts` + `servicesMore.ts`
  - `locations.ts` + `locationsMore.ts` + `locationDepth.ts`
  - `articles.ts`
  - `misc.ts`: FAQs, problems, landing pages, redirects, dates, reviews
  - `coverage.ts`
  - `photos.ts`
- **Libraries:** `src/lib/`
  - `routes`, `seo`, `schema`, `sitemap`, `quality`, `linker`, `og`, `attribution`, `analytics`
  - `lead/*`
- **Scripts:** `scripts/`
  - `seo-audit.mjs`, `make-icons.mjs`, `indexnow.mjs`
- **Docs:** `docs/STRATEGY.md` holds the Phase 1 plan (14 items) and the coverage data.

## Images

There are 13 real Pexels photos, credited in `public/photos/CREDITS.md` and converted to WebP. They appear in:
- the home hero (Phoenix aerial)
- the services hub and emergency heroes
- every service hero (category photo)
- the home category cards
- every guide

They're served through `next/image` with `sizes`; only above-the-fold images use `priority`. The logo is an inline SVG mark with a PNG export at `public/brand/logo.png`.

## Verified on 2026-09-27

- `tsc` and `next build`: clean.
- The SEO audit passes with 0 errors. It checks:
  - robots and sitemaps
  - canonicals, noindex, duplicate titles/descriptions/H1s
  - JSON-LD validity and `@id` integrity
  - orphans and click depth
  - soft 404s and the trailing-slash redirect
  - `?kw=` reflection
  - `llms.txt` links
  - cross-origin lead rejection
- No horizontal overflow at 375px on:
  - home and service
  - city and city+service
  - guide
  - locations hub
  - request page and LP
- Lead form, walked through all 3 steps in the browser:
  - `dataLayer` events fired: `form_start`, `service_selected`, `form_step` and `location_selected`.
  - Production with no `LEAD_WEBHOOK_URL` returns 503 "please call", as designed, and `form_submit` is not fired.

## Pending

- [ ] **Successful lead delivery is untested.** Neither of these has been exercised yet:
  - the dev `.data/leads.jsonl` path
  - a real webhook

  A stale dev server on :3000 with a font-fetch error blocked the dev test. Restart `npm run dev`, then submit a test lead.
- [ ] Register `calicheplumbing.com`; USPTO Class 37 and AZ Corporation Commission name checks.
- [ ] Replace the 555 phone with the LeadSmart number, and set `LEAD_WEBHOOK_URL` + secret.
- [ ] Set up Google Business Profile, then add review links to `.env`; add real reviews only.
- [ ] Get a legal review of Privacy/Terms, including the TCPA consent wording.
- [ ] Set up GTM + Consent Mode, GA4 and Ads conversions.
- [ ] Spot-check the Rich Results Test and PageSpeed on the live domain.
- [ ] Replace the stock photos with real job photos as they come in. No real US tank-water-heater photo was found, so that category uses a shower-head image.
- [ ] Extend the playbook's `docs/SEO.md` and `docs/MEASUREMENT.md` for this site.
