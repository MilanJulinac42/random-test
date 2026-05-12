## Quiz form redesign

Rewrite `src/components/sections/Quiz.tsx` to match the spec exactly.

### Dependencies

Add **`react-phone-input-2`** (mature, MIT, includes built-in country search dropdown, flag emoji-equivalents via CSS sprite, and dial codes). Reasoning vs `react-international-phone`: `react-phone-input-2` ships with a search input and chevron in the country selector out of the box and is easier to style to spec.

```
bun add react-phone-input-2
```

Import its CSS in the component file:
```ts
import "react-phone-input-2/lib/style.css";
```

### State

Add `Got it` modal trigger via existing `submitted` state. Reuse `name`, `phone`, `unit`, `budget`, `errors`, `submitting`. Phone default value: `971` (UAE). On submit, `+` prefix is added by the library's `value` callback.

### Schema

Bump phone validation to `min(8, "Please enter a valid phone number")` since the library returns digits only (no formatting). Other fields unchanged.

### Layout (single column card)

Outer card replaces the current 2-column grid:
- `padding: 32px`, `border-radius: 12px`, `box-shadow: 0 4px 20px rgba(0,0,0,0.06)`, `background: white`, `border: 1px solid #ececec`, `max-width: 720px`, centered.
- All rows stack vertically with `gap: 24px` (use a flex column).

Remove `.reno-quiz-grid`/two-column CSS entirely.

### Row 1 — Name + Phone (2 cols on desktop, stack on mobile)

Wrapper grid: `gridTemplateColumns: 1fr 1fr; gap: 12px;` with mobile override to `1fr`.

- **Name**: standard `<input type="text">`, height 48px, border `1.5px solid #e0e0e0`, border-radius 8px, padding `0 14px`, font 14px, placeholder "Your name".
- **Phone**: `<PhoneInput country="ae" value={phone} onChange={setPhone} ... />` with custom CSS targeting:
  - `.react-tel-input .form-control` → height 48px, full width, font 14px, border `1.5px solid #e0e0e0`, border-radius 8px, padding-left 100px.
  - `.react-tel-input .flag-dropdown` → background `#f0f0f0`, border-right `1px solid #e0e0e0`, border-radius `8px 0 0 8px`, min-width 90px.
  - `.react-tel-input .selected-flag` → padding-left 14px, width 90px, includes flag + dial code (library shows both via `enableAreaCodes` + custom render? — actually we need code visible; achieve with `enableSearch buttonClass dropdownClass` config; library shows dial code on hover by default. Use `enableLongNumbers` + `disableCountryCode={false}`. To force the dial code to render in the selector button, use the `inputProps` and add `searchPlaceholder="Search country"` + `enableSearch`).
  - Library provides chevron arrow (`.arrow`) by default — restyle to ▾.
  - Country list: `.country-list` already has search at top when `enableSearch` is set; restyle background to white, scrollable.

Below each input: error message in `12px #e53935` if present.

### Row 2 — "What are you renovating?" photo cards

- Label: `What are you renovating?` — 13px, font-weight 600, margin-bottom 12px.
- Grid: `gridTemplateColumns: 1fr 1fr 1fr; gap: 12px;` with mobile → `1fr`.
- Each card is a `<button type="button">` with:
  - Outer: border `1.5px solid #e0e0e0`, border-radius 10px, overflow hidden, padding 0, background white, cursor pointer.
  - Image: `<img src=... height=140 style={objectFit:"cover", width:"100%"} loading="lazy" />` with the exact Unsplash URLs from the spec.
  - When selected: dark overlay div (`position: absolute; inset: 0; background: rgba(0,0,0,0.2);`) over the image, and a checkmark badge in the top-right corner of the image (28px filled black circle with white ✓ from `lucide-react`'s `Check`).
  - Label row: flex between, padding `10px 14px`, font 14px weight 600, with `Check` icon on right when selected.
  - Selected state: border `2px solid #111`. Compensate the 0.5px shift with `box-sizing` already default; use a wrapper to prevent layout jump (set border to 2px always but transparent → `border: 2px solid #e0e0e0` unselected, `2px solid #111` selected).

Three cards: Villa, Apartment, Landscape with the URL formats specified.

### Row 3 — "Your rough budget" pills

- Label: `Your rough budget` — 13px, font-weight 600, margin-bottom 12px.
- Wrapper: `display: flex; gap: 10px;` with mobile → `flex-direction: column`.
- Each pill: flex 1, height 52px, border-radius 8px, font-size 13px, font-weight 600.
  - Unselected: bg `#fafafa`, border `1.5px solid #d8d8d8`, color `#444`.
  - Selected: bg `#111`, border `1.5px solid #111`, color white.

### Row 4 — Submit + helper text

- Button: full-width, height 56px, bg `#111`, color white, border-radius 10px, font 16px weight 600, text "Get my assessment →".
- Helper line below: "We assess 15–20 new projects each month." — 12px, `#999`, centered, margin-top 12px.

### Validation errors

- 12px `#e53935`, displayed below the corresponding field/section.
- Validation runs on submit; `setErrors` populated and rendered inline.

### Success modal (replace existing `ConfirmationPopup`)

- Backdrop: fixed inset 0, `rgba(0,0,0,0.5)`, click closes.
- Card: white, border-radius 12px, padding `40px 32px`, max-width 400px, centered.
- Contents:
  - 56px filled black circle with white ✓ (lucide `Check` size 28).
  - "We've got your details." — 22px, font-weight 700.
  - "Expect a call within 24 hours from the Reno team." — 14px `#666`.
  - Tag row: `<div>` with `${unit} · ${budget}` text, 13px, bg `#f5f5f5`, padding `10px 20px`, border-radius 6px, inline-block.
  - "Got it" button: height 44px, padding `0 28px`, bg `#111`, white, border-radius 8px.
- Click on backdrop or "Got it" closes (resets `submitted` to false; do NOT clear field values so the user can re-submit if they want — same pattern as today).
- Keep existing focus management: focus-trap basics (focus the button on open, restore focus on close, lock body scroll, ESC closes).

### Mobile breakpoint

All `gridTemplateColumns` overrides handled in the inline `<style>` block at `@media (max-width: 767px)`:
- Name+Phone grid → 1 col
- Photo cards grid → 1 col
- Budget pills flex → column

Section heading + subtitle keep their current responsive sizing.

### Files touched

- `src/components/sections/Quiz.tsx` — full rewrite of the form body and modal.
- `package.json` / lockfile — add `react-phone-input-2`.

### Out of scope

- No DB schema changes — existing `lead_submissions` insert stays the same (`area: "—"`, `rooms: [unit]`, `budget`, `timeline: null`).
- No changes to other sections, the section heading copy, or `data-nav-theme`.
- No animation/Reveal changes beyond keeping the existing wrapper.
