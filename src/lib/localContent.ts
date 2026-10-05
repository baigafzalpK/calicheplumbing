import "server-only";
import type { City, CityService, Faq, PlaceProfile } from "@/content/types";
import type { StateFact } from "@/content/stateFacts";
import { routes } from "./routes";
import type { RawPlace } from "./geo";

// Composes city pages from facts only: covered ZIPs and county (coverage export), housing age, heating fuel,
// structure type and tenure (Census ACS for those ZIPs), and the state record. Sections are chosen by the
// numbers, so two cities only share a section when their data actually says the same thing.

const U = "2026-10-05";
const fmt = (n: number) => n.toLocaleString("en-US");
const round = (n: number, to: number) => Math.round(n / to) * to;
const approx = (n: number) => (n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)} million` : n >= 10_000 ? fmt(round(n, 1000)) : fmt(round(n, 100)));
const pct = (n: number) => `${Math.round(n)}%`;
const svc = (slug: string, text: string) => `[${text}](${routes.service(slug)})`;

export type Era = { key: keyof PlaceProfile["built"]; label: string; share: number };
export function eras(p: PlaceProfile): Era[] {
  return [
    { key: "pre1940", label: "Before 1940", share: p.built.pre1940 },
    { key: "y1940_59", label: "1940–1959", share: p.built.y1940_59 },
    { key: "y1960_79", label: "1960–1979", share: p.built.y1960_79 },
    { key: "y1980_99", label: "1980–1999", share: p.built.y1980_99 },
    { key: "y2000p", label: "2000 or later", share: p.built.y2000p },
  ];
}
export const pre1960 = (p: PlaceProfile) => p.built.pre1940 + p.built.y1940_59;

export type Issue = { title: string; body: string; service: string; weight: number };

export function issuesFor(name: string, p: PlaceProfile, f: StateFact): Issue[] {
  const out: Issue[] = [];
  const old = pre1960(p);
  if (old >= 25)
    out.push({
      weight: old,
      service: "whole-house-repiping",
      title: "Pre-1960 homes: galvanized pipe and cast iron",
      body: `${pct(old)} of homes in ${name}'s covered ZIP codes were built before 1960${p.built.pre1940 >= 12 ? `, ${pct(p.built.pre1940)} of them before 1940` : ""}. Houses that old often still have galvanized steel supply lines that rust closed from the inside, and cast iron or clay sewer pipe that cracks and lets roots in. Weak pressure at upstairs fixtures, brown water after a shutoff and slow drains are the usual clues. Typical fixes are ${svc("whole-house-repiping", "whole-house repiping")} and a ${svc("sewer-camera-inspection", "sewer camera inspection")}.`,
    });
  if (p.built.y1960_79 >= 28)
    out.push({
      weight: p.built.y1960_79,
      service: "sewer-camera-inspection",
      title: "1960s and 70s homes reaching end of life",
      body: `${pct(p.built.y1960_79)} of the housing here dates from 1960 to 1979. Original copper supply lines in those homes are now 45 to 65 years old, and cast iron drains of that age scale up inside and crack. Seized shutoff valves, pinhole leaks and recurring main-line clogs are common calls. A ${svc("sewer-camera-inspection", "camera inspection")} shows the condition of the sewer line before anyone digs.`,
    });
  if (p.built.y1980_99 >= 28)
    out.push({
      weight: p.built.y1980_99,
      service: "polybutylene-replacement",
      title: "1980s and 90s construction and polybutylene",
      body: `${pct(p.built.y1980_99)} of homes were built between 1980 and 1999. Polybutylene supply pipe was installed widely in US homes from about 1978 to 1995, so houses from these years are worth checking for gray plastic pipe stamped PB2110, usually visible at the water heater or under sinks. Insurers and buyers often ask about it. See ${svc("polybutylene-replacement", "polybutylene replacement")}.`,
    });
  if (p.built.y2000p >= 35)
    out.push({
      weight: p.built.y2000p - 5,
      service: "water-heater-replacement",
      title: "Newer homes on their first water heater",
      body: `${pct(p.built.y2000p)} of homes here were built in 2000 or later. Those houses usually have PEX or CPVC supply lines in good shape, so the work is on equipment: original tank water heaters past their 8 to 12 year service life, expansion tanks, pressure regulators and fixtures. See ${svc("water-heater-replacement", "water heater replacement")}.`,
    });
  const { gas, electric, oil, lp } = p.heat;
  if (oil >= 8)
    out.push({
      weight: 20 + oil,
      service: "water-heater-replacement",
      title: "Oil-heated homes",
      body: `${pct(oil)} of occupied homes here heat with fuel oil, far above the national norm. Many of them make hot water with a tankless coil inside the boiler, which runs the boiler all summer. Plumbers often replace the coil with an indirect tank or a standalone water heater when the boiler is serviced or replaced.`,
    });
  if (gas >= 50)
    out.push({
      weight: gas / 2,
      service: "gas-line-repair",
      title: "Natural gas in most homes",
      body: `${pct(gas)} of occupied homes here heat with utility gas, so gas water heaters, ranges and dryers are common. That means gas line extensions for new appliances, flexible connector replacements and venting checks when a water heater is swapped. If you smell gas, leave first and call the gas utility from outside. See ${svc("gas-line-repair", "gas line repair")}.`,
    });
  else if (electric >= 60)
    out.push({
      weight: electric / 2.5,
      service: "water-heater-replacement",
      title: "Mostly electric homes",
      body: `${pct(electric)} of occupied homes here heat with electricity, and electric tank water heaters are the norm. Failed elements and thermostats are repairable, but tanks that leak need replacement. Heat pump water heaters are an efficient replacement where there's space and airflow.`,
    });
  if (lp >= 12)
    out.push({
      weight: lp,
      service: "gas-appliance-hookup",
      title: "Propane service",
      body: `${pct(lp)} of homes here use bottled or tank propane for heat, typical of areas beyond the gas mains. Propane water heaters, ranges and generators need correctly sized lines and fittings rated for LP. See ${svc("gas-appliance-hookup", "gas appliance hookups")}.`,
    });
  if (f.freeze === "severe" || f.freeze === "seasonal")
    out.push({
      weight: f.freeze === "severe" ? 30 : 18,
      service: "frozen-pipe-repair",
      title: f.freeze === "severe" ? "Long, hard winters" : "Winter freezes",
      body: `${pct(pre1960(p) + p.built.y1960_79)} of homes here were built before 1980, when pipes were more often run through exterior walls and uninsulated crawl spaces. In a ${f.freeze === "severe" ? "long" : "cold"} ${f.name} winter those are the lines that freeze and split. See ${svc("frozen-pipe-repair", "frozen and burst pipe repair")}.`,
    });
  if (f.hardness === "hard" || f.hardness === "very hard")
    out.push({
      weight: f.hardness === "very hard" ? 26 : 14,
      service: "water-softener-installation",
      title: f.hardness === "very hard" ? "Very hard water" : "Hard water",
      body: `${f.name} water is generally ${f.hardness}. ${p.heat.electric >= 40 ? `With ${pct(p.heat.electric)} of homes here on electric heat, scale on electric water heater elements is a frequent failure` : `With ${pct(p.heat.gas)} of homes here on gas, scale settles as sediment in gas water heater tanks, which then rumble and wear out early`}${p.built.y2000p >= 35 ? ", and newer homes with tankless heaters need yearly descaling" : ""}. See ${svc("water-softener-installation", "water softener installation")}.`,
    });
  if (p.detached != null && p.detached < 45)
    out.push({
      weight: 45 - p.detached + 10,
      service: "drain-cleaning",
      title: "Apartments, condos and attached homes",
      body: `Only ${pct(p.detached)} of homes here are single-family detached houses. In attached buildings a leak or clog often involves a shared stack or a neighbor's unit, so it's worth knowing which lines are yours and which belong to the building or HOA, and where your unit's own shutoff is.`,
    });
  return out.sort((a, b) => b.weight - a.weight);
}

function dominant(p: PlaceProfile) {
  return eras(p).sort((a, b) => b.share - a.share)[0];
}

function faqsFor(name: string, label: string, p: PlaceProfile, f: StateFact): Faq[] {
  const e = eras(p);
  const faqs: Faq[] = [
    {
      q: `How old are the homes in ${name}?`,
      a: `In the ZIP codes we cover around ${name}, Census estimates put ${pct(pre1960(p))} of homes as built before 1960, ${pct(p.built.y1960_79)} from 1960 to 1979, ${pct(p.built.y1980_99)} from 1980 to 1999 and ${pct(p.built.y2000p)} in 2000 or later. The largest group is ${dominant(p).label.toLowerCase()} (${pct(Math.max(...e.map((x) => x.share)))}).`,
    },
    {
      q: `Who licenses plumbers in ${label}?`,
      a: f.licensing,
    },
  ];
  const fuel = p.heat.gas >= p.heat.electric ? "utility gas" : "electricity";
  faqs.push({
    q: `Are water heaters in ${name} usually gas or electric?`,
    a: `Census data for the area show ${pct(p.heat.gas)} of homes heating with utility gas, ${pct(p.heat.electric)} with electricity${p.heat.oil >= 3 ? `, ${pct(p.heat.oil)} with fuel oil` : ""}${p.heat.lp >= 3 ? ` and ${pct(p.heat.lp)} with propane` : ""}. Water heaters often use the same fuel as the home's heat, so ${fuel} is the most common here, but check the label on your tank before you shop for a replacement.`,
  });
  if (p.owner != null && p.owner < 50)
    faqs.push({
      q: `I rent in ${name}. Who pays for plumbing repairs?`,
      a: `About ${pct(100 - p.owner)} of homes here are renter-occupied. In most cases the landlord is responsible for the building's plumbing, and tenants should report leaks right away and in writing. Damage a tenant causes, like a clog from something flushed, may be billed back. Your lease and ${f.name} landlord-tenant law set the details.`,
    });
  return faqs;
}

export function composeCity(
  raw: RawPlace,
  f: StateFact,
  ctx: { nearby: string[]; nearbyNames: { name: string; mi: number }[]; alsoCovered: { name: string; mi: number }[]; rankInState: number },
): City {
  const p = raw.acs!;
  const label = `${raw.name}, ${f.abbr}`;
  const county = raw.countyLabel ? (/(County|Parish|Borough|Area|city)$/i.test(raw.countyLabel) ? raw.countyLabel : `${raw.countyLabel} County`) : null;
  const issues = issuesFor(raw.name, p, f);
  const d = dominant(p);
  const zipWord = raw.zips.length === 1 ? "ZIP code" : `${raw.zips.length} ZIP codes`;
  const near = ctx.nearbyNames.slice(0, 3).map((n) => n.name);

  const intro = [
    `${raw.name}${county ? ` is in ${county}, ${f.name}` : `, ${f.name}`}. About ${approx(p.pop)} people live in the ${zipWord} we cover here, in roughly ${approx(p.units)} homes${p.detached != null ? `, ${pct(p.detached)} of them single-family detached houses` : ""}.`,
    `The biggest share of the housing was built ${d.key === "y2000p" ? "in 2000 or later" : d.key === "pre1940" ? "before 1940" : `between ${d.label.replace("–", " and ")}`} (${pct(d.share)}), and that age decides most of what goes wrong with the plumbing.`,
  ].join(" ");

  const housingNotes = [
    `Here is how ${raw.name}'s homes break down by year built, based on Census estimates for the covered ZIP codes: ${eras(p).map((e) => `${e.label.toLowerCase()} ${pct(e.share)}`).join(", ")}.`,
    pre1960(p) >= 25
      ? "With that many older homes, original galvanized supply pipe and cast iron or clay drains are still common, so leaks, rust and root intrusion come up often."
      : p.built.y2000p >= 35
        ? "With so much newer construction, the plumbing itself is usually sound, and most calls are about water heaters, fixtures, pressure and clogs."
        : "Most homes are old enough that original pipe, valves and water heaters are wearing out, but young enough that full repipes are a case-by-case call.",
    near.length ? `Neighboring areas such as ${near.join(", ")} are covered too.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const popular = [...new Set([...issues.map((i) => i.service), "water-heater-replacement", "drain-cleaning", "main-water-line-repair", "sewer-line-repair"])].slice(0, 8);

  return {
    slug: raw.slug,
    name: raw.name,
    stateSlug: f.slug,
    county: raw.county ?? "",
    region: raw.county ?? "",
    status: "PUBLISHED",
    officeAddress: null,
    zips: raw.zips,
    areas: [],
    intro,
    housingNotes,
    localIssues: issues.slice(0, 4).map(({ title, body }) => ({ title, body })),
    popularServices: popular,
    nearby: ctx.nearby,
    water: null,
    permits: f.licensing,
    faqs: faqsFor(raw.name, label, p, f),
    updated: U,
    profile: p,
    alsoCovered: ctx.alsoCovered,
    curated: false,
  };
}

// ---------- city + service ----------
// Only where the city's own data makes the service unusually relevant. One page per strong signal, max two per city.
// OFF since 2026-10-05: the audit measured these at 0.89 median similarity to their siblings (11% unique wording),
// because the national service text dominates and the local angle is composed. That is doorway territory and would
// cannibalize the city pages. Turn back on per city only once a page has hand-researched local content.
const GENERATE_CITY_SERVICES = false;
const CS_MIN_POP = 150_000;

export function composeCityServices(c: City, f: StateFact): (CityService & { stateSlug: string })[] {
  const p = c.profile;
  if (!GENERATE_CITY_SERVICES || !p || p.pop < CS_MIN_POP) return [];
  const label = `${c.name}, ${f.abbr}`;
  const out: (CityService & { stateSlug: string; score: number })[] = [];
  const old = pre1960(p);

  if (old >= 35)
    out.push({
      score: old,
      stateSlug: f.slug,
      citySlug: c.slug,
      serviceSlug: "whole-house-repiping",
      status: "PUBLISHED",
      h1: `Repiping older homes in ${c.name}`,
      seoTitle: `Whole-House Repiping in ${label}`,
      metaDescription: `${pct(old)} of homes in ${c.name}'s covered ZIP codes predate 1960. When galvanized pipe needs replacing, what a repipe involves, and permits in ${f.name}.`,
      answer: `${pct(old)} of the homes in the ${c.name} ZIP codes we cover were built before 1960, an age when galvanized steel supply pipe was standard. Galvanized pipe corrodes from the inside, so pressure drops and water turns rusty over time. A whole-house repipe replaces it, usually with PEX or copper.`,
      localAngle: [
        `Census estimates put ${pct(p.built.pre1940)} of ${c.name}'s covered housing before 1940 and ${pct(p.built.y1940_59)} from 1940 to 1959. Homes from those decades were plumbed with galvanized steel, and many have had only partial repairs since, so you'll often find copper or PEX spliced into old galvanized runs. Those mixed-metal joints are where leaks and the worst corrosion tend to start.`,
        `${f.licensing} A repipe of this size normally needs a permit and inspection from your city or county, and the plumber should include patching of wall openings, or tell you clearly that it's excluded, in the written quote.`,
        f.freeze === "severe" || f.freeze === "seasonal"
          ? `New lines in a ${f.name} home should stay inside the heated part of the house wherever possible. Runs through exterior walls, crawl spaces or unheated garages are where frozen pipes start.`
          : `Ask whether the new lines will run through the attic or the walls, and how they'll be protected from heat and physical damage.`,
      ],
      localFaqs: [
        { q: `How do I know if my ${c.name} home has galvanized pipe?`, a: "Look at the pipe where it enters the house or at the water heater. Galvanized is dull gray steel with threaded fittings, and a magnet sticks to it. Copper is orange-brown and PEX is flexible plastic." },
      ],
      updated: U,
    });

  if (p.built.y1980_99 >= 40)
    out.push({
      score: p.built.y1980_99,
      stateSlug: f.slug,
      citySlug: c.slug,
      serviceSlug: "polybutylene-replacement",
      status: "PUBLISHED",
      h1: `Polybutylene pipe replacement in ${c.name}`,
      seoTitle: `Polybutylene Pipe Replacement in ${label}`,
      metaDescription: `${pct(p.built.y1980_99)} of ${c.name}'s covered homes were built from 1980 to 1999, the polybutylene era. How to spot PB pipe and what replacing it involves.`,
      answer: `${pct(p.built.y1980_99)} of homes in the ${c.name} ZIP codes we cover were built between 1980 and 1999. Polybutylene supply pipe was widely installed from about 1978 to 1995, so many of these homes are worth checking. Replacement means a repipe with PEX or copper.`,
      localAngle: [
        `Polybutylene is gray (sometimes blue or black) flexible plastic, usually stamped PB2110, and it's easiest to spot at the water heater, under sinks and at the main shutoff. Some homes had only the fittings or the yard service line changed, so a plumber should check the whole system, not just one spot.`,
        `With ${pct(p.built.y1980_99)} of the local housing from those two decades, buyers, inspectors and insurers in ${c.name} ask about polybutylene often. ${f.licensing}`,
      ],
      localFaqs: [
        { q: "Does all polybutylene have to be replaced at once?", a: "Not by law, but partial replacement leaves the rest of the old pipe in service. Most owners replace the whole system in one project so there's one permit, one inspection and one round of wall patching." },
      ],
      updated: U,
    });

  if (f.freeze === "severe" && p.pop >= 200_000)
    out.push({
      score: 30,
      stateSlug: f.slug,
      citySlug: c.slug,
      serviceSlug: "frozen-pipe-repair",
      status: "PUBLISHED",
      h1: `Frozen and burst pipe repair in ${c.name}`,
      seoTitle: `Frozen & Burst Pipe Repair in ${label}`,
      metaDescription: `What to do when pipes freeze or burst in ${c.name}: shutoff steps, thawing safely, where ${f.name} homes freeze, and getting a plumber.`,
      answer: `If a pipe in your ${c.name} home has frozen, shut off the main water valve before it thaws, open the faucet it feeds, and warm the pipe gently with a hair dryer, never an open flame. If it has already split, keep the water off and call a plumber.`,
      localAngle: [
        `${f.name} has long, hard winters, and the pipes that freeze are the ones in exterior walls, crawl spaces, unheated garages and attics, plus hose bibs that aren't frost-free. ${pct(pre1960(p) + p.built.y1960_79)} of homes in ${c.name}'s covered ZIP codes were built before 1980, when insulation and pipe placement were often less protective than today's codes require.`,
        `After a burst, the plumber cuts out the split section, checks nearby pipe for more damage, and can reroute or insulate lines that keep freezing. ${f.licensing}`,
      ],
      localFaqs: [
        { q: "Should I leave faucets dripping overnight?", a: "On the coldest nights, yes, for faucets on exterior walls. Moving water is harder to freeze and the open tap relieves pressure if ice does form." },
      ],
      updated: U,
    });

  return out
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(({ score: _s, ...cs }) => cs);
}
