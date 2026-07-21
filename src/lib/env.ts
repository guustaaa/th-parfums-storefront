export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * True only when public Supabase credentials look real. We require a valid http
 * URL and a plausibly-long anon key so stray/placeholder values can't flip the
 * app into a broken "configured" state. When false the app falls back to local
 * seed data so the storefront runs with zero setup.
 */
export const isSupabaseConfigured =
  /^https?:\/\/.+\.supabase\.(co|in)/.test(SUPABASE_URL) &&
  SUPABASE_ANON_KEY.length > 20;

/** Server-only service role key (never exposed to the browser). */
export const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/** Emails allowed into /admin (comma-separated env). */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const list = adminEmails();
  // Fail closed: with no allowlist configured, nobody is admin. Prevents a
  // blank/typo'd ADMIN_EMAILS (e.g. a preview deploy) from granting admin to
  // any authenticated user.
  if (list.length === 0) return false;
  return list.includes(email.toLowerCase());
}
