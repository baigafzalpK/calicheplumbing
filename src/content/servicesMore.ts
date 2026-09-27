import type { Service } from "./types";

const U = "2026-09-27";

export const servicesMore: Service[] = [
  {
    slug: "hot-water-recirculation",
    name: "Hot Water Recirculation",
    shortName: "Recirculation",
    category: "water-heaters",
    status: "PUBLISHED",
    seoTitle: "Hot Water Recirculation Pumps, Phoenix AZ",
    metaDescription:
      "Hot water recirculation pumps for Phoenix-area homes: dedicated return lines, under-sink crossover valves, timers and on-demand controls.",
    h1: "Hot water recirculation pumps",
    answer:
      "A recirculation pump keeps hot water close to the fixtures so it arrives in seconds instead of minutes. Homes without a return line can use a pump at the water heater with a crossover valve under the farthest sink, and timers or on-demand buttons keep energy use down.",
    intro: [
      "Sprawling single-story Valley floor plans put the master bath a long way from the garage water heater. Waiting a minute or more for hot water wastes water and patience.",
      "Many newer homes have a dedicated return line already plumbed. Older homes can use a crossover-style system with no new piping.",
    ],
    signs: ["Waiting a long time for hot water", "A return line capped at the water heater", "Running water down the drain every morning"],
    process: [
      { title: "Check the layout", body: "The plumber looks for a return line and finds the farthest fixture from the heater." },
      { title: "Install", body: "The pump goes at the heater, plus a crossover valve at the far sink if there's no return line." },
      { title: "Set controls", body: "They set a timer, temperature sensor or on-demand button to match your routine." },
    ],
    costFactors: ["Return line vs. crossover system", "Control type", "Electrical outlet at the heater", "Tankless compatibility"],
    faqs: [
      { q: "Does recirculation raise energy bills?", a: "A pump that runs constantly can. A timer or on-demand control keeps the extra cost small." },
      { q: "Does it work with a tankless heater?", a: "Some tankless models have built-in recirculation. Others need a compatible pump and settings." },
    ],
    related: ["water-heater-replacement", "tankless-water-heaters", "slab-leak-repair"],
    isEmergencyCapable: false,
    glance: [
      { term: "Result", detail: "Hot water in seconds at far fixtures" },
      { term: "No return line?", detail: "A crossover valve under the far sink" },
    ],
    updated: U,
  },
  {
    slug: "water-heater-flush",
    name: "Water Heater Flush & Descaling",
    shortName: "Flush & descale",
    category: "water-heaters",
    status: "PUBLISHED",
    seoTitle: "Water Heater Flush & Tankless Descaling, Phoenix",
    metaDescription:
      "Tank water heater flushing and tankless descaling for Valley hard water: remove sediment, check the anode rod and relief valve, extend heater life.",
    h1: "Water heater flushing and tankless descaling",
    answer:
      "Flushing drains the sediment that hard water leaves in the bottom of a tank. Descaling circulates a mild acid solution through a tankless heat exchanger to dissolve scale. In the Valley, a yearly service is the cheapest way to extend a water heater's life.",
    intro: [
      "Every gallon of Valley water heated leaves minerals behind. In a tank they settle as sediment that insulates the burner from the water, wastes energy and causes rumbling. In a tankless unit they line the heat exchanger.",
      "The same visit is a good time to check the anode rod, the relief valve and the expansion tank's pre-charge.",
    ],
    signs: ["Rumbling or popping from the tank", "Tankless scale or flow error codes", "Hot water that's lukewarm or fluctuating", "No flush in over a year"],
    process: [
      { title: "Shut down", body: "The plumber turns off gas or power and isolates the water." },
      { title: "Flush or descale", body: "Tanks are drained and flushed until they run clear. Tankless units get a circulated descaling solution." },
      { title: "Inspect", body: "They check the anode rod, relief valve and expansion tank and note anything near its end of life." },
    ],
    costFactors: ["Tank vs. tankless", "Hardened sediment that needs extra flushing", "Anode rod replacement", "Missing service valves on tankless units"],
    diy: {
      safe: ["Drain a few gallons from a tank monthly to reduce sediment"],
      stop: ["Opening a drain valve on an old tank that may not reseal", "Descaling a tankless without isolation valves"],
    },
    faqs: [
      { q: "How often should I flush a water heater in Phoenix?", a: "Once a year is a sensible baseline. Homes without a softener may need it more often." },
    ],
    related: ["water-heater-replacement", "tankless-water-heaters", "water-softener-installation"],
    isEmergencyCapable: false,
    glance: [
      { term: "Frequency", detail: "About yearly in Valley hard water" },
      { term: "Also checks", detail: "Anode rod, relief valve, expansion tank" },
    ],
    updated: U,
  },
  {
    slug: "pressure-regulator-valve",
    name: "Pressure Regulator (PRV) Replacement",
    shortName: "Pressure regulators",
    category: "pressure-supply",
    status: "PUBLISHED",
    seoTitle: "Pressure Regulator (PRV) Replacement, Phoenix",
    metaDescription:
      "Pressure reducing valve (PRV) testing and replacement for Phoenix-area homes: high pressure, banging pipes, running toilets and relief valve drips.",
    h1: "Pressure regulator (PRV) replacement",
    answer:
      "A pressure reducing valve (PRV) near where the main line enters the house lowers city pressure to a safe household level, typically set between 50 and 70 psi. When it fails, pressure climbs and stresses every fixture, supply line and appliance. A plumber tests the pressure, then replaces and sets the valve.",
    intro: [
      "Many Valley homes get high street pressure, and PRVs wear out, often in 10 to 15 years, sooner with hard water. A failing PRV shows up as banging pipes, running toilets, dripping relief valves and burst washer hoses.",
      "PRVs are commonly found on the main line at the front hose bib or in the garage near the softener loop.",
    ],
    signs: ["Water hammer or banging pipes", "Toilets that refill on their own", "Water heater relief valve dripping", "Sprays that seem unusually strong", "A gauge reading over 80 psi"],
    process: [
      { title: "Test", body: "The plumber puts a gauge on a hose bib to read static pressure, and watches it overnight if needed." },
      { title: "Replace", body: "The main is shut off and the old PRV is cut out and replaced." },
      { title: "Set", body: "The new valve is adjusted to the target pressure and the expansion tank is checked." },
    ],
    costFactors: ["Valve size and brand", "Location and access", "Condition of the main shutoff", "Expansion tank adjustment"],
    diy: {
      safe: ["Buy a hose-bib pressure gauge and read your pressure"],
      stop: ["Adjusting a failing PRV that won't hold its setting"],
    },
    faqs: [
      { q: "What water pressure should my house have?", a: "Plumbing codes generally cap residential pressure at 80 psi, and many plumbers set it between 50 and 70." },
    ],
    related: ["main-water-line-repair", "water-heater-replacement", "whole-house-repiping"],
    isEmergencyCapable: false,
    glance: [
      { term: "Target", detail: "Typically set between 50 and 70 psi" },
      { term: "Location", detail: "On the main line near the house" },
      { term: "Test", detail: "Gauge on a hose bib" },
    ],
    updated: U,
  },
  {
    slug: "main-water-line-repair",
    name: "Main Water Line Repair",
    shortName: "Main water line",
    category: "pressure-supply",
    status: "PUBLISHED",
    seoTitle: "Main Water Line Repair & Replacement, Phoenix",
    metaDescription:
      "Leaking or failing main water line between the meter and the house: locating, trenching through caliche, and replacement in Phoenix-area yards.",
    h1: "Main water line repair and replacement",
    answer:
      "The main water line runs from the city meter to your house. The homeowner owns this section. When it leaks, you'll often see a wet spot in the yard, low pressure or a spinning meter. A plumber locates the leak, digs to it, and repairs or replaces the line, which in Valley soil often means cutting through caliche.",
    intro: [
      "Main lines in older Valley homes may be galvanized or copper. Newer ones are usually PEX or polyethylene. Leaks show up as a soggy patch in the yard or desert landscaping, or a bill spike.",
      "Caliche can make digging slow. Plumbers may use a saw, jackhammer or directional boring to get through it.",
    ],
    signs: ["A wet patch between the meter and the house", "Meter spins with everything off", "Low pressure throughout the home", "Muddy or discolored water after work on the street"],
    process: [
      { title: "Locate", body: "The plumber confirms the leak at the meter and traces the line." },
      { title: "Excavate", body: "They dig or bore to the line, calling Arizona 811 before digging." },
      { title: "Repair or replace", body: "The leaking section is repaired, or the line is replaced if it's old or failing." },
      { title: "Restore", body: "The line is pressure-tested, then backfilled and the landscaping restored as agreed." },
    ],
    costFactors: ["Line length from meter to house", "Soil and caliche", "Hardscape or driveway over the line", "Repair vs. full replacement"],
    faqs: [
      { q: "Who owns the water line in Phoenix?", a: "Generally the city owns the meter and the line to it. The homeowner owns the line from the meter to the house. Check with your water provider." },
    ],
    related: ["pressure-regulator-valve", "slab-leak-detection", "irrigation-leak-repair"],
    isEmergencyCapable: true,
    glance: [
      { term: "You own", detail: "Meter to house" },
      { term: "Local challenge", detail: "Caliche and hardscape" },
      { term: "Before digging", detail: "Arizona 811 locate" },
    ],
    updated: U,
  },
  {
    slug: "backflow-testing",
    name: "Backflow Testing & Repair",
    shortName: "Backflow testing",
    category: "irrigation-backflow",
    status: "PUBLISHED",
    seoTitle: "Backflow Testing & Repair in Phoenix, AZ",
    metaDescription:
      "Annual backflow preventer testing, repair and freeze protection for Phoenix-area irrigation and fire lines. Certified testers file results with your city.",
    h1: "Backflow testing and repair",
    answer:
      "A backflow preventer keeps irrigation or other non-potable water from flowing back into the drinking water supply. Many Valley cities require assemblies such as RPZs to be tested each year by a certified tester, who files the results with the water provider. Failed assemblies are rebuilt or replaced.",
    intro: [
      "Most irrigation systems in the Valley have a backflow assembly near the front of the house. The exposed brass assemblies can crack on the few winter nights the Valley sees hard freezes.",
      "Testing is done with a calibrated test kit, and results go to the city on its required form or portal.",
    ],
    signs: ["A notice from your city that testing is due", "Water spitting from the relief port", "A cracked body after a freeze", "Irrigation that won't hold pressure"],
    process: [
      { title: "Test", body: "The certified tester connects a gauge kit and checks each check valve and relief valve." },
      { title: "Report", body: "Results are filed with the city or water provider." },
      { title: "Repair if needed", body: "Failed parts are rebuilt, or the assembly is replaced." },
    ],
    costFactors: ["Assembly type (PVB, RPZ, DCVA)", "Repair kit vs. replacement", "Freeze damage", "Filing requirements"],
    faqs: [
      { q: "Do I need a yearly backflow test in Phoenix?", a: "Requirements depend on your city and the type of assembly. If your provider sends a notice, the test is required." },
      { q: "How do I protect a backflow preventer from freezing?", a: "Insulated covers help. On forecast hard-freeze nights, some homeowners drain the assembly per the manufacturer's instructions." },
    ],
    related: ["irrigation-leak-repair", "main-water-line-repair", "pressure-regulator-valve"],
    isEmergencyCapable: false,
    glance: [
      { term: "Who tests", detail: "A certified backflow tester" },
      { term: "When", detail: "Often yearly, per your city's notice" },
      { term: "Local risk", detail: "Occasional hard freezes crack assemblies" },
    ],
    updated: U,
  },
  {
    slug: "irrigation-leak-repair",
    name: "Irrigation Leak Repair",
    shortName: "Irrigation leaks",
    category: "irrigation-backflow",
    status: "PUBLISHED",
    seoTitle: "Irrigation Line & Valve Leak Repair, Phoenix",
    metaDescription:
      "Irrigation leak repair in the Phoenix metro: leaking valves, cracked mainlines, drip line failures and soggy spots in desert landscaping.",
    h1: "Irrigation leak repair",
    answer:
      "Irrigation leaks happen at valves, in the pressurized mainline before the valves, and in drip tubing. A leak in the mainline runs all the time, even when the controller is off. A plumber traces it, repairs the valve or line, and checks the backflow assembly feeding it.",
    intro: [
      "Sun and heat break down drip tubing and emitters, and roots find leaks. A pressurized mainline leak is the costly one: it wastes water around the clock.",
      "The tell-tale signs are a spinning meter when the house and controller are off, or a patch of desert landscaping that stays green or muddy.",
    ],
    signs: ["A soggy or unusually green spot", "Water bill spike in summer", "A valve that won't shut off", "Low pressure at drip emitters"],
    process: [
      { title: "Isolate", body: "The plumber shuts the irrigation supply to separate irrigation from house plumbing." },
      { title: "Trace", body: "They find the leak at the valve manifold, mainline or drip zone." },
      { title: "Repair", body: "Valves are rebuilt or replaced, and lines are cut and repaired." },
    ],
    costFactors: ["Location and depth", "Valve manifold age", "Caliche digging", "Number of zones affected"],
    faqs: [
      { q: "Is irrigation a plumber's job or a landscaper's?", a: "Drip tubing is often landscaper territory. Pressurized mainlines, valves and backflow assemblies are plumbing work." },
    ],
    related: ["backflow-testing", "main-water-line-repair", "slab-leak-detection"],
    isEmergencyCapable: false,
    glance: [
      { term: "Costliest leak", detail: "Pressurized mainline before the valves" },
      { term: "Clue", detail: "Meter spins with house and controller off" },
    ],
    updated: U,
  },
  {
    slug: "drain-cleaning",
    name: "Drain Cleaning",
    category: "drains-sewer",
    status: "PUBLISHED",
    seoTitle: "Drain Cleaning in Phoenix, AZ",
    metaDescription:
      "Drain cleaning for kitchen, bath, laundry and main lines in the Phoenix metro: cabling, hydro-jetting and scale buildup in cast iron. Call or request service.",
    h1: "Drain cleaning",
    answer:
      "Drain cleaning clears a blocked or slow drain with a drain cable (snake) or a high-pressure water jet. For Valley homes, grease in kitchen lines and scale and rust in older cast iron are common causes. When clogs keep coming back, a camera inspection shows why.",
    intro: [
      "Kitchen lines clog with grease and food waste. Bathroom lines clog with hair and soap scum. In older Valley homes with cast iron drains, scale and corrosion narrow the pipe from the inside.",
      "A main-line clog usually shows up at the lowest fixture first, often a shower or tub, or the cleanout in the yard.",
    ],
    signs: ["Slow drains in one fixture", "Gurgling when the washer drains", "Water backing up into the tub when the toilet flushes", "Sewage smell from drains"],
    process: [
      { title: "Diagnose", body: "The plumber checks which fixtures are affected to tell a branch clog from a main-line clog." },
      { title: "Clear", body: "They cable from the cleanout or fixture, or hydro-jet greasy and scaled lines." },
      { title: "Verify", body: "They run water to confirm flow and recommend a camera inspection if the clog is recurring." },
    ],
    costFactors: ["Branch vs. main line", "Cleanout access", "Cabling vs. jetting", "Camera inspection"],
    diy: {
      safe: ["Use a plunger or hand auger on a single fixture", "Pull hair out of tub drains"],
      stop: ["Chemical drain openers in a line that's fully blocked", "Main-line clogs with sewage coming up"],
    },
    faqs: [
      { q: "Is hydro-jetting safe for old pipes?", a: "A plumber should camera the line first. Jetting is very effective, but badly deteriorated pipe may need repair instead." },
    ],
    related: ["sewer-camera-inspection", "sewer-line-repair", "water-softener-installation"],
    isEmergencyCapable: true,
    glance: [
      { term: "Methods", detail: "Cabling and hydro-jetting" },
      { term: "Recurring clogs", detail: "Get a camera inspection" },
    ],
    updated: U,
  },
  {
    slug: "sewer-camera-inspection",
    name: "Sewer Camera Inspection",
    shortName: "Camera inspection",
    category: "drains-sewer",
    status: "PUBLISHED",
    seoTitle: "Sewer Camera Inspection in Phoenix, AZ",
    metaDescription:
      "Sewer camera inspections for Phoenix-area homes: recurring clogs, pre-purchase inspections, cast iron and clay line condition, with video.",
    h1: "Sewer camera inspection",
    answer:
      "A sewer camera inspection runs a waterproof camera through the drain line to show its condition: cracks, roots, bellies, scale and separated joints. It's the right step for recurring clogs and a smart one before buying an older home.",
    intro: [
      "Older Valley neighborhoods may have cast iron under the slab and clay or cast iron out to the street. Both age in ways you can't see without a camera.",
      "A camera also locates the problem, so any repair is targeted instead of a guess.",
    ],
    signs: ["Clogs that return within months", "Buying a home built before about 1980", "Sewage odor in the yard", "Planning a remodel that adds fixtures"],
    process: [
      { title: "Access", body: "The camera goes in through a cleanout, a toilet pull or a roof vent." },
      { title: "Record", body: "The plumber records video, notes defects and locates them from the surface." },
      { title: "Report", body: "You get the video and plain-language findings." },
    ],
    costFactors: ["Cleanout access", "Line length", "Locating and marking defects", "Written report"],
    faqs: [
      { q: "Should I get a sewer scope before buying a house in Phoenix?", a: "For homes built before about 1980, it's inexpensive insurance, and general home inspections often don't include it." },
    ],
    related: ["sewer-line-repair", "drain-cleaning", "whole-house-repiping"],
    isEmergencyCapable: false,
    glance: [
      { term: "Shows", detail: "Cracks, roots, bellies, scale, separated joints" },
      { term: "Best for", detail: "Recurring clogs and pre-purchase checks" },
    ],
    updated: U,
  },
  {
    slug: "sewer-line-repair",
    name: "Sewer Line Repair",
    category: "drains-sewer",
    status: "PUBLISHED",
    seoTitle: "Sewer Line Repair & Replacement, Phoenix AZ",
    metaDescription:
      "Sewer line repair and replacement for Phoenix-area homes: spot repairs, full replacement and trenchless options where the ground and pipe allow.",
    h1: "Sewer line repair and replacement",
    answer:
      "Sewer line repair fixes the pipe that carries waste from the house to the city sewer or septic tank. Depending on what the camera shows, that can be a spot repair, trenchless lining or pipe bursting, or open-trench replacement.",
    intro: [
      "Cast iron under slabs can scale and crack, and older clay lines can separate at the joints. A camera inspection decides the repair.",
      "Trenchless methods save landscaping and hardscape when the line's condition and route allow them.",
    ],
    signs: ["Camera shows cracks, bellies or collapse", "Repeated main-line backups", "Sewage odor or soggy ground over the line", "Slow drains throughout the house"],
    process: [
      { title: "Camera and locate", body: "The plumber confirms the defect and its depth and location." },
      { title: "Choose the method", body: "They compare a spot repair, lining, bursting or open trench." },
      { title: "Permit and repair", body: "The work is done under permit and inspected." },
    ],
    costFactors: ["Length and depth", "Under slab vs. yard", "Trenchless suitability", "Hardscape and caliche", "Permit"],
    faqs: [
      { q: "Can a sewer line under the slab be repaired without breaking the floor?", a: "Sometimes. Lining can rehabilitate some under-slab cast iron, but not every line qualifies." },
    ],
    related: ["sewer-camera-inspection", "drain-cleaning", "slab-leak-detection"],
    isEmergencyCapable: true,
    glance: [
      { term: "First step", detail: "Camera inspection" },
      { term: "Options", detail: "Spot repair, lining, bursting, open trench" },
    ],
    updated: U,
  },
  {
    slug: "gas-line-repair",
    name: "Gas Line Repair",
    category: "gas-lines",
    status: "PUBLISHED",
    seoTitle: "Gas Line Repair & Installation, Phoenix AZ",
    metaDescription:
      "Gas line leak repair, new gas lines and pressure testing for Phoenix-area homes. If you smell gas, leave the home and call Southwest Gas or 911 first.",
    h1: "Gas line repair and installation",
    answer:
      "Gas line repair covers leaks and damaged pipe from the meter to your appliances. It also includes new lines for ranges, grills, fire pits and pool heaters. If you smell gas, leave the house first and call Southwest Gas or 911 from outside. A plumber repairs the line and pressure-tests it before gas is restored.",
    intro: [
      "Most Valley homes with gas are served by Southwest Gas. Common plumbing work includes adding lines for outdoor kitchens and fire features, and fixing corroded or damaged yard lines.",
      "Tankless water heaters and pool heaters need a lot of gas, so line sizing matters.",
    ],
    signs: ["Rotten-egg smell (leave and call Southwest Gas or 911)", "Hissing near a gas line", "Dead vegetation along a gas line route", "Adding a gas appliance"],
    process: [
      { title: "Safety first", body: "The utility makes an immediate hazard safe. The plumber handles the repair." },
      { title: "Locate and repair", body: "They find the leak with a gas detector and soap test, then repair or replace the pipe." },
      { title: "Pressure test", body: "The line is tested, inspected as required, and the appliances are relit." },
    ],
    costFactors: ["Line length and route", "Yard vs. interior", "Sizing for new appliances", "Permit and inspection"],
    faqs: [
      { q: "What should I do if I smell gas?", a: "Leave the home right away. Don't flip switches or use a phone inside. Call Southwest Gas or 911 from a safe distance." },
    ],
    related: ["gas-appliance-hookup", "tankless-water-heaters", "water-heater-replacement"],
    isEmergencyCapable: true,
    glance: [
      { term: "Smell gas?", detail: "Leave, then call Southwest Gas or 911" },
      { term: "Common add-ons", detail: "Outdoor kitchens, fire pits, pool heaters" },
      { term: "Permit", detail: "New gas lines usually need one" },
    ],
    updated: U,
  },
  {
    slug: "gas-appliance-hookup",
    name: "Gas Appliance Hookups",
    category: "gas-lines",
    status: "PUBLISHED",
    seoTitle: "Gas Appliance Hookup & Installation, Phoenix",
    metaDescription:
      "Gas range, dryer, grill and fire pit hookups for Phoenix-area homes: shutoff valves, connectors, sediment traps and leak testing.",
    h1: "Gas appliance hookups",
    answer:
      "A gas appliance hookup connects a range, dryer, grill, fire pit or heater to your gas supply with an accessible shutoff valve, a rated connector and, where required, a sediment trap, then leak-tests every joint.",
    intro: [
      "Swapping an electric range for gas, or adding a built-in grill, is common in Valley remodels. It often needs a new stub-out or an extended line.",
      "Outdoor connections need to be rated for UV and heat exposure.",
    ],
    signs: ["New gas range or dryer", "Outdoor kitchen project", "Old uncoated brass connector", "No shutoff valve behind the appliance"],
    process: [
      { title: "Check supply", body: "The plumber confirms the line size and pressure for the appliance." },
      { title: "Connect", body: "They install the shutoff, connector and sediment trap per the manufacturer and code." },
      { title: "Test", body: "They leak-test the connection and confirm the appliance lights and burns cleanly." },
    ],
    costFactors: ["Existing stub-out or new line", "Distance from supply", "Indoor vs. outdoor", "Permit"],
    faqs: [
      { q: "Can the appliance store hook up my gas range?", a: "Some do. Many Valley cities require a licensed contractor for new gas piping, but a simple reconnection may not need one." },
    ],
    related: ["gas-line-repair", "tankless-water-heaters", "reverse-osmosis-systems"],
    isEmergencyCapable: false,
    glance: [
      { term: "Includes", detail: "Shutoff, connector, sediment trap, leak test" },
      { term: "Outdoor", detail: "UV- and heat-rated materials" },
    ],
    updated: U,
  },
];
