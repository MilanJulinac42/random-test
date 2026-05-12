import { ChevronDown, MessageCircle } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
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

// Carve concave quarter-circle notches at top-left and bottom-right of the
// hero card so the floating socials/CTA clusters appear to tuck into the card.
// Two full-element radial gradients (each transparent in one corner-circle,
// opaque everywhere else) intersected = opaque everywhere except both corners.
const NOTCH = 56; // px, matches --notch-radius
const maskLayers = [
  `radial-gradient(circle ${NOTCH}px at 0 0, transparent 99%, #000 100%)`,
  `radial-gradient(circle ${NOTCH}px at 100% 100%, transparent 99%, #000 100%)`,
].join(", ");
const cardMaskStyle: CSSProperties = {
  WebkitMaskImage: maskLayers,
  WebkitMaskComposite: "source-in",
  maskImage: maskLayers,
  maskComposite: "intersect",
};

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
      className="relative w-full bg-background text-foreground p-0 md:p-3 lg:p-4"
    >
      {/* Floating: socials (tucks into top-left notch on desktop) */}
      <div className="hidden md:flex absolute z-30 top-3 lg:top-4 left-3 lg:left-4 items-center gap-2">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="liquid-glass inline-flex items-center justify-center rounded-sh hover:opacity-80"
          style={{ width: 40, height: 40, color: "#FFFFFF" }}
        >
          <InstagramIcon size={18} />
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="liquid-glass inline-flex items-center justify-center rounded-sh hover:opacity-80"
          style={{ width: 40, height: 40, color: "#FFFFFF" }}
        >
          <LinkedInIcon size={18} />
        </a>
      </div>

      {/* Floating: CTA cluster (tucks into bottom-right notch on desktop) */}
      <FadeIn
        delay={550}
        className="hidden md:block absolute z-30 bottom-3 lg:bottom-4 right-3 lg:right-4 text-right"
      >
        <p
          className="text-foreground/70 mb-3"
          style={{ fontSize: 14, letterSpacing: "0.02em" }}
        >
          Get a written quote in 60 seconds.
        </p>
        <div className="flex flex-row gap-3 justify-end">
          <a
            href="#quiz"
            className="reno-btn-purple reno-cta inline-flex items-center justify-center rounded-sh font-semibold"
            style={{ height: 56, padding: "0 28px", fontSize: 16 }}
          >
            Check availability →
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-sh font-semibold hover:bg-foreground/5 text-foreground"
            style={{
              height: 56,
              padding: "0 28px",
              fontSize: 16,
              border: "1px solid hsl(var(--border))",
            }}
          >
            Download app
          </a>
        </div>
      </FadeIn>

      {/* Card */}
      <div
        className="relative overflow-hidden rounded-2xl md:rounded-none"
        style={{
          minHeight: "calc(100vh - 32px)",
          borderRadius: "var(--radius-card, 28px)",
        }}
      >
        {/* Masked layer: slideshow + gradient + glow inside the bitten silhouette */}
        <div className="absolute inset-0" style={cardMaskStyle}>
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

        {/* Top bar (inside card): mobile socials/chat + centered logo + chat pill */}
        <div className="relative z-20 flex items-center justify-between px-4 md:px-8 pt-4 md:pt-6">
          {/* Left spacer (socials live outside card on desktop) */}
          <div className="w-10 md:w-24" aria-hidden />

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
        <div className="relative z-10 flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-8 md:pb-12" style={{ minHeight: "calc(100vh - 32px - 80px)" }}>
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
              className="text-foreground mt-3"
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
                className="text-muted-foreground mt-6 max-w-2xl"
                style={{ fontSize: "clamp(18px, 1.4vw, 20px)", lineHeight: 1.6 }}
              >
                We manage the designers, contractors, and payments with{"\n"}daily photo updates and a written on-time guarantee.
              </p>
            </FadeIn>
          </div>

          {/* Thumbnails (inside card, bottom-left) */}
          <div className="mt-10">
            <div
              className="liquid-glass rounded-sh p-2 hidden md:flex gap-2 self-start w-fit"
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

      {/* Mobile-only CTA stacked below card */}
      <div className="md:hidden px-4 py-6">
        <p
          className="text-foreground/70 mb-3 text-center"
          style={{ fontSize: 14, letterSpacing: "0.02em" }}
        >
          Get a written quote in 60 seconds.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="#quiz"
            className="reno-btn-purple reno-cta inline-flex items-center justify-center rounded-sh font-semibold"
            style={{ height: 52, padding: "0 24px", fontSize: 16 }}
          >
            Check availability →
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-sh font-semibold text-foreground"
            style={{
              height: 52,
              padding: "0 24px",
              fontSize: 16,
              border: "1px solid hsl(var(--border))",
            }}
          >
            Download app
          </a>
        </div>
      </div>
    </section>
  );
}
