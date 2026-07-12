"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import type { Status } from "./status-indicator";

interface ProgressBarProps {
  percent: number;
  label?: string;
  tone?: Extract<Status, "nominal" | "in-progress" | "offline"> | "accent";
  className?: string;
}

const TONE_FILL: Record<NonNullable<ProgressBarProps["tone"]>, string> = {
  accent: "bg-accent",
  nominal: "bg-status-nominal",
  "in-progress": "bg-status-caution",
  offline: "bg-status-critical",
};

/** Track + fill, always paired with a numeric label (DESIGN_SYSTEM.md §9.2). */
export function ProgressBar({ percent, label, tone = "accent", className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <div className="flex items-baseline justify-between text-caption text-text-secondary">
          <span>{label}</span>
          <span className="font-mono text-text-tertiary">{clamped}%</span>
        </div>
      )}
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-border-hairline"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <motion.div
          className={cn("h-full rounded-full", TONE_FILL[tone])}
          initial={{ width: 0 }}
          whileInView={{ width: `${clamped}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
