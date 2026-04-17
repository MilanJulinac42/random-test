

## Plan — Hero refinements + darker background

### 1. Background color (`src/styles.css`)
Current dark bg is `240 9% 12%` ≈ **#1C1C21** (Obsidian from RENO spec).
Switch `.dark --background` to `#1A1A1A` → HSL `0 0% 10%`. Also nudge `--card` to `0 0% 13%` and `--secondary`/`--muted` to `0 0% 15%` to keep the elevation hierarchy readable against the new base. Border stays neutral (`0 0% 20%`).

### 2. Heading in 2 lines (`src/components/Hero.tsx`)
Change `AnimatedHeading` text from:
```
"Transform Your Home.\nNo Stress. No Surprises."
```
to the same string (already 2 lines via `\n`). The wrapping to 4 lines is caused by the responsive font size + container width. Fix by:
- Adding `whitespace-nowrap` to each line span inside `AnimatedHeading` (each `<span className="block">` gets `whitespace-nowrap`), OR simpler: add `whitespace-nowrap` via a new optional `lineClassName` prop and pass it from Hero.
- Reduce heading max size slightly on `xl` (`xl:text-6xl` instead of `xl:text-7xl`) so "No Stress. No Surprises." fits on one line at 1064px viewport without overflow.
- Allow horizontal room: change left column from `max-w-2xl` to `max-w-3xl lg:max-w-none` and let the 2-col grid breathe.

### 3. Hero body copy in 2 lines (`src/components/Hero.tsx`)
Current subhead is one long paragraph that wraps to 3–4 lines. Rewrite to a tight 2-line version, then force exactly 2 lines using `line-clamp-2` + `max-w-none` removed so it spans naturally:
- New copy (shorter): *"End-to-end renovation by expert designers and vetted contractors — milestone-based payments, fully managed. Projects from AED 275k to 920k."*
- Apply `line-clamp-2` so any width still renders 2 lines max.
- Remove `max-w-xl` constraint.

### 4. CTA cleanup (`src/components/Hero.tsx` + `src/components/Navbar.tsx`)
- **Hero**: remove the second "WhatsApp Us ↗" button. Only "Check Project Availability →" remains (primary indigo CTA).
- **Navbar**: restyle "Contact Us" to match the removed Hero WhatsApp button — `liquid-glass` background, `border-white/15`, white text, hover `bg-white/10`. Same height/padding feel as nav (h-9, px-4, text-[13px]). Mobile icon button gets the same glass treatment.

### Files touched
- `src/styles.css` — dark token values
- `src/components/Hero.tsx` — heading sizing/wrap, subhead copy + clamp, remove WhatsApp button
- `src/components/AnimatedHeading.tsx` — add optional `lineClassName` prop for `whitespace-nowrap`
- `src/components/Navbar.tsx` — Contact Us → liquid-glass style (desktop + mobile)

### Out of scope
- No layout changes to Stats, Reviews, or other sections.
- No light-mode adjustments.

