import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface NotebookEntryCardProps {
  href: string;
  date: string;
  title: string;
  excerpt: string;
  tags: string[];
}

export function NotebookEntryCard({ href, date, title, excerpt, tags }: NotebookEntryCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-2 rounded-xl border border-border-hairline bg-panel p-5 transition-colors duration-150 ease-out hover:border-border-hairline-strong"
    >
      <span className="font-mono text-mono-label uppercase tracking-[0.06em] text-text-tertiary">
        {formatDate(date)}
      </span>
      <h3 className="text-h4 font-medium text-text-primary transition-colors group-hover:text-accent">
        {title}
      </h3>
      <p className="line-clamp-2 text-body-sm text-text-secondary">{excerpt}</p>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="neutral">
            {tag}
          </Badge>
        ))}
      </div>
    </Link>
  );
}
