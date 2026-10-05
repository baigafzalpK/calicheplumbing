import { notFound } from "next/navigation";
import { getService } from "@/content/services";
import { getCityPage, getStateView, cityLabel } from "@/lib/geo";
import { indexableCities, indexableCityServices } from "@/lib/sitemap";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { cityNodes, graph, ids, pageGraph } from "@/lib/schema";
import { site } from "@/content/site";
import { JsonLd } from "@/components/ui";
import { ServiceTemplate } from "@/components/templates/ServiceTemplate";

export const dynamicParams = false;
export function generateStaticParams() {
  return indexableCityServices().map((cs) => ({ state: cs.stateSlug, city: cs.citySlug, service: cs.serviceSlug }));
}

type P = { params: Promise<{ state: string; city: string; service: string }> };

function load(p: { state: string; city: string; service: string }) {
  const cs = indexableCityServices().find((x) => x.stateSlug === p.state && x.citySlug === p.city && x.serviceSlug === p.service);
  const city = getCityPage(p.state, p.city);
  const s = getService(p.service);
  const st = getStateView(p.state);
  if (!cs || !city || !s || !st) return null;
  return { cs, city, s, st };
}

export async function generateMetadata({ params }: P) {
  const d = load(await params)!;
  return pageMeta({ title: d.cs.seoTitle, description: d.cs.metaDescription, path: routes.cityService(d.st.slug, d.city.slug, d.s.slug) });
}

export default async function CityServicePage({ params }: P) {
  const d = load(await params);
  if (!d) notFound();
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
