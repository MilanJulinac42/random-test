import { Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-4 md:pt-6 px-4 md:px-8">
      <div className="mx-auto max-w-7xl liquid-glass rounded-sh-lg flex items-center justify-between px-5 md:px-6 py-3">
        <a href="#top" className="flex items-center gap-2">
          <span className="text-foreground" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.01em" }}>
            Reno
          </span>
          <span
            className="bg-secondary text-muted-foreground rounded-full"
            style={{ fontSize: 12, fontWeight: 400, padding: "4px 10px" }}
          >
            Dubai
          </span>
        </a>

        <a
          href={`tel:${PHONE_TEL}`}
          className="hidden md:inline-flex items-center rounded-sh transition-colors border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          style={{ fontSize: 13, fontWeight: 500, padding: "8px 16px" }}
        >
          Call Us: {PHONE_DISPLAY}
        </a>

        <a
          href={`tel:${PHONE_TEL}`}
          aria-label={`Call ${PHONE_DISPLAY}`}
          className="md:hidden inline-flex items-center justify-center rounded-sh border border-primary text-primary"
          style={{ width: 40, height: 40 }}
        >
          <Phone size={16} />
        </a>
      </div>
    </nav>
  );
}
