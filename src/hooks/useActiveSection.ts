import { useEffect, useState } from "react";

/**
 * Scroll-spy: returns the id of the section whose top edge is closest above
 * a virtual "activation line" (just below the fixed navbar). Falls back to
 * the first section before the line is reached.
 */
export function useActiveSection(ids: string[], offset = 120): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (typeof window === "undefined" || ids.length === 0) return;

    const elements = () =>
      ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

    let raf = 0;
    const update = () => {
      const els = elements();
      if (els.length === 0) return;

      const line = offset; // viewport y-coordinate that defines "current"
      let current: string | null = els[0].id;

      for (const el of els) {
        const top = el.getBoundingClientRect().top;
        if (top - line <= 0) {
          current = el.id;
        } else {
          break;
        }
      }

      // Bottom of page: snap to the last section so the final link highlights.
      const scrollBottom = window.innerHeight + window.scrollY;
      if (scrollBottom >= document.documentElement.scrollHeight - 4) {
        current = els[els.length - 1].id;
      }

      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offset]);

  return active;
}
