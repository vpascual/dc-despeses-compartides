# WIPO ULF Design System

A working design system for **WIPO digital tools**, built around the WIPO Universal Look &
Feel (ULF) and focused on the **Innovation Capabilities Outlook 2026 / Innovation Capabilities
Navigator** — an interactive web tool for exploring innovation capabilities across ~196 economies.

The publication and tool target **policymakers, students, and analysts**. The homepage has two
jobs: explain what the tool is (briefly), and let the user select an economy to explore its
innovation profile (Relevance, Diversity, Sophistication, Opportunities, Pathway).

---

## Sources

This system was reconstructed from materials provided by the user. The reader may have access to
these — they are recorded here so the work can be deepened later.

| Source | Where |
|--------|-------|
| **WIPO ULF reference** (prose styleguide export) | `uploads/wipo_design_guideliness.md` · canonical: https://ulf.wipo.int/0e787783a/p/310158-ulf--wipos-universal-design-system |
| **Tool codebase** (Vue 3 + Vite frontend) | GitHub **OneTandem/wipo-ico** — homepage `src/pages/index.vue`, selector `src/components/OTSelect.vue` + `EconomyNav.vue`, color tokens `src/utils/colors.js` |
| **Client repo (companion)** | GitHub **OneTandem/wipo-ico-client** |
| **Reference homepage draft (V5.1)** | `assets/reference-home-v5.png` |
| **Capability network motif** | `assets/wipo-capability-network.png` |
| Bootstrap Icons | https://icons.getbootstrap.com/ |

> Explore **github.com/OneTandem/wipo-ico** further to build higher-fidelity designs — the real
> selector (`OTSelect.vue`), data service, and economy routes live there. The repo is the source
> of truth for behaviour; this design system is the source of truth for **brand & visual style**.

**Note on stack divergence:** the live `wipo-ico` codebase ships **Inter + Heroicons** (Tailwind
defaults), but the official WIPO ULF — and the brief for this work — mandate **Noto Sans Display +
Bootstrap Icons**. This system follows the ULF spec. See *Caveats* at the bottom.

---

## Index / manifest

| Path | What |
|------|------|
| `styles.css` | Global entry point — `@import`s all tokens + base. Consumers link this one file. |
| `tokens/colors.css` | Full WIPO palette (blue/gray scales, functional accents) + semantic aliases |
| `tokens/typography.css` | Noto Sans Display type scale (H1–H6, body) |
| `tokens/spacing.css` | 8px spacing scale, radii, layout, flat (no-shadow) system |
| `tokens/fonts.css` | Noto Sans Display webfont (Google Fonts) |
| `tokens/base.css` | Element resets + utility classes (`.ulf-container`, `.ulf-h1`, `.ulf-eyebrow`, `.ulf-wordmark`) |
| `components/core/` | `Button`, `EconomySelect`, `MetricStat`, `Badge`, `Card` |
| `components/navigation/` | `SiteHeader` |
| `ui_kits/wipo-ico/` | **Homepage — 3 hero variants** (the primary deliverable), empty + filled states |
| `guidelines/*.html` | Foundation specimen cards (Colors, Type, Spacing, Brand) |
| `assets/` | Capability-network motif, reference draft |

**Components:** Button · EconomySelect · MetricStat · Badge · Card · SiteHeader
**UI kits:** wipo-ico (Innovation Capabilities Navigator homepage)

---

## CONTENT FUNDAMENTALS

WIPO's tone of voice rests on five values: **Human, Trustworthy, Authoritative, Inspirational,
Relevant**. For a top-level "inspirational" page like this homepage, lean warm and confident
without hype.

- **Voice:** address the user directly and use the imperative for actions — *"Select an economy to
  explore its profile."* Speak about the data plainly, not in marketing superlatives.
- **Contractions** are encouraged in web copy: *"don't"*, *"that's"*, *"where opportunities lie."*
- **Sentences are short and front-loaded** — users scan in an F-pattern, so the first words carry
  the message. Fragments are fine for labels and captions.
- **Capitalization:** page titles and H1 use **Title Case** (*"Innovation Capabilities Outlook
  2026"*); every other heading and all body text use **sentence case**. Capitalize proper nouns and
  named WIPO systems only.
- **Numbers:** words for 0–9 in prose, numerals from 10 up; **always numerals in tables, charts and
  metric figures** (*"40 domains"*, *"196 economies"*, score *"87"*).
- **Punctuation is minimal.** No exclamation marks. Avoid semicolons and brackets — start a new
  sentence instead. An em dash may set pace, used sparingly (*"196 economies — and find where
  opportunities lie."*).
- **No emoji.** Meaning is carried by text + Bootstrap icons, never decoration.

**Real copy used across the mocks** (do not invent alternatives):
- Title — *Innovation Capabilities Outlook 2026*
- Tagline — *Map the innovation strengths of 196 economies — and find where opportunities lie.*
- Body — *The Innovation Capabilities Outlook maps global innovation ecosystems using data from
  patents, trademarks, publications and exports. Select an economy to explore its profile.*
- CTA — *Select an economy*
- Sample economy — *Luxembourg* (Relevance 0.2 · Diversity 35 · Sophistication 87 ·
  Opportunities 40 domains · Pathway "Smart diversification")

---

## VISUAL FOUNDATIONS

- **Color:** Solid blue **#0059C6** is the single primary — interaction, links, selected states.
  Functional accents each have one fixed job: **Aqua #1C94AB** = information, **Lime #A8B215** =
  highlight 1, **Cherry #B3145B** = highlight 2, plus Green/Orange/Red for success/warning/danger.
  Color **never conveys meaning alone** — always paired with a text label or icon (WCAG AA). Stick
  to a few colors per page.
- **Backgrounds:** flat, **alternating white and light-grey (#F0F0F0)** section blocks; an off-white
  **#FCFCFC** for quiet surfaces and a soft-blue **#F5F9FF** to lift a band or weight a metric. The
  signature brand visual is the **capability-network motif** (a force-directed node/bubble graph) —
  used as a *real* schematic, not wallpaper.
- **No gradients. No drop shadows. No z-depth.** The ULF is an explicitly flat system; separation
  comes from 1px borders (`#E3E3E3`) and background tints.
- **Type:** Noto Sans Display throughout. Headings **500 (Medium)**, body **400 (Regular)**. Steep,
  consistent hierarchy: H1 38/55 down to caption 10/18. Display headings may tighten line-height
  slightly at the largest sizes.
- **Spacing:** 8px-based rhythm (Bootstrap 4). Uniform, generous white space inside a 12-column,
  1200px-max container.
- **Corner radii:** restrained — **4px** default for cards, fields and buttons; **8px** for larger
  panels; full **pill (999px)** reserved for the hero CTA selector.
- **Cards:** white fill, 1px `#E3E3E3` border, optional 4px colored top-bar (Aqua/Lime/Orange) — no
  shadow, no colored-left-border-only treatment.
- **Borders & focus:** hairline `#E3E3E3` dividers; a visible 2px blue focus ring (`#0059C6`).
- **Animation & states:** quiet and functional. Transitions ~120ms ease on background/color only.
  **Hover** = darker blue (`#004294`) on solid buttons, soft-blue tint on secondary/list rows;
  **press/active** = no shrink or bounce, just the settled darker state. No decorative looping
  motion. Visited links go magenta (`#982F78`).
- **Imagery tone:** intentional and informative, never decorative — real photography of people, or
  genuine data visualizations. Cool, clean, neutral.
- **Transparency/blur:** used minimally (e.g. a translucent white capsule over the network preview);
  no heavy glassmorphism.

---

## ICONOGRAPHY

- **Library:** **Bootstrap Icons** (`bi-*`) — the official WIPO ULF icon set, chosen for
  accessibility and multilingual/responsive use.
- **Format:** icon **font or SVG, never raster images**, so screen readers and high-DPI displays are
  handled. In this system the components render `<i class="bi bi-{name}">`; the cards/kit load the
  font from jsDelivr (`bootstrap-icons@1.11.3`).
- **Usage in components:** `Button` (`icon` / `iconRight`), `MetricStat` (`icon`), `Badge` (`icon`),
  `EconomySelect` (globe + chevron + search), `SiteHeader` (globe + chevron). Icons sit beside text,
  never as the sole signifier of meaning.
- **Common icons here:** `compass`, `bullseye`, `diagram-3`, `graph-up-arrow`, `signpost-split`,
  `globe2`, `chevron-down`, `search`, `arrow-right`, `check2`, `bar-chart-line`.
- **No emoji; no Unicode-glyph icons.** The live codebase uses Heroicons (Tailwind default) — when
  porting designs back into `wipo-ico`, map each `bi-*` to its nearest Heroicon or install the
  Bootstrap Icons font per ULF.
- **Logo:** the WIPO wordmark is a heavy geometric all-caps lockup served as an SVG from wipo.int.
  It could not be fetched here, so it is **substituted as styled text** (`.ulf-wordmark`, Noto Sans
  Display 700, +0.12em tracking). Replace with the official SVG for production.

---

## How consumers use this system

1. Link the single global stylesheet: `<link rel="stylesheet" href="styles.css">`.
2. Load the compiled bundle `_ds_bundle.js` (auto-generated) and read components from
   `window.WIPOULFDesignSystem_f77e5d` (e.g. `const { Button, EconomySelect } = window.WIPOULFDesignSystem_f77e5d`).
3. Load Bootstrap Icons (`bootstrap-icons@1.11.3`) for `bi-*` glyphs.
4. Compose with the tokens (`var(--wipo-blue)`, `var(--surface-alt)`, …) — never hardcode hex.

---

## Caveats

- **Font + icon substitution vs. the live codebase.** The ULF spec (and this brief) require Noto
  Sans Display + Bootstrap Icons; the running `wipo-ico` app uses Inter + Heroicons. This system
  follows the ULF. If you want the system to mirror the *shipped* app instead, say so and I'll swap.
- **WIPO logo** is rendered as styled text, not the official SVG (the asset URL was not fetchable).
  Please attach `wipo-logo-header.svg` for an exact lockup.
- **Noto Sans Display** is loaded from Google Fonts rather than the WIPO CDN
  (`webcomponents.wipo.int/wipo-navbar/ulf-fonts.css`) for offline-friendliness — visually identical.
- The metric values, economy list and "Pathway" labels in the mocks are the sample data from the
  brief (Luxembourg) — not live data from the `wipo-ico` CSVs.
