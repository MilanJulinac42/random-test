

## Plan — Subtle radial gradients across sections (Xtract-inspired)

### Pattern observed on Xtract
Pure black canvas with **soft, low-opacity radial "auras"** — large blurred blobs of brand purple positioned behind hero copy, behind feature cards, and at section transitions. They never compete with content; they sit at ~10–20% opacity, heavily blurred (200–400px), and fade to transparent. Section seams blend because each section is the same black with one subtle glow placed strategically.

We'll replicate this using **CSS radial-gradient overlays** + a few reusable utility classes — no images, no JS, no perf cost.

### Gradient utilities to add (`src/styles.css`)
Three reusable absolutely-positioned glow utilities (placed in a relative section wrapper, `pointer-events-none`, `z-0`, content sits on `z-10`):

```css
.glow-aura-center  /* large center radial, 900px, primary @ 14% → transparent 60% */
.glow-aura-top     /* top-center elliptical, 1200×600, primary @ 10% */
.glow-aura-corner  /* bottom-right offset radial, 700px, primary @ 12% */
.grain-overlay     /* optional faint noise layer for texture */
```

Plus a section-seam helper:
```css
.section-fade-top    /* linear-gradient bg → transparent at top edge, 120px */
.section-fade-bottom /* mirror at bottom — softens hard section borders */
```

### Where each gradient goes

| Section | Gradient | Purpose |
|---|---|---|
| **Hero** (already has video) | `glow-aura-bottom` (indigo, behind CTA area) | Pulls eye to the CTA — replaces current `--gradient-hero` linear |
| **Stats** | `glow-aura-center` low-opacity | Halo behind the "200+" counter |
| **Gallery** | `glow-aura-corner` top-left | Soft warmth so the section isn't a flat black slab |
| **WhyReno** (feature cards) | `glow-aura-top` | Indigo wash behind the eyebrow + heading; cards float on top |
| **Process** | `glow-aura-center` very faint | Centers attention on the 3-step row |
| **Quiz** | `glow-aura-corner` bottom-right | Adds depth to the form panel |
| **Reviews** | `glow-aura-top` left-aligned | Sits behind the sticky heading column |
| **FinalCTA** | Keep solid primary bg, add `grain-overlay` only | Already vibrant, just add texture |
| **Footer** | `section-fade-top` | Softens the seam coming out of FinalCTA |
| **Section seams** (between every section) | `section-fade-bottom` on the preceding section | Eliminates hard edges everywhere — the Xtract "one continuous canvas" feel |

### Color & opacity rules (the "subtle" part)
- All glows use `hsl(var(--primary) / 0.08–0.16)` — never higher.
- Radial size: 60–80% of section width, `filter: blur(80px)` for extra softness.
- Always `pointer-events-none` and behind content (`z-0` vs content `z-10 relative`).
- On mobile, scale glows down 40% (`@media (max-width: 768px)`) to avoid washing out small viewports.

### Files touched
- `src/styles.css` — add the 4 glow utilities + 2 fade helpers (~40 lines).
- `src/components/Hero.tsx` — wrap with `relative`, add bottom aura div.
- `src/components/sections/{Stats,Gallery,WhyReno,Process,Quiz,Reviews,FinalCTA,Footer}.tsx` — each gets a `relative overflow-hidden` wrapper + one `<div className="glow-aura-*" aria-hidden />` and content moved to `relative z-10`.

### Out of scope
- No starfield/particle background (Xtract has one — too noisy for a renovation brand).
- No gradient borders on cards (kept clean).
- No animated/moving gradients.

