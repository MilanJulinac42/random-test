import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Building2, Building, Trees, CircleCheck, Apple, Smartphone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";

const UNIT_TILES = [
  { key: "Villa", label: "Villa", Icon: Building2 },
  { key: "Apartment", label: "Apartment", Icon: Building },
  { key: "Landscape", label: "Landscape", Icon: Trees },
] as const;

const BUDGETS = [
  { key: "AED 100K – 500K" },
  { key: "AED 500K – 1.5M" },
  { key: "AED 1.5M+" },
] as const;

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[+0][\d+\-()\s]{7,}$/, "Please enter a valid phone number")
    .max(30),
  unit: z.string().min(1, "Please pick what you're renovating"),
  budget: z.string().min(1, "Please select a budget range"),
});

export function Quiz() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [unit, setUnit] = useState("");
  const [budget, setBudget] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; unit?: string; budget?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse({ name, phone, unit, budget });
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof typeof errors;
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
        rooms: [parsed.data.unit],
        budget: parsed.data.budget,
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

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: 56,
    borderRadius: 12,
    border: "1px solid #D3D1C7",
    padding: "0 16px",
    fontSize: 15,
    background: "white",
    color: "#0D0D0D",
    outline: "none",
  };

  return (
    <section
      id="quiz"
      data-nav-theme="light"
      className="relative w-full px-6 md:px-12 lg:px-16"
      style={{
        backgroundColor: "#FFFFFF",
        paddingTop: "clamp(64px, 10vw, 140px)",
        paddingBottom: "clamp(64px, 10vw, 140px)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <p
            className="text-center uppercase"
            style={{ fontSize: 13, letterSpacing: "0.1em", color: "#888", fontWeight: 500 }}
          >
            GET STARTED
          </p>
          <h2
            className="text-center mt-3 reno-quiz-h2"
            style={{
              fontWeight: 700,
              color: "#0D0D0D",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Tell us about your project.
          </h2>
          <p
            className="text-center mx-auto mt-4 reno-quiz-sub"
            style={{ color: "#555", maxWidth: 520, lineHeight: 1.55 }}
          >
            One short form. We call back within 24 hours to confirm if we can take your project.
          </p>
        </Reveal>

        {!submitted && (
          <Reveal>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mx-auto mt-10 reno-quiz-form"
            >
              <div className="reno-quiz-grid">
                {/* LEFT COLUMN */}
                <div>
                  {/* Name + Phone */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: 12,
                    }}
                  >
                    <div>
                      <input
                        type="text"
                        autoComplete="given-name"
                        placeholder="Your name"
                        value={name}
                        maxLength={100}
                        onChange={(e) => setName(e.target.value)}
                        className="reno-step-input"
                        style={inputStyle}
                      />
                      {errors.name && (
                        <p style={{ fontSize: 12, color: "#A32D2D", marginTop: 6, textAlign: "center" }}>{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="tel"
                        autoComplete="tel"
                        placeholder="+971 — phone number"
                        value={phone}
                        maxLength={30}
                        onChange={(e) => setPhone(e.target.value)}
                        className="reno-step-input"
                        style={inputStyle}
                      />
                      {errors.phone && (
                        <p style={{ fontSize: 12, color: "#A32D2D", marginTop: 6, textAlign: "center" }}>{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Renovation type */}
                  <div style={{ marginTop: 28 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 500, color: "#0D0D0D", marginBottom: 14 }}>
                      What are you renovating?
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 10,
                      }}
                    >
                      {UNIT_TILES.map((t) => {
                        const active = unit === t.key;
                        const Icon = t.Icon;
                        return (
                          <button
                            type="button"
                            key={t.key}
                            onClick={() => setUnit(t.key)}
                            aria-pressed={active}
                            style={{
                              background: active ? "#0D0D0D" : "#FFFFFF",
                              border: `1.5px solid ${active ? "#0D0D0D" : "#D3D1C7"}`,
                              borderRadius: 999,
                              padding: "12px 22px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 8,
                              cursor: "pointer",
                              transition: "background 150ms, border-color 150ms, color 150ms",
                              color: active ? "#FFFFFF" : "#0D0D0D",
                              fontSize: 14,
                              fontWeight: 500,
                            }}
                          >
                            <Icon size={18} strokeWidth={1.75} />
                            {t.label}
                          </button>
                        );
                      })}
                    </div>
                    {errors.unit && (
                      <p style={{ fontSize: 12, color: "#A32D2D", marginTop: 10 }}>{errors.unit}</p>
                    )}
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {/* Budget */}
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 500, color: "#0D0D0D", marginBottom: 14 }}>
                      Rough budget
                    </h3>
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
                              border: `1.5px solid ${active ? "#0D0D0D" : "transparent"}`,
                              borderRadius: 14,
                              padding: "16px 20px",
                              textAlign: "center",
                              cursor: "pointer",
                              transition: "background 150ms, border-color 150ms",
                              fontSize: 15,
                              fontWeight: 500,
                              color: "#0D0D0D",
                            }}
                          >
                            {b.key}
                          </button>
                        );
                      })}
                    </div>
                    {errors.budget && (
                      <p style={{ fontSize: 12, color: "#A32D2D", marginTop: 10 }}>{errors.budget}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="reno-filled-btn"
                    disabled={submitting}
                    style={{
                      width: "100%",
                      marginTop: 24,
                      height: 56,
                      background: "#0D0D0D",
                      color: "white",
                      border: "none",
                      borderRadius: 12,
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: submitting ? "wait" : "pointer",
                      opacity: submitting ? 0.4 : 1,
                      transition: "background 150ms",
                    }}
                  >
                    {submitting ? "Sending..." : "Get my assessment →"}
                  </button>

                  <p
                    className="text-center"
                    style={{ fontSize: 12, color: "#888", marginTop: 14 }}
                  >
                    We assess 15–20 new projects each month.
                  </p>
                </div>
              </div>
            </form>
          </Reveal>
        )}
      </div>

      {submitted && <ConfirmationPopup onClose={() => setSubmitted(false)} />}

      <style>{`
        .reno-quiz-h2 { font-size: clamp(28px, 8vw, 52px); }
        .reno-quiz-sub { font-size: 15px; }
        .reno-quiz-form {
          max-width: 100%;
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 0;
          box-shadow: none;
        }
        @media (min-width: 768px) {
          .reno-quiz-h2 { font-size: clamp(36px, 5.5vw, 52px); }
          .reno-quiz-sub { font-size: 17px; }
          .reno-quiz-form {
            max-width: 980px;
            background: #FFFFFF;
            border: 1px solid #E6E4DD;
            border-radius: 20px;
            padding: clamp(28px, 5vw, 48px);
            box-shadow: 0 1px 2px rgba(0,0,0,0.04);
          }
        }
        .reno-filled-btn:hover:not(:disabled) { background: #333 !important; }
        .reno-step-input:focus { border-color: #0D0D0D !important; }
        .reno-quiz-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
        @media (min-width: 768px) {
          .reno-quiz-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
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
