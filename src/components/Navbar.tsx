import { Instagram, Linkedin, MessageCircle } from "lucide-react";
import { WHATSAPP_GENERAL, LINKEDIN_URL, INSTAGRAM_URL } from "@/lib/constants";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-4 md:pt-6 px-4 md:px-8">
      <div className="mx-auto max-w-7xl liquid-glass rounded-sh-lg flex items-center justify-between px-5 md:px-6 py-3 transition-all duration-300">
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

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden md:inline-flex items-center justify-center rounded-sh text-muted-foreground hover:text-primary transition-colors"
            style={{ width: 36, height: 36 }}
          >
            <Linkedin size={18} />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hidden md:inline-flex items-center justify-center rounded-sh text-muted-foreground hover:text-primary transition-colors"
            style={{ width: 36, height: 36 }}
          >
            <Instagram size={18} />
          </a>

          <a
            href={WHATSAPP_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass hidden md:inline-flex items-center rounded-sh text-foreground transition-colors hover:bg-white/10"
            style={{ fontSize: 13, fontWeight: 500, padding: "8px 16px", height: 36 }}
          >
            Contact Us
          </a>

          <a
            href={WHATSAPP_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
            className="liquid-glass md:hidden inline-flex items-center justify-center rounded-sh text-foreground hover:bg-white/10 transition-colors"
            style={{ width: 40, height: 40 }}
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </nav>
  );
}
