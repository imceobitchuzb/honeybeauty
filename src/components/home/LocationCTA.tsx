import Link from "next/link";
import { MapPin, Calendar, Instagram, ArrowUpRight, Clock, Car } from "lucide-react";
import { brandData } from "@/data/brand";

export default function LocationCTA() {
  return (
    <section className="py-20 lg:py-28 bg-porcelain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-espresso text-porcelain p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle background glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 bg-rose-muted/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-rose-soft text-[10px] uppercase tracking-[0.24em] font-medium">
                <MapPin className="w-3 h-3 text-rose-muted" />
                <span>Scottsdale Quarter</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-normal leading-tight">
                A calm, private studio loft designed just for you.
              </h2>

              <p className="text-sm sm:text-base text-stone-subtle font-sans leading-relaxed max-w-xl">
                Nestled inside Salon Lofts at Scottsdale Quarter, Loft 28 offers an intimate, quiet space to relax while receiving bespoke lash and brow treatments.
              </p>

              {/* Practical Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs font-sans text-stone-hairline">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-soft flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Address</strong>
                    <span>15169 N Scottsdale Rd, Loft 28, Scottsdale, AZ 85254</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-rose-soft flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Availability</strong>
                    <span>By appointment only via online booking system</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 sm:col-span-2">
                  <Car className="w-4 h-4 text-rose-soft flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Parking Access</strong>
                    <span>Complimentary parking structure inside Scottsdale Quarter with convenient elevator access.</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-rose-muted text-espresso text-xs uppercase tracking-[0.2em] font-semibold hover:bg-rose-soft transition-colors shadow-lg active:translate-y-px"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Appointment</span>
                </Link>

                <a
                  href={brandData.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-white/20 text-white text-xs uppercase tracking-[0.2em] font-medium hover:border-white hover:bg-white/10 transition-colors"
                >
                  <span>Google Maps</span>
                  <ArrowUpRight className="w-4 h-4 text-rose-soft" />
                </a>
              </div>
            </div>

            {/* Right Column: Mini Card (5 cols) */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-sm space-y-4">
              <span className="text-[10px] uppercase tracking-[0.22em] text-rose-soft font-semibold block">
                Connect Directly
              </span>
              <h3 className="font-serif text-2xl text-white font-medium">
                Follow On Instagram
              </h3>
              <p className="text-xs text-stone-subtle leading-relaxed font-sans">
                Browse Corina&apos;s latest client work, lash education tips, and studio updates on Instagram.
              </p>
              <div className="pt-2">
                <a
                  href={brandData.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-sans uppercase tracking-widest font-medium transition-colors"
                >
                  <Instagram className="w-4 h-4 text-rose-soft" />
                  <span>{brandData.links.instagramHandle}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
