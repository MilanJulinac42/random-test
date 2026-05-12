All changes are mobile-only (≤768px). Desktop layouts are untouched.

## 1. `Stats.tsx` — three stats inline, compact

- On mobile, render all three stats (`98%`, `100+`, `200+`) as a single horizontal row, equal width, center-aligned. Replace the current stacked LeftStat / large gradient CardStat with a unified compact 3-column flex/grid for mobile only.
- Numbers shrink to `clamp(28px, 9vw, 40px)`, labels to `11–12px`, max 2 lines, center-aligned.
- Eyebrow ("Trusted by Dubai Homeowners"): center-align on mobile, `12px`, single-line, allow wrap to max 2 lines if needed but tighten letter-spacing so it fits one line at 390px.
- Section vertical padding on mobile: `48px` top/bottom (was 80+).
- Desktop grid + gradient card preserved via `hidden md:` / `md:hidden` split.

## 2. `Quiz.tsx` — borderless, full-width form

- On mobile: section horizontal padding `24px` (override the current `px-6` which is already 24, but also override the form's internal `clamp(28px,5vw,48px)` padding down to `0` on mobile).
- Form: remove `border` and `boxShadow` on mobile; remove `borderRadius` so it sits flush; `background: transparent`; `maxWidth: 100%`.
- Heading "Tell us about your project." — cap at 2 lines; mobile size `clamp(28px, 8vw, 36px)`.
- Subhead: `15px` on mobile, single short paragraph.
- Inputs/buttons keep current styling (already full-width).

## 3. `Process.tsx` ("How It Works") — less crowded mobile

- Mobile container padding: collapse the desktop `pl-[80px] pr-[80px]` so it does not leak into mobile (use responsive classes: `px-6 md:pl-[80px] md:pr-[80px]`).
- Eyebrow + heading center-aligned on mobile; heading max 2 lines, `clamp(30px, 8vw, 40px)`.
- Mobile cards: change `aspectRatio: "4 / 5"` → `"3 / 4"` (a touch shorter), increase gap between cards to `20px`, add `marginTop: 32`.
- Section gets `paddingBottom: 48px` on mobile so it doesn't crowd into the next section.

## 4. `Reviews.tsx` — roomier mobile testimonial cards

- Section vertical padding on mobile: `64px` top/bottom (currently `clamp(80px,10vw,140px)` = 80px, fine but feels tight given header). Reduce header → cards gap by tightening header.
- Header row center-aligned on mobile (currently left).
- Heading "Hear it directly from them": mobile `clamp(28px, 8vw, 36px)`, max 2 lines.
- Stat pill (`200+ Happy Clients`): center it on mobile, reduce number to `48px`, padding `14px 24px`.
- Mobile carousel cards: keep horizontal scroll; reduce card `padding` to `22px`, `minHeight: 300px`, quote font `14px`.

## 5. `TrustBar.tsx` — single horizontal line on mobile

- Replace the mobile `grid grid-cols-2` block with the same horizontal flex layout used on desktop, but compacted: icons `16px`, labels `10–11px`, gap `8px`, no dividers, allow horizontal scroll if it overflows (`overflow-x-auto no-scrollbar`, `whitespace-nowrap`).
- Section padding: `py-5` on mobile.

## Technical notes

- All changes scoped via Tailwind responsive prefixes (`md:hidden`, `md:flex`, etc.) and inline `@media (max-width: 767px)` overrides in component-local `<style>` blocks where inline styles need to differ between breakpoints.
- No business logic, schema, or copy changes (except trimming where lines must shorten).
- Brand purple `#482FFF` preserved.
