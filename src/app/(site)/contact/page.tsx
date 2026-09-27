import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { graph, ids, pageGraph } from "@/lib/schema";
import { availability, site } from "@/content/site";
import { JsonLd } from "@/components/ui";
import { SimplePage } from "@/components/SimplePage";
import { PhoneLink } from "@/components/PhoneLink";
import { LeadFormBlock } from "@/components/lead/LeadFormBlock";

const title = "Contact Caliche Plumbing";
const description = "Call or send a request to get connected with a licensed plumber in the Phoenix metro. Emergencies: shut off your main valve and call.";
const path = routes.contact();
export const metadata = pageMeta({ title, description, path });

export default function Contact() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path },
  ];
  return (
    <>
      <JsonLd data={graph(pageGraph({ path, name: title, description, type: "ContactPage", crumbs, about: [ids.org] }))} />
      <SimplePage title="Contact us" crumbs={crumbs} lead={`${availability}. Calling is fastest.`}>
        <div className="not-prose grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="!mt-0">Call</h2>
            <PhoneLink phone={site.phone} e164={site.phoneE164} location="contact" label={`Call ${site.phone}`} />
            {site.email && (
              <p className="mt-6">
                Email: <a href={`mailto:${site.email}`} className="link">{site.email}</a>
              </p>
            )}
            {site.hours && <p>Hours: {site.hours}</p>}
            <p className="mt-6 text-base text-muted">
              {site.name} is a service-area referral business with no walk-in office. Plumbing work is done by independent, licensed contractors.
            </p>
          </div>
          <LeadFormBlock compact />
        </div>
      </SimplePage>
    </>
  );
}
