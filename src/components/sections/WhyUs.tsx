import { Shield, PenTool, ListChecks, BadgeCheck, type LucideIcon } from "lucide-react";
import { useAnimeReveal, useAnimeRevealGroup } from "@/lib/anime";
import { WordReveal } from "@/components/WordReveal";

type Point = {
  title: string;
  body: string;
  Icon: LucideIcon;
};

const points: Point[] = [
  {
    title: "You hire Reno, not a contractor",
    body: "Single point of accountability — we own the outcome, not just the introduction.",
    Icon: Shield,
  },
  {
    title: "Design-led approach",
    body: "Reno Studio takes you from floor plan to photorealistic render before any demolition starts.",
    Icon: PenTool,
  },
  {
    title: "End-to-end project management",
    body: "Dedicated PM, milestone tracking, QC inspections — not a marketplace that disappears after matching.",
    Icon: ListChecks,
  },
  {
    title: "Proven track record",
    body: "150+ projects. 250,000 sqft of fitted-out areas. Premium villas and penthouses delivered.",
    Icon: BadgeCheck,
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
      {/* Header — spans full width inside 80px padding */}
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
          style={{
            color: "rgba(0,0,0,0.55)",
            fontSize: "clamp(15px, 1.3vw, 18px)",
            lineHeight: 1.5,
            margin: 0,
            marginTop: 18,
            maxWidth: 720,
          }}
        >
          We don't match you with a contractor — we are the contractor. Design, build,
          and project management under one roof.
        </p>
      </div>

      {/* 4 horizontal cards */}
      <div ref={cardsRef} className="reno-why-grid">
        {points.map(({ title, body, Icon }) => (
          <article key={title} className="reno-why-card">
            <div className="reno-why-card-inner">
              <h3 className="reno-why-title">{title}</h3>
              <p className="reno-why-body">{body}</p>
              <div className="reno-why-icon" aria-hidden>
                <Icon size={22} strokeWidth={1.6} color="#FFFFFF" />
              </div>
            </div>
          </article>
        ))}
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

        .reno-why-card {
          position: relative;
          aspect-ratio: 1 / 1.12;
          border-radius: 28px;
          overflow: hidden;
          background:
            radial-gradient(120% 90% at 30% 25%, rgba(110, 72, 255, 0.55) 0%, rgba(110, 72, 255, 0) 58%),
            linear-gradient(155deg, #050514 0%, #0B0B2E 34%, #1B1486 72%, #3829C9 100%);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.08) inset,
            0 0 0 1px rgba(255,255,255,0.04),
            0 14px 36px rgba(15, 12, 80, 0.18);
          transition: transform 480ms cubic-bezier(0.32, 0.72, 0, 1), box-shadow 480ms cubic-bezier(0.32, 0.72, 0, 1);
          will-change: transform;
        }
        .reno-why-card:hover {
          transform: translateY(-4px);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.1) inset,
            0 0 0 1px rgba(255,255,255,0.06),
            0 22px 48px rgba(15, 12, 80, 0.28);
        }

        .reno-why-card-inner {
          position: absolute;
          inset: 0;
          padding: clamp(24px, 2.4vw, 32px);
          display: flex;
          flex-direction: column;
        }

        .reno-why-title {
          color: #FFFFFF;
          font-weight: 600;
          font-size: clamp(20px, 1.7vw, 26px);
          line-height: 1.2;
          letter-spacing: -0.015em;
          margin: 0;
          max-width: 14ch;
        }
        .reno-why-body {
          color: rgba(255, 255, 255, 0.7);
          font-weight: 400;
          font-size: clamp(13px, 1vw, 15px);
          line-height: 1.5;
          margin: 16px 0 0 0;
        }
        .reno-why-icon {
          margin-top: auto;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 1px 0 rgba(255, 255, 255, 0.12) inset;
          display: inline-flex;
          align-items: center;
          justify-content: center;
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

        /* Mobile — 1 column with reduced padding */
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
