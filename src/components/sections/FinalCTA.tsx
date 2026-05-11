import { Reveal } from "@/components/Reveal";

export function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-14 md:py-20 px-6 md:px-12 lg:px-16 grain-overlay"
      style={{ backgroundColor: "#0D0D0D" }}
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Reveal>
          <h2
            style={{ fontWeight: 800, lineHeight: 1.05, color: "#FFFFFF", fontSize: "clamp(40px, 6.4vw, 64px)", letterSpacing: "-0.03em" }}
          >
            Ready to See What's Possible?
          </h2>
          <p
            className="mx-auto leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.78)",
              maxWidth: 560,
              margin: "20px auto 40px",
              fontSize: "clamp(18px, 1.5vw, 20px)",
              lineHeight: 1.6,
            }}
          >
            Book a free 15-minute call with the Reno team. We'll tell you honestly whether your project is a fit, and what it would take to make it happen.
          </p>
          <a
            href="#quiz"
            className="reno-btn-purple inline-flex items-center justify-center rounded-sh font-semibold"
            style={{ height: 68, padding: "0 48px", fontSize: 20 }}
          >
            Book my free assessment →
          </a>
          <p className="mt-5" style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, fontStyle: "italic" }}>
            We take a limited number of new projects each month.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
