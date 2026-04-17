import { useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { Reveal } from "@/components/Reveal";

interface Item {
  before: string;
  after: string;
  label: string;
  location: string;
}

const items: Item[] = [
  {
    before: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80",
    after: "https://images.unsplash.com/photo-1556909211-d5b0e2bedd5e?auto=format&fit=crop&w=1200&q=80",
    label: "Kitchen Renovation",
    location: "Arabian Ranches",
  },
  {
    before: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80",
    after: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80",
    label: "Master Bathroom",
    location: "Palm Jumeirah",
  },
  {
    before: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    after: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    label: "Full Villa Transformation",
    location: "Emirates Hills",
  },
];

function BeforeAfterCard({ item }: { item: Item }) {
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
    <div className="shrink-0 w-[85%] sm:w-auto" style={{ scrollSnapAlign: "start" }}>
      <div
        ref={containerRef}
        className="relative overflow-hidden select-none"
        style={{
          aspectRatio: "16 / 9",
          borderRadius: 16,
          background: "#141414",
          touchAction: "none",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <img
          src={item.before}
          alt={`${item.label} before`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        />
        <img
          src={item.after}
          alt={`${item.label} after`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        />

        {/* Labels */}
        <span
          className="absolute top-3 left-3 px-2 py-1 text-[11px] font-medium tracking-wide"
          style={{ background: "rgba(10,10,10,0.7)", color: "#F5F0EB", borderRadius: 6 }}
        >
          BEFORE
        </span>
        <span
          className="absolute top-3 right-3 px-2 py-1 text-[11px] font-medium tracking-wide"
          style={{ background: "rgba(201,169,110,0.9)", color: "#0A0A0A", borderRadius: 6 }}
        >
          AFTER
        </span>

        {/* Drag handle */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        >
          <div style={{ width: 3, background: "#C9A96E", height: "100%" }} />
          <div
            className="absolute top-1/2 left-1/2 flex items-center justify-center"
            style={{
              transform: "translate(-50%, -50%)",
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#C9A96E",
              color: "#0A0A0A",
              cursor: "grab",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            ⇆
          </div>
        </div>
      </div>
      <div className="mt-3">
        <p style={{ fontWeight: 600, fontSize: 15, color: "#F5F0EB" }}>{item.label}</p>
        <p style={{ fontWeight: 400, fontSize: 13, color: "#8C8C82" }}>{item.location}</p>
      </div>
    </div>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="px-6 md:px-12 lg:px-16" style={{ background: "#0A0A0A", padding: "64px 24px" }}>
      <div className="mx-auto max-w-7xl" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <Reveal>
          <p
            className="text-center"
            style={{ fontWeight: 500, fontSize: 12, color: "#C9A96E", letterSpacing: "3px", textTransform: "uppercase" }}
          >
            THE WORK
          </p>
          <h2
            className="text-center text-[28px] md:text-[42px]"
            style={{ fontWeight: 700, color: "#F5F0EB", marginTop: 12 }}
          >
            Results That Speak for Themselves
          </h2>
          <p
            className="text-center mx-auto"
            style={{ fontWeight: 400, fontSize: 16, color: "#8C8C82", maxWidth: 480, margin: "12px auto 48px" }}
          >
            Every project managed end-to-end — design, build, and handover.
          </p>
        </Reveal>

        <div className="hidden md:grid grid-cols-3 gap-6">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 100}>
              <BeforeAfterCard item={it} />
            </Reveal>
          ))}
        </div>

        <div
          className="md:hidden flex gap-4 overflow-x-auto no-scrollbar pb-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {items.map((it) => (
            <BeforeAfterCard key={it.label} item={it} />
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#"
            className="hover:underline"
            style={{ fontWeight: 400, fontSize: 14, color: "#8C8C82" }}
          >
            View More Projects →
          </a>
        </div>
      </div>
    </section>
  );
}
