import { useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { Reveal } from "@/components/Reveal";

interface Project {
  before: string;
  after: string;
  title: string;
  neighbourhood: string;
  specs: string;
  quote: string;
}

const projects: Project[] = [
  {
    before: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80",
    after: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
    title: "Full villa transformation",
    neighbourhood: "Downtown Dubai",
    specs: "AED 420k · 14 weeks · 6 rooms",
    quote: "Perched high above the city, this family apartment is defined by soft oak, seamless micro cement floors, and light that moves gently across curved seating and custom timber cladding in the living room. In the kitchen, layered wood joinery and a sculpted island create a quiet focal point, while the children’s bedroom introduces playful forms and built-in details that feel warm and thoughtfully designed.",
  },
  {
    before: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80",
    after: "https://images.unsplash.com/photo-1556909211-d5b0e2bedd5e?auto=format&fit=crop&w=1600&q=80",
    title: "Open-plan kitchen rebuild",
    neighbourhood: "Arabian Ranches",
    specs: "AED 180k · 8 weeks · 1 kitchen",
    quote: "Fixed price held to the day — and the finish exceeded what we'd seen on Pinterest.",
  },
  {
    before: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80",
    after: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1600&q=80",
    title: "Master bathroom redesign",
    neighbourhood: "Palm Jumeirah",
    specs: "AED 95k · 5 weeks · 1 bathroom",
    quote: "Every milestone needed our approval before money moved — it built real trust.",
  },
];

function BeforeAfterSlider({ project }: { project: Project }) {
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
      className="relative overflow-hidden select-none w-full"
      style={{ aspectRatio: "16 / 10", touchAction: "none", borderRadius: 4 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <img
        src={project.before}
        alt={`${project.title} before`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      />
      <img
        src={project.after}
        alt={`${project.title} after`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      />

      <span
        className="absolute uppercase font-medium"
        style={{
          top: 12,
          left: 12,
          fontSize: 10,
          letterSpacing: "0.12em",
          color: "white",
          background: "rgba(0,0,0,0.4)",
          padding: "4px 8px",
          borderRadius: 2,
        }}
      >
        Before
      </span>
      <span
        className="absolute uppercase font-medium"
        style={{
          top: 12,
          right: 12,
          fontSize: 10,
          letterSpacing: "0.12em",
          color: "white",
          background: "rgba(0,0,0,0.4)",
          padding: "4px 8px",
          borderRadius: 2,
        }}
      >
        After
      </span>

      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="h-full" style={{ width: 2, background: "white" }} />
        <div
          className="absolute top-1/2 left-1/2 flex items-center justify-center rounded-full bg-white"
          style={{
            transform: "translate(-50%, -50%)",
            width: 28,
            height: 28,
            cursor: "grab",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M5 3 L2 7 L5 11" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 3 L12 7 L9 11" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 1; // 0,2 = odd row visually (row 1, 3); 1 = even (row 2) → flip
  return (
    <Reveal>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center py-12 md:py-20">
        {/* Metadata */}
        <div
          className={[
            "md:col-span-5",
            isEven ? "md:order-2" : "md:order-1",
          ].join(" ")}
        >
          <span
            className="inline-block"
            style={{
              background: "#F5F2EE",
              color: "#4A24FF",
              fontSize: 12,
              borderRadius: 20,
              padding: "4px 12px",
              fontWeight: 500,
            }}
          >
            {project.neighbourhood}
          </span>
          <h3
            className="mt-4"
            style={{
              fontSize: "clamp(28px, 3.5vw, 36px)",
              fontWeight: 700,
              color: "#0D0D0D",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            {project.title}
          </h3>
          <p style={{ fontSize: 13, color: "#888", marginTop: 8 }}>{project.specs}</p>
          <p
            style={{
              fontSize: 15,
              color: "#555",
              marginTop: 16,
              fontStyle: "italic",
              lineHeight: 1.55,
              maxWidth: 420,
            }}
          >
            "{project.quote}"
          </p>
        </div>

        {/* Slider */}
        <div className={["md:col-span-7", isEven ? "md:order-1" : "md:order-2"].join(" ")}>
          <BeforeAfterSlider project={project} />
        </div>
      </div>
    </Reveal>
  );
}

export function Gallery() {
  return (
    <section
      id="gallery"
      data-nav-theme="light"
      className="relative overflow-hidden px-6 md:px-12 lg:px-16"
      style={{ backgroundColor: "#FFFFFF", paddingTop: "clamp(64px, 8vw, 96px)", paddingBottom: "clamp(64px, 8vw, 96px)" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <p
            className="uppercase"
            style={{ color: "#4A24FF", fontSize: 11, letterSpacing: "0.12em", fontWeight: 500 }}
          >
            OUR WORK
          </p>
          <h2
            className="mt-4"
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 700,
              color: "#0D0D0D",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              maxWidth: 720,
            }}
          >
            Results that speak for themselves.
          </h2>
        </Reveal>

        <div className="mt-8">
          {projects.map((p, i) => (
            <div
              key={p.title}
              style={{
                borderTop: i === 0 ? "none" : "0.5px solid #E5E5E5",
              }}
            >
              <ProjectRow project={p} index={i} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <a
            href="#quiz"
            className="reno-outline-cta inline-flex items-center justify-center"
            style={{
              border: "1.5px solid #0D0D0D",
              background: "transparent",
              color: "#0D0D0D",
              borderRadius: 4,
              padding: "14px 32px",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.01em",
              transition: "background-color 200ms ease, color 200ms ease",
            }}
          >
            Is your home next?
          </a>
        </div>
      </div>

      <style>{`
        .reno-outline-cta:hover {
          background-color: #0D0D0D !important;
          color: #FFFFFF !important;
        }
      `}</style>
    </section>
  );
}
