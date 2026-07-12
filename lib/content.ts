import { projects, notebookEntries } from "@/.velite";

/**
 * Typed accessors over the Velite-generated content layer — the only place
 * components should reach into `content/**` data (docs/ARCHITECTURE.md §3.4).
 */

export function getFeaturedProjects(limit = 3) {
  return projects
    .filter((p) => p.featured && !p.draft)
    .sort((a, b) => (a.startDate < b.startDate ? 1 : -1))
    .slice(0, limit);
}

export function getAllProjects() {
  return projects.filter((p) => !p.draft);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug && !p.draft);
}

export function getLatestNotebookEntries(limit = 3) {
  return notebookEntries
    .filter((n) => !n.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}

export function getNotebookEntryBySlug(slug: string) {
  return notebookEntries.find((n) => n.slug === slug && !n.draft);
}
