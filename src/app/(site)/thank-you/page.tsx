import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { site } from "@/content/site";
import { PhoneLink } from "@/components/PhoneLink";

export const metadata = pageMeta({ title: "Request Received", description: "Thanks, your plumbing request was received.", path: routes.thankYou(), noindex: true });

type P = { searchParams: Promise<{ t?: string }> };

export default async function ThankYou({ searchParams }: P) {
  const t = (await searchParams).t;
  return (
    <main id="main" className="py-16">
      <div className="container-x max-w-2xl text-center">
        <h1 className="text-4xl font-semibold">{t === "o" ? "We got your request" : "Request received"}</h1>
        {t === "e" && (
          <div className="mt-6 rounded-2xl bg-alert-tint p-6 text-left">
            <p className="font-semibold text-alert">If water is still running, shut off your main valve now.</p>
            <p className="mt-2">A plumber will call you shortly. For the fastest help, call us now.</p>
            <PhoneLink phone={site.phone} e164={site.phoneE164} emergency location="thank_you" className="btn btn-alert mt-4" label={`Call ${site.phone}`} />
          </div>
        )}
        {t === "o" && (
          <p className="mt-6 text-lg text-muted">Your ZIP code may be outside our current network. We'll try to find a licensed plumber for you, and if we can't, we'll let you know.</p>
        )}
        {!t && <p className="mt-6 text-lg text-muted">A licensed plumber who serves your area will contact you by your preferred method, usually within business hours. Keep your phone handy.</p>}
        <div className="mt-10 grid gap-3 text-left sm:grid-cols-2">
          <Link href={routes.resources()} className="card p-5 font-semibold hover:text-teal-deep">
            Read guides while you wait
          </Link>
          <Link href={routes.emergency()} className="card p-5 font-semibold hover:text-teal-deep">
            Emergency steps
          </Link>
        </div>
      </div>
    </main>
  );
}
