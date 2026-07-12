# Product Requirements Document

## Mission Control — Jose Laurencio Engineering Portfolio

**Status:** Draft v1.0
**Owner:** Jose Laurencio
**Prepared by:** Engineering/Design review
**Date:** 2026-07-12

This document specifies everything required to design and build the site with no
further product decisions needed. Where a decision was made on the user's behalf
(naming, exact palette values, library choices), it is marked **[Decision]** — these
are reasonable, reversible defaults, not open questions.

---

## 0. Real-World Data on Record

These facts were verified against live sources on 2026-07-12 and should seed the
initial content rather than being invented:

**FTC Team #24813 — "SHCA Happy Hawks"** (source: FTCScout public GraphQL API)
- School: Scenic Hills Christian Academy, San Antonio, TX, USA
- Rookie year: 2023
- Sponsors: Scenic Hills SDA Church, R&L Overhead Door Inc, Laurel Ridge Treatment Center
- Season 2023 (CENTERSTAGE): Adventist Robotics FTC Championship (Apr 2024) —
  **Control Award, 2nd**; **Think Award, 2nd**
- Season 2024 (INTO THE DEEP): Adventist Robotics League Championship (Apr 2025) —
  **Inspire Award, 1st**
- Season 2025 (current/in progress): Adventist Robotics Texas Scrimmage (Feb 2026);
  Adventist Robotics Championship (Apr 2026) — **Dean's List Semifinalist**,
  **Inspire Award, 1st**, **Finalist Award, 2nd**

**YouTube — @robocodex**
- Channel title: "RoboCodex"
- Channel ID: `UCh8_Svg38qlhjtEVjOb4-MQ` (verified via canonical link + `externalId`
  on the channel page — an earlier lookup during this project misidentified
  the ID as `UCuXq-jiU0ANeBcF_Tvq1D7g`, which actually belongs to an unrelated
  channel called "Builderdude35"; corrected 2026-07-12)
- Public RSS feed (no API key required):
  `https://www.youtube.com/feeds/videos.xml?channel_id=UCh8_Svg38qlhjtEVjOb4-MQ`

This data should be re-fetched automatically on a schedule (see §18–19), not hand-maintained.

---

## 1. Vision

### 1.1 Statement

Build a portfolio that reads as a **live engineering command center**, not a résumé.
A visitor should leave understanding *how Jose thinks*, not just *what he's built* —
every artifact on the site exposes problem framing, constraints, iteration, failure,
and measured results, because that is what distinguishes an engineer from a project
list.

### 1.2 Design pillars

1. **Evidence over adjectives.** No "hardworking" or "passionate" copy. Show a
   commit graph, a season record, a failed prototype and what changed after.
2. **Purposeful motion only.** Every animation encodes state, hierarchy, or
   causality. If an animation can be removed without losing information, cut it.
3. **Quiet confidence.** Dark, minimal, generous whitespace, one disciplined accent
   color used only for status/signal — not decoration. No cyberpunk neon.
4. **Content-as-data.** The person maintaining this site (a busy high schooler)
   must be able to publish a new project by creating one folder and writing one
   Markdown file — no touching components or routing.
5. **Fast and honest.** Static export, Lighthouse ≥ 95 across all four categories,
   works offline, keyboard-navigable, no dark patterns, no fake urgency.

### 1.3 Success metrics

| Metric | Target |
|---|---|
| Lighthouse Performance / Accessibility / Best Practices / SEO | ≥ 95 each |
| WCAG conformance | AA, with AAA on body-text contrast where feasible |
| Time to first meaningful mission-control paint | < 1.5s on 4G |
| New project publish time (folder → live) | < 5 minutes, zero code changes |
| Recruiter/admissions session: reaches a project detail page | primary funnel KPI |
| Works fully offline after first visit (PWA) | Yes |

---

## 2. User Personas

### 2.1 Riley — Internship/Early-Career Recruiter *(primary)*
Screens 40+ candidates a week, gives each portfolio ~45 seconds before deciding to
go deeper. Wants: proof of real engineering process, not just a GitHub link.
Scans headlines and status indicators before reading prose. Will use search or
command palette if impressed enough to look for something specific ("does he know
Java", "has he shipped anything with a team").

### 2.2 Dr. Chen — College Admissions Officer
Reads holistically: leadership (RoboCodex camp), sustained commitment (multi-season
FTC record), intellectual curiosity (research/reading list), not just technical
output. Cares about narrative coherence across Timeline, Robotics, and About/Mission
sections. Reads more than Riley; won't be rushed but rewards a strong front page.

### 2.3 Marcus — FTC Mentor / Fellow Team Member
Wants technical specificity: robot subsystems, CAD, code architecture, competition
results, lessons learned between seasons. Will dig into a Project Detail page fully
and may cross-reference the Robotics hub's season-by-season record.

### 2.4 Sam — Sponsor / Camp Parent
Landing point is usually the RoboCodex Robotics Camp project or a shared link. Wants
credibility signals fast: outcomes, professionalism, visual proof (photos), and a
clear way to make contact.

**Design implication:** the homepage must satisfy Riley's 45-second scan *and*
reward Dr. Chen's and Marcus's deeper reads without forcing either persona through
the other's path — hence Mission Control (fast overview) + Dashboard (deep telemetry)
as two distinct altitudes of the same data, plus a fast, reliable Command Palette
for direct navigation.

---

## 3. Information Architecture

```
Mission Control (/)                — overview, teaser telemetry, entry point
├── Projects (/projects)           — index
│   └── /projects/[slug]           — engineering-thinking deep dive, MDX
├── Engineering Notebook (/notebook)
│   └── /notebook/[slug]           — dated devlog entry, MDX
├── Research (/research)
│   └── /research/[slug]           — MDX
├── Robotics (/robotics)           — FTC #24813 team hub (data-driven, not MDX)
├── Programming (/programming)     — skills + GitHub activity
├── Timeline (/timeline)           — full interactive milestone timeline
├── Books (/books)                 — reading list
│   └── /books/[slug]              — MDX notes
├── Dashboard (/dashboard)         — full-depth live telemetry ("cockpit view")
├── Contact (/contact)
└── not-found                      — 404, on-brand
```

**[Decision]** Mission Control and Dashboard are deliberately two different
altitudes of the same underlying data (GitHub activity, FTC record, goals,
project status), not duplicate pages: Mission Control is the curated highlight
reel sized for a 45-second scan; Dashboard is the exhaustive cockpit view for
someone who wants to dig (full contribution heatmap, full project Kanban board,
full award case). Every Mission Control telemetry module links to its expanded
counterpart on Dashboard.

---

## 4. Navigation

### 4.1 Primary nav (sticky top bar, glass panel over blueprint-grid background)

`Mission Control · Projects · Notebook · Robotics · Research · Timeline · Contact`

**[Decision]** Capped at 7 items to keep the bar scannable at a glance (matches
Riley's 45-second persona). `Programming`, `Books`, and `Dashboard` are one click
away via:
- The homepage's telemetry modules (each links out to its full page)
- The command palette (⌘K / Ctrl+K)
- The footer sitemap

### 4.2 Footer

Full sitemap (all routes, including the three not in primary nav), social links
(GitHub, YouTube @robocodex, email, FTC Scout team profile), "System Status:
Operational" indicator + last-deployed timestamp (sourced from the build,
reinforces the "live system" feel), and a one-line credit ("Built with Next.js,
deployed via GitHub Actions").

### 4.3 Command Palette (⌘K / Ctrl+K)

Global, available on every route. Fuzzy-searches: all projects, notebook entries,
research entries, books, and static pages; plus actions (toggle theme, copy email,
open resume PDF, jump to GitHub/YouTube). This is the actual navigation backbone
for the four items not in the primary nav — it must be fast and discoverable (a
subtle "⌘K" hint chip lives in the navbar at all times).

### 4.4 Keyboard shortcuts

| Key | Action |
|---|---|
| `⌘/Ctrl K` | Open command palette |
| `/` | Focus in-page search (on index pages) |
| `G` then `H/P/N/R/T/C` | Go to Home / Projects / Notebook / Robotics / Timeline / Contact |
| `Esc` | Close palette/dialog |
| `?` | Show keyboard shortcut cheat sheet |

---

## 5. User Journey (primary persona: Riley, recruiter)

1. **Lands on `/`** from a resume link or LinkedIn. Sees status bar ("System
   Status: Operational"), mission statement, and three telemetry modules within
   the first viewport — no scrolling required to get a signal.
2. **Scans "Engineering Systems"** panel (Robotics / Programming / Research /
   Leadership) — each shows a one-line status, satisfies the 45-second scan.
3. **Clicks a Featured Project card.** Lands on a Project Detail page structured
   as Problem → Constraints → Process → Iterations/Failures → Testing →
   Optimization → Result → Lessons → Future — this is the moment the site proves
   "thinks like an engineer," so it must load fast and read well without any
   interaction.
4. **Opens Command Palette out of curiosity**, types "java" — surfaces the
   Programming page and any project tagged Java. This is the "impressed enough to
   dig" signal — palette responsiveness matters here.
5. **Checks GitHub activity module** (real commit graph, not a claim) —
   corroborates the story just read.
6. **Hits Contact** — sees clear "open to internships" status and an email/contact
   form, low-friction close.

Total target time: under 3 minutes to a contact action, without ever leaving the
site (no forced external redirects except optional deep links like the FTC Scout
profile or the GitHub repo itself).

---

## 6–7. Pages and Sections

### 6.1 Mission Control — `/` (home)

1. **Status bar** — live local/UTC clock, "System Status: Operational" light,
   short rotating mission-statement typewriter line.
2. **Hero** — name, role line ("Student · Builder · Future Engineer"), one-line
   mission statement, primary CTAs (View Projects, Contact).
3. **Current Mission** — headline current objective (e.g. current FTC season
   focus) with a progress indicator.
4. **Current Objectives grid** — 3–4 cards: current build, current learning
   topic, current competition prep, current read. Sourced from a single
   `content/data/mission.json` the owner edits directly (see §16).
5. **Engineering Systems overview** — four "subsystem" cards (Robotics,
   Programming, Research, Leadership) each with a status light
   (nominal/in-progress/planned) and a one-line summary; click-through to the
   relevant page.
6. **Live telemetry strip** — three compact modules: GitHub activity sparkline,
   FTC season record chip (current W/L or award tally), YouTube latest-upload
   card. Each links to its full page (Programming, Robotics, or the YouTube
   video itself).
7. **Featured Projects** — 3 cards, blueprint-hover-reveal (hover swaps a photo
   for a line-drawing schematic treatment), links to `/projects/[slug]`.
8. **Latest Notebook entries** — 3 most recent, dated like lab-notebook entries.
9. **Timeline teaser** — condensed horizontal strip of the 4 most recent
   milestones, links to `/timeline`.
10. **Contact band** — mission statement close, contact CTA, socials.

### 6.2 Projects index — `/projects`

- Header + one-line framing ("Selected engineering work — problems, constraints,
  iterations, results.")
- Filter bar: by tag (Robotics / Software / Research / Hardware / Leadership) and
  status (Active / Testing / Complete / Archived) — client-side filter over the
  build-time project list, URL-synced (`?tag=robotics&status=active`) so filtered
  views are shareable/linkable.
- Grid of `ProjectCard`s (title, one-line problem statement, tags, status light,
  cover image).
- Empty state for a filter combination with zero results.

### 6.3 Project Detail — `/projects/[slug]`

Fixed section order (mirrors the "show engineering thinking" requirement exactly;
authors fill these in as MDX headings/components, see §16):

1. Hero — title, one-liner, cover image/video, tag chips, status light, external
   links (GitHub repo, CAD file, video)
2. Problem
3. Constraints
4. Design Process
5. Iterations & Failures — rendered via a repeatable `<IterationLog>` MDX
   component (date/attempt label, what was tried, what happened, what changed)
6. Testing & Validation
7. Optimization
8. Final Result — supports embedded metrics/photos/video
9. Lessons Learned
10. Future Improvements
11. Competition Info (optional — only rendered if `competitionRef` frontmatter is
    present; pulls the relevant season/event from the FTC data snapshot)
12. Prev/Next project + "Related projects" (by shared tags)

### 6.4 Engineering Notebook index — `/notebook`

Reverse-chronological list, lab-notebook styling (date stamp, title, excerpt,
optional "linked project" chip, reading time). Tag filter. This is the informal
devlog — shorter, more frequent posts than Projects.

### 6.5 Notebook Entry — `/notebook/[slug]`

Full MDX body, sticky in-page table of contents on desktop, prev/next entry nav,
"linked project" card if `relatedProject` is set.

### 6.6 Research index — `/research`

Cards styled like abstracts (title, one-sentence abstract, date, tags). Lower
frequency, higher depth than Notebook — for write-ups on things studied/explored
that aren't tied to a single build (e.g., an optimization algorithm explored, a
paper worked through).

### 6.7 Research Entry — `/research/[slug]`

Sections: Abstract, Motivation, Method/Approach, Findings, References
(hyperlinked), Related (auto-linked projects/notebook entries sharing tags).

### 6.8 Robotics — `/robotics`

Fully data-driven (not MDX — sourced from the FTC data snapshot, §16/§19), since
this is factual competition record that should never drift from reality:

1. Team header — FTC #24813 "SHCA Happy Hawks," Scenic Hills Christian Academy,
   San Antonio TX, rookie year 2023, sponsor list.
2. Season-by-season record — auto-rendered from `ftc.json`: events attended,
   awards won, placement. Newest season first.
3. Award case — visual `TrophyShelf` of every award on record.
4. Robot systems — subsystem breakdown (drivetrain, intake, outtake, vision,
   controls) with links into any `/projects` entries tagged for that subsystem.
5. External links — FTC Scout team profile, YouTube robot-reveal playlist.

### 6.9 Programming — `/programming`

1. Skills matrix — languages/tools with a proficiency + "currently deepening"
   flag (Java as primary per bio; expandable as skills grow).
2. Engineering philosophy — short statement on how Jose approaches code
   (optimization, system design mindset).
3. GitHub activity dashboard module — contribution heatmap, top repos, recent
   public commits, sourced from the build-time GitHub snapshot (§19).
4. Selected snippets/algorithms (optional, syntax-highlighted cards) for
   notable pieces of code not large enough to be their own Project.

### 6.10 Timeline — `/timeline`

Full interactive vertical timeline across all categories (Robotics seasons,
programming milestones, RoboCodex camp founding, competitions, personal goals
including the "dunk before end of 2026" goal treated with the same visual
seriousness as everything else — the site should have a sense of humor without
undercutting itself). Filterable by category. Scroll-linked reveal: each
milestone's connector line draws in as it enters the viewport.

### 6.11 Books — `/books`

Currently-reading section up top (The Inner Game of Tennis, The Count of Monte
Cristo) with a progress indicator; below, a log of finished books with rating and
key takeaways. Each book can optionally have a full `/books/[slug]` MDX notes
page; otherwise the card itself is sufficient.

### 6.12 Dashboard — `/dashboard`

The full cockpit view, one level deeper than every Mission Control module:

- Full GitHub contribution heatmap (12 months) + top-language breakdown
- Full FTC season stat gauges (win rate, average score trend if available,
  award count)
- Project status board — Kanban-style columns (Planned / Active / Testing /
  Complete) built from every project's `status` frontmatter field
- Goal progress bars — reads directly from `content/data/mission.json`
  (includes the dunk goal, reading goals, season goals)
- YouTube module — recent uploads grid + (if available) subscriber count
- "Days since last commit" / uptime-style live stat

### 6.13 Contact — `/contact`

Mission statement restated as a closing note; contact form (see §9.4 for the
static-hosting-compatible approach); explicit "Open to: internships / mentorship /
collaboration" status badges; direct links (email, GitHub, YouTube, LinkedIn
placeholder if/when available).

### 6.14 Not Found — `/not-found`

On-brand: "Signal Lost" / telemetry-dropout framing, links back to Mission
Control and the Command Palette hint.

---

## 8. Component Library

**[Decision]** Base primitives on **shadcn/ui** (Button, Badge, Card, Dialog,
Tabs, Tooltip, Sheet, Separator, ScrollArea, Command) so accessibility and
keyboard behavior are inherited rather than rebuilt, then layer a
mission-control-specific component set on top.

### Layout
`Navbar`, `Footer`, `CommandPalette`, `PageShell`, `Section`, `Container`,
`MobileNavSheet`

### Mission Control primitives
`StatusIndicator` (nominal/in-progress/planned/offline light), `TelemetryGauge`
(radial stat), `MissionPanel` (glass card, slide/fade entrance), `Counter`
(animate-on-view number), `ProgressBar`, `RadarSweep` (used only as a
loading/fetching-live-data affordance), `BlueprintDraw` (SVG stroke-draw-on-scroll
for schematics), `Sparkline`, `SystemStatusBar`

### Content
`ProjectCard`, `ProjectDetailLayout`, `NotebookEntryCard`, `ResearchCard`,
`TimelineItem`, `TimelineTrack`, `BookCard`, `AwardBadge`, `TrophyShelf`,
`TeamStatCard`, `SkillMeter`, `TableOfContents`

### MDX component overrides (available inside content body)
`<IterationLog attempt="" outcome="">`, `<Figure src="" caption="">`,
`<VideoEmbed src="">`, `<Callout type="note|failure|success">`,
`<StatRow>`, `<BeforeAfter before="" after="">`, `<CodeBlock>` (with copy button)

### Data visualization
`GitHubActivityGraph`, `StatGauge`, `SeasonRecordTable`

### Utility
`ThemeToggle`, `ScrollProgress`, `useScrollSpy`, `useReducedMotion`,
`useCommandPaletteData` (builds the searchable index from generated content)

---

## 9. Design System

### 9.1 Typography

**[Decision]** **Geist Sans** for UI/headings, **Geist Mono** for
labels/telemetry/numbers/code — both self-hosted via the `geist` npm package
(no external font requests, keeps PWA fully offline-capable and Lighthouse
perfect).

| Token | Size (fluid, `clamp()`) | Weight | Use |
|---|---|---|---|
| `display` | 3.5rem → 5.5rem | 600 | Hero name/headline only |
| `h1` | 2.5rem → 3.25rem | 600 | Page titles |
| `h2` | 1.75rem → 2.25rem | 600 | Section titles |
| `h3` | 1.25rem → 1.5rem | 500 | Card/subsection titles |
| `body` | 1rem → 1.125rem | 400 | Paragraph text |
| `small` | 0.875rem | 400 | Meta text |
| `mono-label` | 0.75rem | 500, uppercase, tracked +0.05em | Telemetry labels, status text, tags |

### 9.2 Color

Dark-first, single controlled accent, status colors reserved strictly for
semantic state (never decorative). All pairs below must pass WCAG AA
(≥4.5:1 body text / ≥3:1 large text & UI); verify exact hex values with an
automated contrast check in CI (see §9.5), the values below are the starting
point, not final-verified.

| Token | Value | Use |
|---|---|---|
| `bg-void` | `#05070A` | Page background (deepest layer) |
| `bg-panel` | `#0B0F14` | Card/panel surface |
| `bg-panel-raised` | `#11161D` | Hover/elevated surface |
| `border-hairline` | `rgba(255,255,255,0.08)` | Panel borders, blueprint grid lines |
| `text-primary` | `#E7ECF2` | Headings, primary copy |
| `text-secondary` | `#93A1B0` | Body copy, descriptions |
| `text-tertiary` | `#5C6B7A` | Meta/timestamps |
| `accent-signal` | `#4FD1FF` | The one accent: links, active states, focus rings, key numbers |
| `status-nominal` | `#34D399` | "Active/complete/on-track" |
| `status-caution` | `#FBBF24` | "In progress/testing" |
| `status-critical` | `#F87171` | "Blocked/failed attempt" (used inside Iteration logs, never as a scare tactic) |
| `blueprint-grid` | `rgba(79,209,255,0.06)` | Background grid texture |

**[Decision]** Dark theme is canonical and default; a light theme is a supported
secondary (not dropped) using inverted, contrast-checked equivalents of the same
tokens, toggled via `ThemeToggle` and persisted in `localStorage`. The site must
never look "unfinished" in light mode — it is a first-class theme, not an
afterthought toggle.

### 9.3 Icons

**[Decision]** **Lucide** (`lucide-react`) — matches shadcn/ui defaults, clean
line-icon style fits the blueprint aesthetic, tree-shakeable, no icon font.

### 9.4 Layout & spacing

8px base spacing scale. Max content width 1280px, with a narrower 720px
measure for long-form MDX body text (Notebook/Research/Project prose) for
readability. Generous section padding (96–160px vertical on desktop) — the
brief explicitly calls for whitespace over density.

### 9.5 Accessibility & QA gates

- All interactive elements keyboard-reachable and visibly focus-ringed
  (`accent-signal` focus ring, never `outline: none` without replacement).
- `prefers-reduced-motion` respected globally — non-essential motion disabled,
  state-communicating transitions become instant rather than removed.
- Semantic landmarks (`nav`, `main`, `header`, `footer`), skip-to-content link.
- Automated contrast + a11y checks run in CI (axe-core against built pages) —
  build fails below AA.
- Forms (Contact) fully labeled, error states announced via `aria-live`.

---

## 10–13. Motion Principles & Animation Plan

### 10.1 Governing rule

**Every animation must communicate state, hierarchy, or causality.** If it can be
deleted without losing information, delete it. No motion exists purely for flair.

### 10.2 Timing & easing

| Category | Duration | Easing | Example |
|---|---|---|---|
| Micro-interaction | 120–180ms | `ease-out` | Button hover/press |
| Panel transition | 300–450ms | `cubic-bezier(0.16, 1, 0.3, 1)` ("mission-ease") | Card entrance, dialog open |
| Page transition | 400–600ms | `cubic-bezier(0.16, 1, 0.3, 1)` in / `cubic-bezier(0.4, 0, 0.2, 1)` out | Route change: 8px vertical slide + cross-fade |
| Scroll-linked reveal | scroll-driven, no fixed duration | linear w/ scroll progress | Blueprint draw-in, timeline connector draw |

### 10.3 Named, purposeful animations

- **Mission panel entrance** — cards on Mission Control slide up 12px + fade in,
  staggered 40ms per item, on first paint and on scroll-into-view. Communicates
  "this is a live system coming online," and establishes reading order.
- **Counter count-up** — numeric stats (commits, seasons competed, awards) animate
  from 0 on first viewport entry. Communicates "this number is real/measured,"
  not decorative — runs once per session, not on every scroll.
  **[Decision]** capped at ~800ms so it never reads as a stalling gimmick.
- **Radar sweep** — used exclusively as the loading affordance while a telemetry
  module (GitHub/FTC/YouTube data) is fetching or hydrating; communicates
  "actively scanning for live data." Never used as ambient background decoration.
- **Blueprint line-draw** — SVG `stroke-dashoffset` animation for schematic/diagram
  imagery on Project Detail hero sections, triggered on scroll-into-view.
  Communicates "this was engineered, not just photographed."
- **Scroll-linked iteration timeline** — on Project Detail, the Iterations &
  Failures section's connecting line fills in proportionally to scroll position,
  reinforcing the idea of a process unfolding over time.
- **Status light pulse** — a subtle (not blinking-alarm) breathing opacity pulse
  on `StatusIndicator` when state = "in-progress," stops entirely for
  "complete"/"planned." Communicates current activity at a glance.
- **Page/route transitions** — cross-fade + 8px slide via Framer Motion
  `AnimatePresence` at the root layout, so navigation always feels like moving
  through one continuous system rather than reloading pages.
- **Hover interactions** — Project cards swap cover photo for a subtle
  line-drawing/schematic treatment of the same image on hover (desktop only;
  on touch, this is skipped in favor of a static state — no hover-locked content).

All of the above must degrade gracefully (instant, no motion) under
`prefers-reduced-motion: reduce`.

---

## 14. Folder Structure

```
/
├── app/
│   ├── layout.tsx                 # Root layout: fonts, ThemeProvider, CommandPalette, AnimatePresence
│   ├── page.tsx                   # Mission Control (home)
│   ├── globals.css
│   ├── not-found.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx        # generateStaticParams from Velite project collection
│   ├── notebook/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── research/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── robotics/page.tsx          # data-driven, no MDX
│   ├── programming/page.tsx
│   ├── timeline/page.tsx
│   ├── books/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── dashboard/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── ui/                        # shadcn/ui primitives (generated, lightly customized)
│   ├── layout/                    # Navbar, Footer, CommandPalette, PageShell, MobileNavSheet
│   ├── mission-control/           # StatusIndicator, TelemetryGauge, MissionPanel, RadarSweep,
│   │                               # BlueprintDraw, Counter, Sparkline, SystemStatusBar
│   ├── content/                   # ProjectCard, NotebookEntryCard, TimelineItem, BookCard,
│   │                               # AwardBadge, TrophyShelf, TeamStatCard, SkillMeter
│   └── mdx/                       # MDX component overrides + MDXContent renderer
├── content/
│   ├── projects/
│   │   └── <slug>/
│   │       ├── index.mdx          # frontmatter + body — the ONE file an author edits
│   │       └── images/
│   ├── notebook/<slug>.mdx
│   ├── research/<slug>.mdx
│   ├── books/<slug>.mdx
│   └── data/                      # generated snapshots, committed by CI (see §19)
│       ├── github.json
│       ├── youtube.json
│       ├── ftc.json
│       └── mission.json           # hand-edited: current goals/objectives (small, owner-maintained)
├── lib/
│   ├── content.ts                 # typed accessors over Velite-generated content
│   ├── github.ts
│   ├── youtube.ts
│   ├── ftc.ts
│   ├── seo.ts
│   └── utils.ts
├── scripts/
│   ├── fetch-github-activity.ts
│   ├── fetch-youtube-feed.ts
│   ├── fetch-ftc-scout.ts
│   └── optimize-images.ts
├── public/
│   ├── favicon.ico, icons/, manifest.json, sw.js (generated)
│   └── resume.pdf
├── .github/workflows/
│   ├── ci.yml                     # typecheck, lint, a11y/Lighthouse budget
│   ├── deploy.yml                 # build + deploy to GitHub Pages
│   └── update-telemetry.yml       # scheduled data refresh
├── velite.config.ts               # zod schemas for all MDX collections
├── next.config.ts                 # output: 'export'
├── tailwind.config.ts
├── tsconfig.json                  # strict: true
├── AGENT.md
├── README.md
└── docs/PRD.md                    # this document
```

---

## 15. Data Model

All collections are validated at build time via **Velite** (`[Decision]` — actively
maintained Contentlayer-alternative, static-export friendly, zod-based schemas,
fully typed output consumed by `lib/content.ts`). A malformed frontmatter field
fails the build immediately rather than shipping a broken page.

### Project
```ts
{
  slug: string
  title: string
  oneLiner: string
  status: "planned" | "active" | "testing" | "complete" | "archived"
  tags: string[]                // e.g. ["robotics","software","leadership"]
  startDate: string             // ISO date
  endDate?: string
  coverImage: string
  gallery?: string[]
  video?: string
  cadLink?: string
  githubLink?: string
  competitionRef?: { season: number; eventCode: string }  // links to ftc.json
  lessonsLearned: string[]
  futureImprovements: string[]
  draft?: boolean
  body: MDX                     // Problem, Constraints, Design Process, Iterations,
                                 // Testing, Optimization, Final Result sections authored
                                 // as MDX headings + <IterationLog>/<Figure>/<StatRow> components
}
```

### NotebookEntry
```ts
{ slug, date, title, excerpt, tags: string[], relatedProject?: string, draft?, body: MDX }
```

### ResearchEntry
```ts
{ slug, title, date, abstract, tags: string[], references?: {label, url}[], draft?, body: MDX }
```

### Book
```ts
{
  slug, title, author,
  status: "reading" | "finished" | "paused",
  progressPercent?: number,
  rating?: number,               // 1-5
  startedDate: string,
  finishedDate?: string,
  keyTakeaways?: string[],
  body?: MDX
}
```

### TimelineMilestone (in `content/data/timeline.json` — small enough to hand-edit,
not worth a full MDX collection)
```ts
{ date, title, category: "robotics"|"programming"|"leadership"|"personal"|"academic",
  description, relatedProjectSlug?: string, icon?: string }
```

### GitHubSnapshot (`content/data/github.json`, generated)
```ts
{ generatedAt, user, contributionWeeks: {date, count}[][], topRepos: {name,url,stars,language}[],
  recentCommits: {repo, message, date, url}[] }
```

### YouTubeSnapshot (`content/data/youtube.json`, generated)
```ts
{ generatedAt, channelId: "UCuXq-jiU0ANeBcF_Tvq1D7g", channelTitle,
  latestVideos: {id, title, publishedAt, thumbnail, url}[] }
```

### FTCSnapshot (`content/data/ftc.json`, generated)
```ts
{
  generatedAt,
  teamNumber: 24813,
  teamName: "SHCA Happy Hawks",
  school: "Scenic Hills Christian Academy",
  location: { city: "San Antonio", state: "TX", country: "USA" },
  rookieYear: 2023,
  sponsors: string[],
  seasons: {
    season: number,
    events: { eventCode, name, start, end, type }[],
    awards: { type, placement, event }[]
  }[]
}
```

### MissionData (`content/data/mission.json`, hand-edited by owner)
```ts
{
  currentMission: string,
  objectives: { label, detail, progressPercent?, icon? }[],
  goals: { label, target, progressPercent, category }[]   // includes reading goals,
                                                            // the "dunk before 2026" goal, etc.
}
```

---

## 16. MDX Content Workflow

**Goal from the brief: publishing = one new folder + one Markdown file.**

1. Author runs (or copies) `content/projects/<new-slug>/index.mdx`.
2. Fills in frontmatter per the Project schema (§16 data model) — Velite's zod
   schema gives immediate, specific build-time errors for missing/malformed
   fields (e.g. "status must be one of planned|active|testing|complete|archived").
3. Writes body as MDX using plain headings (`## Problem`, `## Constraints`, …)
   plus the custom components where useful (`<IterationLog>`, `<Figure>`,
   `<Callout>`, `<StatRow>`, `<BeforeAfter>`).
4. Drops any images into the same folder's `images/` subfolder and references
   them with relative paths inside `<Figure src="./images/...">`.
5. `draft: true` in frontmatter keeps it visible in `next dev` but excluded from
   the production build and all listings/search/sitemap — safe to work on a post
   without publishing it prematurely.
6. Commit + push to `main` → `deploy.yml` builds and ships automatically. No PR
   review gate is required for content-only changes **[Decision]**, since Velite's
   schema validation is the safety net; code changes still go through normal
   review.

Notebook, Research, and Books entries follow the identical single-file pattern
(a flat `<slug>.mdx` file, since they don't need a media folder as often — if one
does need images, it can become a folder with an `index.mdx` the same way).

Images: since `output: 'export'` disables Next's Image Optimization API,
`scripts/optimize-images.ts` runs at build time (via `sharp`) to pre-generate
responsive WebP/AVIF variants for every image under `content/**/images/`; the
`<Figure>` MDX component renders the resulting `<picture>` set with `next/image`
in `unoptimized` mode pointed at the pre-generated files.

---

## 17. Deployment Workflow & GitHub Actions Automation

### 17.1 Hosting

GitHub Pages, served from `joselaurencio.github.io` (user/org page → deploys at
the domain root, so **no `basePath`/`assetPrefix` configuration is needed**,
unlike a project page). `next.config.ts` sets `output: 'export'`.

### 17.2 `.github/workflows/ci.yml` — on every PR and push to `main`
- Install deps (cached)
- `tsc --noEmit`
- `eslint .`
- Velite content build (validates all MDX frontmatter)
- `next build` (static export to `out/`)
- axe-core accessibility check + Lighthouse CI budget check (fail under 95 on
  any of Performance/Accessibility/Best Practices/SEO)
- Broken internal-link check across generated content

### 17.3 `.github/workflows/deploy.yml` — on push to `main` (after CI passes)
- `next build` → static `out/`
- `actions/upload-pages-artifact` → `actions/deploy-pages`
- No manual deploy step ever required

### 17.4 `.github/workflows/update-telemetry.yml` — scheduled + manual
- Trigger: `schedule` (daily, e.g. `0 12 * * *`) + `workflow_dispatch`
- Runs `scripts/fetch-github-activity.ts`, `scripts/fetch-youtube-feed.ts`,
  `scripts/fetch-ftc-scout.ts` — all hit public, no-auth-required endpoints
  (GitHub REST for public events, the YouTube channel RSS feed, the FTCScout
  public GraphQL API used to source §0 of this document)
- Diffs the result against the committed `content/data/*.json`; if changed,
  commits via a bot commit and pushes to `main`
- That push automatically triggers `deploy.yml` — telemetry stays fresh with
  zero manual maintenance

### 17.5 Secrets

None strictly required for the endpoints above (all are public/unauthenticated).
If GitHub API rate limits become an issue at the unauthenticated tier, add a
fine-grained, read-only `GITHUB_TOKEN` (the default Actions token is sufficient
for public data) rather than a personal token.

---

## 18. Future Expansion Ideas

1. 3D robot viewer — `react-three-fiber` render of the current FTC robot (GLTF
   export from CAD) on the Robotics hub.
2. Live embedded FTC Scout widget/iframe for real-time event day scores.
3. Auto-generated PDF resume derived from the same data model (single source of
   truth between the site and a downloadable resume).
4. Static-friendly guestbook / mission log comments via `giscus`
   (GitHub Discussions-backed — no backend needed).
5. CAD viewer embed (STEP/GLTF via three.js) directly inside Project Detail pages.
6. Privacy-friendly analytics (Plausible or GoatCounter) to inform which projects
   actually get read.
7. "Mission Briefing" short audio/video intro on the homepage.
8. Lightweight achievement/badge system gamifying sustained Notebook publishing.
9. WebGL blueprint-grid background shader (purely decorative — only pursue once
   the purposeful-motion budget above is fully implemented and validated).
10. Sponsor/partner logo strip on the RoboCodex Robotics Camp project page.
11. i18n scaffolding if the audience ever extends beyond English readers.
12. Print stylesheet for a clean, resume-style printed version of Mission Control.

---

## 19. Open Decisions Explicitly Resolved (for traceability)

| Decision | Resolution |
|---|---|
| Content layer | Velite (not Contentlayer — unmaintained; not raw `gray-matter` — no schema safety) |
| Fonts | Geist Sans + Geist Mono, self-hosted |
| Icons | Lucide |
| Search | `cmdk`-based Command Palette (nav) + Pagefind (optional full-text search on index pages, post-build static index) |
| PWA | `next-pwa`-generated service worker + manifest, works with static export |
| Contact form | Static-hosting-compatible form endpoint (e.g. Formspree/Getform) since GitHub Pages has no server runtime; falls back to a `mailto:` link if the service is ever removed |
| Theme | Dark canonical/default; light theme fully supported, not an afterthought |
| Primary nav count | 7 items max; Programming/Books/Dashboard reachable via Command Palette + footer |
| Telemetry data | Fetched by scheduled GitHub Action into committed JSON, never fetched client-side (avoids API rate limits hitting every visitor, keeps site fully static) |

This PRD is implementation-ready. Next step on request: scaffold the Next.js
project structure exactly as specified in §14, with placeholder content seeded
from §0's real FTC/YouTube data.
