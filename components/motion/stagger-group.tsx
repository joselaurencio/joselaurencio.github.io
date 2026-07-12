"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { staggerContainerVariants } from "@/lib/motion";

/** Wraps a list of ScrollReveal children with the 40ms stagger (DESIGN_SYSTEM.md §6.3). */
export function StaggerGroup({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
