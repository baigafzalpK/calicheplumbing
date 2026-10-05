import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { getService } from "@/content/services";
import { availability, site } from "@/content/site";
import { Breadcrumbs } from "@/components/ui";
import { LeadFormBlock } from "@/components/lead/LeadFormBlock";
import { PhoneLink } from "@/components/PhoneLink";

const path = routes.request();
export const metadata = pageMeta({
  title: "Request Plumbing Service",
  description: "Send a free request and get connected with a licensed plumber who serves your ZIP code.",
  path,
  noindex: true,
});

type P = { searchParams: Promise<{ service?: string; zip?: string }> };

export default async function Request({ searchParams }: P) {
  const q = await searchParams;
  const service = q.service && getService(q.service) ? q.service : undefined;
  const zip = q.zip && /^\d{5}$/.test(q.zip) ? q.zip : undefined;
  return (
    <main id="main" className="py-12">
      <div className="container-x grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div>
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Request service", path }]} />
          <h1 className="mt-4 text-4xl font-semibold">Request plumbing service</h1>
          <p className="mt-4 text-lg text-muted">Tell us what's going on. We'll connect you with an independent, licensed plumber who serves your ZIP code, and the plumber will quote before starting.</p>
          <p className="mt-6 font-semibold">Active leak? Calling is faster.</p>
          <p className="text-sm text-muted">{availability}.</p>
          <PhoneLink phone={site.phone} e164={site.phoneE164} location="request_page" className="btn btn-alert mt-3" label={`Call ${site.phone}`} emergency />
        </div>
        <LeadFormBlock defaultService={service} defaultZip={zip} id="request-form" />
      </div>
    </main>
  );
}
