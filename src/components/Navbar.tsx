import { MessageCircle } from "lucide-react";
import { WHATSAPP_GENERAL, LINKEDIN_URL, INSTAGRAM_URL } from "@/lib/constants";
import { LinkedInIcon, InstagramIcon } from "@/components/SocialIcons";
import { useNavbarTheme } from "@/hooks/useNavbarTheme";
import { useActiveSection } from "@/hooks/useActiveSection";
import logoLight from "@/assets/logo.png";
import logoDark from "@/assets/logo-dark.png";

const NAV_LINKS = [
  { id: "gallery", label: "Gallery" },
  { id: "how-it-works", label: "How It Works" },
  { id: "reviews", label: "Reviews" },
  { id: "social", label: "Social" },
];

export function Navbar() {
  const theme = useNavbarTheme();
  const isLight = theme === "light";
  const active = useActiveSection(NAV_LINKS.map((l) => l.id));

  // On light sections: dark glass tint + dark icons/text. On dark: keep current white styling.
  const glassClass = isLight ? "liquid-glass-light" : "liquid-glass";
  const iconColor = isLight ? "#0D0D0D" : "#FFFFFF";
  const textColor = isLight ? "#0D0D0D" : "#FFFFFF";
  const mutedColor = isLight ? "rgba(13,13,13,0.6)" : "rgba(255,255,255,0.65)";
  const activeUnderline = isLight ? "#0D0D0D" : "#C2A97A";
  const hoverBg = isLight ? "hover:bg-black/5" : "hover:bg-white/10";

  // Shared color/fill transition so every theme swap (icons, text, WhatsApp glyph) crossfades together.
  const colorTransition = "color 300ms ease, fill 300ms ease, stroke 300ms ease, opacity 300ms ease";

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

        {/* Center section nav — desktop only */}
        <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? "location" : undefined}
                className="relative inline-flex items-center px-3 py-2 rounded-sh"
                style={{
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? textColor : mutedColor,
                  transition: `${colorTransition}, font-weight 200ms ease`,
                }}
              >
                {link.label}
                <span
                  aria-hidden
                  className="absolute left-3 right-3 -bottom-0.5 h-px origin-left"
                  style={{
                    backgroundColor: activeUnderline,
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    transition: "transform 300ms ease, background-color 300ms ease",
                  }}
                />
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden md:inline-flex items-center justify-center rounded-sh hover:opacity-70"
            style={{ width: 36, height: 36, color: iconColor, transition: colorTransition }}
          >
            <LinkedInIcon size={18} />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hidden md:inline-flex items-center justify-center rounded-sh hover:opacity-70"
            style={{ width: 36, height: 36, color: iconColor, transition: colorTransition }}
          >
            <InstagramIcon size={18} />
          </a>

          <a
            href={WHATSAPP_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${glassClass} hidden md:inline-flex items-center rounded-sh ${hoverBg}`}
            style={{
              fontSize: 13,
              fontWeight: 500,
              padding: "8px 16px",
              height: 36,
              color: textColor,
              transition: `${colorTransition}, background-color 300ms ease`,
            }}
          >
            Chat With Us
          </a>

          <a
            href={WHATSAPP_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
            className={`${glassClass} md:hidden inline-flex items-center justify-center rounded-sh ${hoverBg}`}
            style={{
              width: 40,
              height: 40,
              color: textColor,
              transition: `${colorTransition}, background-color 300ms ease`,
            }}
          >
            <MessageCircle size={16} style={{ transition: colorTransition }} />
          </a>
        </div>
      </div>
    </nav>
  );
}
