import { getAllProjects, getLatestNotebookEntries } from "@/lib/content";
import { PRIMARY_NAV, SECONDARY_NAV } from "@/lib/constants";

export interface CommandPaletteItem {
  group: "Pages" | "Projects" | "Notebook";
  label: string;
  href: string;
  meta?: string;
}

/**
 * Builds the searchable index for the Command Palette from static content —
 * this is what makes Programming/Books/Dashboard reachable without a primary
 * nav slot (docs/PRD.md §4.3).
 *
 * Despite the `use*` name (kept for consistency with docs/ARCHITECTURE.md),
 * this holds no React state — it's synchronous data prep, so it's called
 * once from the server root layout and passed down as a prop.
 */
export function useCommandPaletteData(): CommandPaletteItem[] {
  const pages: CommandPaletteItem[] = [...PRIMARY_NAV, ...SECONDARY_NAV].map((item) => ({
    group: "Pages",
    label: item.label,
    href: item.href,
  }));

  const projects: CommandPaletteItem[] = getAllProjects().map((p) => ({
    group: "Projects",
    label: p.title,
    href: p.permalink,
    meta: p.oneLiner,
  }));

  const notebook: CommandPaletteItem[] = getLatestNotebookEntries(10).map((n) => ({
    group: "Notebook",
    label: n.title,
    href: n.permalink,
    meta: n.excerpt,
  }));

  return [...pages, ...projects, ...notebook];
}
