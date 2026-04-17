import { Shield, BadgeCheck, Star, Home, Smartphone } from "lucide-react";

const items = [
  { Icon: Shield, label: "Fully Insured Projects" },
  { Icon: BadgeCheck, label: "Dubai Economy Licensed" },
  { Icon: Star, label: "4.9 / 5 on Google" },
  { Icon: Home, label: "200+ Homes Delivered" },
  { Icon: Smartphone, label: "App on iOS & Android" },
];

export function TrustBar() {
  return (
    <section
      style={{
        background: "#141414",
        borderTop: "1px solid #1F1F1F",
        borderBottom: "1px solid #1F1F1F",
        padding: "32px 0",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="hidden md:flex items-center justify-around">
          {items.map(({ Icon, label }, i) => (
            <div key={label} className="flex items-center" style={{ gap: 8 }}>
              <Icon size={20} color="#C9A96E" />
              <span style={{ fontWeight: 400, fontSize: 13, color: "#8C8C82" }}>{label}</span>
              {i < items.length - 1 && (
                <span style={{ width: 1, height: 24, background: "#1F1F1F", marginLeft: 16 }} />
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:hidden gap-6">
          {items.map(({ Icon, label }) => (
            <div key={label} className="flex items-center" style={{ gap: 8 }}>
              <Icon size={20} color="#C9A96E" />
              <span style={{ fontWeight: 400, fontSize: 13, color: "#8C8C82" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
