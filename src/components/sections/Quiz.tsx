import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Check, ChevronLeft, X } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { supabase } from "@/integrations/supabase/client";
import { useAnimeRevealGroup } from "@/lib/anime";
import { WordReveal } from "@/components/WordReveal";
import { ArrowButton } from "@/components/ArrowButton";
import livingAfter from "@/assets/gallery/living-after.jpg";
import kitchenAfter from "@/assets/gallery/kitchen-after.jpg";

const UNITS = ["Villa", "Apartment", "Landscape"] as const;
const BUDGETS = [
  "AED 100k – 500k",
  "AED 500k – 1.5M",
  "AED 1.5M +",
] as const;
const SERVICES = [
  "Layout change",
  "AC",
  "Electrical and lighting",
  "Plumbing",
  "Flooring",
  "Painting",
  "False ceiling",
  "Furnishing",
  "Appliances",
  "Landscaping",
] as const;
const TIMELINES = [
  "In the next 3 months",
  "3–6 months",
  "1 year",
  "Just exploring",
] as const;

type QuizPhase = "form" | "success_basic" | "overlay_2" | "overlay_3" | "success_extended";

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(8, "Please enter a valid phone number").max(20),
  unit: z.string().min(1, "Please pick what you're renovating"),
  budget: z.string().min(1, "Please select a budget range"),
});

/** Format a Date as "Wednesday, 21 May at 3:00 PM" in Dubai timezone */
function formatCallbackTime(d: Date) {
  const opts: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Dubai",
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-AE", opts).format(d);
}

export function Quiz() {
  // ── Basic form state ──
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
  const [exitingForm, setExitingForm] = useState(false);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Phase / flow state ──
  const [phase, setPhase] = useState<QuizPhase>("form");
  const [leadId, setLeadId] = useState<string | null>(null);
  const [callbackTime, setCallbackTime] = useState("");

  // ── Extended form state ──
  const [size, setSize] = useState(120);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [bathrooms, setBathrooms] = useState<number | null>(null);
  const [extTimeline, setExtTimeline] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [otherServiceTags, setOtherServiceTags] = useState<string[]>([]);
  const [otherServiceInput, setOtherServiceInput] = useState("");
  const [submittingExtended, setSubmittingExtended] = useState(false);

  const revealRef = useAnimeRevealGroup<HTMLDivElement>("[data-quiz-anim]", {
    staggerMs: 110,
    duration: 720,
    translateY: 26,
  });

  // Cleanup exit timer on unmount
  useEffect(() => {
    return () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, []);

  const resetForm = () => {
    setName("");
    setPhone("971");
    setUnit("");
    setBudget("");
    setErrors({});
    setSubmitting(false);
    setSubmittingExtended(false);
    setLeadId(null);
    setCallbackTime("");
    setSize(120);
    setBedrooms(null);
    setBathrooms(null);
    setExtTimeline("");
    setServices([]);
    setOtherServiceTags([]);
    setOtherServiceInput("");
    setPhase("form");
  };

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
      // Ensure at least 700ms of visible loading state before transitioning
      const supabasePromise = supabase
        .from("lead_submissions")
        .insert({
          name: parsed.data.name,
          phone: `+${parsed.data.phone}`,
          area: "—",
          rooms: [parsed.data.unit],
          budget: parsed.data.budget,
          timeline: null,
        })
        .select("id")
        .single();

      const [dbResult] = await Promise.all([
        supabasePromise,
        new Promise<void>((r) => setTimeout(r, 700)),
      ]);

      const { data, error: dbError } = dbResult;
      if (dbError) console.error("Lead submit error:", dbError);
      if (data?.id) setLeadId(data.id);
    } catch (err) {
      console.error("Lead submit exception:", err);
    } finally {
      const callbackDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      setCallbackTime(formatCallbackTime(callbackDate));
      setSubmitting(false);
      // Animate form out, then switch phase
      setExitingForm(true);
      exitTimerRef.current = setTimeout(() => {
        setExitingForm(false);
        setPhase("success_basic");
      }, 320);
    }
  };

  const handleExtendedSubmit = async () => {
    if (!leadId) { setPhase("success_extended"); return; }
    setSubmittingExtended(true);
    try {
      await supabase
        .from("lead_submissions")
        .update({
          timeline: extTimeline || null,
          extended_data: JSON.stringify({
            size_m2: size,
            bedrooms,
            bathrooms,
            services,
            other_services: otherServiceTags,
          }),
        })
        .eq("id", leadId);
    } catch (err) {
      console.error("Extended submit error:", err);
    } finally {
      setSubmittingExtended(false);
      setPhase("success_extended");
    }
  };

  const toggleService = (s: string) =>
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  return (
    <section
      id="quiz"
      data-nav-theme="dark"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#0A0A0A",
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
        <div style={{ position: "absolute", left: "-12%", top: "8%", width: 640, height: 640, background: "radial-gradient(circle, rgba(82,60,255,0.30) 0%, rgba(82,60,255,0) 70%)", filter: "blur(30px)" }} />
        <div style={{ position: "absolute", right: "-14%", bottom: "-12%", width: 760, height: 760, background: "radial-gradient(circle, rgba(36,28,150,0.40) 0%, rgba(36,28,150,0) 70%)", filter: "blur(30px)" }} />
      </div>

      <div
        ref={revealRef}
        className="relative"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(28px, 4vw, 40px)" }}
      >
        {/* Header — always visible */}
        <div data-quiz-anim style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <video
            src="/videos/quiz-home.mp4"
            autoPlay loop muted playsInline aria-hidden
            style={{ width: "clamp(200px, 28vw, 400px)", height: "clamp(200px, 28vw, 400px)", objectFit: "contain", userSelect: "none", pointerEvents: "none" }}
          />
          <WordReveal
            as="h2"
            variant="scale"
            style={{ color: "#FFFFFF", fontWeight: 600, fontSize: "clamp(34px, 5vw, 64px)", lineHeight: 1.1, letterSpacing: "-0.02em", textAlign: "center", marginTop: "clamp(-8px, -0.5vw, 0px)" }}
          >
            {"Tell us about\nyour project"}
          </WordReveal>
        </div>

        {/* ── PHASE: form ── */}
        {phase === "form" && (
          <form
            onSubmit={handleSubmit}
            noValidate
            className={exitingForm ? "reno-quiz-form-exit" : undefined}
            style={{
              width: "100%",
              maxWidth: 768,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "clamp(20px, 3vw, 40px)",
              pointerEvents: exitingForm ? "none" : undefined,
            }}
          >
            {/* Unit type */}
            <div data-quiz-anim style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div className="reno-quiz-pillgroup">
                {UNITS.map((u) => (
                  <button key={u} type="button" onClick={() => setUnit(u)} aria-pressed={unit === u} className="reno-quiz-pill" style={{ backgroundColor: unit === u ? "#FFFFFF" : "rgba(255,255,255,0.1)", color: unit === u ? "#0D0D0D" : "#FFFFFF" }}>
                    {u}
                  </button>
                ))}
              </div>
              {errors.unit && <p className="reno-quiz-error">{errors.unit}</p>}
            </div>

            {/* Name + Phone */}
            <div data-quiz-anim style={{ width: "100%" }}>
              <div className="reno-quiz-row">
                <div>
                  <div className="reno-quiz-field">
                    <label htmlFor="quiz-name" className="reno-quiz-label">Your name</label>
                    <input id="quiz-name" type="text" autoComplete="given-name" placeholder=" " value={name} maxLength={100} onChange={(e) => setName(e.target.value)} className="reno-quiz-input" />
                  </div>
                  {errors.name && <p className="reno-quiz-error">{errors.name}</p>}
                </div>
                <div>
                  <div className="reno-quiz-field">
                    <span className="reno-quiz-label">Phone number</span>
                    <PhoneInput country="ae" value={phone} onChange={(v) => setPhone(v)} enableSearch disableSearchIcon searchPlaceholder="Search country" countryCodeEditable={false} placeholder="50 123 4567" inputProps={{ name: "phone", autoComplete: "tel" }} />
                  </div>
                  {errors.phone && <p className="reno-quiz-error">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Budget */}
            <div data-quiz-anim style={{ width: "100%", display: "flex", flexDirection: "column", gap: 20 }}>
              <h3 style={{ color: "#FFFFFF", fontWeight: 600, fontSize: "clamp(17px, 1.6vw, 20px)", lineHeight: 1.2 }}>Budget</h3>
              <div className="reno-quiz-budget-row">
                {BUDGETS.map((b) => (
                  <button key={b} type="button" onClick={() => setBudget(b)} aria-pressed={budget === b} className="reno-quiz-budget-card" style={{ backgroundColor: budget === b ? "#FFFFFF" : "rgba(255,255,255,0.1)", color: budget === b ? "#0D0D0D" : "#FFFFFF" }}>
                    {b}
                  </button>
                ))}
              </div>
              {errors.budget && <p className="reno-quiz-error">{errors.budget}</p>}
            </div>

            {/* Submit */}
            <div data-quiz-anim style={{ width: "100%" }}>
              <ArrowButton as="button" type="submit" disabled={submitting} variant="light-on-dark" hideArrow style={{ width: "100%" }}>
                {submitting ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
                    <span className="reno-quiz-spinner" />
                    Sending…
                  </span>
                ) : "Submit"}
              </ArrowButton>
            </div>
          </form>
        )}

        {/* ── PHASE: success_basic ── */}
        {phase === "success_basic" && (
          <div
            className="reno-quiz-success-enter"
            style={{ width: "100%", maxWidth: 768, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, paddingBlock: "clamp(16px, 3vw, 32px)" }}
          >
            {/* Check icon */}
            <div style={{ width: 64, height: 64, borderRadius: 999, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Check size={28} strokeWidth={2.5} color="#FFFFFF" />
            </div>

            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 10 }}>
              <h3 style={{ color: "#FFFFFF", fontWeight: 600, fontSize: "clamp(22px, 3vw, 32px)", lineHeight: 1.18, letterSpacing: "-0.02em", margin: 0 }}>
                We've got your details.
              </h3>
              <p style={{ color: "rgba(255,255,255,0.58)", fontSize: "clamp(14px, 1.2vw, 16px)", lineHeight: 1.55, margin: 0 }}>
                Expect a call by{" "}
                <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{callbackTime}</span>
              </p>
            </div>

            {/* CTA */}
            <div style={{ width: "min(400px, 100%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <ArrowButton as="button" type="button" variant="light-on-dark" hideArrow style={{ width: "100%" }} onClick={() => setPhase("overlay_2")}>
                Skip the queue
              </ArrowButton>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 13, lineHeight: 1.4, textAlign: "center", margin: 0 }}>
                Answer a few more questions and we'll prioritise your call.
              </p>
              <button
                type="button"
                onClick={resetForm}
                style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.55)", fontSize: 13, fontFamily: "inherit", fontWeight: 500, cursor: "pointer", marginTop: 4, padding: 8 }}
              >
                Submit another request
              </button>
            </div>
          </div>
        )}

        {/* ── PHASE: success_extended (in-Quiz, no modal) ── */}
        {phase === "success_extended" && (
          <div
            className="reno-quiz-success-enter"
            style={{ width: "100%", maxWidth: 768, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, paddingBlock: "clamp(16px, 3vw, 32px)" }}
          >
            <div style={{ width: 64, height: 64, borderRadius: 12, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Check size={28} strokeWidth={2.5} color="#FFFFFF" />
            </div>
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 10 }}>
              <h3 style={{ color: "#FFFFFF", fontWeight: 600, fontSize: "clamp(22px, 3vw, 32px)", lineHeight: 1.18, letterSpacing: "-0.02em", margin: 0 }}>
                Thank you. Expect a call sooner.
              </h3>
              <p style={{ color: "rgba(255,255,255,0.58)", fontSize: "clamp(14px, 1.2vw, 16px)", lineHeight: 1.55, margin: 0 }}>
                We've prioritised your callback based on your details.
              </p>
            </div>
            <button
              type="button"
              onClick={resetForm}
              style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.55)", fontSize: 13, fontFamily: "inherit", fontWeight: 500, cursor: "pointer", padding: 8 }}
            >
              Submit another request
            </button>
          </div>
        )}
      </div>

      {/* ── OVERLAYS 2 + 3 ── */}
      {(phase === "overlay_2" || phase === "overlay_3") && (
        <ProjectOverlay
          phase={phase}
          size={size} setSize={setSize}
          bedrooms={bedrooms} setBedrooms={setBedrooms}
          bathrooms={bathrooms} setBathrooms={setBathrooms}
          extTimeline={extTimeline} setExtTimeline={setExtTimeline}
          services={services} toggleService={toggleService}
          otherServiceTags={otherServiceTags} setOtherServiceTags={setOtherServiceTags}
          otherServiceInput={otherServiceInput} setOtherServiceInput={setOtherServiceInput}
          submittingExtended={submittingExtended}
          onClose={() => setPhase("success_basic")}
          onNext={() => setPhase("overlay_3")}
          onBack={() => setPhase("overlay_2")}
          onSubmitExtended={handleExtendedSubmit}
        />
      )}

      <style>{`
        /* ── Form enter/exit animations ── */
        @keyframes quizSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes quizFormOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-14px); }
        }
        @keyframes quizSuccessIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes renoOvEnter {
          from { opacity: 0; transform: scale(0.97) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }

        .reno-quiz-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid rgba(13,13,13,0.2);
          border-top-color: #0D0D0D;
          animation: quizSpin 650ms linear infinite;
          flex-shrink: 0;
        }
        .reno-quiz-form-exit {
          animation: quizFormOut 300ms cubic-bezier(0.32, 0.72, 0, 1) both;
          pointer-events: none;
        }
        .reno-quiz-success-enter {
          animation: quizSuccessIn 480ms cubic-bezier(0.32, 0.72, 0, 1) 40ms both;
        }

        /* ── Quiz form styles ── */
        .reno-quiz-pillgroup {
          display: flex;
          gap: 8px;
          padding: 0;
          background-color: transparent;
        }
        .reno-quiz-pill {
          width: clamp(96px, 13vw, 144px);
          padding: 16px;
          border: none;
          border-radius: 12px;
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
          .reno-quiz-budget-row { grid-template-columns: 1fr; gap: 10px; }
          .reno-quiz-budget-card {
            height: 52px;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 14px;
          }
          .reno-quiz-pillgroup { flex-wrap: wrap; justify-content: center; }
        }

        /* react-phone-input-2 — dark theme overrides */
        .reno-quiz-field .react-tel-input,
        .reno-quiz-field .react-tel-input * {
          font-family: 'ZT Talk', system-ui, sans-serif !important;
        }
        .reno-quiz-field .react-tel-input .form-control {
          width: 100% !important; height: 28px !important; font-size: 16px !important;
          font-weight: 600 !important; border: none !important; border-radius: 0 !important;
          padding-left: 44px !important; background: transparent !important;
          color: #FFFFFF !important; box-shadow: none !important;
        }
        .reno-quiz-field .react-tel-input .flag-dropdown,
        .reno-quiz-field .react-tel-input .flag-dropdown.open,
        .reno-quiz-field .react-tel-input .flag-dropdown.open .selected-flag,
        .reno-quiz-field .react-tel-input .selected-flag {
          background: transparent !important; border: none !important; border-radius: 0 !important;
        }
        .reno-quiz-field .react-tel-input .selected-flag { padding-left: 0 !important; }
        .reno-quiz-field .react-tel-input .selected-flag .arrow { border-top-color: rgba(255,255,255,0.6) !important; }
        .reno-quiz-field .react-tel-input .country-list {
          background: #161616 !important; border-radius: 10px !important;
          box-shadow: 0 12px 32px rgba(0,0,0,0.5) !important; max-height: 260px !important;
        }
        .reno-quiz-field .react-tel-input .country-list .search { background: #161616 !important; padding: 10px !important; }
        .reno-quiz-field .react-tel-input .country-list .search-box {
          width: 100% !important; padding: 8px 12px !important;
          border: 1px solid #2c2c2c !important; border-radius: 6px !important;
          margin: 0 !important; background: #0d0d0d !important;
          color: #FFFFFF !important; font-size: 13px !important;
        }
        .reno-quiz-field .react-tel-input .country-list .country { color: #FFFFFF !important; font-size: 13px !important; padding: 8px 10px !important; }
        .reno-quiz-field .react-tel-input .country-list .country .dial-code { color: rgba(255,255,255,0.55) !important; }
        .reno-quiz-field .react-tel-input .country-list .country:hover,
        .reno-quiz-field .react-tel-input .country-list .country.highlight { background: #242424 !important; }

        /* ── Overlay shared styles ── */
        .reno-ov-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .reno-ov-box {
          width: 100%;
          max-width: 960px;
          height: min(680px, 92vh);
          background: #111;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          animation: renoOvEnter 380ms cubic-bezier(0.32, 0.72, 0, 1) both;
        }
        .reno-ov-photo {
          width: 38%;
          flex-shrink: 0;
          object-fit: cover;
          display: block;
        }
        .reno-ov-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .reno-ov-content {
          flex: 1;
          padding: clamp(16px, 2vw, 28px) clamp(20px, 2.6vw, 36px);
          display: flex;
          flex-direction: column;
          gap: 18px;
          overflow-y: auto;
        }
        .reno-ov-content--centered {
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .reno-ov-footer {
          padding: 14px clamp(20px, 2.6vw, 36px);
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-shrink: 0;
        }
        .reno-ov-close {
          width: 32px;
          height: 32px;
          border-radius: 12px;
          background: rgba(255,255,255,0.08);
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 200ms ease;
          flex-shrink: 0;
        }
        .reno-ov-close:hover { background: rgba(255,255,255,0.15); }

        .reno-ov-back-top {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 32px;
          padding: 0 12px;
          border-radius: 12px;
          background: rgba(255,255,255,0.06);
          border: none;
          color: rgba(255,255,255,0.7);
          font-family: inherit;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 200ms ease, color 200ms ease;
        }
        .reno-ov-back-top:hover { background: rgba(255,255,255,0.14); color: #FFFFFF; }

        .reno-ov-step-dots {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .reno-ov-dot {
          height: 48px;
          min-width: 48px;
          padding: 0 14px;
          border-radius: 12px;
          border: none;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: default;
        }
        .reno-ov-dot--done     { background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.7); }
        .reno-ov-dot--active   { background: #FFFFFF; color: #0D0D0D; }
        .reno-ov-dot--upcoming { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.3); }

        /* Number pills — no border */
        .reno-ov-number-pills {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .reno-ov-number-pill {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: none;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.65);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 200ms ease, color 200ms ease;
        }
        .reno-ov-number-pill--active {
          background: #FFFFFF;
          color: #0D0D0D;
        }

        /* Timeline pills — no border */
        .reno-ov-timeline-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .reno-ov-timeline-pill {
          padding: 11px 14px;
          border-radius: 12px;
          border: none;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.65);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 200ms ease, color 200ms ease;
          text-align: left;
        }
        .reno-ov-timeline-pill--active {
          background: #FFFFFF;
          color: #0D0D0D;
        }

        /* Service chips — no border */
        .reno-ov-service-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .reno-ov-chip {
          padding: 9px 16px;
          border-radius: 12px;
          border: none;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.65);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 200ms ease, color 200ms ease;
        }
        .reno-ov-chip--active {
          background: #FFFFFF;
          color: #0D0D0D;
        }

        /* Tag input (Other services) */
        .reno-ov-tag-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .reno-ov-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          min-height: 0;
        }
        .reno-ov-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px 6px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.14);
          color: #FFFFFF;
          font-size: 13px;
          font-weight: 500;
        }
        .reno-ov-tag-remove {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: none;
          padding: 0;
          cursor: pointer;
          color: rgba(255,255,255,0.7);
          transition: background 150ms ease, color 150ms ease;
          flex-shrink: 0;
        }
        .reno-ov-tag-remove:hover { background: rgba(255,255,255,0.28); color: #FFFFFF; }
        .reno-ov-tag-input-row {
          display: flex;
          gap: 8px;
        }
        .reno-ov-tag-input {
          flex: 1;
          background: rgba(255,255,255,0.07);
          border: none;
          border-radius: 12px;
          padding: 11px 14px;
          color: #FFFFFF;
          font-family: inherit;
          font-size: 14px;
          font-weight: 400;
          outline: none;
          min-width: 0;
        }
        .reno-ov-tag-input::placeholder { color: rgba(255,255,255,0.3); }
        .reno-ov-tag-add-btn {
          height: 44px;
          padding: 0 18px;
          border-radius: 12px;
          background: rgba(255,255,255,0.1);
          border: none;
          color: #FFFFFF;
          font-family: inherit;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 200ms ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .reno-ov-tag-add-btn:hover:not(:disabled) { background: rgba(255,255,255,0.18); }
        .reno-ov-tag-add-btn:disabled { opacity: 0.35; cursor: default; }

        .reno-ov-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 2px;
          background: rgba(255,255,255,0.2);
          outline: none;
          cursor: pointer;
        }
        .reno-ov-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #FFFFFF;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        @media (max-width: 640px) {
          .reno-ov-photo { display: none; }
          .reno-ov-box { border-radius: 16px; height: min(86vh, 560px); }
          .reno-ov-timeline-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────
// Overlay — steps 2 + 3
// ─────────────────────────────────────────────
function ProjectOverlay({
  phase,
  size, setSize,
  bedrooms, setBedrooms,
  bathrooms, setBathrooms,
  extTimeline, setExtTimeline,
  services, toggleService,
  otherServiceTags, setOtherServiceTags,
  otherServiceInput, setOtherServiceInput,
  submittingExtended,
  onClose, onNext, onBack, onSubmitExtended,
}: {
  phase: QuizPhase;
  size: number; setSize: (v: number) => void;
  bedrooms: number | null; setBedrooms: (v: number) => void;
  bathrooms: number | null; setBathrooms: (v: number) => void;
  extTimeline: string; setExtTimeline: (v: string) => void;
  services: string[]; toggleService: (s: string) => void;
  otherServiceTags: string[]; setOtherServiceTags: (v: string[]) => void;
  otherServiceInput: string; setOtherServiceInput: (v: string) => void;
  submittingExtended: boolean;
  onClose: () => void; onNext: () => void; onBack: () => void; onSubmitExtended: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const isStep2 = phase === "overlay_2";

  const addTag = () => {
    const trimmed = otherServiceInput.trim();
    if (trimmed && !otherServiceTags.includes(trimmed)) {
      setOtherServiceTags([...otherServiceTags, trimmed]);
    }
    setOtherServiceInput("");
  };

  const removeTag = (tag: string) => {
    setOtherServiceTags(otherServiceTags.filter((t) => t !== tag));
  };

  return (
    <div className="reno-ov-backdrop" onClick={onClose}>
      <div
        className="reno-ov-box"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left photo */}
        <img
          src={isStep2 ? livingAfter : kitchenAfter}
          alt=""
          aria-hidden
          className="reno-ov-photo"
        />

        {/* Right panel */}
        <div className="reno-ov-right">
          {/* Top bar: back (overlay 3 only) left, close right */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px 0 14px", flexShrink: 0, minHeight: 32 }}>
            {!isStep2 ? (
              <button type="button" className="reno-ov-back-top" onClick={onBack} aria-label="Back">
                <ChevronLeft size={14} strokeWidth={2.2} />
                Back
              </button>
            ) : <span />}
            <button className="reno-ov-close" onClick={onClose} aria-label="Close">
              <X size={15} strokeWidth={2} />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="reno-ov-content">
            {/* Heading */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <h3 style={{ color: "#FFFFFF", fontWeight: 600, fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.18, letterSpacing: "-0.018em", margin: 0 }}>
                {isStep2 ? "Project details" : "Services selection"}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>
                {isStep2 ? "Let us know your project details" : "Choose services needed"}
              </p>
            </div>

            {/* ── STEP 2 FIELDS ── */}
            {isStep2 && (
              <>
                {/* Size slider */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 500 }}>Size (in m²)</span>
                    <span style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 700, letterSpacing: "-0.03em" }}>{size}</span>
                  </div>
                  <input type="range" min={0} max={4000} step={10} value={size} onChange={(e) => setSize(Number(e.target.value))} className="reno-ov-range" />
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>0</span>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>4 000</span>
                  </div>
                </div>

                {/* Bedrooms */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 500 }}>Number of bedrooms</span>
                  <div className="reno-ov-number-pills">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <button key={n} type="button" onClick={() => setBedrooms(n)} className={`reno-ov-number-pill${bedrooms === n ? " reno-ov-number-pill--active" : ""}`}>{n}</button>
                    ))}
                  </div>
                </div>

                {/* Bathrooms */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 500 }}>Number of bathrooms</span>
                  <div className="reno-ov-number-pills">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <button key={n} type="button" onClick={() => setBathrooms(n)} className={`reno-ov-number-pill${bathrooms === n ? " reno-ov-number-pill--active" : ""}`}>{n}</button>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 500 }}>How soon do you want to start?</span>
                  <div className="reno-ov-timeline-grid">
                    {TIMELINES.map((t) => (
                      <button key={t} type="button" onClick={() => setExtTimeline(t)} className={`reno-ov-timeline-pill${extTimeline === t ? " reno-ov-timeline-pill--active" : ""}`}>{t}</button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── STEP 3 FIELDS ── */}
            {!isStep2 && (
              <>
                {/* Service chips */}
                <div className="reno-ov-service-chips">
                  {SERVICES.map((s) => (
                    <button key={s} type="button" onClick={() => toggleService(s)} className={`reno-ov-chip${services.includes(s) ? " reno-ov-chip--active" : ""}`}>{s}</button>
                  ))}
                </div>

                {/* Other services — tag input */}
                <div className="reno-ov-tag-section">
                  {otherServiceTags.length > 0 && (
                    <div className="reno-ov-tags-row">
                      {otherServiceTags.map((tag) => (
                        <span key={tag} className="reno-ov-tag">
                          {tag}
                          <button
                            type="button"
                            className="reno-ov-tag-remove"
                            onClick={() => removeTag(tag)}
                            aria-label={`Remove ${tag}`}
                          >
                            <X size={10} strokeWidth={2.5} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="reno-ov-tag-input-row">
                    <input
                      type="text"
                      className="reno-ov-tag-input"
                      placeholder="Other services…"
                      value={otherServiceInput}
                      onChange={(e) => setOtherServiceInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") { e.preventDefault(); addTag(); }
                      }}
                      maxLength={60}
                    />
                    <button
                      type="button"
                      className="reno-ov-tag-add-btn"
                      onClick={addTag}
                      disabled={!otherServiceInput.trim()}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="reno-ov-footer">
            <div className="reno-ov-step-dots">
              <span className="reno-ov-dot reno-ov-dot--done">✓</span>
              <span className={`reno-ov-dot ${isStep2 ? "reno-ov-dot--active" : "reno-ov-dot--done"}`}>
                {isStep2 ? "02" : "✓"}
              </span>
              <span className={`reno-ov-dot ${isStep2 ? "reno-ov-dot--upcoming" : "reno-ov-dot--active"}`}>03</span>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {isStep2 ? (
                <ArrowButton as="button" type="button" variant="dark-on-light" hideArrow onClick={onNext} style={{ height: 48, padding: "0 28px" }}>
                  Next
                </ArrowButton>
              ) : (
                <ArrowButton as="button" type="button" variant="dark-on-light" hideArrow disabled={submittingExtended} onClick={onSubmitExtended} style={{ height: 48, padding: "0 28px" }}>
                  {submittingExtended ? "Sending…" : "Submit"}
                </ArrowButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Final success — same overlay structure as steps 2 + 3
// ─────────────────────────────────────────────
function FinalSuccessModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="reno-ov-backdrop" onClick={onClose}>
      <div
        className="reno-ov-box"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left photo */}
        <img
          src={livingAfter}
          alt=""
          aria-hidden
          className="reno-ov-photo"
        />

        {/* Right panel — centered success content */}
        <div className="reno-ov-right">
          {/* Close button top-right */}
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 14px 0 14px", flexShrink: 0 }}>
            <button className="reno-ov-close" onClick={onClose} aria-label="Close">
              <X size={15} strokeWidth={2} />
            </button>
          </div>

          {/* Centered content */}
          <div className="reno-ov-content reno-ov-content--centered" style={{ gap: 20 }}>
            {/* Check icon */}
            <div style={{ width: 60, height: 60, borderRadius: 999, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.16)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Check size={26} strokeWidth={2.5} color="#FFFFFF" />
            </div>

            {/* Text */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 280 }}>
              <h3 style={{ color: "#FFFFFF", fontWeight: 600, fontSize: "clamp(18px, 1.9vw, 22px)", lineHeight: 1.22, letterSpacing: "-0.018em", margin: 0 }}>
                All done — you're at the front of the queue.
              </h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.55, margin: 0 }}>
                Our team will reach out to you ahead of schedule.
              </p>
            </div>

            {/* Close CTA */}
            <ArrowButton as="button" type="button" variant="dark-on-light" hideArrow onClick={onClose} style={{ minWidth: 160 }}>
              Done
            </ArrowButton>
          </div>
        </div>
      </div>
    </div>
  );
}
