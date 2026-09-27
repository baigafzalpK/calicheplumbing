"use client";
// First-party, 30-day attribution store (UTM, click IDs, landing page, referrer, channel, device).

const KEY = "cp_attr";
const TTL = 30 * 24 * 3600 * 1000;
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "msclkid", "fbclid", "kw"];

type Attr = Record<string, string>;

function channel(a: Attr) {
  if (a.gclid || a.gbraid || a.wbraid) return "google_ads";
  if (a.msclkid) return "microsoft_ads";
  if (a.fbclid) return "meta";
  if (a.utm_medium) return a.utm_medium;
  if (a.referrer && /google|bing|duckduckgo|yahoo/.test(a.referrer)) return "organic";
  if (a.referrer) return "referral";
  return "direct";
}

export function captureAttribution() {
  try {
    const url = new URL(window.location.href);
    const found: Attr = {};
    for (const p of PARAMS) {
      const v = url.searchParams.get(p);
      if (v) found[p] = v.slice(0, 200);
    }
    const existing = readAttribution();
    if (Object.keys(found).length || !existing) {
      const a: Attr = {
        ...found,
        landing: url.pathname,
        referrer: document.referrer ? new URL(document.referrer).hostname : "",
        ts: String(Date.now()),
      };
      a.channel = channel(a);
      localStorage.setItem(KEY, JSON.stringify(a));
    }
  } catch {}
}

export function readAttribution(): Attr | null {
  try {
    const a = JSON.parse(localStorage.getItem(KEY) ?? "null") as Attr | null;
    if (!a || Date.now() - Number(a.ts) > TTL) return null;
    return { ...a, device: window.innerWidth < 768 ? "mobile" : "desktop" };
  } catch {
    return null;
  }
}
