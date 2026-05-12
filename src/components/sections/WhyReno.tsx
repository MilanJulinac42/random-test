import { Reveal } from "@/components/Reveal";

const stats = [
  { number: "98%", label: "ON-TIME DELIVERY" },
  { number: "< 10%", label: "CONTRACTOR PASS RATE" },
  { number: "4.9", label: "HOMEOWNER RATING" },
];

export function WhyReno() {
  return (
    <section
      id="why-reno"
      data-nav-theme="dark"
      className="relative overflow-hidden w-full"
      style={{
        backgroundColor: "#0f0f0f",
        paddingTop: 120,
        paddingBottom: 120,
      }}
    >
      <style>{`
        .reno-stats-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 48px;
        }
        .reno-stats-sep { display: none; }
        .reno-stat-number { font-size: 72px; }
        @media (min-width: 768px) {
          .reno-stats-row {
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 0;
          }
          .reno-stats-sep {
            display: block;
            width: 1px;
            height: 80px;
            background: #222;
            margin: 0 48px;
          }
          .reno-stat-number { font-size: 100px; }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <Reveal>
          <p
            className="text-center uppercase"
            style={{ color: "#555", fontSize: 11, letterSpacing: "0.2em", fontWeight: 500 }}
          >
            THE NUMBERS
          </p>
          <h2
            className="text-center mx-auto"
            style={{
              marginTop: 20,
              fontSize: "clamp(28px, 3vw, 32px)",
              fontWeight: 600,
              color: "#fff",
              maxWidth: 520,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            We built the system homeowners deserve.
          </h2>
        </Reveal>

        {/* Stats row */}
        <Reveal>
          <div className="reno-stats-row" style={{ marginTop: 60 }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{ display: "contents" }}>
                {i > 0 && <div className="reno-stats-sep" aria-hidden />}
                <div className="flex flex-col items-center text-center">
                  <div
                    className="reno-stat-number"
                    style={{
                      fontWeight: 800,
                      color: "#fff",
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {s.number}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      letterSpacing: "0.15em",
                      color: "#666",
                      marginTop: 14,
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Guarantee block */}
      <div
        style={{
          marginTop: 80,
          borderTop: "1px solid #1e1e1e",
          paddingTop: 48,
          paddingBottom: 48,
        }}
      >
        <Reveal>
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 text-center">
            <p
              className="uppercase"
              style={{ color: "#555", fontSize: 11, letterSpacing: "0.2em", fontWeight: 500 }}
            >
              OUR GUARANTEE
            </p>
            <h3
              className="mx-auto"
              style={{
                marginTop: 16,
                fontSize: "clamp(22px, 2.4vw, 24px)",
                fontWeight: 500,
                color: "#fff",
                maxWidth: 580,
                lineHeight: 1.3,
              }}
            >
              If we run late, you're compensated. In writing, before we start.
            </h3>
            <div style={{ marginTop: 20 }}>
              <a
                href="#how-it-works"
                style={{
                  fontSize: 14,
                  color: "#888",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
              >
                See how it works →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
