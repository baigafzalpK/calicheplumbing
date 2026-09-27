import Link from "next/link";
import { site, DISCLOSURE } from "@/content/site";
import { routes } from "@/lib/routes";
import { Logo } from "../Logo";
import { serviceGroups, locationGroups, companyLinks } from "./nav";

export function Footer() {
  const services = serviceGroups();
  const cities = locationGroups().flatMap((g) => g.links);
  return (
    <footer className="bg-ink pb-24 text-white/85 lg:pb-0">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm">Plumbing help for {site.marketLong}, connected to independent, licensed local plumbers.</p>
          <a href={`tel:${site.phoneE164}`} className="mt-4 block font-serif text-2xl font-semibold text-white">
            {site.phone}
          </a>
          {site.email && <a href={`mailto:${site.email}`} className="mt-1 block text-sm underline">{site.email}</a>}
          {site.hours && <p className="mt-1 text-sm">{site.hours}</p>}
        </div>
        <div>
          <h2 className="font-sans text-sm font-semibold tracking-wider text-white uppercase">Services</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {services.map((g) => (
              <li key={g.title}>
                <Link href={g.href} className="hover:text-white hover:underline">{g.title}</Link>
              </li>
            ))}
            <li><Link href={routes.emergency()} className="hover:text-white hover:underline">Emergency plumbing</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-sm font-semibold tracking-wider text-white uppercase">Service areas</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
            {cities.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="hover:text-white hover:underline">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-sm font-semibold tracking-wider text-white uppercase">Company</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-white hover:underline">{l.name}</Link></li>
            ))}
            <li><Link href={routes.request()} className="hover:text-white hover:underline">Request service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container-x space-y-3 py-6 text-xs text-white/70">
          <p>{DISCLOSURE}</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>© 2026 {site.name}</span>
            <Link href={routes.privacy()} className="underline">Privacy</Link>
            <Link href={routes.terms()} className="underline">Terms</Link>
            <Link href={routes.accessibility()} className="underline">Accessibility</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
