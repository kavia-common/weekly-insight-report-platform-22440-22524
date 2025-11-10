"use client";

import React from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import { useSession } from "@/components/providers/SessionProvider";

import Link from "next/link";

export default function DashboardPage() {
  const { session } = useSession();
  const name = session?.user?.name || "Guest";

  return (
    <AuthGuard>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Welcome, {name}</h1>
            <p className="text-sm text-gray-600">Here are your weekly insights and quick actions.</p>
          </div>
          <Link className="btn btn-primary" href="/reports/new">New Report</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-4">
            <h2 className="font-medium">This Week</h2>
            <p className="text-sm text-gray-600 mt-1">Draft and submit your weekly report.</p>
            <Link href="/reports/new" className="btn btn-link mt-3">Start drafting →</Link>
          </div>
          <div className="card p-4">
            <h2 className="font-medium">Recent Reports</h2>
            <p className="text-sm text-gray-600 mt-1">Review your last submissions and status.</p>
            <Link href="/reports" className="btn btn-link mt-3">View reports →</Link>
          </div>
          <div className="card p-4">
            <h2 className="font-medium">Team Insights</h2>
            <p className="text-sm text-gray-600 mt-1">Summaries and trends for your team.</p>
            <Link href="/reports/history" className="btn btn-link mt-3">Explore insights →</Link>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
