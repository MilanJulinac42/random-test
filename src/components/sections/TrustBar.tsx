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
    <section className="bg-background border-y border-border py-8">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="hidden md:flex items-center justify-around">
          {items.map(({ Icon, label }, i) => (
            <div key={label} className="flex items-center gap-2">
              <Icon size={20} className="text-primary" />
              <span className="text-muted-foreground text-sm">{label}</span>
              {i < items.length - 1 && (
                <span className="bg-border ml-4" style={{ width: 1, height: 24 }} />
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:hidden gap-6">
          {items.map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon size={20} className="text-primary" />
              <span className="text-muted-foreground text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
