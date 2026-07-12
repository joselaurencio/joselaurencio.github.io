"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { revealVariants } from "@/lib/motion";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  as?: "div" | "li";
}

/**
 * Generic "rise + fade on viewport entry" — the shared implementation behind
 * the "mission panel entrance" catalog entry (docs/DESIGN_SYSTEM.md §6.3).
 * Reduced-motion is handled globally in app/globals.css, which zeroes out
 * animation/transition durations, so no separate check is needed here.
 */
export function ScrollReveal({ children, ...props }: ScrollRevealProps) {
  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
