import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { ChefHat, Bath, BedDouble, Building2, CircleCheck, Apple, Smartphone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";

const ROOM_TILES = [
  { key: "Kitchen", label: "Kitchen", Icon: ChefHat },
  { key: "Bathroom", label: "Bathroom", Icon: Bath },
  { key: "Bedroom", label: "Bedroom", Icon: BedDouble },
  { key: "Full home / Villa", label: "Full home / Villa", Icon: Building2 },
] as const;

const BUDGETS = [
  { key: "AED 100k – 200k", desc: "Single room" },
  { key: "AED 200k – 500k", desc: "Multi-room" },
  { key: "AED 500k+", desc: "Full home / Villa" },
] as const;

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  phone: z
    .string()
    .trim()
    .regex(/^[+0][\d+\-()\s]{7,}$/, "Please enter a valid phone number"),
});

const FILLED_BTN: React.CSSProperties = {
  background: "#1a1a1a",
  color: "white",
  border: "none",
  borderRadius: 10,
  height: 48,
  fontSize: 15,
  fontWeight: 500,
  cursor: "pointer",
};

const SECONDARY_BTN: React.CSSProperties = {
  background: "transparent",
  color: "#1a1a1a",
  border: "1.5px solid #D3D1C7",
  borderRadius: 10,
  height: 48,
  fontSize: 15,
  fontWeight: 500,
  cursor: "pointer",
};

export function Quiz() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [rooms, setRooms] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ rooms?: string; budget?: string; name?: string; phone?: string }>({});
  const [shake, setShake] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleRoom = (k: string) =>
    setRooms((prev) => (prev.includes(k) ? prev.filter((r) => r !== k) : [...prev, k]));

  const goNextFromStep1 = () => {
    if (rooms.length === 0) {
      setErrors({ rooms: "Please select at least one space." });
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const goNextFromStep2 = () => {
    if (!budget) {
      setErrors({ budget: "Please select a budget range." });
      return;
    }
    setErrors({});
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse({ name, phone });
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as "name" | "phone";
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const { error: dbError } = await supabase.from("lead_submissions").insert({
        name: parsed.data.name,
        phone: parsed.data.phone,
        area: "—",
        rooms,
        budget,
        timeline: null,
      });
      if (dbError) console.error("Lead submit error:", dbError);
    } catch (err) {
      console.error("Lead submit exception:", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section
      id="quiz"
      data-nav-theme="light"
      className="relative overflow-hidden w-full px-6 md:px-12 lg:px-16"
      style={{
        backgroundColor: "#F7F5F2",
        paddingTop: "clamp(64px, 8vw, 100px)",
        paddingBottom: "clamp(64px, 8vw, 100px)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <p
            className="text-center uppercase"
            style={{ fontSize: 10, letterSpacing: "0.1em", color: "#888", fontWeight: 500 }}
          >
            GET STARTED
          </p>
          <h2
            className="text-center mt-3"
            style={{
              fontSize: "clamp(36px, 5.5vw, 52px)",
              fontWeight: 700,
              color: "#0D0D0D",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Tell us about your project.
          </h2>
          <p
            className="text-center mx-auto mt-4"
            style={{ fontSize: 14, color: "#777", maxWidth: 480, lineHeight: 1.55 }}
          >
            Three quick questions — then we call you back within 24 hours to confirm if we can take your project.
          </p>
        </Reveal>

        {!submitted && (
          <Reveal>
            <div
              className="mx-auto mt-10"
              style={{
                maxWidth: 560,
                background: "white",
                borderRadius: 20,
                border: "1px solid rgba(0,0,0,0.08)",
                padding: "40px 40px 36px",
              }}
            >
              {/* Step indicator */}
              <div className="flex items-center justify-center" style={{ gap: 8, marginBottom: 28 }}>
                {[1, 2, 3].map((n) => {
                  const active = n === step;
                  return (
                    <span
                      key={n}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: active ? "#1a1a1a" : "transparent",
                        border: active ? "none" : "1.5px solid #D3D1C7",
                      }}
                    />
                  );
                })}
              </div>

              {step === 1 && (
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 500, color: "#0D0D0D" }}>
                    What are you renovating?
                  </h3>
                  <p style={{ fontSize: 13, color: "#777", marginTop: 6, marginBottom: 20 }}>
                    Select all that apply.
                  </p>

                  <div
                    className={shake ? "reno-shake" : ""}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                    }}
                  >
                    {ROOM_TILES.map((t) => {
                      const active = rooms.includes(t.key);
                      const Icon = t.Icon;
                      return (
                        <button
                          type="button"
                          key={t.key}
                          onClick={() => toggleRoom(t.key)}
                          aria-pressed={active}
                          style={{
                            background: active ? "#FFFFFF" : "#F9F8F6",
                            border: `1.5px solid ${active ? "#1a1a1a" : "transparent"}`,
                            borderRadius: 14,
                            padding: "20px 16px",
                            height: 110,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 10,
                            cursor: "pointer",
                            transition: "background 150ms, border-color 150ms",
                          }}
                        >
                          <Icon size={28} strokeWidth={1.5} color="#444" />
                          <span style={{ fontSize: 13, fontWeight: 500, color: "#0D0D0D", textAlign: "center" }}>
                            {t.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {errors.rooms && (
                    <p style={{ fontSize: 12, color: "#A32D2D", marginTop: 10 }}>{errors.rooms}</p>
                  )}

                  <button
                    type="button"
                    onClick={goNextFromStep1}
                    className="reno-filled-btn"
                    style={{ ...FILLED_BTN, width: "100%", marginTop: 24 }}
                  >
                    Next →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 500, color: "#0D0D0D" }}>
                    What's your rough budget?
                  </h3>
                  <p style={{ fontSize: 13, color: "#777", marginTop: 6, marginBottom: 20 }}>
                    This helps us match you to the right scope and team.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {BUDGETS.map((b) => {
                      const active = budget === b.key;
                      return (
                        <button
                          type="button"
                          key={b.key}
                          onClick={() => setBudget(b.key)}
                          aria-pressed={active}
                          style={{
                            background: active ? "#FFFFFF" : "#F9F8F6",
                            border: `1.5px solid ${active ? "#1a1a1a" : "transparent"}`,
                            borderRadius: 14,
                            padding: "18px 20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            cursor: "pointer",
                            transition: "background 150ms, border-color 150ms",
                          }}
                        >
                          <span style={{ fontSize: 15, fontWeight: 500, color: "#0D0D0D" }}>{b.key}</span>
                          <span
                            style={{
                              fontSize: 12,
                              color: active ? "#0D0D0D" : "#888",
                              fontWeight: active ? 500 : 400,
                            }}
                          >
                            {b.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {errors.budget && (
                    <p style={{ fontSize: 12, color: "#A32D2D", marginTop: 10 }}>{errors.budget}</p>
                  )}

                  <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      style={{ ...SECONDARY_BTN, width: "40%" }}
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={goNextFromStep2}
                      className="reno-filled-btn"
                      style={{ ...FILLED_BTN, width: "60%" }}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 style={{ fontSize: 17, fontWeight: 500, color: "#0D0D0D" }}>
                    Where should we reach you?
                  </h3>
                  <p style={{ fontSize: 13, color: "#777", marginTop: 6, marginBottom: 20 }}>
                    We'll call or WhatsApp you to confirm availability.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div>
                      <input
                        type="text"
                        autoComplete="given-name"
                        placeholder="Your name"
                        value={name}
                        maxLength={100}
                        onChange={(e) => setName(e.target.value)}
                        className="reno-step-input"
                        style={{
                          width: "100%",
                          height: 48,
                          borderRadius: 10,
                          border: "1.5px solid #D3D1C7",
                          padding: "0 16px",
                          fontSize: 15,
                          background: "white",
                          color: "#0D0D0D",
                          outline: "none",
                        }}
                      />
                      {errors.name && (
                        <p style={{ fontSize: 12, color: "#A32D2D", marginTop: 6 }}>{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="tel"
                        autoComplete="tel"
                        placeholder="+971 — WhatsApp preferred"
                        value={phone}
                        maxLength={30}
                        onChange={(e) => setPhone(e.target.value)}
                        className="reno-step-input"
                        style={{
                          width: "100%",
                          height: 48,
                          borderRadius: 10,
                          border: "1.5px solid #D3D1C7",
                          padding: "0 16px",
                          fontSize: 15,
                          background: "white",
                          color: "#0D0D0D",
                          outline: "none",
                        }}
                      />
                      <p style={{ fontSize: 11, color: "#888", marginTop: 4 }}>
                        We'll send a confirmation message on WhatsApp.
                      </p>
                      {errors.phone && (
                        <p style={{ fontSize: 12, color: "#A32D2D", marginTop: 4 }}>{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <p
                    className="text-center"
                    style={{ fontSize: 12, color: "#777", marginTop: 16 }}
                  >
                    We assess 15–20 new projects each month.
                  </p>

                  <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      style={{ ...SECONDARY_BTN, width: "40%" }}
                      disabled={submitting}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="reno-filled-btn"
                      style={{
                        ...FILLED_BTN,
                        width: "60%",
                        opacity: submitting ? 0.4 : 1,
                        cursor: submitting ? "wait" : "pointer",
                      }}
                      disabled={submitting}
                    >
                      {submitting ? "Sending..." : "Get my assessment →"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        )}
      </div>

      {submitted && <ConfirmationPopup onClose={() => setSubmitted(false)} />}

      <style>{`
        .reno-filled-btn:hover:not(:disabled) { background: #333 !important; }
        .reno-step-input:focus { border-color: #1a1a1a !important; }
        @keyframes reno-shake-kf {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .reno-shake { animation: reno-shake-kf 500ms ease; }
      `}</style>
    </section>
  );
}

function ConfirmationPopup({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 480,
          width: "90vw",
          background: "white",
          borderRadius: 20,
          padding: "40px 36px 36px",
        }}
      >
        <CircleCheck size={40} color="#3B6D11" strokeWidth={1.75} style={{ marginBottom: 16 }} />
        <h3 style={{ fontSize: 20, fontWeight: 500, color: "#0D0D0D" }}>
          You're on the list.
        </h3>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#555", marginTop: 12 }}>
          We've received your request and will confirm project availability within 24 hours. Expect a call or WhatsApp from the Reno team.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#555", marginTop: 12 }}>
          We take on 15–20 new projects each month — if your project is a fit, we'll walk you through next steps on the call.
        </p>

        <div style={{ height: 1, background: "rgba(0,0,0,0.07)", margin: "24px 0" }} />

        <p
          className="uppercase"
          style={{ fontSize: 10, letterSpacing: "0.08em", color: "#888", marginBottom: 12, fontWeight: 500 }}
        >
          MANAGE YOUR PROJECT IN THE APP
        </p>
        <p style={{ fontSize: 13, color: "#555", marginBottom: 20, lineHeight: 1.55 }}>
          Track progress, approve milestones, and message your designer — all in one place.
        </p>

        <div style={{ display: "flex", gap: 10 }}>
          <a
            href="#"
            style={{
              width: "50%",
              height: 44,
              background: "#F9F8F6",
              border: "1.5px solid #D3D1C7",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 500,
              color: "#0D0D0D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            <Apple size={18} strokeWidth={1.75} />
            App Store
          </a>
          <a
            href="#"
            style={{
              width: "50%",
              height: 44,
              background: "#F9F8F6",
              border: "1.5px solid #D3D1C7",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 500,
              color: "#0D0D0D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            <Smartphone size={18} strokeWidth={1.75} />
            Google Play
          </a>
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          style={{
            display: "block",
            margin: "16px auto 0",
            background: "transparent",
            border: "none",
            fontSize: 13,
            color: "#888",
            cursor: "pointer",
          }}
        >
          No thanks, I'll check my WhatsApp
        </button>
      </div>
    </div>
  );
}
