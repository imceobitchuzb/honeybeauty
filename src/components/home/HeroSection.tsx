"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Sparkles, MapPin } from "lucide-react";
import { brandData } from "@/data/brand";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-porcelain pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-stone-hairline">
      {/* Subtle background ambient accents */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-rose-blush/30 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-10 w-80 h-80 bg-ivory/60 rounded-full blur-2xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Headline & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8">
            {/* Editorial Location Kicker */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-ivory border border-stone-hairline text-[11px] uppercase tracking-[0.24em] text-mauve-dusty font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-muted" />
              <span>Scottsdale Quarter · Loft 28</span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-serif text-espresso font-normal leading-[1.08] tracking-tight">
                Your lashes. <br />
                <span className="italic font-light text-espresso-light">
                  Your kind of beautiful.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-espresso/80 font-sans font-normal leading-relaxed max-w-xl pt-2">
                Personalized lash and brow artistry, thoughtfully tailored to your unique eye anatomy and personal aesthetic by Corina in Scottsdale, Arizona.
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 max-w-md">
              <a
                href={brandData.links.squareBooking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-espresso text-porcelain text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 hover:bg-espresso-light shadow-md hover:shadow-lg active:translate-y-px"
              >
                <Calendar className="w-4 h-4 text-rose-soft" />
                <span>Book on Square</span>
              </a>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border border-espresso/30 text-espresso text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 hover:border-espresso hover:bg-white/40"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-3.5 h-3.5 text-mauve-dusty" />
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 border-t border-stone-hairline/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-sans">
              <div>
                <span className="block font-serif text-xl sm:text-2xl text-espresso font-medium">
                  4+ Years
                </span>
                <span className="text-espresso-muted text-[11px] uppercase tracking-wider">
                  Lash Artistry
                </span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl text-espresso font-medium">
                  AZ State Board
                </span>
                <span className="text-espresso-muted text-[11px] uppercase tracking-wider">
                  Approved Trainer
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block font-serif text-xl sm:text-2xl text-espresso font-medium">
                  Loft 28
                </span>
                <span className="text-espresso-muted text-[11px] uppercase tracking-wider">
                  Private Studio
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Hero Image Composition (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative hairline frame */}
              <div
                className="absolute -inset-3.5 border border-stone-hairline/80 pointer-events-none hidden sm:block"
                aria-hidden="true"
              />

              {/* Main Image Container */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-ivory shadow-editorial">
                <Image
                  src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85"
                  alt="Close-up editorial lash extension artistry and wispy lash design"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 550px"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Overlaid Editorial Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-porcelain/95 backdrop-blur-md p-3.5 border border-stone-hairline">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-medium">
                        Artisan Technique
                      </p>
                      <p className="font-serif text-sm text-espresso font-medium">
                        Dimensional Wispy Hybrid
                      </p>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-espresso font-sans border-b border-espresso/40 pb-0.5">
                      Bespoke
                    </span>
                  </div>
                </div>
              </div>

              {/* Small floating metadata pill */}
              <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-1.5 bg-espresso text-porcelain px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium shadow-md">
                <Sparkles className="w-3 h-3 text-rose-soft" />
                <span>Custom Mapping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
