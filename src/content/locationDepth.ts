// Extra local issues merged into city records (keeps the base files readable).
export const extraIssues: Record<string, { title: string; body: string }[]> = {
  glendale: [
    { title: "Luke AFB flight-line neighborhoods", body: "West Glendale near Luke Air Force Base filled in during the late 1990s and 2000s. These homes typically have copper or PEX, softener loops and water heaters now reaching the end of their first service life, so replacements and pressure regulator checks are frequent calls there." },
  ],
  peoria: [
    { title: "Hillside pressure near Lake Pleasant", body: "North Peoria communities climb toward the Lake Pleasant foothills, and street pressure varies with elevation. Homes at the bottom of a pressure zone can see high static pressure that wears out fixtures and supply lines unless the regulator is working." },
  ],
  avondale: [
    { title: "Agua Fria floodplain soils", body: "Neighborhoods near the Agua Fria River sit on sandy, shifting alluvial soil rather than hard caliche. Ground movement after monsoon storms can stress yard lines and sewer laterals, so a camera inspection is worth doing when drains slow down after heavy rain." },
  ],
  goodyear: [
    { title: "Estrella hillside lots", body: "Estrella's homes climb the Sierra Estrella foothills, where rocky ground makes yard-line repairs slow and pressure differs from street to street. Long irrigation runs on sloped lots also make mainline leaks harder to spot until the bill arrives." },
  ],
  "litchfield-park": [
    { title: "Resort-era water heaters and fixtures", body: "Older homes around the Wigwam often have water heaters tucked into interior closets or utility rooms rather than garages. A leaking tank in those spots damages flooring and cabinets, so drain pans and pan drains matter when replacing them." },
  ],
  surprise: [
    { title: "Original town site and farm-era lines", body: "The original Surprise town site near Grand Avenue predates the boom by decades. Homes there can still have galvanized supply lines, older main shutoffs and clay sewer laterals, which is a different set of problems from the newer subdivisions around them." },
  ],
  "sun-city": [
    { title: "Tight utility spaces", body: "Many Sun City homes put the water heater in a small utility room or carport closet built for the tanks of the 1960s. Today's larger, code-compliant tanks with expansion tanks and pans can be a tight fit, so replacements need measuring before the plumber arrives." },
    { title: "Golf course and lake irrigation", body: "Homes along Sun City's golf courses and lakes often have their own irrigation tied into older backflow assemblies. Those assemblies are exposed to freezes on the few cold winter nights the area sees." },
  ],
  "sun-city-west": [
    { title: "Aging water heaters and PRVs", body: "Early-phase homes are well past their first and often second water heater, and many original pressure regulators have never been replaced. Rising pressure strains older supply lines and makes water heater relief valves drip." },
    { title: "Hard water on original fixtures", body: "Homes without a softener show heavy scale on faucets and toilet valves, and tank water heaters fill with sediment. A softener or regular flushing extends the life of whatever plumbing hasn't been replaced yet." },
  ],
  mesa: [
    { title: "Irrigation districts and flood irrigation", body: "Older Mesa neighborhoods still receive flood irrigation from SRP, with yards bermed to hold water. Standing irrigation water can find its way into cracked sewer laterals and cleanouts, so root and infiltration problems are common in those areas." },
  ],
  tempe: [
    { title: "Flood-irrigated neighborhoods", body: "Some older north and central Tempe neighborhoods still take SRP flood irrigation. Saturated soil around aging clay and cast iron laterals encourages roots and infiltration, a common cause of recurring main-line clogs in those streets." },
  ],
  chandler: [
    { title: "Downtown's older homes", body: "The streets around historic downtown Chandler include homes from the 1940s through the 1960s, with galvanized supply lines and cast iron or clay drains. Those homes need very different plumbing work from the newer subdivisions farther south." },
    { title: "Lake lots in Ocotillo", body: "Ocotillo's lakefront homes pair large irrigation systems with backflow assemblies near the water. Testing and freeze protection keep those assemblies from failing and flooding landscaping." },
  ],
  gilbert: [
    { title: "Flood irrigation in north Gilbert", body: "Parts of north Gilbert and the older Heritage District area still receive SRP flood irrigation. Saturated soil near aging sewer laterals can let roots in and water seep into cleanouts, so recurring backups there call for a camera inspection." },
  ],
};
