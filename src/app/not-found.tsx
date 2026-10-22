import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import { brandData } from "@/data/brand";

export default function NotFound() {
  return (
    <div className="bg-porcelain min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-6 bg-ivory/60 border border-stone-hairline p-8 sm:p-12 shadow-editorial">
        <span className="text-[11px] uppercase tracking-[0.28em] text-mauve-dusty font-medium block">
          Page Not Found · 404
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-espresso font-normal leading-tight">
          A Quiet Detour
        </h1>
        <p className="text-sm text-espresso-muted font-sans leading-relaxed">
          The page you are looking for has been moved or does not exist. Allow us to guide you back to our curated offerings.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-espresso text-porcelain text-xs uppercase tracking-widest font-medium hover:bg-espresso-light transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/book"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-espresso/30 text-espresso text-xs uppercase tracking-widest font-medium hover:border-espresso hover:bg-white/40 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-rose-muted" />
            <span>Book Appointment</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
