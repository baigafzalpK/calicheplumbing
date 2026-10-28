import fs from "node:fs";
import path from "node:path";

const openNextDir = path.join(process.cwd(), ".open-next");
const cacheDir = path.join(openNextDir, "cache");

console.log("==================================================");
console.log("[Build Hook] Checking .open-next disk usage...");

if (fs.existsSync(cacheDir)) {
  console.log("[Build Hook] Clearing .open-next/cache to prevent Cloudflare ENOSPC disk full error...");
  fs.rmSync(cacheDir, { recursive: true, force: true });
  fs.mkdirSync(cacheDir, { recursive: true });
  console.log("[Build Hook] .open-next/cache cleared successfully. Ready for deployment!");
} else {
  console.log("[Build Hook] .open-next/cache does not exist. Ensuring empty directory exists...");
  fs.mkdirSync(cacheDir, { recursive: true });
}

console.log("==================================================");
