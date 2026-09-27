import "server-only";
import { createHmac } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export type StoredLead = Record<string, unknown>;

/** Webhook first, then DB (not wired yet), then dev-only file. Returns false when there's no destination. */
export async function deliverLead(lead: StoredLead): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (url) {
    const body = JSON.stringify(lead);
    const sig = createHmac("sha256", process.env.LEAD_WEBHOOK_SECRET ?? "").update(body).digest("hex");
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", "x-signature-sha256": sig },
      body,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return true;
  }
  // DATABASE_URL: wire Prisma here (prisma/schema.prisma has the Lead model).
  if (process.env.NODE_ENV !== "production") {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "leads.jsonl"), JSON.stringify(lead) + "\n");
    return true;
  }
  return false;
}
