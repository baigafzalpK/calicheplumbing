"use client";
import { track } from "@/lib/analytics";
import { Icon } from "./icons";

type Props = {
  phone: string;
  e164: string;
  className?: string;
  label?: string;
  emergency?: boolean;
  location?: string;
  icon?: boolean;
};

export function PhoneLink({ phone, e164, className = "btn btn-primary", label, emergency, location = "unknown", icon = true }: Props) {
  return (
    <a
      href={`tel:${e164}`}
      className={className}
      onClick={() => track(emergency ? "emergency_call_click" : "call_click", { location })}
    >
      {icon && <Icon name="phone" className="h-5 w-5" />}
      {label ?? phone}
    </a>
  );
}
