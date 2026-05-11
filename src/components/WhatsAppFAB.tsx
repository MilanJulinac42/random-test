import { useEffect, useState } from "react";
import { WHATSAPP_GENERAL } from "@/lib/constants";

// WhatsApp brand green — high contrast against both white and dark sections.
const WA_GREEN = "#25D366";
const WA_GREEN_DARK = "#1FB856";

export function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={WHATSAPP_GENERAL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed flex items-center gap-2"
      style={{
        bottom: 28,
        right: 28,
        zIndex: 999,
        height: 52,
        padding: "0 20px",
        borderRadius: 9999,
        backgroundColor: WA_GREEN,
        color: "#FFFFFF",
        boxShadow: "0 8px 24px rgba(37, 211, 102, 0.35), 0 2px 6px rgba(0,0,0,0.15)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition:
          "opacity 0.4s ease, transform 0.2s ease, box-shadow 0.3s ease, background-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.transform = "translateY(-2px)";
        el.style.backgroundColor = WA_GREEN_DARK;
        el.style.boxShadow =
          "0 12px 32px rgba(37, 211, 102, 0.45), 0 4px 10px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.transform = "translateY(0)";
        el.style.backgroundColor = WA_GREEN;
        el.style.boxShadow =
          "0 8px 24px rgba(37, 211, 102, 0.35), 0 2px 6px rgba(0,0,0,0.15)";
      }}
    >
      <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" aria-hidden>
        <path d="M16 .4C7.4.4.5 7.3.5 15.9c0 2.8.7 5.5 2.1 7.9L.4 31.6l8-2.1c2.3 1.3 4.9 1.9 7.6 1.9 8.6 0 15.5-7 15.5-15.5C31.5 7.3 24.6.4 16 .4zm0 28.3c-2.4 0-4.7-.6-6.7-1.9l-.5-.3-4.7 1.2 1.3-4.6-.3-.5c-1.4-2.1-2.1-4.6-2.1-7.1 0-7.1 5.8-12.9 12.9-12.9 7.1 0 12.9 5.8 12.9 12.9.1 7-5.7 12.9-12.8 12.9zm7-9.7c-.4-.2-2.3-1.1-2.6-1.2-.3-.1-.6-.2-.9.2-.3.4-1 1.2-1.2 1.5-.2.3-.5.3-.9.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.7.1-.3 0-.5 0-.7-.1-.2-.9-2.2-1.2-3-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.7.1-1.1.5-.4.4-1.4 1.4-1.4 3.4 0 2 1.5 4 1.7 4.2.2.3 2.9 4.5 7.1 6.3 1 .4 1.8.7 2.4.9 1 .3 1.9.3 2.6.2.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.7.2-1.8 0-.2-.3-.3-.7-.5z" />
      </svg>
      <span className="hidden md:inline text-sm font-medium">Chat on WhatsApp</span>
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: -2,
          right: -2,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: WA_GREEN,
          boxShadow: "0 0 0 2px #FFFFFF",
        }}
      />
    </a>
  );
}
