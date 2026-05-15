import { useAnimeCountUp, useAnimeRevealGroup } from "@/lib/anime";
import { WordReveal } from "@/components/WordReveal";

/**
 * Stats — three figures: 120 vetted contractors, 98% on-time delivery,
 * 200+ projects delivered. Each number counts up when it scrolls into view.
 */
export function Stats() {
  const gridRef = useAnimeRevealGroup<HTMLDivElement>(".reno-stat-card", {
    staggerMs: 110,
    duration: 700,
    translateY: 22,
  });

  const count120 = useAnimeCountUp<HTMLSpanElement>(120, { duration: 1600 });
  const count98 = useAnimeCountUp<HTMLSpanElement>(98, { duration: 1600 });
  const count200 = useAnimeCountUp<HTMLSpanElement>(200, { duration: 1900 });

  return (
    <section
      id="stats"
      data-nav-theme="dark"
      className="relative w-full"
      style={{
        background: "#000000",
        paddingBlock: "clamp(48px, 8vw, 80px)",
        paddingInline: "clamp(20px, 6vw, 80px)",
      }}
    >
      <div ref={gridRef} className="reno-stats-grid">
        {/* Left column — two stacked cards */}
        <div className="reno-stats-left">
          {/* 120 — white card, content top-aligned */}
          <div
            className="reno-stat-card"
            style={{
              background: "#FFFFFF",
              borderRadius: 24,
              padding: "clamp(24px, 3.4vw, 44px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: 14,
            }}
          >
            <div className="reno-stat-number" style={{ color: "#0D0D0D" }}>
              <span ref={count120}>0</span>
            </div>
            <WordReveal as="div" variant="blur-in" delay={600} className="reno-stat-label" style={{ color: "#6E6E6E" }}>
              Vetted contractors
            </WordReveal>
          </div>

          {/* 98% — dark card, content bottom-aligned */}
          <div
            className="reno-stat-card"
            style={{
              background: "#0E0E0E",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24,
              padding: "clamp(24px, 3.4vw, 44px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: 14,
            }}
          >
            <div className="reno-stat-number" style={{ color: "#FFFFFF" }}>
              <span ref={count98}>0</span>
              <span>%</span>
            </div>
            <WordReveal as="div" variant="blur-in" delay={600} className="reno-stat-label" style={{ color: "rgba(255,255,255,0.5)" }}>
              On time delivery
            </WordReveal>
          </div>
        </div>

        {/* Right — large gradient card */}
        <div
          className="reno-stat-card reno-stat-gradient"
          style={{
            borderRadius: 24,
            padding: "clamp(28px, 4vw, 56px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 24,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            className="reno-stat-number reno-stat-number-xl"
            style={{ color: "#FFFFFF", position: "relative", zIndex: 1 }}
          >
            <span ref={count200}>0</span>
            <span>+</span>
          </div>
          <WordReveal as="div" variant="blur-in" delay={600} className="reno-stat-label reno-stat-label-lg" style={{ color: "rgba(255,255,255,0.85)", position: "relative", zIndex: 1 }}>
            Projects delivered across the network
          </WordReveal>
        </div>
      </div>

      <style>{`
        .reno-stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .reno-stats-left {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        .reno-stat-card {
          min-height: 200px;
        }
        .reno-stat-gradient {
          min-height: 280px;
          background:
            radial-gradient(120% 90% at 78% 100%, rgba(110,72,255,0.55) 0%, rgba(110,72,255,0) 58%),
            linear-gradient(145deg, #050514 0%, #0b0b2c 34%, #2c1fae 78%, #4f37f5 100%);
        }
        .reno-stat-number {
          font-weight: 700;
          font-size: clamp(54px, 6.6vw, 90px);
          line-height: 0.96;
          letter-spacing: -0.04em;
        }
        .reno-stat-number-xl {
          font-size: clamp(76px, 11vw, 150px);
        }
        .reno-stat-label {
          font-weight: 500;
          font-size: clamp(16px, 1.7vw, 26px);
          line-height: 1.3;
        }
        .reno-stat-label-lg {
          font-size: clamp(18px, 2vw, 30px);
        }
        @media (min-width: 900px) {
          .reno-stats-grid {
            grid-template-columns: 0.62fr 0.78fr;
            gap: 20px;
          }
          .reno-stats-left {
            gap: 20px;
          }
          .reno-stat-card {
            min-height: 238px;
          }
          .reno-stat-gradient {
            min-height: 496px;
          }
        }
      `}</style>
    </section>
  );
}
