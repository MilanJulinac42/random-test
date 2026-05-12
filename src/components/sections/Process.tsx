import { Reveal } from "@/components/Reveal";
import process01 from "@/assets/process-01.jpg";
import process02 from "@/assets/process-02.jpg";
import process03 from "@/assets/process-03.jpg";

type Step = {
  num: string;
  title: string;
  body: string;
  image: string;
};

const steps: Step[] = [
  {
    num: "01",
    title: "Design & Planning",
    body: "A dedicated Reno designer turns your vision into a full plan — scope, budget, and timeline. You sign off before a single contractor is engaged.",
    image: process01,
  },
  {
    num: "02",
    title: "Build & Track",
    body: "Work begins with vetted contractors. At every milestone you get photo updates and a site inspection — payment only releases when you're satisfied.",
    image: process02,
  },
  {
    num: "03",
    title: "Handover & Warranty",
    body: "You walk through the completed space with the Reno team before sign-off. Snagging items are logged and resolved — all covered by a written warranty.",
    image: process03,
  },
];

export function Process() {
  return (
    <section
      id="how-it-works"
      data-nav-theme="light"
      className="relative overflow-hidden w-full"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="mx-auto max-w-7xl px-6 md:pl-[80px] md:pr-[80px] pt-[64px] md:pt-[96px] pb-[64px] md:pb-[96px]">
        <Reveal>
          <p
            className="uppercase text-center md:text-left"
            style={{
              color: "#482FFF",
              fontSize: 13,
              letterSpacing: "0.12em",
              fontWeight: 500,
            }}
          >
            HOW IT WORKS
          </p>
          <h2
            className="mt-4 md:mt-5 text-center md:text-left"
            style={{
              fontSize: "clamp(30px, 8vw, 64px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#0D0D0D",
            }}
          >
            From first call to keys in hand.
          </h2>
        </Reveal>

        {/* Desktop & mobile grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ marginTop: 48, gap: 32 }}
        >
          {steps.map((s) => (
            <article key={s.num} className="group flex flex-col">
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: 20,
                  aspectRatio: "4 / 5",
                }}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Text */}
              <div style={{ marginTop: 20 }}>
                <div
                  className="flex items-baseline gap-3 whitespace-nowrap overflow-hidden"
                  style={{
                    color: "#0D0D0D",
                  }}
                >
                  <span
                    style={{
                      color: "#482FFF",
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {s.num}
                  </span>
                  <h3
                    style={{
                      fontSize: "clamp(18px, 1.6vw, 22px)",
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.2,
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {s.title}
                  </h3>
                </div>
                <p
                  className="process-desc"
                  style={{
                    marginTop: 10,
                    color: "#4A4A4A",
                    fontSize: 15,
                    lineHeight: 1.55,
                  }}
                >
                  {s.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .process-desc {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            min-height: calc(15px * 1.55 * 3);
          }
        }
      `}</style>
    </section>
  );
}
