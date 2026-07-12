# File & Folder Architecture

## Mission Control — Jose Laurencio Engineering Portfolio

**Status:** Draft v1.0, derived from [PRD.md](./PRD.md) and [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
**Date:** 2026-07-12

This document is the complete, buildable file tree for the project. It maps
every page (PRD §6), every component in the design system (DESIGN_SYSTEM.md
§9), every content type (PRD §15–16), and every automation job (PRD §17) to an
exact file path. No implementation code — file names, purpose, and the
conventions that govern where new files go.

**[Decision]** Package manager: **pnpm** (fast, disk-efficient, matches the
`pnpm build` commands assumed in PRD §17). Node version pinned via `.nvmrc`.

---

## 1. Why there is no `app/api/` directory

This project ships as a fully static export (`output: 'export'`, PRD §17.1) to
GitHub Pages — there is no Node server at runtime, so Next.js Route Handlers
(`app/api/**/route.ts`) cannot do anything a static file can't. Every concern
that would normally be an API route instead lives here:

| Would-be API route | Actual home |
|---|---|
| `GET /api/github-activity` | `scripts/fetch-github-activity.ts`, runs in the `update-telemetry.yml` Action, writes `content/data/github.json` at build/commit time — the browser fetches a static JSON file, never a live endpoint |
| `GET /api/youtube-latest` | `scripts/fetch-youtube-feed.ts` → `content/data/youtube.json` |
| `GET /api/ftc-record` | `scripts/fetch-ftc-scout.ts` → `content/data/ftc.json` |
| `POST /api/contact` | No server-side handler exists in this repo. The Contact form's `<form>` posts directly to an external static-form endpoint (Formspree/Getform, PRD §19). If that provider is ever removed, the fallback is a plain `mailto:` link — never a same-repo API route, since one can't run here. |
| Search index | Not an endpoint — `pagefind` generates a static index into `public/pagefind/` as a **post-build** step; the client fetches those static files directly |

If a future requirement genuinely needs server compute (e.g. a stateful guestbook,
PRD §18 idea #4), that's a hosting-model change (e.g. add Vercel or a small
serverless function elsewhere), not something this file tree should route
around by faking a backend into a static export.

---

## 2. Complete Tree

```
joselaurencio.github.io/
├── app/
│   ├── layout.tsx                       # Root layout: <html>, ThemeProvider, fonts, Navbar, Footer,
│   │                                     # CommandPalette, AnimatePresence wrapper, SkipLink
│   ├── page.tsx                         # Mission Control (home) — assembles home-only sections
│   ├── loading.tsx                      # Root-level loading UI (RadarSweep-based)
│   ├── error.tsx                        # Root-level error boundary (on-brand "telemetry fault" state)
│   ├── not-found.tsx                    # 404 — "Signal Lost"
│   ├── globals.css                      # Tailwind layers + CSS custom properties (design tokens, §4)
│   ├── manifest.ts                      # Next.js native PWA manifest route (generates manifest.webmanifest)
│   ├── sitemap.ts                       # Native sitemap route, built from the Velite content index
│   ├── robots.ts                        # Native robots.txt route
│   ├── opengraph-image.tsx              # Default/fallback OG image for the site root
│   │
│   ├── projects/
│   │   ├── page.tsx                     # Projects index — filter bar + ProjectCard grid
│   │   ├── loading.tsx
│   │   └── [slug]/
│   │       ├── page.tsx                 # Project Detail — generateStaticParams over the project collection
│   │       ├── opengraph-image.tsx      # Per-project OG image, generated at build via next/og
│   │       └── not-found.tsx            # Unknown project slug
│   │
│   ├── notebook/
│   │   ├── page.tsx                     # Notebook index — reverse-chronological list + tag filter
│   │   └── [slug]/page.tsx
│   │
│   ├── research/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   │
│   ├── robotics/
│   │   └── page.tsx                     # Data-driven from content/data/ftc.json — no [slug], one page
│   │
│   ├── programming/
│   │   └── page.tsx
│   │
│   ├── timeline/
│   │   └── page.tsx                     # Reads content/data/timeline.json
│   │
│   ├── books/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx              # Only generated for books with a body (see PRD §6.11)
│   │
│   ├── dashboard/
│   │   └── page.tsx                     # Full telemetry view — composes the same lib/*.ts data as
│   │                                     # Mission Control's teaser modules, at full depth
│   │
│   └── contact/
│       └── page.tsx
│
├── components/
│   ├── ui/                              # shadcn/ui primitives (generated via `shadcn add`, then
│   │   │                                 # restyled to design-system tokens — see DESIGN_SYSTEM.md §9.1)
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── label.tsx
│   │   ├── dialog.tsx
│   │   ├── sheet.tsx
│   │   ├── tabs.tsx
│   │   ├── tooltip.tsx
│   │   ├── command.tsx                  # cmdk wrapper, base for CommandPalette
│   │   ├── separator.tsx
│   │   ├── scroll-area.tsx
│   │   ├── skeleton.tsx                 # loading placeholders (cards, telemetry modules)
│   │   └── sonner.tsx                   # toast/notification primitive (DESIGN_SYSTEM.md §6.3)
│   │
│   ├── layout/
│   │   ├── navbar.tsx                   # DESIGN_SYSTEM.md §9.4 — primary 7-item nav + ⌘K hint chip
│   │   ├── mobile-nav-sheet.tsx         # Sheet-based nav for <lg breakpoint
│   │   ├── footer.tsx                   # Full sitemap, socials, System Status line, deploy timestamp
│   │   ├── command-palette.tsx          # Composes ui/command.tsx + useCommandPaletteData hook
│   │   ├── page-shell.tsx               # Consistent page-level padding/max-width wrapper
│   │   ├── section.tsx                  # Section wrapper (handles §4 vertical spacing tokens)
│   │   ├── container.tsx                # Max-width (1280px) + gutter wrapper
│   │   └── skip-link.tsx                # "Skip to content" (DESIGN_SYSTEM.md §7.3)
│   │
│   ├── mission-control/                 # DESIGN_SYSTEM.md §9.2
│   │   ├── status-indicator.tsx
│   │   ├── telemetry-gauge.tsx
│   │   ├── mission-panel.tsx
│   │   ├── counter.tsx                  # visual component; count-up logic lives in lib/hooks/use-count-up.ts
│   │   ├── progress-bar.tsx
│   │   ├── radar-sweep.tsx
│   │   ├── blueprint-draw.tsx
│   │   ├── sparkline.tsx
│   │   └── system-status-bar.tsx
│   │
│   ├── content/                         # DESIGN_SYSTEM.md §9.3
│   │   ├── project-card.tsx
│   │   ├── project-filter-bar.tsx       # Projects index tag/status filter, URL-synced
│   │   ├── notebook-entry-card.tsx
│   │   ├── research-card.tsx
│   │   ├── timeline-item.tsx
│   │   ├── timeline-track.tsx
│   │   ├── timeline-filter.tsx
│   │   ├── book-card.tsx
│   │   ├── award-badge.tsx
│   │   ├── trophy-shelf.tsx
│   │   ├── team-stat-card.tsx
│   │   ├── skill-meter.tsx
│   │   ├── github-activity-graph.tsx    # Dashboard/Programming — reads content/data/github.json
│   │   ├── season-record-table.tsx      # Robotics — reads content/data/ftc.json
│   │   └── related-content.tsx          # "Related projects/notebook entries" by shared tags
│   │
│   ├── mdx/                             # PRD §16 custom MDX components + the renderer that maps them
│   │   ├── mdx-content.tsx              # <MDXContent source={...}> renderer used by every [slug] page
│   │   ├── mdx-components.ts            # tag → component mapping object passed to the renderer
│   │   ├── iteration-log.tsx            # <IterationLog>
│   │   ├── figure.tsx                   # <Figure> — responsive <picture>, pulls pre-optimized images
│   │   ├── video-embed.tsx              # <VideoEmbed>
│   │   ├── callout.tsx                  # <Callout type="note|failure|success">
│   │   ├── stat-row.tsx                 # <StatRow>
│   │   ├── before-after.tsx             # <BeforeAfter>
│   │   └── code-block.tsx               # fenced-code renderer w/ copy button (mono-code token)
│   │
│   └── motion/                          # Reusable Framer Motion wrappers (not domain components)
│       ├── page-transition.tsx          # AnimatePresence wrapper used once, in app/layout.tsx
│       ├── scroll-reveal.tsx            # Generic "rise + fade on viewport entry" used by MissionPanel,
│       │                                 # ProjectCard grids, etc. — the shared implementation behind
│       │                                 # the "mission panel entrance" catalog entry (DESIGN_SYSTEM.md §6.3)
│       └── stagger-group.tsx            # Wraps a list of ScrollReveal children with the 40ms stagger
│
├── content/
│   ├── projects/
│   │   ├── robocodex-robotics-camp/
│   │   │   ├── index.mdx                # the one file an author edits (PRD §16)
│   │   │   └── images/
│   │   │       ├── cover.jpg
│   │   │       └── curriculum-diagram.svg
│   │   └── ftc-24813-2025-robot/
│   │       ├── index.mdx
│   │       └── images/
│   │           ├── cover.jpg
│   │           ├── iteration-01.jpg
│   │           └── iteration-02.jpg
│   │
│   ├── notebook/
│   │   ├── 2026-02-22-texas-scrimmage-recap.mdx
│   │   └── 2026-04-11-championship-prep.mdx
│   │
│   ├── research/
│   │   └── path-planning-optimization-notes.mdx
│   │
│   ├── books/
│   │   ├── the-inner-game-of-tennis.mdx
│   │   └── the-count-of-monte-cristo.mdx
│   │
│   └── data/                            # generated snapshots (committed by CI, PRD §17.4) +
│       │                                 # the two small hand-edited files
│       ├── github.json                  # generated
│       ├── youtube.json                 # generated
│       ├── ftc.json                     # generated — seeded from PRD §0's verified FTCScout data
│       ├── mission.json                 # hand-edited — current goals/objectives
│       └── timeline.json                # hand-edited — milestone list
│
├── lib/
│   ├── content.ts                       # typed accessors over Velite's generated content index
│   ├── github.ts                        # reads content/data/github.json, exposes typed helpers
│   ├── youtube.ts                       # reads content/data/youtube.json
│   ├── ftc.ts                           # reads content/data/ftc.json
│   ├── seo.ts                           # shared metadata builder (title template, OG defaults)
│   ├── motion.ts                        # exported easing curves + duration constants matching
│   │                                     # DESIGN_SYSTEM.md §6.2 tokens (mission-ease-in/out, durations)
│   ├── constants.ts                     # nav items, social links, site metadata, keyboard shortcut map
│   ├── fonts.ts                         # next/font/local setup for Geist Sans/Mono
│   ├── utils.ts                         # cn() class-merge helper, date formatters, etc.
│   └── hooks/
│       ├── use-scroll-spy.ts            # Navbar active-section tracking
│       ├── use-reduced-motion.ts        # wraps prefers-reduced-motion (DESIGN_SYSTEM.md §6.4)
│       ├── use-count-up.ts              # Counter/TelemetryGauge shared animation logic
│       ├── use-command-palette-data.ts  # builds the searchable index from lib/content.ts
│       ├── use-media-query.ts           # breakpoint + (hover:hover)/(pointer:fine) detection (DESIGN_SYSTEM.md §8)
│       └── use-keyboard-shortcuts.ts    # global shortcut listener (⌘K, `g` then letter, `?`)
│
├── scripts/
│   ├── fetch-github-activity.ts         # run by update-telemetry.yml
│   ├── fetch-youtube-feed.ts            # parses the public channel RSS feed, no API key
│   ├── fetch-ftc-scout.ts               # queries the public FTCScout GraphQL API
│   └── optimize-images.ts               # pre-build: sharp-generates responsive WebP/AVIF variants
│                                         # for everything under content/**/images/
│
├── public/
│   ├── favicon.ico
│   ├── icons/
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   ├── icon-maskable-512.png
│   │   └── apple-touch-icon.png
│   ├── resume.pdf
│   ├── og/
│   │   └── default-cover.png            # fallback source image for app/opengraph-image.tsx
│   └── pagefind/                        # BUILD OUTPUT — generated by `pagefind` post-build,
│                                         # not hand-authored; gitignored, regenerated every deploy
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                       # PRD §17.2 — typecheck, lint, Velite validation, build,
│   │   │                                 # axe-core + Lighthouse CI budget, broken-link check
│   │   ├── deploy.yml                   # PRD §17.3 — build + deploy to GitHub Pages
│   │   └── update-telemetry.yml         # PRD §17.4 — scheduled + manual data refresh, auto-commit
│   └── PULL_REQUEST_TEMPLATE.md
│
├── velite.config.ts                     # zod schemas for Project/NotebookEntry/ResearchEntry/Book
├── next.config.ts                       # output: 'export', image config, MDX plugin wiring
├── tailwind.config.ts                   # design tokens from DESIGN_SYSTEM.md §2–5 as theme extensions
├── postcss.config.mjs
├── components.json                      # shadcn/ui config (paths, style, base color = "neutral")
├── tsconfig.json                        # strict: true, path aliases (@/components, @/lib, @/content)
├── eslint.config.mjs                    # flat config, next/core-web-vitals + jsx-a11y
├── .prettierrc
├── .nvmrc
├── package.json
├── pnpm-lock.yaml
├── .gitignore                           # out/, .next/, public/pagefind/, content/data/*.json build cache (if any)
├── AGENT.md
├── README.md
└── docs/
    ├── PRD.md
    ├── DESIGN_SYSTEM.md
    └── ARCHITECTURE.md                  # this document
```

---

## 3. Directory-by-Directory Rules

### 3.1 `app/` — routes only

Every file here is a Next.js route-convention file (`page`, `layout`,
`loading`, `error`, `not-found`, or a metadata route). **No non-trivial
component logic lives in `app/`** — a `page.tsx` composes components from
`components/*` and data from `lib/*`; it does not define its own card/panel
markup inline. This keeps every visual primitive reusable and testable in one
place instead of duplicated across routes.

- Static pages with no dynamic segment (`robotics`, `programming`, `timeline`,
  `dashboard`, `contact`) still get their own folder (not a flat
  `robotics.tsx`) so each can later grow a `loading.tsx`/`opengraph-image.tsx`
  without a restructure.
- `[slug]` folders always pair with `generateStaticParams` sourced from
  `lib/content.ts`, never a hand-maintained list of slugs.

### 3.2 `components/` — five categories, no sixth

Every component belongs in exactly one of: `ui/` (generic primitives), `layout/`
(page scaffolding, appears once per page), `mission-control/` (telemetry/status
visual language), `content/` (renders a specific content type), `mdx/` (only
usable inside MDX bodies), `motion/` (animation wrappers with no domain
meaning of their own). A new component that doesn't obviously fit one of these
is a sign the design system needs a new primitive defined first, not a
sixth folder.

- **Naming:** kebab-case filenames, PascalCase exported component name
  (`status-indicator.tsx` exports `StatusIndicator`).
- **Colocation:** a component's Framer Motion **variant objects** live next to
  it if they're one-off, or in `lib/motion.ts` if shared across ≥2 components
  (e.g. the mission-ease curve is shared; a one-off hover transform is local).
- Components never import directly from `content/` — they receive typed data
  as props from a `lib/*.ts` accessor, keeping the component layer decoupled
  from where content happens to be stored.

### 3.3 `content/` — data, not code

Two distinct kinds of files live here, and they're treated differently:

1. **Author-written MDX** (`projects/`, `notebook/`, `research/`, `books/`) —
   validated by `velite.config.ts` at build time, edited by hand, one folder
   or one file per entry (PRD §16). Images live beside their MDX file in an
   `images/` subfolder, never in `public/`, so a project's media travels with
   its content if ever moved/archived.
2. **Generated/hand-edited JSON** (`data/`) — `github.json`/`youtube.json`/
   `ftc.json` are **build artifacts of `scripts/*.ts`**, committed by the
   `update-telemetry.yml` bot, and should never be hand-edited (a comment at
   the top of each generated file states this). `mission.json` and
   `timeline.json` are the two exceptions — small enough that Jose edits them
   directly, no script needed.

### 3.4 `lib/` — the only place data is fetched/transformed

Every component that needs GitHub/YouTube/FTC/content data calls a `lib/*.ts`
accessor — never `fetch`/`fs.readFile` directly inside a component. This is
what makes Mission Control's teaser modules and Dashboard's full modules
share one source of truth (PRD §3): both call the same `lib/github.ts`
function, just render different slices of what it returns.

`lib/hooks/` is exclusively React hooks (prefixed `use-`); anything that
doesn't hold React state (pure formatting/data-shaping functions) goes in the
flat `lib/*.ts` files instead, not into a hook.

### 3.5 `scripts/` — build-time and CI-time only, never imported by the app

These run under Node via `tsx` in GitHub Actions (or locally with
`pnpm fetch:all`). They are the *only* code in the repo allowed to make live
network calls to GitHub/YouTube/FTCScout — the deployed site itself never does
(§1, avoids rate limits, keeps the site fully static).

### 3.6 `public/` — only truly static, unprocessed assets

Favicons, the manifest-referenced icon set, `resume.pdf`, and the OG fallback
source image. Content images (project photos, etc.) deliberately do **not**
live here — see §3.3. `public/pagefind/` is listed for completeness but is
build output (gitignored), regenerated by the `pagefind` CLI as a post-build
step in `deploy.yml`.

### 3.7 `.github/workflows/` — three jobs, three files, no more

- `ci.yml` — gate, runs on every PR
- `deploy.yml` — ship, runs on `main` after CI passes
- `update-telemetry.yml` — the only workflow with a `schedule:` trigger; its
  only job is to run the three `scripts/fetch-*.ts` files and commit any diff

No other automation is added without a corresponding line item in PRD §17 —
this keeps CI runtime predictable and each workflow single-purpose.

### 3.8 Where images specifically live (consolidated answer)

| Image type | Location |
|---|---|
| Project/notebook/research inline media | `content/<type>/<slug>/images/` |
| Pre-optimized responsive variants (build output) | Generated alongside the source, consumed via `<Figure>`; not manually created |
| Site chrome (favicon, app icons, manifest icons) | `public/icons/`, `public/favicon.ico` |
| Per-page/per-project OG share images | Generated at build time by `opengraph-image.tsx` route files (root and per-`[slug]`), not stored as static files |
| Resume | `public/resume.pdf` (the one static binary asset that isn't an icon) |

### 3.9 Where animation code specifically lives (consolidated answer)

| What | Location |
|---|---|
| Shared easing curves / duration constants (DESIGN_SYSTEM.md §6.2 tokens as real values) | `lib/motion.ts` |
| Generic scroll-reveal / stagger wrappers, reused across many components | `components/motion/` |
| Page-level route transition | `components/motion/page-transition.tsx`, mounted once in `app/layout.tsx` |
| Domain-specific animated primitives (RadarSweep, BlueprintDraw, status pulse) | `components/mission-control/` — they own their animation because it's inseparable from what they visually represent, not generic enough to extract |
| Reduced-motion detection | `lib/hooks/use-reduced-motion.ts`, consumed by both `components/motion/*` and `components/mission-control/*` |

---

## 4. Naming & Import Conventions

- Files: kebab-case. Components: PascalCase export matching the file's
  subject (`project-card.tsx` → `ProjectCard`).
- Path aliases (`tsconfig.json`): `@/components/*`, `@/lib/*`, `@/content/*`
  (Velite's generated types), `@/scripts/*` — no deep relative
  `../../../` imports.
- Barrel files (`index.ts` re-exports) are **not** used inside
  `components/*` subfolders — every component is imported from its own file
  path. This keeps bundle analysis and "find usages" honest, and avoids
  circular-import foot-guns as the component count grows.
- One component per file; a component's Storybook-less "variant" states are
  props, not separate files.

---

## 5. Cross-References

- Page/section content requirements: [PRD.md](./PRD.md) §6–7
- Data model each `lib/*.ts` accessor is typed against: [PRD.md](./PRD.md) §15
- Content workflow this `content/` layout enables: [PRD.md](./PRD.md) §16
- Deployment/Action behavior for `.github/workflows/*`: [PRD.md](./PRD.md) §17
- Every token/component referenced under `components/`: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) §9

This architecture is implementation-ready. Next step on request: scaffold the
repo matching this tree exactly (config files first, then primitives, then
routes).
