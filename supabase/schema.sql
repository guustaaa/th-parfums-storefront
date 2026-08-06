-- ============================================================
-- THPARFUMS — Supabase schema, RLS and storage
-- Run this in the Supabase SQL editor (or `supabase db push`).
-- Idempotent-ish: safe to re-run on a fresh project.
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- Tables ----------

create table if not exists public.products (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  brand         text,
  description   text,
  gender        text not null check (gender in ('masc','fem','unisex')),
  family        text check (family in ('amadeirado','oriental','floral','citrico','frutal','aromatico')),
  inspired_by   text,
  is_featured   boolean not null default false,
  is_new        boolean not null default false,
  is_active     boolean not null default true,
  sort          int not null default 0,
  notes         jsonb,
  created_at    timestamptz not null default now()
);

create table if not exists public.product_variants (
  id               uuid primary key default gen_random_uuid(),
  product_id       uuid not null references public.products(id) on delete cascade,
  volume_ml        int not null,
  price_cents      int not null,
  sale_price_cents int,
  sku              text,
  stock            int,
  created_at       timestamptz not null default now()
);

create table if not exists public.product_images (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid not null references public.products(id) on delete cascade,
  url         text not null,
  alt         text,
  sort        int not null default 0,
  is_primary  boolean not null default false
);

create table if not exists public.settings (
  id                            int primary key default 1,
  whatsapp_number               text not null default '5554920004118',
  hero_title                    text not null default 'A assinatura que fica na memória',
  hero_subtitle                 text not null default 'Importados 100% originais — árabes, designers e nicho. Consultoria personalizada para você.',
  announcement_text             text not null default 'Perfumes importados 100% originais · Consultoria personalizada pelo WhatsApp',
  free_shipping_threshold_cents int not null default 19900,
  instagram_url                 text,
  constraint settings_singleton check (id = 1)
);

insert into public.settings (id) values (1) on conflict (id) do nothing;

create index if not exists idx_variants_product on public.product_variants(product_id);
create index if not exists idx_images_product on public.product_images(product_id);
create index if not exists idx_products_active_sort on public.products(is_active, sort);

-- ---------- Row Level Security ----------
-- Public (anon/authenticated) may READ active catalog data only.
-- All writes are performed by admin server actions using the service-role
-- key, which BYPASSES RLS. So no write policies are defined here.

alter table public.products        enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_images   enable row level security;
alter table public.settings         enable row level security;

drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products
  for select using (is_active = true);

drop policy if exists "variants_public_read" on public.product_variants;
create policy "variants_public_read" on public.product_variants
  for select using (
    exists (select 1 from public.products p
            where p.id = product_id and p.is_active = true)
  );

drop policy if exists "images_public_read" on public.product_images;
create policy "images_public_read" on public.product_images
  for select using (
    exists (select 1 from public.products p
            where p.id = product_id and p.is_active = true)
  );

drop policy if exists "settings_public_read" on public.settings;
create policy "settings_public_read" on public.settings
  for select using (true);

-- ---------- Storage ----------
-- Public bucket for product photos uploaded via the admin.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "product_images_public_read" on storage.objects;
create policy "product_images_public_read" on storage.objects
  for select using (bucket_id = 'product-images');
