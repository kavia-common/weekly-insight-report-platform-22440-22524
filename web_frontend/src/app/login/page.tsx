"use client";

import React from "react";
import { getLoginUrls } from "@/lib/auth";

export default function LoginPage() {
  const { azureUrl, googleUrl } = getLoginUrls();

  return (
    <main className="min-h-screen flex items-center justify-center app-gradient p-4">
      <section className="card max-w-md w-full p-6">
        <header className="mb-4">
          <h1 className="text-xl font-semibold">Sign in</h1>
          <p className="text-sm text-gray-600 mt-1">
            Use your organization account to sign in securely.
          </p>
        </header>
        <div className="space-y-3">
          <a className="btn btn-primary w-full justify-center" href={azureUrl} rel="noopener noreferrer">
            Continue with Azure AD
          </a>
          <a className="btn btn-secondary w-full justify-center" href={googleUrl} rel="noopener noreferrer">
            Continue with Google
          </a>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          By continuing you agree to our internal acceptable use policy.
        </p>
      </section>
    </main>
  );
}
