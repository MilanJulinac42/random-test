import { Star } from "lucide-react";
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
    name: "Camillo",
    meta: "Apartment · Downtown Dubai",
    tint: "#1D6B5A",
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=200&h=200&fit=crop&crop=face&q=80",
    quote:
      "Credit card payments are a huge plus, I earned cashback and used it to purchase garden furniture for my house.",
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
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="relative shrink-0 w-full flex flex-col overflow-hidden"
      style={{
        borderRadius: 24,
        minHeight: 360,
        padding: 28,
        background: `radial-gradient(120% 80% at 50% 0%, ${t.tint}55 0%, ${t.tint}22 25%, rgba(20,20,28,0.85) 60%, rgba(15,15,22,0.95) 100%)`,
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 30px 60px -30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Top: name */}
      <div className="flex items-center justify-center">
        <span style={{ color: "#FFFFFF", fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em" }}>
          {t.name}
        </span>
      </div>

      {/* Quote */}
      <p
        className="text-center"
        style={{
          marginTop: 28,
          fontSize: "clamp(15px, 1.2vw, 17px)",
          lineHeight: 1.55,
          color: "rgba(255,255,255,0.85)",
          flex: 1,
        }}
      >
        {t.quote}
      </p>

      {/* Stars */}
      <div className="flex items-center justify-center gap-1.5" style={{ marginTop: 24 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} fill="#FFFFFF" stroke="#FFFFFF" />
        ))}
      </div>
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
        paddingTop: "clamp(80px, 10vw, 140px)",
        paddingBottom: "clamp(160px, 18vw, 260px)",
      }}
    >

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Header row */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <h2
              style={{
                fontSize: "clamp(40px, 5vw, 64px)",
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
              className="inline-flex items-center self-start md:self-auto"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 999,
                padding: "20px 36px",
                gap: 20,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(56px, 6vw, 80px)",
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

        {/* Desktop grid */}
        <div className="hidden md:block" style={{ marginTop: 64 }}>
          <Reveal>
            <div className="grid grid-cols-3" style={{ gap: 20 }}>
              {testimonials.map((t) => (
                <TestimonialCard key={t.name} t={t} />
              ))}
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
    </section>
  );
}
