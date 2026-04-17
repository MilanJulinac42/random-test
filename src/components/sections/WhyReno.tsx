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
    <section id="why-reno" style={{ background: "#0A0A0A" }} className="px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="mx-auto max-w-7xl grid gap-12 lg:gap-20 lg:grid-cols-[45%_55%] items-start">
        {/* Right column shows first on mobile */}
        <Reveal className="order-2 lg:order-1">
          <p
            style={{
              fontWeight: 500,
              fontSize: 12,
              color: "#C9A96E",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            WHY RENO
          </p>
          <h2
            className="text-[26px] md:text-[40px]"
            style={{ fontWeight: 700, color: "#F5F0EB", lineHeight: 1.15, marginTop: 12 }}
          >
            We Built the System
            <br />
            Homeowners Deserve.
          </h2>
          <p
            style={{
              fontWeight: 400,
              fontSize: 16,
              color: "#8C8C82",
              lineHeight: 1.7,
              maxWidth: 400,
              marginTop: 20,
            }}
          >
            The Dubai renovation market is broken — late contractors, hidden costs,
            and zero visibility. Reno fixes that with a platform that keeps everyone
            accountable: your designer, your contractor, and us.
            <br />
            <br />
            Everything is tracked, inspected, and approved by you before money moves.
          </p>

          <div className="flex items-center" style={{ marginTop: 32, gap: 14 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#1F1F1F",
              }}
            />
            <div>
              <p style={{ fontWeight: 600, fontSize: 15, color: "#F5F0EB" }}>
                Mohammed Al Rashed
              </p>
              <p style={{ fontWeight: 400, fontSize: 13, color: "#8C8C82" }}>
                Head of Client Projects, Reno
              </p>
            </div>
          </div>

          <a
            href="#"
            className="inline-flex transition-colors hover:bg-[#C9A96E] hover:text-[#0A0A0A]"
            style={{
              marginTop: 24,
              border: "1px solid #C9A96E",
              color: "#C9A96E",
              fontWeight: 500,
              fontSize: 14,
              padding: "10px 20px",
              borderRadius: 8,
              background: "transparent",
            }}
          >
            Meet the Team →
          </a>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 order-1 lg:order-2">
          {features.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div
                className="h-full transition-all"
                style={{
                  background: "#141414",
                  border: "1px solid #1F1F1F",
                  borderRadius: 16,
                  padding: 24,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,169,110,0.35)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#1F1F1F";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <Icon size={28} color="#C9A96E" style={{ marginBottom: 16 }} />
                <h3 style={{ fontWeight: 600, fontSize: 16, color: "#F5F0EB", marginBottom: 8 }}>
                  {title}
                </h3>
                <p style={{ fontWeight: 400, fontSize: 14, color: "#8C8C82", lineHeight: 1.6 }}>
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
