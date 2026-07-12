"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { StatusIndicator } from "./status-indicator";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const LINES = [
  "Relentlessly pursuing excellence through engineering, continuous learning, and purposeful creation.",
  "FTC Team #24813 — three seasons, an Inspire Award, a Finalist finish.",
  "Founder, RoboCodex Robotics Camp.",
];

function subscribeClock(callback: () => void) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}
function getClockSnapshot() {
  return Math.floor(Date.now() / 1000);
}
function getServerClockSnapshot() {
  return -1;
}

/** Null on the server/first paint (avoids a build-time-vs-runtime hydration
 * mismatch); ticks once per second on the client via useSyncExternalStore. */
function useClock() {
  const secondsSinceEpoch = useSyncExternalStore(subscribeClock, getClockSnapshot, getServerClockSnapshot);
  return secondsSinceEpoch === -1 ? null : new Date(secondsSinceEpoch * 1000);
}

export function SystemStatusBar() {
  const now = useClock();
  const reducedMotion = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setLineIndex((i) => (i + 1) % LINES.length), 5000);
    return () => clearInterval(id);
  }, [reducedMotion]);

  return (
    <div className="flex flex-col gap-3 border-b border-border-hairline py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <StatusIndicator status="nominal" label="System Status: Operational" />
        {now && (
          <span className="font-mono text-mono-label text-text-tertiary" suppressHydrationWarning>
            {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: "short" })}
          </span>
        )}
      </div>
      <div className="relative min-h-[1.5em] font-mono text-caption text-text-secondary sm:text-right">
        <AnimatePresence mode="wait">
          <motion.p
            key={lineIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {LINES[lineIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
