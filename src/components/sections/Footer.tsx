import { LinkedInIcon, InstagramIcon, WhatsAppIcon } from "@/components/SocialIcons";
import { LINKEDIN_URL, INSTAGRAM_URL, WHATSAPP_GENERAL } from "@/lib/constants";
import logo from "@/assets/logo.png";

const socialLinkStyle: React.CSSProperties = {
  color: "#666",
  transition: "color 0.2s",
  display: "inline-flex",
};

const navLinkStyle: React.CSSProperties = {
  display: "block",
  fontSize: 14,
  color: "#666",
  marginBottom: 12,
  textDecoration: "none",
  transition: "color 0.2s",
};

const columnLabelStyle: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: "0.12em",
  color: "#444",
  marginBottom: 18,
  textTransform: "uppercase",
  fontWeight: 600,
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
      style={socialLinkStyle}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
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
        backgroundColor: "#0D0D0D",
        paddingTop: 64,
        paddingBottom: 40,
      }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div
          className="grid gap-12 md:gap-12"
          style={{
            gridTemplateColumns: "1fr",
          }}
        >
          <style>{`
            @media (min-width: 600px) {
              .reno-footer-grid { grid-template-columns: 1fr 1fr !important; }
            }
            @media (min-width: 900px) {
              .reno-footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr !important; gap: 48px !important; }
            }
          `}</style>
        </div>

        <div
          className="reno-footer-grid grid"
          style={{
            gridTemplateColumns: "1fr",
            gap: 40,
          }}
        >
          {/* Column 1: Brand */}
          <div>
            <img src={logo} alt="Reno" className="h-9 w-auto" />
            <p style={{ fontSize: 14, color: "#777", marginTop: 14 }}>
              Dubai's home renovation platform.
            </p>
            <p style={{ fontSize: 13, color: "#555", marginTop: 8, lineHeight: 1.6 }}>
              End-to-end renovation, fully managed — from first brief to final handover.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 20 }}>
              <SocialLink href={INSTAGRAM_URL} label="Instagram">
                <InstagramIcon size={20} />
              </SocialLink>
              <SocialLink href={LINKEDIN_URL} label="LinkedIn">
                <LinkedInIcon size={20} />
              </SocialLink>
              <SocialLink href={WHATSAPP_GENERAL} label="WhatsApp">
                <WhatsAppIcon size={20} />
              </SocialLink>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div>
            <p style={columnLabelStyle}>PLATFORM</p>
            <NavLink href="#top">Home</NavLink>
            <NavLink href="#how-it-works">How It Works</NavLink>
            <NavLink href="#gallery">Our Work</NavLink>
            <NavLink href="#quiz">Get Started</NavLink>
          </div>

          {/* Column 3: Company */}
          <div>
            <p style={columnLabelStyle}>COMPANY</p>
            <span style={navLinkStyle}>About Reno</span>
            <span style={navLinkStyle}>For Contractors</span>
            <span style={navLinkStyle}>Privacy Policy</span>
            <span style={navLinkStyle}>Terms of Service</span>
          </div>

          {/* Column 4: Contact */}
          <div>
            <p style={columnLabelStyle}>CONTACT</p>
            <NavLink href={WHATSAPP_GENERAL}>Chat on WhatsApp</NavLink>
            <NavLink href="https://instagram.com/reno_app">@reno_app</NavLink>
            <NavLink href="https://www.linkedin.com/company/renohomeae/">Reno on LinkedIn</NavLink>
            <p
              style={{
                marginTop: 20,
                fontSize: 13,
                color: "#444",
                lineHeight: 1.6,
              }}
            >
              101, EIB Building
              <br />
              Dubai Media City, Dubai
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: 48,
            borderTop: "1px solid #1E1E1E",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p style={{ fontSize: 12, color: "#444", margin: 0 }}>
            © 2026 Reno Home Technologies LLC. All rights reserved.
          </p>
          <div style={{ display: "none" }}>
            {["iOS App", "Android App"].map((label) => (
              <a key={label} href="#">{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
