"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavGroup } from "./nav";
import { Icon } from "../icons";

type Props = {
  label: string;
  href: string;
  groups: NavGroup[];
  feature: { title: string; body: string; href: string; cta: string; alert?: boolean };
};

export function MegaMenu({ label, href, groups, feature }: Props) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const active = pathname.startsWith(href);
  const id = `mega-${label.toLowerCase()}`;

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const hover = (v: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(v), v ? 90 : 160);
  };

  return (
    <div onPointerEnter={hover(true)} onPointerLeave={hover(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={`relative flex h-12 items-center gap-1 px-2.5 font-semibold after:absolute after:inset-x-2.5 after:bottom-1.5 after:h-0.5 after:origin-left after:bg-teal after:transition-transform ${active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}
      >
        {label}
        <svg viewBox="0 0 20 20" className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true">
          <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </button>
      <div id={id} hidden={!open} className="absolute inset-x-0 top-full border-b border-line bg-white shadow-xl">
        <div className="container-x grid gap-8 py-8 lg:grid-cols-[1fr_3fr]">
          <div className={`rounded-2xl p-6 ${feature.alert ? "bg-alert-tint" : "bg-sand"}`}>
            <p className={`font-serif text-xl font-semibold ${feature.alert ? "text-alert" : ""}`}>{feature.title}</p>
            <p className="mt-2 text-sm text-muted">{feature.body}</p>
            <Link href={feature.href} className={`btn mt-4 ${feature.alert ? "btn-alert" : "btn-secondary"}`}>
              {feature.cta}
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {groups.map((g) => (
              <div key={g.title}>
                <Link href={g.href} className="flex items-center gap-2 font-semibold text-ink hover:text-teal-deep">
                  {g.icon && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-tint text-teal-deep">
                      <Icon name={g.icon} className="h-5 w-5" />
                    </span>
                  )}
                  {g.title}
                </Link>
                <ul className="mt-2 space-y-1">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="block py-1 text-sm text-muted hover:text-teal-deep">
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname.startsWith(href);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative flex h-12 items-center px-2.5 font-semibold after:absolute after:inset-x-2.5 after:bottom-1.5 after:h-0.5 after:origin-left after:bg-teal after:transition-transform ${active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}
    >
      {children}
    </Link>
  );
}
