import { existsSync, readFileSync } from "node:fs";

const key = "a8dd456765ad4335a9a1962a893e9120";
const SITE = "https://www.calicheplumbing.com";

const ENDPOINTS = [
  { name: "IndexNow Main API", url: "https://api.indexnow.org/indexnow" },
  { name: "Bing IndexNow", url: "https://www.bing.com/indexnow" },
  { name: "Yandex IndexNow", url: "https://yandex.com/indexnow" },
  { name: "Seznam.cz IndexNow", url: "https://search.seznam.cz/indexnow" },
  { name: "Naver IndexNow", url: "https://indexnow.naver.com/indexnow" }
];

async function main() {
  console.log("=== STEP 1: Fetching all sitemap URLs ===");
  const index = await fetch(`${SITE}/sitemap.xml`).then((r) => r.text());
  const urls = [];
  for (const sm of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const x = await fetch(sm[1]).then((r) => r.text());
    urls.push(...[...x.matchAll(/<url><loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  }
  console.log(`Discovered ${urls.length} URLs across all sitemaps.`);

  console.log("\n=== STEP 2: Verifying live key file ===");
  const keyRes = await fetch(`${SITE}/${key}.txt`);
  const keyContent = await keyRes.text();
  console.log(`Key file live response (${keyRes.status}): "${keyContent.trim()}"`);

  console.log("\n=== STEP 3: Submitting Batch Payload to All Search Engines ===");
  const hosts = ["www.calicheplumbing.com", "calicheplumbing.com"];

  for (const host of hosts) {
    const payload = {
      host,
      key,
      keyLocation: `https://${host}/${key}.txt`,
      urlList: urls
    };

    console.log(`\n--- Host: ${host} ---`);
    for (const ep of ENDPOINTS) {
      try {
        const res = await fetch(ep.url, {
          method: "POST",
          headers: { "content-type": "application/json; charset=utf-8" },
          body: JSON.stringify(payload)
        });
        const text = await res.text().catch(() => "");
        console.log(`[${ep.name}] Status: ${res.status} | Response: ${text || "OK / Empty"}`);
      } catch (err) {
        console.error(`[${ep.name}] Error: ${err.message}`);
      }
    }
  }

  console.log("\n=== STEP 4: Submitting GET ping for top pages ===");
  const topUrls = [
    `${SITE}/`,
    `${SITE}/plumbing-services/`,
    `${SITE}/emergency-plumbing/`,
    `${SITE}/locations/`,
    `${SITE}/resources/`
  ];

  for (const u of topUrls) {
    for (const ep of ENDPOINTS) {
      try {
        const getUrl = `${ep.url}?url=${encodeURIComponent(u)}&key=${key}&keyLocation=${encodeURIComponent(`${SITE}/${key}.txt`)}`;
        const res = await fetch(getUrl);
        const text = await res.text().catch(() => "");
        console.log(`GET [${ep.name}] for ${u} -> Status: ${res.status} ${text ? `(${text.slice(0, 80)})` : ""}`);
      } catch (err) {
        console.error(`GET [${ep.name}] Error: ${err.message}`);
      }
    }
  }

  console.log("\n=== STEP 5: Pinging Search Engine Sitemaps ===");
  const sitemaps = [
    `${SITE}/sitemap.xml`,
    `${SITE}/sitemap-services.xml`,
    `${SITE}/sitemap-locations.xml`,
    `${SITE}/sitemap-guides.xml`,
    `${SITE}/sitemap-pages.xml`
  ];

  for (const sm of sitemaps) {
    try {
      const pingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sm)}`;
      const res = await fetch(pingUrl);
      console.log(`Bing Sitemap Ping: ${sm} -> Status: ${res.status}`);
    } catch (err) {
      console.error(`Bing Sitemap Ping Error: ${err.message}`);
    }
  }

  console.log("\n=== ALL INDEXING SUBMISSIONS COMPLETED ===");
}

main().catch(console.error);
