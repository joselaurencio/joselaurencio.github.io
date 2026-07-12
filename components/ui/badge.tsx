import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-mono-label uppercase tracking-[0.06em] whitespace-nowrap",
  {
    variants: {
      variant: {
        neutral: "border border-border-hairline text-text-secondary",
        accent: "bg-accent-muted text-accent",
        nominal: "bg-status-nominal/10 text-status-nominal",
        caution: "bg-status-caution/10 text-status-caution",
        critical: "bg-status-critical/10 text-status-critical",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };
