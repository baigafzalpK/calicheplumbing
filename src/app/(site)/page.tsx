import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { pageGraph, graph, ids } from "@/lib/schema";
import { site, availability, BRAND_PROMISE } from "@/content/site";
import { categories, servicesInCategory, getService } from "@/content/services";
import { allStates } from "@/lib/geo";
import { indexableCities } from "@/lib/sitemap";
import { stateFacts, type Region } from "@/content/stateFacts";
import { publishedArticles } from "@/content/articles";
import { generalFaqs, problems } from "@/content/misc";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { photos, categoryPhotos } from "@/content/photos";
import { FaqList, JsonLd, SectionHeading, Reviews } from "@/components/ui";
import { Icon } from "@/components/icons";
import { ZipChecker } from "@/components/ZipChecker";
import { CtaBand } from "@/components/CtaBand";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { beforeAfter } from "@/content/beforeAfter";
import { PhoneLink } from "@/components/PhoneLink";

const title = "Find a Licensed Plumber Near You, in All 50 States";
const description =
  "Connect with an independent, licensed local plumber for leaks, frozen pipes, water heaters, drains, sewer lines and repiping in all 50 states and DC.";

export const metadata = pageMeta({ title, description, path: "/" });

const faqs = generalFaqs.slice(0, 4);
const REGIONS: Region[] = ["Northeast", "Midwest", "South", "West"];

export default function Home() {
  const states = allStates();
  const places = states.reduce((n, s) => n + s.coveredPlaces, 0);
  const topCities = [...indexableCities()].sort((a, b) => (b.profile?.pop ?? 0) - (a.profile?.pop ?? 0)).slice(0, 24);
  return (
    <main id="main" data-home>
      <JsonLd data={graph(pageGraph({ path: "/", name: title, description, crumbs: [{ name: "Home", path: "/" }], faqs, about: [ids.org] }))} />
      <Hero
        eyebrow="Nationwide · All 50 states + DC"
        title="Plumbing help that knows your kind of house"
        lead={
          <p>
            A 1920s rowhouse, a 1980s slab ranch and a new build with a basement fail in different ways. We explain the problem, then connect you with a licensed plumber in {places.toLocaleString("en-US")} cities and towns. {BRAND_PROMISE}
          </p>
        }
        facts={[availability, "Licensed local contractors", "Free to request"]}
        photo={photos.copper}
      />

      <section className="border-b border-line bg-white">
        <div className="container-x grid gap-4 py-6 text-sm sm:grid-cols-3">
          {[
            ["shield", "Plumbers licensed where you live"],
            ["search", "Diagnosis before digging or cutting"],
            ["clock", "Quotes before work begins"],
          ].map(([i, t]) => (
            <p key={t} className="flex items-center gap-3 font-medium">
              <Icon name={i as "shield"} className="h-6 w-6 text-teal" />
              {t}
            </p>
          ))}
        </div>
      </section>

      <section className="bg-alert-tint">
        <div className="container-x flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3">
            <Icon name="alert" className="h-7 w-7 shrink-0 text-alert" />
            <span>
              <strong className="text-alert">Water you can't stop?</strong> Shut off the main valve, then call.{" "}
              <Link href={routes.emergency()} className="link">
                Emergency steps
              </Link>
            </span>
          </p>
          <PhoneLink phone={site.phone} e164={site.phoneE164} emergency location="home_emergency" className="btn btn-alert" label={`Call ${site.phone}`} />
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Services" title="What homeowners call a plumber for" lead="Nine categories built around how plumbing actually fails, from frozen pipes in the North to slab leaks in the South." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => {
              const list = servicesInCategory(c.slug);
              return (
                <div key={c.slug} className="card flex flex-col overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand-deep">
                    <Image src={categoryPhotos[c.slug].src} alt={categoryPhotos[c.slug].alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-300 hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-tint text-teal-deep">
                    <Icon name={c.icon} className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">
                    <Link href={routes.category(c.slug)} className="hover:text-teal-deep">
                      {c.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-muted">{c.blurb}</p>
                  <ul className="mt-4 space-y-1.5 text-sm">
                    {list.map((s) => (
                      <li key={s.slug}>
                        <Link href={routes.service(s.slug)} className="link">
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Symptom finder" title="What are you seeing?" lead="Match the symptom to the likely cause, then read the guide or go straight to the service." />
          <div className="grid gap-4 md:grid-cols-2">
            {problems.map((p) => (
              <div key={p.symptom} className="rounded-xl bg-sand p-5 ring-1 ring-line">
                <p className="font-semibold">{p.symptom}</p>
                <p className="mt-1 text-sm text-muted">Likely: {p.cause}</p>
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <Link href={routes.guide(p.guide)} className="link">
                    Read the guide
                  </Link>
                  <Link href={routes.service(p.service)} className="link">
                    {getService(p.service)?.name}
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="container-x">
          <SectionHeading light eyebrow="Local knowledge" title="Why your plumbing depends on where you live" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "snow" as const, t: "Cold winters freeze pipes", b: "Across the North and in mountain states, pipes in exterior walls, crawl spaces and garages split every winter, and basements need working sump pumps.", href: routes.service("frozen-pipe-repair") },
              { icon: "filter" as const, t: "Hard water wears out heaters", b: "Water is hard across the Southwest, Texas, Florida and much of the Midwest. Scale shortens water heater life and clogs tankless units.", href: routes.guide("white-crust-on-faucets") },
              { icon: "slab" as const, t: "Slab homes get slab leaks", b: "Where houses sit on concrete, as in much of the South and West, copper lines under the slab leak, and a warm spot on the floor is the classic clue.", href: routes.guide("warm-spot-on-floor") },
              { icon: "pipe" as const, t: "Housing age sets the pipe", b: "Pre-1960 homes often still have galvanized pipe and cast iron drains; homes from about 1978 to 1995 may have polybutylene.", href: routes.guide("polybutylene-pipes") },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl bg-ink-soft p-6 ring-1 ring-white/10">
                <Icon name={c.icon} className="h-8 w-8 text-[#7fc8c9]" />
                <h3 className="mt-4 text-xl font-semibold">{c.t}</h3>
                <p className="mt-2 text-white/80">{c.b}</p>
                <Link href={c.href} className="mt-4 inline-block font-semibold text-[#9fd8d9] underline underline-offset-2">
                  Learn more
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Before & after" title="What the fix looks like" lead="Drag the slider to compare. These are example stock photos, not jobs from our network." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {beforeAfter.map((b) => (
              <BeforeAfterSlider key={b.id} item={b} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title="From your call to a fixed problem" />
          <ol className="grid gap-5 md:grid-cols-4">
            {[
              ["Call or request", "Tell us the problem and ZIP code. Requests are free."],
              ["Get connected", "We connect you with an independent, licensed plumber serving your area."],
              ["Diagnosis and quote", "The plumber finds the cause and quotes before starting."],
              ["The fix", "You approve the work; the plumber completes it and handles any permit."],
            ].map(([t, b], i) => (
              <li key={t} className="card p-6">
                <span className="font-serif text-3xl font-semibold text-teal">{i + 1}</span>
                <h3 className="mt-2 text-lg font-semibold">{t}</h3>
                <p className="mt-1 text-sm text-muted">{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-sand-deep py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div>
            <SectionHeading eyebrow="Service area" title="All 50 states and DC" lead="State pages cover licensing, winters, water and every town we serve. City pages add local housing data." />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {REGIONS.map((r) => (
                <div key={r}>
                  <h3 className="font-sans text-sm font-semibold tracking-wider text-muted uppercase">{r}</h3>
                  <ul className="mt-2 space-y-1">
                    {stateFacts
                      .filter((s) => s.region === r)
                      .map((s) => (
                        <li key={s.slug}>
                          <Link href={routes.state(s.slug)} className="link">
                            {s.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
            <h3 className="mt-10 font-sans text-sm font-semibold tracking-wider text-muted uppercase">Largest cities</h3>
            <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {topCities.map((c) => (
                <Link key={c.stateSlug + c.slug} href={routes.city(c.stateSlug, c.slug)} className="link">
                  {c.name}
                </Link>
              ))}
              <Link href={routes.locations()} className="link font-semibold">All locations</Link>
            </p>
          </div>
          <div className="card self-start p-6">
            <ZipChecker />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Resources" title="Straight answers for homeowners" />
          <div className="grid gap-5 md:grid-cols-3">
            {publishedArticles.slice(0, 6).map((a) => (
              <Link key={a.slug} href={routes.guide(a.slug)} className="card group p-6">
                <p className="text-sm font-semibold text-teal-deep">{a.category}</p>
                <h3 className="mt-2 text-lg font-semibold group-hover:text-teal-deep">{a.title}</h3>
              </Link>
            ))}
          </div>
          <p className="mt-6">
            <Link href={routes.resources()} className="link">
              All guides
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-x max-w-4xl space-y-8">
          <Reviews />
          <FaqList faqs={faqs} />
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
