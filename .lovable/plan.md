## Goal

Make the purple glow currently at the bottom of the Reviews ("Hear it directly from them") section feel like it continues into the top of the InstagramFeed ("Follow the build") section, then fades out before the heading and Instagram tiles.

## Changes

**1. `src/components/sections/Reviews.tsx`**
- Increase `paddingBottom` so the existing bottom glow has more breathing room below the testimonial cards before the section ends (e.g. `clamp(160px, 18vw, 260px)`).
- Keep the existing radial-gradient glow at the bottom unchanged so it visually "starts" here.

**2. `src/components/sections/InstagramFeed.tsx`**
- Add a top decorative glow that mirrors the Reviews bottom glow — same purple color/stops, but anchored at the top of the section (`60% 60% at 50% 0%`) so it reads as the same gradient flipped vertically and continuing across the seam.
- Increase `paddingTop` so the glow has space to fade out fully before the "Follow the build." heading (e.g. `clamp(140px, 16vw, 220px)`).
- Keep section background `#0D0D0D` so the glow blends seamlessly with Reviews.

```text
┌─ Reviews ──────────────────┐
│  heading + cards           │
│                            │
│       ░▒▓ purple glow ▓▒░  │  ← existing
└────────────────────────────┘
┌─ InstagramFeed ────────────┐
│       ░▒▓ purple glow ▓▒░  │  ← new (mirrored)
│                            │
│  "Follow the build."       │
│  IG tiles                  │
└────────────────────────────┘
```

## Technical notes

- Both sections already share `backgroundColor: #0D0D0D`, so a continuous radial glow across the boundary will look seamless with no visible seam.
- The new top glow in InstagramFeed will be an absolutely positioned `aria-hidden` div, matching the pattern already used in Reviews, with `z-10` kept on the content container so the heading stays above it.
- Padding values use `clamp()` to stay responsive on mobile.
