import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep SSR compatible; do not export statically so we can support public/private routes later.
  reactStrictMode: true,
};

export default nextConfig;
