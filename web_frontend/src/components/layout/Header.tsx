"use client";

import React from "react";
import { useSession } from "../providers/SessionProvider";
import { logout } from "@/lib/auth";

export default function Header() {
  const { session, loading, refresh } = useSession();

  const handleLogout = async () => {
    await logout();
    await refresh();
    // Optional: hard refresh to clear any client state
    if (typeof window !== "undefined") window.location.href = "/login";
  };

  return (
    <header className="header h-14 px-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-2">
        <div className="w-2 h-6 rounded-sm" style={{ background: "var(--ocean-primary)" }} />
        <span className="font-semibold">DigitalT3 Weekly Reports</span>
      </div>
      <div className="flex items-center gap-3">
        {loading ? (
          <span className="text-sm text-gray-500">Loading...</span>
        ) : session ? (
          <>
            <span className="text-sm text-gray-600">{session.user.name} · {session.user.role}</span>
            <button className="btn btn-secondary" onClick={handleLogout}>Sign out</button>
          </>
        ) : (
          <a className="btn btn-primary" href="/login">Sign in</a>
        )}
      </div>
    </header>
  );
}
