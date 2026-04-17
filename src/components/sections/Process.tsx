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
    <section id="how-it-works" className="bg-card px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-center text-primary text-xs font-medium uppercase" style={{ letterSpacing: "0.25em" }}>
            HOW IT WORKS
          </p>
          <h2 className="text-center text-3xl md:text-5xl text-foreground mt-3" style={{ fontWeight: 700 }}>
            From First Call to Final Handover
          </h2>
          <p className="text-center text-muted-foreground text-base mx-auto mt-3 mb-16" style={{ maxWidth: 480 }}>
            A structured process that removes every guessing game.
          </p>
        </Reveal>

        <div className="relative">
          <div
            className="hidden lg:block absolute left-0 right-0 border-t border-dashed border-border"
            style={{ top: 90, marginLeft: "16%", marginRight: "16%" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-0 relative">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div className="relative text-center px-6 lg:px-10">
                  <span className="bg-secondary text-primary rounded-full inline-block relative z-10 px-3 py-1 text-xs font-medium">
                    {s.badge}
                  </span>
                  <div className="relative mt-4">
                    <span
                      aria-hidden
                      className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none text-primary"
                      style={{
                        top: -30,
                        fontWeight: 800,
                        fontSize: 96,
                        opacity: 0.08,
                        lineHeight: 1,
                      }}
                    >
                      {s.num}
                    </span>
                    <s.Icon size={32} className="text-primary mx-auto block relative z-10 my-4" />
                    <h3 className="text-foreground text-xl font-semibold mb-3">{s.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="text-center mt-14">
          <a
            href="#quiz"
            className="reno-cta inline-flex items-center justify-center bg-primary text-primary-foreground rounded-sh px-7 font-semibold text-sm"
            style={{ height: 52 }}
          >
            Book Your 15-Minute Assessment →
          </a>
        </div>
      </div>
    </section>
  );
}
