import type { Metadata } from "next";
import Link from "next/link";
import GalleryView from "@/components/gallery/GalleryView";
import { brandData } from "@/data/brand";
import { Calendar, Instagram } from "lucide-react";

export const metadata: Metadata = {
  title: "Visual Portfolio & Gallery",
  description:
    "Explore Flutterhoney’s lash and brow portfolio by Corina Gonzalez in Scottsdale, AZ. Classic sets, wispy hybrids, volume lash lines, and sculpted brows.",
};

export default function GalleryPage() {
  return (
    <div className="bg-porcelain min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pb-12 border-b border-stone-hairline">
          <span className="text-[11px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
            Portfolio Showcase
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-espresso font-normal leading-tight">
            The Gallery
          </h1>
          <p className="text-base sm:text-lg text-espresso-muted font-sans leading-relaxed">
            Close-up perspectives, custom lash mapping, and brow transformations crafted at Loft 28 in Scottsdale Quarter.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-espresso text-porcelain text-xs uppercase tracking-widest font-medium hover:bg-espresso-light transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-rose-soft" />
              <span>Reserve Appointment</span>
            </Link>
            <a
              href={brandData.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-espresso/30 text-espresso text-xs uppercase tracking-widest font-medium hover:border-espresso hover:bg-white/40 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-rose-muted" />
              <span>Instagram {brandData.links.instagramHandle}</span>
            </a>
          </div>
        </div>

        {/* Gallery Interactive Component */}
        <div className="pt-10">
          <GalleryView />
        </div>
      </div>
    </div>
  );
}
