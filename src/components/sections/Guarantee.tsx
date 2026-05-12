import { useEffect, useRef, useState } from "react";

const LINES = [
  "If we run late,",
  "you're compensated.",
  "In writing,",
  "before we start.",
];

export function Guarantee() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches) {
      setReduced(true);
      setProgress(1);
      return;
    }

    let raf = 0;
    const compute = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when section top is at viewport bottom; 1 when section center reaches viewport center.
      const start = vh; // distance from viewport top where progress = 0
      const end = vh * 0.4; // where progress = 1
      const raw = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, raw));
      setProgress(clamped);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const opacity = reduced ? 1 : 0.15 + 0.85 * progress;
  const translateY = reduced ? 0 : (1 - progress) * 8;

  return (
    <section
      ref={sectionRef}
      id="guarantee"
      data-nav-theme="light"
      className="relative w-full px-6 md:px-12 lg:px-16"
      style={{
        backgroundColor: "#FFFFFF",
        paddingTop: "clamp(120px, 14vw, 180px)",
        paddingBottom: "clamp(120px, 14vw, 180px)",
      }}
    >
      <div className="mx-auto text-center" style={{ maxWidth: "min(880px, 92vw)" }}>
        <p
          className="uppercase"
          style={{
            color: "#888",
            fontSize: 11,
            letterSpacing: "0.18em",
            fontWeight: 600,
          }}
        >
          Guarantee
        </p>

        <h2
          className="mt-8"
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 700,
            color: "#0D0D0D",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            opacity,
            transform: `translateY(${translateY}px)`,
            transition: "opacity 120ms linear, transform 120ms linear",
            willChange: "opacity, transform",
          }}
        >
          {LINES.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
