// Auto-generated statically-bundled geo states for Cloudflare Worker & edge compatibility.
import AK from "@/data/geo/AK.json";
import AL from "@/data/geo/AL.json";
import AR from "@/data/geo/AR.json";
import AZ from "@/data/geo/AZ.json";
import CA from "@/data/geo/CA.json";
import CO from "@/data/geo/CO.json";
import CT from "@/data/geo/CT.json";
import DC from "@/data/geo/DC.json";
import DE from "@/data/geo/DE.json";
import FL from "@/data/geo/FL.json";
import GA from "@/data/geo/GA.json";
import HI from "@/data/geo/HI.json";
import IA from "@/data/geo/IA.json";
import ID from "@/data/geo/ID.json";
import IL from "@/data/geo/IL.json";
import IN from "@/data/geo/IN.json";
import KS from "@/data/geo/KS.json";
import KY from "@/data/geo/KY.json";
import LA from "@/data/geo/LA.json";
import MA from "@/data/geo/MA.json";
import MD from "@/data/geo/MD.json";
import ME from "@/data/geo/ME.json";
import MI from "@/data/geo/MI.json";
import MN from "@/data/geo/MN.json";
import MO from "@/data/geo/MO.json";
import MS from "@/data/geo/MS.json";
import MT from "@/data/geo/MT.json";
import NC from "@/data/geo/NC.json";
import ND from "@/data/geo/ND.json";
import NE from "@/data/geo/NE.json";
import NH from "@/data/geo/NH.json";
import NJ from "@/data/geo/NJ.json";
import NM from "@/data/geo/NM.json";
import NV from "@/data/geo/NV.json";
import NY from "@/data/geo/NY.json";
import OH from "@/data/geo/OH.json";
import OK from "@/data/geo/OK.json";
import OR from "@/data/geo/OR.json";
import PA from "@/data/geo/PA.json";
import RI from "@/data/geo/RI.json";
import SC from "@/data/geo/SC.json";
import SD from "@/data/geo/SD.json";
import TN from "@/data/geo/TN.json";
import TX from "@/data/geo/TX.json";
import UT from "@/data/geo/UT.json";
import VA from "@/data/geo/VA.json";
import VT from "@/data/geo/VT.json";
import WA from "@/data/geo/WA.json";
import WI from "@/data/geo/WI.json";
import WV from "@/data/geo/WV.json";
import WY from "@/data/geo/WY.json";

const STATES: Record<string, unknown> = {
  AK, AL, AR, AZ, CA, CO, CT, DC, DE, FL, GA, HI, IA, ID, IL, IN, KS, KY, LA, MA, MD, ME, MI, MN, MO, MS, MT, NC, ND, NE, NH, NJ, NM, NV, NY, OH, OK, OR, PA, RI, SC, SD, TN, TX, UT, VA, VT, WA, WI, WV, WY
};

export function getRawState<T = unknown>(abbr: string): T | undefined {
  return STATES[abbr] as T | undefined;
}
