import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, MapPin } from "lucide-react";
import { db } from "@/lib/db";
import AddToCartForm from "@/components/shop/AddToCartForm";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = db.getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Flutterhoney Aftercare Boutique`,
    description: product.description,
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = db.getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <div className="bg-porcelain min-h-screen py-10 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back */}
        <div className="pb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-espresso hover:text-rose-muted transition-colors font-sans"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Aftercare Boutique</span>
          </Link>
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Image (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square overflow-hidden bg-ivory border border-stone-hairline shadow-editorial">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-porcelain/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-sans font-medium text-espresso">
                {product.categoryLabel}
              </div>
              {product.isDemo && (
                <div className="absolute top-4 right-4 bg-amber-100/95 text-amber-900 border border-amber-200 px-2.5 py-1 text-[9px] uppercase tracking-wider font-sans font-semibold">
                  Demo Catalog
                </div>
              )}
            </div>

            <div className="p-4 bg-ivory/60 border border-stone-hairline text-xs font-sans text-espresso-muted flex items-center justify-between">
              <span>SKU: {product.sku || "FH-PROD"}</span>
              <span className="text-emerald-700 font-medium">
                {product.inventoryCount > 0 ? "In Stock & Ready" : "Sold Out"}
              </span>
            </div>
          </div>

          {/* Right Column: Details & Actions (6 cols) */}
          <div className="lg:col-span-6 space-y-6 font-sans">
            <div className="space-y-2 border-b border-stone-hairline pb-6">
              <span className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
                {product.subtitle}
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif text-espresso font-normal">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3 pt-2">
                <span className="font-serif text-2xl text-espresso font-medium">
                  ${(product.priceCents / 100).toFixed(2)}
                </span>
                {product.comparePriceCents && (
                  <span className="text-sm text-mauve-dusty line-through">
                    ${(product.comparePriceCents / 100).toFixed(2)}
                  </span>
                )}
                <span className="text-xs text-mauve-dusty">USD</span>
              </div>
            </div>

            <div className="space-y-4 text-sm text-espresso/80 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Interactive Add to Cart Component */}
            <div className="pt-2">
              <AddToCartForm product={product} />
            </div>

            {/* Guarantees Box */}
            <div className="border-t border-stone-hairline pt-6 space-y-3 text-xs text-espresso-muted">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-rose-muted flex-shrink-0" />
                <span>Formulated specifically to protect eyelash adhesive bonds.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-rose-muted flex-shrink-0" />
                <span>Available for free in-studio pickup at Loft 28, Scottsdale Quarter.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-rose-muted flex-shrink-0" />
                <span>Verified Square Payments with end-to-end encryption.</span>
              </div>
            </div>

            {/* Accordions for Usage & Ingredients */}
            <div className="border-t border-stone-hairline pt-6 space-y-4">
              {product.usageInstructions && (
                <div className="space-y-1.5 p-4 bg-ivory/50 border border-stone-hairline">
                  <h3 className="font-serif text-base text-espresso font-medium">
                    How to Use
                  </h3>
                  <p className="text-xs text-espresso-muted leading-relaxed">
                    {product.usageInstructions}
                  </p>
                </div>
              )}

              {product.ingredients && (
                <div className="space-y-1.5 p-4 bg-ivory/50 border border-stone-hairline">
                  <h3 className="font-serif text-base text-espresso font-medium">
                    Ingredients
                  </h3>
                  <p className="text-[11px] text-espresso-muted leading-relaxed font-mono">
                    {product.ingredients}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
