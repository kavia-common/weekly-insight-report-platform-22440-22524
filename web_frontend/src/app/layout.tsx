import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import ClientProviders from "./ClientProviders";

export const metadata: Metadata = {
  title: "DigitalT3 Weekly Report Platform",
  description: "Mock frontend with Ocean Professional theme",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
