import type { Service } from "./types";

const U = "2026-10-05";

export const servicesMore: Service[] = [
  {
    slug: "hot-water-recirculation",
    name: "Hot Water Recirculation",
    shortName: "Recirculation",
    category: "water-heaters",
    status: "PUBLISHED",
    seoTitle: "Hot Water Recirculation Pumps: Stop Waiting for Hot Water",
    metaDescription:
      "Hot water recirculation pumps explained: dedicated return lines, under-sink crossover valves, timers and on-demand controls, and what each costs to run.",
    h1: "Hot water recirculation pumps",
    answer:
      "A recirculation pump keeps hot water close to the fixtures so it arrives in seconds instead of minutes. Homes without a return line can use a pump at the water heater with a crossover valve under the farthest sink, and timers or on-demand buttons keep energy use down.",
    intro: [
      "Sprawling single-story floor plans and big two-story homes put the primary bath a long way from the water heater. Waiting a minute or more for hot water wastes water and patience.",
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
    seoTitle: "Water Heater Flush & Tankless Descaling Service",
    metaDescription:
      "Tank water heater flushing and tankless descaling: remove sediment and scale, check the anode rod and relief valve, and extend heater life.",
    h1: "Water heater flushing and tankless descaling",
    answer:
      "Flushing drains the sediment that hard water leaves in the bottom of a tank. Descaling circulates a mild acid solution through a tankless heat exchanger to dissolve scale. In hard-water areas, a yearly service is the cheapest way to extend a water heater's life.",
    intro: [
      "Every gallon of hard water heated leaves minerals behind. In a tank they settle as sediment that insulates the burner from the water, wastes energy and causes rumbling. In a tankless unit they line the heat exchanger.",
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
      { q: "How often should I flush a water heater?", a: "Once a year is a sensible baseline in hard-water areas. With soft or softened water, every two to three years is often enough. Follow the manufacturer's schedule for tankless units." },
    ],
    related: ["water-heater-replacement", "tankless-water-heaters", "water-softener-installation"],
    isEmergencyCapable: false,
    glance: [
      { term: "Frequency", detail: "About yearly in hard water" },
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
    seoTitle: "Pressure Regulator (PRV) Testing & Replacement",
    metaDescription:
      "Pressure reducing valve (PRV) testing and replacement: high water pressure, banging pipes, running toilets and relief valve drips. Signs and fixes.",
    h1: "Pressure regulator (PRV) replacement",
    answer:
      "A pressure reducing valve (PRV) near where the main line enters the house lowers city pressure to a safe household level, typically set between 50 and 70 psi. When it fails, pressure climbs and stresses every fixture, supply line and appliance. A plumber tests the pressure, then replaces and sets the valve.",
    intro: [
      "Many homes, especially in hilly cities or near the bottom of a pressure zone, get street pressure well above the 80 psi plumbing codes generally allow inside the house. PRVs wear out, often in 10 to 15 years, sooner with hard water. A failing PRV shows up as banging pipes, running toilets, dripping relief valves and burst washer hoses.",
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
    seoTitle: "Main Water Line Repair & Replacement",
    metaDescription:
      "Leaking or failing main water line between the meter or curb stop and the house: locating, trenching or boring, and replacement. Signs and options.",
    h1: "Main water line repair and replacement",
    answer:
      "The main water line (service line) runs from the utility's meter or curb stop to your house, and in most places the homeowner owns that section. When it leaks, you'll often see a wet spot in the yard, low pressure or a spinning meter. A plumber locates the leak, digs or bores to it, and repairs or replaces the line.",
    intro: [
      "Service lines in older homes may be galvanized, copper or, in many pre-1950s neighborhoods, lead. Newer ones are usually copper, PEX or polyethylene. Leaks show up as a soggy patch in the yard, a bill spike or low pressure.",
      "In cold climates the line must be buried below the frost line, often several feet deep, which makes digging bigger. Rock, hardpan such as Southwest caliche, and driveways over the line can also slow the job, and trenchless boring is often used to avoid them. Many utilities are now replacing lead service lines and may cover part of the cost.",
    ],
    signs: ["A wet patch between the meter and the house", "Meter spins with everything off", "Low pressure throughout the home", "Muddy or discolored water after work on the street"],
    process: [
      { title: "Locate", body: "The plumber confirms the leak at the meter and traces the line." },
      { title: "Excavate", body: "They dig or bore to the line, after calling 811 to have buried utilities marked." },
      { title: "Repair or replace", body: "The leaking section is repaired, or the line is replaced if it's old or failing." },
      { title: "Restore", body: "The line is pressure-tested, then backfilled and the landscaping restored as agreed." },
    ],
    costFactors: ["Line length from meter to house", "Burial depth (frost line) and soil or rock", "Hardscape or driveway over the line", "Repair vs. full replacement", "Lead line replacement programs that share the cost"],
    faqs: [
      { q: "Who owns the water line to my house?", a: "In most places the utility owns the main and the line up to the meter or curb stop, and the homeowner owns the line from there to the house. Rules vary, so check with your water provider." },
      { q: "How do I know if I have a lead service line?", a: "Scratch the pipe where it enters the house: lead is dull gray, soft and scratches to a shiny silver, and a magnet won't stick. Many utilities now publish service line inventories you can search by address." },
    ],
    related: ["pressure-regulator-valve", "slab-leak-detection", "irrigation-leak-repair"],
    isEmergencyCapable: true,
    glance: [
      { term: "You own", detail: "Meter to house" },
      { term: "Common challenges", detail: "Frost depth, rock and hardscape" },
      { term: "Before digging", detail: "Call 811 for a utility locate" },
    ],
    updated: U,
  },
  {
    slug: "backflow-testing",
    name: "Backflow Testing & Repair",
    shortName: "Backflow testing",
    category: "irrigation-backflow",
    status: "PUBLISHED",
    seoTitle: "Backflow Testing & Repair: Annual Tests, RPZs",
    metaDescription:
      "Annual backflow preventer testing, repair and freeze protection for irrigation and fire lines. Certified testers file results with your water provider.",
    h1: "Backflow testing and repair",
    answer:
      "A backflow preventer keeps irrigation or other non-potable water from flowing back into the drinking water supply. Many water providers require assemblies such as RPZs to be tested each year by a certified tester, who files the results with the provider. Failed assemblies are rebuilt or replaced.",
    intro: [
      "Most in-ground irrigation systems have a backflow assembly near the house. Exposed brass assemblies crack when they freeze, so in cold climates they're drained and winterized each fall, and in warm climates they need covers for the occasional hard freeze.",
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
      { q: "Do I need a yearly backflow test?", a: "Requirements depend on your city and the type of assembly. If your provider sends a notice, the test is required." },
      { q: "How do I protect a backflow preventer from freezing?", a: "Insulated covers help. On forecast hard-freeze nights, some homeowners drain the assembly per the manufacturer's instructions." },
    ],
    related: ["irrigation-leak-repair", "main-water-line-repair", "pressure-regulator-valve"],
    isEmergencyCapable: false,
    glance: [
      { term: "Who tests", detail: "A certified backflow tester" },
      { term: "When", detail: "Often yearly, per your city's notice" },
      { term: "Main risk", detail: "Freezing cracks exposed assemblies" },
    ],
    updated: U,
  },
  {
    slug: "irrigation-leak-repair",
    name: "Irrigation Leak Repair",
    shortName: "Irrigation leaks",
    category: "irrigation-backflow",
    status: "PUBLISHED",
    seoTitle: "Irrigation Line & Valve Leak Repair",
    metaDescription:
      "Irrigation leak repair: leaking valves, cracked mainlines, drip line failures and soggy spots in the yard. How to tell an irrigation leak from a house leak.",
    h1: "Irrigation leak repair",
    answer:
      "Irrigation leaks happen at valves, in the pressurized mainline before the valves, and in drip tubing. A leak in the mainline runs all the time, even when the controller is off. A plumber traces it, repairs the valve or line, and checks the backflow assembly feeding it.",
    intro: [
      "Sun and heat break down drip tubing and emitters, freezes crack lines that weren't blown out, and roots find leaks. A pressurized mainline leak is the costly one: it wastes water around the clock.",
      "The tell-tale signs are a spinning meter when the house and controller are off, or a patch of landscaping that stays green or muddy.",
    ],
    signs: ["A soggy or unusually green spot", "Water bill spike in summer", "A valve that won't shut off", "Low pressure at drip emitters"],
    process: [
      { title: "Isolate", body: "The plumber shuts the irrigation supply to separate irrigation from house plumbing." },
      { title: "Trace", body: "They find the leak at the valve manifold, mainline or drip zone." },
      { title: "Repair", body: "Valves are rebuilt or replaced, and lines are cut and repaired." },
    ],
    costFactors: ["Location and depth", "Valve manifold age", "Soil, rock or hardpan", "Number of zones affected"],
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
    seoTitle: "Drain Cleaning: Snaking, Hydro-Jetting & Main Lines",
    metaDescription:
      "Drain cleaning for kitchen, bath, laundry and main lines: cabling, hydro-jetting, roots and scale in cast iron, and when a camera inspection is next.",
    h1: "Drain cleaning",
    answer:
      "Drain cleaning clears a blocked or slow drain with a drain cable (snake) or a high-pressure water jet. Grease in kitchen lines, roots in clay sewers, and scale and rust in older cast iron are the most common causes. When clogs keep coming back, a camera inspection shows why.",
    intro: [
      "Kitchen lines clog with grease and food waste. Bathroom lines clog with hair and soap scum. In older homes with cast iron drains, scale and corrosion narrow the pipe from the inside, and clay sewer lines let roots in at the joints.",
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
    seoTitle: "Sewer Camera Inspection: Recurring Clogs & Home Buying",
    metaDescription:
      "Sewer camera inspections for recurring clogs and pre-purchase checks: what the video shows in cast iron, clay and plastic lines, and what happens next.",
    h1: "Sewer camera inspection",
    answer:
      "A sewer camera inspection runs a waterproof camera through the drain line to show its condition: cracks, roots, bellies, scale and separated joints. It's the right step for recurring clogs and a smart one before buying an older home.",
    intro: [
      "Older neighborhoods may have cast iron under the house and clay or cast iron out to the street, and some mid-century homes have Orangeburg fiber pipe. Both age in ways you can't see without a camera.",
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
      { q: "Should I get a sewer scope before buying a house?", a: "For homes built before about 1980, it's inexpensive insurance, and general home inspections often don't include it." },
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
    seoTitle: "Sewer Line Repair: Spot Repair, Lining & Replacement",
    metaDescription:
      "Sewer line repair and replacement options: spot repairs, trenchless lining and bursting, and open-trench replacement, and how a camera decides.",
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
    costFactors: ["Length and depth", "Under slab or basement floor vs. yard", "Trenchless suitability", "Hardscape, rock and tree roots", "Permit and street or sidewalk work"],
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
    seoTitle: "Gas Line Repair & Installation: Leaks, New Lines",
    metaDescription:
      "Gas line leak repair, new gas lines and pressure testing. If you smell gas, leave the home first and call your gas utility or 911 from outside.",
    h1: "Gas line repair and installation",
    answer:
      "Gas line repair covers leaks and damaged pipe from the meter to your appliances. It also includes new lines for ranges, grills, fire pits and pool heaters. If you smell gas, leave the house first and call your gas utility or 911 from outside. A plumber repairs the line and pressure-tests it before gas is restored.",
    intro: [
      "The gas utility owns the meter and the line to it; the piping after the meter is the homeowner's. Common plumbing work includes adding lines for ranges, dryers, generators, outdoor kitchens and fire features, and fixing corroded or damaged lines.",
      "Tankless water heaters and pool heaters need a lot of gas, so line sizing matters.",
    ],
    signs: ["Rotten-egg smell (leave and call the gas utility or 911)", "Hissing near a gas line", "Dead vegetation along a gas line route", "Adding a gas appliance"],
    process: [
      { title: "Safety first", body: "The utility makes an immediate hazard safe. The plumber handles the repair." },
      { title: "Locate and repair", body: "They find the leak with a gas detector and soap test, then repair or replace the pipe." },
      { title: "Pressure test", body: "The line is tested, inspected as required, and the appliances are relit." },
    ],
    costFactors: ["Line length and route", "Yard vs. interior", "Sizing for new appliances", "Permit and inspection"],
    faqs: [
      { q: "What should I do if I smell gas?", a: "Leave the home right away. Don't flip switches or use a phone inside. Call your gas utility or 911 from a safe distance." },
    ],
    related: ["gas-appliance-hookup", "tankless-water-heaters", "water-heater-replacement"],
    isEmergencyCapable: true,
    glance: [
      { term: "Smell gas?", detail: "Leave, then call the gas utility or 911" },
      { term: "Common add-ons", detail: "Ranges, dryers, generators, outdoor kitchens" },
      { term: "Permit", detail: "New gas lines usually need one" },
    ],
    updated: U,
  },
  {
    slug: "gas-appliance-hookup",
    name: "Gas Appliance Hookups",
    category: "gas-lines",
    status: "PUBLISHED",
    seoTitle: "Gas Appliance Hookups: Ranges, Dryers, Grills",
    metaDescription:
      "Gas range, dryer, grill, generator and fire pit hookups: shutoff valves, connectors, sediment traps, leak testing, and when a permit is needed.",
    h1: "Gas appliance hookups",
    answer:
      "A gas appliance hookup connects a range, dryer, grill, fire pit or heater to your gas supply with an accessible shutoff valve, a rated connector and, where required, a sediment trap, then leak-tests every joint.",
    intro: [
      "Swapping an electric range for gas, adding a standby generator, or adding a built-in grill is common in remodels. It often needs a new stub-out or an extended line.",
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
      { q: "Can the appliance store hook up my gas range?", a: "Some do. Most jurisdictions require a licensed contractor and a permit for new gas piping, but a simple reconnection may not need one." },
    ],
    related: ["gas-line-repair", "tankless-water-heaters", "reverse-osmosis-systems"],
    isEmergencyCapable: false,
    glance: [
      { term: "Includes", detail: "Shutoff, connector, sediment trap, leak test" },
      { term: "Outdoor", detail: "UV- and heat-rated materials" },
    ],
    updated: U,
  },
  {
    slug: "frozen-pipe-repair",
    name: "Frozen & Burst Pipe Repair",
    shortName: "Frozen pipes",
    category: "freeze-flood",
    status: "PUBLISHED",
    seoTitle: "Frozen & Burst Pipe Repair: What to Do Right Now",
    metaDescription:
      "Frozen or burst pipe? Shut off the main, thaw safely and call a plumber. Where pipes freeze, how repairs work, and how to stop it happening again.",
    h1: "Frozen and burst pipe repair",
    answer:
      "If a pipe has frozen, shut off the main water valve, open the faucet it feeds, and warm the pipe gently with a hair dryer or space heater, never an open flame. If the pipe has already split, keep the water off and call a plumber, who cuts out the damaged section, replaces it and checks the rest of the run.",
    intro: [
      "Water expands as it freezes. In a closed pipe, pressure builds between the ice and the closed faucet, and the pipe splits, often somewhere other than where the ice formed. That's why a burst pipe usually starts leaking when it thaws, not when it freezes.",
      "Pipes freeze where cold air reaches them: exterior walls, crawl spaces, unheated garages and attics, sink cabinets on outside walls, and hose bibs that aren't frost-free. Homes in mild-winter states are often hit hardest during rare cold snaps, because their pipes were never protected for hard cold.",
    ],
    signs: [
      "No water, or a trickle, from one faucet on a very cold morning",
      "Frost on an exposed pipe",
      "A bulge or split in a pipe",
      "Water dripping from a ceiling or wall after a cold night",
      "A hose bib that sprays inside the wall when you open it in spring",
    ],
    process: [
      { title: "Stop the water", body: "The main is shut off and the damaged area is opened only as far as needed to reach the break." },
      { title: "Repair", body: "The split section is cut out and replaced. Nearby pipe is checked, because one freeze often damages more than one spot." },
      { title: "Protect", body: "Lines that froze once are rerouted inside the heated space, insulated or fitted with heat cable, and outdoor spigots can be upgraded to frost-free models." },
      { title: "Dry out", body: "The plumber tells you what got wet so you can arrange drying before walls are closed, which prevents mold." },
    ],
    costFactors: ["Where the break is (open basement vs. inside a finished wall or ceiling)", "Number of breaks", "Pipe material", "Rerouting or insulating to prevent a repeat", "Water damage cleanup, usually a separate contractor"],
    diy: {
      safe: ["Shut off the main and open faucets to drain the system", "Thaw an exposed, intact pipe with a hair dryer, working from the faucet back", "Open sink cabinets and let faucets drip on the coldest nights"],
      stop: ["Using a torch or open flame to thaw a pipe", "Turning the water back on before a split pipe is repaired", "Using electrical appliances near standing water"],
    },
    faqs: [
      { q: "At what temperature do pipes freeze?", a: "Pipes in unheated spaces are at risk once outdoor temperatures drop into the low 20s °F for several hours, sooner with wind. Pipes in exterior walls and crawl spaces freeze first." },
      { q: "Does homeowners insurance cover burst pipes?", a: "Many policies cover sudden damage from a burst pipe but may exclude it if the home was left unheated or the leak was long-running. Check your policy and document the damage before cleanup." },
      { q: "Should I leave the heat on if I travel in winter?", a: "Yes. Keep the thermostat at 55 °F or higher, and for a long trip consider shutting off the main and draining the lines." },
      { q: "Can PEX pipe freeze without bursting?", a: "PEX expands slightly when water freezes inside it, making it more freeze-resistant than rigid copper or PVC, but fittings and repeated hard freezes can still cause ruptures or joint separation." },
      { q: "How do plumbers thaw pipes hidden inside walls?", a: "Plumbers use professional heating cables, pipe-thawing equipment, or infrared thermal heat directed at the wall cavity, keeping the faucet open so melting water can escape safely without pressure buildup." },
    ],
    related: ["pinhole-leak-repair", "whole-house-repiping", "sump-pump-installation", "main-water-line-repair"],
    isEmergencyCapable: true,
    glance: [
      { term: "First step", detail: "Shut off the main valve" },
      { term: "Never", detail: "Thaw a pipe with an open flame" },
      { term: "Where it happens", detail: "Exterior walls, crawl spaces, garages, attics, hose bibs" },
      { term: "Prevention", detail: "Heat on, cabinets open, hoses off, lines insulated" },
    ],
    updated: "2026-10-05",
  },
  {
    slug: "sump-pump-installation",
    name: "Sump Pump Installation & Replacement",
    shortName: "Sump pumps",
    category: "freeze-flood",
    status: "PUBLISHED",
    seoTitle: "Sump Pump Installation, Replacement & Battery Backup",
    metaDescription:
      "Sump pump installation and replacement: pump types, battery and water-powered backups, discharge lines and check valves. Signs your pump is failing.",
    h1: "Sump pump installation and replacement",
    answer:
      "A sump pump sits in a pit at the lowest point of a basement or crawl space and pumps out groundwater before it floods the floor. A plumber sizes the pump, installs it with a check valve and a discharge line that carries water away from the foundation, and can add a battery or water-powered backup for power outages.",
    intro: [
      "Sump pumps are standard in basement homes across the Midwest and Northeast and in low-lying areas with high water tables. They work hardest during heavy rain and snowmelt, which is also when power outages happen, so a backup pump is worth considering.",
      "Most pumps last roughly 7 to 10 years. A pump that runs constantly, cycles on and off, or grinds is close to failing, and check valves, float switches and discharge lines fail too.",
    ],
    signs: [
      "The pump runs constantly or cycles on and off rapidly",
      "Grinding, rattling or humming without pumping",
      "Water in the basement after heavy rain",
      "A pump more than about 7 years old",
      "A discharge line that freezes or dumps water against the foundation",
    ],
    process: [
      { title: "Assess", body: "The plumber checks the pit, how much water comes in, the discharge route and whether a dedicated outlet is available." },
      { title: "Choose the pump", body: "Submersible or pedestal, horsepower sized to the inflow and lift, and a backup option: battery or, where water pressure allows, water-powered." },
      { title: "Install", body: "Pump, check valve, a discharge line routed away from the foundation where local rules allow, and a pit lid." },
      { title: "Test", body: "The pit is filled to confirm the float, cycle and discharge, and you're shown how to test it each season." },
    ],
    costFactors: ["Pump type and horsepower", "Adding a battery or water-powered backup", "Whether a new pit must be dug", "Discharge line length and freeze protection", "Electrical work for a dedicated outlet"],
    diy: {
      safe: ["Pour a bucket of water in the pit to test it each season", "Keep the pit and float clear of debris", "Make sure the discharge outlet isn't buried or frozen"],
      stop: ["Breaking the basement floor for a new pit", "Tying the discharge into the sanitary sewer, which many cities prohibit"],
    },
    faqs: [
      { q: "Do I need a battery backup sump pump?", a: "If your basement has finished space or the pump runs often during storms, a backup is good insurance, because storms that fill the pit often knock out power too." },
      { q: "Can my sump pump drain into the sewer?", a: "Usually not. Most cities prohibit connecting sump discharge to the sanitary sewer. The water should go to the yard, a storm drain or another approved outlet." },
      { q: "Why is my sump pump running constantly even without rain?", a: "Continuous running usually indicates a stuck float switch, a broken check valve allowing discharged water to flow backward into the pit, or a high seasonal water table underground." },
      { q: "What horsepower sump pump do I need?", a: "A 1/3 HP pump handles average water volume in most single-family basements with standard vertical lift. Homes with heavy groundwater inflow or higher vertical lift benefit from a 1/2 HP pump." },
    ],
    related: ["frozen-pipe-repair", "drain-cleaning", "sewer-line-repair", "sewer-camera-inspection"],
    isEmergencyCapable: true,
    glance: [
      { term: "Typical life", detail: "About 7 to 10 years" },
      { term: "Key parts", detail: "Pump, float switch, check valve, discharge line" },
      { term: "Backup options", detail: "Battery or water-powered" },
    ],
    updated: "2026-10-05",
  },
];
