"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminSupabase } from "@/lib/supabase/admin";
import { createServerSupabase } from "@/lib/supabase/server";
import { isAuthorizedAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";

async function guard() {
  if (!(await isAuthorizedAdmin())) {
    throw new Error("Não autorizado.");
  }
}

function parseReaisToCents(raw: FormDataEntryValue | null): number | null {
  if (!raw) return null;
  const cleaned = String(raw).replace(/[^\d,.-]/g, "").replace(",", ".");
  if (!cleaned) return null;
  const value = Number.parseFloat(cleaned);
  if (Number.isNaN(value)) return null;
  return Math.round(value * 100);
}

const ALLOWED_IMAGE_EXT = new Set(["jpg", "jpeg", "png", "webp", "avif"]);
const ALLOWED_IMAGE_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

/** Validate an uploaded image; returns a safe lowercase extension or throws. */
function validateImage(file: File): string {
  const ext = (file.name.split(".").pop() ?? "").toLowerCase();
  if (!ALLOWED_IMAGE_EXT.has(ext)) {
    throw new Error(`Formato de imagem não permitido: .${ext || "?"}`);
  }
  if (!ALLOWED_IMAGE_MIME.has(file.type)) {
    throw new Error(`Tipo de arquivo inválido: ${file.type || "desconhecido"}`);
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Imagem muito grande (máx. 5 MB).");
  }
  return ext === "jpeg" ? "jpg" : ext;
}

function splitList(raw: FormDataEntryValue | null): string[] {
  return String(raw ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function revalidateStore() {
  revalidatePath("/", "layout");
  revalidatePath("/admin");
}

export async function saveProductAction(formData: FormData) {
  await guard();
  const db = createAdminSupabase();

  const id = (formData.get("id") as string) || null;
  const name = String(formData.get("name") ?? "").trim();
  const slug =
    String(formData.get("slug") ?? "").trim() || slugify(name);

  if (!name) throw new Error("Nome é obrigatório.");

  const top = splitList(formData.get("notes_top"));
  const heart = splitList(formData.get("notes_heart"));
  const base = splitList(formData.get("notes_base"));
  const notes =
    top.length || heart.length || base.length
      ? { top, heart, base }
      : null;

  const record = {
    slug,
    name,
    brand: (String(formData.get("brand") ?? "").trim() || null) as
      | string
      | null,
    description:
      (String(formData.get("description") ?? "").trim() || null) as
        | string
        | null,
    gender: String(formData.get("gender") ?? "masc"),
    family: (String(formData.get("family") ?? "").trim() || null) as
      | string
      | null,
    inspired_by:
      (String(formData.get("inspired_by") ?? "").trim() || null) as
        | string
        | null,
    is_featured: formData.get("is_featured") === "on",
    is_new: formData.get("is_new") === "on",
    is_active: formData.get("is_active") === "on",
    sort: Number.parseInt(String(formData.get("sort") ?? "0"), 10) || 0,
    notes,
  };

  let productId = id;

  if (id) {
    const { error } = await db.from("products").update(record).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await db
      .from("products")
      .insert(record)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    productId = data.id;
  }

  // Replace variants (50ml / 100ml).
  const variants = [
    {
      volume_ml: 50,
      price_cents: parseReaisToCents(formData.get("price50")),
      sale_price_cents: parseReaisToCents(formData.get("sale50")),
    },
    {
      volume_ml: 100,
      price_cents: parseReaisToCents(formData.get("price100")),
      sale_price_cents: parseReaisToCents(formData.get("sale100")),
    },
  ]
    .filter((v) => v.price_cents != null)
    .map((v) => ({
      product_id: productId,
      volume_ml: v.volume_ml,
      price_cents: v.price_cents as number,
      sale_price_cents: v.sale_price_cents,
      sku: `${slug.toUpperCase().slice(0, 6)}-${v.volume_ml}`,
      stock: 25,
    }));

  await db.from("product_variants").delete().eq("product_id", productId);
  if (variants.length) {
    const { error } = await db.from("product_variants").insert(variants);
    if (error) throw new Error(error.message);
  }

  // Upload any new images.
  const files = formData.getAll("images").filter(
    (f): f is File => f instanceof File && f.size > 0,
  );
  const { count } = await db
    .from("product_images")
    .select("id", { count: "exact", head: true })
    .eq("product_id", productId);
  let sort = count ?? 0;

  for (const file of files) {
    const ext = validateImage(file);
    const path = `${slug}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}.${ext}`;
    const { error: upErr } = await db.storage
      .from("product-images")
      .upload(path, file, { contentType: file.type, upsert: true });
    if (upErr) throw new Error(upErr.message);
    const { data: pub } = db.storage
      .from("product-images")
      .getPublicUrl(path);
    await db.from("product_images").insert({
      product_id: productId,
      url: pub.publicUrl,
      alt: name,
      sort: sort++,
      is_primary: sort === 1,
    });
  }

  revalidateStore();
  redirect("/admin");
}

export async function deleteProductAction(formData: FormData) {
  await guard();
  const id = String(formData.get("id"));
  const db = createAdminSupabase();
  const { error } = await db.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateStore();
}

export async function toggleActiveAction(formData: FormData) {
  await guard();
  const id = String(formData.get("id"));
  const active = formData.get("active") === "true";
  const db = createAdminSupabase();
  await db.from("products").update({ is_active: active }).eq("id", id);
  revalidateStore();
}

export async function deleteImageAction(formData: FormData) {
  await guard();
  const imageId = String(formData.get("imageId"));
  const db = createAdminSupabase();
  await db.from("product_images").delete().eq("id", imageId);
  revalidateStore();
}

export async function saveSettingsAction(formData: FormData) {
  await guard();
  const db = createAdminSupabase();
  const { error } = await db.from("settings").upsert({
    id: 1,
    whatsapp_number: String(formData.get("whatsapp_number") ?? "").trim(),
    hero_title: String(formData.get("hero_title") ?? "").trim(),
    hero_subtitle: String(formData.get("hero_subtitle") ?? "").trim(),
    announcement_text: String(formData.get("announcement_text") ?? "").trim(),
    free_shipping_threshold_cents:
      parseReaisToCents(formData.get("free_shipping_threshold")) ?? 19900,
    instagram_url:
      String(formData.get("instagram_url") ?? "").trim() || null,
  });
  if (error) throw new Error(error.message);
  revalidateStore();
  redirect("/admin/settings?ok=1");
}

export async function signOutAction() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
