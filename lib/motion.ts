/**
 * Shared Framer Motion tokens — docs/DESIGN_SYSTEM.md §6.2.
 * Every animated component pulls timing/easing from here rather than
 * hardcoding its own, so the whole site moves on one consistent clock.
 */
import type { Transition, Variants } from "framer-motion";

export const EASE_MISSION_IN = [0.16, 1, 0.3, 1] as const;
export const EASE_MISSION_OUT = [0.4, 0, 0.2, 1] as const;

export const DURATION = {
  micro: 0.15,
  panel: 0.38,
  panelOut: 0.25,
  page: 0.5,
} as const;

export const panelTransition: Transition = {
  duration: DURATION.panel,
  ease: EASE_MISSION_IN,
};

export const panelExitTransition: Transition = {
  duration: DURATION.panelOut,
  ease: EASE_MISSION_OUT,
};

/** "Mission panel entrance" — rise + fade, DESIGN_SYSTEM.md §6.3 */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: panelTransition },
};

/** Stagger container for grids of ScrollReveal children (40ms/item) */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

/** Page/route transition — 8px slide + cross-fade */
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: DURATION.page, ease: EASE_MISSION_IN } },
  exit: { opacity: 0, y: -8, transition: { duration: DURATION.panelOut, ease: EASE_MISSION_OUT } },
};
