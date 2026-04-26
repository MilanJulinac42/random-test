import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article";
  style?: CSSProperties;
  /** Use opacity-only (no translateY). Useful for headings. */
  fadeOnly?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  style,
  fadeOnly = false,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const innerRef = useRef<HTMLDivElement | null>(null);

  // Cleanup will-change once the entrance transition finishes
  useEffect(() => {
    if (!inView) return;
    const node = innerRef.current;
    if (!node) return;
    const handler = () => {
      node.style.willChange = "auto";
    };
    node.addEventListener("transitionend", handler, { once: true });
    return () => node.removeEventListener("transitionend", handler);
  }, [inView]);

  const easing = "cubic-bezier(0.22, 1, 0.36, 1)";
  const duration = fadeOnly ? 700 : 900;
  const transition = fadeOnly
    ? `opacity ${duration}ms ease`
    : `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;

  return (
    <div
      ref={(el) => {
        ref.current = el;
        innerRef.current = el;
      }}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: fadeOnly ? undefined : `translateY(${inView ? 0 : 24}px)`,
        transition,
        transitionDelay: `${delay}ms`,
        willChange: inView ? undefined : "transform, opacity",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
