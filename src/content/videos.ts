// Short explainer clips (AI-generated with Muse, October 2026). Silent, 10 s, 1280x720, captions burned in.
// They're illustrations, not footage of jobs from our network; the on-page caption says so.
export type Video = { id: string; title: string; description: string; src: string; poster: string; duration: number; uploaded: string };

const v = (id: string, title: string, description: string): Video => ({
  id,
  title,
  description,
  src: `/videos/${id}.mp4`,
  poster: `/videos/${id}.webp`,
  duration: 10,
  uploaded: "2026-10-12",
});

export const videos = {
  brand: v("caliche-brand", "Plumbing help for every kind of home", "Older rowhouses, slab ranches and basement homes each fail in their own ways. One call connects you with a licensed local plumber."),
  frozen: v("frozen-pipe", "Frozen pipe? Shut off the main first", "If a pipe freezes, shut off the main water valve before it thaws, then call a licensed plumber."),
  slab: v("slab-leak", "Warm spot on your floor? It may be a slab leak", "A warm patch on a tile or concrete floor often means a hot-water line is leaking under the slab."),
  heater: v("water-heater", "Water heater rumbling? Sediment explained", "Rumbling or popping usually means sediment has built up in the bottom of the tank."),
  leak: v("leak-check", "High water bill? Try a 15-minute leak check", "Turn everything off and watch the meter. If it still moves, you have a leak."),
  gas: v("gas-smell", "Smell gas? Leave first, then call", "If you smell gas, get everyone out, then call your gas utility or 911 from outside."),
} as const;

/** Which clip goes on which service or guide page. */
export const serviceVideos: Record<string, Video> = {
  "frozen-pipe-repair": videos.frozen,
  "slab-leak-detection": videos.slab,
  "slab-leak-repair": videos.slab,
  "water-heater-replacement": videos.heater,
  "water-heater-flush": videos.heater,
  "gas-line-repair": videos.gas,
};
export const guideVideos: Record<string, Video> = {
  "burst-pipe-what-to-do": videos.frozen,
  "warm-spot-on-floor": videos.slab,
  "water-heater-rumbling": videos.heater,
  "why-is-my-water-bill-so-high": videos.leak,
  "smell-gas-what-to-do": videos.gas,
};
