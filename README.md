# THPARFUMS

Dark-luxury perfume storefront + admin. **Next.js 16 · Tailwind v4 · Supabase.**

Showcase-first but **cart-ready**: prices, offers, a localStorage cart and an interim
**WhatsApp checkout**. Swap in a payment gateway later without rewriting the cart.

![brand](public/brand/brand-mockups.jpg)

## Run it (zero setup)

```bash
npm install
npm run dev      # http://localhost:3000
```

With no Supabase keys, the site runs on bundled **seed data** (16 perfumes). Perfect for
a first look or a quick share via a tunnel.

## Enable the database + admin (Supabase)

1. Create a free project at [supabase.com](https://supabase.com).
2. In the **SQL editor**, run `supabase/schema.sql`, then `supabase/seed.sql`.
3. **Authentication → Users → Add user**: create your admin (email + password).
4. Copy `.env.example` → `.env.local` and fill:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Settings → API)
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only)
   - `ADMIN_EMAILS` (the email from step 3)
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits only, e.g. `5511999998888`)
5. Restart `npm run dev`. Log in at **`/admin`** to manage products, images and settings.

> Seed image URLs point at `/products/*.jpg` shipped in `public/`, so the seed needs no
> uploads. Images you add in the admin are uploaded to Supabase Storage.

## Deploy (Vercel free subdomain)

```bash
npm i -g vercel
vercel            # link/create project
# add the same env vars in Vercel → Project → Settings → Environment Variables
vercel --prod
```

You get a shareable `https://<project>.vercel.app` that works on phone and desktop.
Point a custom domain at it later from Vercel → Domains.

## Structure

```
src/
  app/(store)/        public storefront (home, /perfumes, /perfumes/[slug], /sobre)
  app/admin/          auth-gated admin (dashboard, product CRUD, settings) + server actions
  components/         site/ product/ cart/ ui/ admin/
  lib/                data access, supabase clients, formatting, whatsapp, types
  data/seed.ts        canonical fallback catalog (also generates supabase/seed.sql)
supabase/             schema.sql + generated seed.sql
```

## Next steps (not built)

Real payment/checkout, shipping/CEP calculator, installments, stock control, reviews,
custom domain + production hosting.
