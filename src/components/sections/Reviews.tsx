import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

type Testimonial = {
  stat: string;
  statLabel: string;
  photo: string;
  quote: string;
  name: string;
  location: string;
};

const testimonials: Testimonial[] = [
  {
    stat: "98%",
    statLabel: "Projects delivered on time",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop",
    quote:
      "Every payment was tied to a milestone we approved ourselves. No surprises, no chasing — exactly what we were promised.",
    name: "Fatima A.",
    location: "Villa · Arabian Ranches",
  },
  {
    stat: "4.9★",
    statLabel: "Average homeowner rating",
    photo: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=800&h=800&fit=crop",
    quote:
      "We were travelling for six weeks. The app meant we could see photos, approve decisions, and track costs from our phones. Completely in control.",
    name: "Khalid & Sara M.",
    location: "Apartment · Downtown Dubai",
  },
  {
    stat: "200+",
    statLabel: "Homes renovated across Dubai",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
    quote:
      "They finished two weeks early. I've never had a contractor deliver on time, let alone early. Reno is genuinely different.",
    name: "James R.",
    location: "Townhouse · JVC",
  },
];

export function Reviews() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-background px-6 md:px-12 lg:px-16 py-16 md:py-28 section-fade-bottom"
    >
      <div className="glow-aura-top left-aligned" aria-hidden />
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <p
              className="text-primary text-xs font-medium uppercase"
              style={{ letterSpacing: "0.25em" }}
            >
              Homeowner Stories
            </p>
            <h2
              className="text-foreground mt-4 text-4xl md:text-5xl lg:text-6xl"
              style={{ fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              Trusted Across Dubai
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <Carousel setApi={setApi} opts={{ loop: true, align: "start" }}>
            <CarouselContent>
              {testimonials.map((t) => (
                <CarouselItem key={t.name}>
                  <div className="grid md:grid-cols-12 gap-5 md:gap-6 items-stretch">
                    {/* Stat card */}
                    <div className="md:col-span-3 bg-card border border-border rounded-sh-lg p-8 md:p-10 flex flex-col justify-between min-h-[260px] md:min-h-0">
                      <div
                        className="text-foreground"
                        style={{
                          fontWeight: 700,
                          fontSize: "clamp(3rem, 6vw, 5rem)",
                          letterSpacing: "-0.04em",
                          lineHeight: 1,
                        }}
                      >
                        {t.stat}
                      </div>
                      <p className="text-muted-foreground text-sm md:text-base mt-6 leading-snug">
                        {t.statLabel}
                      </p>
                    </div>

                    {/* Portrait */}
                    <div className="md:col-span-4">
                      <div className="relative w-full aspect-square overflow-hidden rounded-sh-lg border border-border">
                        <img
                          src={t.photo}
                          alt={t.name}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="md:col-span-5 flex flex-col justify-between bg-card/40 border border-border rounded-sh-lg p-8 md:p-10">
                      <p
                        className="text-foreground text-2xl md:text-3xl lg:text-4xl leading-tight"
                        style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
                      >
                        “{t.quote}”
                      </p>
                      <div className="mt-8 pt-6 border-t border-border">
                        <p className="text-foreground text-base font-semibold">{t.name}</p>
                        <p className="text-muted-foreground text-sm mt-1">{t.location}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Controls */}
            <div className="flex items-center justify-between mt-10">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => api?.scrollTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      current === i ? "w-8 bg-primary" : "w-4 bg-border hover:bg-muted-foreground/40"
                    }`}
                  />
                ))}
              </div>

              {/* Arrows bottom-right */}
              <div className="relative flex items-center gap-3">
                <CarouselPrevious className="static translate-y-0 h-11 w-11 rounded-full bg-card border-border hover:bg-muted" />
                <CarouselNext className="static translate-y-0 h-11 w-11 rounded-full bg-card border-border hover:bg-muted" />
              </div>
            </div>
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}
