import { PencilRuler, HardHat, KeyRound } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const steps = [
  {
    badge: "Week 1–3",
    Icon: PencilRuler,
    num: "1",
    title: "Consultation & Design",
    body:
      "Your dedicated designer maps your vision, scope, and budget into a full project plan. You see — and approve — everything before any work begins.",
  },
  {
    badge: "Weeks 4–16",
    Icon: HardHat,
    num: "2",
    title: "Build & Milestone Tracking",
    body:
      "Your vetted contractor team gets to work. Photo updates at every milestone. Our site inspectors verify quality at each stage. You approve releases through the Reno app — no money moves without your confirmation.",
  },
  {
    badge: "Final Week",
    Icon: KeyRound,
    num: "3",
    title: "Handover & Warranty",
    body:
      "We do a full walkthrough with you before keys are handed over. Any issues are resolved on the spot. Your project comes with a post-completion warranty period, in writing.",
  },
];

export function Process() {
  return (
    <section id="how-it-works" style={{ background: "#141414" }} className="px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p
            className="text-center"
            style={{ fontWeight: 500, fontSize: 12, color: "#C9A96E", letterSpacing: "3px", textTransform: "uppercase" }}
          >
            HOW IT WORKS
          </p>
          <h2
            className="text-center text-[28px] md:text-[42px]"
            style={{ fontWeight: 700, color: "#F5F0EB", marginTop: 12 }}
          >
            From First Call to Final Handover
          </h2>
          <p
            className="text-center mx-auto"
            style={{ fontWeight: 400, fontSize: 16, color: "#8C8C82", maxWidth: 480, margin: "12px auto 64px" }}
          >
            A structured process that removes every guessing game.
          </p>
        </Reveal>

        <div className="relative">
          {/* Dashed connector (desktop only) */}
          <div
            className="hidden lg:block absolute left-0 right-0"
            style={{
              top: 90,
              borderTop: "1px dashed #1F1F1F",
              marginLeft: "16%",
              marginRight: "16%",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-0 relative">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div className="relative text-center px-6 lg:px-10">
                  <span
                    style={{
                      background: "#1F1F1F",
                      color: "#C9A96E",
                      fontWeight: 500,
                      fontSize: 12,
                      padding: "4px 12px",
                      borderRadius: 100,
                      display: "inline-block",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {s.badge}
                  </span>
                  <div className="relative" style={{ marginTop: 16 }}>
                    <span
                      aria-hidden
                      className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none"
                      style={{
                        top: -30,
                        fontWeight: 800,
                        fontSize: 96,
                        color: "#C9A96E",
                        opacity: 0.06,
                        lineHeight: 1,
                      }}
                    >
                      {s.num}
                    </span>
                    <s.Icon
                      size={32}
                      color="#C9A96E"
                      style={{ margin: "16px auto", display: "block", position: "relative", zIndex: 1 }}
                    />
                    <h3 style={{ fontWeight: 600, fontSize: 20, color: "#F5F0EB", marginBottom: 12 }}>
                      {s.title}
                    </h3>
                    <p style={{ fontWeight: 400, fontSize: 15, color: "#8C8C82", lineHeight: 1.65 }}>
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="text-center" style={{ marginTop: 56 }}>
          <a
            href="#quiz"
            className="inline-flex items-center justify-center reno-cta-gold"
            style={{
              background: "#C9A96E",
              color: "#0A0A0A",
              fontWeight: 600,
              fontSize: 15,
              height: 52,
              padding: "0 28px",
              borderRadius: 10,
            }}
          >
            Book Your 15-Minute Assessment →
          </a>
        </div>
      </div>
    </section>
  );
}
