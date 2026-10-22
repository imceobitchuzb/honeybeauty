import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, ShieldCheck, Heart, Sparkles, Calendar, Instagram, MapPin, ArrowRight } from "lucide-react";
import { brandData } from "@/data/brand";

export const metadata: Metadata = {
  title: "Meet The Artist — Corina Gonzalez",
  description:
    "Learn about Corina Gonzalez, founder of Flutterhoney. 10+ years in beauty, 4+ years in lash extensions, and AZ State Board-approved trainer in Scottsdale, AZ.",
};

export default function ArtistPage() {
  return (
    <div className="bg-porcelain min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 pb-12 lg:pb-16 border-b border-stone-hairline">
          <span className="text-[11px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
            The Artist &amp; Educator
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-espresso font-normal leading-tight">
            Corina Gonzalez
          </h1>
          <p className="text-sm uppercase tracking-[0.22em] text-mauve-dusty font-sans font-medium">
            Lash &amp; Brow Specialist · AZ State Board-Approved Trainer
          </p>
        </div>

        {/* Editorial Two-Column Biography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-12 lg:pt-16">
          {/* Left Column: Portrait & Highlights (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[3/4] overflow-hidden bg-ivory border border-stone-hairline shadow-editorial">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                alt="Corina Gonzalez, lash specialist and educator"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover object-center"
              />
            </div>

            {/* Quick Credentials Box */}
            <div className="bg-ivory border border-stone-hairline p-6 space-y-3 font-sans">
              <h3 className="font-serif text-lg text-espresso font-medium">
                Verified Credentials
              </h3>
              <ul className="space-y-2 text-xs text-espresso-muted">
                {brandData.artist.credentials.map((cred, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-muted flex-shrink-0 mt-0.5" />
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <a
                  href={brandData.links.salonLoftsProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-espresso font-medium uppercase tracking-wider hover:text-rose-muted underline underline-offset-4"
                >
                  <span>View Salon Lofts Profile</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: In-Depth Philosophy & Story (7 cols) */}
          <div className="lg:col-span-7 space-y-8 font-sans">
            <div className="space-y-5 text-base sm:text-lg text-espresso/80 leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-serif text-espresso font-medium">
                &ldquo;Beauty enhancements should flatter your singular features rather than follow rigid templates.&rdquo;
              </h2>
              {brandData.artist.bioLong.map((paragraph, index) => (
                <p key={index} className="text-sm sm:text-base text-espresso-muted leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Philosophy Pillars */}
            <div className="space-y-4 pt-6 border-t border-stone-hairline">
              <span className="text-[11px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
                Artistic Principles
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div className="p-4 bg-ivory/50 border border-stone-hairline space-y-1.5">
                  <strong className="text-espresso block font-medium">
                    Eye Anatomy Mapping
                  </strong>
                  <p className="text-espresso-muted leading-relaxed">
                    Custom mapping accounts for deep-set, hooded, almond, or protruding eyes to optimize lift without unnatural angles.
                  </p>
                </div>

                <div className="p-4 bg-ivory/50 border border-stone-hairline space-y-1.5">
                  <strong className="text-espresso block font-medium">
                    Strict Lash Health
                  </strong>
                  <p className="text-espresso-muted leading-relaxed">
                    Extensions are matched to the natural lash diameter and strength to avoid premature shedding or folicular strain.
                  </p>
                </div>

                <div className="p-4 bg-ivory/50 border border-stone-hairline space-y-1.5">
                  <strong className="text-espresso block font-medium">
                    Sanitary Protocol
                  </strong>
                  <p className="text-espresso-muted leading-relaxed">
                    Medical-grade sterilization for implements, disposable applicators, and clean air filtration throughout the loft.
                  </p>
                </div>

                <div className="p-4 bg-ivory/50 border border-stone-hairline space-y-1.5">
                  <strong className="text-espresso block font-medium">
                    State Board Approved Trainer
                  </strong>
                  <p className="text-espresso-muted leading-relaxed">
                    Educating aspiring lash professionals in Arizona on safe lash mechanics, isolation, and adhesive science.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 border-t border-stone-hairline flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={brandData.links.squareBooking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-espresso text-porcelain text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso-light transition-colors shadow-md"
              >
                <Calendar className="w-4 h-4 text-rose-soft" />
                <span>Book with Corina on Square</span>
              </a>

              <a
                href={brandData.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-espresso/30 text-espresso text-xs uppercase tracking-[0.2em] font-medium hover:border-espresso hover:bg-white/40 transition-colors"
              >
                <Instagram className="w-4 h-4 text-rose-muted" />
                <span>Follow {brandData.links.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
