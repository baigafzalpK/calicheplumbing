import Link from "next/link";
import Image from "next/image";
import type { Photo } from "@/content/photos";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";
import type { Crumb } from "@/lib/schema";
import { Breadcrumbs } from "./ui";
import { PhoneLink } from "./PhoneLink";
import { Icon } from "./icons";

type Props = {
  eyebrow: string;
  title: string;
  lead: ReactNode;
  crumbs?: Crumb[];
  facts?: string[];
  service?: string;
  aside?: ReactNode;
  emergency?: boolean;
  photo?: Photo;
};

export function Hero({ eyebrow, title, lead, crumbs, facts = [], service, aside, emergency, photo }: Props) {
  return (
    <section className="bg-ink text-white">
      <div className="container-x grid gap-10 py-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-center lg:py-16">
        <div className="min-w-0">
          {crumbs && <Breadcrumbs items={crumbs} light />}
          <p className={`eyebrow mt-4 ${emergency ? "!text-[#ffb4a8]" : "!text-[#7fc8c9]"}`}>{eyebrow}</p>
          <h1 className="mt-3 text-4xl leading-tight font-semibold sm:text-5xl">{title}</h1>
          <div className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{lead}</div>
          <div className="mt-7 flex flex-wrap gap-3">
            <PhoneLink
              phone={site.phone}
              e164={site.phoneE164}
              label={`Call ${site.phone}`}
              location="hero"
              emergency={emergency}
              className={`btn ${emergency ? "btn-alert" : "btn-primary"}`}
            />
            <Link href={routes.request({ service })} className="btn btn-ghost-light">
              Request service
            </Link>
          </div>
          {facts.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-5 text-sm text-white/85">
              {facts.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-[#7fc8c9]" />
                  {f}
                </li>
              ))}
            </ul>
          )}
        </div>
        {photo ? (
          <div className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-2xl bg-ink-soft">
            <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        ) : (
          aside && <div className="min-w-0">{aside}</div>
        )}
      </div>
    </section>
  );
}

export function HeroPanel({ title, items }: { title: string; items: { icon: Parameters<typeof Icon>[0]["name"]; text: string }[] }) {
  return (
    <div className="rounded-2xl bg-ink-soft p-6 ring-1 ring-white/10">
      <p className="font-serif text-xl font-semibold">{title}</p>
      <ul className="mt-4 space-y-4">
        {items.map((i) => (
          <li key={i.text} className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/30 text-[#9fd8d9]">
              <Icon name={i.icon} className="h-5 w-5" />
            </span>
            <span className="text-white/85">{i.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
