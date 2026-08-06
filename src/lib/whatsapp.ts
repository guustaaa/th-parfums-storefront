import type { CartLine } from "./types";
import { formatBRL } from "./format";

/** Strip everything but digits from a stored WhatsApp number. */
export function normalizeWhatsapp(num: string): string {
  return num.replace(/\D/g, "");
}

export function whatsappLink(num: string, message: string): string {
  const phone = normalizeWhatsapp(num);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** Pre-filled "tenho interesse" message for a single product. */
export function interestMessage(productName: string, volumeMl?: number): string {
  const size = volumeMl ? ` (${volumeMl}ml)` : "";
  return `Olá THPARFUMS! Tenho interesse no perfume *${productName}*${size}. Pode me passar mais informações?`;
}

/** Pre-filled order message composed from the cart (interim checkout). */
export function cartOrderMessage(lines: CartLine[], totalCents: number): string {
  const items = lines
    .map(
      (l) =>
        `• ${l.name} ${l.volumeMl}ml — ${l.qty}x ${formatBRL(l.priceCents)}`,
    )
    .join("\n");
  return [
    "Olá THPARFUMS! Quero finalizar meu pedido:",
    "",
    items,
    "",
    `*Total: ${formatBRL(totalCents)}*`,
    "",
    "Pode confirmar disponibilidade e formas de pagamento?",
  ].join("\n");
}
