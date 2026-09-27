import { Logo } from "@/components/Logo";
import { site, DISCLOSURE } from "@/content/site";
import { PhoneLink } from "@/components/PhoneLink";
import { MobileActionBar } from "@/components/layout/MobileActionBar";

export default function LpLayout({ children }: { children: React.ReactNode }) {
  const phone = site.ppcPhone ?? site.phone;
  const e164 = site.ppcPhone ? `+1${site.ppcPhone.replace(/\D/g, "").slice(-10)}` : site.phoneE164;
  return (
    <>
      <header className="border-b border-line bg-white">
        <div className="container-x flex h-18 items-center justify-between gap-3 py-3">
          <Logo />
          <PhoneLink phone={phone} e164={e164} location="lp_header" className="btn btn-primary" />
        </div>
      </header>
      {children}
      <footer className="bg-ink pb-24 text-xs text-white/70 lg:pb-0">
        <div className="container-x space-y-2 py-6">
          <p>{DISCLOSURE}</p>
          <p className="flex gap-4">
            <span>© 2026 {site.name}</span>
            <a href="/privacy/" className="underline">Privacy</a>
            <a href="/terms/" className="underline">Terms</a>
          </p>
        </div>
      </footer>
      <MobileActionBar phone={phone} e164={e164} requestHref="#lead-form" />
    </>
  );
}
