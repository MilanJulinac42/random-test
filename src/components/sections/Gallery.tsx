import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import livingBefore from "@/assets/gallery/living-before.jpg";
import livingAfter from "@/assets/gallery/living-after.jpg";
import kitchenBefore from "@/assets/gallery/kitchen-before.jpg";
import kitchenAfter from "@/assets/gallery/kitchen-after.jpg";
import kidsBefore from "@/assets/gallery/kids-before.jpg";
import kidsAfter from "@/assets/gallery/kids-after.jpg";

interface Project {
  before: string;
  after: string;
  location: string;
  name: string;
  quote: string;
}

const projects: Project[] = [
  {
    before: livingBefore,
    after: livingAfter,
    location: "Downtown Dubai",
    name: "Living space renovation",
    quote:
      "Perched high above the city, this family apartment is defined by soft oak, seamless micro cement floors, and light that moves gently across curved seating and custom timber cladding in the living room. In the kitchen, layered wood joinery and a sculpted island create a quiet focal point, while the children's bedroom introduces playful forms and built-in details that feel warm and thoughtfully designed.",
  },
  {
    before: kitchenBefore,
    after: kitchenAfter,
    location: "Green Community",
    name: "Kitchen & dining",
    quote:
      "This family villa centers around a generous kitchen with a built-in coffee bar, flowing into spacious dining and lounge areas designed for long, relaxed gatherings. A soft blue children's room adds a playful note to the natural wood and stone palette, shaping a home that feels easy, social, and made for everyday family life.",
  },
  {
    before: kidsBefore,
    after: kidsAfter,
    location: "Downtown Dubai",
    name: "Kid's bedroom",
    quote:
      "This three-bedroom family apartment was reconfigured to include a dedicated home office, with custom walnut joinery and integrated lighting bringing warmth and structure to the workspace. In the children's room, a bespoke bunk bed and dual built-in desks create individual corners for study and rest, balancing privacy with a sense of shared comfort.",
  },
];

function BeforeAfterSlider({ project, fullHeight }: { project: Project; fullHeight?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  };

  const onPointerDown = (e: RPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = (e: RPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  return (
    <div
      ref={containerRef}
      className={fullHeight ? "relative overflow-hidden select-none w-full h-full" : "reno-card-img relative overflow-hidden select-none w-full"}
      style={{ touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <img
        src={project.before}
        alt={`${project.name} before`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      />
      <img
        src={project.after}
        alt={`${project.name} after`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      />

      <span
        className="absolute"
        style={{
          bottom: 12,
          left: 16,
          fontSize: 10,
          fontWeight: 500,
          color: "white",
          background: "rgba(0,0,0,0.42)",
          padding: "3px 10px",
          borderRadius: 20,
          zIndex: 2,
        }}
      >
        Before
      </span>
      <span
        className="absolute"
        style={{
          bottom: 12,
          right: 16,
          fontSize: 10,
          fontWeight: 500,
          color: "white",
          background: "rgba(0,0,0,0.42)",
          padding: "3px 10px",
          borderRadius: 20,
          zIndex: 2,
        }}
      >
        After
      </span>

      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{ left: `${pos}%`, transform: "translateX(-50%)", zIndex: 3 }}
      >
        <div className="h-full" style={{ width: 2, background: "white" }} />
        <div
          className="reno-ba-handle absolute top-1/2 left-1/2 flex items-center justify-center rounded-full"
          style={{
            transform: "translate(-50%, -50%)",
            background: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.12)",
            cursor: "grab",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M6 4 L2 8 L6 12" stroke="#444" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 4 L14 8 L10 12" stroke="#444" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ProjectInfo({ project }: { project: Project }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p
        className="uppercase"
        style={{ fontSize: 12, letterSpacing: "0.12em", color: "#777", margin: 0 }}
      >
        {project.location}
      </p>
      <h3
        style={{
          marginTop: 12,
          fontSize: "clamp(28px, 3vw, 40px)",
          fontWeight: 600,
          color: "#fff",
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
        }}
      >
        {project.name}
      </h3>
      <p
        style={{
          marginTop: 20,
          fontSize: 16,
          lineHeight: 1.75,
          color: "#aaa",
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {project.quote}
      </p>
      <a
        href="#"
        className="reno-view-link"
        style={{
          marginTop: 32,
          fontSize: 14,
          color: "#fff",
          textDecoration: "none",
          alignSelf: "flex-start",
        }}
      >
        View project →
      </a>
    </div>
  );
}

function PinnedHeader() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: "56px 64px 0",
        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      <p
        className="uppercase"
        style={{ fontSize: 14, letterSpacing: "0.12em", color: "#482FFF", fontWeight: 500, margin: 0 }}
      >
        OUR WORK
      </p>
      <h2
        className="text-white"
        style={{
          marginTop: 16,
          fontSize: "clamp(40px, 5vw, 64px)",
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
        }}
      >
        Delivered projects, not renders.
      </h2>
    </div>
  );
}

export function Gallery() {
  const isMobile = useIsMobile();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      const idx = progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2;
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <section
        id="gallery"
        data-nav-theme="dark"
        className="relative w-full"
        style={{ backgroundColor: "#0D0D0D", paddingTop: 96, paddingBottom: 96 }}
      >
        <div className="px-6">
          <p
            className="uppercase"
            style={{ fontSize: 14, letterSpacing: "0.12em", color: "#482FFF", fontWeight: 500 }}
          >
            OUR WORK
          </p>
          <h2
            className="text-white mt-5"
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Delivered projects, not renders.
          </h2>
        </div>

        <div className="flex flex-col" style={{ gap: 56, marginTop: 48 }}>
          {projects.map((p) => (
            <div key={p.name}>
              <BeforeAfterSlider project={p} />
              <div style={{ padding: "24px 24px 0" }}>
                <ProjectInfo project={p} />
              </div>
            </div>
          ))}
        </div>

        <style>{`
          .reno-card-img { height: 280px; }
          .reno-ba-handle { width: 44px; height: 44px; }
          .reno-view-link:hover { text-decoration: underline; }
        `}</style>
      </section>
    );
  }

  return (
    <section
      id="gallery"
      data-nav-theme="dark"
      ref={wrapperRef}
      className="relative w-full"
      style={{ backgroundColor: "#0a0a0a", height: "300vh" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#0a0a0a",
        }}
      >
        <PinnedHeader />

        {projects.map((p, i) => (
          <div
            key={p.name}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              opacity: active === i ? 1 : 0,
              pointerEvents: active === i ? "auto" : "none",
              transition: "opacity 0.5s ease",
            }}
          >
            {/* Left 55% — slider */}
            <div style={{ width: "55%", height: "100%", paddingTop: 80 }}>
              <BeforeAfterSlider project={p} fullHeight />
            </div>
            {/* Right 45% — info */}
            <div
              style={{
                width: "45%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                padding: "0 64px",
              }}
            >
              <ProjectInfo project={p} />
            </div>
          </div>
        ))}

        {/* Progress indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            right: 40,
            fontSize: 13,
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.45)",
            fontWeight: 400,
            zIndex: 6,
          }}
        >
          {String(active + 1).padStart(2, "0")} / 03
        </div>
      </div>

      <style>{`
        .reno-ba-handle { width: 40px; height: 40px; }
        .reno-view-link:hover { text-decoration: underline; }
      `}</style>
    </section>
  );
}
