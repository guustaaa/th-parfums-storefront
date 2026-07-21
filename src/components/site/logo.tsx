import { cn } from "@/lib/utils";

/** Crown mark recreated as crisp vector, matching the THPARFUMS brand. */
export function CrownMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 70"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10,52 L12,22 L21.5,46 L31,14 L40.5,40 L50,8 L59.5,40 L69,14 L78.5,46 L88,22 L90,52 Z" />
      <rect x="8" y="52" width="84" height="10" rx="2.5" />
      <circle cx="12" cy="22" r="3.4" />
      <circle cx="31" cy="14" r="3.4" />
      <circle cx="50" cy="8" r="3.6" />
      <circle cx="69" cy="14" r="3.4" />
      <circle cx="88" cy="22" r="3.4" />
    </svg>
  );
}

type Variant = "stacked" | "horizontal" | "mark";

export function Logo({
  variant = "horizontal",
  className,
  wordClassName,
}: {
  variant?: Variant;
  className?: string;
  wordClassName?: string;
}) {
  if (variant === "mark") {
    return <CrownMark className={cn("text-foreground", className)} />;
  }

  const word = (
    <span
      className={cn(
        "font-display font-semibold tracking-[0.2em] text-foreground leading-none",
        wordClassName,
      )}
    >
      THPARFUMS
    </span>
  );

  if (variant === "stacked") {
    return (
      <span
        className={cn(
          "inline-flex flex-col items-center gap-1.5 text-foreground",
          className,
        )}
      >
        <CrownMark className="h-7 w-auto" />
        {word}
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex items-center gap-2.5 text-foreground", className)}
    >
      <CrownMark className="h-5 w-auto md:h-6" />
      {word}
    </span>
  );
}
