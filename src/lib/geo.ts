import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { City, CityService, PlaceProfile, State } from "@/content/types";
import { cities as curatedCities, cityServices as curatedCityServices, states as curatedStates } from "@/content/locations";
import { stateFacts, stateByAbbr, stateBySlug, type StateFact } from "@/content/stateFacts";
import { composeCity, composeCityServices } from "./localContent";

// Nationwide geography. Coverage (cities, ZIPs, counties) comes from the LeadSmart plumbing coverage export;
// housing facts come from Census ACS 2023 5-year data for the covered ZIP codes. See scripts/build-geo.mjs.

export type RawPlace = {
  slug: string;
  name: string;
  county: string | null;
  countyLabel: string | null;
  zips: string[];
  lat: number | null;
  lng: number | null;
  acs: PlaceProfile | null;
  nearby: { slug: string; mi: number }[];
};
type RawState = { abbr: string; acs: PlaceProfile | null; cities: RawPlace[] };

const DIR = path.join(process.cwd(), "src/data/geo");
const cache = new Map<string, RawState>();
export function rawState(abbr: string): RawState {
  let d = cache.get(abbr);
  if (!d) {
    d = JSON.parse(fs.readFileSync(path.join(DIR, `${abbr}.json`), "utf8")) as RawState;
    cache.set(abbr, d);
  }
  return d;
}

export const geoMeta = JSON.parse(fs.readFileSync(path.join(DIR, "meta.json"), "utf8")) as {
  coverageDate: string | null;
  states: { abbr: string; cities: number; zips: number }[];
};

// ---------- page eligibility ----------
// A covered place gets its own page when enough people live in its covered ZIPs for distinct search demand,
// and when the Census profile is complete enough to say something specific. Every state's largest two places
// always qualify so no state hub is a dead end. Everything else is listed (unlinked) on its state hub.
export const CITY_PAGE_MIN_POP = 100_000;
const MIN_UNITS = 3_000;

function eligible(st: RawState): Set<string> {
  const ok = new Set<string>();
  const withData = st.cities.filter((c) => c.acs && c.acs.units >= MIN_UNITS);
  withData.slice(0, 2).forEach((c) => ok.add(c.slug));
  for (const c of withData) if (c.acs!.pop >= CITY_PAGE_MIN_POP) ok.add(c.slug);
  return ok;
}

// ---------- states ----------
export type StateView = StateFact & { curated?: State; acs: PlaceProfile | null; coveredPlaces: number; coveredZips: number };

let statesMemo: StateView[] | null = null;
export function allStates(): StateView[] {
  if (statesMemo) return statesMemo;
  statesMemo = stateFacts.map((f) => {
    const raw = rawState(f.abbr);
    return {
      ...f,
      curated: curatedStates.find((s) => s.slug === f.slug && s.status === "PUBLISHED"),
      acs: raw.acs,
      coveredPlaces: raw.cities.length,
      coveredZips: raw.cities.reduce((n, c) => n + c.zips.length, 0),
    };
  });
  return statesMemo;
}
export function getStateView(slug: string) {
  return allStates().find((s) => s.slug === slug);
}
export function stateAbbrOf(stateSlug: string) {
  return stateBySlug.get(stateSlug)?.abbr ?? "";
}

// ---------- cities ----------
let citiesMemo: City[] | null = null;
/** Every city page candidate (curated AZ pages + data-composed pages). The quality gate decides indexing. */
export function allCityPages(): City[] {
  if (citiesMemo) return citiesMemo;
  const out: City[] = [];
  for (const f of stateFacts) {
    const st = rawState(f.abbr);
    const ok = eligible(st);
    const bySlug = new Map(st.cities.map((c) => [c.slug, c]));
    const curatedHere = curatedCities.filter((c) => c.stateSlug === f.slug);
    for (const c of curatedHere) {
      const raw = bySlug.get(c.slug);
      out.push({ ...c, curated: true, profile: raw?.acs ?? undefined, alsoCovered: raw ? unpaged(raw, ok, curatedHere, bySlug) : [] });
    }
    for (const raw of st.cities) {
      if (!ok.has(raw.slug) || curatedHere.some((c) => c.slug === raw.slug)) continue;
      const pagedNearby = raw.nearby.filter((n) => ok.has(n.slug) || curatedHere.some((c) => c.slug === n.slug)).slice(0, 6);
      out.push(
        composeCity(raw, f, {
          nearby: pagedNearby.map((n) => n.slug),
          nearbyNames: pagedNearby.map((n) => ({ name: bySlug.get(n.slug)?.name ?? n.slug, mi: n.mi })),
          alsoCovered: unpaged(raw, ok, curatedHere, bySlug),
          rankInState: st.cities.indexOf(raw) + 1,
        }),
      );
    }
  }
  citiesMemo = out;
  return out;
}

function unpaged(raw: RawPlace, ok: Set<string>, curated: City[], bySlug: Map<string, RawPlace>) {
  return raw.nearby
    .filter((n) => !ok.has(n.slug) && !curated.some((c) => c.slug === n.slug) && n.mi <= 25)
    .slice(0, 8)
    .map((n) => ({ name: bySlug.get(n.slug)!.name, mi: n.mi }));
}

export function getCityPage(stateSlug: string, citySlug: string) {
  return allCityPages().find((c) => c.stateSlug === stateSlug && c.slug === citySlug);
}
export function cityLabel(c: City) {
  return `${c.name}, ${stateAbbrOf(c.stateSlug)}`;
}

/** Covered places in a state that don't have their own page, grouped by county. */
export function statePlacesWithoutPages(stateSlug: string) {
  const f = stateBySlug.get(stateSlug)!;
  const paged = new Set(allCityPages().filter((c) => c.stateSlug === stateSlug).map((c) => c.slug));
  return rawState(f.abbr).cities.filter((c) => !paged.has(c.slug));
}

// ---------- city + service ----------
let csMemo: (CityService & { stateSlug: string })[] | null = null;
export function allCityServices(): (CityService & { stateSlug: string })[] {
  if (csMemo) return csMemo;
  const curated = curatedCityServices.map((cs) => ({ ...cs, stateSlug: cs.stateSlug ?? "arizona" }));
  const generated = allCityPages()
    .filter((c) => !c.curated)
    .flatMap((c) => composeCityServices(c, stateBySlug.get(c.stateSlug)!))
    .filter((g) => !curated.some((cs) => cs.stateSlug === g.stateSlug && cs.citySlug === g.citySlug && cs.serviceSlug === g.serviceSlug));
  csMemo = [...curated, ...generated];
  return csMemo;
}

export { stateByAbbr };
