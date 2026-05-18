import {
  Lock,
  Clock,
  Layers,
  Paintbrush,
  SmilePlus,
  type LucideIcon,
} from "lucide-react";
import { useAnimeReveal, useAnimeRevealGroup } from "@/lib/anime";
import { WordReveal } from "@/components/WordReveal";

type GuaranteeItem = {
  title: string;
  body: string;
  Icon: LucideIcon;
  iconBg: string;
  videoSrc?: string;
};

const items: GuaranteeItem[] = [
  {
    title: "Price-lock guarantee",
    body: "Your BOQ price is your final price — no hidden costs.",
    Icon: Lock,
    iconBg: "#FF6B35",
    videoSrc: "/videos/guarantee-dirham.mp4",
  },
  {
    title: "Timeline guarantee",
    body: "We deliver on schedule or pay you back up to 5% of the project value.",
    Icon: Clock,
    iconBg: "#3B7BF6",
  },
  {
    title: "Design on us",
    body: "Free design when you execute the project with Reno.",
    Icon: Paintbrush,
    iconBg: "#16A34A",
    videoSrc: "/videos/guarantee-palette.mp4",
  },
  {
    title: "Milestone-based payments",
    body: "You only pay as work is completed and inspected.",
    Icon: Layers,
    iconBg: "#7C3AED",
  },
  {
    title: "Satisfaction checkpoint",
    body: "Unhappy at any milestone? We pause, fix, then proceed.",
    Icon: SmilePlus,
    iconBg: "#DB2777",
  },
];

function IconSquare({
  Icon,
  bg,
}: {
  Icon: LucideIcon;
  bg: string;
}) {
  return (
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: 14,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: `0 2px 8px ${bg}40`,
      }}
    >
      <Icon size={24} strokeWidth={1.8} color="#FFFFFF" />
    </div>
  );
}

export function Guarantee() {
  const subRef = useAnimeReveal<HTMLParagraphElement>({
    translateY: 18,
    delay: 220,
    duration: 700,
  });
  const gridRef = useAnimeRevealGroup<HTMLDivElement>(".reno-g-card", {
    staggerMs: 90,
    duration: 700,
    translateY: 20,
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
      <div className="reno-g-inner">
        {/* Header */}
        <div className="reno-g-header">
          <WordReveal
            as="h2"
            variant="slide-up"
            staggerMs={65}
            duration={760}
            style={{
              color: "#0D0D0D",
              fontWeight: 600,
              fontSize: "clamp(38px, 5.6vw, 80px)",
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            Promises we put in writing.
          </WordReveal>

          <p
            ref={subRef}
            style={{
              color: "rgba(0,0,0,0.52)",
              fontSize: "clamp(13px, 1.15vw, 17px)",
              lineHeight: 1.5,
              margin: "16px 0 0 0",
              whiteSpace: "nowrap",
            }}
          >
            Five commitments, written into every Reno contract.
          </p>
        </div>

        {/* Bento grid */}
        <div ref={gridRef} className="reno-g-grid">
          {items.map((item, i) => (
            <article
              key={item.title}
              className={`reno-g-card reno-g-card--${i + 1}${item.videoSrc ? " reno-g-card--video" : ""}`}
            >
              {item.videoSrc ? (
                <div className="reno-g-video-wrap">
                  <video
                    src={item.videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden
                    className="reno-g-video"
                  />
                </div>
              ) : (
                <IconSquare Icon={item.Icon} bg={item.iconBg} />
              )}
              <div className="reno-g-text">
                <h3 className="reno-g-title">{item.title}</h3>
                <p className="reno-g-body">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .reno-g-inner {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: clamp(40px, 5vw, 60px);
        }

        .reno-g-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        /* ── Bento grid ── */
        .reno-g-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto auto auto;
          gap: clamp(10px, 1.2vw, 16px);
          width: 100%;
        }

        /* Explicit placement */
        .reno-g-card--1 { grid-column: 1; grid-row: 1 / 3; }
        .reno-g-card--2 { grid-column: 2; grid-row: 1; }
        .reno-g-card--3 { grid-column: 3; grid-row: 1 / 3; }
        .reno-g-card--4 { grid-column: 2; grid-row: 2; }
        .reno-g-card--5 { grid-column: 1 / -1; grid-row: 3; }

        /* Card base */
        .reno-g-card {
          background: transparent;
          border: 1px solid rgba(0, 0, 0, 0.085);
          border-radius: 24px;
          padding: clamp(22px, 2.4vw, 32px);
          display: flex;
          flex-direction: column;
          gap: 18px;
          transition:
            transform 480ms cubic-bezier(0.32, 0.72, 0, 1),
            border-color 480ms cubic-bezier(0.32, 0.72, 0, 1),
            box-shadow 480ms cubic-bezier(0.32, 0.72, 0, 1);
          will-change: transform;
        }
        .reno-g-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0, 0, 0, 0.13);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);
        }

        /* Text block */
        .reno-g-text {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        /* Tall cards — push content to bottom */
        .reno-g-card--1,
        .reno-g-card--3 {
          justify-content: flex-end;
        }

        /* Middle column cards — hug content, no stretch */
        .reno-g-card--2,
        .reno-g-card--4 {
          align-self: start;
        }

        /* Video card: video fills space, text pinned to bottom */
        .reno-g-card--video {
          justify-content: flex-start;
          gap: 0;
          padding: 0;
          overflow: hidden;
        }
        .reno-g-video-wrap {
          flex: 1;
          min-height: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        .reno-g-video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          pointer-events: none;
          user-select: none;
        }
        .reno-g-card--video .reno-g-text {
          flex-shrink: 0;
          padding: clamp(16px, 1.8vw, 22px) clamp(22px, 2.4vw, 32px) clamp(22px, 2.4vw, 32px);
        }

        /* Full-width bottom card — horizontal layout on desktop */
        .reno-g-card--5 {
          flex-direction: row;
          align-items: center;
          gap: clamp(20px, 3vw, 36px);
        }
        .reno-g-card--5 .reno-g-text {
          gap: 6px;
        }

        .reno-g-title {
          color: #0D0D0D;
          font-weight: 600;
          font-size: clamp(17px, 1.6vw, 22px);
          line-height: 1.22;
          letter-spacing: -0.012em;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .reno-g-body {
          color: rgba(0, 0, 0, 0.58);
          font-weight: 400;
          font-size: clamp(13px, 1.05vw, 15px);
          line-height: 1.55;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .reno-g-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: unset;
          }
          .reno-g-card--1,
          .reno-g-card--2,
          .reno-g-card--3,
          .reno-g-card--4,
          .reno-g-card--5 {
            grid-column: unset;
            grid-row: unset;
          }
          .reno-g-card--5 {
            grid-column: 1 / -1;
          }
          .reno-g-card--1,
          .reno-g-card--3 {
            justify-content: flex-start;
          }
          .reno-g-card--5 {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 600px) {
          .reno-g-grid {
            grid-template-columns: 1fr;
          }
          .reno-g-card--5 {
            grid-column: unset;
          }
          .reno-g-header h2 {
            white-space: normal !important;
          }
          .reno-g-header p {
            white-space: normal !important;
          }
          .reno-g-title {
            white-space: normal;
          }
        }
      `}</style>
    </section>
  );
}
