import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { prefersReducedMotion, RENO_EASE, useScrollProgress } from "@/lib/anime";
import { WordReveal } from "@/components/WordReveal";
import livingBefore from "@/assets/gallery/living-before.png";
import livingAfter from "@/assets/gallery/living-after.png";
import kitchenBefore from "@/assets/gallery/kitchen-before.png";
import kitchenAfter from "@/assets/gallery/kitchen-after.png";
import kidsBefore from "@/assets/gallery/kids-before.png";
import kidsAfter from "@/assets/gallery/kids-after.png";

type Project = {
  title: string;
  location: string;
  desc: string;
  before: string;
  after: string;
};

const projects: Project[] = [
  {
    title: "Living space",
    location: "Downtown Dubai",
    desc: "Perched high above the city, this family apartment is defined by soft oak, seamless micro cement floors, and light that moves gently across curved seating and custom timber cladding in the living room.",
    before: livingBefore,
    after: livingAfter,
  },
  {
    title: "Kitchen & dining",
    location: "Green Community",
    desc: "This family villa centers around a generous kitchen with a built-in coffee bar, flowing into spacious dining and lounge areas designed for long, relaxed gatherings.",
    before: kitchenBefore,
    after: kitchenAfter,
  },
  {
    title: "Kid's bedroom",
    location: "Downtown Dubai",
    desc: "In the children's room, a bespoke bunk bed and dual built-in desks create individual corners for study and rest, balancing privacy with a sense of shared comfort.",
    before: kidsBefore,
    after: kidsAfter,
  },
];

type Mode = "before" | "after";

export function Gallery() {
  const { ref: wrapperRef, progress } = useScrollProgress<HTMLDivElement>();
  const [activeProject, setActiveProject] = useState(0);
  const [mode, setMode] = useState<Mode>("after");

  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const firstRunRef = useRef(true);

  useEffect(() => {
    const next = progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2;
    setActiveProject((cur) => (cur === next ? cur : next));
  }, [progress]);

  useLayoutEffect(() => {
    const reduced = prefersReducedMotion();
    const first = firstRunRef.current;
    const modeIdx = mode === "after" ? 1 : 0;

    for (let i = 0; i < projects.length; i++) {
      for (let m = 0; m < 2; m++) {
        const img = imgRefs.current[i * 2 + m];
        if (!img) continue;
        const visible = i === activeProject && m === modeIdx;
        if (reduced || first) {
          img.style.opacity = visible ? "1" : "0";
        } else {
          animate(img, { opacity: visible ? 1 : 0, duration: 640, ease: RENO_EASE });
        }
      }
    }

    infoRefs.current.forEach((info, i) => {
      if (!info) return;
      const visible = i === activeProject;
      info.style.pointerEvents = visible ? "auto" : "none";
      if (reduced || first) {
        info.style.opacity = visible ? "1" : "0";
        info.style.transform = "translateY(0)";
      } else {
        animate(info, {
          opacity: visible ? 1 : 0,
          translateY: visible ? [18, 0] : [0, 18],
          duration: 520,
          ease: RENO_EASE,
        });
      }
    });

    firstRunRef.current = false;
  }, [activeProject, mode]);

  return (
    <section
      id="gallery"
      data-nav-theme="dark"
      ref={wrapperRef}
      className="relative w-full"
      style={{ backgroundColor: "#FFFFFF", height: "300vh" }}
    >
      {/* ── Sticky viewport ── */}
      <div
        className="reno-gallery-sticky"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        {/* Image card — full viewport like the hero */}
        <div
          className="reno-gallery-stage"
          style={{
            position: "absolute",
            top: "clamp(8px,1.2vw,15px)",
            bottom: "clamp(8px,1.2vw,15px)",
            left: "clamp(8px,1.2vw,15px)",
            right: "clamp(8px,1.2vw,15px)",
            borderRadius: 24,
            overflow: "hidden",
            backgroundColor: "#E8E3DB",
          }}
        >
          {/* Images — 3 projects × (before, after) */}
          {projects.map((p, i) =>
            (["before", "after"] as Mode[]).map((m, mi) => (
              <img
                key={`${i}-${m}`}
                ref={(el) => { imgRefs.current[i * 2 + mi] = el; }}
                src={m === "before" ? p.before : p.after}
                alt={i === activeProject && m === mode ? `${p.title} — ${m}` : ""}
                aria-hidden={!(i === activeProject && m === mode)}
                loading={i === 0 ? "eager" : "lazy"}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  opacity: i === 0 && mi === 1 ? 1 : 0,
                }}
              />
            ))
          )}


          {/* Heading — top-left inside the image */}
          <WordReveal
            as="h2"
            variant="slide-right"
            style={{
              position: "absolute",
              top: "clamp(12px,1.4vw,20px)",
              left: "clamp(20px,2.2vw,28px)",
              right: "clamp(20px,2.2vw,28px)",
              zIndex: 2,
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: "clamp(32px,5vw,68px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Delivered projects, not renders
          </WordReveal>

          {/* Info blocks — one per project, crossfaded */}
          {projects.map((p, i) => (
            <div
              key={p.title}
              ref={(el) => { infoRefs.current[i] = el; }}
              className="reno-gallery-info"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <h3 className="reno-gallery-title">{p.title}</h3>
              <p className="reno-gallery-desc">{p.desc}</p>
              <div className="reno-gallery-progress">
                <div
                  className="reno-gallery-progress-fill"
                  style={{ left: `${i * (100 / 3)}%` }}
                />
              </div>
            </div>
          ))}

          {/* Before / After toggle — inside image, bottom-right */}
          <div
            className="reno-gallery-toggle"
            role="group"
            aria-label="Before or after view"
          >
            {(["before", "after"] as Mode[]).map((m) => {
              const isActive = mode === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  aria-pressed={isActive}
                  className="reno-gallery-toggle-btn"
                  style={{
                    backgroundColor: isActive ? "#FFFFFF" : "rgba(255,255,255,0.18)",
                    color: isActive ? "#0D0D0D" : "rgba(255,255,255,0.8)",
                  }}
                >
                  {m === "before" ? "Before" : "After"}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .reno-gallery-info {
          position: absolute;
          left: clamp(20px,3.2vw,48px);
          bottom: clamp(36px,5.5vw,72px);
          display: flex;
          flex-direction: column;
          gap: clamp(6px,0.8vw,10px);
          width: min(520px, calc(100% - 80px));
        }
        .reno-gallery-title {
          color: #FFFFFF;
          font-weight: 600;
          font-size: clamp(28px,3.4vw,48px);
          line-height: 1.15;
          letter-spacing: -0.02em;
        }
        .reno-gallery-desc {
          color: rgba(255,255,255,0.72);
          font-weight: 400;
          font-size: clamp(13px,1.2vw,17px);
          line-height: 1.55;
          margin: 0;
        }
        .reno-gallery-progress {
          position: relative;
          width: min(400px, 100%);
          height: 3px;
          border-radius: 100px;
          background-color: rgba(255,255,255,0.22);
          margin-top: 10px;
        }
        .reno-gallery-progress-fill {
          position: absolute;
          top: 0;
          height: 3px;
          width: 33.333%;
          border-radius: 100px;
          background-color: #FFFFFF;
        }

        /* Toggle — inside image card, bottom-right */
        .reno-gallery-toggle {
          position: absolute;
          bottom: clamp(16px,1.6vw,24px);
          right: clamp(20px,2vw,28px);
          display: flex;
          gap: 8px;
          z-index: 2;
        }
        .reno-gallery-toggle-btn {
          width: clamp(100px,10vw,144px);
          height: clamp(44px,4.6vw,56px);
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: clamp(13px,1.2vw,16px);
          letter-spacing: 0.01em;
          transition: background-color 280ms ease, color 280ms ease;
        }

        /* ── Mobile — disable sticky, stack naturally ── */
        @media (max-width: 767px) {
          .reno-gallery-sticky {
            position: relative !important;
            height: auto !important;
            padding: 24px 16px 80px;
          }
        }
      `}</style>
    </section>
  );
}
