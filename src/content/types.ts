// Content types. Shaped to match prisma/schema.prisma for a later move to a database.

export type Status = "DRAFT" | "REVIEW" | "PUBLISHED" | "NOINDEX" | "ARCHIVED";

export type Faq = { q: string; a: string };

export type CategorySlug =
  | "hard-water"
  | "hidden-leaks"
  | "repiping"
  | "water-heaters"
  | "pressure-supply"
  | "irrigation-backflow"
  | "drains-sewer"
  | "gas-lines"
  | "freeze-flood";

export type Category = {
  slug: CategorySlug;
  name: string;
  blurb: string;
  icon: IconName;
};

export type IconName =
  | "drop"
  | "filter"
  | "slab"
  | "pipe"
  | "flame"
  | "gauge"
  | "sprinkler"
  | "drain"
  | "gas"
  | "alert"
  | "phone"
  | "check"
  | "pin"
  | "clock"
  | "shield"
  | "wrench"
  | "sun"
  | "search"
  | "snow";

export type Service = {
  slug: string;
  name: string;
  shortName?: string;
  category: CategorySlug;
  status: Status;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  /** 1–3 sentence direct answer shown first on the page (AEO). */
  answer: string;
  intro: string[];
  signs: string[];
  process: { title: string; body: string }[];
  costFactors: string[];
  diy?: { safe: string[]; stop: string[] };
  faqs: Faq[];
  related: string[];
  isEmergencyCapable: boolean;
  /** Facts rendered in the "at a glance" <dl>. */
  glance: { term: string; detail: string }[];
  updated: string;
};

export type State = {
  slug: string;
  name: string;
  abbr: string;
  status: Status;
  intro: string;
  details: { heading: string; body: string }[];
  faqs: Faq[];
  updated: string;
};

export type City = {
  slug: string;
  name: string;
  stateSlug: string;
  county: string;
  region: string;
  status: Status;
  /** Only a real, staffed office. Service-area business otherwise. */
  officeAddress: string | null;
  zips: string[];
  areas: string[];
  intro: string;
  housingNotes: string;
  localIssues: { title: string; body: string }[];
  popularServices: string[];
  nearby: string[];
  water: string | null;
  permits: string | null;
  faqs: Faq[];
  updated: string;
  /** Census profile of the covered ZIP codes. Present on generated (data-driven) pages. */
  profile?: PlaceProfile;
  /** Covered towns near this one that don't have their own page. */
  alsoCovered?: { name: string; mi: number }[];
  /** Hand-written page (true) or composed from coverage + Census data (false). */
  curated?: boolean;
};

export type PlaceProfile = {
  pop: number;
  units: number;
  built: { pre1940: number; y1940_59: number; y1960_79: number; y1980_99: number; y2000p: number };
  heat: { gas: number; lp: number; electric: number; oil: number };
  detached: number | null;
  owner: number | null;
};

export type CityService = {
  /** Defaults to "arizona" for the original hand-written pages. */
  stateSlug?: string;
  citySlug: string;
  serviceSlug: string;
  status: Status;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  answer: string;
  localAngle: string[];
  localFaqs: Faq[];
  updated: string;
};

export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  category: "Hard water" | "Leaks" | "Water heaters" | "Pipes" | "Outdoor" | "Drains" | "Emergencies";
  status: Status;
  answer: string;
  sections: { heading: string; body: string[]; list?: string[] }[];
  whenToCall: string[];
  faqs: Faq[];
  services: string[];
  relatedArticles: string[];
  published: string;
  updated: string;
  reviewedBy: string | null;
};

export type Review = {
  id: string;
  author: string;
  city: string;
  rating: 1 | 2 | 3 | 4 | 5;
  body: string;
  date: string;
  source: "Google";
  verified: true;
};

export type LandingPage = {
  slug: string;
  service: string;
  canonical: string;
  headline: string;
  sub: string;
  bullets: string[];
  signs: string[];
  expect: string[];
  faqs: Faq[];
  /** Whitelisted ?kw= values → headline. Arbitrary text is never reflected. */
  kw: Record<string, string>;
};
