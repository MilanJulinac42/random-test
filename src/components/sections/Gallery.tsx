import { useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { Reveal } from "@/components/Reveal";
import livingBefore from "@/assets/gallery/living-before.jpg";
import livingAfter from "@/assets/gallery/living-after.jpg";
import kitchenBefore from "@/assets/gallery/kitchen-before.jpg";
import kitchenAfter from "@/assets/gallery/kitchen-after.jpg";
import kidsBefore from "@/assets/gallery/kids-before.jpg";
import kidsAfter from "@/assets/gallery/kids-after.jpg";

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
    before: livingBefore,
    after: livingAfter,
    title: "Living space",
    neighbourhood: "Downtown Dubai",
    specs: "AED 420k · 14 weeks · 6 rooms",
    quote: "Perched high above the city, this family apartment is defined by soft oak, seamless micro cement floors, and light that moves gently across curved seating and custom timber cladding in the living room. In the kitchen, layered wood joinery and a sculpted island create a quiet focal point, while the children’s bedroom introduces playful forms and built-in details that feel warm and thoughtfully designed.",
  },
  {
    before: kitchenBefore,
    after: kitchenAfter,
    title: "Kitchen",
    neighbourhood: "Green Community",
    specs: "AED 180k · 8 weeks · 1 kitchen",
    quote: "This family villa centers around a generous kitchen with a built-in coffee bar, flowing into spacious dining and lounge areas designed for long, relaxed gatherings. A soft blue children’s room adds a playful note to the natural wood and stone palette, shaping a home that feels easy, social, and made for everyday family life.",
  },
  {
    before: kidsBefore,
    after: kidsAfter,
    title: "Kid’s Bedroom",
    neighbourhood: "Downtown Dubai",
    specs: "AED 95k · 5 weeks · 1 bedroom",
    quote: "This three-bedroom family apartment was reconfigured to include a dedicated home office, with custom walnut joinery and integrated lighting bringing warmth and structure to the workspace. In the children’s room, a bespoke bunk bed and dual built-in desks create individual corners for study and rest, balancing privacy with a sense of shared comfort.",
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
          className="reno-ba-handle absolute top-1/2 left-1/2 flex items-center justify-center rounded-full"
          style={{
            transform: "translate(-50%, -50%)",
            background: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.2)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            cursor: "grab",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M6 4 L2 8 L6 12" stroke="#444" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 4 L14 8 L10 12" stroke="#444" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
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
        .reno-ba-handle { width: 44px; height: 44px; }
        @media (min-width: 768px) {
          .reno-ba-handle { width: 36px; height: 36px; }
        }
      `}</style>
    </section>
  );
}
