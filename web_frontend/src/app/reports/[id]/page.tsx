"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AuthGuard from "@/components/auth/AuthGuard";
import { apiGet, apiPatch } from "@/lib/apiClient";
import { useParams } from "next/navigation";

type Report = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
};

export default function ReportEditPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [report, setReport] = useState<Report | null>(null);
  const [saving, setSaving] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const timer = useRef<NodeJS.Timeout | null>(null);

  // Load report
  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await apiGet<Report>(`/reports/${id}`);
      if (mounted && res.ok && res.data) setReport(res.data);
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  // Autosave on change
  useEffect(() => {
    if (!report) return;
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      setSaving("saving");
      const res = await apiPatch<Report>(`/reports/${id}`, {
        title: report.title,
        content: report.content,
      });
      setSaving(res.ok ? "saved" : "error");
      setTimeout(() => setSaving("idle"), 1200);
    }, 800);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [report, id]);

  return (
    <AuthGuard>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Edit Report</h1>
          <div className="text-sm">
            {saving === "saving" && <span className="text-gray-600">Saving…</span>}
            {saving === "saved" && <span className="text-green-600">Saved</span>}
            {saving === "error" && <span className="text-red-600">Save failed</span>}
          </div>
        </div>

        {!report ? (
          <div className="text-gray-600">Loading…</div>
        ) : (
          <>
            <div className="grid gap-3">
              <input
                className="border border-gray-300 rounded-md p-2"
                placeholder="Title"
                value={report.title}
                onChange={(e) => setReport({ ...(report as Report), title: e.target.value })}
              />
              <textarea
                className="border border-gray-300 rounded-md p-2 min-h-64"
                placeholder="Update your weekly progress"
                value={report.content}
                onChange={(e) => setReport({ ...(report as Report), content: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Link className="btn btn-secondary" href="/reports">Back</Link>
            </div>
          </>
        )}
      </div>
    </AuthGuard>
  );
}
