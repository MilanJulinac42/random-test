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
            Book a free 15-minute project assessment. No commitment, no hard sell —
            just clarity on what your renovation could look like and what it will cost.
          </p>
          <a
            href="#quiz"
            className="inline-flex items-center justify-center rounded-sh px-8 font-semibold text-sm transition-colors"
            style={{ height: 52, backgroundColor: "#C2A97A", color: "#0D0D0D" }}
          >
            Book My Assessment →
          </a>
          <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.5)" }}>
            We take a limited number of new projects each month.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
