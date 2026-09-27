import Link from "next/link";
import type { ReactNode } from "react";
import type { Crumb } from "@/lib/schema";
import type { Faq, Service } from "@/content/types";
import { Icon } from "./icons";
import { getCategory } from "@/content/services";
import { routes } from "@/lib/routes";
import { site } from "@/content/site";

export function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export function SectionHeading({ eyebrow, title, lead, id, light }: { eyebrow?: string; title: string; lead?: ReactNode; id?: string; light?: boolean }) {
  return (
    <div className="mb-8 max-w-3xl">
      {eyebrow && <p className={`eyebrow ${light ? "!text-teal-tint" : ""}`}>{eyebrow}</p>}
      <h2 id={id} className={`mt-2 text-3xl font-semibold sm:text-4xl ${light ? "text-white" : ""}`}>
        {title}
      </h2>
      {lead && <p className={`mt-3 text-lg ${light ? "text-white/80" : "text-muted"}`}>{lead}</p>}
    </div>
  );
}

export function Breadcrumbs({ items, light }: { items: Crumb[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${light ? "text-white/75" : "text-muted"}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className={light ? "text-white" : "text-ink"}>
                {c.name}
              </span>
            ) : (
              <Link href={c.path} className="hover:underline">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function FaqList({ faqs, title = "Frequently asked questions" }: { faqs: Faq[]; title?: string }) {
  if (!faqs.length) return null;
  return (
    <div>
      <h2 className="text-3xl font-semibold">{title}</h2>
      <div className="mt-6 divide-y divide-line rounded-2xl bg-white ring-1 ring-line">
        {faqs.map((f) => (
          <details key={f.q} className="group p-5">
            <summary className="flex min-w-0 cursor-pointer list-none items-start justify-between gap-4 font-semibold whitespace-normal">
              <h3 className="min-w-0 font-sans text-lg">{f.q}</h3>
              <span aria-hidden="true" className="mt-1 shrink-0 text-teal transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function ServiceCard({ s }: { s: Service }) {
  const cat = getCategory(s.category);
  return (
    <Link href={routes.service(s.slug)} className="card group flex gap-4 p-5 transition hover:ring-teal">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-tint text-teal-deep">
        <Icon name={cat.icon} />
      </span>
      <span className="min-w-0">
        <span className="block font-semibold group-hover:text-teal-deep">{s.name}</span>
        <span className="mt-1 line-clamp-2 block text-sm text-muted">{s.metaDescription.split(":")[0]}</span>
      </span>
    </Link>
  );
}

export function Chip({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex min-h-10 items-center rounded-full bg-white px-4 text-sm font-medium ring-1 ring-line hover:ring-teal">
      {children}
    </Link>
  );
}

export function Glance({ title, items }: { title: string; items: { term: string; detail: string }[] }) {
  return (
    <div className="card p-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {items.map((i) => (
          <div key={i.term} className="border-t border-line pt-3">
            <dt className="text-sm font-semibold text-muted">{i.term}</dt>
            <dd className="mt-0.5">{i.detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Reviews() {
  // Only real, verified reviews render. Until then: an invitation when configured, otherwise nothing.
  if (!site.googleReviewUrl) return null;
  return (
    <div className="card flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-lg">Had a plumber through Caliche? Tell your neighbors how it went.</p>
      <a href={site.googleReviewUrl} className="btn btn-secondary" rel="noopener" target="_blank">
        Leave a Google review
      </a>
    </div>
  );
}
