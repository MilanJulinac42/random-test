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
      "“Brilliant team – took them a week to renovate the entire apartment. You have never seen this before in the UAE market.ˮ ",
  },
  {
    name: "Camillo",
    meta: "Apartment · Downtown Dubai",
    tint: "#1D6B5A",
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=800&h=1100&fit=crop&crop=face&q=80",
    quote:
      "“Credit card payments are a huge plus, I earned cashback and used it to purchase garden furniture for my house.ˮ",
  },
  {
    name: "Amir",
    meta: "Townhouse · JVC",
    tint: "#1F3560",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1100&fit=crop&crop=face&q=80",
    quote:
      "“Reno completely transformed my Dubai Hills apartment in just a few weeks. Sleek finishes, on-time delivery, and I barely had to lift a finger. Itʼs rare to find a team this reliable in Dubaiˮ",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="relative overflow-hidden shrink-0 w-full"
      style={{
        borderRadius: 20,
        aspectRatio: "3 / 4",
        backgroundColor: t.tint,
      }}
    >
      {/* Layer 2: duotone image */}
      <img
        src={t.image}
        alt={t.name}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          filter: "grayscale(100%) contrast(1.15) brightness(0.95)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Layer 3: gradient scrim */}
      <div
        className="absolute left-0 right-0 bottom-0 pointer-events-none"
        style={{
          height: "55%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
        }}
      />

      {/* Layer 4: name tag */}
      <div
        className="absolute"
        style={{
          top: 16,
          right: 16,
          textAlign: "right",
          fontSize: 12,
          color: "rgba(255,255,255,0.9)",
          lineHeight: 1.4,
        }}
      >
        <div style={{ fontWeight: 600 }}>{t.name}</div>
        <div>{t.meta}</div>
      </div>

      {/* Layer 5: quote */}
      <div
        className="absolute left-0 right-0 bottom-0"
        style={{
          padding: "0 22px 24px",
          fontSize: 15,
          color: "#FFFFFF",
          fontStyle: "italic",
          lineHeight: 1.55,
        }}
      >
        "{t.quote}"
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
              fontSize: "clamp(32px, 4.5vw, 44px)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            Trusted across Dubai.
          </h2>
          <p
            className="text-center"
            style={{
              fontSize: 16,
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
