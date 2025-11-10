import { NextResponse } from "next/server";

// Ensure this route is statically exported in output: \"export\" builds
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
