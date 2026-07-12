import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { TimelineMilestone } from "@/lib/mission";

const CATEGORY_COLOR: Record<TimelineMilestone["category"], string> = {
  robotics: "bg-accent",
  programming: "bg-status-nominal",
  leadership: "bg-status-caution",
  personal: "bg-text-tertiary",
  academic: "bg-text-secondary",
};

interface TimelineItemProps {
  milestone: TimelineMilestone;
  compact?: boolean;
}

/** Mini teaser variant for the homepage's Timeline strip (PRD.md §6.1 item 9). */
export function TimelineItem({ milestone, compact = false }: TimelineItemProps) {
  return (
    <div className={cn("flex min-w-[220px] flex-col gap-2 border-l-2 pl-4", "border-border-hairline")}>
      <div className="flex items-center gap-2">
        <span className={cn("size-1.5 rounded-full", CATEGORY_COLOR[milestone.category])} aria-hidden />
        <span className="font-mono text-mono-label uppercase tracking-[0.06em] text-text-tertiary">
          {formatDate(milestone.date)}
        </span>
      </div>
      <h4 className={cn("font-medium text-text-primary", compact ? "text-body-sm" : "text-h4")}>
        {milestone.title}
      </h4>
      {!compact && <p className="text-body-sm text-text-secondary">{milestone.description}</p>}
    </div>
  );
}
