import Image from "next/image";
import Link from "next/link";
import { Sparkles, Calendar, CheckCircle2 } from "lucide-react";
import { stylingDirections } from "@/data/services";
import { brandData } from "@/data/brand";

export default function ArtistryStyles() {
  return (
    <section className="py-20 lg:py-28 bg-ivory/50 border-b border-stone-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 pb-12 lg:pb-16">
          <span className="text-[11px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
            Custom Consultation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-espresso font-normal">
            Personalized Lash Styling Directions
          </h2>
          <p className="text-sm sm:text-base text-espresso-muted font-sans leading-relaxed">
            Every set is mapped in consultation with your natural eye contour. Here are illustrative styling aesthetics we customize for our clients.
          </p>
        </div>

        {/* 4 Directions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stylingDirections.map((dir) => (
            <div
              key={dir.id}
              className="bg-porcelain border border-stone-hairline overflow-hidden flex flex-col justify-between group hover:border-espresso/30 transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-ivory">
                  <Image
                    src={dir.image}
                    alt={dir.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-espresso/10 group-hover:bg-transparent transition-colors" />
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-mauve-dusty font-medium block">
                    {dir.subtitle}
                  </span>
                  <h3 className="font-serif text-xl text-espresso font-medium">
                    {dir.name}
                  </h3>
                  <p className="text-xs text-espresso-muted leading-relaxed font-sans">
                    {dir.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] uppercase tracking-wider text-espresso font-semibold block mb-1.5">
                      Key Details:
                    </span>
                    <ul className="space-y-1 text-xs text-espresso/70">
                      {dir.characteristics.map((c, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-rose-muted flex-shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-hairline/60 mt-4">
                <p className="text-[11px] text-mauve-dusty italic mb-3">
                  Best for: {dir.bestFor}
                </p>
                <Link
                  href="/book"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 border border-espresso/20 text-espresso text-[11px] uppercase tracking-[0.16em] font-medium hover:bg-espresso hover:text-white transition-colors"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Book This Style</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
