import { useEffect, useState } from "react";
import { useNavbarTheme } from "@/hooks/useNavbarTheme";
import logoLight from "@/assets/logo.png";
import logoDark from "@/assets/logo-dark.png";

export function Navbar() {
  const isLight = useNavbarTheme() === "light";
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-5 md:pt-7 flex justify-center pointer-events-none">
      <a
        href="#top"
        className="relative flex items-center pointer-events-auto"
        aria-label="Reno home"
        style={{
          opacity: heroVisible ? 1 : 0,
          pointerEvents: heroVisible ? "auto" : "none",
          transition: "opacity 400ms ease",
        }}
      >
        <img
          src={logoLight}
          alt="Reno"
          className="h-14 md:h-16 w-auto block"
          style={{ opacity: isLight ? 0 : 1, transition: "opacity 300ms ease" }}
        />
        <img
          src={logoDark}
          alt=""
          aria-hidden
          className="h-14 md:h-16 w-auto absolute inset-0"
          style={{ opacity: isLight ? 1 : 0, transition: "opacity 300ms ease" }}
        />
      </a>
    </nav>
  );
}
