import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Base glass-style card for Mission Control's grid modules — a hairline
 * border and a faint inner top highlight, not a full glassmorphism blur
 * (DESIGN_SYSTEM.md §9.2 — "blueprint," not "frosted glass").
 */
export function MissionPanel({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border-hairline bg-panel p-6",
        "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        "transition-colors duration-150 ease-out hover:border-border-hairline-strong",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
