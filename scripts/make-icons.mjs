// Builds brand PNGs, favicons and the web manifest from the SVG mark.
// Only fills MISSING files: never overwrites owner-supplied assets in public/.
import sharp from "sharp";
import { existsSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";

const mark = (bg = "#1b2b34") => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
<rect width="40" height="40" rx="9" fill="${bg}"/>
<path d="M7 22h26" stroke="#e8c9a0" stroke-width="2.5" stroke-linecap="round"/>
<path d="M7 27.5h26" stroke="#d6a36a" stroke-width="2.5" stroke-linecap="round"/>
<path d="M7 33h26" stroke="#c2410c" stroke-width="2.5" stroke-linecap="round"/>
<path d="M20 6v9M14 10h12" stroke="#7fc8c9" stroke-width="3" stroke-linecap="round"/>
<circle cx="20" cy="18" r="1.6" fill="#7fc8c9"/></svg>`;

const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="160" viewBox="0 0 600 160">
<g transform="translate(10,20) scale(3)">${mark().replace(/<\/?svg[^>]*>/g, "")}</g>
<text x="150" y="92" font-family="Georgia, serif" font-size="72" font-weight="700" fill="#1b2b34">Caliche</text>
<text x="154" y="130" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="9" fill="#1d5f63">PLUMBING</text></svg>`;

const out = "public";
await mkdir(`${out}/brand`, { recursive: true });
const made = [];
async function png(file, svg, size, opts = {}) {
  if (existsSync(file)) return;
  let img = sharp(Buffer.from(svg), { density: 600 }).resize(size, size);
  if (opts.flatten) img = img.flatten({ background: "#ffffff" });
  await img.png().toFile(file);
  made.push(file);
}

await png(`${out}/favicon-16x16.png`, mark(), 16);
await png(`${out}/favicon-32x32.png`, mark(), 32);
await png(`${out}/android-chrome-192x192.png`, mark(), 192);
await png(`${out}/android-chrome-512x512.png`, mark(), 512);
await png(`${out}/apple-touch-icon.png`, mark(), 180, { flatten: true });

if (!existsSync(`${out}/brand/logo.png`)) {
  await sharp(Buffer.from(logo), { density: 300 }).resize(600, 160).png().toFile(`${out}/brand/logo.png`);
  made.push("brand/logo.png");
}

// favicon.ico with 16/32/48 PNG entries
if (!existsSync(`${out}/favicon.ico`)) {
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(sizes.map((s) => sharp(Buffer.from(mark()), { density: 600 }).resize(s, s).png().toBuffer()));
  const header = Buffer.alloc(6 + 16 * sizes.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  sizes.forEach((s, i) => {
    const e = 6 + i * 16;
    header.writeUInt8(s, e);
    header.writeUInt8(s, e + 1);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(pngs[i].length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += pngs[i].length;
  });
  await writeFile(`${out}/favicon.ico`, Buffer.concat([header, ...pngs]));
  made.push("favicon.ico");
}

if (!existsSync(`${out}/site.webmanifest`)) {
  await writeFile(
    `${out}/site.webmanifest`,
    JSON.stringify(
      {
        name: "Caliche Plumbing",
        short_name: "Caliche",
        icons: [
          { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
        ],
        theme_color: "#1b2b34",
        background_color: "#f7f2e8",
        display: "standalone",
        start_url: "/",
      },
      null,
      2,
    ),
  );
  made.push("site.webmanifest");
}
console.log(made.length ? `created: ${made.join(", ")}` : "nothing missing");
