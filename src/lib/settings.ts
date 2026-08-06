import "server-only";
import { isSupabaseConfigured } from "./env";
import { DEFAULT_SETTINGS } from "./site";
import { createPublicSupabase } from "./supabase/public";
import type { SiteSettings } from "./types";

export async function getSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured) return DEFAULT_SETTINGS;
  try {
    const supabase = createPublicSupabase();
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    if (!data) return DEFAULT_SETTINGS;
    return {
      whatsapp_number: data.whatsapp_number ?? DEFAULT_SETTINGS.whatsapp_number,
      hero_title: data.hero_title ?? DEFAULT_SETTINGS.hero_title,
      hero_subtitle: data.hero_subtitle ?? DEFAULT_SETTINGS.hero_subtitle,
      announcement_text:
        data.announcement_text ?? DEFAULT_SETTINGS.announcement_text,
      free_shipping_threshold_cents:
        data.free_shipping_threshold_cents ??
        DEFAULT_SETTINGS.free_shipping_threshold_cents,
      instagram_url: data.instagram_url ?? DEFAULT_SETTINGS.instagram_url,
    };
  } catch (e) {
    console.error("[settings] Supabase fetch failed, using defaults:", e);
    return DEFAULT_SETTINGS;
  }
}
