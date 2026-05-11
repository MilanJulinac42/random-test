## Replace Quiz with multi-step conversion form

Rewrite `src/components/sections/Quiz.tsx` only. Keep section id `quiz`, background, padding, and the existing Supabase `lead_submissions` insert. No other section changes.

### Section header (above the card)
- Eyebrow: `GET STARTED` — 10px, `letter-spacing: 0.1em`, uppercase, `#888`. (New — section currently has no eyebrow.)
- Heading: `What are you planning?` — keep existing size/weight (single line, drop the `<br>`).
- Subtext: existing copy, restyled to 14px, `#777`.

### Card shell
- Centered, `maxWidth: 560px`, white, `borderRadius: 20`, `border: 1px solid rgba(0,0,0,0.08)`, `padding: 40px 40px 36px`, no shadow.
- Top: 3-dot step indicator (8px circles, gap 8px, centered, `marginBottom: 28`). Active = filled `#1a1a1a`. Inactive = 1.5px `#D3D1C7` border, no fill.

### Local state
- `step: 1 | 2 | 3`
- `rooms: string[]`, `budget: string`, `name: string`, `phone: string`
- `errors: { rooms?, budget?, name?, phone? }`
- `shake: boolean` (Step 1 grid shake on invalid Next)
- `submitted: boolean` (controls confirmation popup)

### Step 1 — Room type
- Heading `What are you renovating?` (17/500), subtext `Select all that apply.` (13, secondary, `mb: 20`).
- 2×2 grid, `gap: 12`. Tile: `#F9F8F6` bg, 1.5px transparent border, `borderRadius: 14`, `padding: 20px 16px`, `height: 110`, flex column center, `gap: 10`.
- Selected: 1.5px `#1a1a1a` border, white bg.
- Tiles use lucide icons (closest to spec): `ChefHat` (Kitchen), `Bath` (Bathroom), `BedDouble` (Bedroom), `Building2` (Full home / Villa), 28px, `#444`.
- Label 13/500, primary, centered.
- Validation: ≥1 selected. Invalid Next → set `shake=true` for ~500ms (CSS keyframes class `reno-shake`) and inline error `Please select at least one space.` (12px, `#A32D2D`) below grid.
- CTA: full-width `Next →` button. Filled style `#1a1a1a`/white, `borderRadius: 10`, height 48, 15/500, hover `#333`, disabled opacity 0.4. `marginTop: 24`.

### Step 2 — Budget
- Heading `What's your rough budget?`, subtext `This helps us match you to the right scope and team.`
- Three stacked tiles, `gap: 10`. Same base style as Step 1 tile but `padding: 18px 20px`, flex row, space-between.
- Left: range label 15/500 primary. Right: descriptor 12/`#888`/400. Selected: 1.5px `#1a1a1a` border, white bg, descriptor → 500/primary.
- Radio behavior (single).
- Tiles: `AED 100k – 200k` / `Single room`; `AED 200k – 500k` / `Multi-room`; `AED 500k+` / `Full home / Villa`.
- Buttons row, `gap: 12`, `marginTop: 24`: `← Back` (40%, transparent, 1.5px `#D3D1C7`, primary) + `Next →` (60%, filled). Same 48px height / 10px radius.
- Validation: must select to proceed.

### Step 3 — Contact
- Heading `Where should we reach you?`, subtext `We'll call or WhatsApp you to confirm availability.`
- Inputs stacked, `gap: 12`. Style: 48px height, 10px radius, 1.5px `#D3D1C7`, `padding: 0 16px`, 15px, white. Focus → border `#1a1a1a`, no outline (CSS class).
  - Name: text, `autocomplete="given-name"`, placeholder `Your name`.
  - Phone: tel, `autocomplete="tel"`, placeholder `+971 — WhatsApp preferred`. Inline note below: `We'll send a confirmation message on WhatsApp.` (11px, `#888`, mt 4).
- Validation (Zod): `name` trim min 2; `phone` trim, regex `/^[+0][\d+\-()\s]{7,}$/` (starts with `+` or `0`, ≥8 chars total). Inline 12px `#A32D2D` errors below failing field.
- Fine print (centered, mt 16, 12px secondary): `We assess 15–20 new projects each month.`
- Buttons row mt 20: `← Back` (40%, secondary) + `Get my assessment →` (60%, filled).
- On valid submit: insert into Supabase `lead_submissions` (same shape as today: name, phone, area `"—"`, rooms, budget, timeline null), then hide the card and show the confirmation popup. Do NOT navigate or reload. Errors logged to console only (don't block UX, matches existing behavior).

### Confirmation popup
- Conditional render at section root when `submitted === true`. `position: fixed`, full-viewport overlay, `background: rgba(0,0,0,0.5)`, `zIndex: 100`, flex center.
- Card: `maxWidth: 480`, `width: 90vw`, white, `borderRadius: 20`, `padding: 40px 36px 36px`. `role="dialog"`, `aria-modal="true"`.
- Focus trap: on mount, focus the close link; on Escape or overlay click → close. Implemented with a `useEffect` adding a `keydown` listener and a focusable ref. Restore focus on close.
- Section 1 (Success):
  - Lucide `CircleCheck`, 40px, color `#3B6D11`, `mb: 16`.
  - `You're on the list.` — 20/500.
  - Para 1 (14, lh 1.7, secondary): `We've received your request and will confirm project availability within 24 hours. Expect a call or WhatsApp from the Reno team.`
  - Para 2: `We take on 15–20 new projects each month — if your project is a fit, we'll walk you through next steps on the call.`
- Divider: 1px `rgba(0,0,0,0.07)`, margin `24px 0`.
- Section 2 (App download):
  - Eyebrow `MANAGE YOUR PROJECT IN THE APP` — 10px, uppercase, `letter-spacing: 0.08em`, `#888`, `mb: 12`.
  - One-liner: `Track progress, approve milestones, and message your designer — all in one place.` (13, secondary, `mb: 20`).
  - Two pill buttons side-by-side, gap 10, each 50% width, `href="#"`. Style: `#F9F8F6` bg, 1.5px `#D3D1C7`, 10px radius, 44 height, 13/500, primary, flex center, gap 8.
    - Lucide `Apple` icon (18px) + `App Store`.
    - Lucide `Smartphone` icon (18px, no clean Play icon in lucide) + `Google Play`. (Note: spec says `ti-brand-google-play`; lucide doesn't ship a Google Play glyph — use `Smartphone` as the closest available primitive. Flag if user wants a custom inline SVG.)
  - Below: `No thanks, I'll check my WhatsApp` — 13, `#888`, centered, `mt: 16`, `cursor: pointer`. On click → close popup. Closing leaves form state intact (does not reset).

### Out of scope / preserved
- No changes to other sections, the section background `#F7F5F2`, or Supabase schema.
- Keep `WHATSAPP_POSTLEAD` import removed if unused after rewrite.
