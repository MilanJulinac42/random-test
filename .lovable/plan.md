## Restructure Stats section

Rework `src/components/sections/Stats.tsx` into a two-column layout matching the reference image.

### Layout

```text
┌─────────────────────────┬───────────────────────────────────┐
│ 98%                     │  ┌─────────────────────────────┐  │
│ On-time delivery        │  │  200+                       │  │
│                         │  │                             │  │
│ ─────────────           │  │   (purple gradient card)    │  │
│                         │  │                             │  │
│ 80+                     │  │  Projects delivered         │  │
│ Vetted contractors      │  │  across the network         │  │
│                         │  └─────────────────────────────┘  │
└─────────────────────────┴───────────────────────────────────┘
```

- Two-column grid (`grid-cols-1 md:grid-cols-2`), generous gap.
- **Left column**: two stacked stat rows separated by a thin divider.
  - Big black number (≈ clamp(72–112px), weight 700, tight tracking) on top.
  - Small muted label underneath ("On-time delivery", "Vetted contractors").
  - Left-aligned, lots of vertical breathing room.
- **Right column**: rounded card (~24px radius) with the existing purple/indigo gradient + soft glassy highlight (reuse `--gradient-primary` / glow tokens, with a subtle radial sheen top-left and deeper indigo bottom-right).
  - Large white "200+" top-left, padded.
  - Small white/translucent caption "Projects delivered across the network" bottom-left.
  - Aspect roughly 4:3 on desktop; full-width on mobile.

### Content mapping

- Left top: `98%` — "On-time delivery"
- Left bottom: `80+` — "Vetted contractors"
- Right card: `200+` — "Projects delivered across the network"

Keep the existing `Trusted by Dubai Homeowners` eyebrow above the grid. Keep the count-up animation via `useCountUp` + `useInView` for all three numbers. Keep section background `#0D0D0D` and dark nav theme.

### Responsive

- Mobile: single column — left stats stacked, then card below.
- Desktop (md+): 2-column, left takes ~45%, card ~55%, vertically centered.

### Files

- `src/components/sections/Stats.tsx` — full rewrite of layout/markup; reuse existing hooks and tokens.
- No other files touched.
