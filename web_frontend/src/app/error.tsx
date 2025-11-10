"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <section className="card p-6 w-full max-w-lg" role="alert" aria-live="assertive">
        <h1 className="text-xl font-semibold mb-2">Something went wrong</h1>
        <p className="text-sm text-gray-600 mb-4">{error.message}</p>
        <button className="btn btn-primary" onClick={() => reset()}>
          Try again
        </button>
      </section>
    </main>
  );
}
