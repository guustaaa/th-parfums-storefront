import "server-only";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/env";

/**
 * Anon client for PUBLIC reads (catalog, settings). No cookies → pages can be
 * statically prerendered/ISR-cached and built from the DB. RLS still limits
 * reads to active rows. Use the cookie-based server client only for auth.
 */
export function createPublicSupabase() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
