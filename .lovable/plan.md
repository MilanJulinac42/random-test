## Goal

Wrap the hero slideshow in a single rounded card that matches the reference: rounded corners on all four sides, plus **two diagonally opposite concave "bleed cuts"** at the **top-left** and **bottom-right** corners. The cuts are the same size and shape, creating a clean, symmetric "bitten" silhouette that lets floating UI sit just outside the card.

## Visual target

```text
        ╭──────╮                                          
╭───────╯      ╰──────────────────────────────────────╮   
│  socials  logo                          chat-pill   │   
│                                                     │   
│   One-stop                                          │   
│   Renovation Platform                               │   
│   subheader…                                        │   
│                                                     │   
│  [thumb][thumb][thumb][thumb]                       │   
│                                          ╭──────────╯   
╰──────────────────────────────────────────╯              
                                            ╰──────╮      
                                              CTA cluster 
                                            ╭──────╯      
```

- Top-left: card edge dips inward in a quarter-circle. The socials cluster sits in this notch (slightly above the main card body, flush with the dip).
- Bottom-right: mirror-image quarter-circle dip. The CTA cluster (subheading + "Check availability" + "Download app") sits in this notch, slightly below the main card body.
- Top-right and bottom-left: standard outward rounded corners. Chat pill stays inside the card top bar (top-right), thumbnails stay inside the card bottom area (bottom-left).
- Both notches use the **same radius** so the silhouette reads as symmetric.

## Approach (single file: `src/components/Hero.tsx`, plus 2 token lines in `src/styles.css`)

1. **Section becomes a padded shell**: `<section>` keeps `min-h-screen` and `bg-background`, gains outer padding (~12–16px) so the card has breathing room from the viewport edges.
2. **New card wrapper** inside the section holds the slideshow images, legibility gradient, top bar, headline, and thumbnails.
   - `position: relative; overflow: hidden`
   - `border-radius: var(--radius-card)` (28px) on all corners
   - `min-height: calc(100vh - 2 * shell-padding)`
3. **Bleed cuts** carved with a CSS `mask` on the card. Two radial gradients knock out quarter-circles at top-left and bottom-right; a base layer keeps the rest opaque. Single declaration, no SVG asset:
   ```css
   --notch: 56px;          /* radius of the bite */
   --notch-box: 112px;     /* 2 * notch, sized to the corner */
   mask:
     radial-gradient(circle var(--notch) at 0    0,    transparent 99%, #000 100%) top left     / var(--notch-box) var(--notch-box) no-repeat,
     radial-gradient(circle var(--notch) at 100% 100%, transparent 99%, #000 100%) bottom right  / var(--notch-box) var(--notch-box) no-repeat,
     linear-gradient(#000, #000);
   mask-composite: exclude;
   -webkit-mask-composite: source-out; /* Safari */
   ```
   The mask carves both notches while preserving the regular `border-radius` on top-right and bottom-left.
4. **Reposition the floating elements** so they hug the notches:
   - **Socials (Instagram + LinkedIn)** move out of the in-card top bar and become absolute on the section, anchored to top-left, sitting *above/left* of the card edge so they tuck into the top-left bite. Logo stays centered inside the card top bar; Chat pill stays top-right inside the card.
   - **CTA cluster** (subheading + 2 buttons) moves out of the headline block and becomes absolute on the section, anchored to bottom-right, sitting *below/right* of the card edge so it tucks into the bottom-right bite.
   - Headline/subheader and thumbnail row stay inside the card. Headline still pinned to bottom-left of the card content area; thumbnails sit beneath the headline.
5. **Mobile (<md)**: notches and outer shell padding collapse — the card becomes near-full-bleed with a normal `rounded-2xl`, the mask is not applied. Socials remain hidden, CTA cluster stacks below the card as it does today, thumbnails stay hidden (current behavior preserved).
6. **Scroll-down chevron**: keep, repositioned so it doesn't collide with the bottom-right notch (shift slightly left of center, or hide on this layout — minor follow-up).

## Token additions (`src/styles.css`)

```css
:root {
  --radius-card: 28px;
  --notch-radius: 56px;
}
```

Used by the Hero so the curve and bite size are tweakable in one place.

## Out of scope

- No changes to other sections (Stats, Gallery, Quiz, etc.).
- No copy, button, or slideshow-logic changes.
- No new components or dependencies.
- "Try now" label in the screenshot is reference only — we keep "Chat With Us".

## Open question (non-blocking)

Notch radius — `56px` reads close to the screenshot at desktop widths. If you'd prefer deeper bites (more dramatic) or shallower bites (subtler), I'll tune `--notch-radius` after the first pass.
