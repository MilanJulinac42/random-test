import { useAnimeReveal, useScrollProgress } from "@/lib/anime";
import renoMark from "@/assets/reno-mark.png";

const LINE_ONE = "Whole journey, beautifully handled.";
const LINE_TWO =
  "Reno unifies design, financing and execution into one effortless experience.";

const WORDS = LINE_TWO.split(" ");
const DIM = 0.3;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

/**
 * Reno brand statement — a pinned section where the dim second line
 * fills to full opacity, word by word, as the user scrolls through.
 */
export function RenoStatement() {
  const { ref: wrapperRef, progress } = useScrollProgress<HTMLDivElement>();
  const lineOneRef = useAnimeReveal<HTMLHeadingElement>({ translateY: 24 });
  const markRef = useAnimeReveal<HTMLImageElement>({
    translateY: 0,
    fadeOnly: true,
    duration: 1100,
  });

  return (
    <section
      data-nav-theme="dark"
      ref={wrapperRef}
      className="relative w-full"
      style={{ backgroundColor: "#000000", height: "200vh" }}
    >
      <div
        className="reno-statement-sticky"
        style={{
          position: "sticky",
          top: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#000000",
          padding: "clamp(56px, 8vw, 80px)",
          overflow: "hidden",
        }}
      >
        {/* Decorative background glows */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ overflow: "hidden" }}
        >
          <div
            style={{
              position: "absolute",
              left: "-16%",
              top: "0%",
              width: 720,
              height: 900,
              background:
                "radial-gradient(circle, rgba(70,52,220,0.32) 0%, rgba(70,52,220,0) 68%)",
              filter: "blur(36px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "-18%",
              bottom: "-20%",
              width: 900,
              height: 900,
              background:
                "radial-gradient(circle, rgba(40,30,160,0.42) 0%, rgba(40,30,160,0) 70%)",
              filter: "blur(36px)",
            }}
          />
        </div>

        <div className="reno-statement-row">
          {/* Text */}
          <div className="reno-statement-text">
            <h2 ref={lineOneRef} className="reno-statement-line reno-statement-line-1">
              {LINE_ONE}
            </h2>
            <p
              className="reno-statement-line reno-statement-line-2"
              aria-label={LINE_TWO}
            >
              {WORDS.map((word, i) => {
                const lit = progress * 1.15 * WORDS.length - i;
                const opacity = DIM + (1 - DIM) * clamp(lit, 0, 1);
                return (
                  <span key={`${word}-${i}`} aria-hidden style={{ opacity }}>
                    {word}
                    {i < WORDS.length - 1 ? " " : ""}
                  </span>
                );
              })}
            </p>
          </div>

          {/* Reno mark */}
          <img
            ref={markRef}
            src={renoMark}
            alt=""
            aria-hidden
            className="reno-statement-mark"
          />
        </div>
      </div>

      <style>{`
        .reno-statement-row {
          position: relative;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(24px, 4vw, 48px);
        }
        .reno-statement-text {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .reno-statement-line {
          color: #FFFFFF;
          font-weight: 600;
          font-size: clamp(28px, 4.6vw, 64px);
          line-height: 1.22;
          letter-spacing: -0.02em;
          margin: 0;
          max-width: 746px;
        }
        .reno-statement-line-2 {
          color: transparent;
        }
        .reno-statement-mark {
          width: clamp(220px, 42vw, 640px);
          height: auto;
          object-fit: contain;
          user-select: none;
        }
        @media (min-width: 900px) {
          .reno-statement-row {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          .reno-statement-text { flex: 1; }
        }
      `}</style>
    </section>
  );
}
