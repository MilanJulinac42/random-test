import { useEffect, useState, type CSSProperties } from "react";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  lineClassName?: string;
  style?: CSSProperties;
  initialDelay?: number;
  /** ms between each character's animation start */
  charDelay?: number;
  /** ms duration for each character's animation */
  charDuration?: number;
}

/**
 * Hero heading entrance: per-character fade + 20px rise + slight blur.
 * Cinematic timing — 50ms stagger, 900ms each. Respects prefers-reduced-motion.
 */
export function AnimatedHeading({
  text,
  className = "",
  lineClassName = "",
  style,
  initialDelay = 150,
  charDelay = 50,
  charDuration = 900,
}: AnimatedHeadingProps) {
  const [start, setStart] = useState(false);
  const [reduced, setReduced] = useState(false);
  const lines = text.split("\n");

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches) {
      setReduced(true);
      setStart(true);
      return;
    }
    const t = setTimeout(() => setStart(true), initialDelay);
    return () => clearTimeout(t);
  }, [initialDelay]);

  const easing = "cubic-bezier(0.22, 1, 0.36, 1)";
  let charIndex = 0;

  return (
    <h1 className={className} style={style} aria-label={text.replace(/\n/g, " ")}>
      {lines.map((line, li) => (
        <span
          key={li}
          className={`block ${lineClassName}`}
          style={{ overflow: "hidden", paddingBottom: "0.08em" }}
        >
          {Array.from(line).map((ch, ci) => {
            const i = charIndex++;
            const delay = reduced ? 0 : i * charDelay;
            return (
              <span
                key={`${li}-${ci}`}
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  whiteSpace: "pre",
                  opacity: start ? 1 : 0,
                  transform: start ? "translateY(0)" : "translateY(20px)",
                  filter: start ? "blur(0px)" : "blur(6px)",
                  transition: reduced
                    ? "none"
                    : `opacity ${charDuration}ms ${easing}, transform ${charDuration}ms ${easing}, filter ${charDuration}ms ${easing}`,
                  transitionDelay: `${delay}ms`,
                  willChange: start ? "auto" : "transform, opacity, filter",
                }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
