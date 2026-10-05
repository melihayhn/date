"use client";

import { useSyncExternalStore } from "react";

const MINUTE = 60_000;

function subscribe(onChange: () => void) {
  const interval = window.setInterval(onChange, MINUTE / 2);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.clearInterval(interval);
    document.removeEventListener("visibilitychange", onChange);
  };
}

// Minute-precision snapshot keeps the value stable between renders.
const getSnapshot = () => Math.floor(Date.now() / MINUTE) * MINUTE;
const getServerSnapshot = () => null;

/**
 * Current time on the client, `null` during SSR / prerender.
 * The page is statically built, so dates must be resolved in the browser.
 */
export function useNow(): Date | null {
  const timestamp = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return timestamp === null ? null : new Date(timestamp);
}
