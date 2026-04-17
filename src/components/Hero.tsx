import { ChevronDown } from "lucide-react";
import { WHATSAPP_GENERAL } from "@/lib/constants";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "#0A0A0A", color: "#F5F0EB" }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay: desktop gradient, mobile flat */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to right, rgba(10,10,10,0.90) 45%, rgba(10,10,10,0.25) 100%)",
        }}
      />
      <div
        className="absolute inset-0 md:hidden"
        style={{ background: "rgba(10,10,10,0.78)" }}
      />

      <div className="relative z-10 flex min-h-screen items-center">
        <div
          className="w-full"
          style={{ paddingLeft: "6%", paddingRight: "6%" }}
        >
          <div style={{ maxWidth: 560 }} className="px-0 md:pl-0">
            <p
              style={{
                fontWeight: 500,
                fontSize: 13,
                color: "#C9A96E",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Dubai's Home Renovation Platform
            </p>

            <h1
              className="text-[38px] md:text-[58px]"
              style={{
                fontWeight: 800,
                color: "#F5F0EB",
                lineHeight: 1.1,
                marginTop: 16,
              }}
            >
              Transform Your Home.
              <br />
              No Stress. No Surprises.
            </h1>

            <p
              style={{
                fontWeight: 400,
                fontSize: 17,
                color: "#8C8C82",
                maxWidth: 460,
                lineHeight: 1.65,
                marginTop: 20,
              }}
            >
              Reno manages your full renovation end-to-end — expert designers,
              vetted contractors, and milestone-based payments. Specialising in
              projects from AED 275,000 to AED 920,000.
            </p>

            <div
              className="flex flex-col sm:flex-row"
              style={{ marginTop: 36, gap: 12 }}
            >
              <a
                href="#quiz"
                className="reno-cta-gold inline-flex items-center justify-center"
                style={{
                  background: "#C9A96E",
                  color: "#0A0A0A",
                  fontWeight: 600,
                  fontSize: 15,
                  height: 52,
                  padding: "0 28px",
                  borderRadius: 10,
                }}
              >
                Check Project Availability →
              </a>
              <a
                href={WHATSAPP_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center transition-colors hover:bg-[#C9A96E] hover:text-[#0A0A0A]"
                style={{
                  background: "transparent",
                  border: "1px solid #C9A96E",
                  color: "#C9A96E",
                  fontWeight: 500,
                  fontSize: 15,
                  height: 52,
                  padding: "0 28px",
                  borderRadius: 10,
                }}
              >
                WhatsApp Us ↗
              </a>
            </div>

            <div
              className="flex flex-wrap items-center"
              style={{ marginTop: 40, gap: 16 }}
            >
              {[
                "200+ Projects Delivered",
                "On-Time Guarantee",
                "Vetted Contractors Only",
              ].map((label, i) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="flex items-center gap-2">
                    <span style={{ color: "#C9A96E" }}>✓</span>
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: 13,
                        color: "#F5F0EB",
                        letterSpacing: "0.3px",
                      }}
                    >
                      {label}
                    </span>
                  </span>
                  {i < 2 && (
                    <span style={{ color: "#1F1F1F" }} className="hidden sm:inline">
                      |
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a
        href="#gallery"
        aria-label="Scroll down"
        className="absolute left-1/2 -translate-x-1/2 z-10 reno-bounce"
        style={{ bottom: 28, color: "#C9A96E", fontSize: 20 }}
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
