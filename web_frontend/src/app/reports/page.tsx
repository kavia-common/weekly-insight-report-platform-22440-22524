"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AuthGuard from "@/components/auth/AuthGuard";
import { apiGet } from "@/lib/apiClient";

type ReportListItem = {
  id: string;
  title: string;
  updatedAt: string;
  status: "DRAFT" | "SUBMITTED";
};

export default function ReportsPage() {
  const [items, setItems] = useState<ReportListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await apiGet<ReportListItem[]>("/reports");
      if (mounted && res.ok && res.data) setItems(res.data);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AuthGuard>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Your Reports</h1>
        <Link className="btn btn-primary" href="/reports/new">New Report</Link>
      </div>

      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {items.map((r) => (
            <li key={r.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{r.title}</div>
                <div className="text-xs text-gray-500">Updated {new Date(r.updatedAt).toLocaleString()} · {r.status}</div>
              </div>
              <Link className="btn btn-secondary" href={`/reports/${r.id}`}>Open</Link>
            </li>
          ))}
          {items.length === 0 && (
            <li className="py-6 text-gray-600">No reports found. Create your first one.</li>
          )}
        </ul>
      )}
    </AuthGuard>
  );
}
