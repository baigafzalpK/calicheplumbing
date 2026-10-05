"use client";
import { useEffect, useState } from "react";

export type ZipHit = { city: string; state: string } | null;
const cache = new Map<string, ZipHit>();

export async function lookupZip(zip: string): Promise<ZipHit> {
  if (cache.has(zip)) return cache.get(zip)!;
  const r = await fetch(`/api/zip/?zip=${zip}`);
  if (!r.ok) return null;
  const d = (await r.json()) as { covered: boolean; city?: string; state?: string };
  const hit = d.covered ? { city: d.city!, state: d.state! } : null;
  cache.set(zip, hit);
  return hit;
}

/** undefined while the ZIP is incomplete or loading; null when not covered. */
export function useZipCoverage(zip: string): ZipHit | undefined {
  const [hit, setHit] = useState<ZipHit | undefined>(undefined);
  useEffect(() => {
    if (!/^\d{5}$/.test(zip)) return setHit(undefined);
    let live = true;
    lookupZip(zip).then((h) => live && setHit(h)).catch(() => live && setHit(undefined));
    return () => {
      live = false;
    };
  }, [zip]);
  return /^\d{5}$/.test(zip) ? hit : undefined;
}
