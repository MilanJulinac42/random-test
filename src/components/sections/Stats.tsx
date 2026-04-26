import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { Reveal } from "@/components/Reveal";

const stats = [
  { target: 200, suffix: "+", label: "Projects Delivered" },
  { target: 100, suffix: "%", label: "On-Time Guarantee" },
  { target: 50, suffix: "+", label: "Vetted Contractors" },
];

function StatItem({ target, suffix, label, start }: { target: number; suffix: string; label: string; start: boolean }) {
  const value = useCountUp(target, 1800, start);
  return (
    <div className="flex flex-col items-center text-center px-4 py-6">
      <span
        className="text-primary"
        style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}
      >
        {value}
        {suffix}
      </span>
      <span
        className="text-muted-foreground uppercase mt-3 text-xs md:text-sm"
        style={{ letterSpacing: "0.2em", fontWeight: 500 }}
      >
        {label}
      </span>
    </div>
  );
}

export function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section
      data-nav-theme="dark"
      className="relative overflow-hidden px-6 md:px-12 lg:px-16 py-16 md:py-20"
      style={{ backgroundColor: "#0D0D0D", borderTop: "1px solid #1E1E1E", borderBottom: "1px solid #1E1E1E" }}
    >
      <div className="glow-aura-center" aria-hidden style={{ opacity: 0.5 }} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <p
            className="text-center uppercase text-xs font-medium mb-10"
            style={{ letterSpacing: "0.25em", color: "#C2A97A" }}
          >
            Trusted by Dubai Homeowners
          </p>
        </Reveal>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-y-0 divide-y"
          style={{ ["--tw-divide-opacity" as string]: 1 }}
        >
          {stats.map((s) => (
            <StatItem key={s.label} {...s} start={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
