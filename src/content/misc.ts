import type { Faq, LandingPage, Review } from "./types";

// Content dates for sitemap lastmod. Never the build time.
export const dates = {
  site: "2026-10-05",
  services: "2026-10-05",
  locations: "2026-10-05",
  guides: "2026-10-05",
  legal: "2026-09-27",
};

// Only real, verified reviews. Empty until the Google Business Profile collects them.
export const reviews: Review[] = [];

export const redirects: { source: string; destination: string; permanent: boolean }[] = [
  { source: "/services/", destination: "/plumbing-services/", permanent: true },
  { source: "/service-areas/", destination: "/locations/", permanent: true },
  { source: "/blog/", destination: "/resources/", permanent: true },
  { source: "/resources/polybutylene-pipes-arizona/", destination: "/resources/polybutylene-pipes/", permanent: true },
];

export const generalFaqs: Faq[] = [
  { q: "How does Caliche Plumbing work?", a: "You call or send a request, and we connect you with an independent, licensed plumber who serves your ZIP code. The plumber quotes and performs the work directly." },
  { q: "Is Caliche Plumbing a plumbing company?", a: "No. We're a referral service. The plumbers in our network are independent contractors responsible for their own licensing, pricing and work." },
  { q: "What areas do you cover?", a: "Our network covers thousands of cities in all 50 states and Washington, DC. Coverage is set ZIP code by ZIP code, depending on which licensed plumbers are active there, so check your ZIP on the locations page." },
  { q: "Does it cost anything to request service?", a: "No. Requesting service is free. You only pay the plumber for work you approve." },
  { q: "How do I check a plumber's license?", a: "Most states license plumbers through a state board, and some (including New York, Pennsylvania, Missouri and Kansas) leave it to cities and counties. Each state page on this site names the licensing authority. Search the contractor's name or license number there before work starts." },
  { q: "Do you give prices over the phone?", a: "Plumbing prices depend on what the plumber finds on site, so we explain the cost factors on each service page and the plumber quotes after seeing the job." },
];

export const problems = [
  { symptom: "High water bill", cause: "Running toilet, hidden leak or irrigation leak", service: "slab-leak-detection", guide: "why-is-my-water-bill-so-high" },
  { symptom: "Warm spot on the floor", cause: "Hot-water line leaking under the slab", service: "slab-leak-detection", guide: "warm-spot-on-floor" },
  { symptom: "White crust on fixtures", cause: "Hard-water scale", service: "water-softener-installation", guide: "white-crust-on-faucets" },
  { symptom: "Water heater rumbling", cause: "Sediment from hard water", service: "water-heater-flush", guide: "water-heater-rumbling" },
  { symptom: "Banging pipes", cause: "High pressure or a failed PRV", service: "pressure-regulator-valve", guide: "water-pressure-too-high" },
  { symptom: "Gray pipe marked PB2110", cause: "Polybutylene supply lines", service: "polybutylene-replacement", guide: "polybutylene-pipes" },
  { symptom: "Soggy patch in the yard", cause: "Main line or irrigation leak", service: "main-water-line-repair", guide: "why-is-my-water-bill-so-high" },
  { symptom: "No water on a freezing morning", cause: "A frozen pipe, which may split when it thaws", service: "frozen-pipe-repair", guide: "burst-pipe-what-to-do" },
  { symptom: "Smell of gas", cause: "Gas leak: leave and call the utility", service: "gas-line-repair", guide: "smell-gas-what-to-do" },
];

export const landingPages: LandingPage[] = [
  {
    slug: "slab-leak",
    service: "slab-leak-detection",
    canonical: "/plumbing-services/slab-leak-detection/",
    headline: "Slab leak? Talk to a local plumber now",
    sub: "Warm spot on the floor, a high bill or running water with everything off. Get connected with a licensed local plumber who locates slab leaks before cutting anything.",
    bullets: ["Leak located with meter, acoustic and thermal tests", "Repair options explained: spot repair, reroute or repipe", "Independent, licensed local contractors"],
    signs: ["Warm or hot spot on tile", "Water bill higher than last year", "Meter spins with everything off"],
    expect: ["A short call to understand the problem", "Connection with a plumber serving your ZIP", "Detection, then a written repair option before work starts"],
    faqs: [{ q: "How fast can a plumber come out?", a: "It depends on the day and your area. Many requests are scheduled the same or next day." }],
    kw: { "hot-spot": "Warm spot on the floor? It may be a slab leak", "high-bill": "High water bill? Find the leak", "phoenix": "Slab leak in Phoenix? Talk to a plumber now" },
  },
  {
    slug: "water-heater",
    service: "water-heater-replacement",
    canonical: "/plumbing-services/water-heater-replacement/",
    headline: "No hot water? Get a water heater plumber",
    sub: "Leaking tank, rusty water or a heater that quit. Get connected with a licensed plumber for repair or same-day replacement where stock allows.",
    bullets: ["Gas, electric and tankless", "Code items handled: expansion tank, pan, venting", "Independent, licensed local contractors"],
    signs: ["Water around the tank", "Rusty or lukewarm water", "Rumbling or popping"],
    expect: ["A quick call about the heater's age, fuel and location", "A plumber serving your ZIP", "A quote before any work"],
    faqs: [{ q: "Can it be replaced today?", a: "Often, for common tank sizes, when the plumber has stock. Tankless conversions take more planning." }],
    kw: { "leaking": "Water heater leaking? Get help now", "tankless": "Tankless water heater installation", "no-hot-water": "No hot water? Talk to a plumber now" },
  },
  {
    slug: "emergency-plumber",
    service: "slab-leak-repair",
    canonical: "/emergency-plumbing/",
    headline: "Plumbing emergency? Call now",
    sub: "Burst pipe, major leak or sewage backup. Shut off the main, then call and we'll connect you with a licensed plumber who serves your ZIP code.",
    bullets: ["Burst pipes and major leaks", "Sewer backups", "Gas leaks after the utility has made it safe"],
    signs: ["Water you can't stop", "Sewage coming up", "Water near electrical"],
    expect: ["Guidance on shutting off water", "Connection to an available plumber", "Pricing confirmed by the plumber before work"],
    faqs: [{ q: "Where is my main shutoff?", a: "In basement homes, usually on the front wall where the main enters by the meter. In slab homes, often near the front hose bib or in the garage by the water heater." }],
    kw: { "burst-pipe": "Burst pipe? Call a plumber now", "frozen-pipe": "Frozen pipe? Shut off the main and call", "24-hour": "Need a plumber fast? Call now", "sewer": "Sewer backup? Call a plumber now" },
  },
  {
    slug: "water-softener",
    service: "water-softener-installation",
    canonical: "/plumbing-services/water-softener-installation/",
    headline: "Water softener installation",
    sub: "Protect your water heater and fixtures from hard water. Get connected with a licensed plumber who sizes and installs it right.",
    bullets: ["Sized to your household and measured hardness", "Loop added if your home doesn't have one", "Drain routed with an air gap to code"],
    signs: ["White crust on fixtures", "Rumbling water heater", "Spotty dishes and glass"],
    expect: ["A quick call about your home", "A plumber serving your ZIP", "Quote before install"],
    faqs: [{ q: "Do I need a loop?", a: "Many homes in hard-water areas built since the 1990s have one. If yours doesn't, the plumber adds one at the main line." }],
    kw: { "scottsdale": "Water softener installation in Scottsdale", "hard-water": "Hard water? Get a softener installed", "ro": "Softener and reverse osmosis installation" },
  },
  {
    slug: "repipe",
    service: "whole-house-repiping",
    canonical: "/plumbing-services/whole-house-repiping/",
    headline: "Repipe your home with PEX",
    sub: "Polybutylene, galvanized or repeated copper leaks? Get connected with a licensed plumber for a whole-house repipe quote.",
    bullets: ["PEX or copper, routed to minimize wall openings", "Permit and inspection handled by the contractor", "Most homes finished in a few working days"],
    signs: ["Gray pipe marked PB2110", "Two or more pinhole or slab leaks", "Rusty or low-pressure water from galvanized pipe"],
    expect: ["A call about your home's age and pipe", "A plumber serving your ZIP", "A walkthrough and written quote"],
    faqs: [{ q: "Can we stay home during a repipe?", a: "Usually. Water is off during working hours and back on most evenings." }],
    kw: { "polybutylene": "Polybutylene pipe replacement", "galvanized": "Replace old galvanized pipe", "slab-leaks": "Tired of slab leaks? Repipe with PEX" },
  },
];

export function getLanding(slug: string) {
  return landingPages.find((l) => l.slug === slug);
}
