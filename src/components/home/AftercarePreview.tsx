import Link from "next/link";
import { Droplets, Sparkles, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

export default function AftercarePreview() {
  return (
    <section className="py-20 lg:py-24 bg-ivory/40 border-b border-stone-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-porcelain border border-stone-hairline p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[11px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
                Preserving Your Artistry
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-espresso font-normal">
                Care &amp; Longevity for Your Sets
              </h2>
              <p className="text-sm sm:text-base text-espresso-muted font-sans leading-relaxed">
                Proper aftercare is the secret to retaining plush, clean, and healthy lashes between fills. We provide every client with clear, professional aftercare guidelines.
              </p>

              {/* Quick Care Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <Droplets className="w-4 h-4 text-rose-muted flex-shrink-0 mt-1" />
                  <div className="text-xs font-sans">
                    <strong className="text-espresso block font-medium">
                      Oil-Free Cleansing
                    </strong>
                    <span className="text-espresso-muted">
                      Use specialized lash bath foam; avoid oil-based makeup removers.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-rose-muted flex-shrink-0 mt-1" />
                  <div className="text-xs font-sans">
                    <strong className="text-espresso block font-medium">
                      Daily Gentle Spoolie Brush
                    </strong>
                    <span className="text-espresso-muted">
                      Gently groom tips when dry to keep fans separated and fluffy.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-rose-muted flex-shrink-0 mt-1" />
                  <div className="text-xs font-sans">
                    <strong className="text-espresso block font-medium">
                      Timely 2–3 Week Fills
                    </strong>
                    <span className="text-espresso-muted">
                      Prevent grown-out extensions from twisting or straining natural lashes.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-rose-muted flex-shrink-0 mt-1" />
                  <div className="text-xs font-sans">
                    <strong className="text-espresso block font-medium">
                      Hands Off &amp; Zero Mascara
                    </strong>
                    <span className="text-espresso-muted">
                      Never pull, pick, or apply waterproof mascara to extensions.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/aftercare"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-espresso hover:text-rose-muted transition-colors"
                >
                  <span>Read The Complete Aftercare Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Editorial Callout Box (5 cols) */}
            <div className="lg:col-span-5 bg-ivory border border-stone-hairline p-6 sm:p-8 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.22em] text-mauve-dusty font-semibold block">
                Safety &amp; Health First
              </span>
              <h3 className="font-serif text-xl text-espresso font-medium">
                Our Commitment to Your Comfort
              </h3>
              <p className="text-xs text-espresso-muted leading-relaxed font-sans">
                Corina utilizes medical-grade adhesives, formaldehyde-free formulations, and thorough sanitary sterilization for all implements.
              </p>
              <div className="p-3 bg-porcelain border border-stone-hairline text-[11px] text-mauve-dusty italic font-sans leading-normal">
                Always follow Corina&apos;s personalized instructions given at your appointment. If you ever experience persistent redness or unusual irritation, seek medical advice promptly.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
