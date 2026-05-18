import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { animate, stagger } from "animejs";
import { prefersReducedMotion, RENO_EASE } from "@/lib/anime";

export type WordRevealVariant =
  | "slide-up"
  | "blur-in"
  | "drop"
  | "slide-right"
  | "scale"
  | "pop"
  | "clip";

interface WordRevealProps {
  children: string;
  variant?: WordRevealVariant;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  staggerMs?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  trigger?: "scroll" | "mount";
  style?: CSSProperties;
  className?: string;
}

const WATCHDOG_MS = 4500;

export function WordReveal({
  children,
  variant = "slide-up",
  as = "div",
  staggerMs = 80,
  duration = 700,
  delay = 0,
  threshold = 0.1,
  trigger = "scroll",
  style,
  className,
}: WordRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const lines = children.split("\n").map((l) => l.trim()).filter(Boolean);
  const wordsByLine = lines.map((l) => l.split(/\s+/));
  const isClip = variant === "clip";
  const activeDuration = variant === "pop" ? 500 : duration;

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const selector = isClip ? ".wr-inner" : ".wr-word";
    const targets = Array.from(container.querySelectorAll<HTMLElement>(selector));
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      targets.forEach((el) => { el.style.opacity = "1"; el.style.transform = "none"; });
      return;
    }

    targets.forEach((el) => {
      switch (variant) {
        case "slide-up":    el.style.opacity = "0"; el.style.transform = "translateY(18px)"; break;
        case "blur-in":     el.style.opacity = "0"; el.style.transform = "scale(0.96) translateY(8px)"; break;
        case "drop":        el.style.opacity = "0"; el.style.transform = "translateY(-18px)"; break;
        case "slide-right": el.style.opacity = "0"; el.style.transform = "translateX(-22px)"; break;
        case "scale":       el.style.opacity = "0"; el.style.transform = "scale(0.88)"; break;
        case "pop":         el.style.opacity = "0"; el.style.transform = "scale(0.84)"; break;
        case "clip":        el.style.transform = "translateY(110%)"; break;
      }
    });

    const forceVisible = () => {
      targets.forEach((el) => { el.style.opacity = "1"; el.style.transform = "none"; });
    };

    const play = () => {
      const shared = {
        duration: activeDuration,
        delay: stagger(staggerMs, { start: delay }),
        ease: RENO_EASE,
      };
      switch (variant) {
        case "slide-up":    animate(targets, { ...shared, opacity: [0, 1], translateY: [18, 0] }); break;
        case "blur-in":     animate(targets, { ...shared, opacity: [0, 1], scale: [0.96, 1], translateY: [8, 0] }); break;
        case "drop":        animate(targets, { ...shared, opacity: [0, 1], translateY: [-18, 0] }); break;
        case "slide-right": animate(targets, { ...shared, opacity: [0, 1], translateX: [-22, 0] }); break;
        case "scale":       animate(targets, { ...shared, opacity: [0, 1], scale: [0.88, 1] }); break;
        case "pop":         animate(targets, { ...shared, opacity: [0, 1], scale: [0.84, 1] }); break;
        case "clip":        animate(targets, { ...shared, translateY: ["110%", "0%"] }); break;
      }
    };

    if (trigger === "mount") {
      play();
      const totalMs = delay + activeDuration + staggerMs * (targets.length - 1) + 400;
      const watchdog = setTimeout(forceVisible, totalMs);
      return () => clearTimeout(watchdog);
    }

    let played = false;
    let postWatchdog: ReturnType<typeof setTimeout> | undefined;

    const mountWatchdog = setTimeout(() => {
      if (!played) forceVisible();
    }, WATCHDOG_MS);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played) {
          played = true;
          clearTimeout(mountWatchdog);
          play();
          postWatchdog = setTimeout(
            forceVisible,
            delay + activeDuration + staggerMs * (targets.length - 1) + 400,
          );
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(container);

    return () => {
      io.disconnect();
      clearTimeout(mountWatchdog);
      if (postWatchdog) clearTimeout(postWatchdog);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = as as any;

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={(el: any) => { containerRef.current = el; }}
      style={style}
      className={className}
    >
      {wordsByLine.flatMap((lineWords, li) => {
        const nodes: React.ReactNode[] = [];
        lineWords.forEach((word, i) => {
          const key = li + "-" + i;
          const wordEl = isClip ? (
            <span
              key={key}
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "bottom",
                lineHeight: "inherit",
              }}
            >
              <span className="wr-inner" style={{ display: "inline-block" }}>
                {word}
              </span>
            </span>
          ) : (
            <span
              key={key}
              className="wr-word"
              style={{ display: "inline-block" }}
            >
              {word}
            </span>
          );
          nodes.push(wordEl);
          if (i < lineWords.length - 1) {
            nodes.push(<span key={key + "-sp"}>{" "}</span>);
          }
        });
        if (li < wordsByLine.length - 1) {
          nodes.push(<br key={"br-" + li} className="reno-mobile-br" />);
          nodes.push(<span key={"sp-" + li} className="reno-mobile-br-space"> </span>);
        }
        return nodes;
      })}
    </Tag>
  );
}
