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

  useEffect(() => {
    const hero = document.getElementById("top");
    const quiz = document.getElementById("quiz");

    let heroObs: IntersectionObserver | null = null;
    let quizObs: IntersectionObserver | null = null;

    if (hero) {
      heroObs = new IntersectionObserver(
        ([entry]) => setHeroIn(entry.isIntersecting),
        // Treat the hero as "in view" until at least 20% of it has scrolled past.
        { threshold: 0, rootMargin: "-20% 0px 0px 0px" },
      );
      heroObs.observe(hero);
    }

    if (quiz) {
      quizObs = new IntersectionObserver(
        ([entry]) => setQuizIn(entry.isIntersecting),
        // Hide as soon as any part of the Quiz enters the viewport.
        { threshold: 0, rootMargin: "0px" },
      );
      quizObs.observe(quiz);
    }

    return () => {
      heroObs?.disconnect();
      quizObs?.disconnect();
    };
  }, []);

  const visible = !heroIn && !quizIn;

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
