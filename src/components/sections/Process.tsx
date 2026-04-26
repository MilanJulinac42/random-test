import { Reveal } from "@/components/Reveal";

const steps = [
  {
    num: "01",
    title: "Consultation & Design",
    body: "Your dedicated designer maps your vision, scope, and budget into a full project plan you approve before any work begins.",
    illustration: (
      <svg viewBox="0 0 200 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        {/* Floor plan outline */}
        <rect x="20" y="30" width="160" height="120" stroke="white" strokeWidth="1" />
        {/* Internal walls */}
        <line x1="90" y1="30" x2="90" y2="90" stroke="white" strokeWidth="1" />
        <line x1="90" y1="90" x2="180" y2="90" stroke="white" strokeWidth="1" />
        <line x1="20" y1="110" x2="90" y2="110" stroke="white" strokeWidth="1" />
        {/* Highlighted room */}
        <rect x="90" y="30" width="90" height="60" fill="#C2A97A" fillOpacity="0.2" />
        {/* Door arcs */}
        <path d="M 50 30 A 15 15 0 0 1 65 45" stroke="white" strokeWidth="1" fill="none" />
        <path d="M 130 90 A 12 12 0 0 1 142 102" stroke="white" strokeWidth="1" fill="none" />
        {/* Door gaps */}
        <line x1="50" y1="30" x2="65" y2="30" stroke="#0D0D0D" strokeWidth="2" />
        <line x1="130" y1="90" x2="142" y2="90" stroke="#0D0D0D" strokeWidth="2" />
        {/* Furniture hint */}
        <rect x="30" y="120" width="20" height="20" stroke="white" strokeWidth="1" />
        <circle cx="155" cy="125" r="10" stroke="white" strokeWidth="1" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Build & Milestone Tracking",
    body: "Vetted contractors execute. Photo updates and site inspections at every milestone — no money moves without your approval.",
    illustration: (
      <svg viewBox="0 0 200 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        {/* Constellation lines */}
        <line x1="40" y1="50" x2="100" y2="35" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
        <line x1="100" y1="35" x2="160" y2="60" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
        <line x1="40" y1="50" x2="60" y2="110" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
        <line x1="60" y1="110" x2="120" y2="135" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
        <line x1="120" y1="135" x2="160" y2="60" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
        <line x1="100" y1="35" x2="120" y2="135" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
        <line x1="60" y1="110" x2="160" y2="60" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />

        {/* Photo frames */}
        <rect x="28" y="38" width="24" height="24" stroke="white" strokeWidth="1" />
        <line x1="28" y1="55" x2="52" y2="55" stroke="white" strokeWidth="1" />
        <circle cx="36" cy="46" r="2" stroke="white" strokeWidth="1" />

        <rect x="148" y="48" width="24" height="24" stroke="white" strokeWidth="1" />
        <line x1="148" y1="65" x2="172" y2="65" stroke="white" strokeWidth="1" />
        <circle cx="156" cy="56" r="2" stroke="white" strokeWidth="1" />

        <rect x="108" y="123" width="24" height="24" stroke="white" strokeWidth="1" />
        <line x1="108" y1="140" x2="132" y2="140" stroke="white" strokeWidth="1" />
        <circle cx="116" cy="131" r="2" stroke="white" strokeWidth="1" />

        {/* Checkmarks in circles */}
        <circle cx="100" cy="35" r="10" stroke="#C2A97A" strokeWidth="1" />
        <path d="M 95 35 L 99 39 L 106 31" stroke="#C2A97A" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        <circle cx="60" cy="110" r="8" stroke="white" strokeWidth="1" />
        <path d="M 56 110 L 59 113 L 64 107" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Handover & Warranty",
    body: "Full walkthrough before keys are handed over. Issues resolved on the spot, with a written post-completion warranty.",
    illustration: (
      <svg viewBox="0 0 200 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        {/* Radiating arcs */}
        <circle cx="80" cy="90" r="50" stroke="white" strokeWidth="0.5" strokeOpacity="0.25" />
        <circle cx="80" cy="90" r="65" stroke="white" strokeWidth="0.5" strokeOpacity="0.18" />
        <circle cx="80" cy="90" r="80" stroke="white" strokeWidth="0.5" strokeOpacity="0.12" />

        {/* Key bow (circular head) */}
        <circle cx="80" cy="90" r="22" stroke="white" strokeWidth="1.2" />
        <circle cx="80" cy="90" r="8" stroke="white" strokeWidth="1" />

        {/* Key shaft */}
        <line x1="102" y1="90" x2="170" y2="90" stroke="white" strokeWidth="1.2" />

        {/* Key teeth */}
        <line x1="150" y1="90" x2="150" y2="100" stroke="white" strokeWidth="1.2" />
        <line x1="158" y1="90" x2="158" y2="98" stroke="white" strokeWidth="1.2" />
        <line x1="166" y1="90" x2="166" y2="96" stroke="white" strokeWidth="1.2" />

        {/* Accent dot */}
        <circle cx="80" cy="90" r="3" fill="#C2A97A" />
      </svg>
    ),
  },
];

export function Process() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden w-full"
      style={{ backgroundColor: "#0D0D0D", paddingTop: "clamp(80px, 10vw, 120px)", paddingBottom: "clamp(80px, 10vw, 120px)" }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <Reveal>
          <p
            className="uppercase"
            style={{ color: "#C2A97A", fontSize: 11, letterSpacing: "0.12em", fontWeight: 500 }}
          >
            HOW IT WORKS
          </p>
          <h2
            className="text-white mt-5"
            style={{
              fontSize: "clamp(36px, 5.5vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            From first call to
            <br />
            keys in hand.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-12 md:gap-0">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={[
                "relative px-0 md:px-8 py-10 md:py-4",
                // Vertical dividers on desktop
                i > 0 ? "md:border-l" : "",
                // Horizontal dividers on mobile
                i > 0 ? "border-t md:border-t-0" : "",
              ].join(" ")}
              style={{ borderColor: "#2A2A2A" }}
            >
              <Reveal>
                {/* Pill badge */}
                <span
                  className="inline-block"
                  style={{
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                    fontSize: 11,
                    color: "#888",
                    border: "1px solid #333",
                    borderRadius: 20,
                    padding: "4px 12px",
                  }}
                >
                  {s.num}
                </span>

                {/* Illustration zone */}
                <div className="mt-6 mx-auto flex items-center justify-center" style={{ height: 180 }}>
                  {s.illustration}
                </div>

                {/* Title */}
                <h3 className="text-white mt-6" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.01em" }}>
                  {s.title}
                </h3>

                {/* Body */}
                <p className="mt-3" style={{ fontSize: 14, color: "#999", lineHeight: 1.6 }}>
                  {s.body}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
