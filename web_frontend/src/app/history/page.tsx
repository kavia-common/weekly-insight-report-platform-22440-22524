"use client";

import React, { useEffect, useState } from "react";
import { AppShell } from "@/components/AppLayout";
import { useGuard } from "@/lib/auth";
import { apiClient } from "@/lib/apiClient";
import type { Paginated, Report } from "@/lib/types";

export default function HistoryPage() {
  const { loading, allowed } = useGuard();
  const [data, setData] = useState<Paginated<Report>>({ items: [], page: 1, pageSize: 10, total: 0 });

  const load = async (page = 1) => {
    const res = await apiClient.listReports(page, 10);
    setData(res);
  };

  useEffect(() => { load(1); }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!allowed) return <div className="p-6">Access denied</div>;

  return (
    <AppShell>
      <h1 className="text-xl font-semibold mb-3">History</h1>
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3 text-sm font-medium text-gray-600">Title</th>
              <th className="p-3 text-sm font-medium text-gray-600">Week</th>
              <th className="p-3 text-sm font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.title}</td>
                <td className="p-3">{r.weekOf}</td>
                <td className="p-3">{r.status}</td>
              </tr>
            ))}
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
