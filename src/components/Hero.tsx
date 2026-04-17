import { ChevronDown } from "lucide-react";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { FadeIn } from "@/components/FadeIn";
import { WHATSAPP_GENERAL } from "@/lib/constants";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden flex flex-col bg-background text-foreground"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div
        className="relative z-10 flex-1 flex flex-col justify-end pb-12 lg:pb-16 px-6 md:px-12 lg:px-16"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-end">
          {/* Left column */}
          <div className="max-w-3xl lg:max-w-none">
            <FadeIn delay={200}>
              <p
                className="text-primary uppercase text-xs md:text-sm font-medium"
                style={{ letterSpacing: "0.2em" }}
              >
                Dubai's Home Renovation Platform
              </p>
            </FadeIn>

            <AnimatedHeading
              text={"Transform Your Home.\nNo Stress. No Surprises."}
              className="text-4xl md:text-5xl lg:text-6xl text-foreground mt-4"
              lineClassName="whitespace-nowrap"
              style={{ fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em" }}
            />

            <FadeIn delay={800}>
              <p className="text-muted-foreground text-base md:text-lg mt-5 leading-relaxed line-clamp-2">
                End-to-end renovation by expert designers and vetted contractors — milestone-based payments, fully managed. Projects from AED 275k to 920k.
              </p>
            </FadeIn>

            <FadeIn delay={1200}>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a
                  href="#quiz"
                  className="reno-cta inline-flex items-center justify-center bg-primary text-primary-foreground rounded-sh px-7 font-semibold text-sm"
                  style={{ height: 52 }}
                >
                  Check Project Availability →
                </a>
              </div>
            </FadeIn>

          </div>

          {/* Right column — glass tag */}
          <FadeIn delay={1200} className="hidden lg:flex justify-end">
            <div
              className="liquid-glass rounded-sh-lg px-6 py-5"
              style={{ maxWidth: 280 }}
            >
              <p className="text-primary uppercase text-[11px] font-medium" style={{ letterSpacing: "0.2em" }}>
                Our Promise
              </p>
              <p className="text-foreground text-lg md:text-xl mt-2" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
                Design. Build. Deliver.
              </p>
              <p className="text-muted-foreground text-xs mt-2 leading-relaxed">
                End-to-end renovation, fully managed.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      <a
        href="#gallery"
        aria-label="Scroll down"
        className="absolute left-1/2 -translate-x-1/2 z-10 reno-bounce text-primary"
        style={{ bottom: 28 }}
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
