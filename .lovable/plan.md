

## Reno — Site Structure Plan (for review before build)

### Font reality check
You uploaded 4 ZT Talk files (all "Expanded" cuts):
- `ZTTalk-LightExpanded.ttf` → weight 300
- `ZTTalk-SemiExpanded.ttf` → weight 400 (regular)
- `ZTTalk-SemiBoldExpanded.ttf` → weight 600
- `ZTTalk-BoldExpanded.ttf` → weight 700

The prompt asks for 6 weights (incl. Medium 500 and ExtraBold 800). I'll register the 4 you have and map the missing weights to nearest neighbors:
- 500 (Medium) → 600 SemiBold
- 800 (ExtraBold) → 700 Bold

If you want true Medium/ExtraBold, please upload those .ttf files too.

### Page architecture
Single-page scroll (as the prompt requires) at `/`. Hash anchors used for in-page CTAs only. No new routes.

```
/  (src/routes/index.tsx)
├── <Navbar/>            sticky, transparent → solid after 80px scroll
├── <Hero/>              video bg + dark gradient overlay (REPLACES current hero)
├── <Gallery/>           #gallery   — 3 before/after sliders (custom drag)
├── <Quiz/>              #quiz      — 3-step + success state, Supabase save
├── <WhyReno/>           #why-reno  — 2-col, 4 feature cards
├── <Process/>           #how-it-works — 3 steps with dashed connector
├── <Reviews/>           #reviews   — Google badge + 3 testimonials
├── <TrustBar/>          5 trust icons
├── <FinalCTA/>          gold band
├── <Footer/>            4 columns + bottom strip
└── <WhatsAppFAB/>       fixed, appears after 100vh scroll
```

### File plan
**New / replaced:**
- `public/fonts/zt-talk/` — 4 .ttf files copied from uploads
- `src/styles.css` — replace Inter with ZT Talk @font-face, new color tokens (`--bg`, `--surface`, `--border`, `--gold`, `--text`, `--muted`), keep `.liquid-glass` only if reused (it isn't — remove), add `.fade-in-up` entrance class
- `src/routes/__root.tsx` — remove Google Fonts `<link>`s, update meta to "Reno — Dubai's Home Renovation Platform"
- `src/routes/index.tsx` — compose all sections
- `src/components/Hero.tsx` — rewrite per Part 1.3 (eyebrow, new H1, subhead, 2 CTAs, trust strip, scroll chevron)
- `src/components/Navbar.tsx` — new (Reno + Dubai pill + Call Us button, scroll state)
- `src/components/sections/Gallery.tsx` — new, custom mouse/touch drag slider
- `src/components/sections/Quiz.tsx` — new, 3 steps + success, useState machine
- `src/components/sections/WhyReno.tsx` — new
- `src/components/sections/Process.tsx` — new
- `src/components/sections/Reviews.tsx` — new
- `src/components/sections/TrustBar.tsx` — new
- `src/components/sections/FinalCTA.tsx` — new
- `src/components/sections/Footer.tsx` — new
- `src/components/WhatsAppFAB.tsx` — new
- `src/hooks/useInView.ts` — IntersectionObserver for fade-in-up
- `src/hooks/useScrolled.ts` — for navbar bg toggle
- Tailwind tokens via `@theme` in `styles.css` (no separate tailwind.config.js — project uses Tailwind v4)

**Keep:** `AnimatedHeading.tsx`, `FadeIn.tsx` (will repurpose FadeIn for fade-in-up wrapper if useful, otherwise leave unused).

### Backend (Lovable Cloud / Supabase)
The quiz Step 3 submit needs a `lead_submissions` table:
- `id uuid pk`, `name text`, `phone text`, `area text`, `timeline text`, `rooms text[]`, `budget text`, `submitted_at timestamptz default now()`
- RLS: enable; allow anonymous INSERT only (public lead form). No SELECT for anon.

This requires enabling Lovable Cloud. If you'd rather skip backend for now, the form will fall back to console.log + open WhatsApp (per spec).

### Key technical decisions
- **Tailwind v4** is used here (not v3) — fonts/colors go in `@theme` inside `styles.css`, not a `tailwind.config.js`.
- **Before/after slider**: native pointer events updating `clip-path: inset(0 0 0 X%)` on the "after" image.
- **Quiz state**: single `useReducer` with `{step, rooms[], budget, name, phone, area, timeline, status}`.
- **Section reveal**: shared `useInView` hook + `.fade-in-up` / `.visible` classes with stagger via `style={{transitionDelay}}`.
- **Phone number placeholder**: `+971 4 XXX XXXX` and `wa.me/971XXXXXXXXX` will be left as written until you give the real number.
- **Images**: Unsplash dark interior placeholders with `?auto=format&fit=crop&w=1200&q=80`.

### Open questions (will assume defaults if not answered)
1. Real WhatsApp number + phone? → defaulting to placeholders from the spec.
2. Enable Lovable Cloud for `lead_submissions`? → defaulting to **yes**; without it, submit just opens WhatsApp.
3. Upload Medium (500) and ExtraBold (800) ZT Talk files? → defaulting to weight fallback (600 / 700).

Reply "go" to proceed, or answer the questions above first.

