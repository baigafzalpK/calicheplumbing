import Link from "next/link";
import { publishedServices } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { graph, ids, pageGraph } from "@/lib/schema";
import { availability, site } from "@/content/site";
import { Hero } from "@/components/Hero";
import { photos } from "@/content/photos";
import { FaqList, JsonLd, ServiceCard } from "@/components/ui";
import { LeadFormBlock } from "@/components/lead/LeadFormBlock";
import { CtaBand } from "@/components/CtaBand";

const title = "Emergency Plumber: What to Do Right Now";
const description =
  "Burst pipe, major leak, sewer backup or gas smell? What to do right now, where your shutoff is, and how to reach a licensed local plumber fast.";
const path = routes.emergency();

const faqs = [
  { q: "Where is the main water shutoff?", a: "In basement homes, usually on the front wall where the main enters, next to the meter. In slab homes, often near the front hose bib or in the garage by the water heater. The curb box or meter pit at the street has a shutoff too, which may need a meter key." },
  { q: "What should I do if a pipe froze or burst?", a: "Shut off the main, open the faucets on that line, and turn off power to anything near the water. Thaw an intact pipe gently with a hair dryer, never an open flame. If it has split, keep the water off and call." },
  { q: "What counts as a plumbing emergency?", a: "Water you can't stop, sewage backing up, water near electrical, no water at all, or a gas smell (leave and call the gas utility or 911 first)." },
  { q: `Is emergency service available ${site.emergency247 ? "24/7" : "at night"}?`, a: site.emergency247 ? "Yes, emergency calls are answered 24/7." : "Availability after hours depends on the plumbers serving your area. Call and we'll connect you with whoever is available." },
];

export const metadata = pageMeta({ title, description, path });

export default function Emergency() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Emergency plumbing", path },
  ];
  const list = publishedServices.filter((s) => s.isEmergencyCapable);
  return (
    <main id="main">
      <JsonLd data={graph(pageGraph({ path, name: title, description, crumbs, faqs, about: [ids.org] }))} />
      <Hero
        emergency
        crumbs={crumbs}
        eyebrow="Emergency plumbing"
        title="Plumbing emergency? Stop the water, then call"
        lead={<p>Close your main shutoff first. In basement homes it's usually where the main enters by the meter; in slab homes, near the front hose bib or the water heater. Then call and we'll connect you with a licensed plumber who serves your ZIP code.</p>}
        facts={[availability, "Burst pipes · slab leaks · sewer backups"]}
        photo={photos.wrench}
      />
      <section className="py-14">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="min-w-0 space-y-10">
            <div className="prose-cp text-lg">
              <h2 className="mb-4 text-3xl font-semibold">What to do in the first 10 minutes</h2>
              <p>
                Stop the water, make the area safe, then limit damage by moving valuables, mopping and running fans. Photograph everything for insurance before cleanup. The full checklist is in our{" "}
                <Link href={routes.guide("burst-pipe-what-to-do")} className="link">burst pipe guide</Link>. If you smell gas, follow the{" "}
                <Link href={routes.guide("smell-gas-what-to-do")} className="link">gas smell steps</Link> instead.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold">Urgent problems plumbers handle</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {list.map((s) => (
                  <ServiceCard key={s.slug} s={s} />
                ))}
              </div>
            </div>
            <FaqList faqs={faqs} />
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <LeadFormBlock compact id="emergency-form" />
          </aside>
        </div>
      </section>
      <CtaBand title="Water you can't stop? Call now" />
    </main>
  );
}
