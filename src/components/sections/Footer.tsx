import { Instagram, Linkedin, MessageCircle, Mail, MapPin } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

const colLabel = "text-muted-foreground text-[11px] font-medium uppercase mb-4";
const linkStyle = "block text-muted-foreground text-sm leading-9 hover:text-foreground transition-colors";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8 px-6 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p className="text-foreground" style={{ fontWeight: 700, fontSize: 22 }}>Reno</p>
            <p className="text-muted-foreground text-xs mt-2">
              Dubai's Home Renovation Platform
            </p>
            <div className="flex items-center gap-4 mt-5">
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <p className={colLabel} style={{ letterSpacing: "0.16em" }}>COMPANY</p>
            {["About Reno", "How It Works", "Our Projects", "Careers"].map((l) => (
              <a key={l} href="#" className={linkStyle}>{l}</a>
            ))}
          </div>

          <div>
            <p className={colLabel} style={{ letterSpacing: "0.16em" }}>HOMEOWNERS</p>
            {["Get Started", "Renovation Finance", "Download the App", "FAQs"].map((l) => (
              <a key={l} href="#" className={linkStyle}>{l}</a>
            ))}
          </div>

          <div>
            <p className={colLabel} style={{ letterSpacing: "0.16em" }}>CONTACT</p>
            <a href={WHATSAPP_URL} className={`${linkStyle} flex items-center gap-2`}>
              <MessageCircle size={14} className="text-primary" /> WhatsApp Us
            </a>
            <a href="mailto:hello@renohome.ae" className={`${linkStyle} flex items-center gap-2`}>
              <Mail size={14} className="text-primary" /> hello@renohome.ae
            </a>
            <span className={`${linkStyle} flex items-center gap-2`}>
              <MapPin size={14} className="text-primary" /> Dubai, United Arab Emirates
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border mt-12 pt-6">
          <p className="text-muted-foreground text-xs" style={{ fontWeight: 300 }}>
            © 2026 Reno Home Technologies LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground text-xs hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground text-xs hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
