import { BUSINESS } from "./business";
import type { Gender, OlfactoryFamily, SiteSettings } from "./types";

/** Fallback site settings used when Supabase has no settings row. */
export const DEFAULT_SETTINGS: SiteSettings = {
  whatsapp_number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || BUSINESS.whatsapp,
  hero_title: "A assinatura que fica na memória",
  hero_subtitle:
    "Importados 100% originais — árabes, designers e nicho. Consultoria personalizada para você encontrar a sua assinatura olfativa.",
  announcement_text:
    "Perfumes importados 100% originais · Consultoria personalizada pelo WhatsApp",
  free_shipping_threshold_cents: 19900,
  instagram_url: "https://instagram.com",
};

export const GENDER_LABELS: Record<Gender, string> = {
  masc: "Masculino",
  fem: "Feminino",
  unisex: "Unissex",
};

export const FAMILY_LABELS: Record<OlfactoryFamily, string> = {
  amadeirado: "Amadeirado",
  oriental: "Oriental",
  floral: "Floral",
  citrico: "Cítrico",
  frutal: "Frutal",
  aromatico: "Aromático",
};

export const MAIN_NAV = [
  { label: "Masculinos", href: "/perfumes?genero=masc" },
  { label: "Femininos", href: "/perfumes?genero=fem" },
  { label: "Unissex", href: "/perfumes?genero=unisex" },
  { label: "Todos", href: "/perfumes" },
  { label: "Sobre", href: "/sobre" },
] as const;
