import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductAction } from "@/components/product/product-action";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import {
  getActiveProducts,
  getProductBySlug,
  getRelated,
} from "@/lib/products";
import { getSettings } from "@/lib/settings";
import { FAMILY_LABELS, GENDER_LABELS } from "@/lib/site";

export async function generateStaticParams() {
  const products = await getActiveProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Perfume não encontrado" };
  return {
    title: product.name,
    description:
      product.description ?? `${product.name} — fragrância THPARFUMS.`,
  };
}

function NoteList({ label, items }: { label: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-wider text-faint">{label}</p>
      <p className="text-sm text-foreground">{items.join(" · ")}</p>
    </div>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [settings, related] = await Promise.all([
    getSettings(),
    getRelated(product),
  ]);

  return (
    <div className="container-page py-8 md:py-12">
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-faint">
        <Link href="/" className="hover:text-foreground">
          Início
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/perfumes" className="hover:text-foreground">
          Perfumes
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="inline-block max-w-[150px] truncate align-bottom text-muted sm:max-w-none">
          {product.name}
        </span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <ProductGallery images={product.images} name={product.name} />

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {product.is_new && <Badge tone="new">Novo</Badge>}
              <Badge tone="neutral">{GENDER_LABELS[product.gender]}</Badge>
              {product.family && (
                <Badge tone="neutral">{FAMILY_LABELS[product.family]}</Badge>
              )}
            </div>
            <h1 className="font-display text-3xl leading-tight md:text-4xl">
              {product.name}
            </h1>
            {product.brand && (
              <p className="text-sm text-muted">{product.brand}</p>
            )}
          </div>

          <ProductAction
            product={product}
            whatsappNumber={settings.whatsapp_number}
          />

          {product.description && (
            <p className="text-sm leading-relaxed text-muted">
              {product.description}
            </p>
          )}

          {product.notes && (
            <div className="space-y-4 rounded-[var(--radius-card)] border border-border bg-surface p-5">
              <p className="eyebrow">Pirâmide olfativa</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <NoteList label="Saída" items={product.notes.top} />
                <NoteList label="Corpo" items={product.notes.heart} />
                <NoteList label="Fundo" items={product.notes.base} />
              </div>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <SectionHeading
            eyebrow="Você também pode gostar"
            title="Fragrâncias parecidas"
          />
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
