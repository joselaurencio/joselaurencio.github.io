"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const listeners = new Set<() => void>();
let currentTheme: Theme = "dark";
let hydratedFromStorage = false;

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

/** Lazily reads the persisted choice on first client read — idempotent, so
 * React calling this more than once (as useSyncExternalStore may) is safe. */
function getSnapshot(): Theme {
  if (!hydratedFromStorage) {
    hydratedFromStorage = true;
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") currentTheme = stored;
  }
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return "dark";
}

function setTheme(theme: Theme) {
  currentTheme = theme;
  window.localStorage.setItem("theme", theme);
  listeners.forEach((listener) => listener());
}

/** Dark is canonical/default; toggling persists to localStorage and notifies
 * every subscriber (Navbar hint, CommandPalette action) in sync. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return { theme, toggleTheme };
}
