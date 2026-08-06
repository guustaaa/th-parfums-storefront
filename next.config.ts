import type { NextConfig } from "next";

// Allow Supabase Storage as a remote image source (host derived from env).
// Guard against malformed/placeholder values so the build never throws.
let supabaseHost: string | undefined;
try {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (raw && /^https?:\/\//.test(raw)) supabaseHost = new URL(raw).hostname;
} catch {
  supabaseHost = undefined;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "*.supabase.in" },
      ...(supabaseHost
        ? [{ protocol: "https" as const, hostname: supabaseHost }]
        : []),
    ],
  },
};

export default nextConfig;
