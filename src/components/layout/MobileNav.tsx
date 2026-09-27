"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { NavGroup } from "./nav";

type Props = {
  services: NavGroup[];
  locations: NavGroup[];
  company: { name: string; href: string }[];
  phone: string;
  e164: string;
};

// Rendered through a portal: the header's backdrop-filter would trap position:fixed children.
export function MobileNav({ services, locations, company, phone, e164 }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const drawer = (
    <div className={`fixed inset-0 z-50 overflow-hidden lg:hidden ${open ? "" : "invisible"}`} inert={!open} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-ink/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setOpen(false)} />
      <nav
        aria-label="Mobile"
        className={`absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-white transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-line p-4">
          <span className="font-serif text-xl font-semibold">Menu</span>
          <button ref={closeRef} onClick={() => setOpen(false)} className="btn btn-secondary min-h-11 px-3" aria-label="Close menu">
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <Link href="/emergency-plumbing/" className="block rounded-xl bg-alert-tint p-4">
            <span className="font-semibold text-alert">Plumbing emergency?</span>
            <span className="mt-1 block text-sm text-muted">Shut off the main, then call.</span>
          </Link>
          <a href={`tel:${e164}`} className="btn btn-alert mt-3 w-full">
            Call {phone}
          </a>
          <p className="mt-6 text-sm font-semibold tracking-wider text-muted uppercase">Services</p>
          {services.map((g) => (
            <details key={g.title} className="border-b border-line">
              <summary className="flex min-h-12 cursor-pointer items-center justify-between font-semibold">{g.title}</summary>
              <ul className="pb-3">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="block py-2 pl-3 text-muted">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
          <p className="mt-6 text-sm font-semibold tracking-wider text-muted uppercase">Areas</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {locations.flatMap((g) => g.links).map((l) => (
              <Link key={l.href} href={l.href} className="rounded-lg bg-sand px-3 py-2.5 text-sm font-medium">
                {l.name}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm font-semibold tracking-wider text-muted uppercase">Company</p>
          <ul>
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block py-2.5 font-medium">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-line p-4">
          <Link href="/request-service/" className="btn btn-primary w-full">
            Request service
          </Link>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn btn-secondary min-h-11 px-3 lg:hidden" aria-label="Open menu" aria-expanded={open}>
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
      {mounted && createPortal(drawer, document.body)}
    </>
  );
}
