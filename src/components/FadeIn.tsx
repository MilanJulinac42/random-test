import { useEffect, useState, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  /** If true, slides up 16px while fading in (used for hero entrance). */
  slide?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 1000,
  className = "",
  slide = true,
}: FadeInProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: slide ? `translateY(${visible ? 0 : 16}px)` : undefined,
        transition: slide
          ? `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`
          : `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        willChange: visible ? "auto" : "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
