import { db } from "@/lib/db";
import ProductsManager from "@/components/admin/ProductsManager";

export default function AdminProductsPage() {
  const products = db.getProducts();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-hairline pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
            Commerce Operations
          </span>
          <h1 className="text-3xl font-serif text-espresso font-normal">
            Boutique Product Catalog
          </h1>
        </div>
      </div>

      <ProductsManager initialProducts={products} />
    </div>
  );
}
