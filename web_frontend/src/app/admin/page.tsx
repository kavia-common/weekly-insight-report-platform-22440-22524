"use client";

import React from "react";
import AuthGuard from "@/components/auth/AuthGuard";

export default function AdminPage() {
  return (
    <AuthGuard allowed={["ADMIN"]}>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Admin</h1>
        <p className="text-sm text-gray-600">Manage users, roles, and platform settings.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-4">
            <h2 className="font-medium">Users</h2>
            <p className="text-sm text-gray-600">Add, remove, or modify user roles.</p>
          </div>
          <div className="card p-4">
            <h2 className="font-medium">Audit Logs</h2>
            <p className="text-sm text-gray-600">Review authentication and access events.</p>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
