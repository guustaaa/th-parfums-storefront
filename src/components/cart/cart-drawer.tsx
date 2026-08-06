"use client";

import Image from "next/image";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "./cart-provider";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/site/icons";
import { formatBRL } from "@/lib/format";
import { cartOrderMessage, whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function CartDrawer({
  whatsappNumber,
  freeShippingThresholdCents,
}: {
  whatsappNumber: string;
  freeShippingThresholdCents: number;
}) {
  const { items, isOpen, close, setQty, removeItem, subtotalCents } = useCart();

  // Lock body scroll while open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const remaining = Math.max(0, freeShippingThresholdCents - subtotalCents);
  const progress = Math.min(
    100,
    (subtotalCents / freeShippingThresholdCents) * 100,
  );

  return (
    <>
      <div
        onClick={close}
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!isOpen}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Sacola de compras"
        className={cn(
          "fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col border-l border-border bg-bg shadow-2xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-xl">Sua sacola</h2>
          <button
            onClick={close}
            aria-label="Fechar sacola"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="font-display text-lg text-foreground">
              Sua sacola está vazia
            </p>
            <p className="max-w-xs text-sm text-muted">
              Explore nossas fragrâncias e adicione seus favoritos.
            </p>
            <Button variant="outline" onClick={close} className="mt-2">
              Continuar explorando
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {items.map((l) => (
                  <li key={l.variantId} className="flex gap-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg product-spotlight">
                      {l.image && (
                        <Image
                          src={l.image}
                          alt={l.name}
                          fill
                          sizes="80px"
                          className="object-contain p-2"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <div>
                          <p className="font-display text-base leading-tight">
                            {l.name}
                          </p>
                          <p className="text-xs text-faint">{l.volumeMl}ml</p>
                        </div>
                        <button
                          onClick={() => removeItem(l.variantId)}
                          aria-label={`Remover ${l.name}`}
                          className="text-faint transition-colors hover:text-danger cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-border">
                          <button
                            onClick={() => setQty(l.variantId, l.qty - 1)}
                            aria-label="Diminuir quantidade"
                            className="flex h-8 w-8 items-center justify-center text-muted hover:text-foreground cursor-pointer"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm tabular-nums">
                            {l.qty}
                          </span>
                          <button
                            onClick={() => setQty(l.variantId, l.qty + 1)}
                            aria-label="Aumentar quantidade"
                            className="flex h-8 w-8 items-center justify-center text-muted hover:text-foreground cursor-pointer"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="font-display tabular-nums">
                          {formatBRL(l.priceCents * l.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-border px-5 py-4">
              <div className="mb-3">
                {remaining > 0 ? (
                  <p className="text-xs text-muted">
                    Faltam{" "}
                    <span className="text-foreground">
                      {formatBRL(remaining)}
                    </span>{" "}
                    para o frete grátis
                  </p>
                ) : (
                  <p className="text-xs text-success">
                    Você ganhou frete grátis!
                  </p>
                )}
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className="h-full bg-[linear-gradient(90deg,#9a9a9a,#ededed)] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-muted">Subtotal</span>
                <span className="font-display text-xl tabular-nums">
                  {formatBRL(subtotalCents)}
                </span>
              </div>
              <a
                href={whatsappLink(
                  whatsappNumber,
                  cartOrderMessage(items, subtotalCents),
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="lg" className="w-full">
                  <WhatsappIcon className="h-5 w-5" /> Finalizar pelo WhatsApp
                </Button>
              </a>
              <p className="mt-2 text-center text-[0.7rem] text-faint">
                Pagamento seguro combinado diretamente com nossa equipe
              </p>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
