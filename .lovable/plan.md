## Goal

Replace the 3-step wizard in `src/components/sections/Quiz.tsx` with a **single-screen, center-aligned, clean bordered form** on a pure white section background. No glass, no slider, no steps.

## Layout (single screen, center-aligned)

```text
                       GET STARTED
                Tell us about your project.
       One short form. We call back within 24 hours.

      ┌────────────── bordered card ──────────────┐
      │                                           │
      │  ┌─ Name ──────┐  ┌─ Phone (+971) ─────┐  │
      │  └─────────────┘  └────────────────────┘  │
      │                                           │
      │         What are you renovating?          │
      │   [🏠 Villa] [🏢 Apartment] [🌿 Landscape]│
      │                                           │
      │              Rough budget                 │
      │      ┌─────────────────────────────┐      │
      │      │  AED 100K – 500K            │      │
      │      ├─────────────────────────────┤      │
      │      │  AED 500K – 1.5M            │      │
      │      ├─────────────────────────────┤      │
      │      │  AED 1.5M+                  │      │
      │      └─────────────────────────────┘      │
      │                                           │
      │        [   Get my assessment →   ]        │
      └───────────────────────────────────────────┘
```

Everything from the eyebrow `GET STARTED` down through every label, chip group, and button is horizontally centered.

## Design language

- **Section**: pure white background `#FFFFFF`, generous vertical padding (`clamp(80px, 10vw, 140px)`), no glow, no glass
- **Card**: white fill, 1px solid `#E6E4DD` border, `border-radius: 20px`, `padding: clamp(32px, 5vw, 48px)`, `max-width: 640px`, centered with `mx-auto`. Subtle `0 1px 2px rgba(0,0,0,0.04)` shadow only — clean, not floating
- **Headline**: `clamp(36–52px)`, weight 700, color `#0D0D0D`, tracking -0.02em, centered
- **Subheadline**: 16–18px, color `#555`, centered, max-width ~520px
- **Inputs (Name / Phone)**: 56px tall, white fill, 1px `#D3D1C7` border, `border-radius: 12px`, focus border `#0D0D0D`. Two columns on desktop, stacked on mobile. Phone has a `+971` prefix affordance
- **Renovation chips (Villa / Apartment / Landscape)**: pill buttons with icon + label, single-select. Inactive = white with `#D3D1C7` border, dark text. Active = `#0D0D0D` fill, white text. Centered row, wraps on mobile
  - Icons: `Building2` (Villa), `Building` (Apartment), `Trees` (Landscape) from lucide-react
- **Budget options (3 stacked cards)**: full-width buttons inside the card, single-select radio behavior. Inactive = `#F9F8F6` fill, transparent border. Active = white fill with 1.5px `#0D0D0D` border. Each shows the AED range, centered text
  - `AED 100K – 500K`
  - `AED 500K – 1.5M`
  - `AED 1.5M+`
- **Submit**: full-width inside the card, 56px tall, `#0D0D0D` fill, white text, `border-radius: 12px`, hover lifts to `#333`

## Behavior

- All questions visible at once; no Next/Back, no step dots
- Validation runs on submit only — inline red helper text under each missing field
- `unit` (Villa/Apartment/Landscape) replaces previous `rooms[]`, stored as a single-item array to keep the existing `lead_submissions.rooms` column unchanged
- `budget` stores the selected range string (`"AED 100K – 500K"` etc.) — same column, just new option strings
- Reuses the existing `ConfirmationPopup` and the existing `supabase.from("lead_submissions").insert(...)` call exactly as-is
- Section keeps `id="quiz"` and `data-nav-theme="light"`

## Files

- `src/components/sections/Quiz.tsx` — rewrite the form portion only; keep `ConfirmationPopup`, the contact `zod` schema, and the Supabase submit logic intact

No DB changes, no new dependencies, no other components touched.
