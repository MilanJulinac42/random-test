## Hero Slideshow with Thumbnail Previews

Replace the HLS background video in the hero with an auto-advancing slideshow of the 4 uploaded interior photos, and add a small thumbnail strip in the bottom-right corner that previews each slide and lets the user jump to it.

### Assets
- Copy the 4 uploads into `src/assets/hero/`:
  - `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`, `hero-4.jpeg`
- Import them as ES6 modules in `Hero.tsx` so Vite hashes/optimizes them.

### Hero.tsx changes
- Remove the `<video>` element, the `videoRef`, the `useEffect` HLS setup, and the `hls.js` import (keep the package installed in case it's reused elsewhere; only remove if unused project-wide).
- Add slideshow state:
  - `const [active, setActive] = useState(0)` with a 5s `setInterval` auto-advance, cleaned up on unmount.
  - Pause auto-advance briefly when the user clicks a thumbnail.
- Render 4 absolutely-positioned `<img>` layers stacked in the same spot as the video was. Each fades in/out via opacity transition (~800ms ease) based on `active`. `object-cover`, `inset-0`, `h-full w-full`, `aria-hidden` on inactive ones.
- Keep the existing `glow-aura-bottom` and gradient overlays so text contrast is preserved.

### Thumbnail strip (bottom-right)
- Container absolutely positioned: `bottom-6 right-6` on desktop, `bottom-20 right-4` on mobile so it doesn't collide with the WhatsApp FAB or the centered scroll chevron.
- 4 thumbnails in a horizontal row, ~64×44px each, rounded `rounded-sh`, `object-cover`.
- Active thumbnail: 2px purple ring (`ring-2 ring-primary`) + full opacity. Inactive: 60% opacity, subtle white/10 border, hover lifts to 100%.
- Each is a `<button>` with `aria-label="Show slide N"` that calls `setActive(i)`.
- Wrap in a faint `liquid-glass` chip for legibility on bright slides.

### Accessibility & polish
- `prefers-reduced-motion`: skip auto-advance and disable opacity transition.
- Preload all 4 images (`<link rel="preload">` not needed — eager `<img loading="eager">` on slide 0, `loading="lazy"` on others is fine since they're small).
- Maintain WCAG contrast: keep the existing dark gradient at the bottom of the hero so the heading and CTA remain readable across all 4 photos.

### Files touched
- `src/components/Hero.tsx` (edit)
- `src/assets/hero/hero-1.jpg` … `hero-4.jpeg` (new, copied from uploads)

No other components, routes, or styles need changes.
