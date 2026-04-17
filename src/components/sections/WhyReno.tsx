import { useState } from "react";
import { ShieldCheck, CalendarCheck, Eye, Banknote, ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const features = [
  {
    Icon: ShieldCheck,
    title: "Vetted Contractors Only",
    teaser: "Less than 10% of applicants make it through.",
    body:
      "Every team is background-checked, insurance-verified, and performance-rated before they step into your home.",
    bullets: [
      "Identity & background checks on every site lead",
      "Live homeowner rating system after each milestone",
      "Quarterly performance reviews — underperformers are removed",
    ],
  },
  {
    Icon: CalendarCheck,
    title: "On-Time, On-Budget Guarantee",
    teaser: "If we run late, you're compensated.",
    body:
      "We put your timeline and budget in writing before a single nail is hammered — and we stand behind it.",
    bullets: [
      "Written timeline signed before kickoff",
      "Daily compensation for delays caused by our team",
      "Milestone-tracked schedule, visible 24/7",
    ],
  },
  {
    Icon: Eye,
    title: "Full Transparency, 24/7",
    teaser: "Track every milestone from your phone.",
    body:
      "Photos, payments, inspections, and approvals — all in one app, available wherever you are in the world.",
    bullets: [
      "Live photo feed updated at every site visit",
      "Approve milestones before payments release",
      "Full payment ledger — no hidden line items",
    ],
  },
  {
    Icon: Banknote,
    title: "Pay As You Go — Not Upfront",
    teaser: "Money moves only when you approve.",
    body:
      "Payments are tied to milestones you sign off. Renovate Now, Pay Later spreads costs across 3, 6, or 12 months.",
    bullets: [
      "0% interest plans on qualifying projects",
      "No upfront deposit required",
      "Every release gated by your in-app approval",
    ],
  },
];

export function WhyReno() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="why-reno" className="relative overflow-hidden bg-background px-6 md:px-12 lg:px-16 py-16 md:py-24 section-fade-bottom">
      <div className="glow-aura-top" aria-hidden />
      <div className="relative z-10 mx-auto max-w-7xl grid gap-12 lg:gap-20 lg:grid-cols-[45%_55%] items-start">
        <Reveal className="order-2 lg:order-1">
          <p className="text-primary text-xs font-medium uppercase" style={{ letterSpacing: "0.25em" }}>
            WHY RENO
          </p>
          <h2 className="text-3xl md:text-5xl text-foreground mt-3" style={{ fontWeight: 700, lineHeight: 1.15 }}>
            We Built the System
            <br />
            Homeowners Deserve.
          </h2>
          <p className="text-muted-foreground text-base mt-5 max-w-md leading-relaxed">
            The Dubai renovation market is broken — late contractors, hidden costs,
            and zero visibility. Reno fixes that with a platform that keeps everyone
            accountable: your designer, your contractor, and us.
            <br />
            <br />
            Everything is tracked, inspected, and approved by you before money moves.
          </p>

          <div className="flex items-center gap-4 mt-8">
            <div className="bg-secondary rounded-full" style={{ width: 64, height: 64 }} />
            <div>
              <p className="text-foreground text-base font-semibold">Mohammed Al Rashed</p>
              <p className="text-muted-foreground text-sm">Head of Client Projects, Reno</p>
            </div>
          </div>

          <a
            href="#"
            className="inline-flex mt-6 border border-primary text-primary rounded-sh px-5 py-2.5 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Meet the Team →
          </a>
        </Reveal>

        <Reveal className="order-1 lg:order-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger-children">
            {features.map(({ Icon, title, teaser, body, bullets }, i) => {
              const expanded = openIdx === i;
              return (
                <button
                  key={title}
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpenIdx(expanded ? null : i)}
                  className="feature-card h-full bg-card border border-border rounded-sh-lg p-6"
                >
                  <div className="relative z-10">
                    <Icon size={28} className="feature-card-icon text-primary mb-4" />
                    <h3 className="text-foreground text-base font-semibold mb-1.5">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{teaser}</p>

                    <div className="feature-card-expand">
                      <div>
                        <p className="text-muted-foreground text-sm leading-relaxed pt-1">{body}</p>
                        <ul className="mt-3 space-y-1.5">
                          {bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2 text-foreground text-sm leading-relaxed">
                              <Check size={14} className="text-primary mt-1 shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <span className="feature-card-more">
                      Learn more <ArrowRight size={14} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
