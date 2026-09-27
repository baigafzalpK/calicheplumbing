import type { ReactNode } from "react";
import type { Crumb } from "@/lib/schema";
import { Breadcrumbs } from "./ui";

export function SimplePage({ title, crumbs, children, lead }: { title: string; crumbs: Crumb[]; children: ReactNode; lead?: string }) {
  return (
    <main id="main">
      <section className="bg-ink py-12 text-white">
        <div className="container-x max-w-4xl">
          <Breadcrumbs items={crumbs} light />
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{title}</h1>
          {lead && <p className="mt-4 max-w-2xl text-lg text-white/85">{lead}</p>}
        </div>
      </section>
      <section className="py-12">
        <div className="container-x prose-cp max-w-4xl text-lg [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-3xl [&_h2]:font-semibold">{children}</div>
      </section>
    </main>
  );
}
