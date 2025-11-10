"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import type { Role } from "@/lib/types";

export default function SignInPage() {
  const { signInMock, loading, user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("Taylor Doe");
  const [role, setRole] = useState<Role>("Employee");

  if (user) {
    router.replace("/dashboard");
    return null;
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <section className="card p-6 w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">Sign in (Mock)</h1>
        <p className="text-sm text-gray-600 mb-4">
          Choose a display name and role to simulate authentication.
        </p>

        <label className="text-sm font-medium">Name</label>
        <input
          className="input mt-1 mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />

        <label className="text-sm font-medium">Role</label>
        <select
          className="select mt-1 mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
        >
          <option>Employee</option>
          <option>Manager</option>
          <option>Admin</option>
        </select>

        <button
          disabled={loading}
          className="btn btn-primary w-full"
          onClick={async () => {
            await signInMock(name, role);
            router.replace("/dashboard");
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </section>
    </main>
  );
}
