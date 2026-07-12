import * as React from "react";

import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerClassName?: string;
}

/** Section wrapper — handles vertical spacing tokens (DESIGN_SYSTEM.md §4). */
export function Section({ className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section className={cn("py-16 lg:py-24", className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
