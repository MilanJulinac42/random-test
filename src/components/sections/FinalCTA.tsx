import { Reveal } from "@/components/Reveal";

export function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-14 md:py-20 px-6 md:px-12 lg:px-16 grain-overlay"
      style={{ backgroundColor: "#0D0D0D" }}
    >
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal>
          <h2
            className="text-3xl md:text-5xl"
            style={{ fontWeight: 800, lineHeight: 1.15, color: "#FFFFFF" }}
          >
            Ready to See What's Possible?
          </h2>
          <p
            className="mx-auto text-base md:text-lg leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.7)",
              maxWidth: 480,
              margin: "16px auto 36px",
            }}
          >
            Book a free 15-minute call with the Reno team. We'll tell you honestly whether your project is a fit, and what it would take to make it happen.
          </p>
          <a
            href="#quiz"
            className="reno-btn-purple inline-flex items-center justify-center rounded-sh px-8 font-semibold text-sm"
            style={{ height: 52 }}
          >
            Book my free assessment →
          </a>
          <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.5)" }}>
            We take a limited number of new projects each month.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
