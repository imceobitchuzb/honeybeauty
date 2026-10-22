import { db } from "@/lib/db";
import InventoryManager from "@/components/admin/InventoryManager";

export default function AdminInventoryPage() {
  const products = db.getProducts();
  const logs = db.getInventoryLogs();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-hairline pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
            Stock Operations
          </span>
          <h1 className="text-3xl font-serif text-espresso font-normal">
            Inventory &amp; Stock Levels
          </h1>
        </div>
      </div>

      <InventoryManager initialProducts={products} initialLogs={logs} />
    </div>
  );
}
