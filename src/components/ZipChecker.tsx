"use client";
import { useState } from "react";
import Link from "next/link";
import { coveredZips } from "@/content/coverage";
import { track } from "@/lib/analytics";

export function ZipChecker({ dark = false }: { dark?: boolean }) {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<null | { ok: boolean; city?: string }>(null);

  function check(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{5}$/.test(zip)) return setResult({ ok: false });
    const c = coveredZips[zip];
    setResult(c ? { ok: true, city: c.city } : { ok: false });
    track("location_selected", { zip, inArea: Boolean(c) });
  }

  return (
    <form onSubmit={check} className="w-full max-w-md">
      <label htmlFor="zipcheck" className={`field-label ${dark ? "text-white" : ""}`}>
        Check your ZIP code
      </label>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
        <input
          id="zipcheck"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
          className="field"
          placeholder="e.g. 85308"
        />
        <button className="btn btn-primary">Check</button>
      </div>
      <p aria-live="polite" className={`mt-2 min-h-6 text-sm ${dark ? "text-white/90" : ""}`}>
        {result?.ok && (
          <>
            ✓ We connect homeowners in {zip} ({result.city}).{" "}
            <Link className={dark ? "underline" : "link"} href={`/request-service/?zip=${zip}`}>
              Request service
            </Link>
          </>
        )}
        {result && !result.ok && (zip.length === 5 ? `${zip} isn't in our network yet. You can still call and we'll try to help.` : "Enter a 5-digit ZIP code.")}
      </p>
    </form>
  );
}
