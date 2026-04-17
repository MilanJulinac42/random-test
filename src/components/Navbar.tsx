import { Phone } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";

export function Navbar() {
  const scrolled = useScrolled(80);
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "#0A0A0A" : "transparent",
        borderBottom: scrolled ? "1px solid #1F1F1F" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12 lg:px-16 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span style={{ fontSize: 22, fontWeight: 700, color: "#F5F0EB", letterSpacing: "-0.01em" }}>
            Reno
          </span>
          <span
            style={{
              background: "#1F1F1F",
              color: "#8C8C82",
              fontSize: 12,
              fontWeight: 400,
              padding: "4px 10px",
              borderRadius: 100,
            }}
          >
            Dubai
          </span>
        </a>

        <a
          href={`tel:${PHONE_TEL}`}
          className="hidden md:inline-flex items-center transition-colors hover:bg-[#C9A96E] hover:text-[#0A0A0A]"
          style={{
            border: "1px solid #C9A96E",
            color: "#C9A96E",
            fontSize: 13,
            fontWeight: 500,
            borderRadius: 8,
            padding: "8px 16px",
          }}
        >
          Call Us: {PHONE_DISPLAY}
        </a>

        <a
          href={`tel:${PHONE_TEL}`}
          aria-label={`Call ${PHONE_DISPLAY}`}
          className="md:hidden inline-flex items-center justify-center"
          style={{
            border: "1px solid #C9A96E",
            color: "#C9A96E",
            borderRadius: 8,
            width: 40,
            height: 40,
          }}
        >
          <Phone size={16} />
        </a>
      </div>
    </nav>
  );
}
