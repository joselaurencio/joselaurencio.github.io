import { defineConfig, defineCollection, s } from "velite";

// Content data model — see docs/PRD.md §15 and docs/ARCHITECTURE.md §3.3.
// Only the fields needed by the Mission Control homepage (and the pages that
// will consume the same collections next) are defined here; extend as new
// pages are built rather than pre-declaring unused fields.

const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/index.mdx",
  schema: s
    .object({
      slug: s.string(),
      title: s.string(),
      oneLiner: s.string(),
      status: s.enum(["planned", "active", "testing", "complete", "archived"]),
      tags: s.array(s.string()),
      startDate: s.isodate(),
      endDate: s.isodate().optional(),
      githubLink: s.string().optional(),
      cadLink: s.string().optional(),
      videoLink: s.string().optional(),
      featured: s.boolean().default(false),
      draft: s.boolean().default(false),
      lessonsLearned: s.array(s.string()).default([]),
      futureImprovements: s.array(s.string()).default([]),
      body: s.mdx(),
    })
    .transform((data) => ({ ...data, permalink: `/projects/${data.slug}` })),
});

const notebookEntries = defineCollection({
  name: "NotebookEntry",
  pattern: "notebook/**/*.mdx",
  schema: s
    .object({
      slug: s.string(),
      date: s.isodate(),
      title: s.string(),
      excerpt: s.string(),
      tags: s.array(s.string()).default([]),
      relatedProject: s.string().optional(),
      draft: s.boolean().default(false),
      body: s.mdx(),
    })
    .transform((data) => ({ ...data, permalink: `/notebook/${data.slug}` })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { projects, notebookEntries },
});
