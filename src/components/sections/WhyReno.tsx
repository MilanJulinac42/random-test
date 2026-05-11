import { Reveal } from "@/components/Reveal";
import { Clock, ShieldCheck, Star } from "lucide-react";

const stats = [
  {
    Icon: Clock,
    number: "98%",
    label: "ON-TIME DELIVERY",
    story: "Delivered on or before the agreed date, across\n             all completed Reno projects.",
  },
  {
    Icon: ShieldCheck,
    number: "< 10%",
    label: "CONTRACTOR ACCEPTANCE RATE",
    story: "Fewer than 1 in 10 contractors who apply make\n             it onto the Reno platform.",
  },
  {
    Icon: Star,
    number: "4.9",
    label: "HOMEOWNER RATING",
    story: "Verified average from post-handover survey across 200+ completed projects.",
  },
];

export function WhyReno() {
  return (
    <section
      id="why-reno"
      data-nav-theme="light"
      className="relative overflow-hidden w-full px-6 md:px-12 lg:px-16"
      style={{
        backgroundColor: "#FFFFFF",
        paddingTop: "clamp(64px, 8vw, 100px)",
        paddingBottom: "clamp(64px, 8vw, 100px)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <p
            className="text-center uppercase"
            style={{ color: "#888", fontSize: 11, letterSpacing: "0.1em", fontWeight: 500 }}
          >
            THE NUMBERS
          </p>
          <h2
            className="text-center mx-auto mt-4"
            style={{
              fontSize: "clamp(32px, 4.5vw, 44px)",
              fontWeight: 700,
              color: "#0D0D0D",
              maxWidth: 560,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            We built the system homeowners deserve.
          </h2>
          <p
            className="text-center mx-auto mt-5"
            style={{
              fontSize: 16,
              color: "#777",
              maxWidth: 560,
              lineHeight: 1.6,
            }}
          >
            The Dubai renovation market is broken. Reno fixes
            that with a system that keeps everyone accountable
            — your designer, your contractor, and us.
          </p>
        </Reveal>

        {/* Stat cards */}
        <Reveal>
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ marginTop: 56, gap: 20 }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center text-center"
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #EBEBEB",
                  borderRadius: 16,
                  padding: "36px 28px",
                }}
              >
                <s.Icon size={36} color="#4A24FF" strokeWidth={1.5} />
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    color: "#AAA",
                    marginTop: 8,
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: 64,
                    fontWeight: 800,
                    color: "#0D0D0D",
                    lineHeight: 1,
                    marginTop: 8,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.number}
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "#777",
                    marginTop: 10,
                    lineHeight: 1.6,
                  }}
                >
                  {s.story}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Guarantee block */}
        <Reveal>
          <div
            className="flex flex-col md:flex-row md:items-center md:justify-between"
            style={{
              background: "#0D0D0D",
              borderRadius: 16,
              padding: "clamp(32px, 5vw, 48px) clamp(28px, 5vw, 56px)",
              marginTop: 20,
              gap: 24,
            }}
          >
            <div>
              <p
                className="uppercase"
                style={{ color: "#A78BFA", fontSize: 11, letterSpacing: "0.1em", fontWeight: 500 }}
              >
                OUR GUARANTEE
              </p>
              <h3
                style={{
                  fontSize: "clamp(22px, 2.6vw, 28px)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  maxWidth: 380,
                  marginTop: 10,
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                }}
              >
                If we run late, you're compensated. In writing, before we start.
              </h3>
            </div>
            <a
              href="#how-it-works"
              className="reno-guarantee-btn inline-flex items-center justify-center shrink-0"
              style={{
                border: "1.5px solid #555",
                color: "#DDD",
                background: "transparent",
                borderRadius: 8,
                padding: "14px 28px",
                fontSize: 14,
                fontWeight: 500,
                transition: "border-color 200ms ease, color 200ms ease",
                whiteSpace: "nowrap",
              }}
            >
              See how it works
            </a>
          </div>
        </Reveal>
      </div>

      <style>{`
        .reno-guarantee-btn:hover {
          border-color: #FFFFFF !important;
          color: #FFFFFF !important;
        }
      `}</style>
    </section>
  );
}
