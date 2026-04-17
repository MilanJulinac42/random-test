import { Reveal } from "@/components/Reveal";

export function FinalCTA() {
  return (
    <section style={{ background: "#C9A96E", padding: "56px 0" }} className="md:!py-20 px-6 md:px-12 lg:px-16">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2
            className="text-[30px] md:text-[44px]"
            style={{ fontWeight: 800, color: "#0A0A0A", lineHeight: 1.15 }}
          >
            Ready to See What's Possible?
          </h2>
          <p
            className="mx-auto"
            style={{
              fontWeight: 400,
              fontSize: 17,
              color: "rgba(10,10,10,0.65)",
              maxWidth: 480,
              margin: "16px auto 36px",
              lineHeight: 1.65,
            }}
          >
            Book a free 15-minute project assessment. No commitment, no hard sell —
            just clarity on what your renovation could look like and what it will cost.
          </p>
          <a
            href="#quiz"
            className="inline-flex items-center justify-center transition-colors"
            style={{
              background: "#0A0A0A",
              color: "#C9A96E",
              fontWeight: 600,
              fontSize: 15,
              height: 52,
              padding: "0 32px",
              borderRadius: 10,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#1A1A1A")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#0A0A0A")}
          >
            Book My Assessment →
          </a>
          <p
            style={{
              fontWeight: 400,
              fontSize: 13,
              color: "rgba(10,10,10,0.5)",
              marginTop: 16,
            }}
          >
            We take a limited number of new projects each month.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
