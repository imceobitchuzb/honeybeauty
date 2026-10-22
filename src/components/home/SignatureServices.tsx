import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Calendar, Sparkles } from "lucide-react";
import { servicesData } from "@/data/services";
import { brandData } from "@/data/brand";

export default function SignatureServices() {
  const signatureList = servicesData.filter((s) => s.isSignature).slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-porcelain border-b border-stone-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 lg:pb-16 border-b border-stone-hairline">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
              Curated Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-espresso font-normal">
              Signature Lash &amp; Brow Treatments
            </h2>
            <p className="text-sm sm:text-base text-espresso-muted font-sans leading-relaxed">
              Every appointment is individually tailored using medical-grade adhesives, premium lightweight fibers, and non-damaging application protocols.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-espresso hover:text-rose-muted transition-colors"
            >
              <span>Explore Complete Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Editorial Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pt-12">
          {signatureList.map((service, idx) => (
            <div
              key={service.id}
              className="group flex flex-col justify-between bg-ivory/60 border border-stone-hairline p-6 sm:p-8 transition-all duration-300 hover:shadow-editorial hover:border-espresso/30"
            >
              <div className="space-y-5">
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-porcelain">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-porcelain/90 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase tracking-widest font-sans font-medium text-espresso">
                    {service.categoryLabel}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-2xl text-espresso font-medium group-hover:text-espresso-muted transition-colors">
                      {service.name}
                    </h3>
                  </div>
                  <p className="text-xs uppercase tracking-widest text-mauve-dusty font-medium font-sans">
                    {service.subtitle}
                  </p>
                  <p className="text-sm text-espresso-muted font-sans leading-relaxed pt-1">
                    {service.description}
                  </p>
                </div>

                {/* Features Bullets */}
                <div className="pt-2 border-t border-stone-hairline/60">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-espresso/70 font-sans">
                    {service.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-rose-muted flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Meta & Booking Action */}
              <div className="pt-6 mt-6 border-t border-stone-hairline flex items-center justify-between gap-4">
                <div className="text-xs font-sans">
                  {service.estimatedDuration && (
                    <span className="block text-espresso font-medium">
                      {service.estimatedDuration}
                    </span>
                  )}
                  <span className="text-[11px] text-espresso-muted">
                    Bespoke Artistry
                  </span>
                </div>

                <Link
                  href={service.bookingUrl || `/book?service=${service.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-espresso text-porcelain text-[11px] uppercase tracking-[0.18em] font-medium transition-all hover:bg-espresso-light active:translate-y-px"
                >
                  <Calendar className="w-3.5 h-3.5 text-rose-soft" />
                  <span>Book</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory Note */}
        <div className="mt-12 p-4 sm:p-5 bg-ivory border border-stone-hairline text-center sm:flex items-center justify-between gap-4 text-xs font-sans text-espresso-muted">
          <p>
            <strong className="text-espresso font-medium">Bespoke Consultations:</strong> Every appointment begins with an in-depth lash &amp; brow mapping assessment to complement your natural contours.
          </p>
          <Link
            href="/book"
            className="mt-2 sm:mt-0 inline-flex items-center gap-1 text-espresso font-medium uppercase tracking-widest hover:text-rose-muted"
          >
            <span>Book Your Session</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
