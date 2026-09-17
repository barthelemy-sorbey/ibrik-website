import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Files in public/ are not fingerprinted: cache them for a month, and give a
// replaced photo or video a new file name so visitors pick it up at once.
const LONG_CACHE = "public, max-age=2592000, stale-while-revalidate=86400";

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: LONG_CACHE }] },
      { source: "/gallery/:path*", headers: [{ key: "Cache-Control", value: LONG_CACHE }] },
      {
        source: "/menus/:file(.*\\.pdf)",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
