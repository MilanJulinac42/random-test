## Goal

Restructure the hero so the page sits on a dark `#0D0D0D` canvas with the slideshow living inside a **single rounded card** that's offset diagonally — like a physical card slid up-and-left on a dark table. Only the **top-right** and **bottom-left** rounded corners are visible inside the viewport; the **top-left** and **bottom-right** corners bleed off-screen.

All current hero elements stay in place inside the card — no Navbar above, no notches, no floating outside elements.

## Visual target

```text
┌───────────────────────────────────────────────────────────┐  ← #0D0D0D page bg
│  ─────────────────────────────────────────────────────╮   │  ← top bar inside card
│  [IG][LI]              [ Reno logo ]   [ Chat with us ]   │
│                                                       │   │
│   End-to-end renovation in Dubai                      │   │
│   One-stop                                            │   │
│   Renovation Platform                                 │   │
│   subheader…                                          │   │
│                                                       │   │
│   [thumb][thumb][thumb][thumb]                        │   │
│                                  Get a written quote… │   │
│                                  [Check availability] │   │
│                                  [Download app]       │   │
│   ╰───────────────────────────────────────────────────│   │  ← bottom-right off-screen
│                                                           │
└───────────────────────────────────────────────────────────┘
```

- Page area around the hero is `#0D0D0D`. A thin gutter is visible on the right edge (top half) and bottom edge (left half), exposing the dark canvas where the card has slid away.
- Card has `border-radius: 24px` on all four corners, but only top-right + bottom-left sit inside the viewport, so those are the only visible curves. Top-left and bottom-right are clipped by the section's `overflow: hidden`.
- All interior elements stay exactly the ones currently in the hero — no removals, no additions.

## Approach (single file: `src/components/Hero.tsx`)

1. **Outer section** `<section id="top">`:
   - `background: #0D0D0D`
   - `position: relative`
   - `overflow: hidden`
   - `min-height: 100vh`
   - No `Navbar` re-added — Hero keeps its in-card top bar.

2. **Card** (absolutely positioned inside the section, sized larger than the viewport so it can be translated diagonally):
   - `position: absolute`
   - `top: -56px; left: -56px`
   - `width: calc(100% + 112px); height: calc(100% + 112px)`
   - `border-radius: 24px`
   - `overflow: hidden`
   - The 56px / 112px values create a balanced diagonal bleed so the visible top-right and bottom-left curves feel symmetric. Tunable.

3. **Inside the card** (z-stacked top to bottom):
   - **Slideshow images** + legibility gradient — current code, untouched.
   - **Top bar** (current layout, kept as-is):
     - Left: Instagram + LinkedIn icon buttons (`hidden md:inline-flex`).
     - Center: Reno logo (absolute, `left-1/2 -translate-x-1/2`).
     - Right: "Chat With Us" pill (desktop) / `MessageCircle` icon (mobile).
   - **Headline area** (bottom-left, current copy + animations):
     - Eyebrow "End-to-end renovation in Dubai".
     - `AnimatedHeading` "One-stop / Renovation Platform".
     - Subheader "We manage the designers, contractors, and payments…".
   - **Bottom row** (flex, justify-between, items-end):
     - **Left:** the 4-thumbnail slideshow selector (current behavior, hidden on mobile).
     - **Right:** CTA cluster — small "Get a written quote in 60 seconds." subheading above two buttons: "Check availability →" (`reno-btn-purple`) and "Download app" (glass/outline). Same components as today.
   - **Scroll-down chevron** kept (bottom-center, `hidden md:flex`).

4. **Padding inside the card** so visible content isn't cut by the off-screen bleed. The card is shifted -56px up and -56px left, so its inner content needs `padding-top` and `padding-left` of *at least* 56px more than the previous values to stay anchored to the viewport's visible edges. We compensate by:
   - Top bar: `padding: 56px+16px on top, 56px+16px on left` (i.e. add 56 to existing values), and matching on right/bottom for the CTAs/thumbs row.
   - Easier in practice: keep current `px-4 md:px-8 pt-4 md:pt-6` on the children, but add `padding: 56px` on the *card* itself so the card's inner area starts where the viewport edge is. (Cleaner — single offset to maintain.)

5. **Mobile (<md)**:
   - Reduce bleed: `top: -16px; left: -16px; width: calc(100% + 32px); height: calc(100% + 32px)` so the offset is subtle on small screens.
   - Inner padding shrinks to match (16px instead of 56px).
   - Thumbnails stay hidden (current behavior); CTAs stack full-width below the headline area, as today.

6. **Cleanup**: drop the previous notch/mask code, the floating outside-card socials block, and the floating outside-card CTA block from the prior design. Drop the `cardMaskStyle` constant entirely.

## Files to change

1. `src/components/Hero.tsx` — rewrite per above. No other files touched.

## Out of scope

- No changes to `Navbar`, `routes/index.tsx`, or any other section.
- No copy changes, no new buttons, no slideshow logic changes.
- `--radius-card` / `--notch-radius` tokens in `styles.css` can stay (harmless, unused here).

## Open question (non-blocking)

Bleed amount — starting at **56px** off the top + left for desktop. If you want a more dramatic diagonal (say 96–120px) or a subtler one (24–32px), I'll tune after the first pass.
