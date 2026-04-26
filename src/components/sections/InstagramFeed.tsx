import { Reveal } from "@/components/Reveal";

const PLACEHOLDER_BGS = ["#F0EDE8", "#E8EDE8", "#E8EDF0", "#F0EDE8", "#E8EDE8", "#E8EDF0"];
const POST_URL = "https://instagram.com/renohome.ae";

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="white" />
    </svg>
  );
}

export function InstagramFeed() {
  return (
    <section
      id="instagram"
      className="relative w-full px-6 md:px-12 lg:px-16"
      style={{
        backgroundColor: "#FFFFFF",
        paddingTop: "clamp(48px, 6vw, 80px)",
        paddingBottom: "clamp(48px, 6vw, 80px)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div
            className="flex flex-col md:flex-row md:items-end md:justify-between"
            style={{ marginBottom: 40, gap: 16 }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 700,
                  color: "#0D0D0D",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Follow the build.
              </h2>
              <p style={{ fontSize: 15, color: "#777", marginTop: 8 }}>
                Behind the scenes of every Reno project.
              </p>
            </div>
            <a
              href={POST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="reno-ig-handle"
              style={{
                fontSize: 14,
                color: "#0D0D0D",
                fontWeight: 500,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              @renohome.ae ↗
            </a>
          </div>
        </Reveal>

        <Reveal>
          <div className="reno-ig-grid">
            {PLACEHOLDER_BGS.map((bg, i) => (
              <a
                key={i}
                href={POST_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-src=""
                className="reno-ig-cell"
                style={{ background: bg }}
                aria-label={`Instagram post ${i + 1}`}
              >
                <div className="reno-ig-overlay">
                  <InstagramIcon />
                  <span style={{ fontSize: 12, color: "#FFFFFF", marginTop: 8 }}>View post</span>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        .reno-ig-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
        }
        @media (min-width: 768px) {
          .reno-ig-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }
        }
        .reno-ig-cell {
          position: relative;
          overflow: hidden;
          aspect-ratio: 1 / 1;
          display: block;
        }
        .reno-ig-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .reno-ig-cell:hover .reno-ig-overlay,
        .reno-ig-cell:focus-visible .reno-ig-overlay {
          opacity: 1;
        }
        .reno-ig-handle:hover {
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
}
