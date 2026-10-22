"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/db/types";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const isLowStock = product.inventoryCount > 0 && product.inventoryCount <= 5;
  const isOutOfStock = product.inventoryCount <= 0;

  return (
    <div className="group bg-ivory/50 border border-stone-hairline flex flex-col justify-between transition-all duration-300 hover:shadow-editorial hover:border-espresso/40">
      <div>
        {/* Image Container */}
        <Link
          href={`/shop/${product.slug}`}
          className="relative aspect-square block overflow-hidden bg-porcelain border-b border-stone-hairline"
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute top-3 left-3 bg-porcelain/90 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-widest font-sans font-medium text-espresso">
            {product.categoryLabel}
          </div>

          {product.isDemo && (
            <div className="absolute top-3 right-3 bg-amber-100/90 text-amber-900 border border-amber-200 px-2 py-0.5 text-[8px] uppercase tracking-wider font-sans font-semibold">
              Demo Catalog
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="p-6 space-y-2">
          <span className="text-[10px] uppercase tracking-widest text-mauve-dusty font-semibold block">
            {product.subtitle}
          </span>
          <Link
            href={`/shop/${product.slug}`}
            className="font-serif text-xl text-espresso font-medium block hover:text-espresso-muted transition-colors"
          >
            {product.name}
          </Link>
          <p className="text-xs text-espresso-muted font-sans line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer & Add to Bag */}
      <div className="p-6 pt-0 space-y-3">
        <div className="flex items-center justify-between border-t border-stone-hairline/60 pt-4">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg text-espresso font-medium">
              ${(product.priceCents / 100).toFixed(2)}
            </span>
            {product.comparePriceCents && (
              <span className="text-xs text-mauve-dusty line-through font-sans">
                ${(product.comparePriceCents / 100).toFixed(2)}
              </span>
            )}
          </div>

          <span
            className={`text-[10px] uppercase tracking-wider font-sans font-medium ${
              isOutOfStock
                ? "text-red-700"
                : isLowStock
                ? "text-amber-700"
                : "text-emerald-700"
            }`}
          >
            {isOutOfStock
              ? "Sold Out"
              : isLowStock
              ? `Only ${product.inventoryCount} Left`
              : "In Stock"}
          </span>
        </div>

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={() => addItem(product, 1)}
          className="w-full flex items-center justify-center gap-1.5 py-3 bg-espresso text-porcelain text-xs uppercase tracking-[0.16em] font-medium hover:bg-espresso-light transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm active:translate-y-px"
        >
          <Plus className="w-3.5 h-3.5 text-rose-soft" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
}
