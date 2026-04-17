import { LinkedInIcon, InstagramIcon } from "@/components/SocialIcons";
import { LINKEDIN_URL, INSTAGRAM_URL } from "@/lib/constants";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-background border-t border-border pt-16 pb-8 px-6 md:px-12 lg:px-16 section-fade-top">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Logo + tagline */}
          <div>
            <img src={logo} alt="Reno" className="h-9 w-auto" />
            <p className="text-muted-foreground text-xs mt-4">
              Dubai's Home Renovation Platform
            </p>
          </div>

          {/* About */}
          <div>
            <p className="text-foreground text-[11px] font-medium uppercase mb-3" style={{ letterSpacing: "0.16em" }}>
              About
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Reno is Dubai's end-to-end renovation platform — connecting homeowners with vetted designers and contractors, fully managed from concept to handover.
            </p>
          </div>

          {/* Address + socials */}
          <div>
            <p className="text-foreground text-[11px] font-medium uppercase mb-3" style={{ letterSpacing: "0.16em" }}>
              Address
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              101, EIB Building<br />
              Dubai Media City<br />
              Dubai, UAE
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white hover:text-primary transition-colors"
              >
                <LinkedInIcon size={18} />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white hover:text-primary transition-colors"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
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
