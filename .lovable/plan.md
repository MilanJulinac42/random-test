

## Plan — Navbar socials, Stats counter section, Reviews redesign

### 1. Navbar update (`src/components/Navbar.tsx`)
- Replace "Call Us" button with **"Contact Us"** → links to `WHATSAPP_GENERAL` (opens WhatsApp in new tab).
- Add **LinkedIn** and **Instagram** icon links (lucide-react `Linkedin`, `Instagram`) before the Contact Us button. Icon-only, ghost style, hover → `text-primary`.
- Mobile: keep icon-only Contact Us (WhatsApp icon instead of Phone), socials hidden on mobile to save space.
- Add `LINKEDIN_URL` and `INSTAGRAM_URL` constants in `src/lib/constants.ts` (placeholders).

### 2. New Stats section (`src/components/sections/Stats.tsx`)
Pulled out of the hero. Sits **right after `<Hero />`**, before `<Gallery />`.

Layout (inspired by "Stats and Facts" pattern):
- Full-width section, `bg-background` with subtle top/bottom border.
- Centered eyebrow "TRUSTED BY DUBAI HOMEOWNERS".
- Three stats in a horizontal stack (3-col on `md+`, stacked on mobile), separated by thin vertical dividers:
  1. **200+** — "Projects Delivered"
  2. **100%** — "On-Time Guarantee" (animates 0→100)
  3. **50+** — "Vetted Contractors" (animates 0→50)
- Each number: huge display type (`text-6xl md:text-7xl`, primary color), label below in muted-foreground.
- **Counter animation**: custom hook `useCountUp(target, duration)` triggered by `IntersectionObserver` (reuse existing `useInView`). Uses `requestAnimationFrame` with ease-out cubic; preserves the `+`/`%` suffix.

### 3. Hero cleanup (`src/components/Hero.tsx`)
- Remove the 3-checkmark trust row (`FadeIn delay={1400}` block).
- Keep eyebrow, heading, subhead, CTAs, and the right-side glass tag.
- Re-time the glass tag to `delay={1200}` so it lands with the CTAs.

### 4. Reviews redesign (`src/components/sections/Reviews.tsx`)
Replicate the lgpsmstudio "Architecting tomorrow's mind" pattern:
- **Two-column layout on `lg+`**:
  - Left column (sticky on desktop): eyebrow "HOMEOWNER STORIES", large heading "Trusted Across Dubai", short intro paragraph, Google rating row (4.9★ · 140+ reviews).
  - Right column: vertical stack of 3 testimonial cards (one per row), each with quote, then author block (circular initial avatar with primary bg + name + role/location).
- Mobile: heading block on top, then stacked cards below (no horizontal scroll).
- Cards keep `.hover-lift` and stagger entrance.
- Avatar = circle showing first letter of name in `bg-primary text-primary-foreground`.

### 5. Wire-up (`src/routes/index.tsx`)
Insert `<Stats />` between `<Hero />` and `<Gallery />`. Existing `<TrustBar />` stays where it is (different content — insurance/license badges).

### Files touched
- New: `src/components/sections/Stats.tsx`, `src/hooks/useCountUp.ts`
- Modified: `src/components/Navbar.tsx`, `src/components/Hero.tsx`, `src/components/sections/Reviews.tsx`, `src/routes/index.tsx`, `src/lib/constants.ts`

### Out of scope
- No real LinkedIn/Instagram URLs — placeholders (`#`) until you provide them.
- No changes to TrustBar, Gallery, Quiz, Process, WhyReno, Footer.

