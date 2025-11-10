import { NextResponse } from "next/server";

/**
 * Health check endpoint.
 * In server mode, this is a dynamic route.
 * For static export, we force static so `next export` can generate it under /out/healthz.
 */
export const dynamic = "force-static";
export const revalidate = 0;

// PUBLIC_INTERFACE
export async function GET() {
  /** Returns a simple JSON health status for container probes. */
  return NextResponse.json({
    status: "ok",
    message: "web_frontend ready",
    timestamp: new Date().toISOString(),
  });
}
