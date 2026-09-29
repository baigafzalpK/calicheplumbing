// Notify Bing/Yandex via IndexNow. Needs INDEXNOW_KEY and public/<key>.txt containing the key.
// npm run indexnow            -> every URL in the live sitemaps
// npm run indexnow -- /a/ /b/ -> only those paths
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.calicheplumbing.com").replace(/\/$/, "");
const key = process.env.INDEXNOW_KEY;
if (!key) {
  console.error("Set INDEXNOW_KEY and add public/<key>.txt first.");
  process.exit(1);
}
let urls = process.argv.slice(2).map((p) => SITE + p);
if (!urls.length) {
  const index = await fetch(`${SITE}/sitemap.xml`).then((r) => r.text());
  for (const sm of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const x = await fetch(sm[1]).then((r) => r.text());
    urls.push(...[...x.matchAll(/<url><loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  }
}
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key, keyLocation: `${SITE}/${key}.txt`, urlList: urls }),
});
console.log(`IndexNow ${res.status} for ${urls.length} URLs`);
