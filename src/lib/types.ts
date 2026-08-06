export type Gender = "masc" | "fem" | "unisex";

export const OLFACTORY_FAMILIES = [
  "amadeirado",
  "oriental",
  "floral",
  "citrico",
  "frutal",
  "aromatico",
] as const;

export type OlfactoryFamily = (typeof OLFACTORY_FAMILIES)[number];

export interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  sort: number;
  is_primary: boolean;
}

export interface ProductVariant {
  id: string;
  volume_ml: number;
  price_cents: number;
  sale_price_cents: number | null;
  sku: string | null;
  stock: number | null;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string | null;
  description: string | null;
  gender: Gender;
  family: OlfactoryFamily | null;
  inspired_by: string | null;
  is_featured: boolean;
  is_new: boolean;
  is_active: boolean;
  sort: number;
  notes: { top?: string[]; heart?: string[]; base?: string[] } | null;
  images: ProductImage[];
  variants: ProductVariant[];
}

export interface SiteSettings {
  whatsapp_number: string;
  hero_title: string;
  hero_subtitle: string;
  announcement_text: string;
  free_shipping_threshold_cents: number;
  instagram_url: string | null;
}

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  brand: string | null;
  image: string | null;
  variantId: string;
  volumeMl: number;
  priceCents: number; // effective unit price (sale if present)
  qty: number;
}
