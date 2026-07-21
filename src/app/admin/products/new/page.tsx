import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl">Novo produto</h1>
      <ProductForm />
    </div>
  );
}
