

## Plan — Logo, socials, hero copy, backgrounds, footer, FAB

### 1. Logo swap (`Navbar.tsx` + `Footer.tsx`)
- Copy `user-uploads://Logo-06.png` → `src/assets/logo.png`.
- Replace the "Reno" text + "Dubai" pill in Navbar with `<img src={logo} alt="Reno" className="h-7 md:h-8 w-auto" />`.
- Same swap in Footer (slightly larger, `h-9`).

### 2. Filled social icons (`Navbar.tsx` + `Footer.tsx`)
Lucide's `Linkedin`/`Instagram` are stroke-only. Replace with inline SVG brand glyphs filled white (`fill="currentColor"`, `text-white`), hover `text-primary`. Single small `SocialIcons.tsx` helper with `<LinkedInIcon />` and `<InstagramIcon />` exports to reuse in Navbar + Footer.

### 3. Hero body — no truncation (`Hero.tsx`)
Remove `line-clamp-2` from the subhead `<p>`. Let it wrap naturally. Keep `max-w-2xl` so it doesn't span the full width awkwardly on `lg+`.

### 4. Unified `#1A1A1A` background
Audit every section (`Stats`, `Gallery`, `Quiz`, `WhyReno`, `Process`, `Reviews`, `TrustBar`, `FinalCTA`, `Footer`) and remove any `bg-card`, `bg-secondary`, `bg-muted`, gradient overlays, or off-black backgrounds at the section level. All sections inherit `bg-background` (`#1A1A1A`). Cards within sections keep their `bg-card` for elevation contrast — only the section backdrops are unified.

### 5. Minimal footer (`Footer.tsx`)
Rewrite to a single clean layout:
- Left: logo image + 1-line tagline ("Dubai's Home Renovation Platform").
- Middle: short About paragraph (2 lines max).
- Right: address block — `101, EIB Building, Dubai Media City, Dubai, UAE` + social icons (LinkedIn, Instagram) below.
- Bottom row: copyright + Privacy/Terms.
- Remove the 4-column Company / Homeowners / Contact link grid entirely.

### 6. Restyled WhatsApp FAB (`WhatsAppFAB.tsx`)
Replace bright green circle with a refined pill:
- Glass surface (`liquid-glass`), rounded-full, `px-5 py-3`.
- WhatsApp glyph (white) + "Chat with us" label (hidden on mobile, visible `md+`).
- Subtle indigo glow on hover (`box-shadow: 0 0 24px hsl(var(--primary)/0.4)`).
- Keep pulse dot but recolor to `hsl(var(--primary))`.
- Mobile: icon-only circular glass button (56px).

### Files touched
- New: `src/assets/logo.png`, `src/components/SocialIcons.tsx`
- Modified: `src/components/Navbar.tsx`, `src/components/Hero.tsx`, `src/components/WhatsAppFAB.tsx`, `src/components/sections/Footer.tsx`, `src/components/sections/{Stats,Gallery,Quiz,WhyReno,Process,Reviews,TrustBar,FinalCTA}.tsx` (background audit only).

### Out of scope
- No real social URLs (still placeholders).
- No light-mode adjustments.

