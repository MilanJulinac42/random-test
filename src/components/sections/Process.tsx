import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import process01 from "@/assets/process-01.jpg";
import process02 from "@/assets/process-02.jpg";
import process03 from "@/assets/process-03.jpg";

type Step = {
  num: string;
  titleLine1: string;
  titleLine2: string;
  body: string;
  image: string;
};

const steps: Step[] = [
  {
    num: "01",
    titleLine1: "Design and",
    titleLine2: "planning",
    body: "A dedicated Reno designer turns your vision into a full plan — scope, budget, and timeline. You review and sign off before a single contractor is engaged.",
    image: process01,
  },
  {
    num: "02",
    titleLine1: "Build, tracked",
    titleLine2: "at every step",
    body: "Work begins with vetted contractors. At every milestone you get photo updates and a site inspection — and your payment only releases when you're satisfied.",
    image: process02,
  },
  {
    num: "03",
    titleLine1: "Handover &",
    titleLine2: "Warranty",
    body: "You walk through the completed space with the Reno team before anything is signed off. Any snagging items are logged and resolved — all covered by a written warranty.",
    image: process03,
  },
];

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="#0D0D0D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProcessCard({
  step,
  isHovered,
  isCompact,
}: {
  step: Step;
  isHovered: boolean;
  isCompact: boolean;
}) {
  return (
    <div
      className="relative overflow-hidden h-full w-full"
      style={{
        borderRadius: 24,
        backgroundImage: `url(${step.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: `filter 500ms ${EASE}`,
        filter: isCompact ? "brightness(0.7)" : "brightness(1)",
      }}
    >
      {/* Bottom gradient overlay */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "70%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col justify-end"
        style={{ padding: 28 }}
      >
        {/* Arrow button */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 999,
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
            opacity: isHovered ? 0 : 1,
            transform: isHovered ? "translateX(-8px)" : "translateX(0)",
            transition: `opacity 250ms ${EASE}, transform 300ms ${EASE}`,
          }}
        >
          <ArrowIcon />
        </div>

        {/* Title */}
        <h3
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(22px, 2vw, 28px)",
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            transform: isHovered ? "translateY(-8px)" : "translateY(0)",
            transition: `transform 400ms ${EASE}`,
          }}
        >
          {step.titleLine1}
          <br />
          {step.titleLine2}
        </h3>

        {/* Description (only visible when expanded) */}
        <div
          style={{
            maxHeight: isHovered ? 200 : 0,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 350ms ${EASE} ${isHovered ? "120ms" : "0ms"}, transform 400ms ${EASE} ${isHovered ? "120ms" : "0ms"}, max-height 500ms ${EASE}`,
            overflow: "hidden",
          }}
        >
          <p
            style={{
              marginTop: 14,
              color: "rgba(255,255,255,0.85)",
              fontSize: 15,
              lineHeight: 1.55,
              maxWidth: 520,
            }}
          >
            {step.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Process() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const gridCols =
    hoveredIndex === null
      ? "1fr 1fr 1fr"
      : [0, 1, 2]
          .map((i) => (i === hoveredIndex ? "2.4fr" : "0.8fr"))
          .join(" ");

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden w-full"
      style={{
        backgroundColor: "#0D0D0D",
        paddingTop: "clamp(80px, 10vw, 120px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-0 pl-[80px] pr-[80px] pt-[40px] pb-[40px]">
        <Reveal>
          <p
            className="uppercase"
            style={{
              color: "#482FFF",
              fontSize: 14,
              letterSpacing: "0.12em",
              fontWeight: 500,
            }}
          >
            HOW IT WORKS
          </p>
          <h2
            className="text-white mt-5"
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            From first call to keys in hand.
          </h2>
        </Reveal>

        {/* Desktop: animated grid with hover-expand */}
        <div
          className="hidden md:grid"
          style={{
            marginTop: 56,
            gridTemplateColumns: gridCols,
            gap: 16,
            height: "clamp(420px, 48vw, 560px)",
            transition: `grid-template-columns 600ms ${EASE}`,
          }}
        >
          {steps.map((s, i) => (
            <div
              key={s.num}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ minWidth: 0, height: "100%" }}
            >
              <ProcessCard
                step={s}
                isHovered={hoveredIndex === i}
                isCompact={hoveredIndex !== null && hoveredIndex !== i}
              />
            </div>
          ))}
        </div>

        {/* Mobile: stacked cards, description always visible */}
        <div className="md:hidden flex flex-col" style={{ marginTop: 40, gap: 16 }}>
          {steps.map((s) => (
            <div
              key={s.num}
              className="relative overflow-hidden"
              style={{
                borderRadius: 24,
                aspectRatio: "4 / 5",
                backgroundImage: `url(${s.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 pointer-events-none"
                style={{
                  height: "75%",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0) 100%)",
                }}
              />
              <div
                className="absolute inset-0 flex flex-col justify-end"
                style={{ padding: 24 }}
              >
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: 24,
                    fontWeight: 600,
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.titleLine1}
                  <br />
                  {s.titleLine2}
                </h3>
                <p
                  style={{
                    marginTop: 12,
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 15,
                    lineHeight: 1.55,
                  }}
                >
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
