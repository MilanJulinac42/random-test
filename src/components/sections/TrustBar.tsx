import { Shield, BadgeCheck, Star, Home, Smartphone } from "lucide-react";

const items = [
  { Icon: Shield, label: "Fully insured projects" },
  { Icon: BadgeCheck, label: "Licensed by Dubai Economy" },
  { Icon: Star, label: "Written on-time guarantee" },
  { Icon: Home, label: "200+ Homes Delivered" },
  { Icon: Smartphone, label: "4.9 / 5 on Google" },
];

export function TrustBar() {
  return (
    <section
      className="py-5 md:py-8"
      style={{ backgroundColor: "#0D0D0D", borderTop: "1px solid #1E1E1E", borderBottom: "1px solid #1E1E1E" }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="hidden md:flex items-center justify-around">
          {items.map(({ Icon, label }, i) => (
            <div key={label} className="flex items-center gap-2">
              <Icon size={22} style={{ color: "#482FFF" }} />
              <span style={{ color: "#CCC", fontSize: 16, fontWeight: 500 }}>{label}</span>
              {i < items.length - 1 && (
                <span className="ml-4" style={{ width: 1, height: 24, backgroundColor: "#1E1E1E" }} />
              )}
            </div>
          ))}
        </div>
        <div
          className="md:hidden flex items-center overflow-x-auto no-scrollbar"
          style={{ gap: 14, whiteSpace: "nowrap" }}
        >
          {items.map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 shrink-0">
              <Icon size={14} style={{ color: "#482FFF" }} />
              <span style={{ color: "#CCC", fontSize: 11, fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
