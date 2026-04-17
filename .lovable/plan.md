

## Plan — Carousel testimonials (Emily Hayes style)

### New layout per slide
A 3-column horizontal layout matching the reference image:
- **Left (col 1)**: Light card with big stat number (e.g. "98%", "4.9★", "200+") + small label underneath ("Projects delivered on time", etc.).
- **Middle (col 2)**: Square portrait photo of the homeowner.
- **Right (col 3)**: Large quote in serif-feeling weight, followed by name + location below.

On mobile: stack vertically (stat → photo → quote).

### Carousel mechanics
- Use existing `src/components/ui/carousel.tsx` (Embla, already installed).
- One testimonial per slide, full width.
- Left/right arrow buttons positioned bottom-right of section (clean, minimal, like the reference).
- Dot indicators centered below.
- Optional: keyboard arrow support (built into Embla wrapper already).

### Content (3 testimonials, reuse existing quotes)
| Stat | Label | Name | Location | Photo |
|---|---|---|---|---|
| 98% | On-time delivery | Fatima A. | Arabian Ranches | Unsplash portrait 1 |
| 4.9★ | Average homeowner rating | Khalid & Sara M. | Downtown Dubai | Unsplash portrait 2 |
| 200+ | Homes renovated | James R. | JVC | Unsplash portrait 3 |

Photos: Unsplash hotlinks (`?w=800&h=800&fit=crop`) — same approach as Gallery section.

### Section structure (`Reviews.tsx` rewrite)
```
<section> (keep glow-aura-top, section-fade-bottom, bg-background)
  <eyebrow>Homeowner Stories</eyebrow>
  <h2>Trusted Across Dubai</h2>            ← centered, max-w-2xl
  
  <Carousel>
    <CarouselContent>
      <CarouselItem>            ← per testimonial
        <grid 3-col>
          <StatCard />          ← bg-card, rounded-sh-lg, p-10, large number
          <PortraitCard />      ← aspect-square, rounded-sh-lg, object-cover
          <QuoteBlock />        ← text-3xl/4xl quote + name/location
        </grid>
      </CarouselItem>
    </CarouselContent>
    <controls bottom-right>
      <CarouselPrevious /> <CarouselNext />
    </controls>
  </Carousel>
</section>
```

### Removed
- Google rating block (★★★★★ · 4.9 · 140+ reviews) and `GoogleIcon` SVG.
- Sticky left-column heading layout.
- Old vertical 3-card stack.

### Files touched
- `src/components/sections/Reviews.tsx` — full rewrite.

### Out of scope
- No autoplay (user controls pacing).
- No new testimonial data fields beyond stat/photo/quote/name/location.
- No changes to other sections.

