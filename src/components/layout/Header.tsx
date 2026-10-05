import Link from "next/link";
import { site, availability } from "@/content/site";
import { routes } from "@/lib/routes";
import { Logo } from "../Logo";
import { PhoneLink } from "../PhoneLink";
import { HeaderShell } from "./HeaderShell";
import { MegaMenu, NavLink } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { serviceGroups, locationGroups, companyLinks } from "./nav";

export function Header() {
  const services = serviceGroups();
  const locations = locationGroups();
  return (
    <header>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">
        Skip to content
      </a>
      <div className="bg-ink text-sm text-white/85">
        <div className="container-x flex h-9 items-center justify-between gap-4">
          <span className="truncate">Serving {site.marketLong}</span>
          <span className="hidden md:inline">{availability}</span>
          <span className="hidden lg:inline">Licensed, independent local plumbers</span>
        </div>
      </div>
      <HeaderShell>
        <Logo />
        <nav aria-label="Main" className="hidden flex-1 items-center justify-center lg:flex">
          <MegaMenu
            label="Services"
            href="/plumbing-services/"
            groups={services}
            feature={{
              title: "Plumbing emergency?",
              body: "Burst pipe, major leak or sewage backup. Shut off your main valve, then call.",
              href: routes.emergency(),
              cta: "Emergency plumbing",
              alert: true,
            }}
          />
          <MegaMenu
            label="Locations"
            href="/locations/"
            groups={locations}
            feature={{
              title: "All 50 states + DC",
              body: "Thousands of covered cities and towns. Pick your state, or check your ZIP code.",
              href: routes.locations(),
              cta: "All service areas",
            }}
          />
          <NavLink href={routes.resources()}>Resources</NavLink>
          <NavLink href={routes.about()}>About</NavLink>
          <span className="hidden xl:block">
            <NavLink href={routes.contact()}>Contact</NavLink>
          </span>
        </nav>
        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <div className="hidden text-right leading-tight sm:block">
            <span className="block text-xs text-muted">Call a plumber</span>
            <PhoneLink phone={site.phone} e164={site.phoneE164} location="header" className="font-serif text-xl font-semibold text-ink hover:text-teal-deep" icon={false} />
          </div>
          <Link href={routes.request()} className="btn btn-primary hidden md:inline-flex">
            Request service
          </Link>
          <MobileNav services={services} locations={locations} company={companyLinks} phone={site.phone} e164={site.phoneE164} />
        </div>
      </HeaderShell>
    </header>
  );
}
