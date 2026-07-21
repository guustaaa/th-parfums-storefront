import type { Metadata } from "next";
import { ProductGrid } from "@/components/product/product-grid";
import {
  CatalogFilters,
  type FilterGroup,
} from "@/components/product/catalog-filters";
import { getCatalog, type CatalogFilters as CF } from "@/lib/products";
import { FAMILY_LABELS, GENDER_LABELS } from "@/lib/site";
import { OLFACTORY_FAMILIES, type Gender, type OlfactoryFamily } from "@/lib/types";

export const metadata: Metadata = {
  title: "Perfumes",
  description: "Catálogo completo de fragrâncias THPARFUMS.",
};

type SP = Record<string, string | string[] | undefined>;

const GENDERS: Gender[] = ["masc", "fem", "unisex"];
const SORTS = [
  { key: "relevancia", label: "Relevância" },
  { key: "novidades", label: "Novidades" },
  { key: "preco-asc", label: "Menor preço" },
  { key: "preco-desc", label: "Maior preço" },
] as const;

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

function buildHref(current: SP, patch: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  const merged: SP = { ...current, ...patch };
  for (const [k, v] of Object.entries(merged)) {
    const val = first(v);
    if (val) params.set(k, val);
  }
  const qs = params.toString();
  return qs ? `/perfumes?${qs}` : "/perfumes";
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const gender = first(sp.genero) as Gender | undefined;
  const family = first(sp.familia) as OlfactoryFamily | undefined;
  const sort = (first(sp.ordenar) as CF["sort"]) ?? "relevancia";
  const search = first(sp.q);

  const products = await getCatalog({ gender, family, sort, search });

  const groups: FilterGroup[] = [
    {
      key: "genero",
      label: "Gênero",
      chips: [
        { label: "Todos", href: buildHref(sp, { genero: undefined }), active: !gender },
        ...GENDERS.map((g) => ({
          label: GENDER_LABELS[g],
          href: buildHref(sp, { genero: g }),
          active: gender === g,
        })),
      ],
    },
    {
      key: "familia",
      label: "Família",
      chips: [
        { label: "Todas", href: buildHref(sp, { familia: undefined }), active: !family },
        ...OLFACTORY_FAMILIES.map((f) => ({
          label: FAMILY_LABELS[f],
          href: buildHref(sp, { familia: f }),
          active: family === f,
        })),
      ],
    },
    {
      key: "ordenar",
      label: "Ordenar",
      chips: SORTS.map((s) => ({
        label: s.label,
        href: buildHref(sp, { ordenar: s.key }),
        active: sort === s.key,
      })),
    },
  ];

  const activeCount =
    (gender ? 1 : 0) +
    (family ? 1 : 0) +
    (sort && sort !== "relevancia" ? 1 : 0) +
    (search ? 1 : 0);

  return (
    <div className="container-page py-10 md:py-14">
      <header className="mb-6">
        <p className="eyebrow mb-2">Coleção</p>
        <h1 className="font-display text-3xl md:text-4xl">
          {family
            ? FAMILY_LABELS[family]
            : gender
              ? `Perfumes ${GENDER_LABELS[gender]}s`
              : "Todos os perfumes"}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {products.length}{" "}
          {products.length === 1 ? "fragrância" : "fragrâncias"}
        </p>
      </header>

      <div className="mb-8">
        <CatalogFilters groups={groups} activeCount={activeCount} />
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
