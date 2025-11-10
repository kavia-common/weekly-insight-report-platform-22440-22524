import type { NextConfig } from "next";

/**
 * Next.js configuration
 * - We run in server mode by default so previews can connect to the Node server on port 3000.
 * - If a static export is ever needed, use the `npm run export` script which runs `next build && next export`.
 */
const nextConfig: NextConfig = {
  // No `output: "export"` here to avoid disabling server mode.
  // Additional config can be added as needed, e.g. images, experimental, etc.
  poweredByHeader: false,
};

export default nextConfig;
