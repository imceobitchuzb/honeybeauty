import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { Product } from "@/lib/db/types";
import ProductCard from "@/components/shop/ProductCard";
import { ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Lash & Brow Aftercare Shop",
  description:
    "Curated collection of physician-formulated lash cleansers, 100% mulberry silk sleep masks, and brow styling waxes by Flutterhoney in Scottsdale.",
};

export default function ShopPage() {
  const products = db.getProducts(true);

  return (
    <div className="bg-porcelain min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pb-12 border-b border-stone-hairline">
          <span className="text-[11px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
            Curated Formulations &amp; Tools
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-espresso font-normal leading-tight">
            The Aftercare Boutique
          </h1>
          <p className="text-base sm:text-lg text-espresso-muted font-sans leading-relaxed">
            Protect your lash investment and nourish your brows between studio appointments with artist-approved, extension-safe essentials.
          </p>
        </div>

        {/* Brand Promises */}
        <div className="my-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-sans text-espresso-muted">
          <div className="p-4 bg-ivory border border-stone-hairline flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-rose-muted flex-shrink-0" />
            <span>100% Extension-Safe &amp; Oil-Free Formulations</span>
          </div>
          <div className="p-4 bg-ivory border border-stone-hairline flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-rose-muted flex-shrink-0" />
            <span>Complimentary Studio Pickup at Loft 28</span>
          </div>
          <div className="p-4 bg-ivory border border-stone-hairline flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-rose-muted flex-shrink-0" />
            <span>Verified Square Merchant Payments</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Studio Pickup Note */}
        <div className="mt-16 p-8 bg-ivory/60 border border-stone-hairline text-center space-y-2">
          <h3 className="font-serif text-xl text-espresso font-medium">
            Studio Pickup Available
          </h3>
          <p className="text-xs text-espresso-muted font-sans max-w-md mx-auto leading-relaxed">
            Order online and collect your products during your next lash appointment at Salon Lofts Scottsdale Quarter, Loft 28.
          </p>
        </div>
      </div>
    </div>
  );
}
