import "server-only";
import type { Faq, PlaceProfile } from "@/content/types";
import { stateFacts, type StateFact } from "@/content/stateFacts";
import { rawState, allCityPages, type RawPlace } from "./geo";
import { issuesFor, eras, pre1960, type Issue } from "./localContent";

// County hubs. Built from the covered places in each county: Census figures are combined across those places,
// weighted by housing units (shares) or summed (counts). A county gets a page only when it has enough covered
// places and people to be a real hub; smaller counties stay as groups on the state page.
const MIN_PLACES = 3;
const MIN_POP = 50_000;

export type County = {
  slug: string;
  name: string; // "Cuyahoga County"
  stateSlug: string;
  state: StateFact;
  places: RawPlace[];
  zips: number;
  profile: PlaceProfile;
  issues: Issue[];
  faqs: Faq[];
  intro: string;
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const fullName = (label: string) => (/(County|Parish|Borough|Area|city|Municipality)$/i.test(label) ? label : `${label} County`);
const pct = (n: number) => `${Math.round(n)}%`;

function combine(places: RawPlace[]): PlaceProfile | null {
  const withData = places.filter((p) => p.acs);
  const units = withData.reduce((n, p) => n + p.acs!.units, 0);
  if (!units) return null;
  const w = (get: (p: PlaceProfile) => number | null) => {
    let sum = 0;
    let wt = 0;
    for (const p of withData) {
      const v = get(p.acs!);
      if (v == null) continue;
      sum += v * p.acs!.units;
      wt += p.acs!.units;
    }
    return wt ? Math.round((sum / wt) * 10) / 10 : null;
  };
  return {
    pop: withData.reduce((n, p) => n + p.acs!.pop, 0),
    units,
    built: {
      pre1940: w((p) => p.built.pre1940)!,
      y1940_59: w((p) => p.built.y1940_59)!,
      y1960_79: w((p) => p.built.y1960_79)!,
      y1980_99: w((p) => p.built.y1980_99)!,
      y2000p: w((p) => p.built.y2000p)!,
    },
    heat: { gas: w((p) => p.heat.gas)!, lp: w((p) => p.heat.lp)!, electric: w((p) => p.heat.electric)!, oil: w((p) => p.heat.oil)! },
    detached: w((p) => p.detached),
    owner: w((p) => p.owner),
  };
}

let memo: County[] | null = null;
export function allCounties(): County[] {
  if (memo) return memo;
  const out: County[] = [];
  for (const f of stateFacts) {
    const groups = new Map<string, RawPlace[]>();
    for (const c of rawState(f.abbr).cities) {
      if (!c.countyLabel) continue;
      groups.set(c.countyLabel, [...(groups.get(c.countyLabel) ?? []), c]);
    }
    for (const [label, places] of groups) {
      const profile = combine(places);
      if (!profile || places.length < MIN_PLACES || profile.pop < MIN_POP) continue;
      const name = fullName(label);
      const label2 = `${name}, ${f.abbr}`;
      const largest = [...places].sort((a, b) => (b.acs?.pop ?? 0) - (a.acs?.pop ?? 0)).slice(0, 3).map((p) => p.name);
      const zips = places.reduce((n, p) => n + p.zips.length, 0);
      const old = pre1960(profile);
      out.push({
        slug: slugify(name),
        name,
        stateSlug: f.slug,
        state: f,
        places,
        zips,
        profile,
        issues: issuesFor(name, profile, f).slice(0, 4),
        intro: `We cover ${places.length} cities and towns in ${name}, ${f.name}, across ${zips} ZIP codes, including ${largest.join(", ")}. About ${Math.round(profile.pop / 1000).toLocaleString("en-US")},000 people live in those ZIP codes. ${old >= 25 ? `${pct(old)} of the homes were built before 1960, so galvanized pipe and old cast iron drains are common.` : profile.built.y2000p >= 35 ? `${pct(profile.built.y2000p)} of the homes were built in 2000 or later, so most calls are about water heaters, fixtures and clogs rather than old pipe.` : `Most homes date from ${profile.built.y1960_79 >= profile.built.y1980_99 ? "1960 to 1979" : "1980 to 1999"}, old enough that original water heaters, valves and drains are wearing out.`}`,
        faqs: [
          {
            q: `Which towns in ${name} do you cover?`,
            a: `${places.length} places: ${[...places].map((p) => p.name).sort().join(", ")}. Enter your ZIP code to confirm coverage for your street.`,
          },
          {
            q: `How old are homes in ${name}?`,
            a: `Across the covered ZIP codes, Census estimates put ${pct(old)} of homes as built before 1960, ${pct(profile.built.y1960_79)} from 1960 to 1979, ${pct(profile.built.y1980_99)} from 1980 to 1999 and ${pct(profile.built.y2000p)} in 2000 or later.`,
          },
          { q: `Who licenses plumbers in ${label2}?`, a: f.licensing },
        ],
      });
    }
  }
  memo = out;
  return out;
}

export function getCounty(stateSlug: string, slug: string) {
  return allCounties().find((c) => c.stateSlug === stateSlug && c.slug === slug);
}
export function countyForLabel(stateSlug: string, label: string | null | undefined) {
  if (!label) return undefined;
  return getCounty(stateSlug, slugify(fullName(label)));
}
/** City pages (indexable or not) that sit in this county. */
export function cityPagesIn(c: County) {
  const slugs = new Set(c.places.map((p) => p.slug));
  return allCityPages().filter((x) => x.stateSlug === c.stateSlug && slugs.has(x.slug));
}
export { eras };
