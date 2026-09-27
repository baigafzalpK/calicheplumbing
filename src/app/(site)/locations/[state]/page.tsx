import Link from "next/link";
import { notFound } from "next/navigation";
import { states, getState, regions } from "@/content/locations";
import { indexableCities } from "@/lib/sitemap";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { graph, ids, pageGraph } from "@/lib/schema";
import { Hero } from "@/components/Hero";
import { FaqList, JsonLd } from "@/components/ui";
import { ZipChecker } from "@/components/ZipChecker";
import { CtaBand } from "@/components/CtaBand";

export const dynamicParams = false;
export function generateStaticParams() {
  return states.filter((s) => s.status === "PUBLISHED").map((s) => ({ state: s.slug }));
}

type P = { params: Promise<{ state: string }> };

export async function generateMetadata({ params }: P) {
  const st = getState((await params).state)!;
  return pageMeta({
    title: `Plumbing Help in ${st.name}: Phoenix Metro`,
    description: `How plumbing works in ${st.name}'s Phoenix metro: housing eras, water providers, permits and ROC licensing, plus every town we serve in Maricopa County.`,
    path: routes.state(st.slug),
  });
}

export default async function StatePage({ params }: P) {
  const st = getState((await params).state);
  if (!st) notFound();
  const path = routes.state(st.slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: routes.locations() },
    { name: st.name, path },
  ];
  const cities = indexableCities().filter((c) => c.stateSlug === st.slug);
  return (
    <main id="main">
      <JsonLd data={graph(pageGraph({ path, name: `Plumbing help in ${st.name}`, description: st.intro, type: "CollectionPage", crumbs, faqs: st.faqs, about: [ids.state(st.slug)] }))} />
      <Hero
        crumbs={crumbs}
        eyebrow={`${st.name} · Maricopa County`}
        title={`Plumbing help in ${st.name}'s Valley of the Sun`}
        lead={<p>{st.intro}</p>}
        aside={
          <div className="rounded-2xl bg-ink-soft p-6 ring-1 ring-white/10">
            <ZipChecker dark />
          </div>
        }
      />
      <section className="py-14">
        <div className="container-x grid gap-8 md:grid-cols-2">
          {st.details.map((d) => (
            <div key={d.heading} className="card p-6">
              <h2 className="text-2xl font-semibold">{d.heading}</h2>
              <p className="mt-3 leading-relaxed text-muted">{d.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="container-x">
          <h2 className="text-3xl font-semibold">Towns we serve in {st.name}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {regions.map((r) => (
              <div key={r.slug}>
                <h3 className="font-sans text-sm font-semibold tracking-wider text-muted uppercase">{r.name}</h3>
                <ul className="mt-2 space-y-1">
                  {cities.filter((c) => c.region === r.slug).map((c) => (
                    <li key={c.slug}>
                      <Link href={routes.city(st.slug, c.slug)} className="link">{c.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 max-w-3xl">
            <FaqList faqs={st.faqs} />
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
