import type { NextConfig } from "next";
import { redirects } from "./src/content/misc";

const noindex = [{ key: "X-Robots-Tag", value: "noindex, follow" }];

const config: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], deviceSizes: [390, 640, 828, 1080, 1280, 1600] },
  async redirects() {
    return [
      { source: "/:path*", has: [{ type: "host", value: "www.calicheplumbing.com" }], destination: "https://calicheplumbing.com/:path*", permanent: true },
      ...redirects,
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preferred" },
        ],
      },
      { source: "/lp/:path*", headers: noindex },
      { source: "/thank-you/", headers: noindex },
      { source: "/request-service/", headers: noindex },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/photos/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default config;
