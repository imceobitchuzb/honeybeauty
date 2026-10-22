"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, X, ChevronLeft, ChevronRight, Calendar, Sparkles } from "lucide-react";
import { galleryItems, GalleryItem } from "@/data/gallery";
import { brandData } from "@/data/brand";

const filterCategories = [
  { id: "all", label: "All Works" },
  { id: "hybrid", label: "Wispy & Hybrid" },
  { id: "extensions", label: "Classic Extensions" },
  { id: "volume", label: "Volume Lashes" },
  { id: "lifts", label: "Lash Lift & Tint" },
  { id: "brows", label: "Brow Artistry" },
  { id: "studio", label: "Loft Studio" },
];

export default function GalleryView() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    if (selectedFilter === "all") return galleryItems;
    return galleryItems.filter((item) => item.category === selectedFilter);
  }, [selectedFilter]);

  const currentIndex = activeItem
    ? filteredItems.findIndex((it) => it.id === activeItem.id)
    : -1;

  const showNext = () => {
    if (currentIndex >= 0 && currentIndex < filteredItems.length - 1) {
      setActiveItem(filteredItems[currentIndex + 1]);
    } else {
      setActiveItem(filteredItems[0]);
    }
  };

  const showPrev = () => {
    if (currentIndex > 0) {
      setActiveItem(filteredItems[currentIndex - 1]);
    } else {
      setActiveItem(filteredItems[filteredItems.length - 1]);
    }
  };

  return (
    <div className="space-y-10">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2">
        {filterCategories.map((cat) => {
          const isActive = selectedFilter === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.16em] font-sans font-medium transition-all ${
                isActive
                  ? "bg-espresso text-porcelain shadow-sm"
                  : "bg-ivory border border-stone-hairline text-espresso/70 hover:text-espresso hover:border-espresso/40"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group relative cursor-pointer overflow-hidden bg-ivory border border-stone-hairline aspect-[4/5] transition-all duration-300 hover:shadow-editorial hover:border-espresso/30"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Hover details */}
            <div className="absolute inset-0 bg-espresso/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white">
              <div className="self-end">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md text-[10px] uppercase tracking-widest text-porcelain">
                  <Eye className="w-3 h-3" />
                  <span>Enlarge</span>
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.22em] text-rose-soft font-sans font-medium">
                  {item.categoryLabel}
                </span>
                <h3 className="font-serif text-xl font-normal text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-subtle line-clamp-2 font-sans font-light">
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

      {/* Disclaimer */}
      <div className="pt-6 text-center text-xs text-mauve-dusty font-sans">
        <p>
          Each set is custom-crafted to match natural eye symmetry and lash density. Individual results will naturally differ.
        </p>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 bg-espresso/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setActiveItem(null)}
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
                onClick={() => setActiveItem(null)}
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
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-espresso text-porcelain text-xs uppercase tracking-widest font-medium hover:bg-espresso-light transition-colors whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 text-rose-soft" />
                <span>Book This Look</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
