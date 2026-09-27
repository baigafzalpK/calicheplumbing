import type { CategorySlug, Article } from "./types";

// Real licensed photography (Pexels license). Credits: public/photos/CREDITS.md
export type Photo = { src: string; w: number; h: number; alt: string };

const p = (name: string, w: number, h: number, alt: string): Photo => ({ src: `/photos/${name}.webp`, w, h, alt });

export const photos = {
  phoenixAerial: p("phoenix-aerial-neighborhood", 1600, 900, "Aerial view of a Phoenix-area residential neighborhood"),
  phoenixSunset: p("phoenix-desert-sunset", 1600, 1067, "Homes on a desert mountainside in Phoenix at sunset"),
  faucet: p("bathroom-faucet-brushed-nickel", 1600, 1067, "Brushed nickel bathroom faucet on a white sink"),
  tapWater: p("glass-of-tap-water", 1600, 2409, "Filling a glass with tap water"),
  drip: p("dripping-outdoor-pipe", 1600, 2400, "Water dripping from a leaking pipe"),
  copper: p("copper-pipe-fittings", 1600, 1067, "Row of copper pipe fittings"),
  shower: p("shower-head-running", 1600, 1067, "Shower head running hot water"),
  gauge: p("water-pressure-gauge", 1600, 1067, "Water pressure gauge on a supply line"),
  sprinkler: p("lawn-sprinkler", 1600, 3578, "Irrigation sprinkler watering a lawn"),
  drain: p("sink-drain", 1600, 1200, "Stainless steel sink drain"),
  gas: p("gas-burner-flame", 1600, 2134, "Blue flame on a gas burner"),
  plumber: p("plumber-with-wrench", 1600, 2133, "Tradesperson in safety gear holding a pipe wrench"),
  wrench: p("wrench-on-sink", 1600, 2133, "Wrench resting on a wet stainless steel sink"),
};

export const categoryPhotos: Record<CategorySlug, Photo> = {
  "hard-water": photos.faucet,
  "hidden-leaks": photos.drip,
  repiping: photos.copper,
  "water-heaters": photos.shower,
  "pressure-supply": photos.gauge,
  "irrigation-backflow": photos.sprinkler,
  "drains-sewer": photos.drain,
  "gas-lines": photos.gas,
};

export const servicePhotoOverrides: Record<string, Photo> = {
  "reverse-osmosis-systems": photos.tapWater,
  "whole-house-filtration": photos.tapWater,
};

export const guidePhotos: Record<Article["category"], Photo> = {
  "Hard water": photos.faucet,
  Leaks: photos.drip,
  "Water heaters": photos.shower,
  Pipes: photos.copper,
  Outdoor: photos.sprinkler,
  Drains: photos.drain,
  Emergencies: photos.wrench,
};
