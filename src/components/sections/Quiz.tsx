import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { WHATSAPP_POSTLEAD } from "@/lib/constants";

const ROOMS = [
  { icon: "🍳", label: "Kitchen" },
  { icon: "🛁", label: "Bathroom(s)" },
  { icon: "🛏", label: "Bedroom(s)" },
  { icon: "🏠", label: "Full Home / Villa" },
];

const BUDGETS = [
  { range: "AED 275,000 – 500,000", desc: "Mid-scale transformation" },
  { range: "AED 500,000 – 900,000", desc: "Premium full-home renovation" },
  { range: "AED 900,000+", desc: "High-end custom project" },
];

const TIMELINES = ["Within 1 month", "1–3 months", "3–6 months", "Just exploring"];

const fieldClass =
  "h-13 bg-background border border-border rounded-sh px-4 text-base text-foreground w-full outline-none focus:border-primary transition-colors";

export function Quiz() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [rooms, setRooms] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [timeline, setTimeline] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleRoom = (label: string) =>
    setRooms((prev) => (prev.includes(label) ? prev.filter((r) => r !== label) : [...prev, label]));

  const handleSubmit = async () => {
    setError(null);
    if (!name.trim() || !phone.trim() || !area.trim()) {
      setError("Please fill in name, phone, and area.");
      return;
    }
    setSubmitting(true);
    try {
      const { error: e } = await supabase.from("lead_submissions").insert({
        name: name.trim(),
        phone: phone.trim(),
        area: area.trim(),
        timeline: timeline || null,
        rooms,
        budget,
      });
      if (e) console.error("Lead submit error:", e);
    } catch (e) {
      console.error("Lead submit exception:", e);
    } finally {
      setSubmitting(false);
      setStep(4);
    }
  };

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <section id="quiz" className="bg-card px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-center text-primary text-xs font-medium uppercase" style={{ letterSpacing: "0.25em" }}>
            GET STARTED
          </p>
          <h2 className="text-center text-3xl md:text-5xl text-foreground mt-3" style={{ fontWeight: 700 }}>
            Is Reno Right for Your Project?
          </h2>
          <p className="text-center text-muted-foreground text-base mx-auto mt-3 mb-10" style={{ maxWidth: 460 }}>
            3 quick questions. We'll confirm availability and reach out within 24 hours.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto bg-background border border-border rounded-2xl p-6 md:p-8" style={{ maxWidth: 560 }}>
            {step !== 4 && (
              <div className="mb-7">
                <div className="bg-secondary rounded-full" style={{ height: 3, width: "100%" }}>
                  <div
                    className="bg-primary h-full rounded-full transition-all"
                    style={{ width: `${progress}%`, transition: "width 0.4s ease" }}
                  />
                </div>
                <p className="text-muted-foreground text-xs mt-2">Step {step} of 3</p>
              </div>
            )}

            {step === 1 && (
              <div className="reno-step-in" key="s1">
                <p className="text-foreground text-lg font-semibold mb-2">Which areas are you renovating?</p>
                <p className="text-muted-foreground text-sm mb-5">Select all that apply.</p>
                <div className="grid grid-cols-2 gap-3">
                  {ROOMS.map((r) => {
                    const active = rooms.includes(r.label);
                    return (
                      <button
                        type="button"
                        key={r.label}
                        onClick={() => toggleRoom(r.label)}
                        className={`text-left relative bg-card rounded-sh-lg p-5 transition-colors ${active ? "border-2 border-primary" : "border border-border"}`}
                      >
                        <div style={{ fontSize: 22 }}>{r.icon}</div>
                        <div className="text-foreground text-base font-semibold mt-2">{r.label}</div>
                        {active && (
                          <span className="absolute top-2.5 right-2.5 flex items-center justify-center bg-primary text-primary-foreground rounded-full text-[10px] font-bold" style={{ width: 16, height: 16 }}>
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  disabled={rooms.length === 0}
                  onClick={() => setStep(2)}
                  className="reno-cta w-full bg-primary text-primary-foreground rounded-sh font-semibold text-sm mt-6 disabled:opacity-40 disabled:pointer-events-none"
                  style={{ height: 52 }}
                >
                  Next →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="reno-step-in" key="s2">
                <p className="text-foreground text-lg font-semibold mb-5">What is your renovation budget?</p>
                <div className="flex flex-col gap-3">
                  {BUDGETS.map((b) => {
                    const active = budget === b.range;
                    return (
                      <button
                        type="button"
                        key={b.range}
                        onClick={() => setBudget(b.range)}
                        className={`relative flex items-center justify-between text-left bg-card rounded-sh-lg p-5 transition-colors ${active ? "border-2 border-primary" : "border border-border"}`}
                      >
                        <span className="text-foreground text-base font-bold">{b.range}</span>
                        <span className="text-muted-foreground text-sm hidden sm:inline">{b.desc}</span>
                        {active && (
                          <span className="absolute top-2.5 right-2.5 flex items-center justify-center bg-primary text-primary-foreground rounded-full text-[10px] font-bold" style={{ width: 16, height: 16 }}>
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-muted-foreground text-xs mt-3">Reno specialises in projects above AED 275,000.</p>
                <div className="flex items-center justify-between mt-6">
                  <button type="button" onClick={() => setStep(1)} className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                    ← Back
                  </button>
                  <button
                    type="button"
                    disabled={!budget}
                    onClick={() => setStep(3)}
                    className="reno-cta bg-primary text-primary-foreground rounded-sh font-semibold text-sm px-7 disabled:opacity-40 disabled:pointer-events-none"
                    style={{ height: 52 }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="reno-step-in" key="s3">
                <p className="text-foreground text-lg font-semibold mb-5">Where should we reach you?</p>
                <div className="flex flex-col gap-4">
                  <input className={fieldClass} style={{ height: 52 }} placeholder="Your name" value={name} maxLength={200} onChange={(e) => setName(e.target.value)} />
                  <div>
                    <input className={fieldClass} style={{ height: 52 }} type="tel" placeholder="+971 XX XXX XXXX" value={phone} maxLength={50} onChange={(e) => setPhone(e.target.value)} />
                    <p className="text-muted-foreground text-xs mt-1.5">We'll send your confirmation via WhatsApp</p>
                  </div>
                  <input className={fieldClass} style={{ height: 52 }} placeholder="e.g. Arabian Ranches, JVC, Palm Jumeirah" value={area} maxLength={200} onChange={(e) => setArea(e.target.value)} />
                  <select className={fieldClass} style={{ height: 52, appearance: "none" }} value={timeline} onChange={(e) => setTimeline(e.target.value)}>
                    <option value="">When are you looking to start?</option>
                    {TIMELINES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                {error && <p className="text-destructive text-sm mt-3">{error}</p>}
                <div className="flex justify-end mt-4">
                  <button type="button" onClick={() => setStep(2)} className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                    ← Back
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="reno-cta w-full bg-primary text-primary-foreground rounded-sh font-semibold text-sm mt-2 disabled:opacity-60"
                  style={{ height: 52 }}
                >
                  {submitting ? "Submitting..." : "Book My Project Assessment"}
                </button>
                <p className="text-muted-foreground text-xs text-center mt-3">
                  No spam. A Reno consultant will contact you within 24 hours.
                </p>
              </div>
            )}

            {step === 4 && (
              <div className="reno-step-in text-center" key="s4">
                <svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto" aria-hidden>
                  <circle
                    cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--primary))" strokeWidth="3"
                    strokeDasharray="176" strokeDashoffset="176"
                    style={{ animation: "reno-draw 0.5s ease forwards" }}
                  />
                  <path
                    d="M20 33 L29 42 L45 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="3"
                    strokeLinecap="round" strokeLinejoin="round"
                    strokeDasharray="40" strokeDashoffset="40"
                    style={{ animation: "reno-draw 0.4s ease 0.5s forwards" }}
                  />
                </svg>
                <h3 className="text-foreground text-3xl mt-6" style={{ fontWeight: 700 }}>You're confirmed.</h3>
                <p className="text-muted-foreground text-base mx-auto mt-3 mb-8 leading-relaxed" style={{ maxWidth: 360 }}>
                  We've received your details and will confirm availability within 24 hours.
                  Keep an eye on your WhatsApp for a message from our team.
                </p>
                <a
                  href={WHATSAPP_POSTLEAD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reno-cta inline-flex w-full items-center justify-center bg-primary text-primary-foreground rounded-sh font-semibold text-sm"
                  style={{ height: 52 }}
                >
                  WhatsApp Us Now
                </a>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="block mx-auto mt-4 text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  ↑ Back to top
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
