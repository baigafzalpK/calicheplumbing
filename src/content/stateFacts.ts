// State-level plumbing context for all 50 states + DC.
// Keep every line checkable: licensing bodies, broad climate and broad water character only.
// Hardness is the general pattern from USGS hardness mapping; it varies by utility and well, so pages
// always point readers to their own water report. Where licensing is local, say so rather than naming a board.

export type Freeze = "severe" | "seasonal" | "occasional" | "rare";
export type Hardness = "soft" | "moderate" | "hard" | "very hard" | "varies";
export type Region = "Northeast" | "Midwest" | "South" | "West";

export type StateFact = {
  abbr: string;
  name: string;
  slug: string;
  region: Region;
  freeze: Freeze;
  hardness: Hardness;
  /** Who licenses plumbers, phrased as a sentence a homeowner can act on. */
  licensing: string;
  /** Two or three state-specific plumbing notes. No numbers we can't source. */
  notes: string[];
};

const s = (abbr: string, name: string, region: Region, freeze: Freeze, hardness: Hardness, licensing: string, notes: string[]): StateFact => ({
  abbr,
  name,
  slug: name.toLowerCase().replace(/[^a-z]+/g, "-"),
  region,
  freeze,
  hardness,
  licensing,
  notes,
});

export const stateFacts: StateFact[] = [
  s("AL", "Alabama", "South", "occasional", "moderate", "The Alabama Plumbers and Gas Fitters Examining Board licenses plumbers and gas fitters, and its online search shows a license's status.", [
    "Humid summers and heavy Gulf storms put a premium on working sump pumps, clear yard drainage and backflow-protected sewer lines in low-lying neighborhoods.",
    "Hard freezes are uncommon but do happen in north Alabama, and homes with pipes in vented crawl spaces are the ones that crack.",
  ]),
  s("AK", "Alaska", "West", "severe", "varies", "Alaska's Department of Labor and Workforce Development issues plumber certificates of fitness through its Mechanical Inspection section.", [
    "Deep frost and long winters make freeze protection the core of Alaska plumbing: insulated and heat-traced lines, protected crawl spaces and careful winterizing of vacant homes.",
    "Many homes outside the larger cities rely on private wells, holding tanks or septic systems rather than city water and sewer.",
  ]),
  s("AZ", "Arizona", "West", "rare", "very hard", "The Arizona Registrar of Contractors (ROC) licenses plumbing contractors; its website shows license class, status and complaint history.", [
    "Much of the state has some of the hardest water in the country, so scale damage to water heaters, tankless units and fixtures is constant.",
    "Most homes sit on concrete slabs, which makes slab leaks on buried copper lines a common and expensive repair.",
    "Summer heat bakes water heaters in garages and exposed irrigation lines, while rare winter freezes crack backflow assemblies.",
  ]),
  s("AR", "Arkansas", "South", "occasional", "moderate", "The Arkansas Department of Health's Plumbing and Natural Gas section licenses plumbers and inspects work in many areas.", [
    "Winter ice storms bring occasional hard freezes, and pipes in crawl spaces and exterior walls are the most exposed.",
    "Rural homes often depend on private wells and septic systems, so pump, pressure tank and septic line problems are common calls.",
  ]),
  s("CA", "California", "West", "occasional", "varies", "The Contractors State License Board (CSLB) licenses plumbing contractors under the C-36 classification, and its online lookup shows license status.", [
    "Water character changes across the state: Southern California and the Central Valley are generally hard, while much of the Bay Area and Northern California is softer.",
    "Seismic rules require water heaters to be strapped, and older homes often still have galvanized supply lines and cast iron or clay sewers.",
    "Mountain and high-desert areas freeze hard in winter, unlike most of the coast.",
  ]),
  s("CO", "Colorado", "West", "severe", "moderate", "Colorado's State Plumbing Board, part of the Division of Professions and Occupations, licenses plumbers; most jurisdictions also require permits.", [
    "Sharp temperature swings and long cold snaps make frozen and burst pipes a leading winter emergency, especially in exterior walls and garages.",
    "Altitude matters: water heaters and gas appliances above about 5,000 feet need correct derating and venting.",
  ]),
  s("CT", "Connecticut", "Northeast", "severe", "soft", "The Connecticut Department of Consumer Protection licenses plumbers (P-1 contractors and P-2 journeymen); you can verify a license online.", [
    "An older housing stock means galvanized supply lines, cast iron drains and aging oil-fired boilers with tankless coils are common.",
    "Many homes outside the cities use private wells, which brings pump, pressure tank and treatment work.",
  ]),
  s("DE", "Delaware", "South", "seasonal", "moderate", "Delaware's Board of Plumbing, Heating, Ventilation, Air Conditioning and Refrigeration Examiners licenses plumbers.", [
    "Low, flat coastal ground means sump pumps, backwater valves and good yard drainage matter in many neighborhoods.",
    "Winter cold is seasonal rather than severe, but pipes in crawl spaces and exterior walls still freeze during hard cold snaps.",
  ]),
  s("DC", "District of Columbia", "South", "seasonal", "moderate", "Plumbers in the District are licensed through the Department of Licensing and Consumer Protection (DLCP), and permits are issued by the Department of Buildings.", [
    "Rowhouses and older apartment buildings dominate, so shared stacks, cast iron drains and lead service lines are common subjects; DC Water runs a lead service line replacement program.",
    "Basement units and below-grade kitchens make sewer backups and backwater valves a real concern during heavy storms.",
  ]),
  s("FL", "Florida", "South", "rare", "hard", "Florida's Department of Business and Professional Regulation (DBPR) licenses plumbing contractors through the Construction Industry Licensing Board; check any license on the DBPR site.", [
    "Most of the state draws from limestone aquifers, so water is generally hard and softeners are common.",
    "Slab-on-grade construction, high water tables and hurricane flooding shape plumbing work, from slab leaks to sewer backups.",
    "Homes built in the late 1970s through the mid-1990s may have polybutylene supply lines, which many insurers ask about.",
  ]),
  s("GA", "Georgia", "South", "occasional", "soft", "Georgia's State Construction Industry Licensing Board, Division of Master Plumbers and Journeyman Plumbers, licenses plumbers.", [
    "Red clay soil shifts with wet and dry seasons, which stresses sewer laterals and water lines; root intrusion in older clay sewers is common.",
    "North Georgia sees occasional hard freezes, and crawl-space pipes are the usual casualties.",
  ]),
  s("HI", "Hawaii", "West", "rare", "soft", "Hawaii's Board of Electricians and Plumbers, under the Department of Commerce and Consumer Affairs, licenses plumbers.", [
    "Salt air corrodes exposed fittings and water heater components faster than on the mainland.",
    "Many homes use solar water heating, which brings its own pumps, valves and tank work.",
  ]),
  s("ID", "Idaho", "West", "severe", "hard", "Idaho's Division of Occupational and Professional Licenses issues plumbing licenses and permits through its Plumbing Board.", [
    "Cold winters make frozen pipes and frost-protected yard lines important, especially in rural areas and higher elevations.",
    "Water in much of southern Idaho is hard, and many rural homes rely on private wells.",
  ]),
  s("IL", "Illinois", "Midwest", "severe", "hard", "The Illinois Department of Public Health licenses plumbers and plumbing contractors must register; Chicago adds its own requirements.", [
    "Older housing in Chicago and other cities has galvanized supply lines and lead service lines, which state law now requires utilities to replace over time.",
    "Basements and heavy spring rain make sump pumps, backup pumps and overhead sewers common.",
    "Winters are long and cold, so frozen and burst pipes in exterior walls and crawl spaces are a regular emergency.",
  ]),
  s("IN", "Indiana", "Midwest", "severe", "hard", "The Indiana Plumbing Commission, through the Professional Licensing Agency, licenses plumbers and plumbing contractors.", [
    "Hard water across most of the state makes softeners and water heater maintenance standard upkeep.",
    "Basements and wet springs make sump pumps and backup protection essential in many neighborhoods.",
  ]),
  s("IA", "Iowa", "Midwest", "severe", "hard", "Iowa's Plumbing and Mechanical Systems Board licenses plumbers statewide.", [
    "Deep frost and long winters make frozen pipes and freeze-proof hydrants a recurring issue.",
    "Hard water is common, and many rural homes use private wells with their own treatment needs.",
  ]),
  s("KS", "Kansas", "Midwest", "seasonal", "hard", "Kansas does not issue a statewide plumbing license; cities and counties such as Wichita and Johnson County license plumbers locally.", [
    "Clay soils that swell and shrink with moisture stress foundations, sewer laterals and water lines.",
    "Hard water is common, and winter cold snaps freeze exposed and crawl-space pipes.",
  ]),
  s("KY", "Kentucky", "South", "seasonal", "hard", "Kentucky's Department of Housing, Buildings and Construction, Division of Plumbing, licenses plumbers and inspects plumbing work.", [
    "Limestone geology gives much of the state hard water.",
    "Winters bring regular freezes, and older homes in river cities often have cast iron drains and galvanized supply lines.",
  ]),
  s("LA", "Louisiana", "South", "rare", "moderate", "The Louisiana State Plumbing Board licenses plumbers statewide.", [
    "Low elevation, high water tables and heavy rain make drainage, sewer backups and backwater valves important.",
    "Soft, shifting soils move slabs and pier foundations, which stresses water and sewer lines.",
  ]),
  s("ME", "Maine", "Northeast", "severe", "soft", "Maine's Plumbers' Examining Board licenses plumbers; local plumbing inspectors issue permits in each municipality.", [
    "Long, hard winters make freeze protection and winterizing seasonal homes a core service.",
    "A large share of homes use private wells and septic systems, and many older homes heat with oil boilers.",
  ]),
  s("MD", "Maryland", "South", "seasonal", "moderate", "The Maryland State Board of Plumbing licenses plumbers and gas fitters; check a license through the Maryland Department of Labor.", [
    "Older rowhouses in Baltimore and older suburbs have cast iron drains, galvanized lines and lead service lines.",
    "Basements and heavy storms make sump pumps and backwater valves common.",
  ]),
  s("MA", "Massachusetts", "Northeast", "severe", "soft", "The Massachusetts Board of State Examiners of Plumbers and Gas Fitters licenses plumbers and gas fitters; local inspectors issue permits.", [
    "Much of the housing is old, so galvanized supply lines, cast iron drains and oil or gas boilers are common.",
    "Water is generally soft and can be corrosive, which shows up as pinhole leaks in copper and blue-green stains.",
    "Long winters make frozen pipes a regular emergency.",
  ]),
  s("MI", "Michigan", "Midwest", "severe", "hard", "Michigan's Bureau of Construction Codes (LARA) licenses plumbers and plumbing contractors.", [
    "Long, cold winters make frozen pipes and burst lines a common emergency.",
    "Basements, wet springs and older combined sewers make sump pumps and backflow protection important; several cities are replacing lead service lines.",
  ]),
  s("MN", "Minnesota", "Midwest", "severe", "hard", "The Minnesota Department of Labor and Industry licenses plumbers and contractors and issues permits in many areas.", [
    "Some of the deepest frost in the lower 48 makes freeze protection and buried line depth critical.",
    "Hard water is common in much of the state, and basements make sump pumps standard.",
  ]),
  s("MS", "Mississippi", "South", "occasional", "moderate", "Plumber licensing in Mississippi is largely handled by cities and counties; the State Board of Contractors licenses contractors on larger jobs.", [
    "Heavy rain and flat, low ground make drainage and sewer backups common problems.",
    "Hard freezes are occasional, and pipes in crawl spaces and exterior walls are the ones at risk.",
  ]),
  s("MO", "Missouri", "Midwest", "seasonal", "hard", "Missouri has no statewide plumbing license; cities and counties such as St. Louis and Kansas City license plumbers locally.", [
    "Older homes in St. Louis and Kansas City often have cast iron and clay sewers, and some have lead service lines.",
    "Winter cold snaps freeze exposed pipes, and basements make sump pumps common.",
  ]),
  s("MT", "Montana", "West", "severe", "hard", "The Montana State Board of Plumbers licenses plumbers statewide.", [
    "Long, severe winters make freeze protection the top priority.",
    "Many rural homes use private wells and septic systems.",
  ]),
  s("NE", "Nebraska", "Midwest", "severe", "hard", "Nebraska has no statewide plumbing license; Omaha, Lincoln and other cities license plumbers locally.", [
    "Hard water is common, and many rural homes are on private wells.",
    "Cold winters freeze exposed and crawl-space pipes, and spring storms test sump pumps.",
  ]),
  s("NV", "Nevada", "West", "occasional", "very hard", "The Nevada State Contractors Board licenses plumbing contractors, and its website lists license status.", [
    "Southern Nevada water is very hard, so softeners and scale protection for water heaters are common.",
    "Most homes are slab-on-grade, and northern Nevada sees real winter freezes.",
  ]),
  s("NH", "New Hampshire", "Northeast", "severe", "soft", "The New Hampshire Mechanical Licensing Board, under the Office of Professional Licensure and Certification, licenses plumbers.", [
    "Many homes use private wells, which brings pump, pressure tank and treatment work, including for naturally occurring arsenic and radon.",
    "Long winters make frozen pipes and winterizing common, and many homes heat with oil.",
  ]),
  s("NJ", "New Jersey", "Northeast", "seasonal", "moderate", "The New Jersey State Board of Examiners of Master Plumbers licenses master plumbers; check a license through the Division of Consumer Affairs.", [
    "Older housing has cast iron drains, galvanized lines and lead service lines, which state law requires utilities to replace.",
    "Basements, high water tables near the coast and heavy storms make sump pumps and backflow protection common.",
  ]),
  s("NM", "New Mexico", "West", "seasonal", "hard", "New Mexico's Construction Industries Division (Regulation and Licensing Department) licenses plumbing contractors and journeymen.", [
    "Water is generally hard, and high-desert nights freeze exposed lines in winter.",
    "Altitude affects water heater and gas appliance setup in much of the state.",
  ]),
  s("NY", "New York", "Northeast", "severe", "varies", "New York has no statewide plumbing license; New York City and other municipalities license plumbers locally.", [
    "Housing is old in many cities, so cast iron, galvanized lines and lead service lines are common.",
    "Upstate winters are long and severe, making frozen and burst pipes a leading emergency.",
    "Water ranges from soft in the New York City system to hard in parts of western New York.",
  ]),
  s("NC", "North Carolina", "South", "occasional", "soft", "The North Carolina State Board of Examiners of Plumbing, Heating and Fire Sprinkler Contractors licenses plumbing contractors.", [
    "Many homes outside the cities rely on private wells and septic systems.",
    "Crawl-space construction is common, and hard freezes in the mountains and Piedmont crack exposed pipes.",
  ]),
  s("ND", "North Dakota", "Midwest", "severe", "hard", "The North Dakota State Plumbing Board licenses plumbers statewide.", [
    "Extreme winter cold and deep frost make freeze protection and line depth critical.",
    "Hard water and rural wells are common.",
  ]),
  s("OH", "Ohio", "Midwest", "severe", "hard", "The Ohio Construction Industry Licensing Board (OCILB) licenses plumbing contractors; many cities also register them.", [
    "Older homes in Ohio's cities have cast iron and clay sewers, galvanized supply lines and some lead service lines.",
    "Basements and heavy spring rain make sump pumps and backwater valves standard, and winters freeze exposed pipes.",
  ]),
  s("OK", "Oklahoma", "South", "seasonal", "hard", "The Oklahoma Construction Industries Board licenses plumbers and plumbing contractors.", [
    "Expansive clay soils move with wet and dry cycles, stressing slabs, sewer laterals and yard lines.",
    "Winter ice storms bring hard freezes that burst exposed pipes.",
  ]),
  s("OR", "Oregon", "West", "occasional", "soft", "Oregon's Building Codes Division licenses plumbers, and contractors must also hold a Construction Contractors Board license.", [
    "Western Oregon water is generally soft, while the dry east side is harder and colder.",
    "Wet winters make drainage, crawl-space moisture and sump pumps common concerns.",
  ]),
  s("PA", "Pennsylvania", "Northeast", "severe", "varies", "Pennsylvania has no statewide plumbing license; Philadelphia, Allegheny County and other municipalities license plumbers, and home improvement contractors register with the Attorney General.", [
    "Pennsylvania's housing is among the oldest in the country, so galvanized lines, cast iron drains and lead service lines are common.",
    "Many rural homes use private wells, and winters freeze exposed pipes.",
  ]),
  s("RI", "Rhode Island", "Northeast", "severe", "soft", "Rhode Island's Department of Labor and Training licenses plumbers through its Professional Regulation unit.", [
    "Older housing means cast iron drains, galvanized lines and oil or gas boilers are common.",
    "Coastal storms and high water tables make sump pumps and backflow protection important.",
  ]),
  s("SC", "South Carolina", "South", "occasional", "soft", "South Carolina's Department of Labor, Licensing and Regulation licenses residential plumbers through the Residential Builders Commission.", [
    "Humid summers and coastal storms put sump pumps, drainage and sewer backflow in focus.",
    "Hard freezes are occasional, and crawl-space pipes are the most exposed.",
  ]),
  s("SD", "South Dakota", "Midwest", "severe", "hard", "The South Dakota State Plumbing Commission licenses plumbers statewide.", [
    "Severe winters and deep frost make freeze protection and line depth critical.",
    "Hard water and rural wells are common.",
  ]),
  s("TN", "Tennessee", "South", "seasonal", "moderate", "Tennessee's Board for Licensing Contractors licenses contractors on larger projects, and many cities and counties license plumbers locally.", [
    "Limestone areas have hard water, and older homes in the cities have cast iron and clay sewers.",
    "Winter cold snaps freeze crawl-space pipes.",
  ]),
  s("TX", "Texas", "South", "occasional", "hard", "Texas licenses plumbers at the state level; you can look up any plumber's license through the state's plumbing license search.", [
    "Expansive clay soils in much of Texas move slab foundations, causing slab leaks and cracked sewer lines.",
    "Hard water is common across much of the state, which shortens water heater life.",
    "Rare but severe freezes, like February 2021, burst pipes in homes never built for hard cold.",
  ]),
  s("UT", "Utah", "West", "severe", "very hard", "Utah's Division of Professional Licensing (DOPL) licenses plumbers and plumbing contractors.", [
    "Water along the Wasatch Front is very hard, so softeners and water heater maintenance are standard.",
    "Cold winters freeze exposed pipes and sprinkler lines, which must be blown out each fall.",
  ]),
  s("VT", "Vermont", "Northeast", "severe", "soft", "Vermont licenses plumbers through the Division of Fire Safety in the Department of Public Safety.", [
    "Long, cold winters make freeze protection and winterizing essential.",
    "Most rural homes use private wells and septic systems, and many heat with oil or propane.",
  ]),
  s("VA", "Virginia", "South", "seasonal", "moderate", "Virginia's Department of Professional and Occupational Regulation (DPOR) licenses plumbing tradesmen and contractors.", [
    "Older homes in Northern Virginia, Richmond and Hampton Roads have galvanized lines and cast iron drains.",
    "Coastal flooding and basements make sump pumps and backflow protection common.",
  ]),
  s("WA", "Washington", "West", "seasonal", "soft", "The Washington State Department of Labor & Industries (L&I) certifies plumbers and registers contractors.", [
    "Western Washington water is generally soft, and wet winters make drainage and crawl-space moisture common concerns.",
    "Eastern Washington is drier, harder-water country with colder winters.",
  ]),
  s("WV", "West Virginia", "South", "seasonal", "moderate", "The West Virginia State Fire Marshal licenses plumbers.", [
    "Steep terrain and older housing make sewer laterals and water service lines long and hard to reach.",
    "Many homes use private wells, and winters freeze exposed pipes.",
  ]),
  s("WI", "Wisconsin", "Midwest", "severe", "hard", "Wisconsin's Department of Safety and Professional Services (DSPS) licenses plumbers.", [
    "Long, cold winters make frozen pipes a regular emergency, and frost depth affects every buried line.",
    "Hard water is common, and older cities such as Milwaukee are replacing lead service lines.",
  ]),
  s("WY", "Wyoming", "West", "severe", "hard", "Wyoming does not issue a general statewide plumbing license; cities such as Cheyenne and Casper license plumbers locally.", [
    "Severe winters, wind and deep frost make freeze protection essential.",
    "Many rural homes use private wells and septic systems.",
  ]),
];

export const stateByAbbr = new Map(stateFacts.map((f) => [f.abbr, f]));
export const stateBySlug = new Map(stateFacts.map((f) => [f.slug, f]));

export const freezeLabel: Record<Freeze, string> = {
  severe: "Long, hard winters",
  seasonal: "Regular winter freezes",
  occasional: "Occasional hard freezes",
  rare: "Freezes are rare",
};
