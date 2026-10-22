"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ShoppingBag, ArrowRight, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    itemCount,
    subtotalCents,
  } = useCart();

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
      className="fixed inset-0 z-50 overflow-hidden animate-fadeIn"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-espresso/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-porcelain border-l border-stone-hairline flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-stone-hairline flex items-center justify-between bg-ivory">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-espresso" />
              <h2 className="font-serif text-xl text-espresso font-medium">
                Your Bag ({itemCount})
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-1.5 text-espresso hover:text-espresso-muted rounded focus:outline-none"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-12 h-12 rounded-full bg-ivory border border-stone-hairline flex items-center justify-center mx-auto text-mauve-dusty">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-espresso font-medium">
                  Your bag is empty
                </h3>
                <p className="text-xs text-espresso-muted max-w-xs mx-auto font-sans leading-relaxed">
                  Discover professional lash foaming cleansers, pure silk sleep masks, and conditioning serums tailored for your sets.
                </p>
                <div className="pt-2">
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-espresso text-porcelain text-xs uppercase tracking-widest font-medium hover:bg-espresso-light transition-colors"
                  >
                    <span>Explore Products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex items-start gap-4 p-4 bg-ivory/60 border border-stone-hairline"
                  >
                    <div className="relative w-16 h-20 bg-porcelain flex-shrink-0 overflow-hidden border border-stone-hairline">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-medium text-espresso leading-snug line-clamp-1">
                          {product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          className="text-mauve-dusty hover:text-espresso p-1"
                          aria-label={`Remove ${product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[10px] uppercase tracking-wider text-mauve-dusty font-sans">
                        {product.categoryLabel}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-stone-hairline bg-porcelain">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1 hover:bg-ivory text-espresso"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-sans font-medium text-espresso">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1 hover:bg-ivory text-espresso"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif text-sm text-espresso font-medium">
                          ${((product.priceCents * quantity) / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-hairline bg-ivory space-y-4">
              <div className="space-y-1.5 text-xs font-sans">
                <div className="flex items-center justify-between text-espresso font-medium">
                  <span>Subtotal</span>
                  <span className="font-serif text-lg text-espresso">
                    ${(subtotalCents / 100).toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] text-espresso-muted">
                  Taxes and shipping calculated at secure checkout.
                </p>
              </div>

              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-espresso text-porcelain text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso-light transition-colors shadow-md"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-soft" />
                </Link>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center py-2.5 border border-espresso/20 text-espresso text-[11px] uppercase tracking-widest font-medium hover:bg-white/40 transition-colors"
                >
                  <span>View Full Cart Page</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
