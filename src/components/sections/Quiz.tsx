import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Check } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { supabase } from "@/integrations/supabase/client";
import { useAnimeRevealGroup } from "@/lib/anime";
import { WordReveal } from "@/components/WordReveal";
import { ArrowButton } from "@/components/ArrowButton";
import houseMark from "@/assets/quiz-house-mark.png";

const UNITS = ["Villa", "Apartment", "Landscape"] as const;
const BUDGETS = [
  "AED 100k – 500k",
  "AED 500k – 1.5M",
  "AED 1.5M +",
] as const;

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
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    unit?: string;
    budget?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const revealRef = useAnimeRevealGroup<HTMLDivElement>("[data-quiz-anim]", {
    staggerMs: 110,
    duration: 720,
    translateY: 26,
  });

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

  return (
    <section
      id="quiz"
      data-nav-theme="dark"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#000000",
        paddingBlock: "clamp(56px, 9vw, 80px)",
        paddingInline: "clamp(20px, 6vw, 80px)",
      }}
    >
      {/* Decorative background glows */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            left: "-12%",
            top: "8%",
            width: 640,
            height: 640,
            background:
              "radial-gradient(circle, rgba(82,60,255,0.30) 0%, rgba(82,60,255,0) 70%)",
            filter: "blur(30px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-14%",
            bottom: "-12%",
            width: 760,
            height: 760,
            background:
              "radial-gradient(circle, rgba(36,28,150,0.40) 0%, rgba(36,28,150,0) 70%)",
            filter: "blur(30px)",
          }}
        />
      </div>

      <div
        ref={revealRef}
        className="relative"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(28px, 4vw, 40px)",
        }}
      >
        {/* Header */}
        <div
          data-quiz-anim
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={houseMark}
            alt=""
            aria-hidden
            style={{
              width: "clamp(200px, 28vw, 400px)",
              height: "clamp(200px, 28vw, 400px)",
              objectFit: "contain",
              userSelect: "none",
            }}
          />
          <WordReveal
            as="h2"
            variant="scale"
            style={{
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: "clamp(30px, 5.2vw, 64px)",
              lineHeight: 1.18,
              letterSpacing: "-0.02em",
              textAlign: "center",
              marginTop: "clamp(-8px, -0.5vw, 0px)",
            }}
          >
            Tell us about your project
          </WordReveal>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          style={{
            width: "100%",
            maxWidth: 768,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(20px, 3vw, 40px)",
          }}
        >
          {/* Unit type pill group */}
          <div data-quiz-anim style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div className="reno-quiz-pillgroup">
              {UNITS.map((u) => {
                const isActive = unit === u;
                return (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnit(u)}
                    aria-pressed={isActive}
                    className="reno-quiz-pill"
                    style={{
                      backgroundColor: isActive ? "#FFFFFF" : "#2B2B2B",
                      color: isActive ? "#0D0D0D" : "#FFFFFF",
                    }}
                  >
                    {u}
                  </button>
                );
              })}
            </div>
            {errors.unit && <p className="reno-quiz-error">{errors.unit}</p>}
          </div>

          {/* Name + Phone */}
          <div data-quiz-anim style={{ width: "100%" }}>
            <div className="reno-quiz-row">
              <div>
                <div className="reno-quiz-field">
                  <label htmlFor="quiz-name" className="reno-quiz-label">
                    Your name
                  </label>
                  <input
                    id="quiz-name"
                    type="text"
                    autoComplete="given-name"
                    placeholder=" "
                    value={name}
                    maxLength={100}
                    onChange={(e) => setName(e.target.value)}
                    className="reno-quiz-input"
                  />
                </div>
                {errors.name && <p className="reno-quiz-error">{errors.name}</p>}
              </div>
              <div>
                <div className="reno-quiz-field">
                  <span className="reno-quiz-label">Phone number</span>
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
                </div>
                {errors.phone && (
                  <p className="reno-quiz-error">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Budget */}
          <div
            data-quiz-anim
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <h3
              style={{
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: "clamp(17px, 1.6vw, 20px)",
                lineHeight: 1.2,
              }}
            >
              Budget
            </h3>
            <div className="reno-quiz-budget-row">
              {BUDGETS.map((b) => {
                const isActive = budget === b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(b)}
                    aria-pressed={isActive}
                    className="reno-quiz-budget-card"
                    style={{
                      backgroundColor: isActive
                        ? "#FFFFFF"
                        : "rgba(255,255,255,0.1)",
                      color: isActive ? "#0D0D0D" : "#FFFFFF",
                    }}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
            {errors.budget && (
              <p className="reno-quiz-error">{errors.budget}</p>
            )}
          </div>

          {/* Submit */}
          <div data-quiz-anim style={{ width: "min(400px, 100%)" }}>
            <ArrowButton
              as="button"
              type="submit"
              disabled={submitting}
              variant="light-on-dark"
              style={{ width: "100%" }}
            >
              {submitting ? "Sending…" : "Submit"}
            </ArrowButton>
          </div>
        </form>
      </div>

      {submitted && (
        <SuccessModal
          unit={unit}
          budget={budget}
          onClose={() => setSubmitted(false)}
        />
      )}

      <style>{`
        .reno-quiz-pillgroup {
          display: flex;
          gap: 4px;
          padding: 8px;
          border-radius: 100px;
          background-color: rgba(255,255,255,0.04);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.07),
            0 1px 0 rgba(255,255,255,0.06) inset;
        }
        .reno-quiz-pill {
          width: clamp(96px, 13vw, 144px);
          padding: 16px;
          border: none;
          border-radius: 100px;
          cursor: pointer;
          font-weight: 500;
          font-size: clamp(14px, 1.4vw, 16px);
          line-height: 1.2;
          transition: background-color 240ms ease, color 240ms ease;
        }
        .reno-quiz-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .reno-quiz-field {
          position: relative;
          background-color: rgba(255,255,255,0.1);
          border-radius: 16px;
          height: 80px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
        }
        .reno-quiz-label {
          color: rgba(255,255,255,0.5);
          font-weight: 600;
          font-size: 13px;
          line-height: 1.2;
        }
        .reno-quiz-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: #FFFFFF;
          font-family: inherit;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.2;
          padding: 0;
        }
        .reno-quiz-input::placeholder { color: transparent; }
        .reno-quiz-budget-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
        }
        .reno-quiz-budget-card {
          height: 80px;
          padding: 16px;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          font-weight: 600;
          font-size: clamp(13px, 1.4vw, 16px);
          line-height: 1.2;
          transition: background-color 240ms ease, color 240ms ease;
        }
        .reno-quiz-error {
          color: #ff6b6b;
          font-size: 12px;
          margin-top: 8px;
          text-align: center;
        }
        @media (max-width: 720px) {
          .reno-quiz-row { grid-template-columns: 1fr; }
          .reno-quiz-budget-row { grid-template-columns: 1fr; }
          .reno-quiz-pillgroup { flex-wrap: wrap; justify-content: center; }
        }

        /* react-phone-input-2 — dark theme overrides */
        .reno-quiz-field .react-tel-input,
        .reno-quiz-field .react-tel-input * {
          font-family: 'ZT Talk', system-ui, sans-serif !important;
        }
        .reno-quiz-field .react-tel-input .form-control {
          width: 100% !important;
          height: 28px !important;
          font-size: 16px !important;
          font-weight: 600 !important;
          border: none !important;
          border-radius: 0 !important;
          padding-left: 44px !important;
          background: transparent !important;
          color: #FFFFFF !important;
          box-shadow: none !important;
        }
        .reno-quiz-field .react-tel-input .flag-dropdown,
        .reno-quiz-field .react-tel-input .flag-dropdown.open,
        .reno-quiz-field .react-tel-input .flag-dropdown.open .selected-flag,
        .reno-quiz-field .react-tel-input .selected-flag {
          background: transparent !important;
          border: none !important;
          border-radius: 0 !important;
        }
        .reno-quiz-field .react-tel-input .selected-flag { padding-left: 0 !important; }
        .reno-quiz-field .react-tel-input .selected-flag .arrow {
          border-top-color: rgba(255,255,255,0.6) !important;
        }
        .reno-quiz-field .react-tel-input .country-list {
          background: #161616 !important;
          border-radius: 10px !important;
          box-shadow: 0 12px 32px rgba(0,0,0,0.5) !important;
          max-height: 260px !important;
        }
        .reno-quiz-field .react-tel-input .country-list .search {
          background: #161616 !important;
          padding: 10px !important;
        }
        .reno-quiz-field .react-tel-input .country-list .search-box {
          width: 100% !important;
          padding: 8px 12px !important;
          border: 1px solid #2c2c2c !important;
          border-radius: 6px !important;
          margin: 0 !important;
          background: #0d0d0d !important;
          color: #FFFFFF !important;
          font-size: 13px !important;
        }
        .reno-quiz-field .react-tel-input .country-list .country {
          color: #FFFFFF !important;
          font-size: 13px !important;
          padding: 8px 10px !important;
        }
        .reno-quiz-field .react-tel-input .country-list .country .dial-code {
          color: rgba(255,255,255,0.55) !important;
        }
        .reno-quiz-field .react-tel-input .country-list .country:hover,
        .reno-quiz-field .react-tel-input .country-list .country.highlight {
          background: #242424 !important;
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
