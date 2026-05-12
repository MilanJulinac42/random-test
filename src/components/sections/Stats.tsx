import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { Reveal } from "@/components/Reveal";

function LeftStat({
  target,
  suffix,
  label,
  start,
}: {
  target: number;
  suffix: string;
  label: string;
  start: boolean;
}) {
  const value = useCountUp(target, 1200, start);
  return (
    <div className="py-6 md:py-8">
      <div
        style={{
          fontSize: "clamp(72px, 9vw, 112px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "#FFFFFF",
        }}
      >
        <span>{value}</span>
        <span>{suffix}</span>
      </div>
      <div
        className="mt-4"
        style={{
          fontSize: 20,
          color: "rgba(255,255,255,0.7)",
          letterSpacing: "0.01em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function CardStat({ start }: { start: boolean }) {
  const value = useCountUp(200, 1400, start);
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        borderRadius: 24,
        aspectRatio: "4 / 3",
        background:
          "linear-gradient(115deg, #000000 0%, #000069 40%, #8138FF 82%, #6D60DD 100%)",
        boxShadow: "0 30px 80px -30px rgba(0,0,105,0.55)",
      }}
    >
      {/* Soft purple bloom from bottom-left for depth */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 60% at 5% 95%, rgba(129,56,255,0.55) 0%, rgba(129,56,255,0) 65%)",
          mixBlendMode: "screen",
        }}
      />

      <div className="relative z-10 h-full w-full flex flex-col justify-between p-8 md:p-12">
        <div
          style={{
            fontSize: "clamp(80px, 10vw, 140px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "#FFFFFF",
          }}
        >
          <span>{value}</span>
          <span>+</span>
        </div>
        <div
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.01em",
          }}
        >
          Projects delivered across the network
        </div>
      </div>
    </div>
  );
}

export function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section
      data-nav-theme="dark"
      className="relative overflow-hidden px-6 md:px-12 lg:px-16 py-20 md:py-28"
      style={{
        backgroundColor: "#0D0D0D",
        borderTop: "1px solid #1E1E1E",
        borderBottom: "1px solid #1E1E1E",
      }}
    >
      <div className="glow-aura-center" aria-hidden style={{ opacity: 0.5 }} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <p
            className="uppercase text-xs font-medium mb-12 md:mb-16"
            style={{ letterSpacing: "0.25em", color: "#482FFF" }}
          >
            Trusted by Dubai Homeowners
          </p>
        </Reveal>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-16 items-center"
        >
          {/* Left: two stacked stats */}
          <div className="flex flex-col divide-y divide-white/10">
            <LeftStat target={98} suffix="%" label="On-time delivery" start={inView} />
            <LeftStat target={100} suffix="+" label="Vetted contractors" start={inView} />
          </div>

          {/* Right: gradient card */}
          <CardStat start={inView} />
        </div>
      </div>
    </section>
  );
}
