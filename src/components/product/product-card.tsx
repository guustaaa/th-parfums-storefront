import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PriceTag } from "./price";
import { QuickAdd } from "./quick-add";
import { anyOnSale, discountPct, primaryImage } from "@/lib/format";
import { FAMILY_LABELS, GENDER_LABELS } from "@/lib/site";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const img = primaryImage(product);
  const sale = anyOnSale(product);
  const pct = product.variants.map(discountPct).find((p) => p != null) ?? null;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface transition-colors duration-200 hover:border-border-strong">
      <Link
        href={`/perfumes/${product.slug}`}
        className="relative block aspect-[4/5] product-spotlight"
      >
        {img && (
          <Image
            src={img}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.05]"
          />
        )}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.is_new && <Badge tone="new">Novo</Badge>}
          {sale && <Badge tone="sale">-{pct}%</Badge>}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-wider text-faint">
          <span>{GENDER_LABELS[product.gender]}</span>
          {product.family && (
            <>
              <span aria-hidden>·</span>
              <span>{FAMILY_LABELS[product.family]}</span>
            </>
          )}
        </div>
        <Link href={`/perfumes/${product.slug}`} className="flex-1">
          <h3 className="line-clamp-2 min-h-[2.6em] font-display text-lg leading-tight text-foreground transition-colors group-hover:text-metallic">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <PriceTag product={product} />
          <QuickAdd product={product} />
        </div>
      </div>
    </div>
  );
}
