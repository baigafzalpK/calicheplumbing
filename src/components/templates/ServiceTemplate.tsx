import Link from "next/link";
import type { City, CityService, Service } from "@/content/types";
import { getService, getCategory } from "@/content/services";
import { publishedArticles } from "@/content/articles";
import { availability, site } from "@/content/site";
import { routes } from "@/lib/routes";
import { createLinker } from "@/lib/linker";
import type { Crumb } from "@/lib/schema";
import { Hero } from "../Hero";
import { categoryPhotos, servicePhotoOverrides } from "@/content/photos";
import { Chip, FaqList, Glance, ServiceCard, Reviews } from "../ui";
import { Icon } from "../icons";
import { LeadFormBlock } from "../lead/LeadFormBlock";
import { PhoneLink } from "../PhoneLink";
import { CtaBand } from "../CtaBand";

type Props = {
  s: Service;
  path: string;
  crumbs: Crumb[];
  city?: City;
  cityLabel?: string;
  local?: CityService;
  faqs: Service["faqs"];
  /** Location pages to link from this page: nearby towns (city pages) or the biggest markets (national pages). */
  towns?: { name: string; href: string }[];
  states?: { name: string; href: string }[];
};

export function ServiceTemplate({ s, path, crumbs, city, cityLabel, local, faqs, towns = [], states = [] }: Props) {
  const link = createLinker(path);
  const cat = getCategory(s.category);
  const related = s.related.map(getService).filter(Boolean) as Service[];
  const guides = publishedArticles.filter((a) => a.services.includes(s.slug)).slice(0, 3);
  const place = city ? cityLabel! : "your area";
  const sections = [
    ["overview", "Overview"],
    ...(local ? [["local", `In ${city!.name}`]] : []),
    ["signs", "Signs"],
    ["process", "Process"],
    ["cost", "Cost factors"],
    ...(s.diy ? [["diy", "DIY or call"]] : []),
    ["faq", "FAQ"],
  ];

  return (
    <main id="main">
      <Hero
        crumbs={crumbs}
        eyebrow={city ? `${cat.name} · ${place}` : cat.name}
        title={local?.h1 ?? s.h1}
        lead={<p>{local?.answer ?? s.answer}</p>}
        service={s.slug}
        emergency={false}
        facts={[availability, city ? `Serving ${place}` : "Licensed local plumbers", "Quote before work"]}
        photo={servicePhotoOverrides[s.slug] ?? categoryPhotos[s.category]}
      />

      <nav aria-label="On this page" className="sticky top-16 z-20 border-b border-line bg-sand/95 backdrop-blur">
        <div className="container-x flex gap-1 overflow-x-auto py-2 text-sm whitespace-nowrap">
          {sections.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="rounded-full px-3 py-2 font-medium hover:bg-white">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section className="py-14">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="min-w-0 space-y-12">
            <div id="overview" className="prose-cp scroll-mt-32 text-lg">
              {s.intro.map((p, i) => (
                <p key={i}>{link(p)}</p>
              ))}
            </div>

            <Glance title={`${s.shortName ?? s.name} at a glance`} items={s.glance} />

            {local && city && (
              <div id="local" className="scroll-mt-32">
                <h2 className="text-3xl font-semibold">
                  {s.shortName ?? s.name} in {city.name}: local conditions
                </h2>
                <div className="prose-cp mt-4 text-lg">
                  {local.localAngle.map((p, i) => (
                    <p key={i}>{link(p)}</p>
                  ))}
                </div>
                {(city.water || city.permits) && (
                  <p className="text-muted">
                    {city.water && (<><strong className="text-ink">Water:</strong> {city.water} </>)}
                    {city.permits && (<><strong className="text-ink">{city.curated === false ? "Licensing:" : "Permits:"}</strong> {city.permits}</>)}
                  </p>
                )}
              </div>
            )}

            <div id="signs" className="scroll-mt-32">
              <h2 className="text-3xl font-semibold">Signs you need {(s.shortName ?? s.name).toLowerCase()}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {s.signs.map((x) => (
                  <li key={x} className="flex gap-3 rounded-xl bg-white p-4 ring-1 ring-line">
                    <Icon name="check" className="h-5 w-5 shrink-0 text-sage" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>

            <div id="process" className="scroll-mt-32">
              <h2 className="text-3xl font-semibold">How the plumber handles it</h2>
              <ol className="mt-5 space-y-4 border-l-2 border-teal/40 pl-6">
                {s.process.map((p, i) => (
                  <li key={p.title} className="relative">
                    <span className="absolute top-0 -left-[2.1rem] flex h-7 w-7 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">{i + 1}</span>
                    <h3 className="font-sans text-lg font-semibold">{p.title}</h3>
                    <p className="mt-1 text-muted">{p.body}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div id="cost" className="scroll-mt-32">
              <h2 className="text-3xl font-semibold">What affects the cost</h2>
              <p className="mt-3 text-muted">Prices depend on what the plumber finds, so the plumber quotes on site. These are the main factors:</p>
              <ul className="prose-cp mt-4">
                {s.costFactors.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>

            {s.diy && (
              <div id="diy" className="scroll-mt-32">
                <h2 className="text-3xl font-semibold">What you can do, and when to stop</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-white p-5 ring-1 ring-line">
                    <h3 className="font-sans font-semibold text-sage">Safe to do yourself</h3>
                    <ul className="prose-cp mt-2 text-sm">{s.diy.safe.map((x) => <li key={x}>{x}</li>)}</ul>
                  </div>
                  <div className="rounded-xl bg-alert-tint p-5 ring-1 ring-alert/20">
                    <h3 className="font-sans font-semibold text-alert">Call a plumber</h3>
                    <ul className="prose-cp mt-2 text-sm">{s.diy.stop.map((x) => <li key={x}>{x}</li>)}</ul>
                  </div>
                </div>
              </div>
            )}

            <div id="faq" className="scroll-mt-32">
              <FaqList faqs={faqs} />
            </div>

            {(towns.length > 0 || states.length > 0) && (
              <div>
                <h2 className="text-2xl font-semibold">{city ? "Nearby areas" : `Where to get ${(s.shortName ?? s.name).toLowerCase()}`}</h2>
                {towns.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {towns.map((c) => (
                      <Chip key={c.href} href={c.href}>
                        {c.name}
                      </Chip>
                    ))}
                    {city && <Chip href={routes.service(s.slug)}>{s.name} (all areas)</Chip>}
                  </div>
                )}
                {states.length > 0 && (
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    By state:{" "}
                    {states.map((x, i) => (
                      <span key={x.href}>
                        {i > 0 && ", "}
                        <Link href={x.href} className="link">{x.name}</Link>
                      </span>
                    ))}
                  </p>
                )}
              </div>
            )}
            <Reviews />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-32 lg:self-start">
            <LeadFormBlock defaultService={s.slug} compact />
            <div className="card p-5">
              <p className="font-semibold">Prefer to talk?</p>
              <p className="mt-1 text-sm text-muted">{availability}.</p>
              <PhoneLink phone={site.phone} e164={site.phoneE164} location="sidebar" className="btn btn-secondary mt-3 w-full" label={`Call ${site.phone}`} />
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-x">
          <h2 className="text-3xl font-semibold">Related services</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <ServiceCard key={r.slug} s={r} />
            ))}
          </div>
          {guides.length > 0 && (
            <>
              <h2 className="mt-12 text-2xl font-semibold">Guides</h2>
              <ul className="mt-4 grid gap-3 md:grid-cols-3">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <Link href={routes.guide(g.slug)} className="card block p-5 font-semibold hover:text-teal-deep">
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
      <CtaBand service={s.slug} title={`Need ${(s.shortName ?? s.name).toLowerCase()}${city ? ` in ${city.name}` : ""}?`} />
    </main>
  );
}
