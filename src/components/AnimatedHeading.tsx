import { useEffect, useState, type CSSProperties } from "react";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  lineClassName?: string;
  style?: CSSProperties;
  initialDelay?: number;
  charDelay?: number;
  charDuration?: number;
}

export function AnimatedHeading({
  text,
  className = "",
  lineClassName = "",
  style,
  initialDelay = 200,
  charDelay = 30,
  charDuration = 500,
}: AnimatedHeadingProps) {
  const [start, setStart] = useState(false);
  const lines = text.split("\n");

  useEffect(() => {
    const t = setTimeout(() => setStart(true), initialDelay);
    return () => clearTimeout(t);
  }, [initialDelay]);

  return (
    <h1 className={className} style={style}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className={`block ${lineClassName}`}>
          {Array.from(line).map((char, charIndex) => {
            const delay = lineIndex * line.length * charDelay + charIndex * charDelay;
            return (
              <span
                key={charIndex}
                className="inline-block"
                style={{
                  opacity: start ? 1 : 0,
                  transform: start ? "translateX(0)" : "translateX(-18px)",
                  transition: `opacity ${charDuration}ms ease, transform ${charDuration}ms ease`,
                  transitionDelay: `${delay}ms`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
