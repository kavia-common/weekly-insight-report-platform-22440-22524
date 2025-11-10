"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // getSessionFromUrl is automatically handled by @supabase/ssr in browser flow,
        // but we call getSession to ensure state is settled.
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Auth callback error:", error);
          router.replace("/auth/error");
          return;
        }
        if (data?.session) {
          router.replace("/dashboard");
        } else {
          router.replace("/sign-in");
        }
      } catch (e) {
        console.error("Auth callback exception:", e);
        router.replace("/auth/error");
      }
    };
    handleAuthCallback();
  }, [router]);

  return <div className="p-6">Processing authentication...</div>;
}
