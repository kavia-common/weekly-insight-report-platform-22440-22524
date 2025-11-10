"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useAuth } from "@/lib/auth";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/reports", label: "Reports" },
    { href: "/history", label: "History" },
  ];

  if (user?.role === "Admin") {
    links.push({ href: "/admin", label: "Admin" });
  }

  return (
    <div className="app-shell">
      <aside className="sidebar p-4">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <div
              aria-hidden
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: "var(--ocean-primary)",
                boxShadow: "0 0 0 6px rgba(37,99,235,0.18)",
              }}
            />
            <div className="font-semibold">DigitalT3</div>
          </div>
          <div className="text-sm text-gray-500">Weekly Report Platform</div>
        </div>
        <nav className="grid gap-1">
          {links.map((l) => {
            const active = pathname?.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link ${active ? "active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="min-h-screen">
        <header className="header">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold">Ocean Professional</h1>
            <span className="text-gray-500 hidden sm:inline">
              Clean, minimal, role-aware UI
            </span>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  {user.name} • {user.role}
                </span>
                <button className="btn btn-ghost" onClick={signOut}>
                  Sign out
                </button>
              </>
            ) : (
              <Link className="btn btn-primary" href="/sign-in">
                Sign In
              </Link>
            )}
          </div>
        </header>
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
