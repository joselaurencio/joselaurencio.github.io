import Link from "next/link";
import { ArrowUpRight, Bot, Code2, Compass } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator, type Status } from "@/components/mission-control/status-indicator";

interface ProjectCardProps {
  href: string;
  title: string;
  oneLiner: string;
  tags: string[];
  status: "planned" | "active" | "testing" | "complete" | "archived";
  density?: "feature" | "default";
}

const STATUS_MAP: Record<ProjectCardProps["status"], Status> = {
  planned: "planned",
  active: "in-progress",
  testing: "in-progress",
  complete: "nominal",
  archived: "offline",
};

const TAG_ICON: Record<string, typeof Bot> = {
  robotics: Bot,
  leadership: Compass,
  software: Code2,
};

/** No real project photography exists yet — cover uses a generated blueprint
 * schematic treatment instead of a placeholder photo (DESIGN_SYSTEM.md §9.3). */
function ProjectCover({ tags }: { tags: string[] }) {
  const Icon = TAG_ICON[tags[0] ?? ""] ?? Bot;
  return (
    <div className="blueprint-grid relative flex h-40 items-center justify-center overflow-hidden rounded-t-xl border-b border-border-hairline bg-panel-raised">
      <Icon className="size-10 text-accent/50 transition-transform duration-300 ease-out group-hover:scale-110" aria-hidden />
    </div>
  );
}

export function ProjectCard({ href, title, oneLiner, tags, status, density = "default" }: ProjectCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border-hairline bg-panel transition-colors duration-150 ease-out hover:border-border-hairline-strong focus-visible:border-border-hairline-strong",
        density === "feature" && "sm:col-span-1"
      )}
    >
      <ProjectCover tags={tags} />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-h4 font-medium text-text-primary">{title}</h3>
          <ArrowUpRight
            className="mt-1 size-4 shrink-0 text-text-tertiary transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            aria-hidden
          />
        </div>
        <p className="text-body-sm text-text-secondary">{oneLiner}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="neutral">
                {tag}
              </Badge>
            ))}
          </div>
          <StatusIndicator status={STATUS_MAP[status]} label={status} />
        </div>
      </div>
    </Link>
  );
}
