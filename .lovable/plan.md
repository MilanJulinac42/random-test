## Goal

Turn the "Our Work" section into a sticky scroll experience. Users scroll through a 300vh wrapper and see each of the 3 projects pinned full-screen one at a time, fading between them. Mobile keeps the existing stacked layout.

## Changes (in `src/components/sections/Gallery.tsx`)

### Data cleanup
- Strip `price`, `duration`, `rooms`, `scope` from the `Project` interface and from each project entry. Keep only: `before`, `after`, `location`, `name`, `quote` (used as description).

### New desktop structure
- Outer wrapper: `<section id="gallery">` with `position: relative; height: 300vh; background: #0a0a0a`.
- Inner sticky container: `position: sticky; top: 0; height: 100vh; overflow: hidden; background: #0a0a0a`.
- Track scroll progress with a `useEffect` + `scroll` listener on `window`:
  - `progress = clamp01((scrollY - sectionTop) / (sectionHeight - viewportHeight))`
  - Active index = `0` if progress < 0.34, `1` if < 0.67, else `2`.
- Render all 3 project panels absolutely positioned, full-bleed, only the active one at `opacity: 1`, others at `opacity: 0`, with `transition: opacity 0.5s ease`. Inactive panels get `pointer-events: none` so the slider on the active one still works.

### Per-project panel (desktop)
Two-column flex inside the sticky container:
- Left 55%: `BeforeAfterSlider` filling the full panel height (remove the location badge from the slider — it now lives in the right panel; keep Before/After labels and drag handle).
- Right 45%: vertically centered, `padding: 0 64px`, content stack:
  - Location label, 12px, `letter-spacing: 0.12em`, `color: #777`, uppercase.
  - 12px gap → Project name, 36–40px, weight 600, white.
  - 20px gap → Description (existing `quote` text), 16px, line-height 1.75, color `#aaa`, `-webkit-line-clamp: 4`.
  - 32px gap → "View project →" link, 14px, white, underline only on hover.

### Pinned header
Inside the sticky container, absolutely positioned at the top, max ~80px tall:
- "OUR WORK" eyebrow (11px, letter-spacing 0.2em, color #555, uppercase) and "Delivered projects, not renders." heading on one line or stacked tight (e.g. eyebrow 11px + heading 18px), centered horizontally with side padding. Small and minimal — does not push the project content down beyond the 80px reservation.

### Progress indicator
- `position: absolute; bottom: 32px; right: 40px;` inside the sticky container.
- Text `01 / 03`, `02 / 03`, `03 / 03` based on active index.
- 13px, letter-spacing 0.1em, color `rgba(255,255,255,0.45)`, weight 400.

### Mobile (< 768px)
- Disable sticky entirely: outer wrapper drops the `300vh` height and the inner container drops `position: sticky` / `100vh`.
- Render the 3 projects as a normal vertical stack, each as: slider on top (existing height), then text block below with the same right-panel content rules (location, name, description, "View project →"). No price / weeks / rooms.
- Keep the pinned header as a normal section header above the stack on mobile.

Implementation note: gate desktop vs mobile with a `useIsMobile()` hook (already in `src/hooks/use-mobile.tsx`) so we can render two distinct layouts cleanly rather than fighting CSS.

### Slider tweak
- Update `BeforeAfterSlider` so its container can stretch to a parent-defined height (e.g. `height: 100%` on desktop sticky panel). Remove the fixed `.reno-card-img { height }` constraint for the desktop sticky case; keep mobile height ~260px.
- Remove the location badge overlay from the slider (now in the right panel).

### Cleanup
- Drop unused imports: `Clock`, `LayoutGrid`.
- Remove `ProjectCard` component (replaced by new panel renderer).
- Drop the `.reno-clamp-2` CSS (unused).

## Visual reference

```text
┌───────────────────────────────────────── 100vh sticky ─────────────────────────────────────────┐
│  OUR WORK                                                                                       │
│  Delivered projects, not renders.                                                               │
│                                                                                                 │
│ ┌──────────────────────────────────┐  ┌───────────────────────────────────────────────┐         │
│ │                                  │  │ DOWNTOWN DUBAI                                │         │
│ │                                  │  │                                               │         │
│ │      before / after slider       │  │ Living space renovation                       │         │
│ │            (55%)                 │  │                                               │         │
│ │                                  │  │ Perched high above the city, this family      │         │
│ │                                  │  │ apartment is defined by soft oak…             │         │
│ │                                  │  │                                               │         │
│ │                                  │  │ View project →                                │         │
│ └──────────────────────────────────┘  └───────────────────────────────────────────────┘         │
│                                                                                  01 / 03        │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```
