"use client";

import React from "react";
import Link from "next/link";

/**
 * Global error boundary for the App Router (handles 500-level runtime errors).
 * This component renders when a server or client error bubbles to the root.
 * It also provides a reset handler to retry rendering.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("[GlobalError] Unhandled runtime error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="min-h-screen flex items-center justify-center bg-white text-black p-6">
          <section className="max-w-xl w-full rounded-lg border border-gray-200 p-6 shadow-sm">
            <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
            <p className="text-gray-700 mb-3">
              An unexpected error occurred while loading this page.
            </p>
            {error?.message ? (
              <pre className="bg-gray-100 text-gray-900 text-sm p-3 rounded mb-4 overflow-auto">
                {error.message}
                {error?.digest ? `\n(digest: ${error.digest})` : ""}
              </pre>
            ) : null}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => reset()}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Try again
              </button>
              <a
                href="/healthz"
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
              >
                Health check
              </a>
              <Link
                href="/"
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
              >
                Home
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
