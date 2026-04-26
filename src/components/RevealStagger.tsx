import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface RevealStaggerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Delay between siblings in ms */
  step?: number;
  /** Initial offset before first child fires */
  baseDelay?: number;
}

/**
 * Wraps a container; each direct child fades + slides up with a
 * (index * step)ms delay once the container enters the viewport.
 */
export function RevealStagger({
  children,
  className = "",
  style,
  step = 90,
  baseDelay = 0,
}: RevealStaggerProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!inView) return;
    const node = containerRef.current;
    if (!node) return;
    const kids = Array.from(node.children) as HTMLElement[];
    kids.forEach((kid) => {
      const handler = () => {
        kid.style.willChange = "auto";
      };
      kid.addEventListener("transitionend", handler, { once: true });
    });
  }, [inView]);

  const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <div
      ref={(el) => {
        ref.current = el;
        containerRef.current = el;
      }}
      className={className}
      style={style}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              style={{
                opacity: inView ? 1 : 0,
                transform: `translateY(${inView ? 0 : 24}px)`,
                transition: `opacity 900ms ${easing}, transform 900ms ${easing}`,
                transitionDelay: `${baseDelay + i * step}ms`,
                willChange: inView ? undefined : "transform, opacity",
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
