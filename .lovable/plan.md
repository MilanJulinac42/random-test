## Goal

Reskin the homepage hero (`src/components/Hero.tsx`) to match the reference: a single full-bleed image card with rounded corners, a custom top bar baked into the hero, and a bottom row containing the slideshow thumbnails (left) and a CTA cluster (right). The global `Navbar` is hidden on `/` only.

## Layout

```text
┌──────────────────────────────────────────────────────────────────┐
│  [IG] [LI]            [ Reno logo ]            [ Chat with us ]  │  ← top bar (inside hero)
│                                                                  │
│   One-stop                                                       │
│   Renovation Platform                                            │  ← H1 + subheader, left-aligned
│   We manage designers, contractors…                              │
│                                                                  │
│                                                                  │
│  [thumb][thumb][thumb][thumb]      Get a written quote in 60s    │  ← bottom row
│                                    [Check availability] [Download app]
└──────────────────────────────────────────────────────────────────┘
```

- Top bar lives inside the hero, no separate `<Navbar />` on `/`.
- Logo centered horizontally (absolute-positioned so flex sides don't push it off-center).
- Top-left: Instagram + LinkedIn icon buttons (reusing `SocialIcons` + `INSTAGRAM_URL` / `LINKEDIN_URL` from `lib/constants`).
- Top-right: existing "Chat With Us" pill, links to `WHATSAPP_GENERAL`.
- Headline + subheader pinned to bottom-left area above the action row, same copy + `AnimatedHeading` / `FadeIn` treatment as today.
- Bottom-left: the existing 4-thumbnail slideshow selector, moved from bottom-right. Keep keyboard/aria roles, active outline, and 8s pause-on-click behavior.
- Bottom-right: small subheading line on top, then two CTAs side-by-side.
  - Primary: "Check availability →" (purple `reno-btn-purple`, links to `#quiz`).
  - Secondary: "Download app" (glass/outline button, links to `#` for now — confirm target later).
- Scroll-down chevron: keep, anchored bottom-center under the action row, `hidden md:flex` (unchanged behavior).

## Responsive

- **Desktop (≥md):** layout as drawn above. Hero is `min-h-screen` with `px-6 md:px-12` inner padding.
- **Tablet:** same structure; bottom row wraps so thumbs stay left and CTA cluster drops below if needed.
- **Mobile (<md):**
  - Top bar: socials hidden, logo centered, "Chat" collapses to the existing `MessageCircle` icon button.
  - Thumbnails hidden (matches the prior `hidden md:flex` rule we already shipped).
  - CTAs stack full-width; subheading sits above them.
  - Headline uses existing `clamp(48px, 7vw, 72px)` sizing.

## Files to change

1. **`src/components/Hero.tsx`** — rewrite JSX structure per layout above. Reuse existing `SLIDES`, slideshow effect, `AnimatedHeading`, `FadeIn`, glass classes, and `reno-btn-purple` styling. No new dependencies.
2. **`src/routes/index.tsx`** — remove `<Navbar />` from the homepage render (Hero now owns the top bar). Leave `Navbar` import/usage intact for any other route that may use it.
3. No CSS-token or `styles.css` changes expected; reuse `liquid-glass`, `rounded-sh`, `reno-btn-purple`, and existing color tokens.

## Out of scope

- No changes to other sections (`Stats`, `Gallery`, `Quiz`, etc.).
- No new routes, no backend changes.
- "Download app" target URL is a placeholder `#` — can be wired to a real link in a follow-up.

## Open question (non-blocking)

- Subheading text above the CTAs — suggest "Get a written quote in 60 seconds." Will use that unless you'd prefer different copy.
