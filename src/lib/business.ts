/**
 * Fixed brand / contact info (from the TH Parfums WhatsApp business profile).
 * The WhatsApp number is also the editable default in settings; everything
 * else here is static brand data used across footer and the About page.
 */
export const BUSINESS = {
  name: "TH Parfums",
  email: "thparfums@gmail.com",
  /** Digits only, for wa.me links. (+55 54 92000-4118) */
  whatsapp: "5554920004118",
  phoneDisplay: "+55 54 92000-4118",
  address: "Rua do Guia Lopes, 644 — Centro",
  city: "Caxias do Sul / RS",
  cep: "95020-390",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Rua+do+Guia+Lopes,+644,+Centro,+Caxias+do+Sul+RS,+95020-390",
  /** Keyless embeddable map (works in an <iframe>). */
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Rua+do+Guia+Lopes,+644,+Centro,+Caxias+do+Sul+RS,+95020-390&z=16&output=embed",
  hours: "Seg a Sáb · 9h às 19h",
  highlights: [
    "Importados 100% originais",
    "Consultoria personalizada",
    "Árabes, designers e nicho",
  ],
} as const;
