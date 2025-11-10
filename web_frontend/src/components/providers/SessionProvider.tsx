"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Session } from "@/types/session";
import { getSession } from "@/lib/auth";

type SessionState = {
  session: Session | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

const SessionContext = createContext<SessionState>({
  session: null,
  loading: true,
  refresh: async () => {},
});

/**
 * PUBLIC_INTERFACE
 * useSession
 * Hook to access current session state (user and loading).
 */
export function useSession() {
  return useContext(SessionContext);
}

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const s = await getSession();
    setSession(s);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  return (
    <SessionContext.Provider
      value={{
        session,
        loading,
        refresh: load,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
