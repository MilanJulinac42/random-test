/**
 * Shared Anime.js (v4) animation helpers.
 *
 * Replaces the legacy `useCountUp` / `useInView` hooks and the
 * `Reveal` / `FadeIn` / `AnimatedHeading` components with one
 * Anime.js-based system.
 *
 * IntersectionObserver is used purely as a *trigger* — the actual
 * motion is always driven by Anime.js `animate()`.
 *
 * Every helper respects `prefers-reduced-motion`.
 */
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { animate, engine, stagger } from "animejs";

/**
 * Keep the Anime.js engine running even when the document is briefly
 * hidden — otherwise animations can freeze mid-flight (e.g. if the page
 * loads in a background tab) and never reach their final state.
 */
engine.pauseOnDocumentHidden = false;

/* Isomorphic layout effect — this is a client-only Vite SPA, but guard anyway. */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );
}

/* Standard easing used across the site (power-3 ease-out). */
export const RENO_EASE = "out(3)";

/**
 * Safety net: force an element to its final visible state.
 * `setTimeout` keeps firing even when `requestAnimationFrame` is paused
 * (e.g. background tab), so a watchdog guarantees content is never
 * left stuck at `opacity: 0` if the Anime.js loop can't run.
 */
function forceVisible(el: HTMLElement) {
  el.style.opacity = "1";
  el.style.transform = "none";
}

/**
 * If a reveal hasn't triggered within this window (no scroll into view,
 * IntersectionObserver throttled in a background tab, etc.) the content
 * is shown anyway — visibility must never depend on animation running.
 */
const MOUNT_WATCHDOG_MS = 4500;

interface RevealOpts {
  /** px to translate up from. Ignored when `fadeOnly`. */
  translateY?: number;
  /** ms delay before the animation starts once triggered. */
  delay?: number;
  /** ms duration. */
  duration?: number;
  /** Opacity-only — no translate. */
  fadeOnly?: boolean;
  /** IntersectionObserver threshold. */
  threshold?: number;
}

/**
 * Fade (+ rise) a single element in once it scrolls into view.
 * Drop-in replacement for the old `<Reveal>` / `<FadeIn>` components.
 */
export function useAnimeReveal<T extends HTMLElement = HTMLDivElement>(
  opts: RevealOpts = {},
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const {
    translateY = 24,
    delay = 0,
    duration = 900,
    fadeOnly = false,
    threshold = 0.12,
  } = opts;

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.opacity = "1";
      return;
    }

    el.style.opacity = "0";
    let played = false;
    let postWatchdog: ReturnType<typeof setTimeout> | undefined;

    // Mount watchdog — guarantees the element becomes visible even if the
    // IntersectionObserver or animation loop never runs.
    const mountWatchdog = setTimeout(() => {
      if (!played) forceVisible(el);
    }, MOUNT_WATCHDOG_MS);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !played) {
            played = true;
            clearTimeout(mountWatchdog);
            animate(el, {
              opacity: [0, 1],
              ...(fadeOnly ? {} : { translateY: [translateY, 0] }),
              duration,
              delay,
              ease: RENO_EASE,
            });
            postWatchdog = setTimeout(
              () => forceVisible(el),
              delay + duration + 400,
            );
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(mountWatchdog);
      if (postWatchdog) clearTimeout(postWatchdog);
    };
  }, []);

  return ref;
}

interface RevealGroupOpts extends RevealOpts {
  /** ms between each child's animation start. */
  staggerMs?: number;
}

/**
 * Fade (+ rise) a set of child elements in with a stagger, once the
 * container scrolls into view. Used for card grids (e.g. testimonials).
 */
export function useAnimeRevealGroup<T extends HTMLElement = HTMLDivElement>(
  childSelector: string,
  opts: RevealGroupOpts = {},
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const {
    translateY = 28,
    duration = 800,
    fadeOnly = false,
    threshold = 0.15,
    staggerMs = 120,
  } = opts;

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll<HTMLElement>(childSelector);
    if (!children.length) return;

    if (prefersReducedMotion()) {
      children.forEach((c) => (c.style.opacity = "1"));
      return;
    }

    children.forEach((c) => (c.style.opacity = "0"));
    let played = false;
    let postWatchdog: ReturnType<typeof setTimeout> | undefined;

    const mountWatchdog = setTimeout(() => {
      if (!played) children.forEach((c) => forceVisible(c));
    }, MOUNT_WATCHDOG_MS);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !played) {
            played = true;
            clearTimeout(mountWatchdog);
            animate(children, {
              opacity: [0, 1],
              ...(fadeOnly ? {} : { translateY: [translateY, 0] }),
              duration,
              ease: RENO_EASE,
              delay: stagger(staggerMs),
            });
            postWatchdog = setTimeout(
              () => children.forEach((c) => forceVisible(c)),
              duration + staggerMs * children.length + 400,
            );
            io.disconnect();
          }
        }
      },
      { threshold },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(mountWatchdog);
      if (postWatchdog) clearTimeout(postWatchdog);
    };
  }, []);

  return ref;
}

interface CountUpOpts {
  duration?: number;
  prefix?: string;
  suffix?: string;
  threshold?: number;
}

/**
 * Count a number up from 0 to `target` when it scrolls into view.
 * Drop-in replacement for the old `useCountUp` hook — attach the
 * returned ref to the element that should display the number.
 */
export function useAnimeCountUp<T extends HTMLElement = HTMLSpanElement>(
  target: number,
  opts: CountUpOpts = {},
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { duration = 1800, prefix = "", suffix = "", threshold = 0.3 } = opts;

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const render = (v: number) => {
      el.textContent = `${prefix}${Math.round(v)}${suffix}`;
    };

    if (prefersReducedMotion()) {
      render(target);
      return;
    }

    render(0);
    let played = false;
    let postWatchdog: ReturnType<typeof setTimeout> | undefined;

    const mountWatchdog = setTimeout(() => {
      if (!played) render(target);
    }, MOUNT_WATCHDOG_MS);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !played) {
            played = true;
            clearTimeout(mountWatchdog);
            const proxy = { v: 0 };
            animate(proxy, {
              v: target,
              duration,
              ease: RENO_EASE,
              onUpdate: () => render(proxy.v),
            });
            postWatchdog = setTimeout(() => render(target), duration + 400);
            io.disconnect();
          }
        }
      },
      { threshold },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(mountWatchdog);
      if (postWatchdog) clearTimeout(postWatchdog);
    };
  }, [target, prefix, suffix]);

  return ref;
}

/**
 * Track scroll progress (0 → 1) through a tall section.
 *
 * Attach `ref` to a wrapper that is taller than the viewport (e.g.
 * `height: 300vh`) with a `position: sticky` inner container. Used to
 * drive pinned scroll transitions (Process steps, Gallery projects)
 * and scroll-linked opacity (Reno statement).
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(): {
  ref: RefObject<T | null>;
  progress: number;
} {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const compute = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = -rect.top;
      setProgress(Math.max(0, Math.min(1, scrolled / total)));
    };

    const onScrollEvt = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScrollEvt, { passive: true });
    window.addEventListener("resize", onScrollEvt);
    return () => {
      window.removeEventListener("scroll", onScrollEvt);
      window.removeEventListener("resize", onScrollEvt);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, progress };
}
