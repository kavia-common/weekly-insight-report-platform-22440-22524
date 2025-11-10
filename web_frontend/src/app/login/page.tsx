"use client";

import React, { useState } from "react";
import { getLoginUrls, mockLogin } from "@/lib/auth";
import { getPublicEnv } from "@/lib/env";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { azureUrl, googleUrl } = getLoginUrls();
  const { mockAuth } = getPublicEnv();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMockLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const ok = await mockLogin(email, name || undefined);
    setBusy(false);
    if (ok) {
      router.replace("/dashboard");
    } else {
      setError("Mock login failed. Ensure MOCK_AUTH=true on backend.");
    }
  };

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

        {mockAuth ? (
          <div className="mt-6">
            <div className="text-xs text-gray-500 mb-2">Development only</div>
            <form onSubmit={handleMockLogin} className="space-y-2">
              <input
                type="email"
                required
                placeholder="email@example.com"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Display name (optional)"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button className="btn btn-secondary w-full justify-center" type="submit" disabled={busy}>
                {busy ? "Signing in..." : "Mock login"}
              </button>
              {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
            </form>
          </div>
        ) : null}

        <p className="text-xs text-gray-500 mt-4">
          By continuing you agree to our internal acceptable use policy.
        </p>
      </section>
    </main>
  );
}
