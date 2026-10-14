import Link from "next/link";
import type { Category, Faq, Service } from "@/content/types";
import type { Crumb } from "@/lib/schema";
import { routes } from "@/lib/routes";
import { publishedArticles } from "@/content/articles";
import { categoryPhotos } from "@/content/photos";
import { availability } from "@/content/site";
import { Hero } from "../Hero";
import { Chip, FaqList } from "../ui";
import { CtaBand } from "../CtaBand";

// What each category covers and when it matters. Plain facts, no local claims.
export const categoryIntro: Record<string, { lead: string; when: string[]; faqs: Faq[] }> = {
  "hard-water": {
    lead: "Hard water carries dissolved calcium and magnesium that leave scale in water heaters, tankless units, fixtures and appliances. Treatment ranges from a whole-house softener to a reverse osmosis system for drinking water.",
    when: ["White crust on faucets and glass", "A water heater that rumbles or pops", "Short-lived faucet cartridges and fill valves", "Chlorine or mineral taste in tap water"],
    faqs: [{ q: "Do I need a softener or a filter?", a: "A softener removes hardness minerals that cause scale. A carbon filter improves taste and chlorine. Reverse osmosis purifies drinking water at one tap. Many homes in hard-water areas use a softener plus RO." }],
  },
  "hidden-leaks": {
    lead: "Hidden leaks run under slabs, inside walls and in ceilings, where you only see the water bill or a warm spot on the floor. Finding them without guesswork comes first; then a spot repair, reroute or repipe.",
    when: ["A water bill higher than last year's", "The meter's leak dial moves with everything off", "A warm spot on a tile or concrete floor", "Stains on drywall or ceilings"],
    faqs: [{ q: "How do plumbers find a hidden leak?", a: "They confirm it at the meter, isolate hot from cold and branch lines, then pinpoint it with acoustic listening and thermal imaging so only a small area is opened." }],
  },
  repiping: {
    lead: "Repiping replaces failing supply pipe: galvanized steel that has rusted inside, polybutylene from about 1978 to 1995, or copper with repeated pinhole leaks. Most homes are done in a few working days.",
    when: ["Rusty or low-pressure water", "Gray pipe stamped PB2110", "Two or more pinhole or slab leaks", "An inspector or insurer flagging the pipe"],
    faqs: [{ q: "PEX or copper?", a: "PEX is the most common choice today because it costs less, has fewer joints and tolerates freezing better. Copper is still a good option where codes or buyers prefer it." }],
  },
  "water-heaters": {
    lead: "Tank water heaters typically last 8 to 12 years. Replacement, tankless conversions, recirculation and descaling keep hot water reliable, with code items such as expansion tanks, relief valve lines and venting handled on the way.",
    when: ["Water around the tank", "Rusty or lukewarm hot water", "Rumbling or popping", "A tank more than about 10 years old"],
    faqs: [{ q: "Repair or replace?", a: "Elements, thermostats, igniters and valves are repairable. A leaking tank is not, so it gets replaced." }],
  },
  "pressure-supply": {
    lead: "The main line and pressure regulator control everything downstream. High pressure wears out fixtures and appliances; a leaking main line wastes water and money before it surfaces.",
    when: ["Banging pipes", "A dripping water heater relief valve", "A soggy patch in the yard", "Low pressure throughout the house"],
    faqs: [{ q: "What water pressure is too high?", a: "Most plumbing codes cap household pressure at 80 psi. A $10 gauge on a hose bib tells you where yours is." }],
  },
  "irrigation-backflow": {
    lead: "Backflow assemblies keep irrigation water out of the drinking supply and many water providers require yearly tests. Pressurized irrigation mainlines leak around the clock until they're found.",
    when: ["A testing notice from your water provider", "Water spitting from a backflow relief port", "A wet spot that never dries", "A cracked assembly after a freeze"],
    faqs: [{ q: "Who can test a backflow preventer?", a: "A certified backflow tester, who files the result with your water provider." }],
  },
  "drains-sewer": {
    lead: "Drain cleaning clears clogs; a camera inspection shows why they keep coming back; sewer line repair fixes cracked, root-filled or collapsed pipe with a spot repair, trenchless lining or replacement.",
    when: ["Several slow drains at once", "Gurgling when the washer drains", "Sewage smell or backups", "Recurring main-line clogs"],
    faqs: [{ q: "When is a camera inspection worth it?", a: "When a main-line clog comes back, before buying an older home, or before paying for sewer replacement." }],
  },
  "gas-lines": {
    lead: "Gas line work covers leaks, corroded pipe and new lines for ranges, dryers, generators and outdoor kitchens, followed by a pressure test. If you smell gas, leave first and call the utility from outside.",
    when: ["A rotten-egg smell (leave, then call)", "Adding a gas appliance", "Hissing near a gas line", "An old flexible connector"],
    faqs: [{ q: "Does new gas piping need a permit?", a: "Almost always, plus a pressure test and inspection." }],
  },
  "freeze-flood": {
    lead: "Cold climates bring frozen and burst pipes; basements and high water tables need sump pumps. Both are about keeping water where it belongs when the weather turns.",
    when: ["No water from a faucet on a freezing morning", "Water dripping after a cold night", "A sump pump that runs constantly", "Water in the basement after heavy rain"],
    faqs: [{ q: "What's the first step for a burst pipe?", a: "Shut off the main water valve, then turn off power to anything near the water and call a plumber." }],
  },
};

export function CategoryHub({ cat, services, path, crumbs, towns }: { cat: Category; services: Service[]; path: string; crumbs: Crumb[]; towns: { name: string; href: string }[] }) {
  const info = categoryIntro[cat.slug];
  const guides = publishedArticles.filter((a) => a.services.some((s) => services.some((x) => x.slug === s))).slice(0, 4);
  const faqs = [...info.faqs, ...services.flatMap((s) => s.faqs.slice(0, 1))].slice(0, 6);
  return (
    <main id="main">
      <Hero crumbs={crumbs} eyebrow="Plumbing services" title={cat.name} lead={<p>{info.lead}</p>} facts={[availability, `${services.length} services`]} photo={categoryPhotos[cat.slug]} />
      <section className="py-14">
        <div className="container-x space-y-12">
          <div>
            <h2 className="text-3xl font-semibold">Signs you need {cat.name.toLowerCase()} help</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {info.when.map((w) => (
                <li key={w} className="rounded-xl bg-white p-4 ring-1 ring-line">{w}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-semibold">{cat.name} services</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {services.map((s) => (
                <Link key={s.slug} href={routes.service(s.slug)} className="card block p-6 hover:text-teal-deep">
                  <h3 className="font-sans text-xl font-semibold">{s.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.answer}</p>
                </Link>
              ))}
            </div>
          </div>
          {guides.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold">Guides</h2>
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <Link href={routes.guide(g.slug)} className="card block p-5 font-semibold hover:text-teal-deep">{g.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {towns.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold">{cat.name} near you</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {towns.map((t) => (
                  <Chip key={t.href} href={t.href}>{t.name}</Chip>
                ))}
                <Chip href={routes.locations()}>All locations</Chip>
              </div>
            </div>
          )}
          <div className="max-w-4xl">
            <FaqList faqs={faqs} title={`${cat.name} FAQ`} />
          </div>
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="container-x">
          <h2 className="text-2xl font-semibold">Other plumbing services</h2>
          <p className="mt-2">
            <Link href={routes.services()} className="link">See every plumbing service</Link>
          </p>
        </div>
      </section>
      <CtaBand title={`Need ${cat.name.toLowerCase()} help?`} />
    </main>
  );
}
