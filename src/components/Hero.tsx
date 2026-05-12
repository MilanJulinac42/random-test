import { ChevronDown, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { FadeIn } from "@/components/FadeIn";
import { LinkedInIcon, InstagramIcon } from "@/components/SocialIcons";
import { WHATSAPP_GENERAL, LINKEDIN_URL, INSTAGRAM_URL } from "@/lib/constants";
import logoLight from "@/assets/logo.png";
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
    window.setTimeout(() => setPaused(false), 8000);
  };

  return (
    <section
      id="top"
      className="relative w-full overflow-hidden"
      style={{ background: "#0D0D0D", minHeight: "100vh" }}
    >
      {/* Diagonally-offset rounded card. Sized larger than the viewport so
          its top-left and bottom-right corners bleed off-screen, leaving
          only the top-right and bottom-left rounded corners visible. */}
      <div
        className="hero-card absolute overflow-hidden rounded-[24px]"
        style={{
          top: "calc(-1 * var(--hero-bleed))",
          left: "calc(-1 * var(--hero-bleed))",
          width: "calc(100% + 2 * var(--hero-bleed))",
          height: "calc(100% + 2 * var(--hero-bleed))",
        }}
      >
        {/* Slideshow */}
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

        {/* Legibility gradient */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom left, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        <div className="glow-aura-bottom" aria-hidden />
      </div>

      {/* Foreground content layer — viewport-relative, NOT translated with the
          card, so everything sits flush with the visible viewport edges. */}
      <div
        className="relative z-20 flex flex-col"
        style={{ minHeight: "100vh" }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 md:px-8 pt-4 md:pt-6">
          {/* Left: socials */}
          <div className="flex items-center gap-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="liquid-glass hidden md:inline-flex items-center justify-center rounded-sh hover:opacity-80"
              style={{ width: 40, height: 40, color: "#FFFFFF" }}
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="liquid-glass hidden md:inline-flex items-center justify-center rounded-sh hover:opacity-80"
              style={{ width: 40, height: 40, color: "#FFFFFF" }}
            >
              <LinkedInIcon size={18} />
            </a>
          </div>

          {/* Center: logo */}
          <a
            href="#top"
            aria-label="Reno home"
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
          >
            <img src={logoLight} alt="Reno" className="h-10 md:h-12 lg:h-14 w-auto" />
          </a>

          {/* Right: chat */}
          <a
            href={WHATSAPP_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass hidden md:inline-flex items-center rounded-sh hover:bg-white/10"
            style={{
              fontSize: 13,
              fontWeight: 500,
              padding: "8px 16px",
              height: 40,
              color: "#FFFFFF",
            }}
          >
            Chat With Us
          </a>
          <a
            href={WHATSAPP_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
            className="liquid-glass md:hidden inline-flex items-center justify-center rounded-sh hover:bg-white/10"
            style={{ width: 40, height: 40, color: "#FFFFFF" }}
          >
            <MessageCircle size={16} />
          </a>
        </div>

        {/* Headline area */}
        <div className="flex-1 flex flex-col justify-end pb-8 md:pb-12 px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <FadeIn delay={150}>
              <p
                className="text-primary uppercase font-medium"
                style={{ letterSpacing: "0.22em", fontSize: "14px" }}
              >
                End-to-end renovation in Dubai
              </p>
            </FadeIn>

            <AnimatedHeading
              text={"One-stop \nRenovation Platform"}
              className="text-white mt-3"
              style={{
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                fontSize: "clamp(48px, 7vw, 72px)",
              }}
              initialDelay={150}
            />

            <FadeIn delay={350}>
              <p
                className="mt-6 max-w-2xl"
                style={{
                  fontSize: "clamp(18px, 1.4vw, 20px)",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.78)",
                }}
              >
                We manage the designers, contractors, and payments with{"\n"}daily photo updates and a written on-time guarantee.
              </p>
            </FadeIn>
          </div>

          {/* Bottom row: thumbs (left) + CTA cluster (right) */}
          <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* Thumbnails */}
            <div
              className="liquid-glass rounded-sh p-2 hidden md:flex gap-2 self-start"
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
                      width: 72,
                      height: 50,
                      opacity: isActive ? 1 : 0.6,
                      outline: isActive
                        ? "2px solid hsl(var(--primary))"
                        : "1px solid rgba(255,255,255,0.2)",
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

            {/* CTA cluster */}
            <FadeIn delay={550} className="md:text-right w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
                <a
                  href="#quiz"
                  className="reno-btn-purple reno-cta inline-flex items-center justify-center rounded-sh font-semibold"
                  style={{ height: 56, padding: "0 28px", fontSize: 16 }}
                >
                  Check availability →
                </a>
                <a
                  href="#"
                  className="liquid-glass inline-flex items-center justify-center rounded-sh font-semibold hover:bg-white/10"
                  style={{
                    height: 56,
                    padding: "0 28px",
                    fontSize: 16,
                    color: "#FFFFFF",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  Download app
                </a>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#gallery"
          aria-label="Scroll down"
          className="absolute z-20 bottom-4 left-1/2 -translate-x-1/2 reno-bounce text-primary hidden md:inline-flex items-center justify-center"
        >
          <ChevronDown size={28} />
        </a>
      </div>

      <style>{`
        .hero-card { --hero-bleed: 16px; }
        @media (min-width: 768px) { .hero-card { --hero-bleed: 56px; } }
      `}</style>
    </section>
  );
}
