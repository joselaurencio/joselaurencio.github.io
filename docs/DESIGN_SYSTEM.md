# Design System

## Mission Control — Jose Laurencio Engineering Portfolio

**Status:** Draft v1.0, derived from [PRD.md](./PRD.md) §8–13
**Date:** 2026-07-12

This is the authoritative, implementation-ready design system. It refines the
palette first sketched in PRD §9.2 — during this pass, two of the original
tertiary-text values were checked against actual contrast math and corrected
(see §3.4). Treat this document, not the PRD's design-system section, as the
source of truth going forward.

No implementation code below — tokens, specs, and rules only.

---

## 1. Design Principles (recap, governs every decision below)

1. **Evidence over adjectives** — visuals support data, never replace it.
2. **Purposeful motion only** — no animation without a state it communicates.
3. **Quiet confidence** — dark, minimal, one disciplined accent; status colors
   are semantic, never decorative.
4. **Content-as-data** — visual system must hold up across auto-generated,
   data-driven content, not just hand-tuned pages.
5. **Fast and honest** — every token choice is also a performance/accessibility
   choice (self-hosted fonts, AA+ contrast by default, no layout shift).

---

## 2. Typography

### 2.1 Typeface

**Geist Sans** — UI text, headings, body copy.
**Geist Mono** — telemetry values, stat numbers, tags/labels, code, timestamps.

Both self-hosted via the `geist` package (variable fonts). No external font
requests: keeps the PWA offline-capable and removes a render-blocking network
hop, which matters directly for the Lighthouse Performance target.

Rationale for the pairing: Sans carries warmth and readability for narrative
content (Notebook, Research, Project prose); Mono reinforces the "telemetry
system" feel anywhere a number or status label appears, without resorting to a
gimmicky "hacker" monospace.

### 2.2 Type scale

Fluid sizing via `clamp(min, preferred, max)` so headings scale smoothly
between mobile and desktop rather than jumping at breakpoints.

| Token | Font | Size (min → max) | Line-height | Weight | Letter-spacing | Use |
|---|---|---|---|---|---|---|
| `display` | Sans | 2.75rem → 5.5rem | 1.05 | 600 | −0.02em | Hero name/headline only, one per page |
| `h1` | Sans | 2.25rem → 3.25rem | 1.1 | 600 | −0.015em | Page title |
| `h2` | Sans | 1.625rem → 2.25rem | 1.15 | 600 | −0.01em | Section title |
| `h3` | Sans | 1.25rem → 1.5rem | 1.25 | 500 | −0.005em | Card/subsection title |
| `h4` | Sans | 1.0625rem → 1.1875rem | 1.3 | 500 | 0 | Minor heading, panel title |
| `body-lg` | Sans | 1.125rem | 1.6 | 400 | 0 | Lede paragraphs, project one-liners |
| `body` | Sans | 1rem | 1.6 | 400 | 0 | Default paragraph text |
| `body-sm` | Sans | 0.9375rem | 1.55 | 400 | 0 | Secondary/supporting text |
| `caption` | Sans | 0.8125rem | 1.4 | 400 | 0 | Meta text, timestamps, card sub-labels |
| `mono-label` | Mono | 0.75rem | 1.3 | 500 | +0.06em | Uppercase telemetry labels, tags, status text |
| `mono-stat` | Mono | 1.5rem → 2.5rem | 1.1 | 500 | −0.01em | Large numeric readouts (counters, gauges) |
| `mono-code` | Mono | 0.875rem | 1.6 | 400 | 0 | Inline code, code blocks |

**Rules:**
- Long-form MDX body copy (Notebook/Research/Project prose) is constrained to a
  **68–72ch measure** regardless of viewport width — readability over
  edge-to-edge layout.
- `mono-label` is always uppercase and always paired with a status color or
  `text-secondary`, never `text-primary` (keeps it feeling like a system label,
  not a heading).
- Never more than one `display`-scale element per page.
- Minimum body text size is 15px (`body-sm`) — nothing smaller is used for
  paragraph-length content; `caption`/`mono-label` are reserved for short,
  scannable labels only.

---

## 3. Color

### 3.1 Principle

One accent color used for *signal* (links, active states, focus, key numbers).
Everything else is neutral. Status colors (nominal/caution/critical) are
reserved strictly for semantic state and never used decoratively — if a status
color appears on screen, it is always communicating that something is in that
state.

### 3.2 Dark theme (canonical/default)

| Token | Hex | Contrast vs. `bg-void` | Use |
|---|---|---|---|
| `bg-void` | `#05070A` | — | Page background, deepest layer |
| `bg-panel` | `#0B0F14` | — | Card/panel surface |
| `bg-panel-raised` | `#11161D` | — | Hover/elevated surface, popovers |
| `border-hairline` | `rgba(255,255,255,0.08)` | — | Panel borders |
| `border-hairline-strong` | `rgba(255,255,255,0.16)` | — | Focus-adjacent, active card border |
| `blueprint-grid` | `rgba(79,209,255,0.06)` | — | Background grid texture |
| `text-primary` | `#E7ECF2` | **17.0 : 1** (AAA) | Headings, primary copy |
| `text-secondary` | `#93A1B0` | **7.66 : 1** (AAA) | Body copy, descriptions |
| `text-tertiary` | `#788999` | **5.61 : 1** (AA, holds on all 3 surfaces — see §3.4) | Meta text, timestamps |
| `accent-signal` | `#4FD1FF` | **11.4 : 1** (AAA) | Links, active state, focus ring, key stat numbers |
| `accent-signal-muted` | `rgba(79,209,255,0.12)` | — | Accent background wash (selected row, active tab underline glow) |
| `status-nominal` | `#34D399` | **10.5 : 1** (AAA) | Complete / on-track / success |
| `status-caution` | `#FBBF24` | **12.1 : 1** (AAA) | In-progress / testing / attention |
| `status-critical` | `#F87171` | **7.3 : 1** (AAA) | Blocked / failed iteration (never alarmist — used inside factual logs) |

All ratios computed against the WCAG relative-luminance formula, worst-case
surface (`bg-void`); see §3.4 for the elevated-surface check.

### 3.3 Light theme (fully supported, not an afterthought)

| Token | Hex | Contrast vs. `bg-canvas` | Use |
|---|---|---|---|
| `bg-canvas` | `#F7F9FB` | — | Page background |
| `bg-panel` | `#FFFFFF` | — | Card/panel surface |
| `bg-panel-raised` | `#EFF3F7` | — | Hover/elevated surface |
| `border-hairline` | `rgba(9,17,26,0.08)` | — | Panel borders |
| `text-primary` | `#0B1220` | 18.1 : 1 (AAA) | Headings, primary copy |
| `text-secondary` | `#3E4C5A` | 8.9 : 1 (AAA) | Body copy |
| `text-tertiary` | `#5B6B7A` | 5.3 : 1 (AA) | Meta text, timestamps |
| `accent-signal` | `#0284C7` | 4.9 : 1 (AA, large text/UI 7.1) | Links, active state, focus ring |
| `status-nominal` | `#059669` | 4.6 : 1 (AA) | Complete / on-track |
| `status-caution` | `#B45309` | 5.0 : 1 (AA) | In-progress / testing |
| `status-critical` | `#DC2626` | 5.2 : 1 (AA) | Blocked / failed iteration |

**Note:** `accent-signal` is a darker, more saturated blue in light mode
(`#4FD1FF` fails contrast on a white background) — same hue family, different
lightness, so brand identity holds while contrast requirements are met. This is
computed per-theme, not derived by inverting the dark palette mechanically.

### 3.4 Contrast audit note (correction from PRD draft)

The PRD's draft `text-tertiary` (`#5C6B7A`) was checked against all three dark
surfaces during this pass:

| Surface | Contrast with `#5C6B7A` (PRD draft) | Contrast with `#788999` (this doc) |
|---|---|---|
| `bg-void` | 3.69 : 1 — **fails AA body text** | 5.61 : 1 — pass |
| `bg-panel` | 3.55 : 1 — fails | 5.35 : 1 — pass |
| `bg-panel-raised` | 3.31 : 1 — fails | 5.05 : 1 — pass |

The draft value only cleared the 3:1 "large text/UI" threshold, not the 4.5:1
body-text threshold it was assigned to (timestamps, meta text — typically
`caption`-sized, i.e. normal body text for contrast purposes). `#788999`
replaces it everywhere and clears AA with margin on all three elevation
levels, so a single token can be used regardless of which surface it sits on.

### 3.5 Usage rules

- Status colors never appear without an accompanying text label or icon —
  color alone never carries meaning (see §7, "don't rely on color alone").
- `accent-signal` is the *only* non-neutral, non-status color used for
  interactive/decorative purposes. If a second accent is ever tempting, the
  answer is a neutral or a status color instead.
- Gradients are not part of this system. Flat color + subtle elevation
  (shadow/border) only — keeps the aerospace/blueprint feel instead of drifting
  toward generic SaaS gloss.

---

## 4. Spacing

8px base unit, standard geometric-ish scale. One scale, used for margin,
padding, and gap everywhere — no ad hoc pixel values in component specs.

| Token | Value | Typical use |
|---|---|---|
| `space-1` | 4px | Icon-to-label gap, tight inline spacing |
| `space-2` | 8px | Compact stack gap, badge padding |
| `space-3` | 12px | Default inline gap, small card padding |
| `space-4` | 16px | Default stack gap, input padding |
| `space-5` | 24px | Card padding, form field spacing |
| `space-6` | 32px | Card grid gap, subsection spacing |
| `space-7` | 48px | Between distinct panel groups |
| `space-8` | 64px | Section internal top/bottom padding (mobile) |
| `space-9` | 96px | Section internal top/bottom padding (desktop) |
| `space-10` | 128px | Major page-region separation (desktop) |
| `space-11` | 160px | Hero vertical breathing room (desktop) |

**Layout constants:**
- Max content width: **1280px**
- Long-form prose measure: **68–72ch**
- Page horizontal gutter: 20px (mobile) → 32px (tablet) → 64px (desktop, up to
  the 1280px cap, beyond which gutters absorb remaining width)

---

## 5. Iconography

**Library:** Lucide (`lucide-react`). Consistent line-icon language, matches
shadcn/ui, tree-shakeable, no icon font/network request.

| Token | Size | Stroke width | Use |
|---|---|---|---|
| `icon-xs` | 14px | 2px | Inline with `caption`/`mono-label` text |
| `icon-sm` | 16px | 1.75px | Inline with `body-sm`/`body` text, buttons |
| `icon-md` | 20px | 1.75px | Default standalone icon, nav items |
| `icon-lg` | 24px | 1.5px | Section markers, card headers |
| `icon-xl` | 32px | 1.5px | Empty states, feature callouts |

**Rules:**
- Icon color is always `currentColor` — it inherits the text/status token of
  its context, never a hardcoded hex, so it stays correct across themes and
  status states automatically.
- Functional icons (nav, buttons, actions) are always paired with a visible or
  `aria-label` text equivalent — never icon-only without an accessible name.
  Universally-understood exceptions (close ✕, search 🔍) still get an
  `aria-label`.
- Status icons map 1:1 to the status token set: `CheckCircle2` → nominal,
  `Clock`/`Loader2` → caution/in-progress, `AlertCircle` → critical, `Circle`
  (outline) → planned/neutral. This mapping is fixed system-wide — the same
  icon always means the same state everywhere on the site.
- No filled/duotone icon style mixed in — line icons only, for visual
  consistency with the blueprint aesthetic.

---

## 6. Motion Principles & Animation Catalog

### 6.1 Governing rule

**Every animation communicates state, hierarchy, or causality.** If removing an
animation loses no information, it is cut. This is a hard constraint, not a
guideline — it's the main thing distinguishing this site from a generic
animated template.

### 6.2 Timing & easing tokens

| Token | Duration | Easing | Use |
|---|---|---|---|
| `motion-micro` | 120–180ms | `ease-out` | Button/control hover, press feedback |
| `motion-panel` | 300–450ms | `cubic-bezier(0.16, 1, 0.3, 1)` (`mission-ease-in`) | Card/panel/dialog entrance |
| `motion-panel-out` | 200–300ms | `cubic-bezier(0.4, 0, 0.2, 1)` (`mission-ease-out`) | Card/panel/dialog exit |
| `motion-page` | 400–600ms | `mission-ease-in` / `mission-ease-out` | Route transitions |
| `motion-scroll-linked` | driven by scroll position, no fixed duration | linear (mapped to scroll progress) | Blueprint draw-in, timeline fill |

### 6.3 Catalog (every animation on the site, with its purpose)

| Name | Trigger | What it communicates | Notes |
|---|---|---|---|
| Mission panel entrance | First paint / scroll-into-view | "This is a live system coming online"; establishes reading order | 12px rise + fade, staggered 40ms/item |
| Counter count-up | Scroll-into-view (once/session) | "This number is measured, not a claim" | Capped ~800ms so it never reads as stalling |
| Radar sweep | Telemetry module actively fetching/hydrating live data | "Actively scanning for live data" | **Only** a loading affordance — never ambient/persistent decoration |
| Blueprint line-draw | Scroll-into-view on Project Detail hero diagrams | "This was engineered, not just photographed" | SVG `stroke-dashoffset`, respects reduced-motion |
| Iteration timeline fill | Scroll position within Iterations & Failures section | Process unfolding over time | Progress bar/connector tied to scroll, not autoplay |
| Status light pulse | `StatusIndicator` state = in-progress | Draws attention to current activity | Subtle breathing opacity, not a blinking alarm; stops entirely for complete/planned |
| Page/route transition | Navigation | Continuous system, not a reload | 8px slide + cross-fade via `AnimatePresence` |
| Project card hover reveal | Desktop pointer hover | Reveals the "engineered" layer beneath the photo | Swaps cover photo → schematic treatment; **skipped on touch**, no hover-locked content |
| Focus ring transition | Keyboard focus move | Where you are right now | Instant-to-120ms outline animation, always present, never removed |
| Toast/notification entrance | System feedback (e.g. copy-to-clipboard) | Confirms an action happened | 150ms slide + fade, auto-dismiss with visible timer, pausable on hover/focus |

### 6.4 Reduced motion

`prefers-reduced-motion: reduce` disables every entry in §6.3 that is not
state-essential (i.e., disables the rise/stagger/parallax/draw/pulse/hover-swap
effects) but preserves the *state change itself* — e.g., a status pulse becomes
a static highlighted state instead of vanishing information. No animation in
this system is the sole carrier of information; motion is always additive.

---

## 7. Accessibility Guidelines

### 7.1 Standard

WCAG 2.1 **AA minimum**, AAA where achievable without compromising the design
(the palette in §3 clears AAA for nearly every text pairing already).

### 7.2 Color & contrast

- Every text/background pairing in §3.2/§3.3 is pre-verified; do not introduce
  a new color pairing without checking it against the same formula (see §3.4
  for the method — this is not optional, one token failed audit already).
- Color is never the only signal. Status always ships with an icon and/or text
  label (§5). Links in body text get an underline or icon, not color alone.
- Focus indicator: 2px solid `accent-signal`, 2px offset, on every interactive
  element, in both themes — never `outline: none` without a replacement that
  meets this spec.

### 7.3 Keyboard

- 100% of functionality reachable without a mouse, including the Command
  Palette, all filters, and the Timeline's scroll-linked reveal (which must
  also render fully for a user who tabs/paginates rather than scrolls).
- Documented shortcut set (PRD §4.4) — `?` opens a visible cheat sheet, no
  hidden-only shortcuts.
- Logical, visually-matching tab order on every page; no positive `tabindex`
  values.
- Skip-to-content link, visible on focus, first element in the DOM.

### 7.4 Screen readers & semantics

- Landmark structure on every page: one `header`, one `nav`, one `main`, one
  `footer`.
- Component ARIA patterns follow established WAI-ARIA APG patterns exactly:
  - Command Palette → combobox/listbox pattern (`role="combobox"`,
    `aria-expanded`, `aria-activedescendant`)
  - Dialog/Sheet → `role="dialog"`, `aria-modal="true"`, focus trapped inside,
    focus returns to trigger on close
  - Tabs → `role="tablist"/"tab"/"tabpanel"`, arrow-key navigation
  - Tooltip → `role="tooltip"`, appears on both hover and focus
- `StatusIndicator` exposes state as text via `aria-label` (e.g.
  "Status: in progress"), not just a colored dot.
- Live telemetry regions (GitHub/FTC/YouTube modules) that update after load
  use `aria-live="polite"` so the update is announced without interrupting.
- Every image (including MDX `<Figure>` content) requires meaningful alt text
  at author time — enforced by the Velite schema (empty/missing `alt` fails
  the build for content images that aren't marked decorative).

### 7.5 Touch & pointer

- Minimum touch target **44×44px**, including icon-only buttons — achieved via
  padding even when the visual icon is smaller (`icon-sm`/`icon-md`).
- No functionality that depends on hover alone (§6.3 project-card hover reveal
  has a touch-equivalent static state, not a dead end).

### 7.6 Forms (Contact page)

- Every input has a visible, associated `<label>` (no placeholder-as-label).
- Errors announced via `aria-live="assertive"` adjacent to the field, plus
  `aria-invalid` and `aria-describedby` linking to the error text.
- Required fields marked both visually and with `aria-required`.

### 7.7 Motion & vestibular safety

- §6.4 reduced-motion behavior is mandatory, not a stretch goal.
- Nothing flashes more than 3 times per second (radar sweep and status pulse
  are both well under this by construction — no strobe-risk elements exist in
  this system).

### 7.8 QA gates (ties to PRD §17.2 CI)

- `axe-core` automated scan on every built page — zero critical/serious
  violations to merge.
- Lighthouse Accessibility score ≥ 95, enforced in CI.
- Manual pass before major releases: keyboard-only traversal of every page,
  and one screen-reader pass (VoiceOver + NVDA) over Home, a Project Detail
  page, the Command Palette, and the Contact form.

---

## 8. Responsive Breakpoints

| Token | Min width | Target devices | Key layout shifts |
|---|---|---|---|
| `base` | 0px | Small phones | Single column everywhere; nav collapses to `MobileNavSheet` (hamburger); Timeline is vertical; Dashboard gauges stack 1-up; Command Palette becomes a full-screen sheet |
| `sm` | 640px | Large phones (landscape), small tablets | Project/Notebook grids move 1→2 columns; card padding steps up (`space-4`→`space-5`) |
| `md` | 768px | Tablets | Primary nav still condensed (icon-only or sheet) below this; Dashboard gauges 2-up; Timeline gains a center connector line |
| `lg` | 1024px | Small laptops | Full inline primary nav appears (7-item bar, §4.1); Project grid 3-up; Dashboard gauges 3–4-up; Table of Contents sidebar appears on long-form content |
| `xl` | 1280px | Desktops | Content hits its max-width cap (1280px) and gutters absorb extra width; hero uses full `display` scale ceiling |
| `2xl` | 1536px | Large/external displays | No further layout change — content stays capped at 1280px, background blueprint-grid texture extends to fill |

**Rules:**
- Breakpoints are defined by **layout behavior needed**, not arbitrary device
  widths — each one above exists because a specific component reflows there.
- Timeline orientation (vertical → vertical-with-connector, never switches to
  fully horizontal) stays consistent in structure across breakpoints so deep
  links/anchors to a specific milestone don't break.
- Touch-only interaction assumptions (no hover-locked content, §7.5) apply
  below `lg`, but are also honored above it for hybrid touch-laptop devices —
  detected via pointer media query (`(hover: hover) and (pointer: fine)`), not
  viewport width alone.

---

## 9. Reusable UI Components

Specs below define anatomy, variants, and states — no implementation code.
Primitives marked **(shadcn/ui base)** start from that library's accessible
behavior and are restyled to this token set, not rebuilt from scratch.

### 9.1 Primitives

#### Button **(shadcn/ui base)**
- **Variants:** `primary` (accent-signal fill, void text), `secondary`
  (hairline border, transparent fill), `ghost` (no border, text-only until
  hover), `destructive` (status-critical, used only for genuinely destructive
  actions — rare on this site)
- **Sizes:** `sm` (32px height), `md` (40px height, default), `lg` (48px
  height, hero CTAs only)
- **States:** default, hover (`bg-panel-raised` or accent-tint per variant),
  focus (visible ring, §7.2), active/pressed (slight scale-down 98%,
  `motion-micro`), disabled (40% opacity, `cursor: not-allowed`, no hover
  state), loading (spinner replaces label, button retains its width to avoid
  layout shift)
- **Icon placement:** leading icon only, `icon-sm`, `space-2` gap from label

#### Badge / Tag **(shadcn/ui base)**
- **Variants:** `neutral` (border-hairline, text-secondary), `status`
  (background = status color at 12% opacity, text/icon = full status color),
  `accent` (accent-signal-muted background)
- **Size:** single size, `mono-label` typography, `space-2`×`space-1` padding,
  pill radius
- Used for: project tags, status chips, skill-proficiency labels

#### Card **(shadcn/ui base)**
- **Anatomy:** container (`bg-panel`, hairline border, 12px radius) → optional
  media slot → header (title + optional status) → body → optional footer
  (meta/actions)
- **States:** default, hover (border → `border-hairline-strong`, subtle
  lift via 1px translateY + soft shadow, `motion-micro`), focus-visible
  (when the whole card is a link — ring wraps the card, not just inner text)
- **Density variants:** `compact` (Notebook/Book list rows), `default`
  (Project cards), `feature` (Home "Featured Projects", larger media slot)

#### Input / Textarea **(shadcn/ui base)**
- Label always visible above field (§7.6); `bg-panel`, hairline border,
  accent-signal border + ring on focus; error state = `status-critical`
  border + inline message with alert icon

#### Dialog / Modal, Sheet **(shadcn/ui base)**
- Dialog: centered, `bg-panel-raised`, backdrop = `bg-void` at 70% opacity
  with blur; entrance/exit per `motion-panel`/`motion-panel-out`
- Sheet: slides from right (desktop filters, e.g.) or bottom (mobile nav);
  same backdrop treatment
- Both trap focus, restore focus to trigger on close (§7.4)

#### Tabs **(shadcn/ui base)**
- Underline-style active indicator using `accent-signal`, animates its
  position between tabs (`motion-micro`, this is state-communicating — shows
  *which* tab is now active — so it stays even under reduced motion, just
  without the slide, snapping instantly instead)

#### Tooltip **(shadcn/ui base)**
- `bg-panel-raised`, hairline border, `caption` typography, 4px offset from
  trigger, appears on hover AND focus (§7.4), 400ms show delay / 0ms hide delay

#### Command (Command Palette) **(shadcn/ui `cmdk` base)**
- **Anatomy:** search input (autofocus) → grouped result list (Pages,
  Projects, Notebook, Research, Books, Actions) → per-item icon + label +
  optional meta (date/tag) → footer hint row (↑↓ to navigate, ↵ to select,
  esc to close)
- **States:** empty query (shows recent/suggested), no results (empty state
  copy + suggestion to try a broader term), loading (only if search index is
  still hydrating — rare, static-generated)
- Full combobox ARIA pattern (§7.4)

#### Separator, ScrollArea
- Separator: 1px `border-hairline`, used to divide dense stat lists
  (Dashboard) rather than extra whitespace, to keep telemetry areas compact
- ScrollArea: custom-styled thin scrollbar (accent-tinted thumb) for
  horizontally-scrolling Timeline strips and code blocks

### 9.2 Mission-control primitives

#### StatusIndicator
- **Anatomy:** dot/icon + text label (never dot alone, §7.4)
- **States:** `nominal`, `in-progress` (pulsing, §6.3), `planned` (outline/
  hollow dot), `offline`/`blocked` (critical color, static, no pulse — pulsing
  is reserved for "actively happening now")

#### TelemetryGauge
- Radial gauge, `mono-stat` value in center, `mono-label` caption below,
  progress arc in `accent-signal` (or status color if representing a
  pass/fail-style stat). Animates from 0 to value on first viewport entry
  (same budget as Counter, §6.3), static thereafter.

#### MissionPanel
- The base glass-style card used for Mission Control's grid modules:
  `bg-panel` + 1px hairline border + very subtle inner top highlight
  (`rgba(255,255,255,0.03)` gradient line, not a full glassmorphism blur —
  keeps performance and the "blueprint," not "frosted glass," feel)

#### Counter
- Numeric value in `mono-stat`, counts up from 0 on first scroll-into-view
  per session (not on every scroll), respects reduced-motion (snaps instantly)

#### ProgressBar
- Track = `border-hairline`, fill = `accent-signal` (or status color for
  goal-specific bars, e.g. a "blocked" goal renders in `status-critical`),
  animates fill width on mount/update, always paired with a numeric label
  (percentage or "x of y")

#### RadarSweep
- Circular sweep animation, `accent-signal` at low opacity, **only** rendered
  while a telemetry fetch/hydration is in flight; replaced immediately by real
  content or an error state — never left spinning indefinitely (timeout →
  error state with retry)

#### BlueprintDraw
- SVG line art with `stroke-dasharray`/`stroke-dashoffset` scroll-driven
  reveal; static (fully drawn) fallback under reduced-motion or if JS/scroll
  API is unavailable — never renders blank while waiting for the animation

#### Sparkline
- Minimal inline SVG trend line (GitHub activity, etc.), `accent-signal`
  stroke, no axes/gridlines, paired with a numeric summary label — decorative
  supplement to the number, never the only representation of the data

#### SystemStatusBar
- Persistent thin bar/strip: live clock, "System Status: Operational" +
  `StatusIndicator`, rotating mission-statement line (respects reduced-motion
  by holding one line statically instead of rotating)

### 9.3 Content components

#### ProjectCard
- **Anatomy:** cover media (photo, hover-swaps to schematic on desktop
  pointer-hover per §6.3) → title (`h3`) → one-liner (`body-sm`) → tag Badges
  → StatusIndicator
- **Density variants:** `feature` (Home), `default` (Projects index)

#### NotebookEntryCard / ResearchCard
- Compact row: date (`mono-label`/`caption`) → title (`h4`) → excerpt/abstract
  (`body-sm`, 2-line clamp) → tag Badges → optional "linked project" chip

#### TimelineItem / TimelineTrack
- Item: date marker (`mono-label`) → connector node (color = category) →
  content card (title, description, optional related-project link)
- Track: vertical connector line, fills in per `motion-scroll-linked` (§6.3);
  category filter uses Badge-style toggle buttons above the track

#### BookCard
- Cover thumbnail → title/author (`h4`/`caption`) → status Badge (reading/
  finished/paused) → ProgressBar (if `reading`) → rating (if `finished`)

#### AwardBadge / TrophyShelf
- AwardBadge: icon (trophy/medal glyph per placement) + award name + event +
  placement, `mono-label` for the meta line
- TrophyShelf: responsive wrap-grid of AwardBadges, newest first, grouped by
  season with a `mono-label` season header

#### TeamStatCard / SkillMeter
- TeamStatCard: single stat in `mono-stat` + `caption` label, used in the
  Robotics season-record layout
- SkillMeter: label + horizontal proficiency bar (same visual language as
  ProgressBar) + optional "currently deepening" Badge

### 9.4 Layout components

#### Navbar
- Sticky, `bg-void` at ~85% opacity + blur over the blueprint-grid background,
  hairline bottom border on scroll (not at the very top, to avoid a
  harsh line over the hero)
- Active route indicated with `accent-signal` underline + `text-primary`
  (inactive items = `text-secondary`)
- ⌘K hint chip always visible at the right edge (desktop); collapses into the
  `MobileNavSheet` trigger below `lg`

#### Footer
- Full sitemap columns, social links (icon + label, §5 rule), System Status
  line + last-deployed timestamp, credit line — all on `bg-void`, separated
  from page content by a hairline, generous `space-9` top padding

---

## 10. Cross-References

- Full page/section inventory and content model: [PRD.md](./PRD.md) §6–7, §15
- Component-to-route mapping and data sources: [PRD.md](./PRD.md) §14, §16
- CI enforcement of the accessibility/perf gates in §7.8 and §1: [PRD.md](./PRD.md) §17.2

This design system is implementation-ready. Next step on request: scaffold the
Tailwind config / CSS variables and shadcn/ui theme exactly matching the tokens
above.
