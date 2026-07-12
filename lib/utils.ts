import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string, options?: Intl.DateTimeFormatOptions) {
  // Every date used on this site (notebook entries, timeline milestones, FTC
  // events) represents a calendar day, not a precise moment — but they arrive
  // as UTC-midnight strings (plain "2026-04-11" from hand-written JSON, or
  // "2026-04-11T00:00:00.000Z" once Velite's s.isodate() normalizes MDX
  // frontmatter). Formatting either directly in a negative-UTC-offset
  // timezone rolls the date back a day (e.g. renders "Apr 10"). Reading the
  // Y/M/D back out via the UTC getters and rebuilding a local Date sidesteps
  // the shift regardless of which shape the string arrived in.
  const utc = new Date(iso);
  const date = new Date(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate());
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  });
}
