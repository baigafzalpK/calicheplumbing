import Link from "next/link";
import { notFound } from "next/navigation";
import { allCounties, getCounty, cityPagesIn, eras } from "@/lib/counties";
import { indexableCities } from "@/lib/sitemap";
import { getService } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { createLinker } from "@/lib/linker";
import { graph, ids, pageGraph } from "@/lib/schema";
import { site } from "@/content/site";
import { Hero } from "@/components/Hero";
import { Chip, FaqList, JsonLd } from "@/components/ui";
import { ZipChecker } from "@/components/ZipChecker";
import { CtaBand } from "@/components/CtaBand";
import { HousingBars } from "@/components/HousingBars";
import type { Service } from "@/content/types";

export const dynamicParams = false;
export function generateStaticParams() {
  return allCounties().map((c) => ({ state: c.stateSlug, county: c.slug }));
}

type P = { params: Promise<{ state: string; county: string }> };

export async function generateMetadata({ params }: P) {
  const p = await params;
  const c = getCounty(p.state, p.county)!;
  return pageMeta({
    title: `Plumbers in ${c.name}, ${c.state.abbr}`,
    description: `Licensed plumbers in ${c.places.length} ${c.name} cities and towns. Local housing age, heating fuel, common plumbing problems and who licenses plumbers in ${c.state.name}.`.slice(0, 158),
    path: routes.county(c.stateSlug, c.slug),
  });
}

export default async function CountyPage({ params }: P) {
  const p = await params;
  const c = getCounty(p.state, p.county);
  if (!c) notFound();
  const path = routes.county(c.stateSlug, c.slug);
  const link = createLinker(path);
  const st = c.state;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: routes.locations() },
    { name: st.name, path: routes.state(st.slug) },
    { name: c.name, path },
  ];
  const indexable = new Set(indexableCities().map((x) => `${x.stateSlug}/${x.slug}`));
  const cityPages = cityPagesIn(c).filter((x) => indexable.has(`${x.stateSlug}/${x.slug}`));
  const paged = new Set(cityPages.map((x) => x.slug));
  const towns = [...c.places].filter((x) => !paged.has(x.slug)).sort((a, b) => a.name.localeCompare(b.name));
  const largest = [...c.places].sort((a, b) => (b.acs?.pop ?? 0) - (a.acs?.pop ?? 0)).slice(0, 10);
  const services = [...new Set(c.issues.map((i) => i.service).concat("water-heater-replacement", "drain-cleaning"))].map(getService).filter(Boolean) as Service[];
  const prof = c.profile;
  const placeId = `${site.url}${path}#place`;

  return (
    <main id="main">
      <JsonLd
        data={graph(
          pageGraph({
            path,
            name: `Plumbers in ${c.name}, ${st.abbr}`,
            description: c.intro,
            type: "CollectionPage",
            crumbs,
            faqs: c.faqs,
            about: [placeId],
            extra: [{ "@type": "AdministrativeArea", "@id": placeId, name: `${c.name}, ${st.abbr}`, containedInPlace: { "@id": ids.state(st.slug) } }],
          }),
        )}
      />
      <Hero
        crumbs={crumbs}
        eyebrow={`${st.name} · ${c.places.length} covered places · ${c.zips} ZIP codes`}
        title={`Plumbers in ${c.name}, ${st.abbr}`}
        lead={<p>{c.intro}</p>}
        aside={
          <div className="rounded-2xl bg-ink-soft p-6 ring-1 ring-white/10">
            <ZipChecker dark />
          </div>
        }
      />

      <section className="py-14">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <HousingBars title={`When ${c.name} homes were built`} rows={eras(prof)} note="Share of housing units in the covered ZIP codes. Census ACS 2023 5-year estimates." />
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <caption className="p-5 pb-2 text-left font-sans text-lg font-semibold">Largest covered places</caption>
              <thead>
                <tr className="text-left text-muted">
                  <th scope="col" className="px-5 py-2 font-medium">Place</th>
                  <th scope="col" className="px-5 py-2 text-right font-medium">Residents in covered ZIPs</th>
                  <th scope="col" className="px-5 py-2 text-right font-medium">Built before 1960</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {largest.map((x) => (
                  <tr key={x.slug}>
                    <th scope="row" className="px-5 py-2 text-left font-medium">
                      {paged.has(x.slug) ? <Link href={routes.city(st.slug, x.slug)} className="link">{x.name}</Link> : x.name}
                    </th>
                    <td className="px-5 py-2 text-right tabular-nums">{x.acs ? x.acs.pop.toLocaleString("en-US") : "–"}</td>
                    <td className="px-5 py-2 text-right tabular-nums">{x.acs ? `${Math.round(x.acs.built.pre1940 + x.acs.built.y1940_59)}%` : "–"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-x">
          <h2 className="text-3xl font-semibold">What goes wrong in {c.name} homes</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {c.issues.map((i) => (
              <div key={i.title} className="card p-5">
                <h3 className="font-sans text-lg font-semibold">{i.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{link(i.body)}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-10 font-sans text-xl font-semibold">Common plumbing work in {c.name}</h3>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={routes.service(s.slug)} className="link">{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14">
        <div className="container-x">
          {cityPages.length > 0 && (
            <>
              <h2 className="text-3xl font-semibold">City pages in {c.name}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {cityPages.map((x) => (
                  <Chip key={x.slug} href={routes.city(st.slug, x.slug)}>Plumbers in {x.name}</Chip>
                ))}
              </div>
            </>
          )}
          {towns.length > 0 && (
            <>
              <h2 className={`${cityPages.length ? "mt-10" : ""} text-3xl font-semibold`}>Other covered towns in {c.name}</h2>
              <ul className="mt-4 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {towns.map((x) => (
                  <li key={x.slug}>
                    {x.name} <span className="text-muted">({x.zips.length} ZIP{x.zips.length > 1 ? "s" : ""})</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className="mt-8">
            <Chip href={routes.state(st.slug)}>All of {st.name}</Chip>
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-x max-w-4xl">
          <FaqList faqs={c.faqs} title={`${c.name} plumbing FAQ`} />
          <p className="mt-8 text-xs text-muted">
            Housing and heating figures are US Census Bureau ACS 2023 5-year estimates for the ZIP code areas we cover in {c.name}, combined across places and weighted by housing units. Some ZIP codes extend into neighboring counties.
          </p>
        </div>
      </section>
      <CtaBand title={`Need a plumber in ${c.name}?`} />
    </main>
  );
}
