"use client";
import Image from "next/image";
import { useState } from "react";
import type { BeforeAfter } from "@/content/beforeAfter";

export function BeforeAfterSlider({ item }: { item: BeforeAfter }) {
  const [pos, setPos] = useState(50);
  return (
    <figure className="card overflow-hidden">
      <div className="relative aspect-[4/3] select-none bg-sand-deep">
        <Image src={item.after.src} alt={item.after.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={item.before.src} alt={item.before.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg">
            ⇆
          </span>
        </div>
        <span className="absolute top-3 left-3 rounded bg-ink/80 px-2 py-1 text-xs font-semibold text-white">Before</span>
        <span className="absolute top-3 right-3 rounded bg-teal-deep/90 px-2 py-1 text-xs font-semibold text-white">After</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Before and after comparison: ${item.title}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="p-5">
        <p className="font-semibold">{item.title}</p>
        <p className="mt-1 text-sm text-muted">{item.caption}</p>
      </figcaption>
    </figure>
  );
}
