import { useEffect, useState, type CSSProperties } from "react";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  lineClassName?: string;
  style?: CSSProperties;
  initialDelay?: number;
  /** kept for backward-compat, ignored */
  charDelay?: number;
  /** kept for backward-compat, ignored */
  charDuration?: number;
}

/**
 * Hero heading entrance. Fade + small translateY, no per-character
 * animation, no rotate/skew — fires once on mount.
 */
export function AnimatedHeading({
  text,
  className = "",
  lineClassName = "",
  style,
  initialDelay = 150,
}: AnimatedHeadingProps) {
  const [start, setStart] = useState(false);
  const lines = text.split("\n");

  useEffect(() => {
    const t = setTimeout(() => setStart(true), initialDelay);
    return () => clearTimeout(t);
  }, [initialDelay]);

  return (
    <h1
      className={className}
      style={{
        ...style,
        opacity: start ? 1 : 0,
        transform: `translateY(${start ? 0 : 16}px)`,
        transition:
          "opacity 1000ms cubic-bezier(0.22, 1, 0.36, 1), transform 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: start ? "auto" : "transform, opacity",
      }}
    >
      {lines.map((line, i) => (
        <span key={i} className={`block ${lineClassName}`}>
          {line}
        </span>
      ))}
    </h1>
  );
}
