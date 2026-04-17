

## Plan — Apply RENO design system + revert hero layout

### Approach
The site stays **dark by default** (apply `.dark` to `<html>`). We adopt the RENO design system (Electric/Deep Indigo `#3D1AFF` primary, Obsidian `#1C1C21` background, semantic HSL tokens) and replace the gold/beige palette everywhere. Hero layout returns to the VEX-style (raw video, bottom-aligned content, AnimatedHeading, glass tag) but keeps the current Reno copy and the 3 checkmark trust badges.

### 1. Design system migration (`src/styles.css`)
- Replace current `@theme inline` color block with semantic HSL tokens from the spec (Tailwind v4 syntax: `--color-background: hsl(...)` etc.) for both `:root` and `.dark`.
- Keep ZT Talk @font-face declarations as-is.
- Add gradient tokens: `--gradient-hero`, `--gradient-subtle`, `--gradient-card`.
- Add `.liquid-glass` utility (restored from earlier hero version) for the glass tag.
- Drop gold-specific helpers; rename `.reno-cta-gold` → `.reno-cta` using `bg-primary`.
- Force dark mode globally: add `class="dark"` on `<html>` in `__root.tsx`.

### 2. Hero revert (`src/components/Hero.tsx`)
Restore the VEX layout structure with Reno content:
- Full-screen video, **no overlay** (raw video).
- Container: `flex-1 flex flex-col justify-end`, bottom padding `pb-12 lg:pb-16`, page padding `px-6 md:px-12 lg:px-16`.
- 2-column grid on `lg`, items-end.
- **Left column**:
  - Eyebrow: "DUBAI'S HOME RENOVATION PLATFORM" — `text-primary` (renders white in dark via `.dark .text-primary` rule), small uppercase tracking.
  - `<AnimatedHeading text={"Transform Your Home.\nNo Stress. No Surprises."} />` with `text-4xl md:text-5xl lg:text-6xl xl:text-7xl`, `letterSpacing: -0.04em`.
  - `<FadeIn delay={800}>` subhead (current Reno copy about end-to-end management, AED 275k–920k).
  - `<FadeIn delay={1200}>` CTAs row: "Check Project Availability →" (`bg-primary text-primary-foreground`) + "WhatsApp Us ↗" (`liquid-glass border-white/20`).
  - `<FadeIn delay={1400}>` checkmark trust row (3 badges with `text-primary` ticks).
- **Right column**: `<FadeIn delay={1400}>` liquid-glass tag card "Design. Build. Deliver." aligned bottom-right on `lg`.
- Scroll chevron stays at bottom-center.

### 3. Navbar (`src/components/Navbar.tsx`)
- Wrap in `liquid-glass rounded-xl` floating bar (VEX pattern) with `pt-6` outer padding.
- Logo "Reno" + "Dubai" pill using `bg-secondary text-muted-foreground`.
- Call button: `border-primary text-primary` → hover `bg-primary text-primary-foreground`.
- Drop the scrolled-bg toggle (glass bar is always glass).

### 4. Section restyle (token swap only — no layout changes)
Across `Gallery`, `Quiz`, `WhyReno`, `Process`, `Reviews`, `TrustBar`, `FinalCTA`, `Footer`, `WhatsAppFAB`:
- Hardcoded `#0A0A0A` → `bg-background`
- `#141414` → `bg-card` / `bg-secondary`
- `#1F1F1F` → `border-border`
- `#C9A96E` (gold) → `text-primary` / `bg-primary`
- `#F5F0EB` → `text-foreground`
- `#8C8C82` → `text-muted-foreground`
- CTAs: `bg-primary text-primary-foreground` with `shadow-sh-elevated` on hover.
- Section reveal animation (`.fade-in-up`) and Reveal hook untouched.

### 5. Files touched
Modified: `src/styles.css`, `src/routes/__root.tsx`, `src/components/Hero.tsx`, `src/components/Navbar.tsx`, `src/components/WhatsAppFAB.tsx`, all 8 files in `src/components/sections/`.
Unchanged: `AnimatedHeading.tsx`, `FadeIn.tsx`, `Reveal.tsx`, hooks, routes, Supabase, fonts.

### Out of scope
- No theme toggle (site is dark-only per your choice).
- No light-mode QA — `:root` tokens defined per spec but not exercised.
- Content stays identical to current build.

