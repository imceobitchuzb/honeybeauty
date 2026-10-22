"use client";

import React, { useState } from "react";
import { Plus, Minus, AlertTriangle, Layers, Clock, ArrowRight } from "lucide-react";
import { Product, InventoryLog } from "@/lib/db/types";

export default function InventoryManager({
  initialProducts,
  initialLogs,
}: {
  initialProducts: Product[];
  initialLogs: InventoryLog[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [logs, setLogs] = useState(initialLogs);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [adjustDelta, setAdjustDelta] = useState(5);
  const [adjustReason, setAdjustReason] = useState<InventoryLog["reason"]>("MANUAL_ADJUSTMENT");
  const [adjustNotes, setAdjustNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdjust = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/inventory/adjust", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct.id,
          delta: adjustDelta,
          reason: adjustReason,
          notes: adjustNotes,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === selectedProduct.id ? data.product : p))
        );
        // Refresh logs
        const newLog: InventoryLog = {
          id: `inv_${Date.now()}`,
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          quantityChange: adjustDelta,
          newQuantity: data.product.inventoryCount,
          reason: adjustReason,
          notes: adjustNotes,
          performedBy: "Current Session",
          createdAt: new Date().toISOString(),
        };
        setLogs((prev) => [newLog, ...prev]);
        setSelectedProduct(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Current Inventory Stock Table */}
      <div className="bg-ivory/60 border border-stone-hairline overflow-hidden">
        <div className="p-4 bg-ivory border-b border-stone-hairline flex items-center justify-between">
          <h2 className="font-serif text-lg text-espresso font-medium">
            Studio Stock Status
          </h2>
          <span className="text-xs text-mauve-dusty font-sans">
            {products.length} Products Monitored
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-ivory/80 text-mauve-dusty uppercase tracking-wider text-[10px] border-b border-stone-hairline">
              <tr>
                <th className="p-4">Item &amp; SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock on Hand</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-hairline/60 bg-porcelain">
              {products.map((p) => {
                const isLow = p.inventoryCount <= 5;
                return (
                  <tr key={p.id} className="hover:bg-ivory/30">
                    <td className="p-4">
                      <strong className="font-serif text-sm text-espresso font-medium block">
                        {p.name}
                      </strong>
                      <span className="text-[10px] text-mauve-dusty font-mono">
                        {p.sku || "FH-SKU"}
                      </span>
                    </td>
                    <td className="p-4 uppercase text-[10px] text-mauve-dusty">
                      {p.categoryLabel}
                    </td>
                    <td className="p-4 font-serif text-sm text-espresso">
                      ${(p.priceCents / 100).toFixed(2)}
                    </td>
                    <td className="p-4 font-serif text-base text-espresso font-medium">
                      {p.inventoryCount} units
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2 py-0.5 text-[9px] uppercase font-semibold tracking-wider ${
                          p.inventoryCount === 0
                            ? "bg-red-100 text-red-800"
                            : isLow
                            ? "bg-amber-100 text-amber-900"
                            : "bg-emerald-100 text-emerald-900"
                        }`}
                      >
                        {p.inventoryCount === 0
                          ? "Out of Stock"
                          : isLow
                          ? "Reorder Soon"
                          : "Adequate"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProduct(p);
                          setAdjustDelta(5);
                          setAdjustNotes("Restock batch");
                        }}
                        className="px-3 py-1 bg-espresso text-porcelain text-[10px] uppercase tracking-wider font-medium hover:bg-espresso-light"
                      >
                        Adjust Stock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjustment Modal */}
      {selectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-espresso/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="max-w-md w-full bg-porcelain border border-stone-hairline p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-xl text-espresso font-medium border-b border-stone-hairline pb-2">
              Adjust Stock: {selectedProduct.name}
            </h3>

            <form onSubmit={handleAdjust} className="space-y-3 text-xs font-sans">
              <p className="text-espresso-muted">
                Current count: <strong>{selectedProduct.inventoryCount} units</strong>
              </p>

              <div className="space-y-1">
                <label className="block text-espresso font-medium">
                  Quantity Change (+ to add, - to subtract)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    required
                    value={adjustDelta}
                    onChange={(e) => setAdjustDelta(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-ivory border border-stone-hairline text-espresso"
                  />
                  <span className="text-[11px] text-mauve-dusty whitespace-nowrap">
                    New: {Math.max(0, selectedProduct.inventoryCount + adjustDelta)} units
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-espresso font-medium">Reason *</label>
                <select
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value as any)}
                  className="w-full px-3 py-2 bg-ivory border border-stone-hairline text-espresso"
                >
                  <option value="MANUAL_ADJUSTMENT">Manual Restock / Physical Count</option>
                  <option value="RETURN_RESTOCK">Client Return Restocked</option>
                  <option value="ORDER_FULFILLED">Damaged / Studio Tester write-off</option>
                  <option value="SQUARE_SYNC">Square Inventory Sync</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-espresso font-medium">Notes (Optional)</label>
                <input
                  type="text"
                  value={adjustNotes}
                  onChange={(e) => setAdjustNotes(e.target.value)}
                  placeholder="e.g. Received new shipment from supplier"
                  className="w-full px-3 py-2 bg-ivory border border-stone-hairline text-espresso"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-hairline">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 border border-stone-hairline text-espresso"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-espresso text-porcelain font-medium hover:bg-espresso-light"
                >
                  {isSubmitting ? "Updating..." : "Confirm Adjustment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inventory Adjustment Audit History */}
      <div className="bg-ivory/60 border border-stone-hairline p-6 space-y-4">
        <h3 className="font-serif text-xl text-espresso font-medium border-b border-stone-hairline pb-3">
          Inventory Audit History
        </h3>

        <div className="space-y-2 max-h-72 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-xs text-espresso-muted font-sans py-4 text-center">
              No inventory adjustments recorded yet.
            </p>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="p-3 bg-porcelain border border-stone-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-sans"
              >
                <div>
                  <strong className="text-espresso font-medium block">
                    {log.productName}
                  </strong>
                  <span className="text-[11px] text-mauve-dusty">
                    Reason: {log.reason} {log.notes ? `(${log.notes})` : ""}
                  </span>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between text-[11px]">
                  <span
                    className={`font-semibold ${
                      log.quantityChange > 0 ? "text-emerald-700" : "text-red-700"
                    }`}
                  >
                    {log.quantityChange > 0 ? `+${log.quantityChange}` : log.quantityChange} (New: {log.newQuantity})
                  </span>
                  <span className="text-mauve-dusty">
                    {new Date(log.createdAt).toLocaleString()} · {log.performedBy}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
