"use client";
import { useEffect } from "react";
import Script from "next/script";
import { captureAttribution } from "@/lib/attribution";

export function Tracking({ gtmId }: { gtmId: string | null }) {
  useEffect(() => {
    captureAttribution();
  }, []);
  if (!gtmId) return null;
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id=${gtmId.replace(/[^A-Z0-9-]/gi, "")}';document.head.appendChild(s);`}
    </Script>
  );
}
