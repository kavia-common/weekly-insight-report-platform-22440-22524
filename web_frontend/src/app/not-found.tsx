import React from "react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center app-gradient p-4">
      <section className="card max-w-lg w-full p-6" role="alert" aria-live="assertive">
        <header className="mb-2">
          <h1 className="text-xl font-semibold">404 – Page Not Found</h1>
          <p className="text-sm text-gray-600 mt-1">The page you’re looking for doesn’t exist.</p>
        </header>
        <a className="btn btn-primary inline-flex mt-2" href="/dashboard">Go to Dashboard</a>
      </section>
    </main>
  );
}
