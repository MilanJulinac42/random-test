import { Instagram, Linkedin, MessageCircle, Mail, MapPin } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

const colLabel: React.CSSProperties = {
  fontWeight: 500,
  fontSize: 11,
  color: "#8C8C82",
  letterSpacing: "2px",
  textTransform: "uppercase",
  marginBottom: 16,
};

const linkStyle: React.CSSProperties = {
  fontWeight: 400,
  fontSize: 14,
  color: "#8C8C82",
  lineHeight: 2.2,
  display: "block",
};

export function Footer() {
  return (
    <footer
      style={{ background: "#0A0A0A", borderTop: "1px solid #1F1F1F", padding: "64px 0 32px" }}
      className="px-6 md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p style={{ fontWeight: 700, fontSize: 22, color: "#F5F0EB" }}>Reno</p>
            <p style={{ fontWeight: 400, fontSize: 13, color: "#8C8C82", marginTop: 8 }}>
              Dubai's Home Renovation Platform
            </p>
            <div className="flex items-center" style={{ gap: 14, marginTop: 20 }}>
              <a href="#" aria-label="Instagram" className="hover:text-[#C9A96E]" style={{ color: "#8C8C82" }}>
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-[#C9A96E]" style={{ color: "#8C8C82" }}>
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <p style={colLabel}>COMPANY</p>
            {["About Reno", "How It Works", "Our Projects", "Careers"].map((l) => (
              <a key={l} href="#" style={linkStyle} className="hover:!text-[#F5F0EB]">
                {l}
              </a>
            ))}
          </div>

          <div>
            <p style={colLabel}>HOMEOWNERS</p>
            {["Get Started", "Renovation Finance", "Download the App", "FAQs"].map((l) => (
              <a key={l} href="#" style={linkStyle} className="hover:!text-[#F5F0EB]">
                {l}
              </a>
            ))}
          </div>

          <div>
            <p style={colLabel}>CONTACT</p>
            <a href={WHATSAPP_URL} style={linkStyle} className="flex items-center gap-2">
              <MessageCircle size={14} color="#C9A96E" /> WhatsApp Us
            </a>
            <a href="mailto:hello@renohome.ae" style={linkStyle} className="flex items-center gap-2">
              <Mail size={14} color="#C9A96E" /> hello@renohome.ae
            </a>
            <span style={linkStyle} className="flex items-center gap-2">
              <MapPin size={14} color="#C9A96E" /> Dubai, United Arab Emirates
            </span>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: "1px solid #1F1F1F", marginTop: 48, paddingTop: 24 }}
        >
          <p style={{ fontWeight: 300, fontSize: 12, color: "#8C8C82" }}>
            © 2026 Reno Home Technologies LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" style={{ fontWeight: 300, fontSize: 12, color: "#8C8C82" }} className="hover:!text-[#F5F0EB]">
              Privacy Policy
            </a>
            <a href="#" style={{ fontWeight: 300, fontSize: 12, color: "#8C8C82" }} className="hover:!text-[#F5F0EB]">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
