import { useEffect, useState } from "react";
import { ArrowButton } from "@/components/ArrowButton";

/**
 * Persistent "Check availability" CTA pinned to the bottom-right corner.
 * Hidden while the Hero (`#top`) or Quiz (`#quiz`) is in the viewport;
 * fades in everywhere else. Uses two IntersectionObservers so the show/
 * hide is purely scroll-driven (no rAF, no listeners).
 */
export function FloatingCTA() {
  const [heroIn, setHeroIn] = useState(true);
  const [quizIn, setQuizIn] = useState(false);
  const [footerIn, setFooterIn] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const quiz = document.getElementById("quiz");
    const footer = document.getElementById("reno-statement");

    let heroObs: IntersectionObserver | null = null;
    let quizObs: IntersectionObserver | null = null;
    let footerObs: IntersectionObserver | null = null;

    if (hero) {
      heroObs = new IntersectionObserver(
        ([entry]) => setHeroIn(entry.isIntersecting),
        { threshold: 0, rootMargin: "-20% 0px 0px 0px" },
      );
      heroObs.observe(hero);
    }

    if (quiz) {
      quizObs = new IntersectionObserver(
        ([entry]) => setQuizIn(entry.isIntersecting),
        { threshold: 0, rootMargin: "0px" },
      );
      quizObs.observe(quiz);
    }

    if (footer) {
      footerObs = new IntersectionObserver(
        ([entry]) => setFooterIn(entry.isIntersecting),
        { threshold: 0, rootMargin: "0px" },
      );
      footerObs.observe(footer);
    }

    return () => {
      heroObs?.disconnect();
      quizObs?.disconnect();
      footerObs?.disconnect();
    };
  }, []);

  const visible = !heroIn && !quizIn && !footerIn;

  return (
    <div
      aria-hidden={!visible}
      style={{
        position: "fixed",
        right: "clamp(16px, 2vw, 28px)",
        bottom: "clamp(16px, 2vw, 28px)",
        zIndex: 40,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        pointerEvents: visible ? "auto" : "none",
        transition:
          "opacity 420ms cubic-bezier(0.32, 0.72, 0, 1), transform 420ms cubic-bezier(0.32, 0.72, 0, 1)",
        willChange: "transform, opacity",
      }}
    >
      <ArrowButton as="a" href="#quiz" variant="light-on-dark">
        Check availability
      </ArrowButton>
    </div>
  );
}
