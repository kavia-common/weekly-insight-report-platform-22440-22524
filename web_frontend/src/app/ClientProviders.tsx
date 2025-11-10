"use client";

import React from "react";
import { AuthProvider } from "@/lib/auth";
import { ToastProvider } from "@/lib/toast";

/**
 * PUBLIC_INTERFACE
 * ClientProviders wraps the app with client-only context providers.
 */
export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
}
