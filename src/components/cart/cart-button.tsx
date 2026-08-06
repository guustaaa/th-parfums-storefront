"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "./cart-provider";

export function CartButton() {
  const { count, toggle } = useCart();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Abrir sacola (${count} ${count === 1 ? "item" : "itens"})`}
      className="relative flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver/60"
    >
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[linear-gradient(180deg,#f0f0f0,#bdbdbd)] px-1 text-[0.65rem] font-bold text-bg tabular-nums">
          {count}
        </span>
      )}
    </button>
  );
}
