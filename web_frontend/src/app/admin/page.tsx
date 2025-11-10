"use client";

import React from "react";
import { AppShell } from "@/components/AppLayout";
import { useGuard } from "@/lib/auth";

export default function AdminPage() {
  const { loading, allowed } = useGuard(["Admin"]);
  if (loading) return <div className="p-6">Loading...</div>;
  if (!allowed) return <div className="p-6">Access denied</div>;
  return (
    <AppShell>
      <h1 className="text-xl font-semibold mb-3">Admin</h1>
      <div className="card p-4">
        <p className="text-sm text-gray-700">
          Mock admin controls would appear here. In real mode, wire to backend endpoints.
        </p>
      </div>
    </AppShell>
  );
}
