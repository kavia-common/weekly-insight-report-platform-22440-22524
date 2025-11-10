"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "../providers/SessionProvider";
import type { Role } from "@/types/session";

type NavItem = { href: string; label: string; roles?: Role[] };

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/reports", label: "Reports" },
  { href: "/reports/history", label: "History", roles: ["MANAGER", "ADMIN"] },
  { href: "/admin", label: "Admin", roles: ["ADMIN"] },
  { href: "/settings", label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { session } = useSession();

  const role = session?.user.role;

  return (
    <aside className="sidebar w-60 min-w-60 p-4">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Navigation</h2>
      </div>
      <nav className="space-y-1">
        {NAV_ITEMS.filter((i) => !i.roles || (role && i.roles.includes(role))).map((item) => {
          const active = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href} className={`nav-link ${active ? "active" : ""}`}>
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
