import type { City, CityService, State } from "./types";
import { citiesMore } from "./locationsMore";
import { extraIssues } from "./locationDepth";

const U = "2026-09-27";

export const states: State[] = [
  {
    slug: "arizona",
    name: "Arizona",
    abbr: "AZ",
    status: "PUBLISHED",
    intro:
      "Caliche Plumbing connects homeowners across the Phoenix metro in Maricopa County with independent, licensed plumbers. The Valley's plumbing problems are distinct: some of the hardest water in the country, homes built on concrete slabs, long hot summers, and a housing boom that left many homes with polybutylene or aging copper.",
    details: [
      {
        heading: "Housing stock",
        body: "Central Phoenix, Tempe and parts of Glendale and Mesa hold mid-century ranch homes with galvanized supply lines and cast iron drains. The 1978–1995 boom across Mesa, Glendale, Peoria, Sun City West and Phoenix put polybutylene in many homes. Most of the West Valley, Surprise, Goodyear and Gilbert was built after 1995 with copper or PEX. Almost all of it sits on slab foundations.",
      },
      {
        heading: "Water and utilities",
        body: "Most Valley cities run their own water utilities, blending Salt and Verde river water, Colorado River water delivered by the Central Arizona Project, and groundwater. EPCOR and Liberty Utilities serve some communities, including Sun City, Sun City West and Litchfield Park. Hardness varies by source and season but is high almost everywhere. Southwest Gas serves most of the metro, and parts of Mesa are served by the City of Mesa's own gas utility.",
      },
      {
        heading: "Permits and licensing",
        body: "Cities and towns issue plumbing permits for their own residents. In unincorporated areas such as Sun City, Sun City West and New River, Maricopa County handles permits and inspections. Plumbing contractors are licensed by the Arizona Registrar of Contractors (ROC), and anyone can look up a license on the ROC website.",
      },
      {
        heading: "Climate",
        body: "Summer heat stresses water heaters in garages and attics, cooks exposed irrigation lines, and makes outdoor hose bibs deliver scalding water. Hard freezes are rare, but a few winter nights in the 20s can crack exposed backflow assemblies and pool equipment plumbing.",
      },
    ],
    faqs: [
      { q: "How do I check a plumber's license in Arizona?", a: "Search the contractor's name or license number on the Arizona Registrar of Contractors (ROC) website. It shows license class, status and complaint history." },
      { q: "Does Maricopa County or my city issue plumbing permits?", a: "Incorporated cities and towns issue their own permits. Unincorporated communities like Sun City and Sun City West go through Maricopa County." },
    ],
    updated: U,
  },
];

export const regions = [
  { slug: "phoenix", name: "Phoenix & Paradise Valley" },
  { slug: "northeast", name: "Northeast Valley" },
  { slug: "west", name: "West Valley" },
  { slug: "northwest", name: "Northwest Valley" },
  { slug: "east", name: "East Valley" },
] as const;

const core: City[] = [
  {
    slug: "phoenix",
    name: "Phoenix",
    stateSlug: "arizona",
    county: "Maricopa",
    region: "phoenix",
    status: "PUBLISHED",
    officeAddress: null,
    zips: ["85003", "85004", "85006", "85008", "85013", "85014", "85015", "85016", "85018", "85020", "85021", "85022", "85023", "85024", "85028", "85029", "85032", "85033", "85035", "85041", "85042", "85044", "85048", "85050", "85054", "85083", "85085", "85086"],
    areas: ["Arcadia", "Willo & Encanto", "Maryvale", "Moon Valley", "Deer Valley", "Desert Ridge", "Ahwatukee", "Laveen", "South Mountain", "Paradise Valley Village"],
    intro:
      "Phoenix covers everything from 1920s bungalows in the Willo and Encanto districts to postwar ranch tracts in Maryvale and the 2000s subdivisions of Desert Ridge and north Phoenix. The plumbing problems follow the age of the house: galvanized pipe and cast iron in the older core, polybutylene and copper pinholes in 1980s and early-1990s neighborhoods, and hard-water damage to water heaters and fixtures everywhere.",
    housingNotes:
      "Central Phoenix homes built before about 1960 often still have galvanized supply lines that rust shut from the inside and cast iron drains that scale and crack under the slab. Maryvale and the neighborhoods around it were built quickly in the 1950s and 60s and are now due for main-line and drain work. North Phoenix and Ahwatukee grew in the 1980s and 90s, so polybutylene and copper slab leaks both show up there.",
    localIssues: [
      { title: "Slab leaks on hot lines", body: "Copper hot lines under the slab rub and expand against concrete. A warm spot on the floor or a bill spike is the usual first sign. See [slab leak detection](/plumbing-services/slab-leak-detection/)." },
      { title: "Galvanized and cast iron in the core", body: "Older central neighborhoods like Arcadia and the historic districts often need repiping and sewer camera work when homes change hands." },
      { title: "Heat on garage water heaters", body: "Most tanks sit in garages that bake in summer. Combined with hard water, that shortens tank life." },
    ],
    popularServices: ["slab-leak-detection", "slab-leak-repair", "water-heater-replacement", "whole-house-repiping", "water-softener-installation", "drain-cleaning"],
    nearby: ["paradise-valley", "glendale", "scottsdale", "tempe"],
    water: "City of Phoenix Water Services supplies most homes, blending Salt and Verde river water, Colorado River water from the CAP canal, and groundwater. Hardness varies by treatment plant and season.",
    permits: "The City of Phoenix Planning & Development Department issues plumbing permits for repipes, water heater replacements, sewer work and gas lines.",
    faqs: [
      { q: "Do I need a permit to replace a water heater in Phoenix?", a: "The City of Phoenix requires a permit for water heater replacements. A licensed plumber normally pulls it as part of the job." },
      { q: "Why do so many Phoenix homes get slab leaks?", a: "Most homes are on slabs, many have copper under the concrete, and hot-line expansion plus hard water wear the pipe over time." },
    ],
    updated: U,
  },
  {
    slug: "scottsdale",
    name: "Scottsdale",
    stateSlug: "arizona",
    county: "Maricopa",
    region: "northeast",
    status: "PUBLISHED",
    officeAddress: null,
    zips: ["85250", "85251", "85254", "85255", "85257", "85258", "85259", "85260", "85262", "85266"],
    areas: ["Old Town", "McCormick Ranch", "Gainey Ranch", "Scottsdale Ranch", "Grayhawk", "DC Ranch", "McDowell Mountain Ranch", "Troon", "Pinnacle Peak"],
    intro:
      "Scottsdale runs from 1950s and 60s ranch homes in south Scottsdale to master-planned 1970s–90s communities like McCormick Ranch and Scottsdale Ranch, then to large custom homes in north Scottsdale near Troon and Pinnacle Peak. High-end fixtures, big water heaters and long runs to far bathrooms make hard-water protection and hot-water recirculation especially valuable here.",
    housingNotes:
      "South Scottsdale's older homes have galvanized and early copper piping and cast iron drains. McCormick Ranch and the central master-planned areas date largely from the 1970s through the 1990s, which puts some homes in the polybutylene window. North Scottsdale's custom homes often have multiple water heaters, recirculation loops, pool and fountain plumbing, and in some outlying areas private septic systems.",
    localIssues: [
      { title: "Hard water on expensive fixtures", body: "Scale ruins high-end valves, shower glass and tankless heaters quickly. See [water softener installation](/plumbing-services/water-softener-installation/)." },
      { title: "Long runs to hot water", body: "Large single-level floor plans mean long waits for hot water; recirculation solves it." },
      { title: "Septic on outlying lots", body: "Some properties in far north Scottsdale are on septic rather than city sewer, which changes how drain problems are handled." },
    ],
    popularServices: ["water-softener-installation", "reverse-osmosis-systems", "tankless-water-heaters", "hot-water-recirculation", "slab-leak-detection", "gas-appliance-hookup"],
    nearby: ["paradise-valley", "phoenix", "cave-creek", "tempe"],
    water: "Scottsdale Water supplies most homes from Colorado River water delivered by the CAP canal, Salt and Verde river water, and groundwater.",
    permits: "The City of Scottsdale's One Stop Shop handles plumbing permits and inspections.",
    faqs: [
      { q: "Is Scottsdale water hard?", a: "Yes. Like the rest of the Valley, Scottsdale's water is hard enough that softeners are common, especially in homes with tankless heaters or glass showers." },
      { q: "Who issues plumbing permits in Scottsdale?", a: "The City of Scottsdale, through its One Stop Shop. The plumber usually pulls the permit." },
    ],
    updated: U,
  },
  {
    slug: "paradise-valley",
    name: "Paradise Valley",
    stateSlug: "arizona",
    county: "Maricopa",
    region: "phoenix",
    status: "PUBLISHED",
    officeAddress: null,
    zips: ["85253"],
    areas: ["Camelback Mountain foothills", "Mummy Mountain", "Clearwater Hills", "Cheney Estates", "Doubletree Ranch Road corridor"],
    intro:
      "Paradise Valley is a town of large residential lots between Camelback and Mummy Mountains, with custom homes from the 1950s to today. Its plumbing is unusual for the Valley: much of the town has historically relied on septic systems rather than a municipal sewer, and water comes from more than one provider depending on the street.",
    housingNotes:
      "Homes range from original 1950s–70s ranch houses on acre lots to recent teardown-and-rebuild estates. Older homes may have galvanized supply lines, long main lines from the street, and aging septic systems. Newer estates often have several water heaters, recirculation, pool and fountain equipment, and whole-house water treatment.",
    localIssues: [
      { title: "Septic and sewer", body: "Many properties use septic systems, so slow drains may point to the tank or leach field rather than a clog. A [sewer camera inspection](/plumbing-services/sewer-camera-inspection/) helps tell the difference." },
      { title: "Long main lines", body: "Big lots mean long runs from the meter to the house, and a leak there can go unnoticed until the bill arrives." },
      { title: "Hillside pressure", body: "Homes at different elevations see different street pressure, so pressure regulators matter." },
    ],
    popularServices: ["main-water-line-repair", "pressure-regulator-valve", "water-softener-installation", "hot-water-recirculation", "sewer-camera-inspection", "gas-line-repair"],
    nearby: ["scottsdale", "phoenix"],
    water: "Water service in Paradise Valley is split between EPCOR and the City of Phoenix, depending on location. Your bill shows which provider serves you.",
    permits: "The Town of Paradise Valley issues building and plumbing permits. Septic work also involves Maricopa County Environmental Services.",
    faqs: [
      { q: "Is my Paradise Valley home on septic or sewer?", a: "Many homes in town use septic. Your property records, a past inspection report, or a camera inspection of the main drain will confirm it." },
      { q: "Who supplies water in Paradise Valley?", a: "EPCOR serves much of the town and the City of Phoenix serves other parts. Check your water bill." },
    ],
    updated: U,
  },
  {
    slug: "cave-creek",
    name: "Cave Creek",
    stateSlug: "arizona",
    county: "Maricopa",
    region: "northeast",
    status: "PUBLISHED",
    officeAddress: null,
    zips: ["85331"],
    areas: ["Town core", "Desert Hills", "Tatum Ranch", "Black Mountain", "Rancho Mañana"],
    intro:
      "Cave Creek sits in the foothills north of Phoenix, with rocky, caliche-heavy ground and many homes on private or shared wells and septic systems. Plumbing calls here often involve well water treatment, long water and gas runs across acre lots, and digging through ground that doesn't want to be dug.",
    housingNotes:
      "Housing ranges from older ranch properties and manufactured homes on large lots to custom homes and the 1990s–2000s Tatum Ranch area. Homes on wells may have pressure tanks, storage tanks and booster pumps. Many homes outside the town core use septic systems.",
    localIssues: [
      { title: "Well water treatment", body: "Well water can be very hard and may carry sediment or iron, so filtration and softening are common upgrades. See [whole-house filtration](/plumbing-services/whole-house-filtration/)." },
      { title: "Rock and caliche", body: "Repairing or replacing yard lines often means cutting through rock and caliche, which affects time and equipment." },
      { title: "Freeze exposure", body: "Higher elevation than central Phoenix means somewhat colder winter nights, so exposed pipes and backflow assemblies need protection." },
    ],
    popularServices: ["whole-house-filtration", "water-softener-installation", "main-water-line-repair", "backflow-testing", "gas-line-repair", "water-heater-replacement"],
    nearby: ["scottsdale", "phoenix"],
    water: "Some homes are served by the Town of Cave Creek's water utility; many others rely on private or shared wells or hauled water.",
    permits: "The Town of Cave Creek issues building permits within town limits. Septic permits go through Maricopa County Environmental Services.",
    faqs: [
      { q: "Can a plumber help with well water problems in Cave Creek?", a: "Plumbers handle treatment, pressure tanks and house plumbing on well systems. Well pumps and drilling are usually a separate well contractor." },
      { q: "Who issues permits in Cave Creek?", a: "The Town of Cave Creek for work inside town limits. Maricopa County for septic and for unincorporated areas nearby." },
    ],
    updated: U,
  },
  {
    slug: "glendale",
    name: "Glendale",
    stateSlug: "arizona",
    county: "Maricopa",
    region: "west",
    status: "PUBLISHED",
    officeAddress: null,
    zips: ["85301", "85302", "85303", "85304", "85305", "85306", "85307", "85308", "85310"],
    areas: ["Historic Downtown & Catlin Court", "Arrowhead Ranch", "Sahuaro Ranch", "Westgate", "Bellair", "Thunderbird"],
    intro:
      "Glendale grew outward from its historic downtown: mid-century neighborhoods in the south, heavy 1980s and 90s building across the middle, including Arrowhead Ranch, and newer homes near Westgate and Luke Air Force Base. That spread makes Glendale one of the Valley's most common places to find polybutylene, alongside copper slab leaks and aging water heaters.",
    housingNotes:
      "Homes south of Northern Avenue skew older, with galvanized supply and cast iron drains. Neighborhoods from roughly 1978 to 1995, which covers a large share of the city, may have polybutylene supply lines. Arrowhead Ranch homes around lakes and golf courses often have large irrigation systems with backflow assemblies.",
    localIssues: [
      { title: "Polybutylene era homes", body: "A large share of the housing was built during the polybutylene years. See [polybutylene replacement](/plumbing-services/polybutylene-replacement/)." },
      { title: "Irrigation and backflow", body: "Big lots and landscaped HOAs mean many backflow assemblies and irrigation mainlines." },
      { title: "Older drains downtown", body: "Cast iron drains in the older core scale up and crack under slabs." },
    ],
    popularServices: ["polybutylene-replacement", "whole-house-repiping", "slab-leak-detection", "water-heater-replacement", "backflow-testing", "drain-cleaning"],
    nearby: ["peoria", "phoenix", "avondale", "sun-city"],
    water: "The City of Glendale supplies water from Salt River Project surface water, CAP Colorado River water, and groundwater.",
    permits: "The City of Glendale's Building Safety division issues plumbing permits.",
    faqs: [
      { q: "Does my Glendale home have polybutylene?", a: "If it was built between about 1978 and 1995, check the pipe at the water heater and under sinks for gray pipe stamped PB2110." },
      { q: "Who issues plumbing permits in Glendale?", a: "The City of Glendale Building Safety division." },
    ],
    updated: U,
  },
  {
    slug: "peoria",
    name: "Peoria",
    stateSlug: "arizona",
    county: "Maricopa",
    region: "west",
    status: "PUBLISHED",
    officeAddress: null,
    zips: ["85345", "85381", "85382", "85383"],
    areas: ["Old Town Peoria", "Fletcher Heights", "Westwing", "Vistancia", "Terramar", "Lake Pleasant area"],
    intro:
      "Peoria stretches from its small historic core near Grand Avenue north toward Lake Pleasant, with most homes built from the 1980s onward. South Peoria's 1980s and early-90s homes bring polybutylene and copper slab leaks, while north Peoria's newer communities mostly deal with hard water, water heaters and irrigation.",
    housingNotes:
      "Neighborhoods south of Bell Road are largely 1980s and 1990s construction. North Peoria, including Fletcher Heights, Westwing and Vistancia, is mainly 2000s and later, with PEX or copper supply and softener loops already plumbed. Many newer homes have larger lots with extensive drip irrigation.",
    localIssues: [
      { title: "Softener loops, but no softener", body: "Many north Peoria homes were built with a softener loop and never had a unit installed. See [water softener installation](/plumbing-services/water-softener-installation/)." },
      { title: "Irrigation mainline leaks", body: "Large desert landscapes mean long pressurized irrigation lines that leak quietly." },
      { title: "1980s slab plumbing", body: "South Peoria homes are at the age where copper slab leaks and PRV failures are common." },
    ],
    popularServices: ["water-softener-installation", "irrigation-leak-repair", "slab-leak-detection", "pressure-regulator-valve", "water-heater-replacement", "polybutylene-replacement"],
    nearby: ["glendale", "sun-city", "surprise", "sun-city-west"],
    water: "The City of Peoria supplies most homes, with EPCOR serving some areas.",
    permits: "The City of Peoria issues plumbing permits.",
    faqs: [
      { q: "Does my Peoria home have a softener loop?", a: "Many homes built since the late 1990s do. Look in the garage for two capped pipes near the water heater or the main line." },
      { q: "Who issues plumbing permits in Peoria?", a: "The City of Peoria's building division." },
    ],
    updated: U,
  },
];

export const cities: City[] = [...core, ...citiesMore].map((c) => ({ ...c, localIssues: [...c.localIssues, ...(extraIssues[c.slug] ?? [])] }));
export const publishedCities = cities.filter((c) => c.status === "PUBLISHED");

export function getState(slug: string) {
  return states.find((s) => s.slug === slug);
}
export function getCity(stateSlug: string, slug: string) {
  return cities.find((c) => c.stateSlug === stateSlug && c.slug === slug);
}
export function cityBySlug(slug: string) {
  return cities.find((c) => c.slug === slug);
}
export function cityLabel(c: City) {
  const st = states.find((s) => s.slug === c.stateSlug);
  return `${c.name}, ${st?.abbr ?? ""}`;
}

export const cityServices: CityService[] = [
  {
    citySlug: "phoenix",
    serviceSlug: "slab-leak-repair",
    status: "PUBLISHED",
    h1: "Slab leak repair in Phoenix",
    seoTitle: "Slab Leak Repair in Phoenix, AZ",
    metaDescription:
      "Slab leak repair for Phoenix homes: why copper hot lines fail under Valley slabs, spot repair vs. attic reroute, and City of Phoenix permits.",
    answer:
      "Phoenix slab leaks are most often on copper hot-water lines under the concrete. Most Phoenix plumbers recommend rerouting the line through the attic rather than breaking the floor, especially in homes that have already had one leak.",
    localAngle: [
      "Phoenix's housing was built almost entirely on slab foundations, and neighborhoods from the 1960s through the early 1990s commonly ran soft copper under the slab. After decades of hot-line expansion against concrete and gravel, those lines wear through, which is why the warm spot on the floor is such a familiar Phoenix complaint.",
      "Reroutes in Phoenix run through attics that can top 140°F in summer, so installers insulate PEX runs and schedule attic work for early mornings. Reroutes and repipes inside city limits are generally done under a City of Phoenix plumbing permit.",
    ],
    localFaqs: [
      { q: "Is a reroute better than breaking the slab in a Phoenix home?", a: "In most older Phoenix homes, yes. It removes the line from the slab for good and avoids damaging tile. A spot repair makes sense when the pipe is otherwise sound." },
    ],
    updated: U,
  },
  {
    citySlug: "scottsdale",
    serviceSlug: "water-softener-installation",
    status: "PUBLISHED",
    h1: "Water softener installation in Scottsdale",
    seoTitle: "Water Softener Installation in Scottsdale, AZ",
    metaDescription:
      "Water softener installation for Scottsdale homes: protecting tankless heaters, glass showers and high-end fixtures from Valley hard water.",
    answer:
      "Scottsdale homes use softeners mainly to protect tankless heaters, glass showers and high-end fixtures from hard-water scale. Many homes built since the 1990s have a softener loop already plumbed in the garage.",
    localAngle: [
      "North Scottsdale's newer homes and remodels lean heavily on tankless water heaters, frameless glass showers and designer fixtures, which are exactly the things hard-water scale ruins fastest. A softener sized to the household, often paired with an RO system at the kitchen sink, is one of the most common plumbing upgrades in the city.",
      "Older south Scottsdale homes usually lack a softener loop, so the plumber cuts one into the main line and keeps irrigation and hose bibs on hard water. Larger custom homes may need higher-capacity or twin-tank systems to keep up with multiple bathrooms.",
    ],
    localFaqs: [
      { q: "Do Scottsdale HOAs restrict softener discharge?", a: "Some communities have rules about where brine can drain. The plumber routes regeneration water to an approved receptor inside the plumbing system, not to landscaping." },
    ],
    updated: U,
  },
  {
    citySlug: "sun-city-west",
    serviceSlug: "whole-house-repiping",
    status: "PUBLISHED",
    h1: "Repiping in Sun City West",
    seoTitle: "Repiping & Polybutylene Replacement, Sun City West",
    metaDescription:
      "Whole-house repiping in Sun City West: polybutylene from the 1978–1998 build-out, PEX replacement, and Maricopa County permits.",
    answer:
      "Sun City West was built mostly from 1978 into the late 1990s, which overlaps the years polybutylene was widely used. Many homes there have been or are being repiped with PEX, under Maricopa County permits because the community is unincorporated.",
    localAngle: [
      "Del Webb built Sun City West from 1978 onward, the same window when polybutylene supply pipe was a common choice. Owners often find it at the water heater and under sinks, and insurers and buyers regularly ask about it when homes change hands.",
      "Because Sun City West is unincorporated, repipe permits and inspections go through Maricopa County rather than a city. Most homes are single-story slab houses with accessible attics, which makes an overhead PEX repipe a relatively clean few-day job.",
    ],
    localFaqs: [
      { q: "Who issues repipe permits in Sun City West?", a: "Maricopa County Planning & Development, because Sun City West is unincorporated." },
    ],
    updated: U,
  },
];

export const publishedCityServices = cityServices.filter((cs) => cs.status === "PUBLISHED");
