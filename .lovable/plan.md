## Changes

### 1. Gallery section (`src/components/sections/Gallery.tsx`)
- **Background**: switch from `#0a0a0a` to `#0D0D0D` (matches Stats / Process).
- **Eyebrow "OUR WORK"**: change from 11px #555 → **14px #482FFF, letter-spacing 0.12em** (matches Process / Stats trust label).
- **Heading "Delivered projects, not renders."**: change from 18px (desktop pinned) / 32px (mobile) → **clamp(40px, 5vw, 64px), font-weight 700, letter-spacing -0.02em** (matches Process heading).
- **Padding**: add proper top/bottom breathing room.
  - Mobile: `paddingTop: 96, paddingBottom: 96`.
  - Desktop sticky: replace the small 80px pinned header strip with a real header block (eyebrow + heading) sitting above the sticky pane, and give the sticky inner pane comfortable top padding so the slider/info don't touch the heading.
- **PinnedHeader**: rework so it can hold the larger heading; keep it inside the sticky container at the top with adequate height (~180px) and align the project panels below it (push their `paddingTop` accordingly).

### 2. Remove the numbers section
- Delete `<WhyReno />` import + usage from `src/routes/index.tsx`.
- Delete `src/components/sections/WhyReno.tsx`.
- (Keep `Stats.tsx` — it's the trust/numbers up top under the hero, which the user did not flag. I'll confirm below.)

### 3. Process section (`src/components/sections/Process.tsx`)
- Add proper **top padding** to the section. Currently the inner wrapper uses `pt-[40px] pb-[40px]` with `pt-0 pb-0` on the section. Change inner padding to roughly `pt-[96px] pb-[40px]` (or `py-[96px]` top, keep bottom modest as requested).

### 4. Footer (`src/components/sections/Footer.tsx`)
- **Logo**: increase from 28px → **44px** height.
- **Nav links**: switch the center column from vertical stack to **horizontal row** on desktop (and on mobile keep horizontal wrap if it fits, otherwise stacked).
- **Reduce overall height**:
  - `paddingTop: 72 → 48`
  - `paddingBottom: 48 → 32`
  - Legal bar `marginTop: 48 → 28`, `paddingTop: 24 → 20`
  - Tighten internal gaps (social row marginTop 24 → 18, tagline marginTop 16 → 12).

## Question before I implement

The user said "Completely remove the number section." There are two stat-heavy sections:

- `WhyReno` (`id="why-reno"`) — the dark editorial "98% / <10% / 4.9" block we built last turn.
- `Stats` — the upper "98% on-time delivery, 100+ vetted contractors, 200+ projects delivered" block right under the hero.

I'm planning to remove **only `WhyReno`**, since it's the most recent "numbers" section and the one most likely being referenced. Let me know if you actually want both gone.