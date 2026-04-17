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
    <section id="reviews" className="bg-background px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-center text-primary text-xs font-medium uppercase" style={{ letterSpacing: "0.25em" }}>
            HOMEOWNER STORIES
          </p>
          <h2 className="text-center text-3xl md:text-5xl text-foreground mt-3" style={{ fontWeight: 700 }}>
            Trusted Across Dubai
          </h2>

          <a href="#" className="mx-auto flex items-center justify-center gap-3 my-5 mb-12">
            <GoogleIcon />
            <span className="text-primary text-base">★★★★★</span>
            <span className="text-foreground text-base font-semibold">4.9 out of 5</span>
            <span className="text-muted-foreground text-sm">· 140+ Google reviews</span>
          </a>
        </Reveal>

        <Reveal>
          <div className="hidden md:grid grid-cols-3 gap-6 stagger-children">
            {reviews.map((r) => (
              <ReviewCard key={r.name} {...r} />
            ))}
          </div>
        </Reveal>

        <div
          className="md:hidden flex gap-4 overflow-x-auto no-scrollbar pb-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {reviews.map((r) => (
            <div key={r.name} className="shrink-0 w-[85%]" style={{ scrollSnapAlign: "start" }}>
              <ReviewCard {...r} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ quote, name, detail }: { quote: string; name: string; detail: string }) {
  return (
    <div className="hover-lift h-full bg-card border border-border rounded-sh-lg p-7">
      <div className="text-primary text-base mb-4">★★★★★</div>
      <p className="text-foreground text-base leading-relaxed mb-6" style={{ fontWeight: 300 }}>
        {quote}
      </p>
      <div className="flex items-center gap-3">
        <div className="bg-secondary rounded-full" style={{ width: 40, height: 40 }} />
        <div>
          <p className="text-foreground text-sm font-semibold">{name}</p>
          <p className="text-muted-foreground text-xs">{detail}</p>
        </div>
      </div>
    </div>
  );
}
