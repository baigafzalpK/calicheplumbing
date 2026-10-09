import { readFileSync, existsSync } from "node:fs";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.calicheplumbing.com").replace(/\/$/, "");

let key = process.env.INDEXNOW_KEY;
if (!key && existsSync(".env.local")) {
  const envContent = readFileSync(".env.local", "utf-8");
  const match = envContent.match(/^INDEXNOW_KEY=(.+)$/m);
  if (match) key = match[1].trim();
}

if (!key) {
  console.error("Set INDEXNOW_KEY and add public/<key>.txt first.");
  process.exit(1);
}
let urls = process.argv.slice(2).map((p) => (p.startsWith("http") ? p : SITE + p));
if (!urls.length) {
  try {
    const index = await fetch(`${SITE}/sitemap.xml`).then((r) => r.text());
    for (const sm of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const x = await fetch(sm[1]).then((r) => r.text());
      urls.push(...[...x.matchAll(/<url><loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
    }
  } catch (e) {
    console.warn("Could not fetch remote sitemaps, falling back to homepage and core hubs:", e.message);
    urls = [
      `${SITE}/`,
      `${SITE}/plumbing-services/`,
      `${SITE}/emergency-plumbing/`,
      `${SITE}/locations/`,
      `${SITE}/resources/`,
    ];
  }
}

// Remove duplicates
urls = [...new Set(urls)];
console.log(`Submitting ${urls.length} URLs to IndexNow endpoints for ${new URL(SITE).host}...`);

const payload = {
  host: new URL(SITE).host,
  key,
  keyLocation: `${SITE}/${key}.txt`,
  urlList: urls,
};

const endpoints = [
  { name: "IndexNow (Main)", url: "https://api.indexnow.org/indexnow" },
  { name: "Bing IndexNow", url: "https://www.bing.com/indexnow" },
  { name: "Yandex IndexNow", url: "https://yandex.com/indexnow" },
  { name: "Seznam.cz IndexNow", url: "https://search.seznam.cz/indexnow" },
];

for (const ep of endpoints) {
  try {
    const res = await fetch(ep.url, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    console.log(`[${ep.name}] Status: ${res.status}`);
  } catch (err) {
    console.error(`[${ep.name}] Error: ${err.message}`);
  }
}
