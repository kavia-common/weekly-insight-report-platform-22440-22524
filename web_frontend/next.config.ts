import type { NextConfig } from "next";

/**
 * Next.js configuration
 * - We run in server mode by default so previews can connect to the Node server on port 3000.
 * - If a static export is ever needed, use the `npm run export` script which runs `next build && next export`.
 *
 * Embedding support:
 * - Allow the IDE preview host to embed this app inside an iframe using CSP `frame-ancestors`.
 * - Explicitly do not set X-Frame-Options (Next.js does not set it by default), and if it exists,
 *   we override by not returning it. Modern embedding control should be done via CSP only.
 *
 * Configure allowed embedding origin(s) via env:
 * - NEXT_PUBLIC_PREVIEW_IFRAME_ANCESTOR=<protocol_and_host> e.g. "https://vscode-internal-*.cloud.kavia.ai"
 * - You can provide multiple origins separated by spaces. Wildcards are supported in CSP for subdomains using *.example.com
 *   Note: For maximum safety, keep this as specific as possible.
 */
const buildCsp = (): string => {
  const defaultAncestors = [
    "'self'",
  ];
  // Allow optionally configured preview iframe ancestor(s)
  const fromEnv = process.env.NEXT_PUBLIC_PREVIEW_IFRAME_ANCESTOR?.trim();
  if (fromEnv) {
    // Support multiple values separated by spaces or commas
    const parts = fromEnv.split(/[ ,]+/).filter(Boolean);
    defaultAncestors.push(...parts);
  }

  // Construct a conservative CSP with explicit frame-ancestors
  // Expand directives over time if app loads external resources.
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": ["'self'"],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:"],
    "font-src": ["'self'"],
    "connect-src": [
      "'self'",
      process.env.NEXT_PUBLIC_BACKEND_URL || "",
      process.env.NEXT_PUBLIC_API_BASE || "",
      process.env.NEXT_PUBLIC_WS_URL || "",
    ].filter(Boolean),
    "frame-ancestors": defaultAncestors,
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-src": ["'self'"], // iframes you embed; not for controlling who can embed you
    "upgrade-insecure-requests": [],
  };

  // Turn directives into string
  const csp = Object.entries(directives)
    .map(([k, v]) => (v.length ? `${k} ${v.join(" ")}` : k))
    .join("; ");
  return csp;
};

const securityHeaders = () => {
  const headers: { key: string; value: string }[] = [
    // Use CSP to control who can embed this site
    { key: "Content-Security-Policy", value: buildCsp() },

    // Do not set X-Frame-Options so CSP controls framing (avoid DENY/SAMEORIGIN conflicts)
    // If upstream or proxies inject X-Frame-Options, they may need adjustment.

    // Additional helpful security headers
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-DNS-Prefetch-Control", value: "on" },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  ];
  return headers;
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Apply headers to all routes
        source: "/:path*",
        headers: securityHeaders(),
      },
    ];
  },
};

export default nextConfig;
