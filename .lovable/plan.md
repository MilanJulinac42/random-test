## Redesign "Our Work" section

Rewrite `src/components/sections/Gallery.tsx` only. Keep slider mechanics, image assets, section padding, header label/heading. Remove the bottom "Is your home next?" CTA.

### Data updates (in the existing `projects` array)

Update each project object to include the new fields while keeping `before`, `after`, `quote` (description) unchanged:

- Card 1: `location: "Downtown Dubai"`, `name: "Living space renovation"`, `price: "AED 420k"`, `duration: "14 weeks"`, `rooms: "6 rooms"`, `scope: "Full renovation"`
- Card 2: `location: "Green Community"`, `name: "Kitchen & dining"`, `price: "AED 180k"`, `duration: "8 weeks"`, `rooms: "1 kitchen"`, `scope: "Kitchen"`
- Card 3: `location: "Downtown Dubai"`, `name: "Kid's bedroom"`, `price: "AED 95k"`, `duration: "5 weeks"`, `rooms: "1 bedroom"`, `scope: "Bedroom"`

Drop `title`, `neighbourhood`, `specs` (replaced by the above).

### Card component (replaces `ProjectRow`)

A new `ProjectCard` renders one stacked, full-width card:

- Wrapper: `borderRadius: 16`, `overflow: hidden`, `border: 1px solid rgba(0,0,0,0.08)`, `background: #fff`, no shadow.
- Cards stack in a vertical flex with `gap: 16px` (replaces the divider-separated map). The two-column metadata + image layout is removed.

**Image area** (top of card)
- Height `380px` desktop, `260px` mobile (via `.reno-card-img { height: 260px } @media(min-width:768px){height:380px}`).
- Reuses `BeforeAfterSlider` exactly as-is for slider mechanics, but:
  - Replace the slider's fixed `aspectRatio: "16/10"` with `height: 100%` so it fills the new image area.
  - Remove the slider's existing top-left "Before" / top-right "After" labels (they move to bottom corners per spec).
  - Update the handle to: 40px desktop / 44px mobile, `border: 1px solid rgba(0,0,0,0.12)`, 14px arrow icon at `#444`, ensure `z-index` above images.
- Overlays added inside the image container (absolute):
  - Location badge: top-left, 12px from edges. `background: rgba(0,0,0,0.42)`, white 11px / weight 500 / `letter-spacing: 0.03em`, padding `4px 12px`, pill (`borderRadius: 999`).
  - Before label: bottom-left, 10px bottom / 12px left.
  - After label: bottom-right, 10px bottom / 12px right.
  - Both: 10px / weight 500 / white, `background rgba(0,0,0,0.42)`, padding `3px 10px`, `borderRadius: 20`.

**Info strip** (below image, inside same card)
- Padding `20px 24px 24px`, white.
- Row 1 — flex, `justifyContent: space-between`, `alignItems: flex-start`:
  - Left: name, 17px / weight 500, `#0D0D0D`.
  - Right: price, 15px / weight 500, `#0D0D0D`, `whiteSpace: nowrap`.
- Row 2 — flex, `gap: 16px`, `marginTop: 6px`, `alignItems: center`, secondary color `#777`, 12px:
  - Clock icon (16px lucide `Clock`) + duration.
  - 3px dot, `background: rgba(0,0,0,0.08)` (border color).
  - Door/grid icon (16px lucide `LayoutGrid`) + rooms.
- Row 3 — `marginTop: 12px`. Description (existing `quote` text). 13px, `lineHeight: 1.65`, `#555`. When collapsed: CSS line-clamp to 2 (`display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden`). When expanded: clamp removed.
- Divider: `marginTop: 16`, `height: 1px`, `background: rgba(0,0,0,0.07)`.
- Row 4 — flex, `justifyContent: space-between`, `alignItems: center`, `paddingTop: 12px`:
  - Left: button "View project →" / "Show less ↑" — 13px / weight 500, `#0D0D0D`, transparent background, no border. Toggles `expanded` local state in the card.
  - Right: scope tag pill — 11px, `background: #F5F4F1`, `color: #5F5E5A`, padding `4px 12px`, `borderRadius: 20`.

### Section-level changes

- Keep section wrapper, "OUR WORK" eyebrow, and "Results that speak for themselves." `<h2>`.
- Replace the `projects.map` block: render cards into a `<div>` with `display: flex; flex-direction: column; gap: 16px;` instead of the divider-separated rows.
- Delete the `<div className="text-center mt-12 md:mt-16">` block containing the "Is your home next?" anchor.
- Keep the existing `<style>` block for `reno-outline-cta` (still safe even if the CTA is removed, but the rule will be unused — drop it). Add new rules for `.reno-card-img` height breakpoints, `.reno-ba-handle` size breakpoints (40/44), and the line-clamp helper class.

### Out of scope / preserved

- No edits to images, `BeforeAfterSlider` slider math (`pos`, pointer handlers), section paddings, or any other section/component.
