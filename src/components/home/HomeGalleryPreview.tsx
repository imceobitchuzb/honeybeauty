"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { galleryItems, GalleryItem } from "@/data/gallery";

export default function HomeGalleryPreview() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const previewItems = galleryItems.slice(0, 6);

  const openLightbox = (item: GalleryItem) => setActiveItem(item);
  const closeLightbox = () => setActiveItem(null);

  const currentIndex = activeItem
    ? previewItems.findIndex((it) => it.id === activeItem.id)
    : -1;

  const showNext = () => {
    if (currentIndex >= 0 && currentIndex < previewItems.length - 1) {
      setActiveItem(previewItems[currentIndex + 1]);
    } else {
      setActiveItem(previewItems[0]);
    }
  };

  const showPrev = () => {
    if (currentIndex > 0) {
      setActiveItem(previewItems[currentIndex - 1]);
    } else {
      setActiveItem(previewItems[previewItems.length - 1]);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-porcelain border-b border-stone-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-hairline">
          <div className="space-y-3 max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
              Visual Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-espresso font-normal">
              Artistry in Detail
            </h2>
            <p className="text-sm text-espresso-muted font-sans leading-relaxed">
              Curated glimpses of custom lash sets, lash lifts, and sculpted brows. Editorial presentation representing the aesthetic standards of Flutterhoney.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-espresso hover:text-rose-muted transition-colors"
            >
              <span>View Full Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {previewItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group relative cursor-pointer overflow-hidden bg-ivory border border-stone-hairline aspect-[4/5] transition-all duration-300 hover:shadow-editorial"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-espresso/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white">
                <div className="self-end">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/20 backdrop-blur-md text-[10px] uppercase tracking-widest text-porcelain">
                    <Eye className="w-3 h-3" />
                    <span>View</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-rose-soft font-sans font-medium">
                    {item.categoryLabel}
                  </span>
                  <h3 className="font-serif text-xl font-normal text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-porcelain/80 line-clamp-2 font-sans font-light">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Permanent Tag */}
              <div className="absolute bottom-3 left-3 bg-porcelain/90 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase tracking-widest text-espresso font-sans font-medium group-hover:opacity-0 transition-opacity">
                {item.tag}
              </div>
            </div>
          ))}
        </div>

        {/* Attribution note */}
        <p className="text-[11px] text-center text-mauve-dusty font-sans pt-8">
          Portfolio references represent Flutterhoney’s styling repertoire. Real client results vary based on individual natural lash anatomy.
        </p>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 bg-espresso/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full bg-porcelain border border-stone-hairline overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between p-4 border-b border-stone-hairline bg-ivory">
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-mauve-dusty font-medium block">
                  {activeItem.categoryLabel}
                </span>
                <h3 className="font-serif text-lg text-espresso font-medium">
                  {activeItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                className="p-2 text-espresso hover:text-espresso-muted rounded focus:outline-none focus:ring-2 focus:ring-espresso"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Lightbox Image */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-black">
              <Image
                src={activeItem.imageUrl}
                alt={activeItem.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 900px"
              />

              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-porcelain/80 text-espresso hover:bg-porcelain rounded-full shadow-md"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-porcelain/80 text-espresso hover:bg-porcelain rounded-full shadow-md"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom details */}
            <div className="p-4 sm:p-6 bg-porcelain flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-espresso-muted font-sans max-w-lg">
                {activeItem.description}
              </p>
              <Link
                href="/book"
                className="px-5 py-2.5 bg-espresso text-porcelain text-xs uppercase tracking-widest font-medium hover:bg-espresso-light transition-colors whitespace-nowrap"
              >
                Book This Look
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
