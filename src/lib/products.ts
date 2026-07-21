import "server-only";
import { SEED_PRODUCTS } from "@/data/seed";
import { isSupabaseConfigured } from "./env";
import { createPublicSupabase } from "./supabase/public";
import type { Gender, OlfactoryFamily, Product } from "./types";

interface DbRow {
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
  notes: Product["notes"];
  product_variants: Product["variants"];
  product_images: Product["images"];
}

function rowToProduct(r: DbRow): Product {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    brand: r.brand,
    description: r.description,
    gender: r.gender,
    family: r.family,
    inspired_by: r.inspired_by,
    is_featured: r.is_featured,
    is_new: r.is_new,
    is_active: r.is_active,
    sort: r.sort,
    notes: r.notes ?? null,
    images: [...(r.product_images ?? [])].sort((a, b) => a.sort - b.sort),
    variants: [...(r.product_variants ?? [])].sort(
      (a, b) => a.volume_ml - b.volume_ml,
    ),
  };
}

/** All active products, from Supabase when configured else local seed. */
export async function getActiveProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    return SEED_PRODUCTS.filter((p) => p.is_active);
  }
  try {
    const supabase = createPublicSupabase();
    const { data, error } = await supabase
      .from("products")
      .select(
        "*, product_variants(*), product_images(*)",
      )
      .eq("is_active", true)
      .order("sort", { ascending: true });
    if (error || !data) throw error ?? new Error("no data");
    return (data as DbRow[]).map(rowToProduct);
  } catch (e) {
    console.error("[products] Supabase fetch failed, using seed:", e);
    return SEED_PRODUCTS.filter((p) => p.is_active);
  }
}

export interface CatalogFilters {
  gender?: Gender;
  family?: OlfactoryFamily;
  sort?: "relevancia" | "preco-asc" | "preco-desc" | "novidades";
  search?: string;
}

function lowestPrice(p: Product): number {
  const prices = p.variants.map((v) => v.sale_price_cents ?? v.price_cents);
  return prices.length ? Math.min(...prices) : Infinity;
}

export async function getCatalog(filters: CatalogFilters = {}): Promise<
  Product[]
> {
  let items = await getActiveProducts();
  if (filters.gender) items = items.filter((p) => p.gender === filters.gender);
  if (filters.family) items = items.filter((p) => p.family === filters.family);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.brand ?? "").toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q),
    );
  }
  switch (filters.sort) {
    case "preco-asc":
      items = [...items].sort((a, b) => lowestPrice(a) - lowestPrice(b));
      break;
    case "preco-desc":
      items = [...items].sort((a, b) => lowestPrice(b) - lowestPrice(a));
      break;
    case "novidades":
      items = [...items].sort(
        (a, b) => Number(b.is_new) - Number(a.is_new) || a.sort - b.sort,
      );
      break;
    default:
      items = [...items].sort((a, b) => a.sort - b.sort);
  }
  return items;
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | null> {
  const items = await getActiveProducts();
  return items.find((p) => p.slug === slug) ?? null;
}

export async function getFeatured(gender?: Gender): Promise<Product[]> {
  const items = await getActiveProducts();
  return items.filter(
    (p) => p.is_featured && (gender ? p.gender === gender : true),
  );
}

export async function getNewArrivals(): Promise<Product[]> {
  const items = await getActiveProducts();
  return items.filter((p) => p.is_new);
}

export async function getRelated(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  const items = await getActiveProducts();
  return items
    .filter((p) => p.slug !== product.slug && p.family === product.family)
    .slice(0, limit);
}
