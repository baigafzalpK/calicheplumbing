import Link from "next/link";
import { notFound } from "next/navigation";
import { allStates, getStateView, statePlacesWithoutPages } from "@/lib/geo";
import { freezeLabel } from "@/content/stateFacts";
import { getService } from "@/content/services";
import { indexableCities, indexableCityServices } from "@/lib/sitemap";
import { eras } from "@/lib/localContent";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { graph, ids, pageGraph } from "@/lib/schema";
import { Hero } from "@/components/Hero";
import { FaqList, JsonLd } from "@/components/ui";
import { ZipChecker } from "@/components/ZipChecker";
import { CtaBand } from "@/components/CtaBand";
import { HousingBars } from "@/components/HousingBars";
import type { Faq } from "@/content/types";

export const dynamicParams = false;
export function generateStaticParams() {
  return allStates().map((s) => ({ state: s.slug }));
}

type P = { params: Promise<{ state: string }> };

export async function generateMetadata({ params }: P) {
  const st = getStateView((await params).state)!;
  return pageMeta({
    title: `Plumbers in ${st.name}: Licensing & Local Help`,
    description: `Licensed plumbers in ${st.coveredPlaces.toLocaleString("en-US")} ${st.name} cities and towns. Who licenses plumbers, ${freezeLabel[st.freeze].toLowerCase()}, ${st.hardness === "varies" ? "local water" : `${st.hardness} water`} and housing age.`.slice(0, 158),
    path: routes.state(st.slug),
  });
}

const pct = (n: number) => `${Math.round(n)}%`;

function stateFaqs(st: NonNullable<ReturnType<typeof getStateView>>): Faq[] {
  const faqs: Faq[] = [{ q: `How do I check a plumber's license in ${st.name}?`, a: st.licensing }];
  faqs.push({
    q: `Do pipes freeze in ${st.name}?`,
    a:
      st.freeze === "severe"
        ? `Yes, regularly. ${st.name} winters freeze pipes in exterior walls, crawl spaces, garages and attics, and outdoor spigots that aren't frost-free. Keep the heat on, disconnect hoses in fall and know where your main shutoff is.`
        : st.freeze === "seasonal"
          ? `Yes, during cold snaps. Pipes in crawl spaces, exterior walls and unheated garages are the ones that freeze. Disconnect hoses in fall and open sink cabinets on the coldest nights.`
          : st.freeze === "occasional"
            ? `Occasionally. Hard freezes don't happen every winter, which is why they cause so much damage when they do: many homes have exposed pipes and hose bibs that were never protected.`
            : `Rarely. Outdoor backflow assemblies, pool equipment and exposed lines are the usual casualties on the few nights that drop below freezing.`,
  });
  if (st.hardness !== "varies")
    faqs.push({
      q: `Is ${st.name} water hard?`,
      a: `Generally ${st.hardness}, based on national hardness mapping, but it varies by utility and by well. Your water provider's annual water quality report lists the hardness for your system, and a plumber can test well water.`,
    });
  if (st.acs)
    faqs.push({
      q: `How old are homes in ${st.name}?`,
      a: `Census estimates for ${st.name} put ${pct(st.acs.built.pre1940 + st.acs.built.y1940_59)} of homes as built before 1960, ${pct(st.acs.built.y1960_79)} from 1960 to 1979, ${pct(st.acs.built.y1980_99)} from 1980 to 1999 and ${pct(st.acs.built.y2000p)} in 2000 or later. Older homes are more likely to have galvanized supply pipe and cast iron or clay sewer lines.`,
    });
  return [...faqs, ...(st.curated?.faqs ?? [])];
}

export default async function StatePage({ params }: P) {
  const st = getStateView((await params).state);
  if (!st) notFound();
  const path = routes.state(st.slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: routes.locations() },
    { name: st.name, path },
  ];
  const cities = indexableCities().filter((c) => c.stateSlug === st.slug);
  const combos = indexableCityServices().filter((cs) => cs.stateSlug === st.slug);
  const others = statePlacesWithoutPages(st.slug);
  const byCounty = new Map<string, string[]>();
  for (const o of others) {
    const k = o.countyLabel ?? "Other areas";
    byCounty.set(k, [...(byCounty.get(k) ?? []), o.name]);
  }
  const counties = [...byCounty.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  const faqs = stateFaqs(st);
  const focus = [
    st.freeze === "severe" || st.freeze === "seasonal" ? "frozen-pipe-repair" : null,
    st.hardness === "hard" || st.hardness === "very hard" ? "water-softener-installation" : null,
    st.acs && st.acs.built.pre1940 + st.acs.built.y1940_59 >= 20 ? "whole-house-repiping" : null,
    st.acs && st.acs.built.y1980_99 >= 30 ? "polybutylene-replacement" : null,
    st.region === "Midwest" || st.region === "Northeast" ? "sump-pump-installation" : "slab-leak-detection",
    "water-heater-replacement",
    "drain-cleaning",
    "sewer-line-repair",
  ]
    .filter((x): x is string => Boolean(x))
    .map(getService)
    .filter(Boolean)
    .slice(0, 6);

  return (
    <main id="main">
      <JsonLd data={graph(pageGraph({ path, name: `Plumbers in ${st.name}`, description: st.licensing, type: "CollectionPage", crumbs, faqs, about: [ids.state(st.slug)] }))} />
      <Hero
        crumbs={crumbs}
        eyebrow={`${st.region} · ${st.coveredPlaces.toLocaleString("en-US")} covered cities and towns`}
        title={`Plumbers in ${st.name}`}
        lead={
          <p>
            {st.curated?.intro ??
              `We connect ${st.name} homeowners with independent, licensed plumbers in ${st.coveredPlaces.toLocaleString("en-US")} cities and towns across ${st.coveredZips.toLocaleString("en-US")} ZIP codes. ${st.notes[0]}`}
          </p>
        }
        facts={[freezeLabel[st.freeze], st.hardness === "varies" ? "Water varies by area" : `Generally ${st.hardness} water`]}
        aside={
          <div className="rounded-2xl bg-ink-soft p-6 ring-1 ring-white/10">
            <ZipChecker dark />
          </div>
        }
      />

      <section className="py-14">
        <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Plumbing in {st.name}: what's different</h2>
            <ul className="space-y-3 text-lg leading-relaxed">
              {st.notes.map((n) => (
                <li key={n} className="card p-5">{n}</li>
              ))}
            </ul>
            {st.curated?.details.map((d) => (
              <div key={d.heading} className="card p-5">
                <h3 className="font-sans text-lg font-semibold">{d.heading}</h3>
                <p className="mt-2 leading-relaxed text-muted">{d.body}</p>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <dl className="card divide-y divide-line">
              {[
                ["Licensing", st.licensing],
                ["Winters", `${freezeLabel[st.freeze]}.`],
                ["Water hardness", st.hardness === "varies" ? "Varies widely by area. Check your utility's annual water quality report." : `Generally ${st.hardness}. Check your utility's annual water quality report for your system.`],
                ...(st.acs
                  ? [["Home heating", `${pct(st.acs.heat.gas)} utility gas, ${pct(st.acs.heat.electric)} electric${st.acs.heat.oil >= 3 ? `, ${pct(st.acs.heat.oil)} fuel oil` : ""}${st.acs.heat.lp >= 3 ? `, ${pct(st.acs.heat.lp)} propane` : ""} (Census ACS).`]]
                  : []),
              ].map(([t, d]) => (
                <div key={t} className="grid gap-1 p-5 sm:grid-cols-[9rem_1fr]">
                  <dt className="font-semibold">{t}</dt>
                  <dd className="text-muted">{d}</dd>
                </div>
              ))}
            </dl>
            {st.acs && <HousingBars title={`When ${st.name} homes were built`} rows={eras(st.acs)} note="Share of housing units, Census ACS 2023 5-year estimates." />}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-x">
          <h2 className="text-3xl font-semibold">Local plumbing pages in {st.name}</h2>
          <p className="mt-2 max-w-3xl text-muted">Each page covers the age of local housing, how homes are heated and the problems that follow, based on Census data for the ZIP codes we cover.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={routes.city(st.slug, c.slug)} className="card block p-4 hover:text-teal-deep">
                  <span className="font-semibold">Plumbers in {c.name}</span>
                  {c.county && <span className="block text-sm text-muted">{/(County|Parish|Borough|Area|city)$/i.test(c.county) ? c.county : `${c.county} County`}</span>}
                </Link>
              </li>
            ))}
          </ul>
          {combos.length > 0 && (
            <>
              <h3 className="mt-10 font-sans text-xl font-semibold">Local service guides</h3>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {combos.map((cs) => (
                  <li key={cs.citySlug + cs.serviceSlug}>
                    <Link href={routes.cityService(st.slug, cs.citySlug, cs.serviceSlug)} className="link">{cs.h1}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <h3 className="mt-10 font-sans text-xl font-semibold">Common plumbing work in {st.name}</h3>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {focus.map((s) => (
              <li key={s!.slug}>
                <Link href={routes.service(s!.slug)} className="link">{s!.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {counties.length > 0 && (
        <section className="py-14">
          <div className="container-x">
            <h2 className="text-3xl font-semibold">Other {st.name} cities and towns we cover</h2>
            <p className="mt-2 max-w-3xl text-muted">
              These {others.length.toLocaleString("en-US")} places are in our network but don't have their own page yet. Call or check your ZIP code to be connected with a plumber.
            </p>
            <div className="mt-6 grid gap-x-8 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
              {counties.map(([county, names]) => (
                <details key={county} className="border-b border-line py-2">
                  <summary className="cursor-pointer font-semibold">
                    {county} <span className="font-normal text-muted">({names.length})</span>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{names.sort().join(", ")}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-14">
        <div className="container-x max-w-4xl">
          <FaqList faqs={faqs} title={`${st.name} plumbing FAQ`} />
          <p className="mt-8 text-sm text-muted">
            Sources: coverage from our plumbing network (updated October 2026); housing and heating figures from US Census Bureau American Community Survey 2023 5-year estimates. <Link href={routes.locations()} className="link">All states</Link>
          </p>
        </div>
      </section>
      <CtaBand title={`Need a plumber in ${st.name}?`} />
    </main>
  );
}
