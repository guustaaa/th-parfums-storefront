import { ProductCard } from "./product-card";
import type { Product } from "@/lib/types";

/**
 * Swipeable carousel on mobile, full 4-up grid on desktop — so a row always
 * looks intentional regardless of how many featured items there are.
 */
export function ProductRail({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1 md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
      {products.map((p) => (
        <div
          key={p.id}
          className="w-[60%] shrink-0 snap-start sm:w-[40%] md:w-auto"
        >
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
