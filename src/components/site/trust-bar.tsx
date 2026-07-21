import { BadgeCheck, Crown, Gem } from "lucide-react";

const ITEMS = [
  {
    icon: Crown,
    title: "100% originais",
    text: "Perfumes importados, sempre autênticos.",
  },
  {
    icon: BadgeCheck,
    title: "Consultoria personalizada",
    text: "Ajudamos você a escolher o perfume certo.",
  },
  {
    icon: Gem,
    title: "Árabes, designers e nicho",
    text: "Uma curadoria para todos os gostos.",
  },
];

export function TrustBar() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-page grid gap-6 py-8 sm:grid-cols-3">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-strong text-silver">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-base text-foreground">{title}</p>
              <p className="text-sm text-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
