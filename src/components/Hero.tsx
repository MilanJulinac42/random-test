import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { FadeIn } from "@/components/FadeIn";

const HLS_SRC = "https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Safari (and iOS) supports HLS natively
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true, lowLatencyMode: false });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
      return () => {
        hls.destroy();
      };
    }
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden flex flex-col bg-background text-foreground"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="glow-aura-bottom" aria-hidden />

      <div
        className="relative z-10 flex-1 flex flex-col justify-end pb-12 lg:pb-16 px-6 md:px-12 lg:px-16"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-end">
          {/* Left column */}
          <div className="max-w-3xl lg:max-w-none">
            <FadeIn delay={150}>
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
              initialDelay={150}
            />

            <FadeIn delay={350}>
              <p className="text-muted-foreground text-base md:text-lg mt-5 leading-relaxed max-w-2xl">
                End-to-end renovation by expert designers and vetted contractors — milestone-based payments, fully managed. Projects from AED 275k to 920k.
              </p>
            </FadeIn>

            <FadeIn delay={550}>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a
                  href="#quiz"
                  className="reno-btn-purple reno-cta inline-flex items-center justify-center rounded-sh px-7 font-semibold text-sm"
                  style={{ height: 52 }}
                >
                  Check Project Availability →
                </a>
              </div>
            </FadeIn>

          </div>

          {/* Right column — glass tag */}
          <FadeIn delay={750} className="hidden lg:flex justify-end">
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
