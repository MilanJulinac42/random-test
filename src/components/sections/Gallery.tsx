import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { prefersReducedMotion, RENO_EASE, useScrollProgress } from "@/lib/anime";
import livingBefore from "@/assets/gallery/living-before.jpg";
import livingAfter from "@/assets/gallery/living-after.jpg";
import kitchenBefore from "@/assets/gallery/kitchen-before.jpg";
import kitchenAfter from "@/assets/gallery/kitchen-after.jpg";
import kidsBefore from "@/assets/gallery/kids-before.jpg";
import kidsAfter from "@/assets/gallery/kids-after.jpg";

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

  // Flat image refs — index = projectIndex * 2 + modeIndex (0 = before, 1 = after)
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const firstRunRef = useRef(true);

  /* Derive the active project from scroll progress. */
  useEffect(() => {
    const next = progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2;
    setActiveProject((cur) => (cur === next ? cur : next));
  }, [progress]);

  /* Animate project + before/after transitions with Anime.js. */
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
          animate(img, {
            opacity: visible ? 1 : 0,
            duration: 640,
            ease: RENO_EASE,
          });
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
      data-nav-theme="light"
      ref={wrapperRef}
      className="relative w-full"
      style={{ backgroundColor: "#FFFFFF", height: "300vh" }}
    >
      <div
        className="reno-gallery-sticky"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FFFFFF",
          padding: "clamp(20px, 4vw, 40px) clamp(16px, 2.4vw, 20px)",
          paddingTop: "clamp(72px, 9vw, 96px)",
          overflow: "hidden",
        }}
      >
        <h2
          style={{
            color: "#000000",
            fontWeight: 600,
            fontSize: "clamp(28px, 4.6vw, 64px)",
            lineHeight: 1.16,
            letterSpacing: "-0.02em",
            padding: "0 clamp(8px, 1.5vw, 24px)",
            marginBottom: "clamp(16px, 2vw, 24px)",
          }}
        >
          Delivered projects, not renders
        </h2>

        {/* Stage */}
        <div
          className="reno-gallery-stage"
          style={{
            position: "relative",
            flex: 1,
            minHeight: 0,
            borderRadius: "clamp(20px, 2.4vw, 35px)",
            overflow: "hidden",
            backgroundColor: "#0D0D0D",
          }}
        >
          {/* Images — 3 projects × (before, after) */}
          {projects.map((p, i) =>
            (["before", "after"] as Mode[]).map((m, mi) => (
              <img
                key={`${i}-${m}`}
                ref={(el) => {
                  imgRefs.current[i * 2 + mi] = el;
                }}
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
                  opacity: i === 0 && mi === 1 ? 1 : 0,
                }}
              />
            )),
          )}

          {/* Legibility scrim for the bottom-left info block */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "linear-gradient(to top right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 42%, rgba(0,0,0,0) 68%)",
            }}
          />

          {/* Info blocks — one per project, crossfaded */}
          {projects.map((p, i) => (
            <div
              key={p.title}
              ref={(el) => {
                infoRefs.current[i] = el;
              }}
              className="reno-gallery-info"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <span className="reno-gallery-location">{p.location}</span>
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

          {/* Before / After toggle */}
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
                    backgroundColor: isActive ? "#0D0D0D" : "#9A9A9A",
                    color: "#FFFFFF",
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
          left: clamp(20px, 4vw, 60px);
          bottom: clamp(28px, 6vw, 96px);
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.2vw, 14px);
          width: min(544px, calc(100% - 40px));
        }
        .reno-gallery-location {
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          font-weight: 500;
          font-size: clamp(11px, 1vw, 13px);
          letter-spacing: 0.14em;
        }
        .reno-gallery-title {
          color: #FFFFFF;
          font-weight: 600;
          font-size: clamp(28px, 4vw, 48px);
          line-height: 1.12;
          letter-spacing: -0.02em;
        }
        .reno-gallery-desc {
          color: rgba(255,255,255,0.7);
          font-weight: 500;
          font-size: clamp(14px, 1.5vw, 20px);
          line-height: 1.4;
          margin: 0;
        }
        .reno-gallery-progress {
          position: relative;
          width: min(420px, 100%);
          height: 4px;
          border-radius: 100px;
          background-color: rgba(255,255,255,0.2);
          margin-top: 4px;
        }
        .reno-gallery-progress-fill {
          position: absolute;
          top: 0;
          height: 4px;
          width: 33.333%;
          border-radius: 100px;
          background-color: #FFFFFF;
        }
        .reno-gallery-toggle {
          position: absolute;
          right: clamp(16px, 3vw, 40px);
          bottom: clamp(20px, 4vw, 40px);
          display: flex;
          gap: 8px;
        }
        .reno-gallery-toggle-btn {
          width: clamp(96px, 13vw, 177px);
          height: clamp(44px, 5vw, 56px);
          border-radius: 14px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: clamp(14px, 1.4vw, 17px);
          transition: background-color 280ms ease;
        }
      `}</style>
    </section>
  );
}
