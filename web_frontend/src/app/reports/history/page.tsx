"use client";

import React, { useEffect, useState } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import { apiGet } from "@/lib/apiClient";
import type { Role } from "@/types/session";

type HistoryItem = {
  id: string;
  reportId: string;
  title: string;
  author: string;
  changedAt: string;
  changeType: "CREATED" | "UPDATED" | "SUBMITTED";
};

export default function ReportsHistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await apiGet<HistoryItem[]>("/reports/history");
      if (mounted && res.ok && res.data) setItems(res.data);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AuthGuard allowed={["MANAGER", "ADMIN" as Role]}>
      <div>
        <h1 className="text-xl font-semibold mb-4">Reports History</h1>
        {loading ? (
          <div className="text-gray-600">Loading…</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {items.map((h) => (
              <li key={h.id} className="py-3">
                <div className="font-medium">{h.title}</div>
                <div className="text-xs text-gray-500">
                  {h.changeType} by {h.author} · {new Date(h.changedAt).toLocaleString()}
                </div>
              </li>
            ))}
            {items.length === 0 && <li className="py-6 text-gray-600">No history found.</li>}
          </ul>
        )}
      </div>
    </AuthGuard>
  );
}
