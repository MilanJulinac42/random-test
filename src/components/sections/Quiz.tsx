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

const fieldStyle: React.CSSProperties = {
  height: 52,
  background: "#0A0A0A",
  border: "1px solid #1F1F1F",
  borderRadius: 10,
  padding: "0 16px",
  fontSize: 15,
  color: "#F5F0EB",
  width: "100%",
  outline: "none",
};

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
      if (e) {
        console.error("Lead submit error:", e);
      }
    } catch (e) {
      console.error("Lead submit exception:", e);
    } finally {
      setSubmitting(false);
      setStep(4);
    }
  };

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <section id="quiz" style={{ background: "#141414" }} className="px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p
            className="text-center"
            style={{ fontWeight: 500, fontSize: 12, color: "#C9A96E", letterSpacing: "3px", textTransform: "uppercase" }}
          >
            GET STARTED
          </p>
          <h2
            className="text-center text-[28px] md:text-[42px]"
            style={{ fontWeight: 700, color: "#F5F0EB", marginTop: 12 }}
          >
            Is Reno Right for Your Project?
          </h2>
          <p
            className="text-center mx-auto"
            style={{ fontWeight: 400, fontSize: 16, color: "#8C8C82", maxWidth: 460, margin: "12px auto 40px" }}
          >
            3 quick questions. We'll confirm availability and reach out within 24 hours.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="mx-auto"
            style={{
              maxWidth: 560,
              background: "#0A0A0A",
              border: "1px solid #1F1F1F",
              borderRadius: 20,
              padding: 24,
            }}
          >
            <div className="md:p-4">
              {step !== 4 && (
                <div style={{ marginBottom: 28 }}>
                  <div style={{ background: "#1F1F1F", height: 3, borderRadius: 100, width: "100%" }}>
                    <div
                      style={{
                        background: "#C9A96E",
                        height: "100%",
                        width: `${progress}%`,
                        borderRadius: 100,
                        transition: "width 0.4s ease",
                      }}
                    />
                  </div>
                  <p style={{ fontSize: 12, color: "#8C8C82", marginTop: 8 }}>Step {step} of 3</p>
                </div>
              )}

              {step === 1 && (
                <div className="reno-step-in" key="s1">
                  <p style={{ fontWeight: 600, fontSize: 18, color: "#F5F0EB", marginBottom: 8 }}>
                    Which areas are you renovating?
                  </p>
                  <p style={{ fontWeight: 400, fontSize: 13, color: "#8C8C82", marginBottom: 20 }}>
                    Select all that apply.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {ROOMS.map((r) => {
                      const active = rooms.includes(r.label);
                      return (
                        <button
                          type="button"
                          key={r.label}
                          onClick={() => toggleRoom(r.label)}
                          className="text-left relative"
                          style={{
                            background: "#141414",
                            border: active ? "1.5px solid #C9A96E" : "1px solid #1F1F1F",
                            borderRadius: 12,
                            padding: 20,
                            transition: "border-color 0.2s",
                          }}
                        >
                          <div style={{ fontSize: 22 }}>{r.icon}</div>
                          <div style={{ fontWeight: 600, fontSize: 15, color: "#F5F0EB", marginTop: 8 }}>
                            {r.label}
                          </div>
                          {active && (
                            <span
                              className="absolute flex items-center justify-center"
                              style={{
                                top: 10,
                                right: 10,
                                width: 16,
                                height: 16,
                                borderRadius: "50%",
                                background: "#C9A96E",
                                color: "#0A0A0A",
                                fontSize: 10,
                                fontWeight: 700,
                              }}
                            >
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
                    style={{
                      width: "100%",
                      height: 52,
                      borderRadius: 10,
                      marginTop: 24,
                      background: "#C9A96E",
                      color: "#0A0A0A",
                      fontWeight: 600,
                      fontSize: 15,
                      opacity: rooms.length === 0 ? 0.4 : 1,
                      pointerEvents: rooms.length === 0 ? "none" : "auto",
                    }}
                  >
                    Next →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="reno-step-in" key="s2">
                  <p style={{ fontWeight: 600, fontSize: 18, color: "#F5F0EB", marginBottom: 20 }}>
                    What is your renovation budget?
                  </p>
                  <div className="flex flex-col gap-3">
                    {BUDGETS.map((b) => {
                      const active = budget === b.range;
                      return (
                        <button
                          type="button"
                          key={b.range}
                          onClick={() => setBudget(b.range)}
                          className="relative flex items-center justify-between text-left"
                          style={{
                            background: "#141414",
                            border: active ? "1.5px solid #C9A96E" : "1px solid #1F1F1F",
                            borderRadius: 12,
                            padding: 20,
                            transition: "border-color 0.2s",
                          }}
                        >
                          <span style={{ fontWeight: 700, fontSize: 17, color: "#F5F0EB" }}>{b.range}</span>
                          <span style={{ fontWeight: 400, fontSize: 13, color: "#8C8C82" }} className="hidden sm:inline">
                            {b.desc}
                          </span>
                          {active && (
                            <span
                              className="absolute flex items-center justify-center"
                              style={{
                                top: 10,
                                right: 10,
                                width: 16,
                                height: 16,
                                borderRadius: "50%",
                                background: "#C9A96E",
                                color: "#0A0A0A",
                                fontSize: 10,
                                fontWeight: 700,
                              }}
                            >
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <p style={{ fontWeight: 300, fontSize: 13, color: "#8C8C82", marginTop: 12 }}>
                    Reno specialises in projects above AED 275,000.
                  </p>
                  <div className="flex items-center justify-between" style={{ marginTop: 24 }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      style={{ fontSize: 14, color: "#8C8C82", fontWeight: 400 }}
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      disabled={!budget}
                      onClick={() => setStep(3)}
                      style={{
                        height: 52,
                        padding: "0 28px",
                        borderRadius: 10,
                        background: "#C9A96E",
                        color: "#0A0A0A",
                        fontWeight: 600,
                        fontSize: 15,
                        opacity: budget ? 1 : 0.4,
                        pointerEvents: budget ? "auto" : "none",
                      }}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="reno-step-in" key="s3">
                  <p style={{ fontWeight: 600, fontSize: 18, color: "#F5F0EB", marginBottom: 20 }}>
                    Where should we reach you?
                  </p>
                  <div className="flex flex-col gap-4">
                    <input
                      style={fieldStyle}
                      placeholder="Your name"
                      value={name}
                      maxLength={200}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div>
                      <input
                        style={fieldStyle}
                        type="tel"
                        placeholder="+971 XX XXX XXXX"
                        value={phone}
                        maxLength={50}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <p style={{ fontWeight: 300, fontSize: 12, color: "#8C8C82", marginTop: 6 }}>
                        We'll send your confirmation via WhatsApp
                      </p>
                    </div>
                    <input
                      style={fieldStyle}
                      placeholder="e.g. Arabian Ranches, JVC, Palm Jumeirah"
                      value={area}
                      maxLength={200}
                      onChange={(e) => setArea(e.target.value)}
                    />
                    <select
                      style={{ ...fieldStyle, appearance: "none" }}
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                    >
                      <option value="">When are you looking to start?</option>
                      {TIMELINES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  {error && (
                    <p style={{ color: "#ff6b6b", fontSize: 13, marginTop: 12 }}>{error}</p>
                  )}
                  <div className="flex justify-end" style={{ marginTop: 16 }}>
                    <button type="button" onClick={() => setStep(2)} style={{ fontSize: 14, color: "#8C8C82" }}>
                      ← Back
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="reno-cta-gold"
                    style={{
                      width: "100%",
                      height: 52,
                      borderRadius: 10,
                      marginTop: 8,
                      background: "#C9A96E",
                      color: "#0A0A0A",
                      fontWeight: 600,
                      fontSize: 15,
                      opacity: submitting ? 0.6 : 1,
                    }}
                  >
                    {submitting ? "Submitting..." : "Book My Project Assessment"}
                  </button>
                  <p style={{ fontWeight: 300, fontSize: 12, color: "#8C8C82", textAlign: "center", marginTop: 12 }}>
                    No spam. A Reno consultant will contact you within 24 hours.
                  </p>
                </div>
              )}

              {step === 4 && (
                <div className="reno-step-in text-center" key="s4">
                  <svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto" aria-hidden>
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="#C9A96E"
                      strokeWidth="3"
                      strokeDasharray="176"
                      strokeDashoffset="176"
                      style={{ animation: "reno-draw 0.5s ease forwards" }}
                    />
                    <path
                      d="M20 33 L29 42 L45 24"
                      fill="none"
                      stroke="#C9A96E"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="40"
                      strokeDashoffset="40"
                      style={{ animation: "reno-draw 0.4s ease 0.5s forwards" }}
                    />
                  </svg>
                  <h3 style={{ fontWeight: 700, fontSize: 28, color: "#F5F0EB", marginTop: 24 }}>
                    You're confirmed.
                  </h3>
                  <p
                    style={{
                      fontWeight: 400,
                      fontSize: 15,
                      color: "#8C8C82",
                      maxWidth: 360,
                      margin: "12px auto 32px",
                      lineHeight: 1.65,
                    }}
                  >
                    We've received your details and will confirm availability within 24 hours.
                    Keep an eye on your WhatsApp for a message from our team.
                  </p>
                  <a
                    href={WHATSAPP_POSTLEAD}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center reno-cta-gold"
                    style={{
                      width: "100%",
                      height: 52,
                      borderRadius: 10,
                      background: "#C9A96E",
                      color: "#0A0A0A",
                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    WhatsApp Us Now
                  </a>
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="block mx-auto"
                    style={{ marginTop: 16, color: "#8C8C82", fontSize: 14, fontWeight: 400 }}
                  >
                    ↑ Back to top
                  </button>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
