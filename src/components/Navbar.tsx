import { useNavbarTheme } from "@/hooks/useNavbarTheme";
import logoLight from "@/assets/logo.png";
import logoDark from "@/assets/logo-dark.png";

/**
 * Minimal navbar — a single centered "reno" logo, nothing else.
 * The dual-logo crossfade keeps the mark legible over both light
 * and dark sections as the user scrolls.
 */
export function Navbar() {
  const isLight = useNavbarTheme() === "light";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-5 md:pt-7 flex justify-center pointer-events-none">
      <a
        href="#top"
        className="relative flex items-center pointer-events-auto"
        aria-label="Reno home"
      >
        <img
          src={logoLight}
          alt="Reno"
          className="h-9 md:h-11 w-auto block"
          style={{ opacity: isLight ? 0 : 1, transition: "opacity 300ms ease" }}
        />
        <img
          src={logoDark}
          alt=""
          aria-hidden
          className="h-9 md:h-11 w-auto absolute inset-0"
          style={{ opacity: isLight ? 1 : 0, transition: "opacity 300ms ease" }}
        />
      </a>
    </nav>
  );
}
