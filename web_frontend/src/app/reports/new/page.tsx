"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AuthGuard from "@/components/auth/AuthGuard";
import { apiPost } from "@/lib/apiClient";

function startOfCurrentWeekMondayISO(): string {
  const now = new Date();
  const day = now.getDay(); // 0=Sun..6=Sat
  const diffToMonday = (day + 6) % 7; // days since Monday
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() - diffToMonday);
  return monday.toISOString().slice(0, 10); // YYYY-MM-DD
}

export default function NewReportPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const timer = useRef<NodeJS.Timeout | null>(null);

  // Autosave with debounce
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (!title && !content) return;

    timer.current = setTimeout(async () => {
      setSaving("saving");
      const weekStart = startOfCurrentWeekMondayISO();
      const res = await apiPost<{ report: { _id: string } }>("/reports/draft", {
        weekStart,
        content: { title, content },
      });
      setSaving(res.ok ? "saved" : "error");
      setTimeout(() => setSaving("idle"), 1500);
    }, 600);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [title, content]);

  return (
    <AuthGuard>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">New Report</h1>
          <div className="text-sm">
            {saving === "saving" && <span className="text-gray-600">Saving…</span>}
            {saving === "saved" && <span className="text-green-600">Saved</span>}
            {saving === "error" && <span className="text-red-600">Save failed</span>}
          </div>
        </div>

        <div className="grid gap-3">
          <input
            className="border border-gray-300 rounded-md p-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border border-gray-300 rounded-md p-2 min-h-64"
            placeholder={"What did you accomplish? Any blockers? Plans for next week?"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button className="btn btn-primary">Submit</button>
          <Link className="btn btn-secondary" href="/reports">Cancel</Link>
        </div>
      </div>
    </AuthGuard>
  );
}
