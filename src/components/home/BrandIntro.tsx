import Link from "next/link";
import { Sparkles, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";
import { brandData } from "@/data/brand";

export default function BrandIntro() {
  return (
    <section className="py-20 lg:py-28 bg-ivory/40 border-b border-stone-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Statement (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
              The Flutterhoney Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-espresso font-normal leading-tight">
              Artistry rooted in precision and facial harmony.
            </h2>
            <div className="w-12 h-[1px] bg-rose-muted my-4" />
            <p className="text-sm uppercase tracking-widest text-espresso-muted font-sans font-medium">
              Scottsdale Quarter · Private Loft 28
            </p>
          </div>

          {/* Right Column: Detailed Story & Values (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-espresso/80 font-sans leading-relaxed text-base sm:text-lg">
            <p>
              At Flutterhoney, lash and brow treatments are never treated as assembly-line appointments. Every set is mapped exclusively for your natural eye contour, brow bone structure, and lifestyle.
            </p>
            <p className="text-sm sm:text-base text-espresso-muted">
              Founded by Corina Gonzalez, Flutterhoney combines more than ten years of experience in the beauty industry with specialized expertise as an Arizona State Board-approved lash trainer. Whether you desire an undetectable classic enhancement, a textured wispy hybrid, or sculpted brow lamination, every session prioritizes the long-term health of your natural lashes.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-stone-hairline">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-porcelain border border-stone-hairline flex items-center justify-center text-rose-muted">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg text-espresso font-medium">
                  Natural Lash Health
                </h3>
                <p className="text-xs text-espresso-muted leading-relaxed">
                  Weight-calculated extensions and non-damaging isolation techniques.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-porcelain border border-stone-hairline flex items-center justify-center text-rose-muted">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg text-espresso font-medium">
                  Custom Lash Mapping
                </h3>
                <p className="text-xs text-espresso-muted leading-relaxed">
                  Bespoke curls, lengths, and fan density tailored to your eye shape.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-porcelain border border-stone-hairline flex items-center justify-center text-rose-muted">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg text-espresso font-medium">
                  Private Sanctuary
                </h3>
                <p className="text-xs text-espresso-muted leading-relaxed">
                  Calm, unhurried 1-on-1 studio environment inside Salon Lofts.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/artist"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-espresso hover:text-rose-muted transition-colors"
              >
                <span>Read More About Corina &amp; Her Background</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
