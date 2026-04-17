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
        className="relative overflow-hidden select-none bg-card rounded-sh-lg"
        style={{ aspectRatio: "16 / 9", touchAction: "none" }}
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

        <span
          className="absolute top-3 left-3 px-2 py-1 text-[11px] font-medium tracking-wide rounded-sm text-foreground"
          style={{ background: "hsla(240, 9%, 8%, 0.75)" }}
        >
          BEFORE
        </span>
        <span className="absolute top-3 right-3 px-2 py-1 text-[11px] font-semibold tracking-wide rounded-sm bg-primary text-primary-foreground">
          AFTER
        </span>

        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        >
          <div className="bg-primary h-full" style={{ width: 3 }} />
          <div
            className="absolute top-1/2 left-1/2 flex items-center justify-center rounded-full bg-primary text-primary-foreground"
            style={{
              transform: "translate(-50%, -50%)",
              width: 32,
              height: 32,
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
        <p className="text-foreground text-base font-semibold">{item.label}</p>
        <p className="text-muted-foreground text-sm">{item.location}</p>
      </div>
    </div>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="bg-background px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p
            className="text-center text-primary text-xs font-medium uppercase"
            style={{ letterSpacing: "0.25em" }}
          >
            THE WORK
          </p>
          <h2 className="text-center text-3xl md:text-5xl text-foreground mt-3" style={{ fontWeight: 700 }}>
            Results That Speak for Themselves
          </h2>
          <p className="text-center text-muted-foreground text-base mx-auto mt-3 mb-12" style={{ maxWidth: 480 }}>
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
          <a href="#" className="text-muted-foreground text-sm hover:text-foreground hover:underline transition-colors">
            View More Projects →
          </a>
        </div>
      </div>
    </section>
  );
}
