"use client";

import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { effectivePrice, primaryImage } from "@/lib/format";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Adds the smallest variant straight to the cart from a product card. */
export function QuickAdd({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [done, setDone] = useState(false);

  const variant = [...product.variants].sort(
    (a, b) => a.volume_ml - b.volume_ml,
  )[0];
  if (!variant) return null;

  function add() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      image: primaryImage(product),
      variantId: variant.id,
      volumeMl: variant.volume_ml,
      priceCents: effectivePrice(variant),
    });
    setDone(true);
    setTimeout(() => setDone(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={add}
      aria-label={`Adicionar ${product.name} à sacola`}
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-strong text-foreground transition-all duration-200 hover:border-silver hover:bg-surface-2 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver/60",
        done && "border-success text-success",
      )}
    >
      {done ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
    </button>
  );
}
