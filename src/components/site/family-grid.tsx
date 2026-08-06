import Link from "next/link";
import { FAMILY_LABELS } from "@/lib/site";
import { OLFACTORY_FAMILIES } from "@/lib/types";

const BLURB: Record<string, string> = {
  amadeirado: "Madeiras quentes e secas",
  oriental: "Âmbar, baunilha e especiarias",
  floral: "Buquês elegantes e marcantes",
  citrico: "Frescor vibrante e luminoso",
  frutal: "Doce, suculento e jovem",
  aromatico: "Herbal, limpo e versátil",
};

export function FamilyGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {OLFACTORY_FAMILIES.map((fam) => (
        <Link
          key={fam}
          href={`/perfumes?familia=${fam}`}
          className="group flex flex-col gap-1 rounded-[var(--radius-card)] border border-border bg-surface p-5 transition-colors hover:border-silver"
        >
          <span className="font-display text-lg text-foreground transition-colors group-hover:text-metallic">
            {FAMILY_LABELS[fam]}
          </span>
          <span className="text-xs text-faint">{BLURB[fam]}</span>
        </Link>
      ))}
    </div>
  );
}
