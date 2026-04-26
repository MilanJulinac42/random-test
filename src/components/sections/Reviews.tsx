import { Reveal } from "@/components/Reveal";

type Testimonial = {
  name: string;
  meta: string;
  initials: string;
  bg: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Fatima A.",
    meta: "Villa, Arabian Ranches",
    initials: "FA",
    bg: "#C2892A",
    quote:
      "Every payment was tied to a milestone we approved. No surprises, exactly what we needed.",
  },
  {
    name: "Khalid & Sara M.",
    meta: "Apartment, Downtown Dubai",
    initials: "KS",
    bg: "#7A9E7E",
    quote:
      "We were travelling for six weeks. The app meant we could see photos, approve decisions, and track costs from our phones.",
  },
  {
    name: "James R.",
    meta: "Townhouse, JVC",
    initials: "JR",
    bg: "#2A7A8C",
    quote:
      "They finished two weeks early. I've never had a contractor deliver on time, let alone early.",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="relative overflow-hidden shrink-0"
      style={{
        borderRadius: 20,
        aspectRatio: "3 / 4",
        background: t.bg,
      }}
    >
      {/* Top-right name label */}
      <div
        className="absolute top-0 right-0"
        style={{
          padding: "12px 16px",
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
            background: "rgba(255,255,255,0.15)",
            color: "#FFFFFF",
            fontSize: 32,
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
          height: "45%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 100%)",
        }}
      >
        <p
          style={{
            fontSize: 16,
            color: "#FFFFFF",
            fontStyle: "italic",
            lineHeight: 1.5,
            padding: "0 20px 24px",
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
            4.9★ average across 200+ projects
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
          marginTop: 40,
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
              width: "80vw",
              flexShrink: 0,
              scrollSnapAlign: "start",
            }}
          >
            <TestimonialCard t={t} />
          </div>
        ))}
        {/* trailing space so last card can snap fully */}
        <div style={{ width: 12, flexShrink: 0 }} />
      </div>
    </section>
  );
}
