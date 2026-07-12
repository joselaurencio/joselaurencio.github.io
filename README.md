# personal-page

Jose Laurencio's personal engineering portfolio — "Mission Control." Built
with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Markdown/MDX
content, deployed as a static site to GitHub Pages.

This README is the practical "how do I change X" guide. For the deeper
reasoning behind design/architecture decisions, see:

- [`docs/PRD.md`](docs/PRD.md) — product spec: pages, sections, data model
- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) — colors, type, spacing,
  motion, component rules
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — exact file/folder layout
- [`AGENT.md`](AGENT.md) — quick orientation for AI coding agents

---

## 1. Getting set up

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
git clone https://github.com/joselaurencio/personal-page.git
cd personal-page
npm install
npm run dev
```

Open **http://localhost:3000**. The page hot-reloads as you edit files —
keep this running in a terminal while you work.

Stop the server with `Ctrl+C`.

### Other commands

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Full production build (content validation + static export to `out/`) |
| `npm run lint` | Checks code style/correctness |
| `npm run typecheck` | Checks TypeScript types |

Run `npm run build` before pushing anything nontrivial — it catches content
mistakes (see §2) and code errors that the dev server sometimes lets slide.

---

## 2. Adding or editing a project

Projects live in `content/projects/<slug>/index.mdx`. Adding a new one is
just: **make a folder, write one file.**

```bash
mkdir -p content/projects/my-new-project
```

Create `content/projects/my-new-project/index.mdx`:

```mdx
---
slug: "my-new-project"
title: "My New Project"
oneLiner: "One sentence describing what it is and why it matters."
status: "active"
tags: ["robotics", "software"]
startDate: "2026-08-01"
featured: true
draft: false
lessonsLearned:
  - "What you learned, as a specific sentence, not a vague platitude."
futureImprovements:
  - "What you'd do differently or build next."
---

## Problem

What problem were you solving?

## Constraints

What limited your options (time, budget, rules, team size)?

## Design Process

How did you approach it?

## Iterations & Failures

What didn't work, and what did you change because of it?

## Testing & Validation

How did you check it actually worked?

## Optimization

What did you improve after it was already working?

## Final Result

What did you end up with? Numbers/results if you have them.

## Lessons Learned

## Future Improvements
```

**Field reference** (`velite.config.ts` is the source of truth):

| Field | Required? | Notes |
|---|---|---|
| `slug` | yes | Must match the folder name; becomes the URL `/projects/<slug>` |
| `title` | yes | |
| `oneLiner` | yes | Shown on project cards |
| `status` | yes | One of `planned`, `active`, `testing`, `complete`, `archived` |
| `tags` | yes | Array of strings, e.g. `["robotics", "ftc"]` |
| `startDate` | yes | `"YYYY-MM-DD"` |
| `endDate` | no | `"YYYY-MM-DD"` |
| `githubLink` / `cadLink` / `videoLink` | no | Full URLs |
| `featured` | no, defaults `false` | `true` shows it in the homepage's "Featured Projects" (currently shows the 3 most recent featured projects) |
| `draft` | no, defaults `false` | `true` hides it from the site entirely — safe to work on a project without publishing it |
| `lessonsLearned` / `futureImprovements` | no, default `[]` | Arrays of strings |

**Images:** put them in `content/projects/<slug>/images/` alongside the
`index.mdx`, not in `public/`.

If you get a field wrong (misspelled `status` value, missing required
field), `npm run dev` or `npm run build` will fail with a specific error
telling you exactly what's wrong — that's Velite validating your frontmatter
against the schema above.

---

## 3. Adding a notebook entry

Notebook entries are shorter, dated devlog posts — one file, no folder
needed. Create `content/notebook/YYYY-MM-DD-short-title.mdx`:

```mdx
---
slug: "2026-08-01-short-title"
date: "2026-08-01"
title: "Something short and punchy"
excerpt: "One or two sentences — shown on the homepage and notebook list."
tags: ["robotics"]
relatedProject: "my-new-project"
draft: false
---

The actual entry, written as normal Markdown.
```

`relatedProject` is optional — set it to another project's `slug` to link
the two together. The 3 most recent non-draft entries show up on the
homepage automatically; nothing else needs to be touched.

---

## 4. Updating "Mission Control" content (goals, objectives, systems)

The homepage's **Current Mission**, **Current Objectives**, and
**Engineering Systems** sections are *not* Markdown — they're driven by
[`content/data/mission.json`](content/data/mission.json), because they
change often and don't need the full project-writeup structure.

Open that file directly and edit it. Shape:

```jsonc
{
  "currentMission": "One sentence describing what you're focused on right now.",
  "objectives": [
    {
      "label": "Short title",
      "detail": "One or two sentences of detail.",
      "progressPercent": 40,        // optional, 0-100
      "icon": "cpu"                  // see icon list below
    }
    // ... up to 4 read well on the homepage grid
  ],
  "goals": [
    {
      "label": "Goal name",
      "target": "What 'done' looks like",
      "progressPercent": 35,
      "category": "personal"        // robotics | programming | personal | academic
    }
  ],
  "systems": [
    {
      "name": "Robotics",
      "status": "in-progress",      // nominal | in-progress | planned
      "summary": "One sentence.",
      "href": "/robotics",
      "icon": "bot"
    }
    // exactly 4 systems render in the homepage grid: Robotics, Programming,
    // Research, Leadership by default
  ]
}
```

**Available icons** (`icon` field, defined in [`lib/icon-map.ts`](lib/icon-map.ts)):
`cpu`, `code-2`, `users`, `book-open`, `bot`, `terminal`, `flask-conical`,
`compass`. To use a different one, add it to that file first (any
[Lucide icon](https://lucide.dev/icons) name works).

This file is plain JSON — no build step needed to change it, just save and
the dev server picks it up.

---

## 5. Updating the timeline

[`content/data/timeline.json`](content/data/timeline.json) is a flat array,
newest or oldest first (it gets sorted automatically, newest first):

```jsonc
{
  "date": "2026-08-01",
  "title": "What happened",
  "category": "robotics",   // robotics | programming | leadership | personal | academic
  "description": "A sentence or two of detail.",
  "relatedProjectSlug": "my-new-project"  // optional
}
```

The homepage shows the 4 most recent milestones; the full list will show on
the `/timeline` page once it's built.

---

## 6. Updating "live" data (GitHub, FTC, YouTube)

These live in `content/data/github.json`, `content/data/ftc.json`, and
`content/data/youtube.json`. Right now they're **hand-seeded**, not
automated:

- `ftc.json` and `youtube.json` were seeded from the real FTCScout API and
  the real RoboCodex YouTube RSS feed — update them by hand when there's a
  new season result or you want to refresh the video list.
- `github.json` is currently **sample placeholder data** (marked
  `"sample": true`) because no GitHub username was confirmed yet — see the
  `TODO` in [`lib/constants.ts`](lib/constants.ts). Fill in the real
  username there and in `github.json` once you know it.

There are `fetch:ftc`, `fetch:youtube`, and `fetch:github` npm scripts
scaffolded (`scripts/fetch-*.ts`) for pulling this automatically, but the
scripts themselves and the scheduled GitHub Action that would run them
aren't built yet (see `docs/PRD.md` §17.4 for the intended design).

---

## 7. Changing colors, fonts, spacing, or navigation

- **Design tokens** (colors, type scale, spacing) live in
  [`app/globals.css`](app/globals.css) as CSS variables, following
  [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md). Change a token there and
  it updates everywhere automatically — don't hardcode a new hex value in a
  component.
- **Nav links, social links, site title/description** are in
  [`lib/constants.ts`](lib/constants.ts).
- **Keyboard shortcuts** are also in `lib/constants.ts` and wired up in
  [`lib/hooks/use-keyboard-shortcuts.ts`](lib/hooks/use-keyboard-shortcuts.ts).

---

## 8. Checking your changes actually work

1. `npm run dev` and look at the page in a browser — don't just trust that
   it compiles.
2. `npm run build` — this is the closest thing to what actually deploys.
   Content mistakes (bad frontmatter) and most real bugs show up here.
3. `npm run lint` and `npm run typecheck` for code-quality issues.

There's no component test suite (see `AGENT.md`), so a visual check in the
browser is the real verification step, especially after touching
components, motion, or layout.

---

## 9. What's built so far

Only the homepage (`/`) exists right now. The nav links to `/projects`,
`/notebook`, `/robotics`, `/research`, `/timeline`, `/contact`,
`/programming`, `/books`, and `/dashboard` will 404 until those pages are
built — see `docs/PRD.md` §6 for what each one is supposed to contain.

There's also no automated deploy workflow yet — pushing to `main` does not
currently rebuild and publish the site to GitHub Pages (see `AGENT.md` for
current status).

---

## 10. Getting help

If something breaks and the error message from `npm run dev` /
`npm run build` doesn't make it obvious what's wrong, the specs in `docs/`
usually have the answer:

- "Where should this component/file go?" → `docs/ARCHITECTURE.md`
- "What color/spacing/animation should I use?" → `docs/DESIGN_SYSTEM.md`
- "What is this page/section supposed to contain?" → `docs/PRD.md`
