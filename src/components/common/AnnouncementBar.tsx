import Link from "next/link";
import { Sparkles, MapPin } from "lucide-react";
import { brandData } from "@/data/brand";

export default function AnnouncementBar() {
  return (
    <div className="relative z-50 bg-espresso text-porcelain border-b border-espresso-light/40 py-2 px-3 sm:px-4 text-[10px] sm:text-xs font-sans tracking-wider sm:tracking-widest uppercase transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-1.5 text-rose-soft/90">
          <MapPin className="w-3 h-3 text-rose-muted" />
          <span>Scottsdale Quarter · Loft 28</span>
        </div>

        <div className="mx-auto text-center flex items-center justify-center gap-2 text-[10px] sm:text-xs">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-muted animate-pulse flex-shrink-0" />
          <span className="font-medium text-white/95 truncate">
            Personalized Lashes &amp; Brows · Scottsdale, AZ
          </span>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={brandData.links.squareBooking}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-soft hover:text-white transition-colors underline-offset-4 hover:underline text-[11px] tracking-wider font-medium"
          >
            Book on Square &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
