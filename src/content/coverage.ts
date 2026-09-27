// LeadSmart plumbing coverage, Arizona (source: leadsmart-coverage.netlify.app, data date 2026-09-26).
// Used by the ZIP checker and lead routing. Payout tiers stay out of the UI.

export const coverageDate = "2026-09-26";

export const coveredZips: Record<string, { city: string; tier: "A" | "B" }> = {};

const A =
  "85001:Phoenix 85003:Phoenix 85004:Phoenix 85006:Phoenix 85007:Phoenix 85008:Phoenix 85009:Phoenix 85012:Phoenix 85013:Phoenix 85014:Phoenix 85015:Phoenix 85016:Phoenix 85017:Phoenix 85018:Phoenix 85019:Phoenix 85020:Phoenix 85021:Phoenix 85022:Phoenix 85023:Phoenix 85024:Phoenix 85026:Phoenix 85027:Phoenix 85028:Phoenix 85029:Phoenix 85031:Phoenix 85032:Phoenix 85033:Phoenix 85034:Phoenix 85035:Phoenix 85037:Phoenix 85040:Phoenix 85041:Phoenix 85042:Phoenix 85043:Phoenix 85050:Phoenix 85051:Phoenix 85053:Phoenix 85054:Phoenix 85083:Phoenix 85085:Phoenix 85086:Phoenix 85087:New_River 85250:Scottsdale 85251:Scottsdale 85253:Paradise_Valley 85254:Scottsdale 85255:Scottsdale 85256:Scottsdale 85257:Scottsdale 85258:Scottsdale 85260:Scottsdale 85262:Scottsdale 85266:Scottsdale 85301:Glendale 85302:Glendale 85303:Glendale 85304:Glendale 85305:Glendale 85306:Glendale 85307:Glendale 85308:Glendale 85309:Luke_AFB 85310:Glendale 85323:Avondale 85331:Cave_Creek 85335:El_Mirage 85338:Goodyear 85340:Litchfield_Park 85345:Peoria 85351:Sun_City 85353:Tolleson 85355:Waddell 85363:Youngtown 85373:Sun_City 85374:Surprise 85375:Sun_City_West 85379:Surprise 85381:Peoria 85382:Peoria 85383:Peoria 85387:Surprise 85388:Surprise 85392:Avondale 85395:Goodyear";
const B =
  "85044:Phoenix 85045:Phoenix 85048:Phoenix 85142:Queen_Creek 85201:Mesa 85202:Mesa 85203:Mesa 85204:Mesa 85205:Mesa 85206:Mesa 85207:Mesa 85208:Mesa 85209:Mesa 85210:Mesa 85212:Mesa 85213:Mesa 85215:Mesa 85224:Chandler 85225:Chandler 85226:Chandler 85233:Gilbert 85234:Gilbert 85248:Chandler 85249:Chandler 85259:Scottsdale 85268:Fountain_Hills 85281:Tempe 85282:Tempe 85283:Tempe 85284:Tempe 85286:Chandler 85287:Tempe 85295:Gilbert 85296:Gilbert 85297:Gilbert 85298:Gilbert 85339:Laveen 85377:Carefree 85378:Surprise";

for (const [list, tier] of [[A, "A"], [B, "B"]] as const) {
  for (const pair of list.split(" ")) {
    const [zip, city] = pair.split(":");
    coveredZips[zip] = { city: city.replace(/_/g, " "), tier };
  }
}

export function zipCoverage(zip: string) {
  return coveredZips[zip] ?? null;
}
