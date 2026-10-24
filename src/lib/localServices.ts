import "server-only";
import type { City, Faq, PlaceProfile } from "@/content/types";
import { stateBySlug, type StateFact } from "@/content/stateFacts";
import { getService, getCategory } from "@/content/services";
import { routes } from "./routes";
import { rawState } from "./geo";
import { pre1960 } from "./localContent";

// Service + location and sub-service + location pages.
// Each city gets at most two: its most data-relevant service category, and its most relevant sub-service from a
// different category (so the two never compete for the same query). Every paragraph is driven by the city's own
// Census numbers, compared with the state figure and ranked against the state's other city pages; the national
// service page carries the generic how-to, and these pages link to it rather than repeating it.

export type LocalServicePage = {
  stateSlug: string;
  citySlug: string;
  slug: string; // service or category slug (third URL segment)
  kind: "service" | "category";
  name: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  answer: string;
  sections: { heading: string; paras: string[] }[];
  facts: { term: string; detail: string }[];
  faqs: Faq[];
  related: string[]; // service slugs
  updated: string;
};

const U = "2026-10-14";
const pct = (n: number) => `${Math.round(n)}%`;
const ord = (n: number) => `${n}${n % 100 >= 11 && n % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] ?? "th"}`;

type Ctx = { c: City; p: PlaceProfile; f: StateFact; s: PlaceProfile | null; peers: City[]; label: string };

/** "38%, above the Ohio figure of 31%" */
function vs(ctx: Ctx, v: number, sv: number | undefined) {
  if (sv == null) return pct(v);
  const d = v - sv;
  if (Math.abs(d) < 2) return `${pct(v)}, close to the ${ctx.f.name} figure of ${pct(sv)}`;
  return `${pct(v)}, ${d > 0 ? "above" : "below"} the ${ctx.f.name} figure of ${pct(sv)}`;
}
/** "the 3rd highest of the 24 Ohio cities we profile" */
function rank(ctx: Ctx, get: (p: PlaceProfile) => number) {
  const vals = ctx.peers.filter((x) => x.profile).map((x) => ({ slug: x.slug, v: get(x.profile!) }));
  if (vals.length < 4) return "";
  vals.sort((a, b) => b.v - a.v);
  const i = vals.findIndex((x) => x.slug === ctx.c.slug) + 1;
  if (!i) return "";
  if (i <= vals.length / 2) return ` That ranks ${ord(i)} highest of the ${vals.length} ${ctx.f.name} cities we profile.`;
  return ` That ranks ${ord(vals.length - i + 1)} lowest of the ${vals.length} ${ctx.f.name} cities we profile.`;
}
const near = (ctx: Ctx, n = 3) => ctx.peers.filter((x) => ctx.c.nearby.includes(x.slug)).slice(0, n).map((x) => x.name);

// ---------- per-service angles ----------
type Def = {
  slug: string;
  kind: "service" | "category";
  score: (ctx: Ctx) => number;
  min: number;
  build: (ctx: Ctx) => Pick<LocalServicePage, "answer" | "sections" | "facts" | "faqs" | "related"> & { metaHook: string };
};

const old = (p: PlaceProfile) => pre1960(p);
const pre80 = (p: PlaceProfile) => pre1960(p) + p.built.y1960_79;
const slabState = (f: StateFact) => (f.freeze === "rare" || f.freeze === "occasional") && (f.region === "South" || f.region === "West");
const basementState = (f: StateFact) => f.region === "Midwest" || f.region === "Northeast";

const repipeParas = (ctx: Ctx) => {
  const { p, c, s } = ctx;
  return [
    `${pct(old(p))} of homes in ${c.name}'s covered ZIP codes were built before 1960 (${vs(ctx, old(p), s ? old(s) : undefined)}).${rank(ctx, old)} Homes of that age were plumbed with galvanized steel, which rusts from the inside until pressure drops and the water runs brown.`,
    p.built.pre1940 >= 15
      ? `${pct(p.built.pre1940)} of the housing predates 1940. Many of those homes have had partial repairs over the decades, so it's common to find copper or PEX spliced into old galvanized runs, and those joints are where leaks start.`
      : `Only ${pct(p.built.pre1940)} predates 1940, so most older homes here are postwar houses from the 1940s and 50s, typically one main run of galvanized pipe with branches to each fixture.`,
  ];
};

const DEFS: Def[] = [
  {
    slug: "whole-house-repiping",
    kind: "service",
    min: 22,
    score: ({ p }) => old(p),
    build: (ctx) => ({
      metaHook: `${pct(old(ctx.p))} of homes predate 1960`,
      answer: `${pct(old(ctx.p))} of homes in the ${ctx.c.name} ZIP codes we cover were built before 1960, when galvanized steel supply pipe was standard. A whole-house repipe replaces it, usually with PEX or copper, in a few working days.`,
      sections: [
        { heading: `Why ${ctx.c.name} homes get repiped`, paras: repipeParas(ctx) },
        {
          heading: "Permits",
          paras: [`A repipe normally needs a permit and inspection from your city or county, and the written quote should say whether wall patching is included.`],
        },
      ],
      facts: [
        { term: "Built before 1940", detail: pct(ctx.p.built.pre1940) },
        { term: "Built 1940–1959", detail: pct(ctx.p.built.y1940_59) },
        { term: "Built 1960–1979", detail: pct(ctx.p.built.y1960_79) },
        { term: "Single-family detached", detail: ctx.p.detached != null ? pct(ctx.p.detached) : "n/a" },
      ],
      faqs: [{ q: `How common is galvanized pipe in ${ctx.c.name}?`, a: `It's likely in many of the ${pct(old(ctx.p))} of local homes built before 1960 that haven't been repiped. Check where the main enters the house: galvanized is dull gray steel with threaded joints, and a magnet sticks to it.` }],
      related: ["sewer-camera-inspection", "pinhole-leak-repair", "main-water-line-repair"],
    }),
  },
  {
    slug: "polybutylene-replacement",
    kind: "service",
    min: 32,
    score: ({ p }) => p.built.y1980_99,
    build: (ctx) => ({
      metaHook: `${pct(ctx.p.built.y1980_99)} of homes date from 1980–1999`,
      answer: `${pct(ctx.p.built.y1980_99)} of homes in the ${ctx.c.name} ZIP codes we cover were built between 1980 and 1999, overlapping the years polybutylene supply pipe was widely installed (about 1978–1995). Replacing it means a repipe, usually with PEX.`,
      sections: [
        {
          heading: `Polybutylene and ${ctx.c.name}'s housing`,
          paras: [
            `The 1980–1999 share here is ${vs(ctx, ctx.p.built.y1980_99, ctx.s?.built.y1980_99)}.${rank(ctx, (p) => p.built.y1980_99)} Not every home from those years has polybutylene, but enough do that buyers, inspectors and insurers in ${ctx.c.name} ask about it.`,
            `Look for gray (sometimes blue or black) flexible pipe stamped PB2110 at the water heater, under sinks or at the main shutoff.${near(ctx).length ? ` Homes of the same era in nearby ${near(ctx).join(", ")} raise the same question.` : ""}`,
          ],
        },
        { heading: "Permits", paras: [`Full replacement is a repipe and normally needs a permit.`] },
      ],
      facts: [
        { term: "Built 1980–1999", detail: pct(ctx.p.built.y1980_99) },
        { term: "Built 2000 or later", detail: pct(ctx.p.built.y2000p) },
        { term: "Owner-occupied", detail: ctx.p.owner != null ? pct(ctx.p.owner) : "n/a" },
      ],
      faqs: [{ q: `Do insurers in ${ctx.f.name} ask about polybutylene?`, a: "Some do, and some limit coverage or charge more for homes that still have it. Ask your insurer directly, and keep any repipe invoice to show the pipe was replaced." }],
      related: ["whole-house-repiping", "pinhole-leak-repair"],
    }),
  },
  {
    slug: "sewer-line-repair",
    kind: "service",
    min: 50,
    score: ({ p }) => pre80(p) * 0.85,
    build: (ctx) => ({
      metaHook: `${pct(pre80(ctx.p))} of homes predate 1980`,
      answer: `${pct(pre80(ctx.p))} of homes in the ${ctx.c.name} ZIP codes we cover were built before 1980, when cast iron, clay and early fiber sewer pipe were the norm. Sewer line repair starts with a camera inspection, then a spot repair, trenchless lining or replacement.`,
      sections: [
        {
          heading: `${ctx.c.name}'s older sewer laterals`,
          paras: [
            `Pre-1980 housing here is ${vs(ctx, pre80(ctx.p), ctx.s ? pre80(ctx.s) : undefined)}.${rank(ctx, pre80)} Clay pipe lets roots in at the joints, cast iron scales and cracks, and the line from the house to the street belongs to the homeowner in most places.`,
            ctx.p.detached != null && ctx.p.detached < 50
              ? `Only ${pct(ctx.p.detached)} of homes are single-family detached, so many sewer problems involve a shared building line. Check with your HOA or landlord before booking work.`
              : `${pct(ctx.p.detached ?? 0)} of homes are detached houses with their own lateral, so a backup that keeps coming back is usually worth a camera inspection rather than another snaking.`,
          ],
        },
        { heading: "Permits", paras: [`Excavation in the yard or street needs a permit, and someone has to call 811 first to get utilities marked.`] },
      ],
      facts: [
        { term: "Built before 1960", detail: pct(old(ctx.p)) },
        { term: "Built 1960–1979", detail: pct(ctx.p.built.y1960_79) },
        { term: "Single-family detached", detail: ctx.p.detached != null ? pct(ctx.p.detached) : "n/a" },
      ],
      faqs: [{ q: `Who owns the sewer line to my ${ctx.c.name} home?`, a: "In most cities the homeowner owns the lateral from the house to the public main, sometimes including the connection at the main. Your city's public works department can confirm where its responsibility starts." }],
      related: ["sewer-camera-inspection", "drain-cleaning", "whole-house-repiping"],
    }),
  },
  {
    slug: "water-heater-replacement",
    kind: "service",
    min: 0,
    score: ({ p }) => 20 + p.built.y2000p * 0.3,
    build: (ctx) => {
      const { p } = ctx;
      const fuel = p.heat.gas >= p.heat.electric ? "gas" : "electric";
      return {
        metaHook: `${pct(p.heat.gas)} gas, ${pct(p.heat.electric)} electric homes`,
        answer: `Census data for the ${ctx.c.name} ZIP codes we cover show ${pct(p.heat.gas)} of homes heating with utility gas and ${pct(p.heat.electric)} with electricity, so ${fuel} tank water heaters are the most common replacement here. Most tanks last about 8 to 12 years.`,
        sections: [
          {
            heading: `Water heaters in ${ctx.c.name} homes`,
            paras: [
              `Utility gas heats ${vs(ctx, p.heat.gas, ctx.s?.heat.gas)} of homes.${rank(ctx, (x) => x.heat.gas)} Water heaters usually use the same fuel as the furnace, which decides venting and gas line work on a replacement.`,
              p.built.y2000p >= 30
                ? `${pct(p.built.y2000p)} of homes were built in 2000 or later, and many are still on their original tank, now past its expected life.`
                : `With ${pct(pre80(p))} of homes built before 1980, many water heaters sit in tight basements or closets that were sized for smaller tanks, so measure before ordering a replacement.`,
              p.heat.oil >= 5 ? `${pct(p.heat.oil)} of homes heat with oil, and many of those make hot water with a coil in the boiler rather than a separate tank.` : "",
            ].filter(Boolean),
          },
          { heading: "Permits", paras: [`Most cities require a permit for a water heater replacement, and the plumber normally pulls it.`] },
        ],
        facts: [
          { term: "Heat with utility gas", detail: pct(p.heat.gas) },
          { term: "Heat with electricity", detail: pct(p.heat.electric) },
          ...(p.heat.lp >= 3 ? [{ term: "Heat with propane", detail: pct(p.heat.lp) }] : []),
          ...(p.heat.oil >= 3 ? [{ term: "Heat with fuel oil", detail: pct(p.heat.oil) }] : []),
          { term: "Built 2000 or later", detail: pct(p.built.y2000p) },
        ],
        faqs: [{ q: `Should I replace my ${ctx.c.name} water heater with the same fuel?`, a: `Usually, because switching fuels means new gas, venting or electrical work. In ${ctx.c.name}, where ${pct(Math.max(p.heat.gas, p.heat.electric))} of homes use ${fuel} heat, a like-for-like ${fuel} tank is the simplest swap.` }],
        related: ["water-heater-flush", "tankless-water-heaters", "hot-water-recirculation"],
      };
    },
  },
  {
    slug: "frozen-pipe-repair",
    kind: "service",
    min: 25,
    score: ({ p, f }) => (f.freeze === "severe" ? pre80(p) * 0.9 : f.freeze === "seasonal" ? pre80(p) * 0.6 : 0),
    build: (ctx) => ({
      metaHook: `${pct(pre80(ctx.p))} of homes built before 1980`,
      answer: `If a pipe freezes in your ${ctx.c.name} home, shut off the main before it thaws and warm the pipe gently, never with an open flame. ${pct(pre80(ctx.p))} of homes in the ZIP codes we cover were built before 1980, when pipes were more often run through exterior walls and uninsulated crawl spaces.`,
      sections: [
        {
          heading: `Where pipes freeze in ${ctx.c.name}`,
          paras: [
            `${ctx.f.name} has ${ctx.f.freeze === "severe" ? "long, hard winters" : "regular winter freezes"}. Pre-1980 housing here is ${vs(ctx, pre80(ctx.p), ctx.s ? pre80(ctx.s) : undefined)}.${rank(ctx, pre80)} Older homes are more likely to have supply lines in exterior walls, crawl spaces and unheated garages.`,
            ctx.p.detached != null && ctx.p.detached >= 60
              ? `${pct(ctx.p.detached)} of homes are detached houses, which have more exterior wall and crawl-space plumbing exposed to cold than apartments do.`
              : `Only ${pct(ctx.p.detached ?? 0)} of homes are detached houses. In apartments and attached homes, a frozen pipe in one unit can flood the units below, so report it to the building right away.`,
          ],
        },
        { heading: "After a burst", paras: [`After a burst, the plumber cuts out the split section, checks nearby pipe and can reroute lines that keep freezing.`] },
      ],
      facts: [
        { term: "Winters", detail: ctx.f.freeze === "severe" ? "Long, hard winters" : "Regular winter freezes" },
        { term: "Built before 1980", detail: pct(pre80(ctx.p)) },
        { term: "Single-family detached", detail: ctx.p.detached != null ? pct(ctx.p.detached) : "n/a" },
      ],
      faqs: [{ q: `What should I do before leaving my ${ctx.c.name} home in winter?`, a: "Keep the heat at 55 °F or higher, open sink cabinets on exterior walls, disconnect hoses, and for a long trip shut off the main and drain the lines." }],
      related: ["sump-pump-installation", "pinhole-leak-repair", "whole-house-repiping"],
    }),
  },
  {
    slug: "sump-pump-installation",
    kind: "service",
    min: 30,
    score: ({ p, f }) => (basementState(f) ? (p.detached ?? 0) * 0.55 : 0),
    build: (ctx) => ({
      metaHook: `${pct(ctx.p.detached ?? 0)} detached homes`,
      answer: `Basement homes in ${ctx.c.name} rely on sump pumps to keep groundwater out during heavy rain and snowmelt. ${pct(ctx.p.detached ?? 0)} of homes in the ZIP codes we cover are detached houses, most with their own basement or crawl space to protect.`,
      sections: [
        {
          heading: `Sump pumps in ${ctx.c.name}`,
          paras: [
            `The detached-home share here is ${vs(ctx, ctx.p.detached ?? 0, ctx.s?.detached ?? undefined)}.${rank(ctx, (x) => x.detached ?? 0)} Storms that fill the pit often knock out power too, which is why battery or water-powered backups are common upgrades in ${ctx.f.name}.`,
            `Pumps last about 7 to 10 years. ${pct(ctx.p.owner ?? 0)} of homes here are owner-occupied, and an owner who has never replaced the pump in an older house is likely due.`,
          ],
        },
        { heading: "Discharge rules", paras: [`Many cities prohibit sending sump water into the sanitary sewer, so the discharge should go to the yard or an approved storm connection.`] },
      ],
      facts: [
        { term: "Single-family detached", detail: ctx.p.detached != null ? pct(ctx.p.detached) : "n/a" },
        { term: "Owner-occupied", detail: ctx.p.owner != null ? pct(ctx.p.owner) : "n/a" },
        { term: "Built before 1980", detail: pct(pre80(ctx.p)) },
      ],
      faqs: [{ q: `Do ${ctx.c.name} homes need a backup sump pump?`, a: "If your basement is finished or the pump runs often in storms, a backup is worth it, because power outages and heavy rain tend to arrive together." }],
      related: ["frozen-pipe-repair", "sewer-line-repair", "drain-cleaning"],
    }),
  },
  {
    slug: "water-softener-installation",
    kind: "service",
    min: 30,
    score: ({ f }) => (f.hardness === "very hard" ? 60 : f.hardness === "hard" ? 35 : 0),
    build: (ctx) => ({
      metaHook: `${ctx.f.hardness} ${ctx.f.name} water`,
      answer: `Water in much of ${ctx.f.name} is ${ctx.f.hardness}, and in ${ctx.c.name} that scale shows up in water heaters, tankless units and fixture valves. A softener sized to your household and measured hardness stops it at the source.`,
      sections: [
        {
          heading: `Hard water and ${ctx.c.name} homes`,
          paras: [
            ctx.p.heat.electric >= 40
              ? `${pct(ctx.p.heat.electric)} of homes here heat with electricity (${vs(ctx, ctx.p.heat.electric, ctx.s?.heat.electric)}), and scale burns out electric water heater elements early.`
              : `${pct(ctx.p.heat.gas)} of homes here heat with gas (${vs(ctx, ctx.p.heat.gas, ctx.s?.heat.gas)}), and scale settles as sediment in gas tanks, which then rumble and wear out early.`,
            `${pct(ctx.p.built.y2000p)} of homes were built in 2000 or later, and many newer homes in hard-water areas have a pre-plumbed softener loop that makes installation simpler. Your water utility's annual report gives the exact hardness.`,
          ],
        },
        ],
      facts: [
        { term: "Water hardness", detail: `Generally ${ctx.f.hardness} in ${ctx.f.name}` },
        { term: "Heat with electricity", detail: pct(ctx.p.heat.electric) },
        { term: "Built 2000 or later", detail: pct(ctx.p.built.y2000p) },
      ],
      faqs: [{ q: `How hard is ${ctx.c.name} water?`, a: `${ctx.f.name} water is generally ${ctx.f.hardness}, but it varies by utility and well. Your provider's annual water quality report lists the number for your system.` }],
      related: ["reverse-osmosis-systems", "water-heater-flush", "tankless-water-heaters"],
    }),
  },
  {
    slug: "gas-line-repair",
    kind: "service",
    min: 38,
    score: ({ p }) => p.heat.gas * 0.65,
    build: (ctx) => ({
      metaHook: `${pct(ctx.p.heat.gas)} of homes use gas`,
      answer: `${pct(ctx.p.heat.gas)} of homes in the ${ctx.c.name} ZIP codes we cover heat with utility gas, so gas lines feed most furnaces, water heaters and ranges. If you smell gas, leave first and call the gas utility from outside; a licensed plumber repairs the line afterward.`,
      sections: [
        {
          heading: `Gas lines in ${ctx.c.name} homes`,
          paras: [
            `The gas-heat share is ${vs(ctx, ctx.p.heat.gas, ctx.s?.heat.gas)}.${rank(ctx, (x) => x.heat.gas)} The utility owns the meter; everything after it belongs to the homeowner, including lines to new ranges, dryers, generators and outdoor kitchens.`,
            `${pct(pre80(ctx.p))} of homes were built before 1980, when black iron pipe and older flexible connectors were standard. Corroded fittings and old connectors are common repairs.`,
          ],
        },
        { heading: "Permits", paras: [`New gas piping normally needs a permit and a pressure test.`] },
      ],
      facts: [
        { term: "Heat with utility gas", detail: pct(ctx.p.heat.gas) },
        { term: "Heat with propane", detail: pct(ctx.p.heat.lp) },
        { term: "Built before 1980", detail: pct(pre80(ctx.p)) },
      ],
      faqs: [{ q: `Who do I call if I smell gas in ${ctx.c.name}?`, a: "Leave the house first, then call 911 or your gas utility's emergency line from outside. Don't use switches or phones inside." }],
      related: ["gas-appliance-hookup", "water-heater-replacement", "tankless-water-heaters"],
    }),
  },
  {
    slug: "slab-leak-detection",
    kind: "service",
    min: 30,
    score: ({ p, f }) => (slabState(f) ? (p.built.y1960_79 + p.built.y1980_99) * 0.7 : 0),
    build: (ctx) => ({
      metaHook: `${pct(ctx.p.built.y1960_79 + ctx.p.built.y1980_99)} of homes from 1960–1999`,
      answer: `Slab foundations are common in ${ctx.f.name}, and ${pct(ctx.p.built.y1960_79 + ctx.p.built.y1980_99)} of homes in the ${ctx.c.name} ZIP codes we cover were built between 1960 and 1999, when copper under the slab was typical. A warm spot on the floor or a rising bill are the usual first signs.`,
      sections: [
        {
          heading: `Slab leaks in ${ctx.c.name}`,
          paras: [
            `Homes from 1960 to 1999 make up ${vs(ctx, ctx.p.built.y1960_79 + ctx.p.built.y1980_99, ctx.s ? ctx.s.built.y1960_79 + ctx.s.built.y1980_99 : undefined)}.${rank(ctx, (x) => x.built.y1960_79 + x.built.y1980_99)} Hot lines under the slab expand and rub against concrete for decades until a pinhole forms.`,
            `Leak detection confirms the leak at the meter, isolates hot from cold, then pinpoints it acoustically so only one small spot is opened, or none if a reroute is the better fix.`,
          ],
        },
        ],
      facts: [
        { term: "Built 1960–1979", detail: pct(ctx.p.built.y1960_79) },
        { term: "Built 1980–1999", detail: pct(ctx.p.built.y1980_99) },
        { term: "Heat with electricity", detail: pct(ctx.p.heat.electric) },
      ],
      faqs: [{ q: `How do I check for a slab leak in my ${ctx.c.name} home?`, a: "Turn off every fixture and watch the meter's leak indicator. If it moves, shut the cold inlet on the water heater; if the meter stops, the leak is on the hot side." }],
      related: ["slab-leak-repair", "whole-house-repiping", "pinhole-leak-repair"],
    }),
  },
];

// Category pages reuse the best member's angle but cover the whole category.
const CATEGORY_OF: Record<string, string> = Object.fromEntries(DEFS.map((d) => [d.slug, getService(d.slug)!.category]));

// One state-specific note per page, rotated by city so same-state pages don't all repeat the same line,
// and same-named cities in different states (Marion, IN vs Marion, OH) still read differently.
function withStateNote<T extends { sections: { heading: string; paras: string[] }[] }>(ctx: Ctx, b: T): T {
  const notes = ctx.f.notes;
  let h = 0;
  for (const ch of ctx.c.slug + ctx.f.abbr) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const [first, ...rest] = b.sections;
  return { ...b, sections: [{ ...first, paras: [...first.paras, `In ${ctx.f.name}: ${notes[h % notes.length]}`] }, ...rest] };
}

function categoryPage(ctx: Ctx, member: Def): Omit<LocalServicePage, "stateSlug" | "citySlug" | "updated"> {
  const cat = getCategory(CATEGORY_OF[member.slug]);
  const b = withStateNote(ctx, member.build(ctx));
  const members = DEFS.filter((d) => CATEGORY_OF[d.slug] === cat.slug).map((d) => getService(d.slug)!);
  const all = [...new Set([...members.map((m) => m.slug), ...b.related])].map(getService).filter(Boolean);
  return {
    slug: cat.slug,
    kind: "category",
    name: cat.name,
    h1: `${cat.name} in ${ctx.label}`,
    seoTitle: `${cat.name} in ${ctx.label}`,
    metaDescription: `${cat.name} help in ${ctx.label}: ${b.metaHook}. Local housing data, common problems and a licensed local plumber.`.slice(0, 158),
    answer: `${cat.blurb} ${b.answer}`,
    sections: [
      ...b.sections,
      { heading: `${cat.name} services in ${ctx.c.name}`, paras: [all.map((s) => s!.name).join(", ") + "."] },
    ],
    facts: b.facts,
    faqs: b.faqs,
    related: all.map((s) => s!.slug),
  };
}

let memo: LocalServicePage[] | null = null;
export function allLocalServicePages(cities: City[]): LocalServicePage[] {
  if (memo) return memo;
  const out: LocalServicePage[] = [];
  const byState = new Map<string, City[]>();
  for (const c of cities) byState.set(c.stateSlug, [...(byState.get(c.stateSlug) ?? []), c]);
  for (const c of cities) {
    if (!c.profile) continue;
    const f = stateBySlug.get(c.stateSlug)!;
    const ctx: Ctx = { c, p: c.profile, f, s: rawState(f.abbr).acs, peers: byState.get(c.stateSlug)!, label: `${c.name}, ${f.abbr}` };
    const scored = DEFS.map((d) => ({ d, v: d.score(ctx) })).filter((x) => x.v >= x.d.min).sort((a, b) => b.v - a.v);
    if (!scored.length) continue;
    const top = scored[0].d;
    out.push({ ...categoryPage(ctx, top), stateSlug: c.stateSlug, citySlug: c.slug, updated: U });
    const sub = scored.find((x) => CATEGORY_OF[x.d.slug] !== CATEGORY_OF[top.slug])?.d;
    if (sub) {
      const svc = getService(sub.slug)!;
      const b = withStateNote(ctx, sub.build(ctx));
      out.push({
        stateSlug: c.stateSlug,
        citySlug: c.slug,
        slug: sub.slug,
        kind: "service",
        name: svc.name,
        h1: `${svc.name} in ${ctx.label}`,
        seoTitle: `${svc.name} in ${ctx.label}`,
        metaDescription: `${svc.name} in ${ctx.label}: ${b.metaHook}. What local housing data says, permits, and a licensed local plumber.`.slice(0, 158),
        answer: b.answer,
        sections: b.sections,
        facts: b.facts,
        faqs: b.faqs,
        related: b.related,
        updated: U,
      });
    }
  }
  memo = out;
  return out;
}

export function localServicesForCity(c: City, peers?: City[]): LocalServicePage[] {
  if (!c.profile) return [];
  const f = stateBySlug.get(c.stateSlug);
  if (!f) return [];
  const st = rawState(f.abbr);
  const statePeers = peers ?? (st.cities.map((rc) => ({ slug: rc.slug, profile: rc.acs ?? undefined })) as unknown as City[]);
  const ctx: Ctx = { c, p: c.profile, f, s: st.acs, peers: statePeers, label: `${c.name}, ${f.abbr}` };
  const scored = DEFS.map((d) => ({ d, v: d.score(ctx) })).filter((x) => x.v >= x.d.min).sort((a, b) => b.v - a.v);
  if (!scored.length) return [];
  const out: LocalServicePage[] = [];
  const top = scored[0].d;
  out.push({ ...categoryPage(ctx, top), stateSlug: c.stateSlug, citySlug: c.slug, updated: U });
  const sub = scored.find((x) => CATEGORY_OF[x.d.slug] !== CATEGORY_OF[top.slug])?.d;
  if (sub) {
    const svc = getService(sub.slug);
    if (svc) {
      const b = withStateNote(ctx, sub.build(ctx));
      out.push({
        stateSlug: c.stateSlug,
        citySlug: c.slug,
        slug: sub.slug,
        kind: "service",
        name: svc.name,
        h1: `${svc.name} in ${ctx.label}`,
        seoTitle: `${svc.name} in ${ctx.label}`,
        metaDescription: `${svc.name} in ${ctx.label}: ${b.metaHook}. What local housing data says, permits, and a licensed local plumber.`.slice(0, 158),
        answer: b.answer,
        sections: b.sections,
        facts: b.facts,
        faqs: b.faqs,
        related: b.related,
        updated: U,
      });
    }
  }
  return out;
}

export const localServiceHref = (x: { stateSlug: string; citySlug: string; slug: string }) => routes.cityService(x.stateSlug, x.citySlug, x.slug);
