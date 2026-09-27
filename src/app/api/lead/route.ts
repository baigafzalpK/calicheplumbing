import { NextResponse } from "next/server";
import { createHash, randomUUID } from "node:crypto";
import { leadSchema } from "@/lib/lead/schema";
import { rateLimit } from "@/lib/lead/rateLimit";
import { deliverLead } from "@/lib/lead/store";
import { zipCoverage } from "@/content/coverage";

const SALT = process.env.IP_HASH_SALT ?? "caliche-dev-salt";

function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  if (!(req.headers.get("content-type") ?? "").includes("application/json"))
    return NextResponse.json({ ok: false, error: "JSON only" }, { status: 415 });

  const raw = await req.text();
  if (raw.length > 10_000) return NextResponse.json({ ok: false, error: "Too large" }, { status: 413 });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
  const ipHash = createHash("sha256").update(SALT + ip).digest("hex").slice(0, 24);
  if (!rateLimit(ipHash)) return NextResponse.json({ ok: false, error: "Too many requests. Please call instead." }, { status: 429 });

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Bad JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const i of parsed.error.issues) fields[String(i.path[0])] ??= i.message;
    return NextResponse.json({ ok: false, fields }, { status: 422 });
  }
  const lead = parsed.data;

  // Bots: honeypot filled or submitted too fast. Silent success.
  if (lead.company || (lead.startedAt && Date.now() - lead.startedAt < 2500)) return NextResponse.json({ ok: true });

  const cov = zipCoverage(lead.zip);
  const id = randomUUID();
  const record = {
    id,
    receivedAt: new Date().toISOString(),
    service: lead.service,
    emergency: lead.emergency,
    zip: lead.zip,
    inArea: Boolean(cov),
    coverageCity: cov?.city ?? null,
    timing: lead.timing ?? null,
    name: lead.name,
    phone: lead.phone.replace(/\D/g, ""),
    email: lead.email || null,
    contactMethod: lead.contactMethod ?? "call",
    notes: lead.notes ?? null,
    consent: true,
    attribution: lead.attribution ?? {},
    ipHash,
  };

  try {
    const ok = await deliverLead(record);
    if (!ok) return NextResponse.json({ ok: false, error: "Online requests are unavailable. Please call." }, { status: 503 });
  } catch (e) {
    console.error("lead delivery failed", { id, err: (e as Error).message });
    return NextResponse.json({ ok: false, error: "We couldn't send your request. Please call." }, { status: 502 });
  }
  console.info("lead", { id, service: record.service, zip: record.zip, inArea: record.inArea, emergency: record.emergency });
  return NextResponse.json({ ok: true, inArea: record.inArea, emergency: record.emergency });
}
