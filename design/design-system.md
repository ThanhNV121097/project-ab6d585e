# Design System — Gốm Chu Đậu

> Source of truth: the approved design in `code/frontend/src` — direction
> "Fired in Thái Tân".
> Every value below is extracted from it. Changing a value here without
> changing the approved design is a defect.

Last updated: 2026-11-06

## 1. Foundations

### 1.1 Color

One mode only — a kiln-dark ground. There is no `[data-theme]` block, no
`prefers-color-scheme` branch and no switch in the header; `color-scheme: dark`
is set once in `theme.css`.

| Token | Value | Used for |
|---|---|---|
| `--ground` | `#16110E` | Page background |
| `--surface` | `#221A15` | Card / panel / table / dropdown background |
| `--ink` | `#F2EBE3` | Body text, headings |
| `--ink-soft` | `#A79687` | Secondary text, labels, captions |
| `--accent` | `#C9521F` | Rules, marks, edges — never read as words (fails AA for text) |
| `--accent-ink` | `#16110E` | Text on `--accent-strong` |
| `--accent-strong` | `#E8793F` | Primary action background, price, link hover, active states |
| `--line` | `rgba(242,235,227,0.14)` | Hairline divider, section rule — deliberately near-invisible |
| `--field-line` | `rgba(242,235,227,0.42)` | Input / select / button border — findable on a near-black page |
| `--product-ground` | `#EFE7DD` | The tile a cut-out product photo stands on (light in both modes) |
| `--product-ground-ink` | `#6B5B4D` | Caption ink on `--product-ground` |

#### Contrast audit

| Foreground | Background | Ratio | Passes |
|---|---|---|---|
| `--ink` | `--ground` | 15.8:1 | AA |
| `--ink-soft` | `--ground` | 7.1:1 | AA |
| `--ink-soft` | `--surface` | 6.0:1 | AA |
| `--accent-strong` | `--ground` | 6.5:1 | AA (this is why words use `--accent-strong`, never `--accent`) |
| `--accent` | `--ground` | 4.2:1 | AA Large only — fails for body text, which is why `--accent` is restricted to rules and marks |
| `--accent-ink` | `--accent-strong` | 6.5:1 | AA |
| `--ink` | `--surface` | 13.9:1 | AA |
| `--field-line` | `--ground` | 3.1:1 | AA (UI border, ≥3:1) |

### 1.2 Spacing

Base unit 4px, used throughout as `--space-*` and consumed via Tailwind's own
spacing utilities (`p-4` = `--space-4`) or the bracket form (`px-[var(--space-4)]`)
where Tailwind has no step at that size.

| Token | Value |
|---|---|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |

### 1.3 Typography

Font families, both loaded via Google Fonts:

- Display (headings): `--font-display` → "Bricolage Grotesque", system-ui, sans-serif
- Body: `--font-body` → "Inter", sans-serif

| Token | Size | Line height | Weight | Used for |
|---|---|---|---|---|
| `--size-label` | 11px (`0.6875rem`) | 1 | inherit (regular) | `.label` — section labels, table headers, filter titles |
| body (unnamed, `body` element) | 17px | 1.6 | 400 | Running text |
| `text-sm` (Tailwind) | 14px | 1.6 | 400 | Secondary body, captions, nav links |
| `text-xs` (Tailwind) | 12px | 1.6 | 400 | Fine print — photo credits, badges |
| `--size-h2` | clamp(1.75rem, 2.8vw, 2.5rem) → 28–40px | 1.05 | `--weight-display` (450) | h2 |
| `--size-h1` | clamp(2.25rem, 3.9vw, 3.5rem) → 36–56px | 1.05 | `--weight-display` (450) | h1 — the hero headline only |
| `--size-price` | clamp(1.25rem, 1.95vw, 1.75rem) → 20–28px | 1.05 | `--weight-display` (450), tabular | The large `<Price size="large">` on a piece's own page and the hero band |

There is no h3/h4 in this design — every page uses h1 once (its own heading)
and h2 for section headings; no third level is drawn.

| Token | Value | Used for |
|---|---|---|
| `--weight-display` | `450` | h1–h4, and anywhere `font-display` is used |
| `--tracking-display` | `-0.03em` | h1–h4 |
| `--tracking-label` | `0.18em` | `.label` (small-caps, uppercase) |

Headings weigh what the token says, not the browser default: Tailwind's
preflight sets heading `font-weight: inherit`, so `theme.css` restates
`font-weight: var(--weight-display)` on `h1, h2, h3, h4` explicitly.

### 1.4 Radius, border, shadow, motion

| Token | Value | Used for |
|---|---|---|
| `--radius` (Tailwind `rounded`) | `2px` | Buttons, cards, inputs, images — the one radius almost everything uses |
| `--radius-sm` | `2px` | Same value as `--radius`; no element currently uses it separately |
| `--radius-pill` | `999px` | Badge, nav badge count, mobile menu toggle, ContactDock's round buttons (via `rounded-full`) |
| `--border-width` | `1px` (Tailwind default, unnamed) | `border`, `border-t`, `border-b` throughout |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.5)` | defined, not drawn on any resting surface in this design (a dark page carries no soft drop shadow — depth is the hairline and the lit tile) |
| `--shadow-md` | `0 16px 40px -20px rgba(0,0,0,0.8)` | defined, not drawn — see above |
| `shadow-lg` (Tailwind default) | browser default | ContactDock's two floating round buttons, Select's open listbox — the only genuinely floating layers |
| `--duration-fast` | `140ms` | defined; no transition currently keyed to it directly |
| `--duration-base` | `600ms` | The hero's `.rise` load animation, PieceCard's hover/focus image scale |
| `--ease-out` | `cubic-bezier(0.22, 0.75, 0.2, 1)` | Same two uses as `--duration-base` |

Motion respects `prefers-reduced-motion: reduce`: `.rise`'s animation is
removed and every animation/transition duration is forced to `0.01ms`.

### 1.5 Layout and breakpoints

| Name | Min width | Container | Notes |
|---|---|---|---|
| phone (default) | 0 | `px-[var(--gutter)]` | 1 or 2 grid columns (`Grid phone={1|2}`) |
| `sm` | 640px | — | Tailwind default breakpoint; used only for small layout shifts (e.g. `sm:grid-cols-2`, `sm:flex-row`) |
| `lg` | 1024px | `max-w-page` (1280px) | The one real breakpoint this design designs for: desktop nav appears, mobile menu/dock disappear, multi-column layouts engage |

`--gutter` (`clamp(20px, 5.5vw, 72px)`) is the page's side padding at every
width; `--page` (1280px) is the max content width (`max-w-page`); `--header-h`
(72px) is the fixed header height; `--dock-space` reserves room at the foot of
the page below 1024px so `ContactDock`'s floating buttons never cover the last
line of content.

Z-index scale (only these values are used):

| Layer | Value |
|---|---|
| Base | auto |
| Sticky/overlaid header (`over` on the home hero) | `z-30` |
| Select's open listbox | `z-20` |
| ContactDock | `z-50` |
| Mobile menu / dashboard drawer | `z-[60]` |

## 2. Components

### 2.1 Button (primary / secondary — no separate component, a class pattern)

**Purpose** — the one call to action per screen: ring, save, sign in, add a
piece. There is no `<Button>` component; every button is a styled
`<button>`/`<a>` sharing these two patterns.

**Anatomy** — `[icon?] [label]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Primary | `bg-accent-strong text-accent-ink`, `rounded`, `px-[var(--space-6..8)] py-[var(--space-3..4)]` | The one primary action on the screen — "Call the studio", "Save the piece", "Sign in" |
| Secondary | `border border-field text-ink`, `hover:border-accent hover:text-accent-strong` | A second, lower-emphasis action beside a primary one — "Write instead", "Mark it sold" |
| Text link | `text-accent-strong hover:underline` | Table row actions ("Edit"), inline navigation |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | as above | `--accent-strong`, `--field-line` |
| Hover | secondary: border/text turn `--accent`/`--accent-strong`; text link: underline | `hover:border-accent`, `hover:text-accent-strong` |
| Focus | browser default outline (no custom focus ring is drawn anywhere in this design) | — see Known deviations |
| Active/pressed | no distinct state drawn | — |
| Disabled | `disabled:opacity-60` (ContactForm submit) or `disabled:opacity-40` (DataTable pager) | opacity only |

**Accessibility** — icon-only buttons (`MenuToggle`, `DashboardLayout`'s
drawer trigger, sign-out) carry `aria-label`. Minimum hit target is 40×40px
(`h-10 w-10`) for icon buttons and larger for ContactDock's `h-14 w-14`.

### 2.2 PieceCard

**Purpose** — one piece in a grid. The photograph is the card; there is no
border, shadow or label chip round it.

**Anatomy** — `[ProductImage] [name + glaze] [Price]`, the last two sharing
one hairline-topped row.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | name in `text-ink`, glaze/price-soft in `text-ink-soft` | `--ink`, `--ink-soft` |
| Hover / focus-visible | image scales to 1.02, name turns `text-accent-strong` | `--duration-base`, `--ease-out`, `--accent-strong` |
| Sold | glaze text replaced by the word "Sold"; price shown struck through in `text-ink-soft` | `Price sold` prop |

### 2.3 Price

**Purpose** — the most-read word on the site: every price on every screen
goes through this component, right-aligned and tabular.

**Anatomy** — one `<span>`, the formatted amount.

**Sizes** — `base` (inherits surrounding text size) and `large`
(`var(--size-price)`, used on a piece's own page and the hero band).

**States**

| State | Visual change | Tokens |
|---|---|---|
| Available | `text-accent-strong`, tabular | `--accent-strong` |
| Sold | `text-ink-soft`, `line-through` | `--ink-soft` |

### 2.4 ProductImage

**Purpose** — every product photograph on the site, in a fixed frame on a
light tile so a pale glaze or a dark one both read, shown whole
(`object-contain`), never cropped.

**Anatomy** — a square (or `4/5`, `4/3`) tile at `--product-ground`, the photo
inset 6% all round, or the empty-slot `<Picture>` block when there is none yet.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Has photo | photo shown, contained, 8% margin | `--product-ground`, `--product-ground-ink` |
| No photo yet | flat tile with a caption, so the owner can see which piece still needs one | same tokens, no image |

### 2.5 Select

**Purpose** — every choice from a list on the site, including the CMS
filters and the piece-editing form's kind/glaze fields. Never a native
`<select>`.

**Anatomy** — a combobox button showing the chosen label, a listbox beneath it
when open.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default (closed) | `border-field`, `bg-surface`, chevron | `--field-line`, `--surface` |
| Open | listbox shown below, `shadow-lg`, `z-20` | `--surface`, `--field-line` |
| Option active (hovered/keyboard) | `bg-accent-strong text-accent-ink` | `--accent-strong`, `--accent-ink` |
| Option selected | `aria-selected`, no distinct visual beyond active | — |
| Placeholder (no value chosen) | label shown in `text-ink-soft` | `--ink-soft` |

**Accessibility** — `role="combobox"`, `aria-expanded`, `aria-controls`,
listbox with `role="listbox"`/`role="option"`; full keyboard support
(arrows, Home/End, Enter, Escape, type-ahead, Tab closes).

### 2.6 DataTable

**Purpose** — the CMS's one list of pieces: sortable columns, paging, a
count, and CSV export. A dashboard list, not a catalogue grid.

**Anatomy** — `<table>` with sortable headers, rows (first cell linked when
`href` given), a footer row with the record count, a page-size `Select`,
an export button, and pager buttons.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | `border-line`, `bg-surface`, rows separated by hairlines | `--line`, `--surface` |
| Row hover | `hover:bg-ground` | `--ground` |
| Loading | body shows "Loading…" in place of rows | `--ink-soft` |
| Empty | caller-supplied empty message in place of rows | `--ink-soft` |
| Sorted column | arrow (`▲`/`▼`) vs. unsorted (`↕`), `aria-sort` | — |
| Current page | pager button `bg-accent-strong text-accent-ink` | `--accent-strong` |
| Disabled pager button | `disabled:opacity-40` | — |

### 2.7 TableFilters (and SearchBox, FilterSelect, DateRange, Badge)

**Purpose** — the filter bar above the CMS's `DataTable`: a search box, a
status filter, and a clear-filters link.

**Anatomy** — `[SearchBox] [FilterSelect…] [Clear filters?]`.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | `border-field`, `bg-surface` fields | `--field-line`, `--surface` |
| Filtering (clear link shown) | underlined text link | `--ink-soft` → `hover:text-ink` |

**Badge** (status pill, used for available/sold in the CMS table) draws one of
four tones, each pairing a shape mark (`●`/`■`/`◆`/`○`) with the word, never
colour alone:

| Tone | Mark | Tokens |
|---|---|---|
| `good` (available) | `●` | `border-line text-ink` |
| `neutral` (sold) | `○` | `border-line text-ink-soft` |
| `warn` | `◆` | `border-field text-ink` |
| `bad` | `■` | `border-field text-ink-soft` |

### 2.8 ContactForm / ContactDock

**Purpose** — the site's one way to write in, and the one way to reach the
studio fast on a phone.

**ContactForm anatomy** — `[name] [phone or email] [message] [submit]`, plus a
hidden honeypot field.

**ContactForm states**

| State | Visual change | Tokens |
|---|---|---|
| Idle | fields shown, button enabled | `--field-line` |
| Sending | button disabled, label "Sending…" | `disabled:opacity-60` |
| Sent | form replaced by a thank-you line | `--ink` |
| Failed | `role="alert"` message shown under the fields | `--ink` |
| Offline (no send endpoint wired yet) | an extra note under the button | `--ink-soft` |

**ContactDock anatomy** — two round 56px buttons, Zalo and Call, fixed to the
bottom-right corner, shown only below `lg` and only when a number exists.

| State | Visual change | Tokens |
|---|---|---|
| Default | Zalo: `bg-surface`, ring; Call: `bg-accent-strong` | `--surface`, `--line`, `--accent-strong` |
| Neither number set | dock renders nothing | — |

### 2.9 Badge

Documented under 2.7 (TableFilters) — it is exported from that file and has
no separate states beyond its four tones.

### 2.10 SectionLabel

**Purpose** — a section's label: 11px small-caps over an accent hairline.
Used once per page section.

**Anatomy** — `[label text] [10px accent rule underneath]`.

**States** — one, `default`: `label text-ink-soft` over a `bg-accent` rule.

### 2.11 DashboardLayout

**Purpose** — the shell every CMS page sits in: a nav rail on the left, the
work on the right. Not the public site's header/footer.

**Anatomy** — `[sidebar nav, lg+] [header: menu button, title, actions, session] [content]`, with the sidebar becoming a portal-rendered drawer below `lg`.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default (desktop) | sidebar `bg-surface border-line`, fixed 256px wide | `--surface`, `--line` |
| Drawer closed (mobile) | sidebar hidden, menu button shown | — |
| Drawer open (mobile) | full-screen overlay panel, `z-[60]` | `--ink`/40% scrim |
| Nav item active | `bg-accent-strong text-accent-ink` | `--accent-strong` |
| Nav item inactive | `text-ink`, `hover:bg-ground` | `--ink`, `--ground` |

### 2.12 NotSignedIn

**Purpose** — what the private area shows a visitor who opens `/cms` or
`/cms/:id` without a session: the studio's own photo beside what the area is
for, not a bare message.

**States** — one, `default`.

## 3. Content and formatting

- Voice: direct, short sentences, in the owner's own words — "Ring us and we
  will tell you about it", never marketing copy about the brand.
- Locale `vi-VN`; prices formatted by `formatPrice` (`src/lib/format.ts`), VND,
  tabular figures throughout (`.tabular` utility class).
- Hours and address are the owner's own strings, printed exactly as given —
  never reformatted or abbreviated.
- Capitalization: sentence case throughout, no Title Case on buttons or
  headings ("Add a piece", not "Add A Piece").
- Empty states say what's missing and what to do: "Nothing matches those two
  filters. Clear one and look again." / "No piece matches that. Clear the
  search to see them all."

## 4. Known deviations

| Where | Deviation | Why it stands | Follow-up |
|---|---|---|---|
| Every interactive control (`Button`, `Select`, nav links, `PieceCard`) | No visible custom focus ring (`--color-focus` token does not exist; `focus-visible` is only used to trigger the same hover scale on `PieceCard`, and `PieceCard`'s link itself sets `focus:outline-none` with nothing in its place) | Approved design as shipped — a dark ground gives the browser's default focus ring reasonable contrast, but none was designed on purpose | Flag to TL/Dev: add a `--color-focus` token and a visible `focus-visible:ring` utility, especially on `PieceCard`'s link which explicitly removes the outline |
| `--shadow-sm` / `--shadow-md` | Defined in `theme.css` but drawn on no resting surface — intentional per the design's own comment ("a dark page carries no soft drop shadow") | Documented design decision, not an oversight | None — keep as-is |
| `--radius-sm` | Same literal value as `--radius` (`2px`); no element uses `--radius-sm` directly | Harmless duplicate token | None — low priority to collapse |
| `--duration-fast` (140ms) | Defined but no transition in the current component set references it directly | Reserved for a future hover micro-interaction | None — leave as reserved |

## 5. Change log

| Date | Change | Design PR |
|---|---|---|
| 2026-11-06 | Initial design system extracted from the approved "Fired in Thái Tân" direction | PR #1 (design), this doc's own PR |
