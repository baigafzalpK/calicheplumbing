import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, getCategory } from "@/content/services";
import { getCityPage, getStateView, cityLabel } from "@/lib/geo";
import { indexableCities, indexableCityServices, indexableLocalServices } from "@/lib/sitemap";
import { localServicesForCity, type LocalServicePage } from "@/lib/localServices";
import { cityServices } from "@/content/locations";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { createLinker } from "@/lib/linker";
import { cityNodes, graph, ids, pageGraph } from "@/lib/schema";
import { site, availability } from "@/content/site";
import { serviceVideos } from "@/content/videos";
import { Chip, FaqList, Glance, JsonLd, ServiceCard } from "@/components/ui";
import { Hero } from "@/components/Hero";
import { VideoBlock } from "@/components/VideoBlock";
import { LeadFormBlock } from "@/components/lead/LeadFormBlock";
import { CtaBand } from "@/components/CtaBand";
import { ServiceTemplate } from "@/components/templates/ServiceTemplate";
import type { Service } from "@/content/types";

// Shared view for service + location pages. Served at the flat URL /{service}-in-{city}-{st}/ (app/(site)/[slug]);
// the old nested /locations/{state}/{city}/{service}/ path redirects there.
export type CityServiceKey = { state: string; city: string; service: string };

export function cityServiceKeys(): CityServiceKey[] {
  return [
    ...indexableCityServices().map((cs) => ({ state: cs.stateSlug, city: cs.citySlug, service: cs.serviceSlug })),
    ...indexableLocalServices().map((x) => ({ state: x.stateSlug, city: x.citySlug, service: x.slug })),
  ];
}

function load(p: { state: string; city: string; service: string }) {
  const city = getCityPage(p.state, p.city);
  const st = getStateView(p.state);
  if (!city || !st) return null;
  const cs = cityServices.find((x) => (x.stateSlug ?? "arizona") === p.state && x.citySlug === p.city && x.serviceSlug === p.service);
  if (cs) {
    const s = getService(p.service);
    return s ? ({ kind: "curated", cs, city, s, st } as const) : null;
  }
  const lp = localServicesForCity(city).find((x) => x.slug === p.service);
  return lp ? ({ kind: "local", lp, city, st } as const) : null;
}

export function cityServiceMetadata(key: CityServiceKey) {
  const d = load(key)!;
  const path = routes.cityService(d.st.slug, d.city.slug, d.kind === "curated" ? d.s.slug : d.lp.slug);
  return d.kind === "curated"
    ? pageMeta({ title: d.cs.seoTitle, description: d.cs.metaDescription, path })
    : pageMeta({ title: d.lp.seoTitle, description: d.lp.metaDescription, path });
}

export function CityServiceView({ k }: { k: CityServiceKey }) {
  const d = load(k);
  if (!d) notFound();
  if (d.kind === "local") return <LocalPage lp={d.lp} city={d.city} st={d.st} />;
  const { cs, city, s, st } = d;
  const path = routes.cityService(st.slug, city.slug, s.slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: routes.locations() },
    { name: st.name, path: routes.state(st.slug) },
    { name: city.name, path: routes.city(st.slug, city.slug) },
    { name: s.name, path },
  ];
  const faqs = [...cs.localFaqs, ...s.faqs].slice(0, 4);
  const node = {
    "@type": "Service",
    "@id": `${site.url}${path}#service`,
    name: `${s.name} in ${cityLabel(city)}`,
    url: `${site.url}${path}`,
    description: cs.answer,
    provider: { "@id": ids.org },
    broker: { "@id": ids.org },
    areaServed: { "@id": ids.place(st.slug, city.slug) },
    isRelatedTo: { "@id": ids.service(s.slug) },
  };
  return (
    <>
      <JsonLd data={graph(pageGraph({ path, name: cs.seoTitle, description: cs.metaDescription, type: "ItemPage", crumbs, faqs, about: [`${site.url}${path}#service`], extra: [node, ...cityNodes(city, st.abbr)] }))} />
      <ServiceTemplate
        s={s}
        path={path}
        crumbs={crumbs}
        city={city}
        cityLabel={cityLabel(city)}
        local={cs}
        faqs={faqs}
        towns={[
          { name: `All of ${city.name}`, href: routes.city(st.slug, city.slug) },
          ...indexableCities()
            .filter((c) => c.stateSlug === st.slug && city.nearby.includes(c.slug))
            .map((c) => {
              const combo = indexableCityServices().some((x) => x.stateSlug === st.slug && x.citySlug === c.slug && x.serviceSlug === s.slug);
              return { name: c.name, href: combo ? routes.cityService(st.slug, c.slug, s.slug) : routes.city(st.slug, c.slug) };
            }),
          { name: `All of ${st.name}`, href: routes.state(st.slug) },
        ]}
      />
    </>
  );
}

function LocalPage({ lp, city, st }: { lp: LocalServicePage; city: NonNullable<ReturnType<typeof getCityPage>>; st: NonNullable<ReturnType<typeof getStateView>> }) {
  const path = routes.cityService(st.slug, city.slug, lp.slug);
  const link = createLinker(path);
  const national = lp.kind === "service" ? getService(lp.slug)! : null;
  const cat = lp.kind === "category" ? getCategory(lp.slug as never) : getCategory(national!.category);
  const parentHref = lp.kind === "service" ? routes.service(lp.slug) : routes.category(lp.slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: routes.locations() },
    { name: st.name, path: routes.state(st.slug) },
    { name: city.name, path: routes.city(st.slug, city.slug) },
    { name: lp.name, path },
  ];
  const related = lp.related.map(getService).filter(Boolean) as Service[];
  // The service whose practical guidance applies: the sub-service itself, or the category's lead service.
  const guide = national ?? (related.find((r) => r.category === lp.slug) as Service | undefined);
  const faqs = lp.faqs;
  // Same page type in nearby cities, plus this city's other local service page.
  const all = indexableLocalServices();
  const sameNearby = city.nearby
    .map((slug) => all.find((x) => x.stateSlug === st.slug && x.citySlug === slug && x.slug === lp.slug))
    .filter((x) => x !== undefined);
  const sibling = all.find((x) => x.stateSlug === st.slug && x.citySlug === city.slug && x.slug !== lp.slug);
  const video = serviceVideos[lp.slug] ?? (lp.kind === "category" ? Object.entries(serviceVideos).find(([k]) => getService(k)?.category === lp.slug)?.[1] : undefined);
  const node = {
    "@type": "Service",
    "@id": `${site.url}${path}#service`,
    name: lp.h1,
    url: `${site.url}${path}`,
    description: lp.answer,
    serviceType: lp.name,
    provider: { "@id": ids.org },
    broker: { "@id": ids.org },
    areaServed: { "@id": ids.place(st.slug, city.slug) },
    ...(national ? { isRelatedTo: { "@id": ids.service(lp.slug) } } : {}),
  };

  return (
    <main id="main">
      <JsonLd data={graph(pageGraph({ path, name: lp.seoTitle, description: lp.metaDescription, type: "ItemPage", crumbs, faqs, about: [`${site.url}${path}#service`], extra: [node, ...cityNodes(city, st.abbr)] }))} />
      <Hero
        crumbs={crumbs}
        eyebrow={`${cat.name} · ${cityLabel(city)}`}
        title={lp.h1}
        lead={<p>{lp.answer}</p>}
        service={national?.slug}
        facts={[availability, `${city.zips.length} ZIP codes covered`, "Quote before work"]}
      />
      <section className="py-14">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="min-w-0 space-y-12">
            {lp.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-3xl font-semibold">{s.heading}</h2>
                <div className="prose-cp mt-4 text-lg">
                  {s.paras.map((p, i) => (
                    <p key={i}>{link(p)}</p>
                  ))}
                </div>
              </div>
            ))}

            <Glance title={`${city.name} figures behind this page`} items={lp.facts} />

            {video && <VideoBlock video={video} />}

            {guide && (
              <div className="grid gap-6 md:grid-cols-2">
                {guide.diy && (
                  <div className="rounded-xl bg-white p-5 ring-1 ring-line">
                    <h2 className="font-sans text-xl font-semibold">What to do first</h2>
                    <ul className="prose-cp mt-2 text-sm">
                      {guide.diy.safe.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="rounded-xl bg-white p-5 ring-1 ring-line">
                  <h2 className="font-sans text-xl font-semibold">What affects the price</h2>
                  <ul className="prose-cp mt-2 text-sm">
                    {guide.costFactors.slice(0, 4).map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-muted">The plumber quotes on site, before any work starts.</p>
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-semibold">How the job works</h2>
              <p className="mt-3 text-muted">
                {national ? (
                  <>
                    Signs, the step-by-step process, cost factors and what you can safely do yourself are on our{" "}
                    <Link href={parentHref} className="link">{national.name.toLowerCase()} guide</Link>.
                  </>
                ) : (
                  <>
                    Every {cat.name.toLowerCase()} service is explained on our <Link href={parentHref} className="link">{cat.name} page</Link>.
                  </>
                )}{" "}
                For the rest of {city.name}&apos;s plumbing picture, see <Link href={routes.city(st.slug, city.slug)} className="link">plumbers in {city.name}</Link>
                {sibling && (
                  <>
                    {" "}and <Link href={routes.cityService(st.slug, city.slug, sibling.slug)} className="link">{sibling.name.toLowerCase()} in {city.name}</Link>
                  </>
                )}
                .
              </p>
            </div>

            <FaqList faqs={faqs} title={`${lp.name} in ${city.name}: FAQ`} />

            <div>
              <h2 className="text-2xl font-semibold">Nearby</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {sameNearby.map((x) => (
                  <Chip key={x.citySlug} href={routes.cityService(st.slug, x.citySlug, x.slug)}>
                    {lp.name} in {indexableCities().find((c) => c.stateSlug === st.slug && c.slug === x.citySlug)?.name}
                  </Chip>
                ))}
                <Chip href={routes.state(st.slug)}>All of {st.name}</Chip>
              </div>
              <p className="mt-4 text-sm text-muted">ZIP codes covered in {city.name}: {city.zips.join(", ")}</p>
            </div>
            <p className="text-xs text-muted">
              Figures are US Census Bureau ACS 2023 5-year estimates for the ZIP code areas we cover in {city.name}; state comparisons use the {st.name} statewide estimate.
            </p>
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <LeadFormBlock defaultService={national?.slug} compact />
          </aside>
        </div>
      </section>
      {related.length > 0 && (
        <section className="bg-white py-14">
          <div className="container-x">
            <h2 className="text-3xl font-semibold">Related services</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.slice(0, 4).map((r) => (
                <ServiceCard key={r.slug} s={r} />
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand service={national?.slug} title={`Need ${lp.name.toLowerCase()} in ${city.name}?`} />
    </main>
  );
}
