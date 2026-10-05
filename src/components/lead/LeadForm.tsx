"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@/lib/analytics";
import { readAttribution } from "@/lib/attribution";
import { useZipCoverage } from "@/lib/useZipCoverage";
import { phoneRe } from "@/lib/lead/phone";

type Opt = { value: string; label: string };
type Props = {
  services: Opt[];
  defaultService?: string;
  defaultZip?: string;
  phone: string;
  e164: string;
  id?: string;
  compact?: boolean;
};

type Errors = Partial<Record<string, string>>;

export function LeadForm({ services, defaultService = "", defaultZip = "", phone, e164, id = "lead-form", compact }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [emergency, setEmergency] = useState<boolean | null>(null);
  const [f, setF] = useState({
    service: defaultService,
    zip: defaultZip,
    timing: "today",
    name: "",
    phone: "",
    email: "",
    contactMethod: "call",
    notes: "",
    consent: false,
    company: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState("");
  const started = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof typeof f, v: string | boolean) => {
    if (!started.current) {
      started.current = Date.now();
      track("form_start", { form: id });
    }
    setF((p) => ({ ...p, [k]: v }));
  };

  const total = emergency ? 2 : 3;
  const zipInfo = useZipCoverage(f.zip);

  useEffect(() => {
    const first = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
    first?.focus();
  }, [errors]);

  function validate(fields: string[]) {
    const e: Errors = {};
    if (fields.includes("service") && !f.service) e.service = "Choose what you need help with";
    if (fields.includes("emergency") && emergency === null) e.emergency = "Let us know if water is actively leaking";
    if (fields.includes("zip") && !/^\d{5}$/.test(f.zip)) e.zip = "Enter a 5-digit ZIP code";
    if (fields.includes("name") && f.name.trim().length < 2) e.name = "Enter your name";
    if (fields.includes("phone") && !phoneRe.test(f.phone.trim())) e.phone = "Enter a 10-digit US phone number";
    if (fields.includes("email") && f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email";
    if (fields.includes("consent") && !f.consent) e.consent = "Please agree so a plumber can contact you";
    setErrors(e);
    if (Object.keys(e).length) track("form_error", { form: id, fields: Object.keys(e).join(",") });
    return !Object.keys(e).length;
  }

  function next() {
    if (step === 1) {
      if (!validate(["service", "emergency"])) return;
      track("service_selected", { service: f.service, emergency });
      setStep(emergency ? 3 : 2);
      track("form_step", { form: id, step: emergency ? "contact" : 2 });
    } else if (step === 2) {
      if (!validate(["zip"])) return;
      track("location_selected", { zip: f.zip, inArea: Boolean(zipInfo) });
      setStep(3);
      track("form_step", { form: id, step: 3 });
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (step !== 3) return next();
    const fields = ["name", "phone", "email", "consent", ...(emergency ? ["zip"] : [])];
    if (!validate(fields)) return;
    setBusy(true);
    setServerError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...f,
          emergency: Boolean(emergency),
          timing: emergency ? "asap" : f.timing,
          startedAt: started.current ?? Date.now(),
          attribution: readAttribution() ?? {},
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        track("form_submit", { form: id, service: f.service, emergency: Boolean(emergency), inArea: data.inArea });
        track(f.timing === "flexible" ? "quote_request" : "schedule_request", { service: f.service });
        const q = new URLSearchParams();
        if (emergency) q.set("t", "e");
        if (data.inArea === false) q.set("t", "o");
        router.push(`/thank-you/${q.toString() ? `?${q}` : ""}`);
        return;
      }
      if (data.fields) setErrors(data.fields);
      setServerError(data.error ?? "Something went wrong. Please call us.");
    } catch {
      setServerError("We couldn't send your request. Please call us.");
    } finally {
      setBusy(false);
    }
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`${id}-${k}-err`} className="field-error">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: string) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${id}-${k}-err` : undefined });
  const shownStep = step === 3 && emergency ? 2 : step;

  return (
    <form ref={formRef} id={id} onSubmit={submit} noValidate className={`card scroll-mt-24 ${compact ? "p-5" : "p-6"}`}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-serif text-2xl font-semibold">Request service</h2>
        <p className="shrink-0 text-sm text-muted" aria-live="polite">
          Step {shownStep} of {total}
        </p>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-sand-deep">
        <div className="h-1.5 rounded-full bg-teal transition-all" style={{ width: `${(shownStep / total) * 100}%` }} />
      </div>

      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company <input tabIndex={-1} autoComplete="off" value={f.company} onChange={(e) => set("company", e.target.value)} />
        </label>
      </div>

      {step === 1 && (
        <div className="mt-5 space-y-5">
          <div>
            <label htmlFor={`${id}-service`} className="field-label">
              What do you need help with?
            </label>
            <select id={`${id}-service`} className="field" value={f.service} onChange={(e) => set("service", e.target.value)} {...aria("service")}>
              <option value="">Choose a service</option>
              {services.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
              <option value="other">Something else</option>
            </select>
            {err("service")}
          </div>
          <fieldset>
            <legend className="field-label">Is water actively leaking right now?</legend>
            <div className="grid grid-cols-2 gap-2" {...aria("emergency")} tabIndex={errors.emergency ? -1 : undefined}>
              {[
                ["yes", "Yes"],
                ["no", "No"],
              ].map(([v, l]) => (
                <label key={v} className={`flex min-h-12 cursor-pointer items-center justify-center rounded-md font-semibold ring-1 ${(v === "yes") === emergency ? "bg-ink text-white ring-ink" : "bg-white ring-line"}`}>
                  <input type="radio" name={`${id}-emergency`} className="sr-only" checked={(v === "yes") === emergency} onChange={() => setEmergency(v === "yes")} />
                  {l}
                </label>
              ))}
            </div>
            {err("emergency")}
          </fieldset>
          {emergency && (
            <div className="rounded-lg bg-alert-tint p-4 text-sm">
              <p className="font-semibold text-alert">Shut off your main water valve first.</p>
              <p className="mt-1">Calling is fastest for active leaks.</p>
              <a href={`tel:${e164}`} onClick={() => track("emergency_call_click", { location: "form" })} className="btn btn-alert mt-3 w-full">
                Call {phone}
              </a>
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="mt-5 space-y-5">
          <div>
            <label htmlFor={`${id}-zip`} className="field-label">
              ZIP code of the property
            </label>
            <input id={`${id}-zip`} inputMode="numeric" autoComplete="postal-code" maxLength={5} className="field" value={f.zip} onChange={(e) => set("zip", e.target.value.replace(/\D/g, ""))} {...aria("zip")} />
            {err("zip")}
            {zipInfo !== undefined && !errors.zip && (
              <p className={`mt-1 text-sm ${zipInfo ? "text-sage" : "text-muted"}`} aria-live="polite">
                {zipInfo ? `✓ ${zipInfo.city}, ${zipInfo.state} is in our network.` : "This ZIP may be outside our network. Send the request anyway and we'll try to help."}
              </p>
            )}
          </div>
          <div>
            <label htmlFor={`${id}-timing`} className="field-label">
              When do you need a plumber?
            </label>
            <select id={`${id}-timing`} className="field" value={f.timing} onChange={(e) => set("timing", e.target.value)}>
              <option value="asap">As soon as possible</option>
              <option value="today">Today</option>
              <option value="this-week">This week</option>
              <option value="flexible">Flexible, I'd like a quote</option>
            </select>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label htmlFor={`${id}-name`} className="field-label">Name</label>
              <input id={`${id}-name`} autoComplete="name" className="field" value={f.name} onChange={(e) => set("name", e.target.value)} {...aria("name")} />
              {err("name")}
            </div>
            <div className="min-w-0">
              <label htmlFor={`${id}-phone`} className="field-label">Phone</label>
              <input id={`${id}-phone`} type="tel" autoComplete="tel-national" className="field" value={f.phone} onChange={(e) => set("phone", e.target.value)} {...aria("phone")} />
              {err("phone")}
            </div>
          </div>
          {emergency && (
            <div>
              <label htmlFor={`${id}-zip`} className="field-label">ZIP code</label>
              <input id={`${id}-zip`} inputMode="numeric" autoComplete="postal-code" maxLength={5} className="field" value={f.zip} onChange={(e) => set("zip", e.target.value.replace(/\D/g, ""))} {...aria("zip")} />
              {err("zip")}
            </div>
          )}
          {!emergency && (
            <>
              <div>
                <label htmlFor={`${id}-email`} className="field-label">
                  Email <span className="font-normal text-muted">(optional)</span>
                </label>
                <input id={`${id}-email`} type="email" autoComplete="email" className="field" value={f.email} onChange={(e) => set("email", e.target.value)} {...aria("email")} />
                {err("email")}
              </div>
              <div>
                <label htmlFor={`${id}-method`} className="field-label">Best way to reach you</label>
                <select id={`${id}-method`} className="field" value={f.contactMethod} onChange={(e) => set("contactMethod", e.target.value)}>
                  <option value="call">Phone call</option>
                  <option value="text">Text message</option>
                  <option value="email">Email</option>
                </select>
              </div>
              <div>
                <label htmlFor={`${id}-notes`} className="field-label">
                  Anything the plumber should know? <span className="font-normal text-muted">(optional)</span>
                </label>
                <textarea id={`${id}-notes`} rows={3} maxLength={1000} className="field py-2" value={f.notes} onChange={(e) => set("notes", e.target.value)} />
              </div>
            </>
          )}
          <div>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" className="mt-1 h-5 w-5 shrink-0" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} {...aria("consent")} />
              <span>
                I agree that Caliche Plumbing may share my request with up to three independent, licensed plumbers who serve my area, and that they and Caliche may call or text me about it at the number provided, including by automated means. Consent isn't a condition of purchase. Message and data rates may apply. See our{" "}
                <a href="/privacy/" className="link">Privacy Policy</a>.
              </span>
            </label>
            {err("consent")}
          </div>
        </div>
      )}

      {serverError && (
        <p role="alert" className="mt-4 rounded-md bg-alert-tint p-3 text-sm text-alert">
          {serverError}{" "}
          <a href={`tel:${e164}`} className="font-semibold underline">
            {phone}
          </a>
        </p>
      )}

      <div className="mt-6 flex gap-3">
        {step > 1 && (
          <button type="button" className="btn btn-secondary" onClick={() => setStep(step === 3 && emergency ? 1 : ((step - 1) as 1 | 2))}>
            Back
          </button>
        )}
        <button type="submit" disabled={busy} className="btn btn-primary flex-1 disabled:opacity-60">
          {step === 3 ? (busy ? "Sending…" : "Send request") : "Continue"}
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-muted">Free to request. The plumber quotes before any work.</p>
    </form>
  );
}
