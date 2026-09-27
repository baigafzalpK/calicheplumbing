import "server-only";

// In-memory fixed window. Move to Redis/Upstash for serverless deployments.
const hits = new Map<string, { n: number; reset: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60_000) {
  const now = Date.now();
  const h = hits.get(key);
  if (!h || h.reset < now) {
    hits.set(key, { n: 1, reset: now + windowMs });
    return true;
  }
  h.n++;
  return h.n <= limit;
}
