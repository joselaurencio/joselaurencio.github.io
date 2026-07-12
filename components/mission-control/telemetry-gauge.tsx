"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface TelemetryGaugeProps {
  value: number;
  max: number;
  label: string;
  displayValue?: string;
  size?: number;
  className?: string;
}

const STROKE = 6;

export function TelemetryGauge({ value, max, label, displayValue, size = 120, className }: TelemetryGaugeProps) {
  const reducedMotion = useReducedMotion();
  const radius = (size - STROKE) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(1, Math.max(0, value / max));

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border-hairline)"
            strokeWidth={STROKE}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--accent-signal)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference * (1 - percent) }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-mono-stat font-medium text-text-primary tabular-nums">
            {displayValue ?? value}
          </span>
        </div>
      </div>
      <span className="text-center font-mono text-mono-label uppercase tracking-[0.06em] text-text-tertiary">
        {label}
      </span>
    </div>
  );
}
