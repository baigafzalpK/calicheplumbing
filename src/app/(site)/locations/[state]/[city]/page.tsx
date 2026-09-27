import Link from "next/link";
import { notFound } from "next/navigation";
import { getCity, getState, cityLabel, cities as allCities } from "@/content/locations";
import { getService } from "@/content/services";
import { publishedArticles } from "@/content/articles";
import { indexableCities, indexableCityServices } from "@/lib/sitemap";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { createLinker } from "@/lib/linker";
import { graph, ids, pageGraph } from "@/lib/schema";
import { availability } from "@/content/site";
import { Hero } from "@/components/Hero";
import { Chip, FaqList, Glance, JsonLd } from "@/components/ui";
import { Icon } from "@/components/icons";
import { LeadFormBlock } from "@/components/lead/LeadFormBlock";
import { CtaBand } from "@/components/CtaBand";
import type { Service } from "@/content/types";

export const dynamicParams = false;
export function generateStaticParams() {
  return indexableCities().map((c) => ({ state: c.stateSlug, city: c.slug }));
}

type P = { params: Promise<{ state: string; city: string }> };

export async function generateMetadata({ params }: P) {
  const p = await params;
  const c = getCity(p.state, p.city)!;
  return pageMeta({
    title: `Plumber in ${cityLabel(c)}`,
    description: `Plumbing help in ${c.name}: ${c.localIssues.map((i) => i.title.toLowerCase()).slice(0, 2).join(", ")}, water heaters and more. Local water and permit facts, and a licensed plumber.`.slice(0, 158),
    path: routes.city(c.stateSlug, c.slug),
  });
}

export default async function CityPage({ params }: P) {
  const p = await params;
  const c = getCity(p.state, p.city);
  const st = getState(p.state);
  if (!c || !st) notFound();
  const path = routes.city(st.slug, c.slug);
  const link = createLinker(path);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: routes.locations() },
    { name: st.name, path: routes.state(st.slug) },
    { name: c.name, path },
  ];
  const combos = indexableCityServices().filter((cs) => cs.citySlug === c.slug);
  const popular = c.popularServices.map(getService).filter(Boolean) as Service[];
  const nearby = allCities.filter((x) => c.nearby.includes(x.slug));
  const guides = publishedArticles.filter((a) => a.services.some((s) => c.popularServices.includes(s))).slice(0, 3);

  return (
    <main id="main">
      <JsonLd data={graph(pageGraph({ path, name: `Plumber in ${cityLabel(c)}`, description: c.intro, crumbs, faqs: c.faqs, about: [ids.place(c.slug)] }))} />
      <Hero
        crumbs={crumbs}
        eyebrow={`${c.county} County · ${cityLabel(c)}`}
        title={`Plumbing help in ${c.name}`}
        lead={<p>{c.intro}</p>}
        facts={[availability, `Neighborhoods: ${c.areas.slice(0, 3).join(", ")}`]}
        aside={
          <div className="rounded-2xl bg-ink-soft p-6 ring-1 ring-white/10">
            <p className="font-serif text-xl font-semibold">Areas in {c.name}</p>
            <ul className="mt-3 flex flex-wrap gap-2 text-sm">
              {c.areas.map((a) => (
                <li key={a} className="rounded-full bg-white/10 px-3 py-1.5">
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-white/75">ZIP codes: {c.zips.join(", ")}</p>
          </div>
        }
      />
      <section className="py-14">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="min-w-0 space-y-12">
            <div>
              <h2 className="text-3xl font-semibold">{c.name} homes and their plumbing</h2>
              <p className="mt-4 text-lg leading-relaxed">{link(c.housingNotes)}</p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {c.localIssues.map((i) => (
                  <div key={i.title} className="card p-5">
                    <h3 className="font-sans text-lg font-semibold">{i.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{link(i.body)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-semibold">Common calls in {c.name}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {popular.map((s) => {
                  const combo = combos.find((x) => x.serviceSlug === s.slug);
                  return (
                    <li key={s.slug}>
                      <Link href={combo ? routes.cityService(st.slug, c.slug, s.slug) : routes.service(s.slug)} className="card flex items-center gap-3 p-4 font-semibold hover:text-teal-deep">
                        <Icon name="wrench" className="h-5 w-5 text-teal" />
                        {combo ? combo.h1 : s.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-muted">
                Also available in {c.name}:{" "}
                <Link href={routes.emergency()} className="link">emergency plumbing</Link> and{" "}
                <Link href={routes.services()} className="link">every plumbing service</Link>.
              </p>
            </div>

            <Glance
              title={`${c.name} at a glance`}
              items={[
                { term: "County", detail: `${c.county} County` },
                { term: "Water", detail: c.water },
                { term: "Permits", detail: c.permits },
                { term: "ZIP codes", detail: c.zips.join(", ") },
              ]}
            />

            <FaqList faqs={c.faqs} title={`${c.name} plumbing FAQ`} />

            {guides.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold">Guides for {c.name} homeowners</h2>
                <ul className="mt-4 grid gap-3 md:grid-cols-3">
                  {guides.map((g) => (
                    <li key={g.slug}>
                      <Link href={routes.guide(g.slug)} className="card block p-5 font-semibold hover:text-teal-deep">{g.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-semibold">Nearby towns</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {nearby.map((n) => (
                  <Chip key={n.slug} href={routes.city(n.stateSlug, n.slug)}>{n.name}</Chip>
                ))}
                <Chip href={routes.state(st.slug)}>All of {st.name}</Chip>
              </div>
            </div>
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <LeadFormBlock compact />
          </aside>
        </div>
      </section>
      <CtaBand title={`Need a plumber in ${c.name}?`} />
    </main>
  );
}
