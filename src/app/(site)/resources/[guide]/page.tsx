import Link from "next/link";
import Image from "next/image";
import { guidePhotos } from "@/content/photos";
import { notFound } from "next/navigation";
import { publishedArticles, getArticle } from "@/content/articles";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { createLinker } from "@/lib/linker";
import { graph, howToNode, ids, pageGraph } from "@/lib/schema";
import { Breadcrumbs, FaqList, JsonLd, ServiceCard } from "@/components/ui";
import { PhoneLink } from "@/components/PhoneLink";
import { CtaBand } from "@/components/CtaBand";
import type { Service } from "@/content/types";

export const dynamicParams = false;
export function generateStaticParams() {
  return publishedArticles.map((a) => ({ guide: a.slug }));
}

type P = { params: Promise<{ guide: string }> };

export async function generateMetadata({ params }: P) {
  const a = getArticle((await params).guide)!;
  return pageMeta({ title: a.seoTitle, description: a.metaDescription, path: routes.guide(a.slug) });
}

const fmt = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default async function Guide({ params }: P) {
  const a = getArticle((await params).guide);
  if (!a || a.status !== "PUBLISHED") notFound();
  const path = routes.guide(a.slug);
  const link = createLinker(path);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Resources", path: routes.resources() },
    { name: a.title, path },
  ];
  const services = a.services.map(getService).filter(Boolean) as Service[];
  const primary = services[0];
  const related = a.relatedArticles.map(getArticle).filter(Boolean);
  const article = {
    "@type": "Article",
    "@id": `${site.url}${path}#article`,
    headline: a.title,
    description: a.metaDescription,
    image: [`${site.url}${guidePhotos[a.category].src}`],
    datePublished: a.published,
    dateModified: a.updated,
    author: { "@id": ids.org },
    publisher: { "@id": ids.org },
    mainEntityOfPage: { "@id": ids.page(path) },
    about: services.map((s) => ({ "@id": ids.service(s.slug) })),
  };

  const steps = a.sections
    .filter((s) => s.list && s.list.length > 0)
    .flatMap((s) =>
      s.list!.map((item, idx) => ({
        name: s.list!.length === 1 ? s.heading : `${s.heading} (${idx + 1})`,
        text: item,
      }))
    );

  const extra: Record<string, unknown>[] = [article];
  if (steps.length >= 2) {
    extra.push(
      howToNode({
        path,
        name: a.title,
        description: a.metaDescription,
        image: [`${site.url}${guidePhotos[a.category].src}`],
        steps,
      })
    );
  }

  return (
    <main id="main">
      <JsonLd data={graph(pageGraph({ path, name: a.seoTitle, description: a.metaDescription, crumbs, faqs: a.faqs, about: [`${site.url}${path}#article`], extra }))} />
      <section className="bg-ink py-12 text-white">
        <div className="container-x max-w-4xl">
          <Breadcrumbs items={crumbs} light />
          <p className="eyebrow mt-4 !text-[#7fc8c9]">{a.category}</p>
          <h1 className="mt-3 text-4xl leading-tight font-semibold sm:text-5xl">{a.title}</h1>
          <p className="mt-4 text-sm text-white/75">Updated <time dateTime={a.updated}>{fmt(a.updated)}</time></p>
        </div>
      </section>
      <section className="py-12">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="min-w-0 max-w-3xl">
            <div className="answer-box">
              <p className="mb-1 text-sm font-bold tracking-wider text-teal-deep uppercase">Short answer</p>
              <p>{a.answer}</p>
            </div>
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-sand-deep">
              <Image src={guidePhotos[a.category].src} alt={guidePhotos[a.category].alt} fill priority sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" />
            </div>
            <div className="prose-cp mt-10 text-lg">
              {a.sections.map((s) => (
                <div key={s.heading} className="mb-8">
                  <h2 className="mb-3 text-3xl font-semibold">{s.heading}</h2>
                  {s.body.map((p, i) => (
                    <p key={i}>{link(p)}</p>
                  ))}
                  {s.list && (
                    <ul>
                      {s.list.map((li) => (
                        <li key={li}>{link(li)}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <div className="mb-8 rounded-2xl bg-white p-6 ring-1 ring-line">
                <h2 className="mb-3 text-2xl font-semibold">When to call a plumber</h2>
                <ul>
                  {a.whenToCall.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
                {primary && (
                  <p className="!mb-0">
                    What the plumber does: see <Link href={routes.service(primary.slug)} className="link">{primary.name.toLowerCase()}</Link>.
                  </p>
                )}
              </div>
            </div>
            <FaqList faqs={a.faqs} title="Common questions" />
            <p className="mt-8 rounded-xl bg-sand-deep p-4 text-sm text-muted">
              Editorial note: this guide is general information for homeowners, not a diagnosis. Conditions vary by home, so a licensed plumber should confirm the cause before any repair.
            </p>
          </article>
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="card p-5">
              <p className="font-serif text-xl font-semibold">Need a plumber for this?</p>
              <p className="mt-1 text-sm text-muted">Get connected with a licensed plumber who serves your ZIP code.</p>
              <PhoneLink phone={site.phone} e164={site.phoneE164} location="guide_sidebar" className="btn btn-primary mt-4 w-full whitespace-normal" label={`Call ${site.phone}`} />
              <Link href={routes.request({ service: primary?.slug })} className="btn btn-secondary mt-2 w-full whitespace-normal">
                Request service
              </Link>
            </div>
            {related.length > 0 && (
              <div className="card p-5">
                <p className="font-semibold">Related guides</p>
                <ul className="mt-2 space-y-2 text-sm">
                  {related.map((r) => (
                    <li key={r!.slug}>
                      <Link href={routes.guide(r!.slug)} className="link">{r!.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
      <section className="bg-white py-12">
        <div className="container-x">
          <h2 className="text-3xl font-semibold">Related services</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand service={primary?.slug} />
    </main>
  );
}
