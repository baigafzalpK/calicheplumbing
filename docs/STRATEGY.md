# Caliche Plumbing — Phase 1 Strategy

Research date: 2026-09-27. Coverage data: LeadSmart Coverage Intelligence (`leadsmart-coverage.netlify.app`, data date 2026-09-26). The SERP notes below come from trade knowledge of the Phoenix market, **not a live scrape**. Re-check them in Search Console once the site is live.

## 1. Brand name

**Caliche Plumbing**, short name **Caliche**. Domain: `calicheplumbing.com`. Verisign RDAP returned 404 (unregistered) on 2026-09-27; `callcaliche.com` is also free for call-tracking vanity use.

- *Caliche* is the cemented calcium-carbonate soil layer under much of the Valley. Every Phoenix homeowner who has dug a hole knows the word. It's local, short and memorable, and it doesn't imitate a national brand.
- Before spending on it, recommend a USPTO search (Class 37) and an Arizona Corporation Commission entity search.

## 2. Initial market: Phoenix metro (Maricopa County, AZ)

Why Arizona: on the LeadSmart coverage map, Arizona has the **highest average plumbing CPL of any state ($67.60)**. It covers 123 ZIPs, and 84 of them pay the top $76 tier (checked 2026-09-26). By comparison, PA averages $50.99, FL $49.97 and NC $35.90.

| Payout tier | Where |
|---|---|
| **$76 CPL** (84 ZIPs) | Central and north Phoenix, Scottsdale (most ZIPs), Paradise Valley, Glendale, Peoria, Surprise (most ZIPs), Sun City, Sun City West, Youngtown, El Mirage, Avondale, Goodyear, Litchfield Park, Tolleson, Waddell, Cave Creek, New River |
| **$49.50 CPL** (39 ZIPs) | Mesa, Tempe, Chandler, Gilbert, Queen Creek, Fountain Hills, Carefree, Ahwatukee (85044/45/48), Laveen, 85259, 85378 |

**Priority:** the West Valley, Northwest Valley and central/north Phoenix pay the $76 tier, so they get the deepest pages and PPC budget first. The East Valley is covered at $49.50, so it gets city pages but a lower bid.

**Market conditions** (these drive the service mix):
- **Hard water:** Valley water is among the hardest in the US; providers report it in the teens of grains per gallon or higher. Scale shortens water heater life and clogs fixtures, so softeners and RO are a core category.
- **Slab foundations:** nearly every home sits on a slab with supply lines under or in it. Slab leaks are a signature Phoenix problem.
- **Pipe material:** homes from roughly 1978–1995 may have polybutylene. Copper pinhole leaks are common. Repiping in PEX is a major job category.
- **Heat:** outdoor pipes and hose bibs run hot, and heat plus UV degrades irrigation lines. Hard freezes are rare but real: some winter nights drop into the 20s and crack exposed backflow assemblies.
- **Irrigation:** almost every home has drip or flood irrigation with a backflow assembly. Many cities require annual backflow tests on certain assemblies.
- **Unincorporated areas:** Sun City, Sun City West and New River are unincorporated, so Maricopa County handles permits there. Cave Creek and parts of Paradise Valley rely on wells and septic.
- **Competition:** the market is dense with large home-service brands running heavy PPC and LSA budgets. We win on specific, honest, locally accurate pages and a fast lead path, not on claims.

## 3. Brand strategy

- **Voice:** plain-spoken, desert-practical. We explain the Valley-specific cause, which is hard water, slab, heat or old pipe material. No hype.
- **Palette:**

  | Token | Hex | Use |
  |---|---|---|
  | ink | `#1B2B34` | night slate: heroes, text, footer |
  | teal / teal-deep / teal-tint | `#2A7F83` / `#1D5F63` / `#E5F2F2` | links, accents, icon tiles |
  | sun / sun-dark | `#C2410C` / `#9A3412` | sunset: primary CTA only |
  | alert / alert-tint | `#B42318` / `#FDECEA` | emergency |
  | sand / sand-deep / line | `#F7F2E8` / `#EFE6D6` / `#E0D5C1` | backgrounds, borders |
  | sage | `#4D6B4F` | checks, success |

- **Type:** Fraunces (headings) + Public Sans (UI), loaded with `next/font`.
- **Logo concept:** a stratified-ground mark (three strata lines with a pipe drop), with the "Caliche" wordmark and "PLUMBING" set in small caps. It's built as inline SVG (`src/components/Logo.tsx`) until the owner supplies artwork.
- **CTA language:** "Call a plumber now", "Request service", "Check my ZIP".

## 4. SERP and competitor observations (not a live scrape)

- **Money queries** ("plumber phoenix", "slab leak repair phoenix", "water softener installation scottsdale", "water heater replacement glendale az"): the map pack plus LSAs dominate. Organic results are national directories plus large local brands. City+service pages and strong service pages can rank on long-tail queries.
- **Problem queries** ("why is my water bill so high", "hot spot on floor", "white crust on faucet", "polybutylene pipes arizona"): mostly answered by forums and thin blogs. There's room for honest guides.

## 5. Keyword clusters → one page each

| Cluster | Page |
|---|---|
| plumber phoenix / phoenix plumbing company | `/locations/arizona/phoenix/` (not the homepage) |
| Valley-wide brand + "phoenix metro plumber" | `/` |
| emergency plumber, burst pipe, 24 hour plumber | `/emergency-plumbing/` |
| {service} (+ phoenix/az) | `/plumbing-services/{service}/` |
| plumber {city} | `/locations/arizona/{city}/` |
| {service} {city} where a real local angle exists | `/locations/arizona/{city}/{service}/` |
| problem, how-to, "why" | `/resources/{guide}/` |
| cost of {service} | cost section on the service page (factors only, no prices) |

## 6. Information architecture

```
/  /plumbing-services/  /plumbing-services/{service}/  /emergency-plumbing/
/locations/  /locations/arizona/  /locations/arizona/{city}/  /locations/arizona/{city}/{service}/
/resources/  /resources/{guide}/  /about/ /contact/ /faq/ /request-service/ (noindex)
/privacy/ /terms/ /accessibility/ /thank-you/ (noindex)  /lp/{campaign}/ (noindex)
```

## 7. Service taxonomy (new categories, built for the desert market)

| Category | Services |
|---|---|
| Hard Water & Filtration | Water softener installation · Reverse osmosis systems · Whole-house filtration |
| Slab & Hidden Leaks | Slab leak detection · Slab leak repair & reroutes · Pinhole leak repair |
| Repiping | Whole-house repiping · Polybutylene pipe replacement |
| Water Heaters | Water heater replacement · Tankless water heaters · Hot water recirculation · Water heater flush & descaling |
| Pressure & Supply | Pressure regulator (PRV) replacement · Main water line repair |
| Irrigation & Backflow | Backflow testing & repair · Irrigation leak repair |
| Drains & Sewer | Drain cleaning · Sewer camera inspection · Sewer line repair |
| Gas Lines | Gas line repair · Gas appliance hookups |

That's **21 services**. Sub-problems (for example "PRV hammering") are sections inside these pages, not thin pages of their own.

## 8. Location architecture

State → city → city+service, all gated by `lib/quality.ts`. There are 15 city pages in 5 regions:

- Phoenix & Paradise Valley
- Northeast Valley (Scottsdale, Cave Creek)
- West Valley (Glendale, Peoria, Avondale, Goodyear, Litchfield Park)
- Northwest Valley (Surprise, Sun City, Sun City West)
- East Valley (Mesa, Tempe, Chandler, Gilbert)

City+service pages are published only where the local angle is real:
- Sun City: repiping
- Phoenix: slab leak repair
- Scottsdale: water softeners

## 9. Homepage wireframe

1. Hero (navy): what, where, how it works, call, request
2. Promise band
3. Emergency banner
4. Category cards
5. Symptom finder
6. "Why Valley plumbing is different" (hard water / slab / heat)
7. Process
8. Service area and ZIP checker
9. Guides
10. Reviews (invitation until real ones exist)
11. FAQ
12. Final CTA

## 10. PPC landing pages

Five pages under `/lp/`, each noindexed with the canonical pointing to the organic page, and a whitelisted `?kw=` headline swap:
- `slab-leak`
- `water-heater`
- `emergency-plumber`
- `water-softener`
- `repipe`

**Budget:** weight it toward the $76 ZIPs (see the table in section 2). Bid lower, or exclude, the $49.50 East Valley ZIPs until the call buyers confirm margin.

## 11. Internal linking

- **Hierarchy:** breadcrumbs, the mega menu and hubs.
- **Sideways:** related services, nearby towns, town chips and guides.
- **Contextual:** `createLinker()` topic table, first mention only, at most 6 per page.
- **Depth:** every indexable URL within 2 clicks of home.

## 12. Technical architecture

Next.js 16 App Router, static generation · Tailwind v4 · Zod · typed content in `src/content` · Prisma schema kept for later.

## 13. SEO implementation plan

`pageMeta()` · a connected JSON-LD graph · the quality gate · 4 sitemaps + index · robots · `llms.txt` · per-page OG images · IndexNow · `scripts/seo-audit.mjs`. See `docs/SEO.md`.

## 14. Lead workflow

1. 3-step form, with a short emergency path for active leaks.
2. ZIP coverage check against the LeadSmart ZIP list in `src/content/coverage.ts`.
3. Server-side validation: Zod, honeypot, timing, rate limit, same-origin.
4. Signed webhook to LeadSmart / the buyer.
5. Thank-you page.

Calls go to the LeadSmart tracking number. **Business model:** call brand for LeadSmart buyers; independent licensed plumbers do the work. See the disclosure in `src/content/site.ts`.
