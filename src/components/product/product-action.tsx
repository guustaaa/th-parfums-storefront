"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriceBlock } from "./price";
import { useCart } from "@/components/cart/cart-provider";
import { effectivePrice, isOnSale, primaryImage } from "@/lib/format";
import { cn } from "@/lib/utils";
import { interestMessage, whatsappLink } from "@/lib/whatsapp";
import { WhatsappIcon } from "@/components/site/icons";
import type { Product } from "@/lib/types";

export function ProductAction({
  product,
  whatsappNumber,
}: {
  product: Product;
  whatsappNumber: string;
}) {
  const { addItem } = useCart();
  const variants = [...product.variants].sort(
    (a, b) => a.volume_ml - b.volume_ml,
  );
  const [selectedId, setSelectedId] = useState(variants[0]?.id);
  const [added, setAdded] = useState(false);

  const selected = variants.find((v) => v.id === selectedId) ?? variants[0];
  if (!selected) return null;

  function add() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      image: primaryImage(product),
      variantId: selected.id,
      volumeMl: selected.volume_ml,
      priceCents: effectivePrice(selected),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div className="space-y-6">
      <PriceBlock
        priceCents={effectivePrice(selected)}
        originalCents={isOnSale(selected) ? selected.price_cents : null}
      />

      <div className="space-y-2">
        <span className="eyebrow">Tamanho</span>
        <div className="flex flex-wrap gap-2">
          {variants.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setSelectedId(v.id)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver/50",
                v.id === selected.id
                  ? "border-silver bg-surface-2 text-foreground"
                  : "border-border text-muted hover:border-border-strong hover:text-foreground",
              )}
            >
              {v.volume_ml}ml
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="metallic"
          size="lg"
          onClick={add}
          className="flex-1"
        >
          {added ? (
            <>
              <Check className="h-5 w-5" /> Adicionado
            </>
          ) : (
            <>
              <ShoppingBag className="h-5 w-5" /> Adicionar à sacola
            </>
          )}
        </Button>
        <a
          href={whatsappLink(
            whatsappNumber,
            interestMessage(product.name, selected.volume_ml),
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:w-auto"
        >
          <Button variant="outline" size="lg" className="w-full">
            <WhatsappIcon className="h-5 w-5" /> Tirar dúvida
          </Button>
        </a>
      </div>
      <p className="text-xs text-faint">
        Pagamento e entrega combinados pelo WhatsApp · Estoque limitado
      </p>
    </div>
  );
}
