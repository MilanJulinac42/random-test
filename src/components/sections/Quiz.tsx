import { useState } from "react";
import { z } from "zod";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { WHATSAPP_POSTLEAD } from "@/lib/constants";

type IconProps = { active: boolean };

const KitchenIcon = ({ active }: IconProps) => {
  const stroke = active ? "#FFFFFF" : "#0D0D0D";
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="5" y="11" width="22" height="16" rx="1.5" stroke={stroke} strokeWidth="1.5" />
      <line x1="5" y1="17" x2="27" y2="17" stroke={stroke} strokeWidth="1.5" />
      <circle cx="11" cy="22" r="2" stroke={stroke} strokeWidth="1.5" />
      <circle cx="21" cy="22" r="2" stroke={stroke} strokeWidth="1.5" />
      <line x1="10" y1="11" x2="10" y2="6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="11" x2="16" y2="6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="11" x2="22" y2="6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

const BathroomIcon = ({ active }: IconProps) => {
  const stroke = active ? "#FFFFFF" : "#0D0D0D";
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M5 17 H27 V20 A5 5 0 0 1 22 25 H10 A5 5 0 0 1 5 20 Z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 17 V8 A2.5 2.5 0 0 1 14 8" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="11" x2="16" y2="11" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="27" x2="9" y2="29" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="23" y1="27" x2="23" y2="29" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

const BedroomIcon = ({ active }: IconProps) => {
  const stroke = active ? "#FFFFFF" : "#0D0D0D";
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M4 22 V13 H17 A6 6 0 0 1 23 19 V22" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M4 22 H28 V25" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 22 V19 A2 2 0 0 0 26 17 H23" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="9" cy="16.5" r="2" stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
};

const HouseIcon = ({ active }: IconProps) => {
  const stroke = active ? "#FFFFFF" : "#0D0D0D";
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M5 14 L16 5 L27 14 V26 A1 1 0 0 1 26 27 H6 A1 1 0 0 1 5 26 Z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M13 27 V18 H19 V27" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};

const TILES = [
  { key: "Kitchen", label: "Kitchen", sub: "Cooking & dining", Icon: KitchenIcon },
  { key: "Bathroom(s)", label: "Bathroom(s)", sub: "One or more", Icon: BathroomIcon },
  { key: "Bedroom(s)", label: "Bedroom(s)", sub: "Master or guest", Icon: BedroomIcon },
  { key: "Full home / villa", label: "Full home / villa", sub: "End-to-end", Icon: HouseIcon },
] as const;

const BUDGETS = ["AED 100k – 200k", "AED 200k – 500k", "AED 500k+"] as const;

const leadSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(30, "Phone number is too long")
    .regex(/^[0-9+\-()\s]+$/, "Phone number contains invalid characters"),
  rooms: z.array(z.string()).min(1, "Please select at least one area"),
  budget: z.string().min(1, "Please select a budget range"),
});

export function Quiz() {
  const [rooms, setRooms] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleRoom = (key: string) =>
    setRooms((prev) => (prev.includes(key) ? prev.filter((r) => r !== key) : [...prev, key]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = leadSchema.safeParse({ name, phone, rooms, budget });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please complete all fields.");
      return;
    }

    setSubmitting(true);
    try {
      const { error: dbError } = await supabase.from("lead_submissions").insert({
        name: parsed.data.name,
        phone: parsed.data.phone,
        area: "—",
        rooms: parsed.data.rooms,
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
          <h2
            className="text-center"
            style={{
              fontSize: "clamp(36px, 5.5vw, 52px)",
              fontWeight: 700,
              color: "#0D0D0D",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            What are you
            <br />
            planning?
          </h2>
          <p
            className="text-center mx-auto mt-5"
            style={{ fontSize: 15, color: "#777", maxWidth: 480, lineHeight: 1.55 }}
          >
            Tell us what you're thinking. We'll confirm availability and call you back within 24 hours.
          </p>
        </Reveal>

        {submitted ? (
          <Reveal>
            <div className="mx-auto text-center mt-12" style={{ maxWidth: 480 }}>
              <svg width="56" height="56" viewBox="0 0 64 64" className="mx-auto" aria-hidden>
                <circle cx="32" cy="32" r="28" fill="none" stroke="#0D0D0D" strokeWidth="2" />
                <path d="M20 33 L29 42 L45 24" fill="none" stroke="#0D0D0D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="mt-6" style={{ fontSize: 28, fontWeight: 700, color: "#0D0D0D" }}>
                You're on the list.
              </h3>
              <p className="mt-3" style={{ fontSize: 15, color: "#777", lineHeight: 1.55 }}>
                We'll reach out via WhatsApp within 24 hours to confirm your assessment.
              </p>
              <a
                href={WHATSAPP_POSTLEAD}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center mt-6"
                style={{
                  background: "#0D0D0D",
                  color: "white",
                  borderRadius: 8,
                  padding: "14px 28px",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                WhatsApp us now
              </a>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <form onSubmit={handleSubmit} className="mt-12">
              {/* Scope tiles 2x2 */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 mx-auto"
                style={{ maxWidth: 480, gap: 12 }}
              >
                {TILES.map((t) => {
                  const active = rooms.includes(t.key);
                  return (
                    <button
                      type="button"
                      key={t.key}
                      onClick={() => toggleRoom(t.key)}
                      className="text-left transition-colors"
                      style={{
                        background: active ? "#0D0D0D" : "#FFFFFF",
                        border: `1.5px solid ${active ? "#0D0D0D" : "#E0E0E0"}`,
                        borderRadius: 12,
                        padding: 20,
                        cursor: "pointer",
                      }}
                      aria-pressed={active}
                    >
                      <t.Icon active={active} />
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: active ? "#FFFFFF" : "#0D0D0D",
                          marginTop: 12,
                        }}
                      >
                        {t.label}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: active ? "#AAAAAA" : "#888888",
                          marginTop: 2,
                        }}
                      >
                        {t.sub}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Budget pills */}
              <div
                className="flex flex-wrap items-center justify-center"
                style={{ marginTop: 24, gap: 10 }}
              >
                {BUDGETS.map((b) => {
                  const active = budget === b;
                  return (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBudget(b)}
                      className="transition-colors"
                      style={{
                        border: `1.5px solid ${active ? "#0D0D0D" : "#DDDDDD"}`,
                        background: active ? "#0D0D0D" : "#FFFFFF",
                        color: active ? "#FFFFFF" : "#555555",
                        borderRadius: 20,
                        padding: "10px 24px",
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                      aria-pressed={active}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>

              {/* Fields */}
              <div
                className="mx-auto flex flex-col"
                style={{ maxWidth: 400, marginTop: 24, gap: 12 }}
              >
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  maxLength={100}
                  onChange={(e) => setName(e.target.value)}
                  className="reno-lead-input"
                  style={{
                    border: "1.5px solid #DDDDDD",
                    borderRadius: 8,
                    padding: "14px 16px",
                    fontSize: 15,
                    background: "white",
                    color: "#0D0D0D",
                    outline: "none",
                    width: "100%",
                  }}
                />
                <input
                  type="tel"
                  placeholder="WhatsApp number (e.g. +971 50...)"
                  value={phone}
                  maxLength={30}
                  onChange={(e) => setPhone(e.target.value)}
                  className="reno-lead-input"
                  style={{
                    border: "1.5px solid #DDDDDD",
                    borderRadius: 8,
                    padding: "14px 16px",
                    fontSize: 15,
                    background: "white",
                    color: "#0D0D0D",
                    outline: "none",
                    width: "100%",
                  }}
                />

                {error && (
                  <p style={{ fontSize: 13, color: "#B91C1C", marginTop: 2 }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="reno-btn-purple"
                  style={{
                    borderRadius: 8,
                    padding: 16,
                    fontSize: 15,
                    fontWeight: 600,
                    width: "100%",
                    cursor: submitting ? "wait" : "pointer",
                  }}
                >
                  {submitting ? "Sending..." : "Get my project assessment →"}
                </button>

                <p
                  className="text-center"
                  style={{ fontSize: 12, color: "#6B6B6B", marginTop: 12, lineHeight: 1.5 }}
                >
                  We assess 15–20 new projects each month. You'll hear from us within 24 hours.
                </p>
              </div>
            </form>
          </Reveal>
        )}
      </div>

      <style>{`
        .reno-lead-input:focus {
          border-color: #4A24FF !important;
          box-shadow: 0 0 0 3px rgba(74, 36, 255, 0.18) !important;
        }
      `}</style>
    </section>
  );
}
