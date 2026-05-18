import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { prefersReducedMotion, RENO_EASE, useScrollProgress } from "@/lib/anime";
import { WordReveal } from "@/components/WordReveal";
import process01 from "@/assets/process-01.jpg";
import process02 from "@/assets/process-02.jpg";
import process03 from "@/assets/process-03.jpg";

type Step = {
  title: string;
  body: string;
  image: string;
};

const steps: Step[] = [
  {
    title: "Design and planning",
    body: "A dedicated Reno designer turns your vision into a full plan — scope, budget, and timeline. You sign off before a single contractor is engaged.",
    image: process01,
  },
  {
    title: "Build and track",
    body: "Work begins with vetted contractors. At every milestone you get photo updates and a site inspection — payment only releases when you're satisfied.",
    image: process02,
  },
  {
    title: "Handover and warranty",
    body: "You walk through the completed space with the Reno team before sign-off. Snagging items are logged and resolved — all covered by a written warranty.",
    image: process03,
  },
];

export function Process() {
  const { ref: wrapperRef, progress } = useScrollProgress<HTMLDivElement>();
  const [active, setActive] = useState(0);

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bodyWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const firstRunRef = useRef(true);

  /* Derive the active step from scroll progress through the tall wrapper. */
  useEffect(() => {
    const next = progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2;
    setActive((cur) => (cur === next ? cur : next));
  }, [progress]);

  /* Animate the transition between steps with Anime.js. */
  useLayoutEffect(() => {
    const reduced = prefersReducedMotion();
    const first = firstRunRef.current;

    const ACTIVE_BG = "rgba(255,255,255,0.06)";
    const INACTIVE_BG = "rgba(255,255,255,0)";

    bodyWrapRefs.current.forEach((wrap, i) => {
      if (!wrap) return;
      const isActive = i === active;
      const inner = wrap.firstElementChild as HTMLElement | null;

      if (reduced || first) {
        wrap.style.height = isActive ? "auto" : "0px";
        if (inner) inner.style.opacity = isActive ? "1" : "0";
      } else {
        if (wrap.style.height === "auto" || wrap.style.height === "") {
          wrap.style.height = `${wrap.scrollHeight}px`;
        }
        const targetH = isActive ? wrap.scrollHeight : 0;
        animate(wrap, {
          height: targetH,
          duration: 520,
          ease: RENO_EASE,
          onComplete: () => {
            if (isActive) wrap.style.height = "auto";
          },
        });
        if (inner) {
          animate(inner, {
            opacity: isActive ? 1 : 0,
            translateY: isActive ? [10, 0] : [0, 6],
            duration: 440,
            ease: RENO_EASE,
          });
        }
      }
    });

    stepRefs.current.forEach((step, i) => {
      if (!step) return;
      const isActive = i === active;
      if (reduced || first) {
        step.style.backgroundColor = isActive ? ACTIVE_BG : INACTIVE_BG;
      } else {
        animate(step, {
          backgroundColor: isActive ? ACTIVE_BG : INACTIVE_BG,
          duration: 460,
          ease: RENO_EASE,
        });
      }
    });

    imgRefs.current.forEach((img, i) => {
      if (!img) return;
      const isActive = i === active;
      if (reduced || first) {
        img.style.opacity = isActive ? "1" : "0";
      } else {
        animate(img, {
          opacity: isActive ? 1 : 0,
          scale: isActive ? [1.04, 1] : 1,
          duration: 640,
          ease: RENO_EASE,
        });
      }
    });

    firstRunRef.current = false;
  }, [active]);

  return (
    <section
      id="how-it-works"
      data-nav-theme="dark"
      ref={wrapperRef}
      className="relative w-full"
      style={{ backgroundColor: "#0A0A0A", height: "300vh" }}
    >
      <div
        className="reno-process-sticky"
        style={{
          position: "sticky",
          top: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0A0A0A",
          paddingBlock: "clamp(56px, 8vw, 80px)",
          paddingInline: "clamp(20px, 6vw, 80px)",
          overflow: "hidden",
        }}
      >
        <div
          className="reno-process-inner"
          style={{ width: "100%", maxWidth: 1280, margin: "0 auto" }}
        >
          <WordReveal
            as="h2"
            variant="drop"
            style={{
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: "clamp(32px, 5vw, 64px)",
              lineHeight: 1.18,
              letterSpacing: "-0.02em",
              marginBottom: "clamp(28px, 4vw, 40px)",
            }}
          >
            From first call to keys in hand.
          </WordReveal>

          <div className="reno-process-row">
            {/* Steps */}
            <div className="reno-process-steps">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="reno-process-step"
                >
                  <div className="reno-process-step-title">{step.title}</div>
                  <div
                    ref={(el) => {
                      bodyWrapRefs.current[i] = el;
                    }}
                    className="reno-process-body-wrap"
                  >
                    <p className="reno-process-body-text">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Media */}
            <div className="reno-process-media-shell">
              <div className="reno-process-media">
                {steps.map((step, i) => (
                  <img
                    key={step.image}
                    ref={(el) => {
                      imgRefs.current[i] = el;
                    }}
                    src={step.image}
                    alt={`${step.title} — Reno app`}
                    loading="lazy"
                    className="reno-process-media-img"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .reno-process-row {
          display: flex;
          flex-direction: column-reverse;
          gap: 32px;
        }
        .reno-process-steps {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }
        .reno-process-step {
          border-radius: 24px;
          padding: clamp(16px, 2.2vw, 22px) clamp(18px, 2.6vw, 28px);
          background-color: rgba(255,255,255,0);
        }
        .reno-process-step-title {
          color: #FFFFFF;
          font-weight: 600;
          font-size: clamp(22px, 2.8vw, 32px);
          line-height: 1.25;
          letter-spacing: -0.01em;
        }
        .reno-process-body-wrap {
          overflow: hidden;
          height: 0;
        }
        .reno-process-body-text {
          color: rgba(255,255,255,0.68);
          font-weight: 400;
          font-size: clamp(15px, 1.5vw, 20px);
          line-height: 1.5;
          padding-top: 10px;
          margin: 0;
        }
        .reno-process-media-shell {
          position: relative;
          width: 100%;
          max-width: 433px;
          align-self: center;
          flex-shrink: 0;
          border-radius: 24px;
          box-shadow: 0 22px 48px rgba(0,0,0,0.4);
        }
        .reno-process-media {
          position: relative;
          width: 100%;
          aspect-ratio: 417 / 505;
          border-radius: 24px;
          overflow: hidden;
          border-radius: inherit;
        }
        .reno-process-media-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (min-width: 900px) {
          .reno-process-row {
            flex-direction: row;
            align-items: center;
            gap: 40px;
          }
          .reno-process-steps {
            gap: 24px;
          }
          .reno-process-media-shell {
            align-self: stretch;
            max-height: 521px;
          }
          .reno-process-media {
            max-height: 505px;
          }
        }
      `}</style>
    </section>
  );
}
