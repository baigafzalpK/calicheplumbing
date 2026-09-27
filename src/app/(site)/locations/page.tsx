import Link from "next/link";
import { regions, states } from "@/content/locations";
import { indexableCities, indexableCityServices } from "@/lib/sitemap";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { graph, ids, pageGraph } from "@/lib/schema";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/ui";
import { ZipChecker } from "@/components/ZipChecker";
import { CtaBand } from "@/components/CtaBand";

const title = "Plumbing Service Areas Across the Phoenix Metro";
const description =
  "Licensed plumbers across Maricopa County: Phoenix, Scottsdale, Glendale, Peoria, Surprise, the Sun Cities, Goodyear, Mesa, Tempe, Chandler and Gilbert.";
const path = routes.locations();

export const metadata = pageMeta({ title, description, path });

export default function LocationsHub() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path },
  ];
  const cities = indexableCities();
  const combos = indexableCityServices();
  return (
    <main id="main">
      <JsonLd data={graph(pageGraph({ path, name: title, description, type: "CollectionPage", crumbs, about: cities.map((c) => ids.place(c.slug)) }))} />
      <Hero
        crumbs={crumbs}
        eyebrow="Service areas"
        title="Plumbers across the Valley"
        lead={<p>We connect homeowners with independent, licensed plumbers across much of Maricopa County. Check your ZIP code, or pick your town to read about local housing, water and permits.</p>}
        aside={
          <div className="rounded-2xl bg-ink-soft p-6 ring-1 ring-white/10">
            <ZipChecker dark />
          </div>
        }
      />
      <section className="py-14">
        <div className="container-x grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {regions.map((r) => (
            <div key={r.slug} id={r.slug} className="card scroll-mt-28 p-6">
              <h2 className="text-2xl font-semibold">{r.name}</h2>
              <ul className="mt-4 space-y-2">
                {cities
                  .filter((c) => c.region === r.slug)
                  .map((c) => (
                    <li key={c.slug}>
                      <Link href={routes.city(c.stateSlug, c.slug)} className="link text-lg">
                        {c.name}
                      </Link>
                      <span className="block text-sm text-muted">{c.areas.slice(0, 3).join(", ")}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
          <div className="card p-6">
            <h2 className="text-2xl font-semibold">Local service pages</h2>
            <ul className="mt-4 space-y-2">
              {combos.map((cs) => (
                <li key={cs.citySlug + cs.serviceSlug}>
                  <Link href={routes.cityService("arizona", cs.citySlug, cs.serviceSlug)} className="link">
                    {cs.h1}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              State overview:{" "}
              {states.map((s) => (
                <Link key={s.slug} href={routes.state(s.slug)} className="link">
                  {s.name}
                </Link>
              ))}
            </p>
            <p className="mt-2 text-sm text-muted">Looking for a service instead? <Link href={routes.services()} className="link">All plumbing services</Link></p>
          </div>
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="container-x grid gap-8 md:grid-cols-3">
          {[
            ["How service areas work", "Caliche is a referral service. When you call or send a request, we route it to an independent, licensed plumber who has chosen to serve your ZIP code. Coverage depends on which plumbers are active in your area."],
            ["What changes town to town", "Housing age decides the problems: galvanized and cast iron in older cores like central Phoenix, Tempe and Sun City; polybutylene in 1978–1995 neighborhoods; and hard-water wear on newer homes in Surprise, Goodyear and Gilbert."],
            ["Permits and utilities", "Each city issues its own plumbing permits, and Maricopa County covers unincorporated areas like Sun City and Sun City West. Water comes from city utilities, EPCOR or Liberty, depending on where you live."],
          ].map(([t, b]) => (
            <div key={t}>
              <h2 className="text-2xl font-semibold">{t}</h2>
              <p className="mt-2 text-muted">{b}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
