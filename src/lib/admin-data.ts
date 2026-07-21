import "server-only";
import { createAdminSupabase } from "./supabase/admin";
import { isAuthorizedAdmin } from "./auth";
import type { Product } from "./types";

async function assertAdmin() {
  if (!(await isAuthorizedAdmin())) throw new Error("Não autorizado.");
}

/** Fetch ALL products (including inactive) for the admin. Service-role read. */
export async function getAdminProducts(): Promise<Product[]> {
  await assertAdmin();
  const db = createAdminSupabase();
  const { data, error } = await db
    .from("products")
    .select("*, product_variants(*), product_images(*)")
    .order("sort", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map(normalize);
}

export async function getAdminProduct(id: string): Promise<Product | null> {
  await assertAdmin();
  const db = createAdminSupabase();
  const { data, error } = await db
    .from("products")
    .select("*, product_variants(*), product_images(*)")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? normalize(data) : null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function normalize(r: any): Product {
  return {
    ...r,
    images: [...(r.product_images ?? [])].sort(
      (a: any, b: any) => a.sort - b.sort,
    ),
    variants: [...(r.product_variants ?? [])].sort(
      (a: any, b: any) => a.volume_ml - b.volume_ml,
    ),
  } as Product;
}
