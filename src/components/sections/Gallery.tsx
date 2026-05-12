import { useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { Clock, LayoutGrid } from "lucide-react";
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
  location: string;
  name: string;
  price: string;
  duration: string;
  rooms: string;
  scope: string;
  quote: string;
}

const projects: Project[] = [
  {
    before: livingBefore,
    after: livingAfter,
    location: "Downtown Dubai",
    name: "Living space renovation",
    price: "AED 420k",
    duration: "14 weeks",
    rooms: "6 rooms",
    scope: "Full renovation",
    quote:
      "Perched high above the city, this family apartment is defined by soft oak, seamless micro cement floors, and light that moves gently across curved seating and custom timber cladding in the living room. In the kitchen, layered wood joinery and a sculpted island create a quiet focal point, while the children’s bedroom introduces playful forms and built-in details that feel warm and thoughtfully designed.",
  },
  {
    before: kitchenBefore,
    after: kitchenAfter,
    location: "Green Community",
    name: "Kitchen & dining",
    price: "AED 180k",
    duration: "8 weeks",
    rooms: "1 kitchen",
    scope: "Kitchen",
    quote:
      "This family villa centers around a generous kitchen with a built-in coffee bar, flowing into spacious dining and lounge areas designed for long, relaxed gatherings. A soft blue children’s room adds a playful note to the natural wood and stone palette, shaping a home that feels easy, social, and made for everyday family life.",
  },
  {
    before: kidsBefore,
    after: kidsAfter,
    location: "Downtown Dubai",
    name: "Kid's bedroom",
    price: "AED 95k",
    duration: "5 weeks",
    rooms: "1 bedroom",
    scope: "Bedroom",
    quote:
      "This three-bedroom family apartment was reconfigured to include a dedicated home office, with custom walnut joinery and integrated lighting bringing warmth and structure to the workspace. In the children’s room, a bespoke bunk bed and dual built-in desks create individual corners for study and rest, balancing privacy with a sense of shared comfort.",
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
      className="reno-card-img relative overflow-hidden select-none w-full"
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

      {/* Location badge */}
      <span
        className="absolute"
        style={{
          top: 12,
          left: 12,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.03em",
          color: "white",
          background: "rgba(0,0,0,0.42)",
          padding: "4px 12px",
          borderRadius: 999,
          zIndex: 2,
        }}
      >
        {project.location}
      </span>

      {/* Before / After labels */}
      <span
        className="absolute"
        style={{
          bottom: 10,
          left: 12,
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
          bottom: 10,
          right: 12,
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

      {/* Divider + handle */}
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

function ProjectCard({ project }: { project: Project }) {
  

  return (
    <article
      style={{
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        background: "#FFFFFF",
      }}
    >
      <BeforeAfterSlider project={project} />

      <div style={{ padding: "20px 24px 24px" }}>
        {/* Row 1 */}
        <div className="flex items-start justify-between gap-4">
          <h3 style={{ fontSize: "clamp(24px, 2.4vw, 28px)", fontWeight: 600, color: "#0D0D0D", lineHeight: 1.25 }}>
            {project.name}
          </h3>
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#0D0D0D",
              whiteSpace: "nowrap",
            }}
          >
            {project.price}
          </span>
        </div>

        {/* Row 2 */}
        <div className="flex items-center" style={{ gap: 14, marginTop: 10 }}>
          <span className="inline-flex items-center" style={{ gap: 8, fontSize: 20, fontWeight: 700, color: "#0D0D0D" }}>
            <Clock size={20} strokeWidth={1.75} />
            {project.duration}
          </span>
          <span style={{ fontSize: 20, fontWeight: 400, color: "rgba(0,0,0,0.3)" }}>·</span>
          <span className="inline-flex items-center" style={{ gap: 8, fontSize: 20, fontWeight: 700, color: "#0D0D0D" }}>
            <LayoutGrid size={20} strokeWidth={1.75} />
            {project.rooms}
          </span>
        </div>

        {/* Row 3 — description */}
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.65,
            color: "#555",
            marginTop: 12,
          }}
        >
          {project.quote}
        </p>
      </div>
    </article>
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
            style={{ color: "#482FFF", fontSize: 11, letterSpacing: "0.12em", fontWeight: 500 }}
          >
            OUR WORK
          </p>
          <h2
            className="mt-4"
            style={{
              fontSize: "clamp(36px, 5vw, 48px)",
              fontWeight: 700,
              color: "#0D0D0D",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Delivered projects, not renders.
          </h2>
        </Reveal>

        <div className="flex flex-col mt-10 md:mt-12" style={{ gap: 16 }}>
          {projects.map((p) => (
            <Reveal key={p.name}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .reno-card-img { height: 260px; }
        @media (min-width: 768px) {
          .reno-card-img { height: 380px; }
        }
        .reno-ba-handle { width: 44px; height: 44px; }
        @media (min-width: 768px) {
          .reno-ba-handle { width: 40px; height: 40px; }
        }
        .reno-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
