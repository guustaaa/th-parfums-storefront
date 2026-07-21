import type { Product, ProductVariant } from "./types";

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** Format integer cents as Brazilian Real, e.g. 12990 -> "R$ 129,90". */
export function formatBRL(cents: number): string {
  return brl.format(cents / 100);
}

/** Effective unit price for a variant (sale price when present). */
export function effectivePrice(v: ProductVariant): number {
  return v.sale_price_cents ?? v.price_cents;
}

export function isOnSale(v: ProductVariant): boolean {
  return v.sale_price_cents != null && v.sale_price_cents < v.price_cents;
}

export function discountPct(v: ProductVariant): number | null {
  if (!isOnSale(v)) return null;
  return Math.round((1 - (v.sale_price_cents as number) / v.price_cents) * 100);
}

/** Lowest effective price across a product's variants ("a partir de"). */
export function fromPriceCents(p: Product): number | null {
  if (!p.variants.length) return null;
  return Math.min(...p.variants.map(effectivePrice));
}

export function anyOnSale(p: Product): boolean {
  return p.variants.some(isOnSale);
}

/** Up-to-3x interest-free installment label, common in BR retail. */
export function installmentLabel(cents: number, max = 3): string {
  return `${max}x de ${formatBRL(Math.round(cents / max))} sem juros`;
}

export function primaryImage(p: Product): string | null {
  if (!p.images.length) return null;
  return (p.images.find((i) => i.is_primary) ?? p.images[0]).url;
}
