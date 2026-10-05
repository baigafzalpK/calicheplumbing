import Link from "next/link";
import { allStates, cityLabel } from "@/lib/geo";
import { indexableCities } from "@/lib/sitemap";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { graph, ids, pageGraph } from "@/lib/schema";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/ui";
import { ZipChecker } from "@/components/ZipChecker";
import { CtaBand } from "@/components/CtaBand";
import type { Region } from "@/content/stateFacts";

const title = "Plumbers in All 50 States: Service Areas";
const description =
  "Find a licensed plumber in all 50 states and DC. Pick your state for licensing, winter and water conditions, local city pages and every town we cover.";
const path = routes.locations();

export const metadata = pageMeta({ title, description, path });

const REGIONS: Region[] = ["Northeast", "Midwest", "South", "West"];

export default function LocationsHub() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path },
  ];
  const states = allStates();
  const cities = indexableCities();
  const places = states.reduce((n, s) => n + s.coveredPlaces, 0);
  const zips = states.reduce((n, s) => n + s.coveredZips, 0);
  const biggest = [...cities].sort((a, b) => (b.profile?.pop ?? 0) - (a.profile?.pop ?? 0)).slice(0, 40);
  return (
    <main id="main">
      <JsonLd data={graph(pageGraph({ path, name: title, description, type: "CollectionPage", crumbs, about: states.map((s) => ids.state(s.slug)) }))} />
      <Hero
        crumbs={crumbs}
        eyebrow="Service areas · United States"
        title="Plumbers in every state"
        lead={
          <p>
            Our network of independent, licensed plumbers covers {places.toLocaleString("en-US")} cities and towns in {zips.toLocaleString("en-US")} ZIP codes across all 50 states and Washington, DC. Check your ZIP code, or pick your state to see who licenses plumbers there, what local winters and water do to plumbing, and every town we cover.
          </p>
        }
        aside={
          <div className="rounded-2xl bg-ink-soft p-6 ring-1 ring-white/10">
            <ZipChecker dark />
          </div>
        }
      />
      <section className="py-14">
        <div className="container-x grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {REGIONS.map((r) => (
            <div key={r} id={r.toLowerCase()} className="card scroll-mt-28 p-6">
              <h2 className="text-2xl font-semibold">{r}</h2>
              <ul className="mt-4 space-y-2">
                {states
                  .filter((s) => s.region === r)
                  .map((s) => (
                    <li key={s.slug} className="flex items-baseline justify-between gap-3">
                      <Link href={routes.state(s.slug)} className="link">
                        {s.name}
                      </Link>
                      <span className="text-sm text-muted tabular-nums">{s.coveredPlaces.toLocaleString("en-US")} towns</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="container-x">
          <h2 className="text-3xl font-semibold">Largest cities with local pages</h2>
          <p className="mt-2 max-w-3xl text-muted">
            {cities.length.toLocaleString("en-US")} cities have their own page, built from Census housing data for the ZIP codes we cover there. Every state page lists the rest.
          </p>
          <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {biggest.map((c) => (
              <li key={c.stateSlug + c.slug}>
                <Link href={routes.city(c.stateSlug, c.slug)} className="link">
                  {cityLabel(c)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="py-14">
        <div className="container-x grid gap-8 md:grid-cols-3">
          {[
            ["How service areas work", "Caliche is a referral service. When you call or send a request, we route it to an independent, licensed plumber who has chosen to serve your ZIP code. Coverage depends on which plumbers are active in your area, and it changes as plumbers join."],
            ["What changes place to place", "Housing age decides most problems: galvanized pipe and cast iron in pre-1960 neighborhoods, polybutylene in homes from about 1978 to 1995, and worn-out water heaters everywhere. Climate adds frozen pipes and sump pumps in the North, and slab leaks and hard water in the South and West."],
            ["Licensing and permits", "Most states license plumbers through a state board; some leave it to cities and counties. Permits come from your city or county building department. Each state page says who to check with."],
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
