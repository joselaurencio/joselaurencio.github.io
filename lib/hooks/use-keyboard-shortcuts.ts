"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface UseKeyboardShortcutsOptions {
  onOpenPalette: () => void;
  onOpenCheatSheet: () => void;
}

const GO_TO_ROUTES: Record<string, string> = {
  h: "/",
  p: "/projects",
  n: "/notebook",
  r: "/robotics",
  t: "/timeline",
  c: "/contact",
};

/** Global shortcut listener — docs/DESIGN_SYSTEM.md / PRD.md §4.4. */
export function useKeyboardShortcuts({ onOpenPalette, onOpenCheatSheet }: UseKeyboardShortcutsOptions) {
  const router = useRouter();

  useEffect(() => {
    let awaitingGoTo = false;
    let awaitingTimeout: ReturnType<typeof setTimeout>;

    const isTypingTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      return (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      );
    };

    const handler = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenPalette();
        return;
      }

      if (event.key === "?" && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        onOpenCheatSheet();
        return;
      }

      if (awaitingGoTo) {
        awaitingGoTo = false;
        const route = GO_TO_ROUTES[event.key.toLowerCase()];
        if (route) router.push(route);
        return;
      }

      if (event.key.toLowerCase() === "g" && !event.metaKey && !event.ctrlKey) {
        awaitingGoTo = true;
        clearTimeout(awaitingTimeout);
        awaitingTimeout = setTimeout(() => {
          awaitingGoTo = false;
        }, 1200);
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      clearTimeout(awaitingTimeout);
    };
  }, [router, onOpenPalette, onOpenCheatSheet]);
}
