// Submit URLs to Bing through the Webmaster API (URL Submission), using the site's verified Bing Webmaster account.
// Bing caps this per site per day (99 at last check), so URLs go in priority order and progress is saved in
// scripts/.bing-submitted.json; run it once a day until everything is in.
// Usage: BING_WEBMASTER_API_KEY=... node scripts/bing-submit.mjs   (key also read from .env.local)
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.calicheplumbing.com").replace(/\/$/, "");
const BING_SITE = "https://calicheplumbing.com"; // the property as verified in Bing Webmaster Tools
const STATE = "scripts/.bing-submitted.json";

let key = process.env.BING_WEBMASTER_API_KEY;
if (!key && existsSync(".env.local")) key = readFileSync(".env.local", "utf8").match(/^BING_WEBMASTER_API_KEY=(.+)$/m)?.[1].trim();
if (!key) {
  console.error("Set BING_WEBMASTER_API_KEY (Bing Webmaster Tools > Settings > API access).");
  process.exit(1);
}
const api = (m, q = "") => `https://ssl.bing.com/webmaster/api.svc/json/${m}?apikey=${key}${q}`;

// Most valuable first: hubs and services, then states and guides, cities by size order in the sitemap, counties, local service pages.
const ORDER = ["pages", "services", "states", "guides", "cities", "counties", "city-services"];
const urls = [];
for (const g of ORDER) {
  const xml = await fetch(`${SITE}/sitemap-${g}.xml`).then((r) => r.text());
  urls.push(...[...xml.matchAll(/<url><loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
}

const done = new Set(existsSync(STATE) ? JSON.parse(readFileSync(STATE, "utf8")) : []);
const todo = urls.filter((u) => !done.has(u));

const quota = await fetch(api("GetUrlSubmissionQuota", `&siteUrl=${encodeURIComponent(BING_SITE)}`)).then((r) => r.json());
const left = quota?.d?.DailyQuota ?? 0;
console.log(`${urls.length} URLs in sitemaps · ${done.size} already submitted · ${todo.length} to go · Bing quota today: ${left} (month: ${quota?.d?.MonthlyQuota ?? "?"})`);
if (!left || !todo.length) process.exit(0);

const batch = todo.slice(0, left);
const res = await fetch(api("SubmitUrlBatch"), {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ siteUrl: BING_SITE, urlList: batch }),
});
const body = await res.text();
if (!res.ok) {
  console.error(`Bing rejected the batch: ${res.status} ${body}`);
  process.exit(1);
}
for (const u of batch) done.add(u);
writeFileSync(STATE, JSON.stringify([...done], null, 0));
console.log(`Submitted ${batch.length} URLs (${batch[0]} … ${batch.at(-1)}). ${todo.length - batch.length} remain; run again tomorrow.`);
