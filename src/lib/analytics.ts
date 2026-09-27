"use client";

export type EventName =
  | "call_click"
  | "emergency_call_click"
  | "form_start"
  | "form_step"
  | "service_selected"
  | "location_selected"
  | "form_error"
  | "form_submit"
  | "schedule_request"
  | "quote_request"
  | "cta_click";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: EventName, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
