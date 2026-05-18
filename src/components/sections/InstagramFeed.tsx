import { useAnimeReveal } from "@/lib/anime";
import { WordReveal } from "@/components/WordReveal";

const TILE_BGS = ["#E8E0D5", "#D5E0DC", "#D5D8E8", "#E8DDD5", "#D5E8E0", "#E8E5D5"];
const IG_URL = "https://instagram.com/reno_app";
const LI_URL = "https://www.linkedin.com/company/renohomeae/";

function InstagramIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke={color} strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1.1" fill={color} />
    </svg>
  );
}

function LinkedInIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export function InstagramFeed() {
  const headerRef = useAnimeReveal<HTMLDivElement>({ translateY: 22 });
  const gridRef = useAnimeReveal<HTMLDivElement>({ translateY: 24 });
  const cardRef = useAnimeReveal<HTMLDivElement>({ translateY: 20 });

  return (
    <section
      id="social"
      className="relative overflow-hidden w-full px-6 md:px-12 lg:px-16"
      style={{
        backgroundColor: "#0A0A0A",
        paddingTop: "clamp(60px, 7vw, 100px)",
        paddingBottom: "clamp(80px, 8vw, 120px)",
      }}
    >

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header row */}
        <div ref={headerRef}>
          <div
            className="flex flex-col md:flex-row md:items-end md:justify-between"
            style={{ marginBottom: 40, gap: 20 }}
          >
            <div>
              <WordReveal
                as="h2"
                variant="pop"
                style={{
                  fontSize: "clamp(40px, 5vw, 64px)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Follow the build.
              </WordReveal>
              <p style={{ fontSize: 15, color: "#999", marginTop: 6 }}>
                Real progress from real projects — updated regularly.
              </p>
            </div>
            <div className="flex flex-col md:items-end" style={{ gap: 8 }}>
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="reno-social-link inline-flex items-center"
                style={{
                  fontSize: 14,
                  color: "#FFFFFF",
                  fontWeight: 500,
                  textDecoration: "none",
                  gap: 8,
                }}
              >
                <InstagramIcon size={16} color="#FFFFFF" />
                @reno_app ↗
              </a>
              <a
                href={LI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="reno-social-link inline-flex items-center"
                style={{
                  fontSize: 14,
                  color: "#FFFFFF",
                  fontWeight: 500,
                  textDecoration: "none",
                  gap: 8,
                }}
              >
                <LinkedInIcon size={16} color="#482FFF" />
                Reno on LinkedIn ↗
              </a>
            </div>
          </div>
        </div>

        {/* Instagram grid */}
        <div ref={gridRef}>
          <div className="reno-ig-grid">
            {TILE_BGS.map((bg, i) => (
              <a
                key={i}
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-src=""
                className="reno-ig-cell"
                style={{ background: bg }}
                aria-label={`Instagram post ${i + 1}`}
              >
                <div className="reno-ig-overlay">
                  <InstagramIcon size={24} color="#FFFFFF" />
                  <span style={{ fontSize: 12, color: "#FFFFFF", marginTop: 6 }}>
                    View on Instagram
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* LinkedIn card */}
        <div ref={cardRef}>
          <div
            className="reno-li-card flex flex-col md:flex-row md:items-center md:justify-between"
            style={{
              marginTop: 20,
              background: "#1A1A1A",
              borderRadius: 16,
              padding: "28px 32px",
              gap: 20,
            }}
          >
            <div>
              <div className="flex items-center" style={{ gap: 8 }}>
                <LinkedInIcon size={20} color="#482FFF" />
                <span style={{ fontSize: 16, fontWeight: 500, color: "#FFFFFF" }}>
                  Reno on LinkedIn
                </span>
              </div>
              <p style={{ fontSize: 13, color: "#999", marginTop: 4 }}>
                Project stories, renovation insights, and what the Reno team is building.
              </p>
            </div>
            <a
              href={LI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="reno-li-btn inline-flex items-center justify-center"
              style={{
                border: "1.5px solid #FFFFFF",
                color: "#FFFFFF",
                background: "transparent",
                borderRadius: 6,
                padding: "10px 22px",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                transition: "background-color 200ms ease, color 200ms ease",
                whiteSpace: "nowrap",
              }}
            >
              Follow us ↗
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .reno-ig-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }
        @media (min-width: 768px) {
          .reno-ig-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .reno-ig-cell {
          position: relative;
          overflow: hidden;
          aspect-ratio: 1 / 1;
          display: block;
          border-radius: 14px;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.06) inset,
            0 1px 0 rgba(255,255,255,0.05) inset;
          transition: transform 480ms cubic-bezier(0.32, 0.72, 0, 1);
          will-change: transform;
        }
        .reno-ig-cell:hover { transform: translateY(-2px); }
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
        .reno-social-link:hover {
          text-decoration: underline;
        }
        .reno-li-btn:hover {
          background-color: #FFFFFF !important;
          color: #0D0D0D !important;
        }
        @media (max-width: 767px) {
          .reno-li-btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
