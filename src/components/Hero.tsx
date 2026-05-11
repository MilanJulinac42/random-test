import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { FadeIn } from "@/components/FadeIn";
import hero1 from "@/assets/hero/hero-1.jpg";
import hero2 from "@/assets/hero/hero-2.jpg";
import hero3 from "@/assets/hero/hero-3.jpg";
import hero4 from "@/assets/hero/hero-4.jpeg";

const SLIDES = [
  { src: hero1, alt: "Modern living room with curved sofa and panoramic city view" },
  { src: hero2, alt: "Contemporary lounge with linear LED lighting and balcony" },
  { src: hero3, alt: "Minimal Japanese-inspired kitchen with oak millwork" },
  { src: hero4, alt: "Open-plan villa interior with marble accents and statement staircase" },
];

const SLIDE_INTERVAL = 5000;

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  const handleSelect = (i: number) => {
    setActive(i);
    setPaused(true);
    // Resume auto-advance after a short pause
    window.setTimeout(() => setPaused(false), 8000);
  };

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden flex flex-col bg-background text-foreground"
    >
      {/* Slideshow */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={i === active ? slide.alt : ""}
            aria-hidden={i !== active}
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: i === active ? 1 : 0,
              transition: "opacity 800ms ease-in-out",
            }}
          />
        ))}
      </div>
      {/* Legibility gradient — top-right transparent → bottom-left dark */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom left, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div className="glow-aura-bottom" aria-hidden />

      <div
        className="relative z-10 flex-1 flex flex-col justify-end pb-12 lg:pb-16 px-6 md:px-12 lg:px-16"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-end">
          {/* Left column */}
          <div className="max-w-3xl lg:max-w-none">
            <FadeIn delay={100}>
              <div
                className="liquid-glass rounded-sh-lg px-6 py-5 mb-6 inline-block"
                style={{ maxWidth: 280 }}
              >
                <p className="text-primary uppercase text-[11px] font-medium" style={{ letterSpacing: "0.2em" }}>
                  Why Reno
                </p>
                <p className="text-foreground text-lg md:text-xl mt-2" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
                  Design. Build. Deliver.
                </p>
                <p className="text-muted-foreground text-xs mt-2 leading-relaxed">
                  One team. One contract. Full accountability.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <p
                className="text-primary uppercase text-xs md:text-sm font-medium"
                style={{ letterSpacing: "0.2em" }}
              >
                End-to-end renovation in Dubai
              </p>
            </FadeIn>

            <AnimatedHeading
              text={"Your renovation, \nfully handled."}
              className="text-4xl md:text-5xl lg:text-6xl text-foreground mt-4"
              style={{ fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em" }}
              initialDelay={150}
            />

            <FadeIn delay={350}>
              <p className="text-muted-foreground text-base md:text-lg mt-5 leading-relaxed max-w-2xl">
                We manage the designers, contractors, and payments with{"\n"}daily photo updates and a written on-time guarantee.
              </p>
            </FadeIn>

            <FadeIn delay={550}>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a
                  href="#quiz"
                  className="reno-btn-purple reno-cta inline-flex items-center justify-center rounded-sh px-7 font-semibold text-sm"
                  style={{ height: 52 }}
                >
                  Check availability →
                </a>
              </div>
            </FadeIn>

          </div>
        </div>
      </div>

      {/* Bottom-right stack: thumbnails above, scroll indicator below (8px gap) */}
      <div className="absolute z-20 bottom-6 right-4 md:right-6 flex flex-col items-end gap-2">
        <div
          className="liquid-glass rounded-sh p-2 flex gap-2"
          role="tablist"
          aria-label="Hero slideshow thumbnails"
        >
          {SLIDES.map((slide, i) => {
            const isActive = i === active;
            return (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show slide ${i + 1}`}
                onClick={() => handleSelect(i)}
                className="rounded-sh overflow-hidden transition-all"
                style={{
                  width: 64,
                  height: 44,
                  opacity: isActive ? 1 : 0.6,
                  outline: isActive ? "2px solid hsl(var(--primary))" : "1px solid rgba(255,255,255,0.2)",
                  outlineOffset: 0,
                }}
              >
                <img
                  src={slide.src}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>

        <a
          href="#gallery"
          aria-label="Scroll down"
          className="reno-bounce text-primary inline-flex items-center justify-center"
        >
          <ChevronDown size={28} />
        </a>
      </div>
    </section>
  );
}
