import type { IconName } from "@/content/types";

// Monoline 1.5px icons.
const paths: Record<IconName, string> = {
  drop: "M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z",
  filter: "M4 5h16l-6 7v6l-4 2v-8L4 5z",
  slab: "M3 15h18M3 19h18M7 15v-4a5 5 0 0 1 10 0v4M12 6V3",
  pipe: "M3 8h8a3 3 0 0 1 3 3v10M3 12h6M18 3v6a3 3 0 0 1-3 3",
  flame: "M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4 2.5-5 .5 2 1.5 3 2.5 3 0-3-1-5 0-8z",
  gauge: "M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zM12 12l4-4M7 16h10",
  sprinkler: "M12 21v-8M8 13h8M12 9v.01M8 6l-2-2M16 6l2-2M12 5V3M5 10H3M21 10h-2",
  drain: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM8 12h8M12 8v8",
  gas: "M6 21V8l6-5 6 5v13M10 21v-5h4v5",
  alert: "M12 3l9.5 17h-19L12 3zM12 10v4M12 17v.01",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  check: "M5 12l5 5L20 7",
  pin: "M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  clock: "M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zM12 7v5l3 2",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z",
  wrench: "M14.5 5.5a4 4 0 0 0 5 5L11 19a2 2 0 0 1-3-3l8.5-8.5a4 4 0 0 0-2-2z",
  sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4",
  snow: "M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11M9 3.5l3 2 3-2M9 20.5l3-2 3 2",
};

export function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
