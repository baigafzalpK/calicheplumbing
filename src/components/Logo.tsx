import Link from "next/link";

// Stratified-ground mark (three caliche strata with a pipe drop) + wordmark.
export function LogoMark({ className = "h-9 w-9", light = false }: { className?: string; light?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="9" fill={light ? "#2a7f83" : "#1b2b34"} />
      <path d="M7 22h26" stroke="#e8c9a0" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M7 27.5h26" stroke="#d6a36a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M7 33h26" stroke="#c2410c" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 6v9" stroke="#7fc8c9" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 10h12" stroke="#7fc8c9" strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="18" r="1.6" fill="#7fc8c9" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Caliche Plumbing home">
      <LogoMark light={light} />
      <span className="leading-none">
        <span className={`block font-serif text-2xl font-semibold ${light ? "text-white" : "text-ink"}`}>Caliche</span>
        <span className={`block text-[0.65rem] font-bold tracking-[0.28em] ${light ? "text-teal-tint" : "text-teal-deep"}`}>PLUMBING</span>
      </span>
    </Link>
  );
}
