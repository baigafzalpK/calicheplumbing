import type { Article } from "./types";

const P = "2026-09-27";

export const articles: Article[] = [
  {
    slug: "why-is-my-water-bill-so-high",
    title: "Why is my water bill so high? A homeowner's leak checklist",
    seoTitle: "Why Is My Water Bill So High? A 15-Minute Leak Check",
    metaDescription:
      "A sudden jump in your water bill usually means a running toilet, a hidden leak or an irrigation problem. Here's how to find which one in 15 minutes.",
    category: "Leaks",
    status: "PUBLISHED",
    answer:
      "A high water bill usually comes from one of four things: a running toilet, a leak in the yard or under the house, an irrigation problem, or seasonal use. Turn off every fixture and the irrigation controller, then watch the meter's leak indicator. If it moves, you have a leak, and a few simple shutoff tests tell you where.",
    sections: [
      {
        heading: "First, compare the right months",
        body: [
          "Water use swings with the seasons, especially where lawns, irrigation and pools use far more in summer. Compare this month's bill to the same month last year, not to last month. A 30% or larger jump over last year with no change in habits is worth investigating.",
        ],
      },
      {
        heading: "Do the meter test",
        body: ["Your meter is usually in a box near the street or sidewalk. Lift the lid carefully, since scorpions and spiders like meter boxes."],
        list: [
          "Turn off every faucet, the dishwasher, washer, ice maker and irrigation controller.",
          "Find the small leak indicator on the meter face (often a red triangle or star).",
          "Watch it for two minutes. If it turns, water is going somewhere.",
        ],
      },
      {
        heading: "Narrow it down",
        body: ["Now split the house from the yard."],
        list: [
          "Close the house shutoff valve. If the meter stops, the leak is inside the house. If it keeps turning, it's between the meter and the house, or in the irrigation mainline.",
          "Inside, put a few drops of food coloring in each toilet tank. Color in the bowl after 15 minutes means a leaking flapper.",
          "Close the cold inlet on the water heater. If the meter slows or stops, suspect a hot-side slab leak.",
        ],
      },
      {
        heading: "The usual suspects",
        body: [
          "Toilet flappers and fill valves are the most common culprit, and they wear out faster in hard water. Irrigation mainlines leak quietly underground. Slab-foundation homes get leaks on copper hot lines under the concrete, and basement homes can have a leaking service line or a pipe that split in a freeze.",
        ],
      },
    ],
    whenToCall: [
      "The meter moves with everything off and it isn't a toilet.",
      "You find a warm spot on the floor or hear running water.",
      "The yard has a soggy or unusually green patch between the meter and the house.",
    ],
    faqs: [
      { q: "Can a running toilet really raise my bill that much?", a: "Yes. A constantly running toilet can waste thousands of gallons a month, which is often more than a slow slab leak." },
      { q: "Will my water utility adjust the bill for a leak?", a: "Many water providers offer a one-time leak adjustment once it's repaired. Ask your provider and keep the repair invoice." },
    ],
    services: ["slab-leak-detection", "irrigation-leak-repair", "main-water-line-repair"],
    relatedArticles: ["warm-spot-on-floor", "burst-pipe-what-to-do"],
    published: P,
    updated: "2026-10-05",
    reviewedBy: null,
  },
  {
    slug: "warm-spot-on-floor",
    title: "Warm spot on the floor? What it means and what to do",
    seoTitle: "Warm Spot on the Floor? Signs of a Hot-Water Slab Leak",
    metaDescription:
      "A warm or hot spot on a tile or concrete floor usually means a hot-water line is leaking under the slab. How to confirm it and what happens next.",
    category: "Leaks",
    status: "PUBLISHED",
    answer:
      "A warm spot on a tile or concrete floor almost always means a hot-water line is leaking under the slab. Confirm it by shutting the cold inlet valve on your water heater. If the meter's leak indicator stops, the leak is on the hot side. Leave the water heater's supply off between uses until it's repaired.",
    sections: [
      {
        heading: "Why it happens",
        body: [
          "Slab-on-grade homes, the norm across the South and Southwest, often have copper hot lines running under the concrete. Hot lines expand and contract every time they're used, and over years they wear against gravel and concrete until a pinhole forms. The escaping hot water warms the slab above it.",
        ],
      },
      {
        heading: "How to confirm it",
        body: ["Do these checks before calling so you can tell the plumber what you found."],
        list: [
          "Walk the floor barefoot, or use an infrared thermometer, to map the warm area.",
          "Check the meter's leak indicator with everything off.",
          "Close the water heater's cold inlet valve and watch the meter again.",
          "Listen near the warm spot for hissing or running water.",
        ],
      },
      {
        heading: "What not to do",
        body: [
          "Don't start breaking tile to look for it. A leak detection visit pinpoints the spot, and a reroute through the attic may mean no concrete needs to be opened at all.",
        ],
      },
      {
        heading: "Repair options",
        body: [
          "The three options are a spot repair through the slab, rerouting the line through the attic and walls, or a full repipe if the home has had several leaks. A plumber explains which fits your home after detection.",
        ],
      },
    ],
    whenToCall: [
      "The warm spot is confirmed and the meter moves with everything off.",
      "Flooring is lifting or baseboards are swelling.",
      "It's your second or third slab leak.",
    ],
    faqs: [
      { q: "Is a slab leak an emergency?", a: "It's urgent rather than an emergency: water and energy are lost every hour, and soil under the slab gets saturated. Shut the water heater's supply between uses and book detection soon." },
      { q: "Can I keep using hot water until it's fixed?", a: "Briefly, but it wastes energy and water. Many homeowners close the water heater's cold inlet except when they need hot water." },
    ],
    services: ["slab-leak-detection", "slab-leak-repair", "whole-house-repiping"],
    relatedArticles: ["why-is-my-water-bill-so-high", "polybutylene-pipes"],
    published: P,
    updated: "2026-10-05",
    reviewedBy: null,
  },
  {
    slug: "white-crust-on-faucets",
    title: "White crust on faucets and shower glass: hard water explained",
    seoTitle: "White Crust on Faucets? Hard Water Scale Explained",
    metaDescription:
      "That white crust is calcium and magnesium scale from hard water. What it does inside your plumbing, how to clean it, and how to stop it.",
    category: "Hard water",
    status: "PUBLISHED",
    answer:
      "The white or tan crust on faucets, shower heads and glass is scale: calcium and magnesium left behind when hard water dries. Vinegar removes it from surfaces, but the same scale builds up inside water heaters, tankless units and valves. A water softener is the fix that stops it at the source.",
    sections: [
      {
        heading: "Why some water is so hard",
        body: [
          "Water picks up calcium and magnesium as it moves through limestone, chalk and desert rock. That's why water is generally hard across the Southwest, Texas, Florida and much of the Midwest, and softer in New England, the Southeast and the Pacific Northwest. Above about 7 grains per gallon (120 mg/L) is considered hard, and some Southwest systems report well into the teens. Your provider's annual water quality report lists your number.",
        ],
      },
      {
        heading: "What scale does where you can't see it",
        body: [],
        list: [
          "It settles in water heater tanks, making them rumble and wasting energy.",
          "It lines tankless heat exchangers and triggers error codes.",
          "It sticks faucet cartridges and toilet fill valves.",
          "It clogs dishwasher and washing machine inlet screens.",
        ],
      },
      {
        heading: "Cleaning what you can see",
        body: [
          "Soak shower heads and aerators in white vinegar for an hour, then scrub. For glass, use a vinegar-water mix or a descaling cleaner made for your finish. Test on stone first, because acid etches marble and travertine.",
        ],
      },
      {
        heading: "Stopping it",
        body: [
          "A water softener removes hardness minerals from all the water that passes through it. Many homes in hard-water areas have a pre-plumbed softener loop in the garage or basement. Reverse osmosis at the kitchen sink handles drinking water.",
        ],
      },
    ],
    whenToCall: [
      "Your water heater rumbles or your tankless unit shows scale errors.",
      "You want a softener installed, or a loop added where none exists.",
    ],
    faqs: [
      { q: "Is hard water safe to drink?", a: "Yes. Hardness is a nuisance and a maintenance problem, not a health hazard. Taste is a separate issue that RO or carbon filtration addresses." },
      { q: "Do salt-free conditioners work?", a: "Some reduce scale formation on surfaces but don't remove hardness. Results vary, so ask for independent test data before buying." },
    ],
    services: ["water-softener-installation", "reverse-osmosis-systems", "water-heater-flush"],
    relatedArticles: ["softener-vs-ro-vs-filter", "water-heater-rumbling"],
    published: P,
    updated: "2026-10-05",
    reviewedBy: null,
  },
  {
    slug: "softener-vs-ro-vs-filter",
    title: "Water softener vs. reverse osmosis vs. whole-house filter",
    seoTitle: "Water Softener vs Reverse Osmosis vs Whole-House Filter",
    metaDescription:
      "Softeners remove hardness, RO purifies drinking water, and carbon filters fix taste and chlorine. Which ones your home actually needs.",
    category: "Hard water",
    status: "PUBLISHED",
    answer:
      "They solve different problems. A softener removes hardness to protect plumbing and appliances. Reverse osmosis purifies drinking water at one tap. A whole-house carbon filter improves taste and chlorine at every tap. Many hard-water homes use a softener plus RO, and add a carbon filter if chlorine taste bothers them.",
    sections: [
      {
        heading: "Water softener",
        body: ["Swaps calcium and magnesium for sodium or potassium through ion exchange, for all the water in the house."],
        list: ["Protects water heaters, fixtures and appliances", "Ends most spotting and crust", "Doesn't improve taste or remove chlorine"],
      },
      {
        heading: "Reverse osmosis",
        body: ["Pushes water through a fine membrane at the kitchen sink."],
        list: ["Greatly reduces dissolved solids and many contaminants", "Makes great-tasting drinking and ice water", "Only treats one tap, and the membrane lasts longer with softened water"],
      },
      {
        heading: "Whole-house carbon filter",
        body: ["Uses activated carbon media at the main line."],
        list: ["Reduces chlorine, taste and odor everywhere", "Catalytic carbon handles chloramine", "Doesn't remove hardness"],
      },
      {
        heading: "Putting it together",
        body: [
          "For most homes the order is filter (optional), then softener, then RO at the kitchen. Keep irrigation and hose bibs on hard water so softened water doesn't add sodium to the soil.",
        ],
      },
    ],
    whenToCall: ["You're installing more than one system and need them plumbed in the right order.", "There's no softener loop and one has to be added at the main line."],
    faqs: [
      { q: "Can I drink softened water?", a: "Most people can. It contains a small amount of added sodium. People on sodium-restricted diets often drink RO water or use potassium in the softener." },
    ],
    services: ["water-softener-installation", "reverse-osmosis-systems", "whole-house-filtration"],
    relatedArticles: ["white-crust-on-faucets", "water-heater-rumbling"],
    published: P,
    updated: "2026-10-05",
    reviewedBy: null,
  },
  {
    slug: "polybutylene-pipes",
    title: "Polybutylene pipes: how to spot them and what to do",
    seoTitle: "Polybutylene Pipes: How to Identify Them & What to Do",
    metaDescription:
      "Many US homes built around 1978–1995 have polybutylene supply pipe. How to identify it, why it fails, what insurers ask, and what replacement involves.",
    category: "Pipes",
    status: "PUBLISHED",
    answer:
      "Polybutylene is a gray (sometimes blue or black) plastic supply pipe used in many homes from about 1978 to 1995. Look for 'PB2110' stamped on the pipe at the water heater, under sinks or at toilet supplies. It can fail without warning, so most owners plan a repipe, usually in PEX.",
    sections: [
      {
        heading: "Where it turns up",
        body: [
          "Polybutylene was installed in millions of homes, most heavily in the Sunbelt and other fast-growing areas that built a lot of housing between the late 1970s and mid-1990s: Florida, Texas, Arizona, Georgia, the Carolinas and the West Coast among them. It also turns up in manufactured homes from the period. Insurers and buyers frequently ask about it.",
        ],
      },
      {
        heading: "How to identify it",
        body: [],
        list: [
          "Flexible gray pipe, about 1/2\" to 1\" in diameter",
          "'PB2110' printed along the pipe",
          "Copper or aluminum crimp rings, or gray plastic fittings",
          "Often visible at the water heater, under sinks and at toilets",
        ],
      },
      {
        heading: "Why it fails",
        body: [
          "The pipe and its fittings can degrade from within over time, and failures often happen at fittings. Leaks may be slow drips or sudden bursts.",
        ],
      },
      {
        heading: "What replacement involves",
        body: [
          "A full repipe runs new PEX through the attic and walls, abandons the old lines, and is pressure-tested and inspected under permit. Most single-family homes are finished in a few working days.",
        ],
      },
    ],
    whenToCall: ["You've confirmed polybutylene and want a repipe price.", "You're buying or selling a home from the 1978–1995 era."],
    faqs: [
      { q: "Can I just replace the fittings?", a: "Some homes had fittings replaced in the 1990s, but the pipe itself still ages. Most plumbers recommend a full repipe." },
      { q: "Does homeowners insurance cover polybutylene?", a: "Coverage varies, and some insurers decline or surcharge homes with polybutylene. Ask your agent." },
    ],
    services: ["polybutylene-replacement", "whole-house-repiping"],
    relatedArticles: ["warm-spot-on-floor", "water-pressure-too-high"],
    published: P,
    updated: "2026-10-05",
    reviewedBy: null,
  },
  {
    slug: "water-heater-rumbling",
    title: "Why is my water heater rumbling or popping?",
    seoTitle: "Water Heater Rumbling or Popping? Sediment Explained",
    metaDescription:
      "Rumbling and popping come from hard-water sediment in the bottom of the tank. What it means, how flushing helps, and when it's time to replace.",
    category: "Water heaters",
    status: "PUBLISHED",
    answer:
      "Rumbling or popping means sediment from hard water has built up in the bottom of the tank. Water trapped under the sediment boils in bursts as the burner or element heats it. Flushing the tank can help if the heater isn't too old. A loud, old tank is often close to replacement.",
    sections: [
      {
        heading: "What's happening inside",
        body: [
          "Every time the tank heats hard water, calcium carbonate drops out and settles. Over years it forms a layer that traps water against the heat source. That water flashes to steam, and you hear it as pops, cracks and rumbles.",
        ],
      },
      {
        heading: "Why it's more than a noise",
        body: [],
        list: ["Sediment insulates the burner from the water, which wastes energy", "It overheats the tank bottom and shortens the tank's life", "In electric heaters it buries the lower element and burns it out"],
      },
      {
        heading: "Flush or replace?",
        body: [
          "If the heater is under about 8 years old, a professional flush can quiet it and extend its life. If it's older, or the sediment has hardened, flushing may not help much and the drain valve may not reseal. Replacing it, and adding a softener, is often the better spend.",
        ],
      },
    ],
    whenToCall: ["There's rust-colored water or any leak at the tank.", "The tank is over 10 years old and noisy.", "Hot water runs out much faster than it used to."],
    faqs: [
      { q: "Is a rumbling water heater dangerous?", a: "The noise itself usually isn't. A leak, a dripping relief valve or a gas smell is, so shut the unit off and call." },
    ],
    services: ["water-heater-flush", "water-heater-replacement", "water-softener-installation"],
    relatedArticles: ["white-crust-on-faucets", "softener-vs-ro-vs-filter"],
    published: P,
    updated: "2026-10-05",
    reviewedBy: null,
  },
  {
    slug: "water-pressure-too-high",
    title: "Is my water pressure too high? How to test it and why it matters",
    seoTitle: "Is My Water Pressure Too High? How to Test It",
    metaDescription:
      "High water pressure wears out fixtures, supply lines and appliances. How to test it with a $10 gauge and what to do if your PRV has failed.",
    category: "Pipes",
    status: "PUBLISHED",
    answer:
      "Screw a pressure gauge onto an outdoor hose bib with everything inside off. Readings over 80 psi are too high, and many plumbers aim for 50 to 70. High pressure usually means the pressure reducing valve (PRV) on your main line has failed, and replacing it protects every fixture in the house.",
    sections: [
      {
        heading: "Signs of high pressure",
        body: [],
        list: ["Banging pipes when valves close", "Toilets that run or refill on their own", "A dripping water heater relief valve", "Burst washer hoses or failed supply lines"],
      },
      {
        heading: "How to test",
        body: [
          "Buy a hose-bib pressure gauge at a hardware store. Attach it to the hose bib closest to the main line, open the bib fully with everything inside off, and read it. For a fuller picture, use a gauge with a max-reading needle and leave it overnight, since pressure often rises at night when demand drops.",
        ],
      },
      {
        heading: "What a failing PRV looks like",
        body: [
          "PRVs wear out, commonly in 10 to 15 years. A failed PRV may let full street pressure through or creep up over time. Adjusting a worn valve rarely holds, so replacement is the usual fix.",
        ],
      },
    ],
    whenToCall: ["Your reading is over 80 psi.", "The pressure creeps up overnight.", "The relief valve on the water heater is dripping."],
    faqs: [
      { q: "Does high pressure cause slab leaks?", a: "It adds stress to every pipe and joint. It isn't the only cause, but it can speed up failures in aging pipe." },
    ],
    services: ["pressure-regulator-valve", "water-heater-replacement", "whole-house-repiping"],
    relatedArticles: ["polybutylene-pipes", "burst-pipe-what-to-do"],
    published: P,
    updated: "2026-10-05",
    reviewedBy: null,
  },
  {
    slug: "protect-backflow-from-freezing",
    title: "How to protect your backflow preventer on freezing nights",
    seoTitle: "Protect Your Backflow Preventer From Freezing",
    metaDescription:
      "Exposed backflow assemblies crack when they freeze. How to winterize in cold climates, cover them on rare freeze nights, and what to do if one breaks.",
    category: "Outdoor",
    status: "PUBLISHED",
    answer:
      "Exposed brass backflow assemblies crack when water inside them freezes. In cold climates, shut off the irrigation supply and drain or blow out the system each fall. In warm climates, put an insulated cover over the assembly when a freeze is forecast, and on hard-freeze nights shut the supply and drain it per the manufacturer's instructions.",
    sections: [
      {
        heading: "Why backflows break",
        body: [
          "Irrigation backflow assemblies sit above ground, fully exposed. In the North they're winterized every fall as routine. The bigger risk is in warm-winter places like Phoenix, Texas and Florida, where homeowners rarely think about freezing, so a single night in the 20s can crack a body or bonnet that has never been protected.",
        ],
      },
      {
        heading: "Before a freeze",
        body: [],
        list: ["Fit an insulated backflow bag or box cover", "Wrap exposed pipe on either side", "Know where the irrigation shutoff is"],
      },
      {
        heading: "If it cracks",
        body: [
          "Close the irrigation shutoff valve upstream of the assembly. The house can usually keep running normally. A cracked assembly needs repair or replacement, and some cities require a new test after replacement.",
        ],
      },
    ],
    whenToCall: ["Water sprays from the assembly after a cold night.", "There's no shutoff you can find.", "Your city requires a test after repair."],
    faqs: [
      { q: "Should I cover hose bibs too?", a: "Foam faucet covers are cheap and worth putting on exposed hose bibs on forecast freeze nights." },
    ],
    services: ["backflow-testing", "irrigation-leak-repair"],
    relatedArticles: ["burst-pipe-what-to-do", "why-is-my-water-bill-so-high"],
    published: P,
    updated: "2026-10-05",
    reviewedBy: null,
  },
  {
    slug: "burst-pipe-what-to-do",
    title: "Burst pipe or major leak: what to do in the first 10 minutes",
    seoTitle: "Burst Pipe? What to Do in the First 10 Minutes",
    metaDescription:
      "Step-by-step: find your main shutoff, protect electrical, start drying, document for insurance, and call a plumber. Where to find the shutoff in any home.",
    category: "Emergencies",
    status: "PUBLISHED",
    answer:
      "Shut off the main water valve first. In basement homes it's usually on the wall where the main enters, near the meter. In slab homes it's often on the main line near the front hose bib or in the garage by the water heater. Then turn off power to any wet area, move valuables, start removing water, photograph everything for insurance, and call a plumber.",
    sections: [
      {
        heading: "1. Stop the water",
        body: ["Find the main shutoff. Depending on how your home is built, look:"],
        list: [
          "In the basement or crawl space on the front wall, where the main enters next to the water meter",
          "In a utility closet or near the water heater, in homes without basements",
          "On the main line where it rises out of the ground near the front hose bib, common on slab homes",
          "At the curb box or meter pit by the street (it may need a meter key)",
        ],
      },
      {
        heading: "2. Make it safe",
        body: [
          "If water is near outlets, a panel or appliances, turn off those breakers, and don't stand in water to do it. If the water heater is involved, shut its gas or power.",
        ],
      },
      {
        heading: "3. Limit the damage",
        body: [],
        list: ["Move furniture and electronics", "Mop and wet-vac standing water", "Run fans; open cabinets to dry them out", "Photograph and video everything before cleanup"],
      },
      {
        heading: "4. Call for help",
        body: [
          "Call a plumber to repair the pipe. For wet drywall, carpet or cabinets, a water damage restoration company can dry the structure properly so mold doesn't follow.",
        ],
      },
    ],
    whenToCall: ["Water is still running after you've closed what you can.", "You can't find or turn the main shutoff.", "There's sewage involved."],
    faqs: [
      { q: "Should I turn off the water heater after closing the main?", a: "Yes, turn off gas or power to a tank that may drain. Heating an empty tank damages it." },
    ],
    services: ["slab-leak-repair", "pinhole-leak-repair", "main-water-line-repair"],
    relatedArticles: ["smell-gas-what-to-do", "protect-backflow-from-freezing"],
    published: P,
    updated: "2026-10-05",
    reviewedBy: null,
  },
  {
    slug: "smell-gas-what-to-do",
    title: "Smell gas at home? What to do right now",
    seoTitle: "Smell Gas at Home? What to Do Right Now",
    metaDescription:
      "If you smell gas, leave first and call from outside. Who to call (your gas utility's emergency line or 911), what not to touch, and what happens next.",
    category: "Emergencies",
    status: "PUBLISHED",
    answer:
      "Leave the house immediately. Don't switch lights on or off, use the garage door, or make calls inside. From a safe distance, call 911 or your gas utility's emergency number, which is printed on your gas bill. Once the utility has made it safe, a plumber repairs the leak.",
    sections: [
      {
        heading: "Get out first",
        body: [
          "Natural gas smells like rotten eggs because of an added odorant. Any spark, from a switch, a doorbell or a phone, can ignite a strong concentration. Leave doors open as you go if it's safe, and get everyone out, pets included.",
        ],
      },
      {
        heading: "Who to call",
        body: [],
        list: ["911 for an immediate hazard", "Your gas utility's 24-hour emergency line, printed on your bill and on the utility's website", "Your propane supplier, if your home runs on a propane tank"],
      },
      {
        heading: "After the utility visit",
        body: [
          "The utility may shut off and lock the meter. A licensed plumber then locates and repairs the leak, pressure-tests the system and relights appliances, and the utility restores service.",
        ],
      },
    ],
    whenToCall: ["The utility has made it safe and you need the line repaired.", "You want a gas line added for a new appliance."],
    faqs: [
      { q: "Can I shut off the gas at the meter myself?", a: "Only if it's safe and you know how. Otherwise leave it to the utility or the fire department." },
    ],
    services: ["gas-line-repair", "gas-appliance-hookup"],
    relatedArticles: ["burst-pipe-what-to-do", "water-heater-rumbling"],
    published: P,
    updated: "2026-10-05",
    reviewedBy: null,
  },
];

export const publishedArticles = articles.filter((a) => a.status === "PUBLISHED");
export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
