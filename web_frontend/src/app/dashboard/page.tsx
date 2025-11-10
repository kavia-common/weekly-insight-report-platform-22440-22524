"use client";

import React, { useEffect, useState } from "react";
import { AppShell } from "@/components/AppLayout";
import { useGuard } from "@/lib/auth";
import { apiClient } from "@/lib/apiClient";

export default function DashboardPage() {
  const { loading, allowed } = useGuard(); // any signed-in role
  const [metrics, setMetrics] = useState<{label: string; value: number; delta?: number}[]>([]);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let mounted = true;
    apiClient.getDashboardMetrics().then((d) => {
      if (!mounted) return;
      setMetrics(d.metrics);
      setHighlights(d.highlights);
      setBusy(false);
    });
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!allowed) return <div className="p-6">Access denied</div>;

  return (
    <AppShell>
      <div className="grid gap-4">
        <div className="grid sm:grid-cols-3 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="card p-4">
              <div className="text-sm text-gray-500">{m.label}</div>
              <div className="text-2xl font-semibold">{m.value}</div>
              {typeof m.delta === "number" && (
                <div className={`text-sm ${m.delta >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {m.delta >= 0 ? "+" : ""}{m.delta} WoW
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="card p-4">
          <h2 className="text-lg font-semibold mb-2">Highlights</h2>
          {busy ? (
            <div className="animate-pulse text-sm text-gray-500">Loading insights...</div>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          )}
        </div>
      </div>
    </AppShell>
  );
}
