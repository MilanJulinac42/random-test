## Reviews: center-emphasis layout

Restructure the desktop testimonials grid so the **center card is the hero** and the side cards (Walter on the left, Camillo on the right) are scaled down and slightly offset, mirroring the reference composition.

### Order

Reorder `testimonials` array so the prominent voice sits in the middle:
1. Walter (left, scaled down)
2. **Amir** (center, hero)
3. Camillo (right, scaled down)

### Desktop layout

Replace the current `grid grid-cols-3` (equal columns, equal cards) with an asymmetric flex/grid:

```
[ Walter ]      [   AMIR   ]      [ Camillo ]
  small           large             small
  offset down    full size         offset down
```

- Container: `flex items-center justify-center` with `gap: 24px`.
- Side cards (Walter, Camillo):
  - `width: ~26%` of row, `transform: scale(0.88) translateY(28px)`
  - `opacity: 0.85`
  - smaller name (18px) and quote (15px / line-height 1.5)
  - subtler border + softer shadow
- Center card (Amir):
  - `width: ~40%` of row, full size, no transform, full opacity
  - keeps the radial-gradient highlight tint, brighter border, stronger shadow → reads as "the highlight"
  - name 24px, quote 19px
  - subtle z-index lift above neighbors

This is achieved by passing a `variant: "side" | "hero"` prop to `TestimonialCard` and branching the styling.

### Mobile

Unchanged behavior (horizontal scroll). All three cards render at the same size in the scroller — the center-emphasis pattern is desktop-only since stacking would lose the visual metaphor. Order in the scroller follows the new array (Walter → Amir → Camillo).

### Files touched

- `src/components/sections/Reviews.tsx` only.

### Out of scope

- No copy edits, no avatar reintroduction, no new images, no changes to the header row or stat pill.
