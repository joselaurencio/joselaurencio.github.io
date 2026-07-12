import { cn } from "@/lib/utils";

export type Status = "nominal" | "in-progress" | "planned" | "offline";

const STATUS_STYLES: Record<Status, { dot: string; text: string; pulse: boolean }> = {
  nominal: { dot: "bg-status-nominal", text: "text-status-nominal", pulse: false },
  "in-progress": { dot: "bg-status-caution", text: "text-status-caution", pulse: true },
  planned: { dot: "border border-text-tertiary bg-transparent", text: "text-text-tertiary", pulse: false },
  offline: { dot: "bg-status-critical", text: "text-status-critical", pulse: false },
};

const STATUS_TEXT: Record<Status, string> = {
  nominal: "Nominal",
  "in-progress": "In progress",
  planned: "Planned",
  offline: "Blocked",
};

interface StatusIndicatorProps {
  status: Status;
  label?: string;
  className?: string;
}

/** Dot/icon + text label — color never carries meaning alone (DESIGN_SYSTEM.md §7.2). */
export function StatusIndicator({ status, label, className }: StatusIndicatorProps) {
  const styles = STATUS_STYLES[status];
  return (
    <span
      className={cn("inline-flex items-center gap-2 font-mono text-mono-label uppercase tracking-[0.06em]", styles.text, className)}
      role="status"
      aria-label={`Status: ${label ?? STATUS_TEXT[status]}`}
    >
      <span className={cn("size-2 rounded-full", styles.dot, styles.pulse && "animate-status-pulse")} aria-hidden />
      {label ?? STATUS_TEXT[status]}
    </span>
  );
}
