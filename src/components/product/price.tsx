import { cn } from "@/lib/utils";
import {
  anyOnSale,
  formatBRL,
  fromPriceCents,
  installmentLabel,
} from "@/lib/format";
import type { Product } from "@/lib/types";

/** Compact "a partir de" price for cards. */
export function PriceTag({ product }: { product: Product }) {
  const from = fromPriceCents(product);
  if (from == null) return null;
  const sale = anyOnSale(product);
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-[0.7rem] text-faint">a partir de</span>
      <span
        className={cn(
          "font-display text-lg tabular-nums",
          sale ? "text-red-300" : "text-foreground",
        )}
      >
        {formatBRL(from)}
      </span>
    </div>
  );
}

/** Full price block for the product page, given the selected variant price. */
export function PriceBlock({
  priceCents,
  originalCents,
}: {
  priceCents: number;
  originalCents?: number | null;
}) {
  const onSale = originalCents != null && originalCents > priceCents;
  return (
    <div className="space-y-1">
      <div className="flex items-end gap-3">
        <span className="font-display text-3xl tabular-nums text-foreground">
          {formatBRL(priceCents)}
        </span>
        {onSale && (
          <span className="mb-1 text-base text-faint line-through tabular-nums">
            {formatBRL(originalCents)}
          </span>
        )}
      </div>
      <p className="text-xs text-muted">
        ou {installmentLabel(priceCents)} · à vista no Pix
      </p>
    </div>
  );
}
