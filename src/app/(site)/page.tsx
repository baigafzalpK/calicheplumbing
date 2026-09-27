import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { pageGraph, graph, ids } from "@/lib/schema";
import { site, availability, BRAND_PROMISE } from "@/content/site";
import { categories, servicesInCategory, getService } from "@/content/services";
import { regions, publishedCities } from "@/content/locations";
import { publishedArticles } from "@/content/articles";
import { generalFaqs, problems } from "@/content/misc";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { photos, categoryPhotos } from "@/content/photos";
import { FaqList, JsonLd, SectionHeading, Reviews } from "@/components/ui";
import { Icon } from "@/components/icons";
import { ZipChecker } from "@/components/ZipChecker";
import { CtaBand } from "@/components/CtaBand";
import { PhoneLink } from "@/components/PhoneLink";

const title = "Phoenix Metro Plumbing Help: Leaks, Hard Water & Repipes";
const description =
  "Connect with a licensed Valley plumber for slab leaks, water heaters, softeners and repiping across Phoenix, Scottsdale, the West Valley and East Valley.";

export const metadata = pageMeta({ title, description, path: "/" });

const faqs = generalFaqs.slice(0, 4);

export default function Home() {
  return (
    <main id="main" data-home>
      <JsonLd data={graph(pageGraph({ path: "/", name: title, description, crumbs: [{ name: "Home", path: "/" }], faqs, about: [ids.org] }))} />
      <Hero
        eyebrow="Phoenix metro · Maricopa County"
        title="Plumbing help built for desert homes"
        lead={
          <p>
            Slab leaks, hard water, polybutylene and worn-out water heaters are the Valley's everyday plumbing problems. {BRAND_PROMISE}
          </p>
        }
        facts={[availability, "Licensed Arizona contractors", "Free to request"]}
        photo={photos.phoenixAerial}
      />

      <section className="border-b border-line bg-white">
        <div className="container-x grid gap-4 py-6 text-sm sm:grid-cols-3">
          {[
            ["shield", "Plumbers licensed by the Arizona ROC"],
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
          <SectionHeading eyebrow="Services" title="What Valley homes call a plumber for" lead="Eight categories built around how plumbing actually fails in the desert." />
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
          <SectionHeading light eyebrow="Local knowledge" title="Why Valley plumbing is different" />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: "filter" as const, t: "Some of the hardest water in the US", b: "Scale shortens water heater life, clogs tankless units and ruins fixtures. Softeners and RO are standard upgrades here.", href: routes.guide("white-crust-on-faucets") },
              { icon: "slab" as const, t: "Everything sits on a slab", b: "Supply lines under concrete mean slab leaks, and a warm spot on the floor is the classic clue.", href: routes.guide("warm-spot-on-floor") },
              { icon: "pipe" as const, t: "A boom in the polybutylene years", b: "Many homes built around 1978–1995 have polybutylene supply pipe that insurers and buyers ask about.", href: routes.guide("polybutylene-pipes-arizona") },
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
            <SectionHeading eyebrow="Service area" title="Across the Valley" lead="City pages cover local housing, water providers and permits." />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {regions.map((r) => (
                <div key={r.slug}>
                  <h3 className="font-sans text-sm font-semibold tracking-wider text-muted uppercase">{r.name}</h3>
                  <ul className="mt-2 space-y-1">
                    {publishedCities
                      .filter((c) => c.region === r.slug)
                      .map((c) => (
                        <li key={c.slug}>
                          <Link href={routes.city(c.stateSlug, c.slug)} className="link">
                            {c.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="card self-start p-6">
            <ZipChecker />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Resources" title="Straight answers for Valley homeowners" />
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
