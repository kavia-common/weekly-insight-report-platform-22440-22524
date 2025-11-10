"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/AppLayout";
import { useGuard } from "@/lib/auth";
import { apiClient } from "@/lib/apiClient";
import type { Report } from "@/lib/types";
import { useToast } from "@/lib/toast";

export default function ReportEditorPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();
  const isNew = id === "new";
  const { loading, allowed } = useGuard();
  const { push } = useToast();

  const [report, setReport] = useState<Report | null>(null);
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState("");

  useEffect(() => {
    let mounted = true;
    async function init() {
      setBusy(true);
      if (isNew) {
        const draft = await apiClient.createReport({ title: "Untitled Report", content: "" });
        if (!mounted) return;
        setReport(draft);
        setBusy(false);
      } else if (id) {
        const r = await apiClient.getReport(id);
        if (!mounted) return;
        if (!r) {
          router.replace("/reports");
          return;
        }
        setReport(r);
        setBusy(false);
      }
    }
    init();
    return () => { mounted = false; };
  }, [id, isNew, router]);

  // Auto-save debounce
  useEffect(() => {
    if (!report) return;
    const handle = setTimeout(async () => {
      setSaving(true);
      await apiClient.updateReport(report.id, report);
      setSaving(false);
    }, 600);
    return () => clearTimeout(handle);
  }, [report]);

  const canSubmit = useMemo(() => !!report && report.content.trim().length > 10 && report.title.trim().length > 0, [report]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!allowed) return <div className="p-6">Access denied</div>;
  if (busy || !report) return <div className="p-6">Loading editor...</div>;

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold">{report.title || "Untitled"}</h1>
        <div className="flex gap-2">
          <button
            className="btn btn-ghost"
            onClick={() => { push("Exported to PDF (mock)", "success"); }}
          >
            Export
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => { push("Share link copied (mock)", "success"); }}
          >
            Share
          </button>
          <button
            disabled={!canSubmit}
            className="btn btn-amber"
            onClick={async () => {
              await apiClient.updateReport(report.id, { status: "submitted" });
              push("Report submitted", "success");
              router.replace("/reports");
            }}
          >
            Submit
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <section className="card p-4 lg:col-span-2">
          <label className="text-sm font-medium">Title</label>
          <input
            className="input mt-1 mb-3"
            value={report.title}
            onChange={(e) => setReport({ ...report, title: e.target.value })}
          />
          <label className="text-sm font-medium">Content</label>
          <textarea
            rows={14}
            className="textarea mt-1"
            value={report.content}
            onChange={(e) => setReport({ ...report, content: e.target.value })}
          />
          <div className="text-xs text-gray-500 mt-2">
            {saving ? "Saving..." : "Saved"}
          </div>
        </section>

        <aside className="card p-4">
          <h2 className="font-semibold mb-2">AI Assistance</h2>
          <button
            className="btn btn-primary mb-3"
            onClick={async () => {
              setAiLoading(true);
              const res = await apiClient.summarize(report.content);
              setAiSummary(res.summary);
              setAiLoading(false);
              push("AI summary generated", "success");
            }}
            disabled={aiLoading}
          >
            {aiLoading ? "Summarizing..." : "AI Summarize"}
          </button>
          <div className="text-sm text-gray-700 whitespace-pre-wrap">
            {aiSummary || "Click AI Summarize to generate a mock summary."}
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
