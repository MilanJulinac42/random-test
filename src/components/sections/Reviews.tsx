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
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1100&fit=crop&crop=face&q=80",
    quote:
      "\u201CBrilliant team – took them a week to renovate the entire apartment. You have never seen this before in the UAE market.\u201D",
  },
  {
    name: "Camillo",
    meta: "Apartment · Downtown Dubai",
    tint: "#1D6B5A",
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=800&h=1100&fit=crop&crop=face&q=80",
    quote:
      "\u201CCredit card payments are a huge plus, I earned cashback and used it to purchase garden furniture for my house.\u201D",
  },
  {
    name: "Amir",
    meta: "Townhouse · JVC",
    tint: "#1F3560",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1100&fit=crop&crop=face&q=80",
    quote:
      "\u201CReno completely transformed my Dubai Hills apartment in just a few weeks. Sleek finishes, on-time delivery, and I barely had to lift a finger. It\u2019s rare to find a team this reliable in Dubai.\u201D",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="relative shrink-0 w-full flex flex-col"
      style={{
        borderRadius: 20,
        aspectRatio: "3 / 4",
        backgroundColor: "#F5F2EE",
        padding: "2rem",
        overflow: "hidden",
      }}
    >
      {/* Decorative open-quote watermark */}
      <span
        aria-hidden
        style={{
          fontSize: 56,
          fontWeight: 300,
          lineHeight: 1,
          color: "rgba(120, 100, 80, 0.3)",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        “
      </span>

      {/* Quote */}
      <p
        style={{
          marginTop: 8,
          fontSize: 21,
          lineHeight: 1.55,
          color: "#1A1A1A",
          flex: 1,
        }}
      >
        {t.quote}
      </p>

      {/* Reviewer */}
      <div style={{ marginTop: 18 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#1A1A1A" }}>{t.name}</div>
        <div style={{ fontSize: 14, color: "#777", marginTop: 4 }}>{t.meta}</div>
      </div>
    </div>
  );
}

export function Reviews() {
  return (
    <section
      id="reviews"
      className="relative overflow-hidden w-full"
      style={{
        backgroundColor: "#0D0D0D",
        paddingTop: "clamp(64px, 8vw, 100px)",
        paddingBottom: "clamp(64px, 8vw, 100px)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <Reveal>
          <p
            className="text-center uppercase"
            style={{
              color: "#888",
              fontSize: 11,
              letterSpacing: "0.12em",
              fontWeight: 500,
            }}
          >
            HOMEOWNER STORIES
          </p>
          <h2
            className="text-center mt-4"
            style={{
              fontSize: "clamp(36px, 5vw, 48px)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: 18,
            }}
          >
            Trusted across Dubai.
          </h2>
          <p
            className="text-center"
            style={{
              fontSize: 18,
              color: "#A78BFA",
              fontWeight: 500,
            }}
          >
            4.9 star average across 200+ completed projects
          </p>
        </Reveal>
      </div>

      {/* Desktop grid */}
      <div
        className="hidden md:block mx-auto max-w-7xl px-6 md:px-12 lg:px-16"
        style={{ marginTop: 56 }}
      >
        <Reveal>
          <div className="grid grid-cols-3" style={{ gap: 16 }}>
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </Reveal>
      </div>

      {/* Mobile horizontal scroll */}
      <div
        className="md:hidden flex overflow-x-auto no-scrollbar"
        style={{
          marginTop: 56,
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
            style={{
              width: "82vw",
              flexShrink: 0,
              scrollSnapAlign: "start",
            }}
          >
            <TestimonialCard t={t} />
          </div>
        ))}
        <div style={{ width: 12, flexShrink: 0 }} />
      </div>
    </section>
  );
}
