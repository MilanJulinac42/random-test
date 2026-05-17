import { useAnimeReveal, useAnimeRevealGroup } from "@/lib/anime";
import { WordReveal } from "@/components/WordReveal";

type Point = {
  n: string;
  title: string;
  body: string;
};

const points: Point[] = [
  {
    n: "01",
    title: "You hire Reno, not a contractor",
    body: "Single point of accountability — we own the outcome, not just the introduction.",
  },
  {
    n: "02",
    title: "Design-led approach",
    body: "Reno Studio takes you from floor plan to photorealistic render before any demolition starts.",
  },
  {
    n: "03",
    title: "End-to-end project management",
    body: "Dedicated PM, milestone tracking, QC inspections — not a marketplace that disappears after matching.",
  },
  {
    n: "04",
    title: "Proven track record",
    body: "150+ projects. 250,000 sqft of fitted-out areas. Premium villas and penthouses delivered.",
  },
];

export function WhyUs() {
  const eyebrowRef = useAnimeReveal<HTMLDivElement>({ translateY: 14, duration: 600 });
  const subRef = useAnimeReveal<HTMLParagraphElement>({ translateY: 18, delay: 200, duration: 700 });
  const cardsRef = useAnimeRevealGroup<HTMLDivElement>(".reno-why-card", {
    staggerMs: 110,
    duration: 720,
    translateY: 22,
  });

  return (
    <section
      id="why-us"
      data-nav-theme="light"
      className="relative w-full"
      style={{
        backgroundColor: "#FFFFFF",
        paddingBlock: "clamp(80px, 9vw, 128px)",
        paddingInline: "clamp(20px, 6vw, 80px)",
      }}
    >
      <div className="reno-why-inner">
        {/* LEFT — editorial heading column */}
        <div className="reno-why-left">
          <div ref={eyebrowRef} className="reno-eyebrow">
            The difference
          </div>

          <WordReveal
            as="h2"
            variant="slide-up"
            staggerMs={70}
            duration={780}
            style={{
              color: "#0D0D0D",
              fontWeight: 600,
              fontSize: "clamp(40px, 6vw, 84px)",
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              margin: 0,
              marginTop: 24,
            }}
          >
            Why homeowners choose Reno.
          </WordReveal>

          <p
            ref={subRef}
            style={{
              color: "rgba(0,0,0,0.55)",
              fontSize: "clamp(15px, 1.3vw, 18px)",
              lineHeight: 1.5,
              maxWidth: 420,
              margin: 0,
              marginTop: 22,
            }}
          >
            We don't match you with a contractor — we are the contractor. Design, build,
            and project management under one roof.
          </p>
        </div>

        {/* RIGHT — stacked numbered cards */}
        <div ref={cardsRef} className="reno-why-right">
          {points.map((p) => (
            <article key={p.n} className="reno-why-card-shell">
              <div className="reno-why-card">
                <div className="reno-why-num">{p.n}</div>
                <h3 className="reno-why-title">{p.title}</h3>
                <p className="reno-why-body">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .reno-eyebrow {
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          font-size: 11px;
          font-weight: 500;
          font-family: 'ZT Talk', system-ui, sans-serif;
          padding: 6px 12px;
          background: rgba(0,0,0,0.05);
          color: rgba(0,0,0,0.55);
          border-radius: 999px;
          box-shadow: 0 1px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(0,0,0,0.04);
        }

        .reno-why-inner {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: clamp(36px, 5vw, 56px);
        }
        .reno-why-left { display: flex; flex-direction: column; }
        .reno-why-right { display: flex; flex-direction: column; gap: clamp(10px, 1.2vw, 14px); }

        .reno-why-card-shell {
          background: rgba(0,0,0,0.035);
          border-radius: 28px;
          padding: 6px;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.6) inset,
            0 0 0 1px rgba(0,0,0,0.04);
          transition: transform 480ms cubic-bezier(0.32, 0.72, 0, 1);
          will-change: transform;
        }
        .reno-why-card-shell:hover { transform: translateY(-3px); }
        .reno-why-card-shell:hover .reno-why-num { color: #0D0D0D; }

        .reno-why-card {
          background: #FFFFFF;
          border-radius: 22px;
          padding: clamp(22px, 2.4vw, 30px) clamp(24px, 2.8vw, 32px);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.95) inset,
            0 8px 24px rgba(0,0,0,0.04);
        }
        .reno-why-num {
          font-family: 'ZT Talk', system-ui, sans-serif;
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.18em;
          color: rgba(0,0,0,0.4);
          text-transform: uppercase;
          transition: color 480ms cubic-bezier(0.32, 0.72, 0, 1);
        }
        .reno-why-title {
          color: #0D0D0D;
          font-weight: 600;
          font-size: clamp(20px, 1.9vw, 24px);
          line-height: 1.25;
          letter-spacing: -0.01em;
          margin: 14px 0 0 0;
        }
        .reno-why-body {
          color: rgba(0,0,0,0.62);
          font-weight: 400;
          font-size: clamp(14px, 1.15vw, 16px);
          line-height: 1.55;
          margin: 8px 0 0 0;
        }

        @media (min-width: 960px) {
          .reno-why-inner {
            flex-direction: row;
            align-items: flex-start;
            gap: clamp(48px, 6vw, 96px);
          }
          .reno-why-left {
            flex: 1;
            position: sticky;
            top: 96px;
          }
          .reno-why-right {
            flex: 1;
            gap: 14px;
          }
        }
      `}</style>
    </section>
  );
}
