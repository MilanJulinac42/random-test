import { MessageCircle } from "lucide-react";
import { WHATSAPP_GENERAL, LINKEDIN_URL, INSTAGRAM_URL } from "@/lib/constants";
import { LinkedInIcon, InstagramIcon } from "@/components/SocialIcons";
import { useNavbarTheme } from "@/hooks/useNavbarTheme";
import logoLight from "@/assets/logo.png";
import logoDark from "@/assets/logo-dark.png";

export function Navbar() {
  const theme = useNavbarTheme();
  const isLight = theme === "light";

  // On light sections: dark glass tint + dark icons/text. On dark: keep current white styling.
  const glassClass = isLight ? "liquid-glass-light" : "liquid-glass";
  const iconColor = isLight ? "#0D0D0D" : "#FFFFFF";
  const iconHoverClass = isLight
    ? "transition-colors hover:opacity-70"
    : "text-white hover:text-primary transition-colors";
  const textColor = isLight ? "#0D0D0D" : "#FFFFFF";
  const hoverBg = isLight ? "hover:bg-black/5" : "hover:bg-white/10";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-4 md:pt-6 px-4 md:px-8">
      <div
        className={`mx-auto max-w-7xl ${glassClass} rounded-sh-lg flex items-center justify-between px-5 md:px-6 py-3`}
      >
        <a href="#top" className="relative flex items-center" aria-label="Reno home">
          {/* Dual-logo crossfade — sharp on every browser regardless of brightness */}
          <img
            src={logoLight}
            alt="Reno"
            className="h-10 md:h-12 lg:h-14 w-auto max-h-[calc(100%-0.5rem)] block"
            style={{ opacity: isLight ? 0 : 1, transition: "opacity 300ms ease" }}
          />
          <img
            src={logoDark}
            alt=""
            aria-hidden
            className="h-10 md:h-12 lg:h-14 w-auto max-h-[calc(100%-0.5rem)] absolute inset-0"
            style={{ opacity: isLight ? 1 : 0, transition: "opacity 300ms ease" }}
          />
        </a>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`hidden md:inline-flex items-center justify-center rounded-sh ${iconHoverClass}`}
            style={{ width: 36, height: 36, color: iconColor }}
          >
            <LinkedInIcon size={18} />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={`hidden md:inline-flex items-center justify-center rounded-sh ${iconHoverClass}`}
            style={{ width: 36, height: 36, color: iconColor }}
          >
            <InstagramIcon size={18} />
          </a>

          <a
            href={WHATSAPP_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${glassClass} hidden md:inline-flex items-center rounded-sh transition-colors ${hoverBg}`}
            style={{ fontSize: 13, fontWeight: 500, padding: "8px 16px", height: 36, color: textColor }}
          >
            Contact Us
          </a>

          <a
            href={WHATSAPP_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
            className={`${glassClass} md:hidden inline-flex items-center justify-center rounded-sh transition-colors ${hoverBg}`}
            style={{ width: 40, height: 40, color: textColor }}
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </nav>
  );
}
