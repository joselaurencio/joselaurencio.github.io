import type { MetadataRoute } from "next";

import { SITE } from "@/lib/constants";

export const dynamic = "force-static";

// Only lists routes that actually resolve today. Extend this as
// Projects/Notebook/Robotics/etc. route files are built (docs/PRD.md §17.2
// runs a broken-link check in CI, which will catch this file drifting from
// reality).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
