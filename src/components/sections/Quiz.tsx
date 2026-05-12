import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Check } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";

const UNIT_TILES = [
  {
    key: "Villa",
    label: "Villa",
    image:
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=600&h=320&fit=crop",
  },
  {
    key: "Apartment",
    label: "Apartment",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=320&fit=crop",
  },
  {
    key: "Landscape",
    label: "Landscape",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=320&fit=crop",
  },
] as const;

const BUDGETS = ["AED 100K – 500K", "AED 500K – 1.5M", "AED 1.5M+"] as const;

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(8, "Please enter a valid phone number").max(20),
  unit: z.string().min(1, "Please pick what you're renovating"),
  budget: z.string().min(1, "Please select a budget range"),
});

export function Quiz() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("971");
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
        phone: `+${parsed.data.phone}`,
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

  const sectionLabel: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 600,
    color: "#0D0D0D",
    marginBottom: 12,
  };
  const errorText: React.CSSProperties = {
    fontSize: 12,
    color: "#e53935",
    marginTop: 6,
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
            style={{ color: "#555", maxWidth: "100%", lineHeight: 1.55 }}
          >
            We call back within 24 hours.
          </p>
        </Reveal>

        <Reveal>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="reno-quiz-form mx-auto mt-10"
            style={{
              maxWidth: 720,
              background: "white",
              border: "1px solid #ececec",
              borderRadius: 12,
              padding: 32,
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Row 1: Name + Phone */}
            <div className="reno-row-name-phone">
              <div>
                <input
                  type="text"
                  autoComplete="given-name"
                  placeholder="Your name"
                  value={name}
                  maxLength={100}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    height: 48,
                    border: "1.5px solid #e0e0e0",
                    borderRadius: 8,
                    padding: "0 14px",
                    fontSize: 14,
                    background: "white",
                    color: "#0D0D0D",
                    outline: "none",
                  }}
                />
                {errors.name && <p style={errorText}>{errors.name}</p>}
              </div>
              <div>
                <PhoneInput
                  country="ae"
                  value={phone}
                  onChange={(v) => setPhone(v)}
                  enableSearch
                  disableSearchIcon
                  searchPlaceholder="Search country"
                  countryCodeEditable={false}
                  placeholder="50 123 4567"
                  inputProps={{ name: "phone", autoComplete: "tel" }}
                />
                {errors.phone && <p style={errorText}>{errors.phone}</p>}
              </div>
            </div>

            {/* Row 2: Renovation type */}
            <div>
              <h3 style={sectionLabel}>What are you renovating?</h3>
              <div className="reno-row-cards">
                {UNIT_TILES.map((t) => {
                  const active = unit === t.key;
                  return (
                    <button
                      type="button"
                      key={t.key}
                      onClick={() => setUnit(t.key)}
                      aria-pressed={active}
                      style={{
                        position: "relative",
                        padding: 0,
                        background: "white",
                        border: `2px solid ${active ? "#111" : "#e0e0e0"}`,
                        borderRadius: 10,
                        overflow: "hidden",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "border-color 150ms",
                      }}
                    >
                      <div style={{ position: "relative", width: "100%", height: 140 }}>
                        <img
                          src={t.image}
                          alt={t.label}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                        {active && (
                          <>
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                background: "rgba(0,0,0,0.2)",
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                width: 28,
                                height: 28,
                                borderRadius: 999,
                                background: "#111",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Check size={16} strokeWidth={3} />
                            </div>
                          </>
                        )}
                      </div>
                      <div
                        style={{
                          padding: "10px 14px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#0D0D0D",
                        }}
                      >
                        <span>{t.label}</span>
                        {active && <Check size={16} strokeWidth={2.5} color="#111" />}
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.unit && <p style={errorText}>{errors.unit}</p>}
            </div>

            {/* Row 3: Budget */}
            <div>
              <h3 style={sectionLabel}>Your rough budget</h3>
              <div className="reno-row-pills">
                {BUDGETS.map((b) => {
                  const active = budget === b;
                  return (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBudget(b)}
                      aria-pressed={active}
                      style={{
                        flex: 1,
                        height: 52,
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 600,
                        background: active ? "#111" : "#fafafa",
                        border: `1.5px solid ${active ? "#111" : "#d8d8d8"}`,
                        color: active ? "white" : "#444",
                        cursor: "pointer",
                        transition: "background 150ms, border-color 150ms, color 150ms",
                      }}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>
              {errors.budget && <p style={errorText}>{errors.budget}</p>}
            </div>

            {/* Row 4: Submit */}
            <div>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%",
                  height: 56,
                  background: "#111",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: submitting ? "wait" : "pointer",
                  opacity: submitting ? 0.5 : 1,
                }}
              >
                {submitting ? "Sending..." : "Get my assessment →"}
              </button>
              <p
                style={{
                  fontSize: 12,
                  color: "#999",
                  textAlign: "center",
                  marginTop: 12,
                }}
              >
                We assess 15–20 new projects each month.
              </p>
            </div>
          </form>
        </Reveal>
      </div>

      {submitted && (
        <SuccessModal
          unit={unit}
          budget={budget}
          onClose={() => setSubmitted(false)}
        />
      )}

      <style>{`
        .reno-quiz-h2 { font-size: clamp(28px, 8vw, 52px); }
        .reno-quiz-sub { font-size: 15px; }
        @media (min-width: 768px) {
          .reno-quiz-h2 { font-size: clamp(36px, 5.5vw, 52px); }
          .reno-quiz-sub { font-size: 17px; }
        }

        .reno-row-name-phone {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .reno-row-cards {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
        }
        .reno-row-pills {
          display: flex;
          gap: 10px;
        }
        @media (max-width: 767px) {
          .reno-row-name-phone { grid-template-columns: 1fr; }
          .reno-row-cards { grid-template-columns: 1fr; }
          .reno-row-pills { flex-direction: column; }
        }

        /* Phone input overrides */
        .react-tel-input,
        .react-tel-input * {
          font-family: 'ZT Talk', system-ui, sans-serif !important;
        }
        .react-tel-input .form-control {
          width: 100% !important;
          height: 48px !important;
          font-size: 14px !important;
          border: 1.5px solid #e0e0e0 !important;
          border-radius: 8px !important;
          padding-left: 100px !important;
          background: white !important;
          color: #0D0D0D !important;
        }
        .react-tel-input .form-control:focus {
          border-color: #111 !important;
          box-shadow: none !important;
        }
        .react-tel-input .flag-dropdown {
          background: #f0f0f0 !important;
          border: 1.5px solid #e0e0e0 !important;
          border-right: 1px solid #e0e0e0 !important;
          border-radius: 8px 0 0 8px !important;
          width: 90px !important;
        }
        .react-tel-input .flag-dropdown.open,
        .react-tel-input .flag-dropdown.open .selected-flag {
          background: #f0f0f0 !important;
          border-radius: 8px 0 0 8px !important;
        }
        .react-tel-input .selected-flag {
          width: 90px !important;
          padding-left: 14px !important;
          border-radius: 8px 0 0 8px !important;
        }
        .react-tel-input .selected-flag .flag {
          margin-top: -6px;
        }
        .react-tel-input .selected-flag .arrow {
          left: 28px !important;
          border-top-color: #555 !important;
        }
        .react-tel-input .country-list {
          background: white !important;
          border-radius: 8px !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
          max-height: 280px !important;
        }
        .react-tel-input .country-list .search {
          padding: 10px !important;
          background: white !important;
        }
        .react-tel-input .country-list .search-box {
          width: 100% !important;
          padding: 8px 12px !important;
          border: 1.5px solid #e0e0e0 !important;
          border-radius: 6px !important;
          margin: 0 !important;
          color: #0D0D0D !important;
          font-size: 13px !important;
        }
        .react-tel-input .country-list .country {
          color: #0D0D0D !important;
          font-size: 13px !important;
          padding: 8px 10px !important;
        }
        .react-tel-input .country-list .country .country-name {
          color: #0D0D0D !important;
          margin-right: 6px !important;
        }
        .react-tel-input .country-list .country .dial-code {
          color: #666 !important;
        }
        .react-tel-input .country-list .country:hover,
        .react-tel-input .country-list .country.highlight {
          background: #f5f5f5 !important;
        }
        .react-tel-input .country-list .country:hover .dial-code,
        .react-tel-input .country-list .country.highlight .dial-code {
          color: #0D0D0D !important;
        }
      `}</style>
    </section>
  );
}

function SuccessModal({
  unit,
  budget,
  onClose,
}: {
  unit: string;
  budget: string;
  onClose: () => void;
}) {
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
          maxWidth: 400,
          width: "90vw",
          background: "white",
          borderRadius: 12,
          padding: "40px 32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
            background: "#111",
            color: "white",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Check size={28} strokeWidth={3} />
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0D0D0D" }}>
          We've got your details.
        </h3>
        <p style={{ fontSize: 14, color: "#666", marginTop: 10, lineHeight: 1.55 }}>
          Expect a call within 24 hours from the Reno team.
        </p>
        {(unit || budget) && (
          <div
            style={{
              display: "inline-block",
              fontSize: 13,
              background: "#f5f5f5",
              padding: "10px 20px",
              borderRadius: 6,
              marginTop: 20,
              color: "#0D0D0D",
            }}
          >
            {[unit, budget].filter(Boolean).join(" · ")}
          </div>
        )}
        <div style={{ marginTop: 24 }}>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            style={{
              height: 44,
              padding: "0 28px",
              background: "#111",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
