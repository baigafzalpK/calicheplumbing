import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const SOURCE_PATH = "C:/Users/Kamil Computers/.gemini/antigravity/brain/04f78429-1c61-441d-ac1e-24668fadbb42/.user_uploaded/media_1790970307985.jpg";

async function main() {
  console.log("Loading source image:", SOURCE_PATH);
  const src = sharp(SOURCE_PATH);
  const meta = await src.metadata();
  console.log(`Dimensions: ${meta.width}x${meta.height}`);

  // 1. Get raw RGB pixels
  const { data, info } = await src.raw().toBuffer({ resolveWithObject: true });

  // 2. Create high quality transparent buffer
  // Un-blend white background
  const rgba = Buffer.alloc(info.width * info.height * 4);
  const rgbaLight = Buffer.alloc(info.width * info.height * 4);

  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    const maxDiff = Math.max(255 - r, 255 - g, 255 - b);

    let alpha = 255;
    if (maxDiff < 10) {
      alpha = 0;
    } else if (maxDiff < 35) {
      const t = (maxDiff - 10) / 25;
      alpha = Math.round(t * 255);
      // Un-blend against white
      const a = alpha / 255;
      r = Math.min(255, Math.max(0, Math.round((r - 255 * (1 - a)) / a)));
      g = Math.min(255, Math.max(0, Math.round((g - 255 * (1 - a)) / a)));
      b = Math.min(255, Math.max(0, Math.round((b - 255 * (1 - a)) / a)));
    }

    rgba[j] = r;
    rgba[j + 1] = g;
    rgba[j + 2] = b;
    rgba[j + 3] = alpha;

    // For rgbaLight (for dark background footer):
    // If it's a dark color (navy/black like "Calishe" or dark pipe or "QUALITY PLUMBING"),
    // convert it to white while preserving the alpha channel.
    // Bright blues (high B, moderate G) and orange (high R, medium G, low B) remain colorful!
    if (alpha > 0) {
      const isDarkNavy = (r < 45 && g < 75 && b < 120);
      const isBlackSubtext = (r < 50 && g < 50 && b < 50);
      if (isDarkNavy || isBlackSubtext) {
        rgbaLight[j] = 255;
        rgbaLight[j + 1] = 255;
        rgbaLight[j + 2] = 255;
        rgbaLight[j + 3] = alpha;
      } else {
        rgbaLight[j] = r;
        rgbaLight[j + 1] = g;
        rgbaLight[j + 2] = b;
        rgbaLight[j + 3] = alpha;
      }
    } else {
      rgbaLight[j] = r;
      rgbaLight[j + 1] = g;
      rgbaLight[j + 2] = b;
      rgbaLight[j + 3] = 0;
    }
  }

  await mkdir("public/brand", { recursive: true });

  // 3. Trimmed Full Logo (Normal)
  const fullLogoTrimmed = await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .trim()
    .png()
    .toBuffer();

  await writeFile("public/brand/logo.png", fullLogoTrimmed);
  console.log("Saved public/brand/logo.png");

  // 4. Trimmed Full Logo (Light version for dark backgrounds)
  const fullLogoLightTrimmed = await sharp(rgbaLight, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .trim()
    .png()
    .toBuffer();

  await writeFile("public/brand/logo-light.png", fullLogoLightTrimmed);
  console.log("Saved public/brand/logo-light.png");

  // 5. Crop the Icon / Emblem (left side)
  // Emblem area is roughly x: 30 to 330, y: 25 to 375
  const iconExtracted = await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .extract({ left: 30, top: 25, width: 298, height: 350 })
    .png()
    .toBuffer();

  const iconRaw = await sharp(iconExtracted)
    .trim()
    .png()
    .toBuffer({ resolveWithObject: true });

  console.log(`Icon trimmed size: ${iconRaw.info.width}x${iconRaw.info.height}`);

  // Place inside a square canvas with ~15% padding
  const maxDim = Math.max(iconRaw.info.width, iconRaw.info.height);
  const canvasSize = Math.round(maxDim * 1.25); // 12.5% padding on each side

  const squareIconBuffer = await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      {
        input: iconRaw.data,
        left: Math.round((canvasSize - iconRaw.info.width) / 2),
        top: Math.round((canvasSize - iconRaw.info.height) / 2)
      }
    ])
    .png()
    .toBuffer();

  // Save brand icon high-res
  await sharp(squareIconBuffer)
    .resize(512, 512)
    .png()
    .toFile("public/brand/icon.png");
  console.log("Saved public/brand/icon.png");

  // 6. Generate Favicon and App Icons
  await sharp(squareIconBuffer).resize(512, 512).png().toFile("public/android-chrome-512x512.png");
  console.log("Saved public/android-chrome-512x512.png");

  await sharp(squareIconBuffer).resize(192, 192).png().toFile("public/android-chrome-192x192.png");
  console.log("Saved public/android-chrome-192x192.png");

  // Apple touch icon typically on clean white or transparent
  await sharp(squareIconBuffer)
    .resize(180, 180)
    .flatten({ background: "#ffffff" })
    .png()
    .toFile("public/apple-touch-icon.png");
  console.log("Saved public/apple-touch-icon.png");

  await sharp(squareIconBuffer).resize(32, 32).png().toFile("public/favicon-32x32.png");
  console.log("Saved public/favicon-32x32.png");

  await sharp(squareIconBuffer).resize(16, 16).png().toFile("public/favicon-16x16.png");
  console.log("Saved public/favicon-16x16.png");

  // 7. Multi-size ICO: 16, 32, 48
  const icoSizes = [16, 32, 48];
  const icoPngs = await Promise.all(
    icoSizes.map((s) => sharp(squareIconBuffer).resize(s, s).png().toBuffer())
  );

  const header = Buffer.alloc(6 + 16 * icoSizes.length);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(icoSizes.length, 4); // number of images

  let offset = header.length;
  icoSizes.forEach((s, idx) => {
    const entry = 6 + idx * 16;
    header.writeUInt8(s, entry); // width
    header.writeUInt8(s, entry + 1); // height
    header.writeUInt8(0, entry + 2); // color palette
    header.writeUInt8(0, entry + 3); // reserved
    header.writeUInt16LE(1, entry + 4); // color planes
    header.writeUInt16LE(32, entry + 6); // bits per pixel
    header.writeUInt32LE(icoPngs[idx].length, entry + 8); // image data size
    header.writeUInt32LE(offset, entry + 12); // offset
    offset += icoPngs[idx].length;
  });

  await writeFile("public/favicon.ico", Buffer.concat([header, ...icoPngs]));
  console.log("Saved public/favicon.ico");

  console.log("All brand assets successfully generated!");
}

main().catch((err) => {
  console.error("Error generating brand assets:", err);
  process.exit(1);
});
