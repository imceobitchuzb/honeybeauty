"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotalCents, itemCount } = useCart();

  const taxEstimateCents = Math.round(subtotalCents * 0.0805); // AZ sales tax estimate
  const shippingEstimateCents = subtotalCents >= 7500 || subtotalCents === 0 ? 0 : 695;
  const totalEstimateCents = subtotalCents + taxEstimateCents + shippingEstimateCents;

  if (items.length === 0) {
    return (
      <div className="bg-porcelain min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center space-y-6 bg-ivory/60 border border-stone-hairline p-8 sm:p-12 shadow-editorial">
          <div className="w-16 h-16 rounded-full bg-porcelain border border-stone-hairline flex items-center justify-center mx-auto text-mauve-dusty">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
              Shopping Bag
            </span>
            <h1 className="text-3xl font-serif text-espresso font-normal">
              Your Bag is Empty
            </h1>
            <p className="text-xs sm:text-sm text-espresso-muted font-sans leading-relaxed">
              Explore our professional aftercare collection, designed to maintain your lash extensions and sculpted brows.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-espresso text-porcelain text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso-light transition-colors"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-porcelain min-h-screen py-10 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-8 flex items-center justify-between border-b border-stone-hairline">
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
              Review Bag
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-espresso font-normal">
              Shopping Bag ({itemCount} {itemCount === 1 ? "Item" : "Items"})
            </h1>
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-mauve-dusty hover:text-espresso font-sans uppercase tracking-wider underline"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 items-start">
          {/* Items Table (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="p-4 sm:p-6 bg-ivory/60 border border-stone-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 bg-porcelain border border-stone-hairline overflow-hidden flex-shrink-0">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-mauve-dusty font-semibold block">
                      {product.categoryLabel}
                    </span>
                    <Link
                      href={`/shop/${product.slug}`}
                      className="font-serif text-base text-espresso font-medium hover:text-espresso-muted block"
                    >
                      {product.name}
                    </Link>
                    <span className="font-serif text-sm text-espresso font-medium block">
                      ${(product.priceCents / 100).toFixed(2)} each
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-hairline/60">
                  <div className="flex items-center border border-stone-hairline bg-porcelain">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1.5 text-espresso hover:bg-ivory"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-sans font-medium text-espresso">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1.5 text-espresso hover:bg-ivory"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="font-serif text-base text-espresso font-medium block">
                      ${((product.priceCents * quantity) / 100).toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="text-[11px] text-mauve-dusty hover:text-red-700 font-sans mt-0.5"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-espresso hover:text-rose-muted transition-colors font-sans"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5 bg-ivory border border-stone-hairline p-6 sm:p-8 space-y-6 font-sans">
            <h2 className="font-serif text-2xl text-espresso font-medium border-b border-stone-hairline pb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs text-espresso/80">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-serif text-sm text-espresso font-medium">
                  ${(subtotalCents / 100).toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Estimated Sales Tax (8.05%)</span>
                <span>${(taxEstimateCents / 100).toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Standard Shipping</span>
                <span>
                  {shippingEstimateCents === 0 ? (
                    <span className="text-emerald-700 font-medium">FREE</span>
                  ) : (
                    `$${(shippingEstimateCents / 100).toFixed(2)}`
                  )}
                </span>
              </div>

              {subtotalCents < 7500 && (
                <p className="text-[11px] text-mauve-dusty italic pt-1">
                  Add ${((7500 - subtotalCents) / 100).toFixed(2)} more for free domestic shipping.
                </p>
              )}

              <div className="border-t border-stone-hairline pt-3 flex items-baseline justify-between text-espresso font-medium text-base">
                <span>Estimated Total</span>
                <span className="font-serif text-2xl">
                  ${(totalEstimateCents / 100).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-4 bg-espresso text-porcelain text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso-light transition-colors shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-rose-soft" />
              </Link>
            </div>

            <div className="pt-4 border-t border-stone-hairline text-xs text-espresso-muted space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-muted flex-shrink-0" />
                <span>Encrypted Square Payment Integration</span>
              </div>
              <p className="text-[11px] text-mauve-dusty">
                Complimentary studio pickup at Loft 28 can be selected on the next step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
