import "server-only";
import { isAdminEmail, isSupabaseConfigured } from "./env";
import { createServerSupabase } from "./supabase/server";

/** Current authenticated Supabase user, or null. */
export async function getServerUser() {
  if (!isSupabaseConfigured) return null;
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ?? null;
}

/** True when there is a logged-in user whose email is on the admin allowlist. */
export async function isAuthorizedAdmin(): Promise<boolean> {
  const user = await getServerUser();
  return isAdminEmail(user?.email);
}
