const log = (...args: unknown[]) => {
  // eslint-disable-next-line no-console
  console.log("[startup]", ...args);
};

// PUBLIC_INTERFACE
export function printStartupInfo() {
  /** Prints startup environment details to help preview/diagnostics. */
  const port = process.env.NEXT_PUBLIC_PORT || "3000";
  const host = process.env.HOST || "0.0.0.0";
  const nodeEnv = process.env.NODE_ENV || "development";
  const healthPath = process.env.NEXT_PUBLIC_HEALTHCHECK_PATH || "/healthz";

  log(`Starting Next.js server...`);
  log(`NODE_ENV=${nodeEnv}`);
  log(`HOST=${host}`);
  log(`PORT=${port}`);
  log(`Health check path: ${healthPath}`);
  log(`API base: ${process.env.NEXT_PUBLIC_API_BASE || "(unset)"}`);
  log(`Backend URL: ${process.env.NEXT_PUBLIC_BACKEND_URL || "(unset)"}`);
  log(`Frontend URL: ${process.env.NEXT_PUBLIC_FRONTEND_URL || "(unset)"}`);
  log(`WS URL: ${process.env.NEXT_PUBLIC_WS_URL || "(unset)"}`);
  log(`Log level: ${process.env.NEXT_PUBLIC_LOG_LEVEL || "(unset)"}`);
  log(`Experiments enabled: ${process.env.NEXT_PUBLIC_EXPERIMENTS_ENABLED || "(unset)"}`);
}

// Immediately print info when this module is loaded.
printStartupInfo();
