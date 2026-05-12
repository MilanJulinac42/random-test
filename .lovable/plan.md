## Goal

Replace the three cards in the "How It Works" section with a polished image-card layout inspired by the reference image, with an interactive hover-expand behavior.

## Card design (default state)

Each card shows:
- A full-bleed background image (rounded corners, ~24px radius)
- A subtle dark gradient overlay at the bottom for legibility
- A two-line title in white at the bottom-left
- A small white circular button with a right-arrow (`→`) sitting just above the title

Three cards laid out in a row using a CSS grid with animated `grid-template-columns` so widths can interpolate smoothly.

## Hover interaction

- Default: all three cards share equal width (`1fr 1fr 1fr`).
- On hover of a card: that card expands (e.g. `2.4fr`), the other two contract (`0.8fr 0.8fr`) and enter a "compact" state.
- The hovered card animates:
  - Arrow button fades out
  - Description text fades in from the bottom and pushes the title upward
- The non-hovered cards stay in their compact state with only title visible (arrow hidden because there isn't room — title remains anchored bottom-left, possibly truncated to the two-line layout).
- On mouse-leave: arrow fades back in (from the left), description fades out downward, title returns to its original position. All cards return to equal width.

Mobile (<768px): stacked vertically, no hover behavior — show title + description + arrow statically.

## Content mapping

Keep existing copy from the current Process steps (titles + bodies). Replace the SVG illustrations with three images.

| # | Title (two lines)                          | Image source                          |
|---|---------------------------------------------|---------------------------------------|
| 01 | Design and / planning                      | Generated interior render (planning)  |
| 02 | Build, tracked / at every step             | Generated interior render (build)     |
| 03 | Handover & / Warranty                      | Generated interior render (handover)  |

Images will be generated into `src/assets/process-*.jpg` (portrait-ish 4:5 ratio, dark cinematic interiors to match the existing site mood) and imported as ES6 modules.

## Technical approach

- Convert `Process.tsx` to use a single grid container with `grid-template-columns` transitioning over ~500ms with an easing curve (`cubic-bezier(0.22, 1, 0.36, 1)`).
- Track `hoveredIndex` in component state via `useState<number | null>(null)`.
- Each card uses `onMouseEnter` / `onMouseLeave`. The expanded state is `hoveredIndex === i`; compact state is `hoveredIndex !== null && hoveredIndex !== i`.
- Description and arrow use opacity + translateY transitions (~300ms), staggered slightly so the arrow leaves before the description arrives.
- Title uses `transform: translateY()` to slide upward when description appears.
- On mobile, render a simpler stacked layout that ignores hover state.

```text
Default                    Hover card 2
┌────┬────┬────┐          ┌──┬────────┬──┐
│ 01 │ 02 │ 03 │   →      │01│   02   │03│
│ →  │ →  │ →  │          │  │ desc…  │  │
│Ttl │Ttl │Ttl │          │T │  Ttl ↑ │T │
└────┴────┴────┘          └──┴────────┴──┘
```

## Files changed

- `src/components/sections/Process.tsx` — full rewrite of the cards block; section header + padding unchanged.
- `src/assets/process-01.jpg`, `process-02.jpg`, `process-03.jpg` — new generated images.

## Out of scope

- Section header copy and the surrounding gradient/padding stay as they are.
- No changes to other sections.
