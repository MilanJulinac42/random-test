import { useEffect, useRef, useState } from "react";

const LINES = [
  "If we run late,",
  "you're compensated.",
  "In writing,",
  "before we start.",
];

export function Guarantee() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
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
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Progress driven by scroll within the 200vh outer wrapper.
      // 0 when wrapper top is at viewport top; ~1 after scrolling ~60% of vh into the pin.
      const scrolled = -rect.top;
      const raw = scrolled / (vh * 0.6);
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
    <div
      ref={wrapperRef}
      style={{ position: "relative", width: "100%", height: "200vh", backgroundColor: "#FFFFFF" }}
    >
      <section
        id="guarantee"
        data-nav-theme="light"
        className="relative w-full px-6 md:px-12 lg:px-16"
        style={{
          backgroundColor: "#FFFFFF",
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="mx-auto text-center" style={{ maxWidth: "min(880px, 92vw)" }}>
          <p
            className="uppercase"
            style={{
              color: "#888",
              fontSize: 14,
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
    </div>
  );
}
