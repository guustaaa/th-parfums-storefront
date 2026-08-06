# THPARFUMS — dark-luxury perfume shop (MVP)

@AGENTS.md

Storefront + admin for a Brazilian perfumaria. Showcase-first but **cart-ready**:
real prices/offers and a localStorage cart with an interim **WhatsApp checkout**;
adding Stripe/Mercado Pago later means swapping only the checkout step.

## Stack (pinned)
- **Next.js 16** (App Router, TypeScript) · **Tailwind CSS v4** (tokens in `globals.css @theme`)
- **Supabase** — Postgres + Auth + Storage (`@supabase/supabase-js`, `@supabase/ssr`)
- Fonts: **Playfair Display** (display) + **Inter** (body) · icons: `lucide-react`
- UI primitives hand-rolled with `class-variance-authority` (no shadcn CLI)

## Design language
Black canvas (`#0a0a0a`), off-white text, **silver/metallic** accents (no gold).
Crown + serif wordmark (`components/site/logo.tsx`, vector). White-bg bottle shots
sit on `.product-spotlight` dark cards. Utilities: `.text-metallic`, `.border-metallic`.

## Data flow
- `lib/products.ts` / `lib/settings.ts` read Supabase when configured, else fall back
  to `data/seed.ts` so the site runs with **zero setup**.
- Public reads go through anon client + RLS (active rows only).
- Admin writes use the **service-role** client in server actions (`app/admin/actions.ts`)
  after an auth + `ADMIN_EMAILS` allowlist check. Never import `lib/supabase/admin.ts`
  from a client component.
- `src/proxy.ts` (Next 16's renamed middleware) refreshes the session + gates `/admin`.

## Commands
- `npm run dev` — http://localhost:3000
- `npm run build` / `npm start`
- `npx tsx scripts/gen-seed-sql.ts` — regenerate `supabase/seed.sql` from `data/seed.ts`

## Supabase setup
1. Create a free project. Run `supabase/schema.sql` then `supabase/seed.sql` in the SQL editor.
2. Auth → Users → add your admin user (email/password).
3. Fill `.env.local` (see `.env.example`): URL, anon, service_role, `ADMIN_EMAILS`, WhatsApp.

## Conventions
- Money stored as integer **cents**; format with `lib/format.ts` (`formatBRL`).
- Next 16: `params`/`searchParams`/`cookies()` are **async** — always `await`.
- Keep new product fields in sync across `types.ts`, `seed.ts`, `schema.sql`, and the
  admin form + `saveProductAction`.
