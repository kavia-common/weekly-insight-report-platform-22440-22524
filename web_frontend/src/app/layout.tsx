import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";
import LayoutShell from "@/components/layout/LayoutShell";

export const metadata: Metadata = {
  title: "DigitalT3 Weekly Report Platform",
  description: "Streamline weekly status reporting with insights and role-based dashboards.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SessionProvider>
          <LayoutShell>{children}</LayoutShell>
        </SessionProvider>
      </body>
    </html>
  );
}
