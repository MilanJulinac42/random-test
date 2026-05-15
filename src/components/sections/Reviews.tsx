import { Star } from "lucide-react";
import { useAnimeReveal, useAnimeRevealGroup } from "@/lib/anime";
import { WordReveal } from "@/components/WordReveal";

type Testimonial = {
  name: string;
  image: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Amir",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&q=80",
    quote:
      "Reno completely transformed my Dubai Hills apartment in just a few weeks. Sleek finishes, on-time delivery, and I barely had to lift a finger.",
  },
  {
    name: "Walter",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face&q=80",
    quote:
      "Brilliant team — took them a week to renovate the entire apartment. You have never seen this before in the UAE market.",
  },
  {
    name: "Camillo",
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=400&fit=crop&crop=face&q=80",
    quote:
      "Credit card payments are a huge plus, I earned cashback and used it to purchase garden furniture for my house.",
  },
];

export function Reviews() {
  const headerRef = useAnimeReveal<HTMLDivElement>({ translateY: 22 });
  const cardsRef = useAnimeRevealGroup<HTMLDivElement>(".reno-review-card", {
    staggerMs: 140,
    duration: 760,
    translateY: 32,
  });

  return (
    <section
      id="reviews"
      data-nav-theme="dark"
      className="relative w-full"
      style={{
        backgroundColor: "#000000",
        paddingBlock: "clamp(56px, 9vw, 80px)",
        paddingInline: "clamp(20px, 6vw, 80px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "clamp(32px, 5vw, 40px)",
      }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          textAlign: "center",
        }}
      >
        <WordReveal
          as="h2"
          variant="slide-up"
          style={{
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: "clamp(30px, 5.2vw, 64px)",
            lineHeight: 1.18,
            letterSpacing: "-0.02em",
          }}
        >
          Hear it from our clients
        </WordReveal>
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontWeight: 600,
            fontSize: "clamp(15px, 1.6vw, 20px)",
            lineHeight: 1.3,
          }}
        >
          Insights from those who know us best.
        </p>
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="reno-reviews-grid">
        {testimonials.map((t) => (
          <article key={t.name} className="reno-review-card">
            <div
              aria-hidden
              className="reno-review-card-bg"
              style={{ backgroundImage: `url(${t.image})` }}
            />
            <div aria-hidden className="reno-review-card-scrim" />
            <div className="reno-review-card-content">
              <div className="reno-review-name">{t.name}</div>
              <p className="reno-review-quote">{t.quote}</p>
              <div className="reno-review-stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .reno-reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
          max-width: 1280px;
        }
        .reno-review-card {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          min-height: 287px;
          background-color: #141414;
        }
        .reno-review-card-bg {
          position: absolute;
          inset: -40px;
          background-size: cover;
          background-position: 50%;
          filter: blur(44px);
          transform: scale(1.2);
          opacity: 0.7;
        }
        .reno-review-card-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0,0,0,0.45) 0%,
            rgba(0,0,0,0.62) 100%
          );
        }
        .reno-review-card-content {
          position: relative;
          z-index: 1;
          height: 100%;
          min-height: 287px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: clamp(24px, 3vw, 36px) clamp(20px, 2.6vw, 32px);
          text-align: center;
        }
        .reno-review-name {
          color: rgba(255,255,255,0.72);
          font-family: 'ZT Talk', sans-serif;
          font-weight: 500;
          font-size: clamp(13px, 1.1vw, 15px);
          line-height: 1.2;
        }
        .reno-review-quote {
          color: #FFFFFF;
          font-family: 'ZT Talk', sans-serif;
          font-weight: 500;
          font-size: clamp(13px, 1.2vw, 16px);
          line-height: 1.5;
          margin: 0;
        }
        .reno-review-stars {
          display: flex;
          gap: 4px;
          color: #FFFFFF;
        }
        @media (max-width: 860px) {
          .reno-reviews-grid {
            grid-template-columns: 1fr;
            max-width: 480px;
          }
        }
      `}</style>
    </section>
  );
}
