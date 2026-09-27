import type { Category, Service } from "./types";
import { servicesMore } from "./servicesMore";

export const categories: Category[] = [
  { slug: "hard-water", name: "Hard Water & Filtration", blurb: "Softeners, reverse osmosis and whole-house filters for Valley water.", icon: "filter" },
  { slug: "hidden-leaks", name: "Slab & Hidden Leaks", blurb: "Leaks under the slab and inside walls, found and fixed.", icon: "slab" },
  { slug: "repiping", name: "Repiping", blurb: "PEX repipes for polybutylene, galvanized and pinholed copper.", icon: "pipe" },
  { slug: "water-heaters", name: "Water Heaters", blurb: "Tank and tankless replacement, recirculation and descaling.", icon: "flame" },
  { slug: "pressure-supply", name: "Pressure & Supply", blurb: "Pressure regulators and the main line from the meter.", icon: "gauge" },
  { slug: "irrigation-backflow", name: "Irrigation & Backflow", blurb: "Backflow tests and irrigation line leaks.", icon: "sprinkler" },
  { slug: "drains-sewer", name: "Drains & Sewer", blurb: "Clogs, camera inspections and sewer line repair.", icon: "drain" },
  { slug: "gas-lines", name: "Gas Lines", blurb: "Gas line repair and appliance hookups.", icon: "gas" },
];

const U = "2026-09-27";

const core: Service[] = [
  {
    slug: "water-softener-installation",
    name: "Water Softener Installation",
    shortName: "Water softeners",
    category: "hard-water",
    status: "PUBLISHED",
    seoTitle: "Water Softener Installation in Phoenix, AZ",
    metaDescription:
      "Water softener installation across the Phoenix metro: sizing for Valley hardness, loop and bypass work, drain and overflow routing. Call or request service.",
    h1: "Water softener installation in the Phoenix metro",
    answer:
      "A water softener removes the calcium and magnesium that make Valley water hard, which protects water heaters, fixtures and appliances from scale. A plumber sizes the unit to your household's water use and measured hardness, connects it at the softener loop or main line, and routes the drain correctly.",
    intro: [
      "Phoenix-area water is some of the hardest in the country. You see it as white crust on faucets and shower glass, but the expensive damage happens where you can't see it: scale on water heater elements and tank bottoms, in tankless heat exchangers and in dishwasher valves.",
      "Many Valley homes built since the 1990s have a pre-plumbed softener loop in the garage, which makes installation simpler. Older homes may need a loop added at the main line, with a bypass so outdoor hose bibs and irrigation stay on unsoftened water.",
    ],
    signs: [
      "White or tan crust on faucets, shower heads and glass",
      "Spots on dishes even with rinse aid",
      "Water heater popping or rumbling as it heats",
      "Soap and shampoo that don't lather well",
      "Short-lived faucet cartridges and toilet fill valves",
    ],
    process: [
      { title: "Test and size", body: "The plumber tests hardness at a tap and asks about household size and water use to size the grain capacity and regeneration setting." },
      { title: "Plan the connection", body: "They use the existing softener loop if there is one, or cut in a loop with isolation and bypass valves at the main line." },
      { title: "Drain and overflow", body: "The regeneration drain gets an air gap into an approved receptor, which is a code and sanitation requirement, not an option." },
      { title: "Program and check", body: "The unit is programmed for your hardness, the system is checked for leaks, and you're shown how to bypass it and add salt." },
    ],
    costFactors: [
      "Grain capacity and control type (timer vs. demand-initiated)",
      "Whether a softener loop already exists",
      "Drain routing distance to an approved receptor",
      "Removal of an old unit",
      "Adding an RO system for drinking water at the same visit",
    ],
    diy: {
      safe: ["Add salt and keep it above the water line in the brine tank", "Break up a salt bridge with a broom handle", "Put the unit in bypass if it leaks"],
      stop: ["Cutting into the main line to add a loop", "Running the drain line straight into a sewer pipe without an air gap"],
    },
    faqs: [
      { q: "How hard is Phoenix water?", a: "Valley water providers generally report hardness in the teens of grains per gallon, and some areas run higher. Your city's annual water quality report lists the number, and a plumber can test at the tap." },
      { q: "Do I need a softener if I have a water heater with an anode rod?", a: "Yes, they solve different problems. The anode rod protects the tank from corrosion, while a softener keeps scale from building up on the elements and tank bottom." },
      { q: "Can a softener feed my irrigation?", a: "It shouldn't. Softened water adds sodium to soil, so a plumber normally keeps hose bibs and irrigation on the hard-water side of the bypass." },
    ],
    related: ["reverse-osmosis-systems", "whole-house-filtration", "water-heater-flush", "tankless-water-heaters"],
    isEmergencyCapable: false,
    glance: [
      { term: "Typical visit", detail: "Half a day when a loop exists; longer when one must be added" },
      { term: "Why it matters here", detail: "Valley hardness shortens water heater and fixture life" },
      { term: "Permit", detail: "Usually not required for a like-for-like swap; new main-line work may need one" },
      { term: "Pairs with", detail: "Reverse osmosis for drinking water" },
    ],
    updated: U,
  },
  {
    slug: "reverse-osmosis-systems",
    name: "Reverse Osmosis Systems",
    shortName: "Reverse osmosis",
    category: "hard-water",
    status: "PUBLISHED",
    seoTitle: "Reverse Osmosis System Installation, Phoenix AZ",
    metaDescription:
      "Under-sink and whole-kitchen reverse osmosis installation in the Phoenix metro: faucet, tank, drain saddle, fridge and ice-maker lines. Request service.",
    h1: "Reverse osmosis system installation",
    answer:
      "A reverse osmosis (RO) system pushes water through a fine membrane to cut dissolved minerals and many other contaminants in drinking water. A plumber mounts it under the kitchen sink, adds a dedicated faucet, connects the drain with an air gap, and can run a line to the fridge or ice maker.",
    intro: [
      "Valley tap water is safe to drink, but it's high in dissolved solids and can taste of chlorine or minerals. That's why RO is one of the most common upgrades in Phoenix-area kitchens.",
      "RO works best on water that's already softened. Hard water fouls the membrane faster, so many homes install a softener and an RO system together.",
    ],
    signs: [
      "Mineral or chlorine taste in tap water",
      "Buying bottled water every week",
      "Scale in kettles and coffee makers",
      "Ice cubes that come out cloudy",
      "An old RO system with a slow or dribbling faucet",
    ],
    process: [
      { title: "Choose a location", body: "The plumber checks cabinet space for the tank and filters, or suggests a tankless RO unit where space is tight." },
      { title: "Faucet and drain", body: "They drill the sink or countertop for the RO faucet and install a drain saddle with an air gap." },
      { title: "Feeds", body: "They tap the cold supply and, if you want, run tubing to the fridge or ice maker." },
      { title: "Flush and test", body: "The system is flushed per the manufacturer and leak-checked. You're shown filter change intervals." },
    ],
    costFactors: [
      "Tank vs. tankless RO unit",
      "Countertop material (quartz and granite need a special bit)",
      "Adding a fridge or ice-maker line",
      "Remineralization or UV stages",
      "Removing an old system",
    ],
    diy: {
      safe: ["Change pre-filters on schedule", "Check the tank's air pressure when the system is empty"],
      stop: ["Drilling stone countertops", "Tapping into a copper line with a self-piercing valve"],
    },
    faqs: [
      { q: "How often do RO filters need changing in the Valley?", a: "Pre-filters usually every 6 to 12 months and the membrane every few years, depending on water use and whether the water is softened first." },
      { q: "Does RO waste water?", a: "Yes, it sends some water to the drain as it filters. Newer units waste much less, and a permeate pump can improve efficiency." },
    ],
    related: ["water-softener-installation", "whole-house-filtration", "gas-appliance-hookup"],
    isEmergencyCapable: false,
    glance: [
      { term: "Typical visit", detail: "A few hours" },
      { term: "Where it goes", detail: "Under the kitchen sink, or a nearby cabinet or garage wall" },
      { term: "Best with", detail: "A softener ahead of it to protect the membrane" },
    ],
    updated: U,
  },
  {
    slug: "whole-house-filtration",
    name: "Whole-House Filtration",
    category: "hard-water",
    status: "PUBLISHED",
    seoTitle: "Whole-House Water Filtration Systems, Phoenix AZ",
    metaDescription:
      "Whole-house carbon and sediment filtration for Phoenix-area homes: sizing, main-line installation and bypass. Improve taste and chlorine at every tap.",
    h1: "Whole-house water filtration",
    answer:
      "A whole-house filter treats all the water entering the home, usually with sediment and carbon stages that reduce chlorine, taste and odor at every tap and shower. It doesn't soften water. For scale, it's paired with a softener.",
    intro: [
      "Valley cities blend surface water from the Salt, Verde and Colorado rivers with groundwater, and the taste can change with the season and the source. A whole-house carbon system smooths that out for showers, laundry and every faucet.",
      "The system mounts at the main line, usually in the garage or on the exterior wall where the line enters. It needs isolation valves and a bypass so the media can be serviced.",
    ],
    signs: ["Chlorine smell in the shower", "Seasonal changes in taste or odor", "Sediment in aerators", "Dry skin and hair complaints after showering", "An RO system that isn't enough"],
    process: [
      { title: "Water review", body: "The plumber reviews your city's water report and your goals: taste, chlorine, chloramine or sediment." },
      { title: "Sizing", body: "The system is sized by flow rate so it won't drop pressure when two showers run." },
      { title: "Install", body: "They cut into the main line with isolation and bypass valves, plus a sediment pre-filter where needed." },
      { title: "Service plan", body: "You get the media or cartridge replacement interval and bypass instructions." },
    ],
    costFactors: ["Media type (carbon, catalytic carbon for chloramine)", "Flow rate and tank size", "Main-line access and location", "Combined softener/filter systems"],
    faqs: [
      { q: "Is a whole-house filter the same as a softener?", a: "No. A filter reduces chlorine, taste and sediment. A softener removes hardness minerals. Many Valley homes use both, with the filter first." },
      { q: "Will it lower my water pressure?", a: "A correctly sized system shouldn't cause a noticeable drop. An undersized cartridge filter can." },
    ],
    related: ["water-softener-installation", "reverse-osmosis-systems", "pressure-regulator-valve"],
    isEmergencyCapable: false,
    glance: [
      { term: "Treats", detail: "Every tap, shower and appliance" },
      { term: "Does not", detail: "Remove hardness; pair it with a softener" },
      { term: "Location", detail: "At the main line, garage or exterior wall" },
    ],
    updated: U,
  },
  {
    slug: "slab-leak-detection",
    name: "Slab Leak Detection",
    shortName: "Slab leak detection",
    category: "hidden-leaks",
    status: "PUBLISHED",
    seoTitle: "Slab Leak Detection in Phoenix, AZ",
    metaDescription:
      "Slab leak detection for Phoenix-area homes: meter tests, pressure isolation, acoustic and thermal locating before anything is cut. Call or request service.",
    h1: "Slab leak detection",
    answer:
      "Slab leak detection finds a leak in a water line under or inside the concrete slab without guessing. A plumber confirms the leak at the meter, isolates hot from cold, then pinpoints it with acoustic listening and thermal imaging so only one small spot is opened, or none at all if a reroute is the better repair.",
    intro: [
      "Nearly every home in the Valley is built on a concrete slab, with copper or PEX supply lines running under or through it. When one of those lines leaks, the water goes into the soil and the first sign is often a high water bill.",
      "Hot-side slab leaks are especially common. Hot water lines expand and contract, rubbing against concrete and gravel, and the warm spot on the floor is a classic clue.",
    ],
    signs: [
      "A water bill higher than last year's for the same month",
      "The meter's leak indicator spins with everything off",
      "A warm or hot spot on a tile or concrete floor",
      "Sound of running water with no fixture on",
      "Damp carpet, cracked tile or baseboard swelling with no obvious source",
    ],
    process: [
      { title: "Confirm at the meter", body: "With every fixture off, the plumber watches the meter's leak indicator to confirm water is being lost." },
      { title: "Isolate", body: "Shutting the water heater inlet and testing each side separately tells them whether the leak is hot or cold." },
      { title: "Pinpoint", body: "Acoustic listening, thermal imaging and line tracing locate the leak to within a small area." },
      { title: "Recommend a repair", body: "You get options: a spot repair through the slab, a reroute through the attic or walls, or a repipe if the lines are failing in several places." },
    ],
    costFactors: ["Number of lines and branches to isolate", "Floor covering over the suspected area", "Access to the manifold or water heater", "Whether multiple leaks are present", "Whether detection is combined with the repair visit"],
    diy: {
      safe: ["Turn off every fixture and watch the meter's leak dial", "Shut the cold inlet valve on the water heater to see if the meter stops", "Photograph warm spots and bills for your insurer"],
      stop: ["Breaking up tile or concrete to hunt for the leak", "Leaving a hot-side leak running, which wastes energy and saturates the soil under the slab"],
    },
    faqs: [
      { q: "Does homeowners insurance cover slab leaks in Arizona?", a: "Policies vary. Many cover the cost of accessing the leak and the resulting damage, but not replacing the pipe itself. Check your policy and document everything before repairs." },
      { q: "Why are slab leaks so common in Phoenix?", a: "Slab construction is nearly universal here, hot lines expand against concrete, and hard water and pipe age take a toll on copper. Together they make slab leaks a routine Valley repair." },
      { q: "How accurate is leak detection?", a: "A skilled technician usually narrows a leak to a small area, often within a foot or two, before any concrete is opened." },
    ],
    related: ["slab-leak-repair", "pinhole-leak-repair", "whole-house-repiping", "main-water-line-repair"],
    isEmergencyCapable: true,
    glance: [
      { term: "First step", detail: "Meter test with every fixture off" },
      { term: "Methods", detail: "Pressure isolation, acoustic listening, thermal imaging" },
      { term: "Outcome", detail: "Leak location plus repair options, from spot repair to reroute" },
      { term: "Urgency", detail: "Hot-side leaks waste energy and water every hour" },
    ],
    updated: U,
  },
  {
    slug: "slab-leak-repair",
    name: "Slab Leak Repair & Reroutes",
    shortName: "Slab leak repair",
    category: "hidden-leaks",
    status: "PUBLISHED",
    seoTitle: "Slab Leak Repair & Reroutes in Phoenix, AZ",
    metaDescription:
      "Slab leak repair in the Phoenix metro: spot repairs through the slab, attic and wall reroutes, and when a repipe makes more sense. Request service.",
    h1: "Slab leak repair and reroutes",
    answer:
      "There are three ways to fix a slab leak: open the floor and repair the pipe in place, abandon the leaking line and reroute a new one through the attic or walls, or repipe the house if several lines are failing. A reroute is often the lasting choice in Phoenix homes because it takes the line out of the slab entirely.",
    intro: [
      "Once the leak is located, the choice of repair depends on the pipe's condition, the floor covering and how many leaks the home has had. A single leak in otherwise sound PEX may only need a spot repair. A third leak in aging copper points toward a reroute or repipe.",
      "Reroutes in Valley homes usually run PEX through the attic. The attic gets very hot in summer, so lines are insulated and run where they're protected, and drops come down through interior walls to the fixture.",
    ],
    signs: ["A confirmed slab leak from leak detection", "More than one slab leak in a few years", "A leak under expensive flooring you'd rather not break", "Warm floor spots returning after a previous repair"],
    process: [
      { title: "Choose the repair", body: "The plumber compares a spot repair, a reroute and a repipe for your home, with the trade-offs of each." },
      { title: "Spot repair", body: "For a direct repair, a small section of floor is opened, the pipe is repaired, pressure-tested, and the concrete is patched." },
      { title: "Reroute", body: "For a reroute, the leaking line is capped and a new PEX line runs through the attic and down a wall to the fixture or manifold." },
      { title: "Test and restore", body: "The system is pressure-tested. Drywall access holes are patched or left ready for your drywall contractor, as agreed." },
    ],
    costFactors: ["Spot repair vs. reroute vs. repipe", "Floor covering over the leak", "Attic access and run length for reroutes", "Number of fixtures fed by the leaking line", "Drywall patching scope"],
    faqs: [
      { q: "Is rerouting better than a spot repair?", a: "Often, yes. A reroute removes the line from the slab so the same problem can't return there. A spot repair is quicker when the pipe is otherwise in good shape." },
      { q: "Do hot attics damage PEX in Phoenix?", a: "PEX is rated for high temperatures, but it shouldn't be exposed to UV. Installers insulate attic runs and keep them off hot surfaces." },
    ],
    related: ["slab-leak-detection", "whole-house-repiping", "pinhole-leak-repair", "hot-water-recirculation"],
    isEmergencyCapable: true,
    glance: [
      { term: "Options", detail: "Spot repair, reroute or repipe" },
      { term: "Common here", detail: "PEX reroutes through the attic" },
      { term: "Permit", detail: "Reroutes and repipes often need a city or county permit" },
    ],
    updated: U,
  },
  {
    slug: "pinhole-leak-repair",
    name: "Pinhole Leak Repair",
    category: "hidden-leaks",
    status: "PUBLISHED",
    seoTitle: "Copper Pinhole Leak Repair, Phoenix AZ",
    metaDescription:
      "Pinhole leaks in copper pipes: finding them in walls and ceilings, repairing them properly, and knowing when repiping is the smarter move.",
    h1: "Copper pinhole leak repair",
    answer:
      "Pinhole leaks are tiny holes that corrode through copper pipe from the inside, often showing up as a stain, a drip or a spray inside a wall. A plumber opens the wall, cuts out the damaged section and replaces it, and checks nearby pipe. If pinholes keep appearing, a repipe usually costs less than chasing them.",
    intro: [
      "Copper pinhole leaks are common in Phoenix-area homes, especially in copper systems several decades old. Water chemistry, velocity and installation quality all play a part.",
      "One pinhole is a repair. A pattern of pinholes, meaning several in a few years or in different parts of the house, is a sign the whole system is thinning.",
    ],
    signs: ["A small water stain on drywall or a ceiling", "Hissing inside a wall", "Green or blue spots on exposed copper", "A musty smell in a closet or cabinet", "A repeat leak close to a previous repair"],
    process: [
      { title: "Locate", body: "The plumber traces the leak from moisture readings and stain patterns, opening the smallest access possible." },
      { title: "Repair", body: "The pinholed section is cut out and replaced with copper or a PEX transition, not just clamped." },
      { title: "Inspect", body: "Nearby pipe is checked for thinning, and you're told honestly whether more pinholes are likely." },
    ],
    costFactors: ["Wall or ceiling access", "How many leaks", "Copper vs. PEX repair section", "Water damage drying needed"],
    diy: {
      safe: ["Shut the main or the fixture valve", "Clamp a repair sleeve on as a temporary fix"],
      stop: ["Treating a clamp as a permanent repair", "Closing up a wet wall without drying it, which invites mold"],
    },
    faqs: [
      { q: "How many pinhole leaks before I should repipe?", a: "Many plumbers suggest looking at a repipe after two or three pinholes in different locations, because more usually follow." },
    ],
    related: ["whole-house-repiping", "slab-leak-detection", "water-heater-flush"],
    isEmergencyCapable: true,
    glance: [
      { term: "Pipe type", detail: "Copper supply lines" },
      { term: "Repair", detail: "Cut out and replace the section" },
      { term: "Watch for", detail: "A pattern of leaks, which points to a repipe" },
    ],
    updated: U,
  },
  {
    slug: "whole-house-repiping",
    name: "Whole-House Repiping",
    shortName: "Repiping",
    category: "repiping",
    status: "PUBLISHED",
    seoTitle: "Whole-House Repiping (PEX) in Phoenix, AZ",
    metaDescription:
      "Whole-house PEX repiping for Phoenix-area homes with polybutylene, galvanized or pinholed copper. What the job involves, timeline and cost factors.",
    h1: "Whole-house repiping",
    answer:
      "A repipe replaces every water supply line in the house, usually with PEX run through the attic and walls instead of through the slab. It's the permanent fix for polybutylene, failing galvanized pipe, and copper with repeated pinhole or slab leaks.",
    intro: [
      "A repipe sounds like a huge project, but most single-family Valley homes are repiped in a few days while the family stays in the house. Water is off during working hours and restored most evenings.",
      "In slab homes, the new lines run overhead: through the attic, with drops down interior walls to each fixture. Old lines in the slab are capped and abandoned, which also ends the risk of future slab leaks on those lines.",
    ],
    signs: ["Gray polybutylene pipe at the water heater or under sinks", "Two or more slab or pinhole leaks", "Rusty or low-pressure water from galvanized pipe", "A home inspection or insurer flagging the pipe material"],
    process: [
      { title: "Walkthrough and plan", body: "The plumber maps fixtures and plans attic routes, drops and a manifold or trunk-and-branch layout." },
      { title: "Permit", body: "Repipes usually need a permit from the city or, in unincorporated areas, Maricopa County." },
      { title: "Install", body: "New PEX lines are run and connected fixture by fixture, and the old lines are capped." },
      { title: "Test and patch", body: "The system is pressure-tested and inspected. Access holes are patched to the agreed level." },
    ],
    costFactors: ["Number of bathrooms and fixtures", "Single story vs. two story", "Attic access and clearances", "Drywall patching and texture matching", "Permit and inspection fees"],
    faqs: [
      { q: "PEX or copper for a Phoenix repipe?", a: "PEX is the most common choice today: it resists scale better than older copper, has fewer joints, and handles attic routing well. Copper is still an option." },
      { q: "Can we live in the house during a repipe?", a: "Usually. Water is off during working hours and restored at night on most days." },
    ],
    related: ["polybutylene-replacement", "slab-leak-repair", "pinhole-leak-repair", "pressure-regulator-valve"],
    isEmergencyCapable: false,
    glance: [
      { term: "Typical length", detail: "A few working days for a single-family home" },
      { term: "Material", detail: "PEX, run overhead instead of in the slab" },
      { term: "Permit", detail: "Usually required" },
    ],
    updated: U,
  },
  {
    slug: "polybutylene-replacement",
    name: "Polybutylene Pipe Replacement",
    shortName: "Polybutylene replacement",
    category: "repiping",
    status: "PUBLISHED",
    seoTitle: "Polybutylene Pipe Replacement in Arizona",
    metaDescription:
      "Polybutylene pipe in Phoenix-area homes built around 1978–1995: how to identify it, why it fails, and how replacement with PEX works.",
    h1: "Polybutylene pipe replacement",
    answer:
      "Polybutylene is a gray, blue or black plastic supply pipe installed in many homes from roughly 1978 to 1995. It can fail without warning, especially at fittings. Replacing it means a repipe, usually in PEX, and many insurers and buyers ask for it.",
    intro: [
      "The Valley built a huge share of its housing during the polybutylene era, so the pipe turns up in homes across Mesa, Glendale, Peoria, Tempe, Phoenix and the Sun Cities.",
      "You can often spot it where the pipe comes out of the wall at the water heater, under sinks, or at the toilet supply, usually stamped 'PB2110'.",
    ],
    signs: ["Gray flexible pipe marked PB2110", "Plastic or copper crimp rings at fittings", "Built between about 1978 and 1995", "An insurer asking about pipe material"],
    process: [
      { title: "Confirm", body: "The plumber confirms the pipe type at several visible points." },
      { title: "Plan the repipe", body: "They plan PEX routes and fixture connections, as in a standard repipe." },
      { title: "Replace", body: "All polybutylene supply lines are replaced and tested, then inspected under permit." },
    ],
    costFactors: ["Home size and fixture count", "Attic access", "Drywall patching", "Permit fees"],
    faqs: [
      { q: "Is polybutylene illegal in Arizona?", a: "It isn't illegal to have it, but it's no longer allowed for new installs under current codes, and some insurers limit coverage for homes that still have it." },
    ],
    related: ["whole-house-repiping", "pinhole-leak-repair", "slab-leak-detection"],
    isEmergencyCapable: false,
    glance: [
      { term: "Era", detail: "Homes built about 1978–1995" },
      { term: "Look for", detail: "PB2110 stamp, gray flexible pipe" },
      { term: "Fix", detail: "Full repipe, usually in PEX" },
    ],
    updated: U,
  },
  {
    slug: "water-heater-replacement",
    name: "Water Heater Replacement",
    shortName: "Water heaters",
    category: "water-heaters",
    status: "PUBLISHED",
    seoTitle: "Water Heater Replacement in Phoenix, AZ",
    metaDescription:
      "Gas and electric tank water heater replacement in the Phoenix metro: sizing, venting, expansion tanks, pans and code upgrades. Call or request service.",
    h1: "Water heater replacement",
    answer:
      "Replacing a tank water heater means draining and removing the old unit, then installing a correctly sized gas or electric tank with current-code venting, a relief valve line, a thermal expansion tank where required, and a drain pan where the location calls for one. Hard water is the main reason Valley tanks wear out early.",
    intro: [
      "Most Phoenix-area water heaters live in the garage, some in an interior closet or the attic. Sediment and scale from hard water settle at the bottom of the tank, which makes gas units rumble and electric elements burn out.",
      "Replacement is a good time to fix older installs: missing expansion tanks, a relief valve line that doesn't terminate properly, or a flue with poor clearances.",
    ],
    signs: ["Water leaking from the tank or pooling in the pan", "Rusty hot water", "Rumbling or popping when heating", "Hot water running out much faster than before", "A tank more than about 10 years old"],
    process: [
      { title: "Assess", body: "The plumber checks the fuel type, capacity, venting, gas line size and location to size a replacement." },
      { title: "Remove", body: "The old tank is drained, disconnected and hauled away." },
      { title: "Install to code", body: "New tank, flex connectors, relief valve discharge, expansion tank and pan as required, and venting checked." },
      { title: "Start up", body: "The tank is filled and purged, lit or powered, checked for leaks and combustion, and set to a safe temperature." },
    ],
    costFactors: ["Gas vs. electric", "Capacity (40, 50 or 75 gallons)", "Location: garage, closet or attic", "Code upgrades needed (expansion tank, pan, venting)", "Permit requirements in your city"],
    diy: {
      safe: ["Shut the cold inlet valve and the gas or breaker if it's leaking", "Flush a few gallons from the drain valve to check for sediment"],
      stop: ["Gas connections and venting", "Replacing a relief valve on a hot, pressurized tank"],
    },
    faqs: [
      { q: "How long do water heaters last in Phoenix?", a: "Hard water shortens tank life. Many Valley tanks need replacing in the 8 to 12 year range, sooner without softening or regular flushing." },
      { q: "Do I need an expansion tank?", a: "When the home has a pressure regulator or check valve, as most do, code generally requires a thermal expansion tank." },
    ],
    related: ["tankless-water-heaters", "water-heater-flush", "hot-water-recirculation", "water-softener-installation"],
    isEmergencyCapable: true,
    glance: [
      { term: "Typical visit", detail: "Same-day swap for like-for-like tanks when stock is available" },
      { term: "Wear factor here", detail: "Hard-water scale and sediment" },
      { term: "Code items", detail: "Expansion tank, relief valve discharge, pan, venting" },
      { term: "Permit", detail: "Many Valley cities require one" },
    ],
    updated: U,
  },
  {
    slug: "tankless-water-heaters",
    name: "Tankless Water Heaters",
    shortName: "Tankless",
    category: "water-heaters",
    status: "PUBLISHED",
    seoTitle: "Tankless Water Heater Installation, Phoenix AZ",
    metaDescription:
      "Tankless water heater installation and conversion in the Phoenix metro: gas line sizing, venting, descaling valves and hard-water protection.",
    h1: "Tankless water heater installation",
    answer:
      "A tankless water heater heats water on demand instead of storing it. Converting from a tank usually means upsizing the gas line, new venting and isolation valves for descaling. In the Valley's hard water, a softener or scale inhibitor and yearly flushing are what keep a tankless unit working.",
    intro: [
      "Tankless heaters save space and never run out of hot water, but they're less forgiving of hard water than tanks. Scale builds up in the heat exchanger and triggers error codes.",
      "Gas tankless units need much more gas than a tank. The plumber checks the meter capacity and line sizing before recommending one.",
    ],
    signs: ["Running out of hot water with a full house", "Wanting garage space back", "A tank heater at the end of its life", "Planning a softener anyway"],
    process: [
      { title: "Load check", body: "The plumber checks the fixture count, gas meter capacity and line size." },
      { title: "Plan venting", body: "They route direct venting to clear windows, doors and property lines." },
      { title: "Install", body: "Unit, isolation (service) valves, gas line upgrade and condensate drain where required." },
      { title: "Commission", body: "Gas pressure and combustion are checked, and the temperature is set." },
    ],
    costFactors: ["Gas line upsizing", "Venting route", "Indoor vs. outdoor unit", "Condensing vs. non-condensing", "Adding scale protection"],
    faqs: [
      { q: "Is tankless worth it with hard water?", a: "It can be, with scale protection and a yearly descaling flush. Without them, heat exchanger problems are common in the Valley." },
    ],
    related: ["water-heater-replacement", "water-softener-installation", "gas-line-repair", "hot-water-recirculation"],
    isEmergencyCapable: false,
    glance: [
      { term: "Key requirement", detail: "Adequate gas supply and line size" },
      { term: "Maintenance", detail: "Yearly descaling in hard water" },
      { term: "Space", detail: "Wall-mounted, indoor or outdoor" },
    ],
    updated: U,
  },
];

export const services: Service[] = [...core, ...servicesMore];

export const publishedServices = services.filter((s) => s.status === "PUBLISHED");

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)!;
}

export function servicesInCategory(slug: string) {
  return publishedServices.filter((s) => s.category === slug);
}
