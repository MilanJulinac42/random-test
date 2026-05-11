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
              fontSize: "clamp(32px, 4vw, 40px)",
              fontWeight: 700,
              color: "#0D0D0D",
              maxWidth: 600,
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
                    fontSize: "clamp(80px, 9vw, 96px)",
                    fontWeight: 800,
                    color: "#0D0D0D",
                    lineHeight: 1,
                    marginTop: 16,
                    letterSpacing: "-0.04em",
                    order: 2,
                  }}
                >
                  {s.number}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    letterSpacing: "0.14em",
                    color: "#888",
                    marginTop: 14,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    order: 3,
                  }}
                >
                  {s.label}
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
            style={{
              background: "#0D0D0D",
              borderRadius: 16,
              padding: "clamp(32px, 5vw, 48px) clamp(28px, 5vw, 56px)",
              marginTop: 20,
            }}
          >
            <p
              className="uppercase"
              style={{ color: "#A78BFA", fontSize: 11, letterSpacing: "0.1em", fontWeight: 500 }}
            >
              OUR GUARANTEE
            </p>
            <h3
              style={{
                fontSize: "clamp(28px, 3.6vw, 40px)",
                color: "#FFFFFF",
                fontWeight: 700,
                marginTop: 14,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              If we run late, you're compensated. {"\n"}In writing, before we start.
            </h3>
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
