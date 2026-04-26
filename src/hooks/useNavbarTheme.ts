import { useEffect, useState } from "react";

/**
 * Detects whether the area directly under the navbar is a "light" section
 * (white/cream background) or a "dark" one. Returns "light" when the
 * underlying section needs a dark navbar, "dark" otherwise.
 *
 * Strategy: each section that should be treated as light tags itself with
 * `data-nav-theme="light"`. We watch which one currently sits under the
 * navbar's sample point (top of viewport + offset).
 */
export function useNavbarTheme(sampleOffset = 40): "light" | "dark" {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const compute = () => {
      const x = window.innerWidth / 2;
      const y = sampleOffset;
      const els = document.elementsFromPoint(x, y);
      // Walk through stacked elements; the first section with data-nav-theme wins.
      for (const el of els) {
        const themed = (el as HTMLElement).closest?.("[data-nav-theme]") as HTMLElement | null;
        if (themed) {
          const next = themed.dataset.navTheme === "light" ? "light" : "dark";
          setTheme((prev) => (prev === next ? prev : next));
          return;
        }
      }
      setTheme((prev) => (prev === "dark" ? prev : "dark"));
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [sampleOffset]);

  return theme;
}
