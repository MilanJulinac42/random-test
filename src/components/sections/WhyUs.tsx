import { Shield, PenTool, ListChecks, BadgeCheck, type LucideIcon } from "lucide-react";
import { useAnimeReveal, useAnimeRevealGroup } from "@/lib/anime";
import { WordReveal } from "@/components/WordReveal";

type Point = {
  title: string;
  body: string;
  Icon: LucideIcon;
  /** undefined = dark gradient (card 1); string = icon bg color for light cards */
  iconBg?: string;
};

const points: Point[] = [
  {
    title: "You hire Reno, not a contractor",
    body: "Single point of accountability — we own the outcome, not just the introduction.",
    Icon: Shield,
    // no iconBg → dark gradient card
  },
  {
    title: "Design-led approach",
    body: "Reno Studio takes you from floor plan to photorealistic render before any demolition starts.",
    Icon: PenTool,
    iconBg: "#0EA5E9",
  },
  {
    title: "End-to-end project management",
    body: "Dedicated PM, milestone tracking, QC inspections — not a marketplace that disappears after matching.",
    Icon: ListChecks,
    iconBg: "#F59E0B",
  },
  {
    title: "Proven track record",
    body: "150+ projects. 250,000 sqft of fitted-out areas. Premium villas and penthouses delivered.",
    Icon: BadgeCheck,
    iconBg: "#16A34A",
  },
];

export function WhyUs() {
  const subRef = useAnimeReveal<HTMLParagraphElement>({
    translateY: 18,
    delay: 200,
    duration: 700,
  });
  const cardsRef = useAnimeRevealGroup<HTMLDivElement>(".reno-why-card", {
    staggerMs: 110,
    duration: 760,
    translateY: 24,
  });

  return (
    <section
      id="why-us"
      data-nav-theme="light"
      className="relative w-full"
      style={{
        backgroundColor: "#FFFFFF",
        paddingBlock: "clamp(80px, 9vw, 128px)",
        paddingInline: "80px",
      }}
    >
      {/* Header */}
      <div className="reno-why-header">
        <WordReveal
          as="h2"
          variant="slide-up"
          staggerMs={70}
          duration={780}
          style={{
            color: "#0D0D0D",
            fontWeight: 600,
            fontSize: "clamp(40px, 5.6vw, 84px)",
            lineHeight: 1.04,
            letterSpacing: "-0.025em",
            margin: 0,
          }}
        >
          Why homeowners choose Reno.
        </WordReveal>

        <p
          ref={subRef}
          className="reno-why-sub"
          style={{
            color: "rgba(0,0,0,0.55)",
            fontSize: "clamp(13px, 1.15vw, 17px)",
            lineHeight: 1.5,
            margin: 0,
            marginTop: 18,
            whiteSpace: "nowrap",
          }}
        >
          We don't match you with a contractor — we are the contractor. Design, build, and project management under one roof.
        </p>
      </div>

      {/* 4 horizontal cards */}
      <div ref={cardsRef} className="reno-why-grid">
        {points.map(({ title, body, Icon, iconBg }) => {
          const isDark = !iconBg;
          return (
            <article
              key={title}
              className={`reno-why-card ${isDark ? "reno-why-card--dark" : "reno-why-card--light"}`}
            >
              <div className="reno-why-card-inner">
                <h3 className="reno-why-title">{title}</h3>
                <p className="reno-why-body">{body}</p>

                {isDark ? (
                  /* Original semi-transparent square icon */
                  <div className="reno-why-icon reno-why-icon--dark" aria-hidden>
                    <Icon size={22} strokeWidth={1.6} color="#FFFFFF" />
                  </div>
                ) : (
                  /* iOS app-icon style colored square */
                  <div
                    className="reno-why-icon reno-why-icon--colored"
                    aria-hidden
                    style={{
                      background: iconBg,
                      boxShadow: `0 2px 8px ${iconBg}40`,
                    }}
                  >
                    <Icon size={22} strokeWidth={1.8} color="#FFFFFF" />
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <style>{`
        .reno-why-header {
          width: 100%;
          margin-bottom: clamp(48px, 5vw, 72px);
        }

        .reno-why-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(14px, 1.4vw, 22px);
          width: 100%;
        }

        /* ── Shared card base ── */
        .reno-why-card {
          position: relative;
          aspect-ratio: 1 / 1.12;
          border-radius: 28px;
          overflow: hidden;
          transition: transform 480ms cubic-bezier(0.32, 0.72, 0, 1), box-shadow 480ms cubic-bezier(0.32, 0.72, 0, 1);
          will-change: transform;
        }

        /* ── Card 1: dark gradient ── */
        .reno-why-card--dark {
          background:
            radial-gradient(120% 90% at 30% 25%, rgba(110, 72, 255, 0.55) 0%, rgba(110, 72, 255, 0) 58%),
            linear-gradient(155deg, #050514 0%, #0B0B2E 34%, #1B1486 72%, #3829C9 100%);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.08) inset,
            0 0 0 1px rgba(255,255,255,0.04),
            0 14px 36px rgba(15, 12, 80, 0.18);
        }
        .reno-why-card--dark:hover {
          transform: translateY(-4px);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.1) inset,
            0 0 0 1px rgba(255,255,255,0.06),
            0 22px 48px rgba(15, 12, 80, 0.28);
        }

        /* ── Cards 2–4: light / no fill ── */
        .reno-why-card--light {
          background: transparent;
          border: 1px solid rgba(0, 0, 0, 0.085);
        }
        .reno-why-card--light:hover {
          transform: translateY(-4px);
          border-color: rgba(0, 0, 0, 0.13);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);
        }

        /* ── Card inner layout ── */
        .reno-why-card-inner {
          position: absolute;
          inset: 0;
          padding: clamp(24px, 2.4vw, 32px);
          display: flex;
          flex-direction: column;
        }

        /* ── Title: always 2 lines ── */
        .reno-why-title {
          font-weight: 600;
          font-size: clamp(19px, 1.6vw, 24px);
          line-height: 1.22;
          letter-spacing: -0.015em;
          margin: 0;
          /* Reserve exactly 2 lines, clamp overflow */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: calc(2 * 1.22em);
        }
        .reno-why-card--dark  .reno-why-title { color: #FFFFFF; }
        .reno-why-card--light .reno-why-title { color: #0D0D0D; }

        /* ── Body ── */
        .reno-why-body {
          font-weight: 400;
          font-size: clamp(13px, 1vw, 15px);
          line-height: 1.5;
          margin: 14px 0 0 0;
        }
        .reno-why-card--dark  .reno-why-body { color: rgba(255, 255, 255, 0.7); }
        .reno-why-card--light .reno-why-body { color: rgba(0, 0, 0, 0.58); }

        /* ── Icon ── */
        .reno-why-icon {
          margin-top: auto;
          width: 48px;
          height: 48px;
          border-radius: 13px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .reno-why-icon--dark {
          background: rgba(255, 255, 255, 0.08);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 1px 0 rgba(255, 255, 255, 0.12) inset;
        }
        .reno-why-icon--colored {
          /* background and box-shadow set inline per card */
        }

        /* Tablet — 2 columns */
        @media (max-width: 1024px) {
          .reno-why-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .reno-why-card {
            aspect-ratio: 1 / 0.95;
          }
        }

        /* Below desktop — allow the subheader to wrap */
        @media (max-width: 1180px) {
          .reno-why-sub {
            white-space: normal !important;
            max-width: 720px;
          }
        }

        /* Mobile — 1 column */
        @media (max-width: 640px) {
          #why-us {
            padding-inline: clamp(20px, 6vw, 32px) !important;
          }
          .reno-why-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .reno-why-card {
            aspect-ratio: 1 / 0.75;
          }
        }
      `}</style>
    </section>
  );
}
