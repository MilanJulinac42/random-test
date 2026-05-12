import { LinkedInIcon, InstagramIcon, WhatsAppIcon } from "@/components/SocialIcons";
import { LINKEDIN_URL, INSTAGRAM_URL, WHATSAPP_GENERAL } from "@/lib/constants";
import logo from "@/assets/logo.png";

const navLinkStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#666",
  textDecoration: "none",
  transition: "color 0.2s",
  display: "block",
};

const legalLinkStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#3a3a3a",
  textDecoration: "none",
  transition: "color 0.2s",
};

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={navLinkStyle}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
    >
      {children}
    </a>
  );
}

function LegalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={legalLinkStyle}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#777")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#3a3a3a")}
    >
      {children}
    </a>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{ color: "#555", transition: "color 0.2s", display: "inline-flex" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer
      className="relative w-full"
      style={{
        backgroundColor: "#0a0a0a",
        borderTop: "1px solid #1a1a1a",
        paddingTop: 72,
        paddingBottom: 48,
      }}
    >
      <style>{`
        .reno-footer-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 32px;
        }
        .reno-footer-col-left,
        .reno-footer-col-center,
        .reno-footer-col-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .reno-footer-legal {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
        }
        @media (min-width: 768px) {
          .reno-footer-row {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            text-align: left;
            gap: 48px;
          }
          .reno-footer-col-left { align-items: flex-start; text-align: left; }
          .reno-footer-col-center { align-items: center; text-align: center; }
          .reno-footer-col-right { align-items: flex-end; text-align: right; }
          .reno-footer-legal {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            text-align: left;
          }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="reno-footer-row">
          {/* LEFT */}
          <div className="reno-footer-col-left">
            <img src={logo} alt="Reno" style={{ height: 28, width: "auto" }} />
            <p style={{ fontSize: 13, color: "#666", fontWeight: 400, marginTop: 16, marginBottom: 0 }}>
              Dubai's home renovation partner.
            </p>
            <div style={{ display: "flex", gap: 20, marginTop: 24 }}>
              <SocialLink href={INSTAGRAM_URL} label="Instagram">
                <InstagramIcon size={18} />
              </SocialLink>
              <SocialLink href={LINKEDIN_URL} label="LinkedIn">
                <LinkedInIcon size={18} />
              </SocialLink>
              <SocialLink href={WHATSAPP_GENERAL} label="WhatsApp">
                <WhatsAppIcon size={18} />
              </SocialLink>
            </div>
          </div>

          {/* CENTER */}
          <nav className="reno-footer-col-center" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <NavLink href="#how-it-works">How It Works</NavLink>
            <NavLink href="#gallery">Our Work</NavLink>
            <NavLink href="#quiz">Get Started</NavLink>
            <NavLink href="#">For Contractors</NavLink>
          </nav>

          {/* RIGHT */}
          <div className="reno-footer-col-right">
            <a
              href={WHATSAPP_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 14, color: "#fff", fontWeight: 500, textDecoration: "none" }}
            >
              Chat on WhatsApp →
            </a>
            <p style={{ fontSize: 12, color: "#444", marginTop: 12, marginBottom: 0 }}>
              101, EIB Building, Dubai Media City
            </p>
            <p style={{ fontSize: 12, color: "#444", marginTop: 8, marginBottom: 0 }}>
              <a href="#" style={{ color: "#444", textDecoration: "none" }}>iOS App</a>
              {"  ·  "}
              <a href="#" style={{ color: "#444", textDecoration: "none" }}>Android App</a>
            </p>
          </div>
        </div>

        {/* LEGAL */}
        <div
          className="reno-footer-legal"
          style={{
            marginTop: 48,
            borderTop: "1px solid #161616",
            paddingTop: 24,
          }}
        >
          <p style={{ fontSize: 12, color: "#3a3a3a", margin: 0 }}>
            © 2026 Reno Home Technologies LLC. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <LegalLink href="#">Privacy Policy</LegalLink>
            <span style={{ color: "#3a3a3a", fontSize: 12 }}>·</span>
            <LegalLink href="#">Terms of Service</LegalLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
