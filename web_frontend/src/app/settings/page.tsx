"use client";

import React from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import { useSession } from "@/components/providers/SessionProvider";

export default function SettingsPage() {
  const { session } = useSession();

  return (
    <AuthGuard>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Settings</h1>
        <div className="card p-4">
          <h2 className="font-medium">Profile</h2>
          <div className="text-sm text-gray-600 mt-2">
            <div>Name: {session?.user.name}</div>
            <div>Email: {session?.user.email}</div>
            <div>Role: {session?.user.role}</div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
