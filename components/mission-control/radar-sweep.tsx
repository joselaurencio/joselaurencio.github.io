import { cn } from "@/lib/utils";

interface RadarSweepProps {
  label?: string;
  className?: string;
}

/**
 * Loading affordance — rendered ONLY while a telemetry module is actively
 * fetching/hydrating live data. Never used as ambient/persistent decoration
 * (DESIGN_SYSTEM.md §6.3).
 */
export function RadarSweep({ label = "Acquiring telemetry…", className }: RadarSweepProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 py-8", className)} role="status">
      <div className="relative size-10">
        <div className="absolute inset-0 rounded-full border border-border-hairline" />
        <div className="absolute inset-0 animate-status-pulse rounded-full border border-accent/40" />
        <div
          className="absolute inset-0 animate-radar-sweep rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent 0%, var(--accent-signal) 8%, transparent 20%)",
          }}
        />
      </div>
      <span className="font-mono text-mono-label uppercase tracking-[0.06em] text-text-tertiary">
        {label}
      </span>
    </div>
  );
}
