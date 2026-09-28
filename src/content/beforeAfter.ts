// Stock example pairs (Pexels), clearly labeled as examples, not jobs from our network.
// Replace with real job photos (with homeowner consent) as they come in.
export type BeforeAfter = {
  id: string;
  title: string;
  caption: string;
  service: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

export const beforeAfter: BeforeAfter[] = [
  {
    id: "repipe",
    title: "Corroded pipe → new copper",
    caption: "Rusted metal supply pipe is the kind of line a repipe replaces.",
    service: "whole-house-repiping",
    before: { src: "/photos/before-rusty-pipes.webp", alt: "Example: stack of heavily rusted metal pipes" },
    after: { src: "/photos/after-copper-pipe-fittings.webp", alt: "Example: new copper pipe fittings" },
  },
  {
    id: "faucet",
    title: "Scale-crusted fixture → new faucet",
    caption: "Hard-water scale and corrosion around an old tap, next to a clean new fixture.",
    service: "water-softener-installation",
    before: { src: "/photos/before-crusted-faucet.webp", alt: "Example: old tap with mineral crust and a leak stain" },
    after: { src: "/photos/after-bathroom-faucet-brushed-nickel.webp", alt: "Example: new brushed nickel bathroom faucet" },
  },
  {
    id: "drip",
    title: "Dripping spigot → replaced fixture",
    caption: "A constant drip wastes water every hour; a new fixture stops it.",
    service: "pinhole-leak-repair",
    before: { src: "/photos/before-dripping-spigot.webp", alt: "Example: outdoor spigot dripping water" },
    after: { src: "/photos/after-new-kitchen-faucet.webp", alt: "Example: new chrome faucet running over a sink" },
  },
];
