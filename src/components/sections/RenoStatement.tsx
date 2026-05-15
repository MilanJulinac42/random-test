import renoBg from "@/assets/reno-bg.png";
import { Footer } from "@/components/sections/Footer";
import { WordReveal } from "@/components/WordReveal";

export function RenoStatement() {
  return (
    <section
      id="reno-statement"
      data-nav-theme="dark"
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#0D1A1E",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Background photo */}
      <img
        src={renoBg}
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* Dark overlay for legibility */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Center content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "clamp(80px,10vw,120px) clamp(24px,6vw,80px) clamp(48px,5vw,64px)",
          gap: "clamp(20px,2.4vw,28px)",
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <WordReveal
          as="h2"
          variant="clip"
          style={{
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: "clamp(44px,7.2vw,96px)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            margin: 0,
            maxWidth: 860,
          }}
        >
          Start your journey with Reno
        </WordReveal>

        <a
          href="#quiz"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: 56,
            padding: "0 28px",
            borderRadius: 12,
            backgroundColor: "#FFFFFF",
            color: "#0D0D0D",
            fontSize: 16,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Check availability
        </a>
      </div>

      {/* Footer — rendered over the dark image */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Footer />
      </div>

    </section>
  );
}
