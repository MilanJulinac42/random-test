
import { Reveal } from "@/components/Reveal";

type Testimonial = {
  name: string;
  meta: string;
  tint: string;
  image: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Walter",
    meta: "Villa · Arabian Ranches",
    tint: "#8B4513",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face&q=80",
    quote:
      "Brilliant team – took them a week to renovate the entire apartment. You have never seen this before in the UAE market.",
  },
  {
    name: "Amir",
    meta: "Townhouse · JVC",
    tint: "#1F3560",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&q=80",
    quote:
      "Reno completely transformed my Dubai Hills apartment in just a few weeks. Sleek finishes, on-time delivery, and I barely had to lift a finger.",
  },
  {
    name: "Camillo",
    meta: "Apartment · Downtown Dubai",
    tint: "#1D6B5A",
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=200&h=200&fit=crop&crop=face&q=80",
    quote:
      "Credit card payments are a huge plus, I earned cashback and used it to purchase garden furniture for my house.",
  },
];

function TestimonialCard({
  t,
  variant = "hero",
}: {
  t: Testimonial;
  variant?: "hero" | "side";
}) {
  const isHero = variant === "hero";
  return (
    <div
      className="relative w-full flex flex-col overflow-hidden"
      style={{
        borderRadius: 24,
        padding: isHero ? 32 : 24,
        background: `radial-gradient(120% 80% at 50% 0%, ${t.tint}${isHero ? "66" : "33"} 0%, ${t.tint}22 25%, rgba(20,20,28,0.85) 60%, rgba(15,15,22,0.95) 100%)`,
        border: `1px solid rgba(255,255,255,${isHero ? 0.12 : 0.06})`,
        boxShadow: isHero
          ? "0 40px 80px -30px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "0 20px 40px -25px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex items-center justify-center">
        <span
          style={{
            color: "#FFFFFF",
            fontSize: isHero ? 24 : 18,
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          {t.name}
        </span>
      </div>

      <p
        className="text-center"
        style={{
          marginTop: isHero ? 22 : 16,
          fontSize: isHero ? "clamp(17px, 1.35vw, 20px)" : 14.5,
          lineHeight: 1.55,
          color: `rgba(255,255,255,${isHero ? 0.92 : 0.78})`,
        }}
      >
        {t.quote}
      </p>
    </div>
  );
}

export function Reviews() {
  return (
    <section
      id="reviews"
      data-nav-theme="dark"
      className="relative overflow-hidden w-full"
      style={{
        backgroundColor: "#0D0D0D",
        paddingTop: "clamp(64px, 10vw, 140px)",
        paddingBottom: "clamp(64px, 10vw, 140px)",
      }}
    >

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Header row */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8 items-center md:items-stretch text-center md:text-left">
            <h2
              style={{
                fontSize: "clamp(28px, 8vw, 64px)",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}
            >
              Hear it directly
              <br />
              from them
            </h2>

            {/* Stat pill */}
            <div
              className="inline-flex items-center self-center md:self-auto reno-stat-pill"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 999,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
              }}
            >
              <span
                className="reno-stat-num"
                style={{
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                200+
              </span>
              <span
                className="uppercase"
                style={{
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 500,
                  lineHeight: 1.3,
                }}
              >
                Happy
                <br />
                Clients
              </span>
            </div>
          </div>
        </Reveal>

        {/* Desktop: center-emphasis layout */}
        <div className="hidden md:block" style={{ marginTop: 64 }}>
          <Reveal>
            <div className="flex items-center justify-center" style={{ gap: 24 }}>
              <div
                style={{
                  width: "26%",
                  transform: "scale(0.9) translateY(28px)",
                  transformOrigin: "center",
                  opacity: 0.85,
                }}
              >
                <TestimonialCard t={testimonials[0]} variant="side" />
              </div>
              <div style={{ width: "42%", position: "relative", zIndex: 2 }}>
                <TestimonialCard t={testimonials[1]} variant="hero" />
              </div>
              <div
                style={{
                  width: "26%",
                  transform: "scale(0.9) translateY(28px)",
                  transformOrigin: "center",
                  opacity: 0.85,
                }}
              >
                <TestimonialCard t={testimonials[2]} variant="side" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Mobile horizontal scroll */}
      <div
        className="md:hidden flex overflow-x-auto no-scrollbar relative z-10"
        style={{
          marginTop: 48,
          gap: 12,
          paddingLeft: 24,
          paddingRight: 24,
          scrollSnapType: "x mandatory",
          scrollPaddingLeft: 24,
        }}
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            style={{ width: "82vw", flexShrink: 0, scrollSnapAlign: "start" }}
          >
            <TestimonialCard t={t} />
          </div>
        ))}
        <div style={{ width: 12, flexShrink: 0 }} />
      </div>

      <style>{`
        .reno-stat-pill { padding: 14px 24px; gap: 14px; }
        .reno-stat-num { font-size: 48px; }
        @media (min-width: 768px) {
          .reno-stat-pill { padding: 20px 36px; gap: 20px; }
          .reno-stat-num { font-size: clamp(56px, 6vw, 80px); }
        }
      `}</style>
    </section>
  );
}
