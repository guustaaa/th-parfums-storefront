import { cn } from "@/lib/utils";

type Tone = "neutral" | "silver" | "sale" | "new";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-2 text-muted border border-border",
  silver:
    "text-bg bg-[linear-gradient(180deg,#f0f0f0,#bdbdbd)] border border-white/20",
  sale: "bg-danger/15 text-red-300 border border-danger/30",
  new: "bg-foreground text-bg border border-white/20",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
