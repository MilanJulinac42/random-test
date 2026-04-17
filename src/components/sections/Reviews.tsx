import { Reveal } from "@/components/Reveal";

const reviews = [
  {
    quote:
      "We were nervous about handing over our villa to anyone. Reno completely changed that. Every payment was tied to a milestone we approved ourselves. No surprises, no chasing — exactly what we were promised.",
    name: "Fatima A.",
    detail: "Villa owner · Arabian Ranches",
  },
  {
    quote:
      "We were travelling for six weeks during the renovation. The app meant we could see photos, approve decisions, and track costs from our phones. We felt completely in control the entire time.",
    name: "Khalid & Sara M.",
    detail: "Apartment · Downtown Dubai",
  },
  {
    quote:
      "They finished two weeks early. I've never had a contractor deliver on time, let alone early. Reno is genuinely different — they delivered exactly what they promised.",
    name: "James R.",
    detail: "Townhouse · JVC",
  },
];

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.6 6.1 29 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.7 1.1 7.8 3l5.7-5.7C33.6 6.1 29 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5 0 9.6-1.9 13-5l-6-5c-2 1.4-4.4 2.2-7 2.2-5.2 0-9.6-3.4-11.2-8l-6.6 5.1C9.6 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6 5C40.9 35.7 44 30.4 44 24c0-1.3-.1-2.3-.4-3.5z"/>
    </svg>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden bg-background px-6 md:px-12 lg:px-16 py-16 md:py-28 section-fade-bottom">
      <div className="glow-aura-top left-aligned" aria-hidden />
      <div className="relative z-10 mx-auto max-w-7xl grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left — sticky heading */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="text-primary text-xs font-medium uppercase" style={{ letterSpacing: "0.25em" }}>
                Homeowner Stories
              </p>
              <h2
                className="text-foreground mt-4 text-4xl md:text-5xl lg:text-6xl"
                style={{ fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                Trusted Across Dubai
              </h2>
              <p className="text-muted-foreground text-base md:text-lg mt-6 max-w-md leading-relaxed">
                Real homeowners. Real renovations. Hear how Reno turned anxious projects into delivered homes — on time, on budget, and fully managed.
              </p>

              <div className="flex items-center gap-3 mt-8">
                <GoogleIcon />
                <span className="text-primary text-base">★★★★★</span>
                <span className="text-foreground text-base font-semibold">4.9</span>
                <span className="text-muted-foreground text-sm">· 140+ Google reviews</span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right — testimonial stack */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="flex flex-col gap-6 stagger-children">
              {reviews.map((r) => (
                <ReviewCard key={r.name} {...r} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ quote, name, detail }: { quote: string; name: string; detail: string }) {
  const initial = name.trim().charAt(0).toUpperCase();
  return (
    <div className="hover-lift bg-card border border-border rounded-sh-lg p-7 md:p-8">
      <div className="text-primary text-base mb-4">★★★★★</div>
      <p className="text-foreground text-base md:text-lg leading-relaxed mb-6" style={{ fontWeight: 300 }}>
        "{quote}"
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <div
          className="bg-primary text-primary-foreground rounded-full flex items-center justify-center"
          style={{ width: 44, height: 44, fontWeight: 600, fontSize: 16 }}
        >
          {initial}
        </div>
        <div>
          <p className="text-foreground text-sm font-semibold">{name}</p>
          <p className="text-muted-foreground text-xs">{detail}</p>
        </div>
      </div>
    </div>
  );
}
