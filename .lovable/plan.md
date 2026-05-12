## Goal

Pull the "Our Guarantee" block out of `WhyReno` and make it a standalone, full-width white section with a large centered headline whose **opacity fills from low to 100% as the user scrolls it into view** (the screenshot's effect). Generous vertical padding keeps it visually isolated from neighbouring sections.

## Visual target

```text
                                                  
              GUARANTEE                              ← small eyebrow
                                                     
        If we run late, you're                       ← line 1
           compensated.                              ← line 2
        In writing, before                           ← line 3
            we start.                                ← line 4
                                                  
```

- Background: pure white (`#FFFFFF`).
- Eyebrow: small uppercase "GUARANTEE", muted grey.
- Headline: 4 lines, hard-broken, centered, large display weight, dark text.
- Headline opacity is driven by scroll position: ~15% when the section first enters the viewport from the bottom, ramps to 100% when it's centered, stays 100% past that. Light-DOM text (selectable, accessible).
- Vertical padding: `clamp(120px, 14vw, 180px)` top and bottom — meaningfully more than the existing sections so it reads as its own beat.

## Approach

### 1. New component `src/components/sections/Guarantee.tsx`
- Wrapper `<section id="guarantee" data-nav-theme="light">` with white background and the large vertical padding above.
- Inside: small eyebrow `GUARANTEE`, then a centered `<h2>` containing 4 `<span className="block">` lines for the hard breaks.
- Scroll-driven opacity:
  - `useRef` on the headline + `useEffect` that attaches a passive `scroll` listener (and a `resize` one).
  - On each tick, compute `progress = clamp(0..1)` from the section's bounding rect: `0` when its top is at the bottom of the viewport, `1` when its center crosses the viewport center.
  - Apply `opacity = 0.15 + 0.85 * progress` to the headline via inline `style` or a CSS variable. Optional small `translateY(8px → 0)` for polish.
  - Respect `prefers-reduced-motion`: skip the scroll listener and render at full opacity.
- No new dependencies. No IntersectionObserver-only approach (we need continuous progress, not a one-shot).
- Type sizing: `fontSize: clamp(40px, 6vw, 80px)`, `fontWeight: 700`, `lineHeight: 1.1`, `letterSpacing: -0.02em`, `color: #0D0D0D`. Centered.

### 2. Remove the old guarantee block from `WhyReno`
- Delete the `{/* Guarantee block */}` JSX (lines 132–161 in `src/components/sections/WhyReno.tsx`) and the now-unused `<style>` block at the bottom (`.reno-guarantee-btn:hover` rules — no other usage in the file).
- Leave the rest of `WhyReno` (eyebrow, headline, 3 stat cards) intact.

### 3. Mount the new section in `src/routes/index.tsx`
- Import `Guarantee` and place it **after `WhyReno`** and **before `Process`** so the flow becomes: WhyReno (numbers) → Guarantee (the promise) → Process. This keeps the narrative: proof → promise → how.

## Copy

- Eyebrow: `GUARANTEE`
- Headline (4 lines, exactly as currently written, just split across 4 lines):
  1. `If we run late,`
  2. `you're compensated.`
  3. `In writing,`
  4. `before we start.`

If you'd like different line breaks, say the word and I'll adjust — happy to keep "If we run late, you're compensated." as one line and split the second sentence too.

## Responsive

- Mobile: same centered layout, headline drops to ~`40px`, vertical padding clamps to `120px`. No horizontal scroll, max-width on the headline (~`min(880px, 92vw)`) so lines stay tidy.

## Out of scope

- No changes to other sections' styling.
- No new fonts, no new dependencies, no GSAP/Framer Motion.
- No background imagery (the screenshot's orb/gradient was reference for the *fill effect*, not literal art — confirm later if you want me to add the soft purple radial accents).

## Open question (non-blocking)

Add the soft decorative purple gradient blobs in the corners (like the screenshot reference) as a polish pass, or keep the white background completely clean? Default: clean white.
