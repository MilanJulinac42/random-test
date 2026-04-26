import { Reveal } from "@/components/Reveal";

type Testimonial = {
  name: string;
  meta: string;
  initials: string;
  gradient: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Fatima A.",
    meta: "Villa, Arabian Ranches",
    initials: "FA",
    gradient:
      "linear-gradient(145deg, #8B4513 0%, #C2892A 40%, #E8C170 75%, #F5DFA0 100%)",
    quote:
      "Every payment was tied to a milestone we approved. No surprises — exactly what we were promised.",
  },
  {
    name: "Khalid & Sara M.",
    meta: "Apartment, Downtown Dubai",
    initials: "KS",
    gradient:
      "linear-gradient(145deg, #0F3D3A 0%, #1D7A6B 40%, #2AABA0 75%, #7DD4CC 100%)",
    quote:
      "We were travelling for six weeks. The app meant we could see photos, approve decisions, and track costs from our phones.",
  },
  {
    name: "James R.",
    meta: "Townhouse, JVC",
    initials: "JR",
    gradient:
      "linear-gradient(145deg, #1A1F3A 0%, #2A3D6E 40%, #3D5FA0 75%, #7090CC 100%)",
    quote:
      "They finished two weeks early. I've never had a contractor deliver on time, let alone early. Reno is genuinely different.",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="relative overflow-hidden shrink-0 w-full"
      style={{
        borderRadius: 20,
        aspectRatio: "3 / 4",
        background: t.gradient,
      }}
    >
      {/* Top-right name label */}
      <div
        className="absolute top-0 right-0"
        style={{
          padding: "16px",
          fontSize: 12,
          color: "#FFFFFF",
          fontWeight: 500,
          maxWidth: "75%",
          textAlign: "right",
          lineHeight: 1.4,
        }}
      >
        {t.name} · {t.meta}
      </div>

      {/* Monogram circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex items-center justify-center"
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#FFFFFF",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          {t.initials}
        </div>
      </div>

      {/* Bottom gradient overlay with quote */}
      <div
        className="absolute left-0 right-0 bottom-0 flex items-end"
        style={{
          height: "50%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
        <p
          style={{
            fontSize: 15,
            color: "#FFFFFF",
            fontStyle: "italic",
            lineHeight: 1.5,
            padding: "20px 20px 24px",
          }}
        >
          "{t.quote}"
        </p>
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
            style={{ color: "#888", fontSize: 11, letterSpacing: "0.1em", fontWeight: 500 }}
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
              color: "#C2A97A",
              fontWeight: 500,
            }}
          >
            4.9★ average rating across 200+ completed projects
          </p>
        </Reveal>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:block mx-auto max-w-7xl px-6 md:px-12 lg:px-16" style={{ marginTop: 56 }}>
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
