import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { ConfirmDeleteButton } from "@/components/ui/confirm-delete-button";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/field";
import { OLFACTORY_FAMILIES } from "@/lib/types";
import { FAMILY_LABELS, GENDER_LABELS } from "@/lib/site";
import type { Gender, Product } from "@/lib/types";
import {
  deleteImageAction,
  saveProductAction,
} from "@/app/admin/actions";

const centsToReais = (c: number | null | undefined) =>
  c == null ? "" : (c / 100).toFixed(2).replace(".", ",");

export function ProductForm({ product }: { product?: Product }) {
  const v50 = product?.variants.find((v) => v.volume_ml === 50);
  const v100 = product?.variants.find((v) => v.volume_ml === 100);
  const isEdit = !!product;

  return (
    <form action={saveProductAction} className="max-w-3xl space-y-8">
      {isEdit && <input type="hidden" name="id" value={product.id} />}

      <section className="space-y-4">
        <h2 className="font-display text-lg">Informações</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome *" htmlFor="name">
            <Input
              id="name"
              name="name"
              required
              defaultValue={product?.name}
              placeholder="Ex.: Amber Empire"
            />
          </Field>
          <Field label="Slug (URL)" htmlFor="slug" hint="Gerado do nome se vazio">
            <Input
              id="slug"
              name="slug"
              defaultValue={product?.slug}
              placeholder="amber-empire"
            />
          </Field>
          <Field label="Gênero" htmlFor="gender">
            <Select id="gender" name="gender" defaultValue={product?.gender ?? "masc"}>
              {(Object.keys(GENDER_LABELS) as Gender[]).map((g) => (
                <option key={g} value={g}>
                  {GENDER_LABELS[g]}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Família olfativa" htmlFor="family">
            <Select id="family" name="family" defaultValue={product?.family ?? ""}>
              <option value="">—</option>
              {OLFACTORY_FAMILIES.map((f) => (
                <option key={f} value={f}>
                  {FAMILY_LABELS[f]}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Marca" htmlFor="brand">
            <Input id="brand" name="brand" defaultValue={product?.brand ?? ""} />
          </Field>
          <Field label="Ordem" htmlFor="sort" hint="Menor aparece primeiro">
            <Input
              id="sort"
              name="sort"
              type="number"
              defaultValue={product?.sort ?? 0}
            />
          </Field>
        </div>
        <Field label="Descrição" htmlFor="description">
          <Textarea
            id="description"
            name="description"
            defaultValue={product?.description ?? ""}
          />
        </Field>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg">Preços</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Preço 50ml (R$)" htmlFor="price50">
            <Input
              id="price50"
              name="price50"
              inputMode="decimal"
              defaultValue={centsToReais(v50?.price_cents)}
              placeholder="129,90"
            />
          </Field>
          <Field label="Promo 50ml (R$)" htmlFor="sale50" hint="Opcional">
            <Input
              id="sale50"
              name="sale50"
              inputMode="decimal"
              defaultValue={centsToReais(v50?.sale_price_cents)}
            />
          </Field>
          <Field label="Preço 100ml (R$)" htmlFor="price100">
            <Input
              id="price100"
              name="price100"
              inputMode="decimal"
              defaultValue={centsToReais(v100?.price_cents)}
              placeholder="199,90"
            />
          </Field>
          <Field label="Promo 100ml (R$)" htmlFor="sale100" hint="Opcional">
            <Input
              id="sale100"
              name="sale100"
              inputMode="decimal"
              defaultValue={centsToReais(v100?.sale_price_cents)}
            />
          </Field>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg">Pirâmide olfativa</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Saída" htmlFor="notes_top" hint="Separe por vírgula">
            <Input
              id="notes_top"
              name="notes_top"
              defaultValue={product?.notes?.top?.join(", ") ?? ""}
            />
          </Field>
          <Field label="Corpo" htmlFor="notes_heart" hint="Separe por vírgula">
            <Input
              id="notes_heart"
              name="notes_heart"
              defaultValue={product?.notes?.heart?.join(", ") ?? ""}
            />
          </Field>
          <Field label="Fundo" htmlFor="notes_base" hint="Separe por vírgula">
            <Input
              id="notes_base"
              name="notes_base"
              defaultValue={product?.notes?.base?.join(", ") ?? ""}
            />
          </Field>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg">Imagens</h2>
        {isEdit && product.images.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {product.images.map((img) => (
              <div key={img.id} className="relative">
                <div className="relative h-24 w-24 overflow-hidden rounded-lg border border-border product-spotlight">
                  <Image
                    src={img.url}
                    alt={img.alt ?? ""}
                    fill
                    sizes="96px"
                    className="object-contain p-2"
                  />
                </div>
                <ConfirmDeleteButton
                  action={deleteImageAction}
                  hidden={{ imageId: img.id }}
                  title="Remover imagem?"
                  message="Esta imagem será removida do produto."
                  confirmLabel="Remover"
                  triggerLabel="Remover imagem"
                  formClassName="absolute -right-2 -top-2"
                  triggerClassName="flex h-6 w-6 items-center justify-center rounded-full bg-danger text-xs text-white cursor-pointer"
                  triggerChildren="✕"
                />
              </div>
            ))}
          </div>
        )}
        <Field
          label="Adicionar imagens"
          htmlFor="images"
          hint="JPG/PNG/WebP. A primeira imagem vira a principal."
        >
          <Input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            className="cursor-pointer file:mr-3 file:rounded file:border-0 file:bg-surface-2 file:px-3 file:py-1 file:text-foreground"
          />
        </Field>
      </section>

      <section className="flex flex-wrap gap-6">
        <Checkbox
          name="is_active"
          label="Ativo (visível na loja)"
          defaultChecked={product ? product.is_active : true}
        />
        <Checkbox
          name="is_featured"
          label="Destaque"
          defaultChecked={product?.is_featured ?? false}
        />
        <Checkbox
          name="is_new"
          label="Lançamento"
          defaultChecked={product?.is_new ?? false}
        />
      </section>

      <div className="flex gap-3 border-t border-border pt-6">
        <SubmitButton variant="metallic" size="lg">
          {isEdit ? "Salvar alterações" : "Criar produto"}
        </SubmitButton>
        <Link href="/admin">
          <Button type="button" variant="ghost" size="lg">
            Cancelar
          </Button>
        </Link>
      </div>
    </form>
  );
}
