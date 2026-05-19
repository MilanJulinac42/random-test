import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { prefersReducedMotion, RENO_EASE } from "@/lib/anime";
import { WordReveal } from "@/components/WordReveal";
import { ArrowButton } from "@/components/ArrowButton";
import hero1 from "@/assets/hero/hero-1.png";
import hero2 from "@/assets/hero/hero-2.png";
import hero3 from "@/assets/hero/hero-3.png";
import hero4 from "@/assets/hero/hero-4.png";

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
  const slideRefs = useRef<(HTMLImageElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement | null>(null);

  /* Auto-advance the background slideshow. */
  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      SLIDE_INTERVAL,
    );
    return () => clearInterval(id);
  }, [paused]);

  /* Crossfade the background between slides with Anime.js when `active` changes. */
  useEffect(() => {
    slideRefs.current.forEach((img, i) => {
      if (!img) return;
      if (prefersReducedMotion()) {
        img.style.opacity = i === active ? "1" : "0";
        return;
      }
      animate(img, {
        opacity: i === active ? 1 : 0,
        duration: 900,
        ease: RENO_EASE,
      });
    });
  }, [active]);

  /* Entrance: stagger the foreground content in on mount. */
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const items = root.querySelectorAll<HTMLElement>("[data-hero-anim]");
    if (!items.length) return;

    if (prefersReducedMotion()) {
      items.forEach((el) => (el.style.opacity = "1"));
      return;
    }

    items.forEach((el) => (el.style.opacity = "0"));
    animate(items, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 900,
      delay: (_el: HTMLElement, i: number) => 200 + i * 120,
      ease: RENO_EASE,
    });

    // Watchdog: guarantee the hero content appears even if the
    // animation loop can't run (e.g. loaded in a background tab).
    const watchdog = setTimeout(() => {
      items.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    }, 200 + items.length * 120 + 900 + 400);
    return () => clearTimeout(watchdog);
  }, []);

  const handleSelect = (i: number) => {
    setActive(i);
    setPaused(true);
    window.setTimeout(() => setPaused(false), 8000);
  };

  return (
    <section
      id="top"
      data-nav-theme="dark"
      className="relative w-full overflow-hidden"
      style={{ background: "#0A0A0A", minHeight: "100vh" }}
    >
      {/* Background image card — inset from the black artboard edge, rounded on desktop.
          Mobile (≤767px) goes full-bleed: no inset, no radius. */}
      <div
        className="reno-hero-card absolute overflow-hidden"
        style={{
          top: "clamp(8px, 1.2vw, 15px)",
          left: "clamp(8px, 1.2vw, 15px)",
          right: "clamp(8px, 1.2vw, 15px)",
          bottom: "clamp(8px, 1.2vw, 15px)",
          borderRadius: 24,
        }}
      >
        {SLIDES.map((slide, i) => (
          <img
            key={slide.src}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            src={slide.src}
            alt={i === active ? slide.alt : ""}
            aria-hidden={i !== active}
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: i === 0 ? 1 : 0 }}
          />
        ))}

        {/* Legibility gradients — dark on the left (per Paper) plus a soft
            bottom wash so the carousel + caption stay readable. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.58) 44%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 32%)",
          }}
        />
      </div>

      {/* Foreground content — viewport-relative, anchored to the bottom. */}
      <div
        ref={contentRef}
        className="reno-hero-fg relative z-10 flex flex-col justify-end px-6 md:px-12 lg:px-20"
        style={{
          minHeight: "100vh",
          paddingBottom: "var(--hero-pad-bottom)",
          paddingTop: 120,
        }}
      >
        {/* Headline block */}
        <div className="flex flex-col" style={{ gap: 20, maxWidth: 640 }}>
          <p
            data-hero-anim
            className="uppercase"
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(13px, 1.4vw, 20px)",
              fontWeight: 500,
              letterSpacing: "0.08em",
              lineHeight: 1.2,
            }}
          >
            End to end renovation in Dubai
          </p>

          <h1
            style={{
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: "clamp(40px, 6.5vw, 64px)",
              lineHeight: 1.22,
              letterSpacing: "-0.02em",
            }}
          >
            <WordReveal
              as="span"
              variant="slide-up"
              trigger="mount"
              delay={320}
              staggerMs={80}
              style={{ display: "block" }}
            >
              Modernize your home
            </WordReveal>
            <WordReveal
              as="span"
              variant="slide-up"
              trigger="mount"
              delay={400}
              staggerMs={80}
              style={{ display: "block" }}
            >
              without the stress
            </WordReveal>
          </h1>

          <div data-hero-anim className="self-start">
            <ArrowButton as="a" href="#quiz" variant="light-on-dark" hideArrow style={{ width: 320, padding: "8px 24px" }}>
              Check availability
            </ArrowButton>
          </div>
        </div>

        {/* Bottom row — carousel (left) + caption (right) */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between"
          style={{ marginTop: "clamp(40px, 7vw, 88px)", gap: 32 }}
        >
          {/* Carousel — selecting a thumbnail swaps the background image. Hidden on mobile. */}
          <div
            data-hero-anim
            role="tablist"
            aria-label="Featured project images"
            className="reno-hero-thumbs flex"
            style={{ gap: 12 }}
          >
            {SLIDES.map((slide, i) => {
              const isActive = i === active;
              return (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show project image ${i + 1}`}
                  onClick={() => handleSelect(i)}
                  className="overflow-hidden"
                  style={{
                    width: "var(--hero-thumb)",
                    height: "var(--hero-thumb-h)",
                    borderRadius: 12,
                    flexShrink: 0,
                    cursor: "pointer",
                    opacity: isActive ? 1 : 0.55,
                    outline: isActive
                      ? "2px solid #FFFFFF"
                      : "1px solid rgba(255,255,255,0.25)",
                    outlineOffset: 0,
                    transition: "opacity 300ms ease, outline-color 300ms ease",
                  }}
                >
                  <img
                    src={slide.src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              );
            })}
          </div>

          {/* Caption */}
          <p
            data-hero-anim
            className="reno-hero-caption md:text-right"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "clamp(15px, 1.3vw, 20px)",
              fontWeight: 500,
              lineHeight: 1.4,
              maxWidth: 640,
            }}
          >
            Specializing in AED 500k– AED 1.5 M transformations
            <br />
            for homeowners who value precision over the lowest bid.
          </p>
        </div>
      </div>

      <style>{`
        #top {
          --hero-inset: 10px;
          --hero-pad-bottom: 24px;
          --hero-thumb: 72px;
          --hero-thumb-h: 46px;
        }
        @media (min-width: 768px) {
          #top {
            --hero-inset: 15px;
            --hero-pad-bottom: 28px;
            --hero-thumb: 100px;
            --hero-thumb-h: 62px;
          }
        }
        @media (max-width: 767px) {
          .reno-hero-card {
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            border-radius: 0 !important;
          }
          .reno-hero-thumbs { display: none !important; }
          .reno-hero-fg {
            align-items: center;
            text-align: center;
          }
          .reno-hero-fg > div:first-of-type {
            align-items: center;
            text-align: center;
          }
          .reno-hero-fg > div:first-of-type > .self-start {
            align-self: center !important;
          }
          .reno-hero-caption {
            text-align: center !important;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
