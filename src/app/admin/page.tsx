import Link from "next/link";
import Image from "next/image";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { getAdminProducts } from "@/lib/admin-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteButton } from "@/components/ui/confirm-delete-button";
import { formatBRL, fromPriceCents, primaryImage } from "@/lib/format";
import { FAMILY_LABELS, GENDER_LABELS } from "@/lib/site";
import {
  deleteProductAction,
  toggleActiveAction,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const products = await getAdminProducts();
  const active = products.filter((p) => p.is_active).length;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl">Produtos</h1>
          <p className="text-sm text-muted">
            {products.length} cadastrados · {active} ativos
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button variant="metallic">
            <Plus className="h-4 w-4" /> Novo produto
          </Button>
        </Link>
      </header>

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border-strong p-12 text-center text-muted">
          Nenhum produto ainda. Rode <code>supabase/seed.sql</code> ou crie o
          primeiro produto.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface text-left text-xs uppercase tracking-wider text-faint">
              <tr>
                <th className="px-4 py-3 font-medium">Produto</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">
                  Categoria
                </th>
                <th className="px-4 py-3 font-medium">Preço</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((p) => {
                const img = primaryImage(p);
                const from = fromPriceCents(p);
                return (
                  <tr key={p.id} className="hover:bg-surface/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md product-spotlight">
                          {img && (
                            <Image
                              src={img}
                              alt={p.name}
                              fill
                              sizes="48px"
                              className="object-contain p-1"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {p.name}
                          </p>
                          <div className="mt-0.5 flex gap-1">
                            {p.is_new && <Badge tone="new">Novo</Badge>}
                            {p.is_featured && (
                              <Badge tone="silver">Destaque</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 text-muted sm:table-cell">
                      {GENDER_LABELS[p.gender]}
                      {p.family ? ` · ${FAMILY_LABELS[p.family]}` : ""}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-foreground">
                      {from != null ? formatBRL(from) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <form action={toggleActiveAction}>
                        <input type="hidden" name="id" value={p.id} />
                        <input
                          type="hidden"
                          name="active"
                          value={(!p.is_active).toString()}
                        />
                        <button
                          className={
                            p.is_active
                              ? "rounded-full bg-success/15 px-2.5 py-1 text-xs text-green-300"
                              : "rounded-full bg-surface-2 px-2.5 py-1 text-xs text-faint"
                          }
                        >
                          {p.is_active ? "Ativo" : "Inativo"}
                        </button>
                      </form>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/products/${p.id}`}
                          aria-label={`Editar ${p.name}`}
                          className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-surface-2 hover:text-foreground"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <ConfirmDeleteButton
                          action={deleteProductAction}
                          hidden={{ id: p.id }}
                          title="Excluir produto?"
                          message={`"${p.name}" e suas imagens serão removidos permanentemente.`}
                          triggerLabel={`Excluir ${p.name}`}
                          triggerClassName="flex h-9 w-9 items-center justify-center rounded-md text-faint hover:bg-danger/15 hover:text-danger-fg cursor-pointer"
                          triggerChildren={<Trash2 className="h-4 w-4" />}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
