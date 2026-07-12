"use client";

import { motion } from "framer-motion";

import { pageTransitionVariants } from "@/lib/motion";

/** Route-level transition — 8px slide + cross-fade, mounted once in AppChrome. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageTransitionVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}
