import * as React from "react";

import { cn } from "@/lib/utils";

/** Max-width (1280px) + gutter wrapper — docs/DESIGN_SYSTEM.md §4. */
export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-16", className)}
      {...props}
    />
  );
}
