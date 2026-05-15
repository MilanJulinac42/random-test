import renoBg from "@/assets/reno-bg.png";

export function RenoStatement() {
  return (
    <section
      id="reno-statement"
      data-nav-theme="dark"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#0D1A1E",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 100%)",
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
          padding: "clamp(80px,10vw,120px) clamp(24px,6vw,80px) clamp(120px,14vw,160px)",
          gap: "clamp(20px,2.4vw,28px)",
          width: "100%",
          maxWidth: 1200,
        }}
      >
        <h2
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
        </h2>

        <p
          style={{
            color: "rgba(255,255,255,0.72)",
            fontSize: "clamp(15px,1.3vw,18px)",
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: 600,
            margin: 0,
          }}
        >
          Reno Collective is continuously expanding. We welcome designers,
          contractors, and specialists who combine creative vision with
          operational discipline.
        </p>

        <a
          href="#quiz"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: "clamp(52px,5.2vw,60px)",
            padding: "0 clamp(28px,3.2vw,40px)",
            borderRadius: 100,
            backgroundColor: "#FFFFFF",
            color: "#0D0D0D",
            fontSize: "clamp(15px,1.2vw,17px)",
            fontWeight: 600,
            textDecoration: "none",
            marginTop: 4,
          }}
        >
          Start now
        </a>
      </div>

    </section>
  );
}
