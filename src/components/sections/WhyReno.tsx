import { ShieldCheck, CalendarCheck, Eye, Banknote } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const features = [
  {
    Icon: ShieldCheck,
    title: "Vetted Contractors Only",
    body:
      "We accept less than 10% of contractor applicants. Every team is background-checked and performance-rated before they step into your home.",
  },
  {
    Icon: CalendarCheck,
    title: "On-Time, On-Budget Guarantee",
    body:
      "If your project runs late because of our team, you're compensated. We put this in writing before a single nail is hammered.",
  },
  {
    Icon: Eye,
    title: "Full Transparency, 24/7",
    body:
      "Track every milestone, photo, payment, and inspection through the Reno app — from your phone, anywhere in the world.",
  },
  {
    Icon: Banknote,
    title: "Pay As You Go — Not Upfront",
    body:
      "Payments are tied to milestones you approve. Our Renovate Now, Pay Later plan spreads costs across 3, 6, or 12 months.",
  },
];

export function WhyReno() {
  return (
    <section id="why-reno" className="bg-background px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="mx-auto max-w-7xl grid gap-12 lg:gap-20 lg:grid-cols-[45%_55%] items-start">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 order-1 lg:order-2">
          {features.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="h-full bg-card border border-border rounded-sh-lg p-6 transition-all hover:border-primary hover:shadow-sh-elevated hover:-translate-y-0.5">
                <Icon size={28} className="text-primary mb-4" />
                <h3 className="text-foreground text-base font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
