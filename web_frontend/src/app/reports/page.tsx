"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppLayout";
import { useGuard } from "@/lib/auth";
import { apiClient } from "@/lib/apiClient";
import type { Paginated, Report } from "@/lib/types";

export default function ReportsPage() {
  const { loading, allowed } = useGuard();
  const [data, setData] = useState<Paginated<Report>>({ items: [], page: 1, pageSize: 10, total: 0 });
  const [busy, setBusy] = useState(true);

  const load = async (page = 1) => {
    setBusy(true);
    const res = await apiClient.listReports(page, 10);
    setData(res);
    setBusy(false);
  };

  useEffect(() => { load(1); }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!allowed) return <div className="p-6">Access denied</div>;

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Reports</h1>
        <Link className="btn btn-primary" href="/reports/new">Create Report</Link>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3 text-sm font-medium text-gray-600">Title</th>
              <th className="p-3 text-sm font-medium text-gray-600">Week</th>
              <th className="p-3 text-sm font-medium text-gray-600">Status</th>
              <th className="p-3 text-sm font-medium text-gray-600">Updated</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {busy ? (
              <tr><td className="p-4 text-sm text-gray-500" colSpan={5}>Loading...</td></tr>
            ) : data.items.length === 0 ? (
              <tr><td className="p-4 text-sm text-gray-500" colSpan={5}>No reports</td></tr>
            ) : (
              data.items.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-3">{r.title}</td>
                  <td className="p-3">{r.weekOf}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded ${r.status === "submitted" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-600">{new Date(r.updatedAt).toLocaleString()}</td>
                  <td className="p-3 text-right">
                    <Link className="btn btn-ghost" href={`/reports/${r.id}`}>Open</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="text-sm text-gray-600">
          Page {data.page} of {Math.max(1, Math.ceil(data.total / data.pageSize))}
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost" disabled={data.page <= 1} onClick={() => load(data.page - 1)}>Prev</button>
          <button className="btn btn-ghost" disabled={data.page >= Math.ceil(data.total / data.pageSize)} onClick={() => load(data.page + 1)}>Next</button>
        </div>
      </div>
    </AppShell>
  );
}
