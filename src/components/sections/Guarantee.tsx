import { useAnimeReveal, useAnimeRevealGroup } from "@/lib/anime";
import { WordReveal } from "@/components/WordReveal";

type Guarantee = {
  n: string;
  title: string;
  body: string;
  feature?: boolean;
  chip?: string;
};

const items: Guarantee[] = [
  {
    n: "01",
    title: "Price-lock guarantee",
    body: "Your BOQ price is your final price — no hidden costs.",
    feature: true,
    chip: "No hidden costs",
  },
  {
    n: "02",
    title: "Timeline guarantee",
    body: "We deliver on schedule or pay you back up to 5% of the project value.",
  },
  {
    n: "03",
    title: "Milestone-based payments",
    body: "You only pay as work is completed and inspected.",
  },
  {
    n: "04",
    title: "Design on us",
    body: "Free design when you execute the project with Reno.",
  },
  {
    n: "05",
    title: "Satisfaction checkpoint",
    body: "Unhappy at any milestone? We pause, fix, then proceed.",
  },
];

export function Guarantee() {
  const eyebrowRef = useAnimeReveal<HTMLDivElement>({ translateY: 14, duration: 600 });
  const subRef = useAnimeReveal<HTMLParagraphElement>({ translateY: 18, delay: 220, duration: 700 });
  const gridRef = useAnimeRevealGroup<HTMLDivElement>(".reno-guarantee-card-shell", {
    staggerMs: 100,
    duration: 720,
    translateY: 22,
  });

  return (
    <section
      id="guarantee"
      data-nav-theme="light"
      className="relative w-full"
      style={{
        backgroundColor: "#FFFFFF",
        paddingBlock: "clamp(80px, 9vw, 128px)",
        paddingInline: "clamp(20px, 6vw, 80px)",
      }}
    >
      <div className="reno-guarantee-inner">
        {/* Header */}
        <div className="reno-guarantee-header">
          <div ref={eyebrowRef} className="reno-eyebrow">
            Guarantees
          </div>

          <WordReveal
            as="h2"
            variant="clip"
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
              maxWidth: 900,
            }}
          >
            Promises we put in writing.
          </WordReveal>

          <p
            ref={subRef}
            style={{
              color: "rgba(0,0,0,0.55)",
              fontSize: "clamp(15px, 1.3vw, 18px)",
              lineHeight: 1.5,
              maxWidth: 560,
              margin: 0,
              marginTop: 22,
            }}
          >
            Five commitments, written into every Reno contract. If we miss, you don't pay
            the difference — we do.
          </p>
        </div>

        {/* Bento grid */}
        <div ref={gridRef} className="reno-guarantee-grid">
          {items.map((g) => (
            <article
              key={g.n}
              className={
                "reno-guarantee-card-shell" +
                (g.feature ? " reno-guarantee-card-shell--feature" : "")
              }
            >
              <div
                className={
                  "reno-guarantee-card" +
                  (g.feature ? " reno-guarantee-card--feature" : "")
                }
              >
                <div className="reno-guarantee-num">{g.n}</div>
                <h3 className="reno-guarantee-title">{g.title}</h3>
                <p className="reno-guarantee-body">{g.body}</p>
                {g.chip && (
                  <div className="reno-guarantee-chip">
                    <span className="reno-guarantee-chip-dot" />
                    {g.chip}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .reno-guarantee-inner {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: clamp(40px, 5vw, 64px);
        }
        .reno-guarantee-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .reno-guarantee-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(12px, 1.4vw, 20px);
        }

        .reno-guarantee-card-shell {
          background: rgba(0,0,0,0.035);
          border-radius: 28px;
          padding: 6px;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.6) inset,
            0 0 0 1px rgba(0,0,0,0.04);
          transition:
            transform 480ms cubic-bezier(0.32, 0.72, 0, 1),
            box-shadow 480ms cubic-bezier(0.32, 0.72, 0, 1);
          will-change: transform;
        }
        .reno-guarantee-card-shell:hover {
          transform: translateY(-3px);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.6) inset,
            0 0 0 1px rgba(0,0,0,0.05),
            0 14px 32px rgba(0,0,0,0.05);
        }
        .reno-guarantee-card-shell:hover .reno-guarantee-num {
          color: #0D0D0D;
        }
        .reno-guarantee-card-shell--feature {
          border-radius: 32px;
          padding: 8px;
        }
        .reno-guarantee-card-shell--feature:hover {
          box-shadow:
            0 1px 0 rgba(255,255,255,0.6) inset,
            0 0 0 1px rgba(0,0,0,0.06),
            0 22px 48px rgba(0,0,0,0.07);
        }

        .reno-guarantee-card {
          position: relative;
          background: #FFFFFF;
          border-radius: 22px;
          padding: clamp(22px, 2.4vw, 32px) clamp(24px, 2.8vw, 34px);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.95) inset,
            0 8px 24px rgba(0,0,0,0.04);
          min-height: 100%;
          display: flex;
          flex-direction: column;
        }
        .reno-guarantee-card--feature {
          border-radius: 26px;
          padding: clamp(28px, 3.4vw, 44px) clamp(28px, 3.6vw, 48px);
        }
        .reno-guarantee-num {
          font-family: 'ZT Talk', system-ui, sans-serif;
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.18em;
          color: rgba(0,0,0,0.4);
          text-transform: uppercase;
          transition: color 480ms cubic-bezier(0.32, 0.72, 0, 1);
        }
        .reno-guarantee-title {
          color: #0D0D0D;
          font-weight: 600;
          font-size: clamp(20px, 1.9vw, 24px);
          line-height: 1.22;
          letter-spacing: -0.01em;
          margin: 16px 0 0 0;
        }
        .reno-guarantee-card--feature .reno-guarantee-title {
          font-size: clamp(28px, 3.2vw, 44px);
          line-height: 1.1;
          letter-spacing: -0.022em;
          margin-top: 20px;
        }
        .reno-guarantee-body {
          color: rgba(0,0,0,0.62);
          font-weight: 400;
          font-size: clamp(14px, 1.15vw, 16px);
          line-height: 1.55;
          margin: 10px 0 0 0;
        }
        .reno-guarantee-card--feature .reno-guarantee-body {
          font-size: clamp(15px, 1.3vw, 19px);
          line-height: 1.5;
          margin-top: 12px;
          max-width: 540px;
        }

        .reno-guarantee-chip {
          margin-top: auto;
          padding-top: 24px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          align-self: flex-start;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 10px;
          font-weight: 500;
          color: rgba(0,0,0,0.55);
        }
        .reno-guarantee-chip-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #1FAB6E;
          box-shadow: 0 0 0 4px rgba(31,171,110,0.12);
        }

        @media (min-width: 768px) {
          .reno-guarantee-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .reno-guarantee-card-shell--feature {
            grid-column: 1 / -1;
          }
        }
      `}</style>
    </section>
  );
}
