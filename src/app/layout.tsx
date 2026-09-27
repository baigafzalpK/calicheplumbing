import type { Metadata, Viewport } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { siteGraph, graph } from "@/lib/schema";
import { JsonLd } from "@/components/ui";
import { Tracking } from "@/components/Tracking";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["500", "600", "700"], display: "swap", variable: "--font-fraunces" });
const publicSans = Public_Sans({ subsets: ["latin"], display: "swap", variable: "--font-public-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: site.googleVerification ?? undefined,
    other: site.bingVerification ? { "msvalidate.01": site.bingVerification } : undefined,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#1b2b34", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${fraunces.variable} ${publicSans.variable}`}>
      <body>
        <JsonLd data={graph(siteGraph())} />
        {children}
        <Tracking gtmId={site.gtmId} />
      </body>
    </html>
  );
}
