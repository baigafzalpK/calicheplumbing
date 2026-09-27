import Link from "next/link";
import { site, availability } from "@/content/site";
import { routes } from "@/lib/routes";
import { PhoneLink } from "./PhoneLink";

export function CtaBand({ title = "Talk to a Valley plumber today", service }: { title?: string; service?: string }) {
  return (
    <section className="bg-ink py-14 text-white">
      <div className="container-x flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="mt-2 text-white/80">{availability}. One call connects you with a licensed plumber who serves your ZIP.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <PhoneLink phone={site.phone} e164={site.phoneE164} location="cta_band" label={`Call ${site.phone}`} />
          <Link href={routes.request({ service })} className="btn btn-ghost-light">
            Request service
          </Link>
        </div>
      </div>
    </section>
  );
}
