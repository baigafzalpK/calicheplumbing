const urls = [
  '/',
  '/robots.txt',
  '/sitemap.xml',
  '/sitemap-cities.xml',
  '/sitemap-counties.xml',
  '/sitemap-services.xml',
  '/2a368135cc8e44f4ba14f0711bdf2137.txt',
  '/plumbing-services/water-softener-installation/',
  '/locations/arizona/',
  '/locations/arizona/phoenix/',
  '/locations/arizona/phoenix/slab-leak-repair/',
  '/locations/california/los-angeles/',
  '/locations/alabama/county/jefferson-county/',
  '/resources/why-is-my-water-bill-so-high/',
  '/emergency-plumbing/',
  '/about/',
  '/contact/',
  '/api/zip/?zip=85001',
  '/slab-leak-repair-in-phoenix-az/'
];

async function run() {
  console.log('Testing Cloudflare Worker on http://127.0.0.1:8787:\n');
  let passCount = 0;
  for (const path of urls) {
    try {
      const res = await fetch('http://127.0.0.1:8787' + path);
      const text = await res.text();
      const status = res.status;
      const ok = status >= 200 && status < 400;
      if (ok) passCount++;
      const titleMatch = text.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1] : text.slice(0, 50).replace(/\r?\n/g, ' ');
      console.log(`[${status}] ${path} -> ${title}`);
    } catch (err) {
      console.log(`[ERR] ${path} -> ${err.message}`);
    }
  }
  console.log(`\nResult: ${passCount}/${urls.length} pages passed.`);
}

run();
