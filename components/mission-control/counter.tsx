"use client";

import { useCountUp } from "@/lib/hooks/use-count-up";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function Counter({ value, suffix, className }: CounterProps) {
  const { ref, display } = useCountUp(value);

  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={cn("font-mono text-mono-stat font-medium text-text-primary tabular-nums", className)}
    >
      {display}
      {suffix}
    </span>
  );
}
