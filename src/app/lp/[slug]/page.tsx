import { notFound } from "next/navigation";
import { landingPages, getLanding } from "@/content/misc";
import { availability, site } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { Icon } from "@/components/icons";
import { FaqList } from "@/components/ui";
import { LeadFormBlock } from "@/components/lead/LeadFormBlock";

export const dynamicParams = false;
export function generateStaticParams() {
  return landingPages.map((l) => ({ slug: l.slug }));
}

type P = { params: Promise<{ slug: string }>; searchParams: Promise<{ kw?: string }> };

export async function generateMetadata({ params }: P) {
  const l = getLanding((await params).slug)!;
  return pageMeta({ title: l.headline, description: l.sub.slice(0, 158), path: routes.lp(l.slug), canonical: l.canonical, noindex: true, ogKey: "home" });
}

export default async function Landing({ params, searchParams }: P) {
  const l = getLanding((await params).slug);
  if (!l) notFound();
  const kw = (await searchParams).kw;
  // Whitelist only: arbitrary ?kw= text is never reflected.
  const headline = (kw && Object.hasOwn(l.kw, kw) ? l.kw[kw] : null) ?? l.headline;
  const phone = site.ppcPhone ?? site.phone;
  const e164 = site.ppcPhone ? `+1${site.ppcPhone.replace(/\D/g, "").slice(-10)}` : site.phoneE164;

  return (
    <main id="main">
      <section className="bg-ink py-10 text-white lg:py-14">
        <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
          <div className="min-w-0">
            <p className="eyebrow !text-[#7fc8c9]">Licensed local plumbers · {availability}</p>
            <h1 className="mt-3 text-4xl leading-tight font-semibold sm:text-5xl">{headline}</h1>
            <p className="mt-4 text-lg text-white/85">{l.sub}</p>
            <ul className="mt-6 space-y-2">
              {l.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <Icon name="check" className="h-6 w-6 shrink-0 text-[#7fc8c9]" />
                  {b}
                </li>
              ))}
            </ul>
            <a href={`tel:${e164}`} className="btn btn-primary mt-7">
              <Icon name="phone" className="h-5 w-5" /> Call {phone}
            </a>
            <p className="mt-4 text-sm text-white/70">Serving thousands of cities and towns in all 50 states and Washington, DC.</p>
          </div>
          <div className="text-ink">
            <LeadFormBlock id="lead-form" defaultService={l.service} compact phone={phone} e164={e164} />
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container-x grid gap-8 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="text-2xl font-semibold">Signs to watch for</h2>
            <ul className="prose-cp mt-3">{l.signs.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div className="card p-6">
            <h2 className="text-2xl font-semibold">What to expect</h2>
            <ol className="mt-3 list-decimal space-y-1.5 pl-6">{l.expect.map((s) => <li key={s}>{s}</li>)}</ol>
          </div>
        </div>
        <div className="container-x mt-10 max-w-3xl">
          <FaqList faqs={l.faqs} />
        </div>
      </section>
    </main>
  );
}
