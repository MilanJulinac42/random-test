

## Plan — Interactive expandable feature cards + subtle motion

### Scope
Upgrade the existing `WhyReno` section into the showcase for interactive cards, and apply consistent motion polish (stagger, hover elevation, smooth state transitions) across `Process`, `Reviews`, `Gallery`, and `Quiz`. No new routes, no backend changes.

### 1. Expandable feature cards (`src/components/sections/WhyReno.tsx`)
Replace the current static 4-card grid with interactive cards that expand on hover (desktop) and tap (mobile).

**Per-card structure**
- Collapsed state: icon, title, 1-line teaser.
- Expanded state: icon scales up slightly, full body copy fades in, a small "Learn more →" link slides up from the bottom, accent gradient (`var(--gradient-card)`) washes in.
- Subtle indigo border-glow ring (`box-shadow: 0 0 0 1px hsl(var(--primary)/0.4), 0 12px 40px hsl(var(--primary)/0.15)`) on hover.
- Lift: `-translate-y-1.5` with `transition-all duration-300 ease-out`.

**Content additions** (extend each feature with a `details` paragraph + bullet list)
- Vetted Contractors: 3 bullets — background checks, rating system, quarterly performance reviews.
- On-Time Guarantee: 3 bullets — written timeline, daily delays compensated, milestone-tracked.
- Full Transparency: 3 bullets — live photo feed, milestone approvals, payment ledger.
- Pay As You Go: 3 bullets — 0% interest options, no upfront deposit, milestone-gated.

**Interaction model**
- Pure CSS hover on `lg+` (`group-hover:` reveals expanded content with `max-h` + `opacity` transition).
- On touch devices: tap toggles an `expanded` state per card via local `useState<number | null>`. Only one card expanded at a time on mobile.
- Accessibility: each card is a `<button>` with `aria-expanded`, focus-visible ring.

### 2. Stagger + entrance motion
- Add a new utility `.stagger-children > *` in `styles.css` that applies `animation: fade-in-up 0.6s ease-out both` with `nth-child` delays (0ms, 80ms, 160ms, 240ms…) up to 8 children.
- Apply to: `WhyReno` card grid, `Process` step row, `Reviews` grid, `Gallery` slider row.
- Replace per-card `<Reveal delay={i*100}>` wrappers with a single `<Reveal>` on the grid + the stagger utility (cleaner DOM, same effect).

### 3. Hover elevation system (shared utility)
Add `.hover-lift` class to `styles.css`:
```
transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease;
```
Hover: `translateY(-4px)`, `shadow-sh-elevated`, `border-primary/60`.
Apply to: `WhyReno` cards, `Reviews` cards, `Process` step containers, `Gallery` thumbnail.

### 4. Smooth state transitions
- **Quiz step changes**: wrap step content in a keyed div with `reno-step-in` animation already in CSS — verify it triggers on every step swap by keying on `step` index.
- **Quiz success state**: add a checkmark SVG with stroke-dashoffset draw animation (`reno-draw` keyframe already exists — wire it up).
- **Navbar**: add `transition-all duration-300` so the glass bar smoothly tightens on scroll.
- **CTA buttons**: extend `.reno-cta` with a subtle gradient sheen that slides across on hover (pseudo-element with `translateX` from `-100%` to `100%`, 600ms).

### 5. Files touched
- `src/styles.css` — add `.stagger-children`, `.hover-lift`, `.cta-sheen`, expandable-card transition helpers.
- `src/components/sections/WhyReno.tsx` — rewrite for expandable cards (biggest change).
- `src/components/sections/Process.tsx` — apply `.hover-lift` + stagger.
- `src/components/sections/Reviews.tsx` — apply `.hover-lift` + stagger.
- `src/components/sections/Gallery.tsx` — apply `.hover-lift` to slider frame.
- `src/components/sections/Quiz.tsx` — key step container for transition; animate success check.
- `src/components/Navbar.tsx` — add transition timing.

### Out of scope
- No new sections, no route changes, no Supabase changes.
- No third-party animation libs (framer-motion) — pure CSS + small React state for tap toggle.

