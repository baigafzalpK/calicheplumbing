// Builds src/data/geo/*.json from two public sources:
//   1. LeadSmart plumbing coverage shards (leadsmart-coverage.netlify.app/api/state/XX.json)
//   2. Census ACS 2023 5-year table-based summary files (www2.census.gov), aggregated over each city's covered ZCTAs
// Usage: LS_DIR=path/to/shards ACS_DIR=path/to/acs node scripts/build-geo.mjs
// Only facts from those files are written. Nothing is estimated or invented here.
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

const LS = process.env.LS_DIR;
const ACS = process.env.ACS_DIR;
if (!LS || !ACS) throw new Error("Set LS_DIR and ACS_DIR");
const OUT = path.join(process.cwd(), "src/data/geo");
fs.mkdirSync(OUT, { recursive: true });

const slugify = (s) =>
  s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const titleCase = (s) => s.replace(/\b(Mc)([a-z])/g, (_, a, b) => a + b.toUpperCase());

// ---------- ACS ----------
const TABLES = ["b01003", "b25034", "b25040", "b25024", "b25003"];
const acs = new Map(); // GEO_ID -> { table: number[] }
async function loadTable(t) {
  const rl = readline.createInterface({ input: fs.createReadStream(path.join(ACS, `${t}.dat`)) });
  let header;
  for await (const line of rl) {
    if (!header) { header = line.split("|"); continue; }
    const id = line.slice(0, line.indexOf("|"));
    if (!id.startsWith("860Z200US") && !id.startsWith("0400000US")) continue;
    const cols = line.split("|");
    const est = [];
    for (let i = 1; i < cols.length; i++) if (header[i].includes("_E")) est.push(Number(cols[i]) || 0);
    const r = acs.get(id) ?? {};
    r[t] = est;
    acs.set(id, r);
  }
}
for (const t of TABLES) await loadTable(t);

function housing(rows) {
  // B25034: total, 2020+, 2010-19, 2000-09, 1990-99, 1980-89, 1970-79, 1960-69, 1950-59, 1940-49, <=1939
  const s = (t, i) => rows.reduce((n, r) => n + (r[t]?.[i] ?? 0), 0);
  const units = s("b25034", 0);
  const occ = s("b25040", 0);
  const tenure = s("b25003", 0);
  const struct = s("b25024", 0);
  if (!units || !occ) return null;
  const pct = (n, d) => Math.round((1000 * n) / d) / 10;
  return {
    pop: s("b01003", 0),
    units,
    built: {
      pre1940: pct(s("b25034", 10), units),
      y1940_59: pct(s("b25034", 9) + s("b25034", 8), units),
      y1960_79: pct(s("b25034", 7) + s("b25034", 6), units),
      y1980_99: pct(s("b25034", 5) + s("b25034", 4), units),
      y2000p: pct(s("b25034", 3) + s("b25034", 2) + s("b25034", 1), units),
    },
    heat: {
      gas: pct(s("b25040", 1), occ),
      lp: pct(s("b25040", 2), occ),
      electric: pct(s("b25040", 3), occ),
      oil: pct(s("b25040", 4), occ),
    },
    detached: struct ? pct(s("b25024", 1), struct) : null,
    owner: tenure ? pct(s("b25003", 1), tenure) : null,
  };
}

// ---------- LeadSmart ----------
const STATE_FIPS = { AL: "01", AK: "02", AZ: "04", AR: "05", CA: "06", CO: "08", CT: "09", DE: "10", DC: "11", FL: "12", GA: "13", HI: "15", ID: "16", IL: "17", IN: "18", IA: "19", KS: "20", KY: "21", LA: "22", ME: "23", MD: "24", MA: "25", MI: "26", MN: "27", MS: "28", MO: "29", MT: "30", NE: "31", NV: "32", NH: "33", NJ: "34", NM: "35", NY: "36", NC: "37", ND: "38", OH: "39", OK: "40", OR: "41", PA: "42", RI: "44", SC: "45", SD: "46", TN: "47", TX: "48", UT: "49", VT: "50", VA: "51", WA: "53", WV: "54", WI: "55", WY: "56" };

const summary = [];
for (const [abbr, fips] of Object.entries(STATE_FIPS)) {
  const d = JSON.parse(fs.readFileSync(path.join(LS, `${abbr}.json`), "utf8"));
  const byCity = new Map();
  for (const r of d.rows) {
    if ((r[2] < 0 ? "" : d.niche[r[2]]) !== "Plumbing" || r[0] < 0) continue;
    const name = titleCase(d.city[r[0]]);
    const slug = slugify(name);
    const c = byCity.get(slug) ?? { slug, name, counties: {}, zips: new Set(), lat: 0, lng: 0, n: 0 };
    c.zips.add(String(r[1]).padStart(5, "0"));
    const county = r[9] < 0 ? null : d.county[r[9]];
    if (county) c.counties[county] = (c.counties[county] ?? 0) + 1;
    if (r[7] && r[8]) { c.lat += r[7]; c.lng += r[8]; c.n++; }
    byCity.set(slug, c);
  }
  const cities = [];
  for (const c of byCity.values()) {
    const zips = [...c.zips].sort();
    const h = housing(zips.map((z) => acs.get(`860Z200US${z}`)).filter(Boolean));
    const county = Object.entries(c.counties).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
    cities.push({
      slug: c.slug,
      name: c.name,
      county: county ? county.replace(/ (County|Parish|Borough|Census Area|Municipality|city)$/i, "") : null,
      countyLabel: county,
      zips,
      lat: c.n ? Math.round((c.lat / c.n) * 1e4) / 1e4 : null,
      lng: c.n ? Math.round((c.lng / c.n) * 1e4) / 1e4 : null,
      acs: h,
    });
  }
  // nearest covered places, same state
  const R = (x) => (x * Math.PI) / 180;
  const dist = (a, b) => {
    const dLat = R(b.lat - a.lat), dLng = R(b.lng - a.lng);
    const q = Math.sin(dLat / 2) ** 2 + Math.cos(R(a.lat)) * Math.cos(R(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 3958.8 * 2 * Math.asin(Math.sqrt(q));
  };
  const located = cities.filter((c) => c.lat != null);
  for (const c of cities) {
    c.nearby = c.lat == null ? [] : located
      .filter((o) => o !== c)
      .map((o) => ({ slug: o.slug, mi: Math.round(dist(c, o)) }))
      .sort((a, b) => a.mi - b.mi)
      .slice(0, 12);
  }
  cities.sort((a, b) => (b.acs?.pop ?? 0) - (a.acs?.pop ?? 0));
  const st = housing([acs.get(`0400000US${fips}`)].filter(Boolean));
  fs.writeFileSync(path.join(OUT, `${abbr}.json`), JSON.stringify({ abbr, acs: st, cities }));
  summary.push({ abbr, cities: cities.length, zips: cities.reduce((n, c) => n + c.zips.length, 0) });
}
// ZIP -> "City|ST" for the ZIP checker and lead routing (server-side only).
const zipIndex = {};
for (const s of summary) {
  for (const c of JSON.parse(fs.readFileSync(path.join(OUT, `${s.abbr}.json`), "utf8")).cities) for (const z of c.zips) zipIndex[z] ??= `${c.name}|${s.abbr}`;
}
fs.writeFileSync(path.join(OUT, "zips.json"), JSON.stringify(zipIndex));
fs.writeFileSync(
  path.join(OUT, "meta.json"),
  JSON.stringify({ coverageSource: "LeadSmart plumbing coverage", coverageDate: process.env.COVERAGE_DATE ?? null, acs: "ACS 2023 5-year estimates, aggregated over covered ZCTAs", states: summary }, null, 1),
);
console.log(summary.map((s) => `${s.abbr}:${s.cities}/${s.zips}`).join(" "));
