import { publishedServices } from "@/content/services";
import { site } from "@/content/site";
import { LeadForm } from "./LeadForm";

export function LeadFormBlock(props: { defaultService?: string; defaultZip?: string; id?: string; compact?: boolean; phone?: string; e164?: string }) {
  const services = publishedServices.map((s) => ({ value: s.slug, label: s.name }));
  return (
    <LeadForm
      services={services}
      defaultService={props.defaultService}
      defaultZip={props.defaultZip}
      phone={props.phone ?? site.phone}
      e164={props.e164 ?? site.phoneE164}
      id={props.id}
      compact={props.compact}
    />
  );
}
