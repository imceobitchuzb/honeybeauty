"use client";

import React, { useState } from "react";
import { Plus, Minus, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/lib/db/types";
import { useCart } from "@/context/CartContext";

export default function AddToCartForm({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const isOutOfStock = product.inventoryCount <= 0;

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {/* Quantity Controls */}
        <div className="flex items-center border border-stone-hairline bg-porcelain">
          <button
            type="button"
            disabled={quantity <= 1 || isOutOfStock}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-3 text-espresso hover:bg-ivory disabled:opacity-30"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-12 text-center text-sm font-sans font-medium text-espresso">
            {quantity}
          </span>
          <button
            type="button"
            disabled={quantity >= product.inventoryCount || isOutOfStock}
            onClick={() => setQuantity((q) => q + 1)}
            className="p-3 text-espresso hover:bg-ivory disabled:opacity-30"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action Button */}
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAdd}
          className={`flex-1 py-4 px-6 text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md active:translate-y-px flex items-center justify-center gap-2 ${
            added
              ? "bg-emerald-800 text-white"
              : "bg-espresso text-porcelain hover:bg-espresso-light"
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Added to Bag</span>
            </>
          ) : isOutOfStock ? (
            <span>Sold Out</span>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 text-rose-soft" />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>

      {product.inventoryCount > 0 && product.inventoryCount <= 5 && (
        <p className="text-xs text-amber-700 font-sans italic">
          Only {product.inventoryCount} units remaining in studio stock.
        </p>
      )}
    </div>
  );
}
