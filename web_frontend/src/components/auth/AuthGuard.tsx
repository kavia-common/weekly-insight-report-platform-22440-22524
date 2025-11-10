"use client";

import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../providers/SessionProvider";
import type { Role } from "@/types/session";

export default function AuthGuard({
  children,
  allowed,
}: {
  children: React.ReactNode;
  allowed?: Role[]; // omit means any authenticated user
}) {
  const { session, loading } = useSession();
  const router = useRouter();

  const isAllowed = useCallback(() => {
    if (!session) return false;
    if (!allowed || allowed.length === 0) return true;
    return allowed.includes(session.user.role);
  }, [session, allowed]);

  useEffect(() => {
    if (!loading) {
      if (!session) {
        router.replace("/login");
      } else if (!isAllowed()) {
        router.replace("/dashboard");
      }
    }
  }, [loading, session, router, isAllowed]);

  if (loading) {
    return <div className="p-6 text-gray-600">Checking access...</div>;
  }

  if (!session || !isAllowed()) {
    // while redirecting
    return null;
  }

  return <>{children}</>;
}
