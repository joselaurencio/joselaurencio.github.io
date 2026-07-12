"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Counts from 0 to `value` once, when the element first enters the viewport.
 * Backs Counter and TelemetryGauge — docs/DESIGN_SYSTEM.md §6.3, capped at
 * ~800ms so it never reads as a stalling gimmick.
 */
export function useCountUp(value: number, durationMs = 800) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reducedMotion = useReducedMotion();
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (!inView || reducedMotion) return;

    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimated(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, durationMs, reducedMotion]);

  // Reduced motion skips the rAF loop entirely and renders the final value
  // directly once in view, rather than setState-ing it from inside an effect.
  const display = reducedMotion ? (inView ? value : 0) : animated;

  return { ref, display };
}
