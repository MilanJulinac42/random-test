## Reviews section redesign

Rework `src/components/sections/Reviews.tsx` to a dark, cinematic layout matching the reference.

### Layout

```text
┌──────────────────────────────────────────────────────────────────┐
│  Hear it directly                       ╭──────────────────╮     │
│  from them                              │  200+   HAPPY    │     │
│                                         │         CLIENTS  │     │
│                                         ╰──────────────────╯     │
│                                                                  │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐        │
│  │ ◯  Walter      │ │ ◯  Camillo     │ │ ◯  Amir        │        │
│  │                │ │                │ │                │        │
│  │   "quote..."   │ │   "quote..."   │ │   "quote..."   │        │
│  │                │ │                │ │                │        │
│  │   ★ ★ ★ ★ ★    │ │   ★ ★ ★ ★ ★    │ │   ★ ★ ★ ★ ★    │        │
│  └────────────────┘ └────────────────┘ └────────────────┘        │
│                                                                  │
│           ░░░ deep purple/blue glow at bottom ░░░                │
└──────────────────────────────────────────────────────────────────┘
```

### Header row

- Two-column flex: heading left, stat pill right.
- Heading: "Hear it directly from them" — white, weight 700, `clamp(40px, 5vw, 64px)`, tight tracking, two lines.
- Stat pill (right): rounded-full dark glass surface (`rgba(255,255,255,0.04)`, subtle 1px white/5 border, soft inner glow). Inside: large white "200+" (clamp 56–80px, weight 700) on the left, two-line uppercase label "HAPPY / CLIENTS" on the right (12–13px, letter-spacing ~0.12em, white/60).

### Testimonial cards (3, equal width)

- Each card: dark glassy panel, `border-radius: 24px`, `padding: 28px`, `aspect-ratio: 3/4` (or `min-height: 360px`).
- Background: layered radial highlights — soft warm/cool tint per card (mirroring current `tint`) blended into a near-black base, plus a subtle white inner-top glow. 1px border `rgba(255,255,255,0.08)`. Soft outer shadow.
- Top row: small circular avatar (40px, current `image`, rounded-full, white/10 ring) + name to its right (white, 15px, weight 500). No meta line in the body header.
- Body: centered quote text, white/85, `clamp(15px, 1.3vw, 17px)`, line-height 1.55. Strip the curly quotes from current strings and rewrap inline.
- Footer: 5 filled white stars (`Star` from lucide, `fill="white"`, `size={16}`), centered.

### Bottom glow

- Deep blue/purple radial glow bleeding from below the cards into the section bottom — large soft gradient (`radial-gradient(60% 50% at 50% 100%, #2A1BA8 0%, transparent 70%)`), behind cards, above section background.

### Section chrome

- Background `#0D0D0D`, `data-nav-theme="dark"`, vertical padding `clamp(80px, 10vw, 140px)`.
- Keep the section id `#reviews`.

### Responsive

- Mobile: heading + stat pill stack vertically (pill below, full width). Cards become a horizontal snap-scroll (keep current pattern, ~82vw width).
- md+: 3-column grid with `gap: 20px`.

### Data

- Reuse existing `testimonials` array (Walter / Camillo / Amir, same images and quotes). Drop `meta` from card display but keep in the type for now.
- Stat pill number hardcoded as `200+` with label `HAPPY CLIENTS` (matching the rest of the site's "200+ projects" stat).

### Files

- `src/components/sections/Reviews.tsx` — rewrite of layout/markup. No new files, no other components touched.
