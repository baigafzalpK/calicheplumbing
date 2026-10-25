async function verifySeo() {
  const res = await fetch('http://127.0.0.1:8787/locations/arizona/phoenix/');
  const html = await res.text();
  const hasSchema = html.includes('application/ld+json');
  const hasCanonical = html.includes('canonical');
  const hasPhone = html.includes('(831) 257-8139');
  console.log('--- Phoenix Page SEO Verification ---');
  console.log('JSON-LD Schema present:', hasSchema);
  console.log('Canonical tag present:', hasCanonical);
  console.log('Phone number (831) 257-8139 present:', hasPhone);
}

verifySeo();
