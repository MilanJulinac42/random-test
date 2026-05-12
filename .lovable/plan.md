# Plan

## 1. `Gallery.tsx` — "Our Work" section

**Background → white**
- Section bg `#0D0D0D` → `#FFFFFF`, `data-nav-theme="dark"` → `light`.
- Eyebrow stays `#482FFF`. Heading color → `#0D0D0D`. Progress indicator color → `rgba(0,0,0,0.45)`.

**Layout: photos 70% / text 30%** (desktop sticky panel)
- Left slider container: `width: 55%` → `70%`.
- Right info container: `width: 45%` → `30%`.
- Reduce right padding so 30% is usable: `padding: "220px 64px 64px"` → `"220px 48px 64px 40px"`.

**ProjectInfo refresh**
- Remove "View project →" link entirely.
- Remove the 4-line clamp (delete `display: -webkit-box`, `WebkitLineClamp`, `WebkitBoxOrient`, `overflow: hidden`) so full description shows.
- Description font: `16px` → `18px`, color `#aaa` → `#3a3a3a` (now on white), line-height `1.75` → `1.65`.
- Heading color `#fff` → `#0D0D0D`.
- Location → styled chip: replace plain uppercase text with an inline-block pill: bg `#F1EEFF` (light purple), color `#482FFF`, padding `6px 12px`, border-radius `999px`, font-size `12px`, letter-spacing `0.08em`, font-weight `600`, uppercase. `align-self: flex-start` so it hugs content.

**Animated before/after divider**
- Replace the plain 2px white line + small handle with:
  - Vertical line: 3px, `linear-gradient(to bottom, rgba(255,255,255,0.4), #FFFFFF, rgba(255,255,255,0.4))`, with a subtle `box-shadow: 0 0 16px rgba(255,255,255,0.55)`.
  - Handle: 56px circle, white bg, ring (2px solid `#482FFF` outer glow with `box-shadow: 0 0 0 6px rgba(72,47,255,0.18), 0 8px 24px rgba(0,0,0,0.25)`), bigger chevrons (18px), animated.
  - On mount (and whenever active project changes), add a one-time "nudge" animation: handle slides 0→+18px→-18px→0 over ~1.6s (CSS keyframes `reno-ba-nudge`) using a `data-hint` attribute that gets removed on first user interaction.
  - Continuous gentle pulse on the outer purple ring (`reno-ba-pulse`, 2.4s ease-in-out infinite) until first drag.
  - Add small "Drag" label above the handle (12px, white on translucent dark pill) that fades out after first drag.
- Track first interaction in `BeforeAfterSlider` via a `hasInteracted` state set in `onPointerDown`; toggle a class to stop the animations.

**Mobile**
- Mirror white bg + dark text + chip styling; full description (no clamp); remove "View project" link.

## 2. `Process.tsx` — "How it works" white background

- Section bg `#0D0D0D` → `#FFFFFF`. Add `data-nav-theme="light"`.
- Eyebrow color: keep `#482FFF`.
- Heading color: `text-white` class → remove; set `color: "#0D0D0D"`.
- Card image overlay (gradient at bottom for white-text title) is on the image itself, so titles remain readable — leave card internals alone.

## 3. `Quiz.tsx` — landscape form

- Form `maxWidth: 640` → `980`.
- Inside form: switch to a 2-column grid on `md+` (CSS grid `gridTemplateColumns: "1fr 1fr"`, `gap: 32px`):
  - **Left column**: Name + Phone (stacked, full width), then "What are you renovating?" tile group.
  - **Right column**: "Rough budget" stack, then submit button.
- On mobile (<768px) collapse back to single column.
- Keep all existing field logic, validation, submit handler unchanged.

## 4. `Guarantee.tsx` — pin to full viewport

- Wrap current `<section>` content in an outer wrapper:
  - Outer: `height: 200vh`, `background: #FFFFFF`, holds the ref used for scroll progress.
  - Inner: `position: sticky; top: 0; height: 100vh; display: flex; align-items: center; justify-content: center;` — contains the headline block.
- Recompute `progress` against the **outer** wrapper rect so the text fade-in uses the full 100vh of scroll travel inside the pin.
- Remove the existing `paddingTop/Bottom: clamp(120px,...)` from the inner since it's centered in 100vh.
- Net effect: scrolling from Quiz → Guarantee snaps the headline to a full-viewport pinned moment; only after passing it does Process appear.

## 5. `FinalCTA.tsx` — match hero button

- Replace the oversized button styles `height: 68, padding: "0 48px", fontSize: 20` with hero values: `height: 56, padding: "0 28px", fontSize: 16`.
- Keep `reno-btn-purple` class and label.

## Notes / trade-offs

- Switching Process to white keeps the existing dark photo cards (they're image-based with built-in dark gradient), which still read well on white — only the section frame changes.
- The Guarantee pinning adds 100vh of extra scroll height; the existing scroll-fade logic continues to work because we re-target the outer wrapper.
- No business logic changes; no new dependencies.
