## Revamp: How It Works

Replace the current dark, gradient-overlaid hover-expand cards with a cleaner layout inspired by the reference: the imagery stays fully visible (no dark veil, no arrow buttons), and the textual content lives **below** each card on a single shared row.

### Layout

```
HOW IT WORKS
From first call to keys in hand.

[ image 1 ]   [ image 2 ]   [ image 3 ]
01 Design     02 Build       03 Handover
description   description    description
```

- 3-column grid (equal widths), generous gap (~24px).
- Each column = stacked: image on top, text block below.
- Cards no longer expand on hover; remove the hover-expand grid logic, the dark gradient overlay, the white arrow circle, and the on-image title.
- Keep section eyebrow + main heading as today.

### Card

- Image container: `aspect-ratio: 4/5`, `borderRadius: 20`, `object-fit: cover`, no overlay, no filter — the photo shows in full clean quality.
- Subtle hover: gentle scale on the image only (1.0 → 1.03), no darkening.

### Text block (below image)

To guarantee equal heights across the three columns:

- **Step number + title on one line**: `01  Design and planning` (tabular small grey "01", then bold dark title). One line only — `whiteSpace: nowrap` with `overflow: hidden; text-overflow: ellipsis` as a safety net, but copy is short enough to fit.
- **Description**: fixed to **3 lines** via `-webkit-line-clamp: 3` with `min-height` set to 3 lines × line-height so columns align even if a description is shorter.
- Titles shortened so they fit one line at desktop widths:
  - `01  Design & Planning`
  - `02  Build & Track`
  - `03  Handover & Warranty`
- Description copy trimmed/normalized to ~3 lines each at desktop width (existing copy mostly already fits; light edits only to balance line counts).

### Mobile

- Stack the 3 cards vertically.
- Same card structure (image on top, text below).
- Description allowed to flow naturally (no line clamp on mobile), but min-heights drop so it doesn't look empty.
- Section padding aligned with current mobile spec in `.lovable/plan.md`.

### Files touched

- `src/components/sections/Process.tsx` — rewrite the card + grid; drop `hoveredIndex` state, `ProcessCard`, `ArrowIcon`, gradient overlays.
- No new assets — the recently swapped `process-01.jpg`, `process-02.jpg`, `process-03.jpg` are reused as-is.

### Out of scope

- No copy rewrite beyond shortening titles and balancing description line counts.
- No changes to other sections.
- No new dependencies.
