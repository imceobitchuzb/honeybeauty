"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Instagram, Calendar, MapPin, Sparkles, ShoppingBag, Shield } from "lucide-react";
import { brandData } from "@/data/brand";

export default function SiteFooter() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Don't render public footer on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-porcelain border-t border-stone-hairline text-espresso transition-colors">
      {/* Top Banner / Statement */}
      <div className="border-b border-stone-hairline/70 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="text-[11px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
                Scottsdale Quarter · Private Loft 28
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-espresso font-normal leading-tight">
                Your lashes. <br />
                <span className="italic font-light">Your kind of beautiful.</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-espresso text-porcelain text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 hover:bg-espresso-light shadow-sm"
              >
                <Calendar className="w-4 h-4 text-rose-soft" />
                <span>Book Appointment</span>
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-espresso/30 text-espresso text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 hover:border-espresso hover:bg-white/40"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-rose-muted" />
                <span>Shop Aftercare</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Location Grid */}
      <div className="py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Column 1: Brand Wordmark & Ethos */}
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <span className="font-serif text-2xl tracking-[0.16em] uppercase text-espresso font-medium block">
                  Flutterhoney
                </span>
                <span className="text-[10px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
                  Lashes &amp; Brows · Corina
                </span>
              </Link>
              <p className="text-sm text-espresso-muted font-sans leading-relaxed">
                Bespoke lash extensions, keratin lifts, and architectural brow design tailored to your individual facial anatomy. Scottsdale, Arizona.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs text-espresso font-medium uppercase tracking-wider bg-ivory px-3 py-1.5 border border-stone-hairline">
                  <Sparkles className="w-3 h-3 text-rose-muted" />
                  AZ Board-Approved Trainer
                </span>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.24em] font-semibold text-espresso">
                Explore
              </h3>
              <ul className="space-y-2.5 text-sm font-sans">
                <li>
                  <Link href="/book" className="text-espresso font-medium hover:text-rose-muted transition-colors">
                    Book Treatment
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="text-espresso font-medium hover:text-rose-muted transition-colors">
                    Shop Aftercare
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-espresso-muted hover:text-espresso transition-colors">
                    Services &amp; Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/artist" className="text-espresso-muted hover:text-espresso transition-colors">
                    The Artist · Corina
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="text-espresso-muted hover:text-espresso transition-colors">
                    Visual Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/aftercare" className="text-espresso-muted hover:text-espresso transition-colors">
                    Client Aftercare Guide
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-espresso-muted hover:text-espresso transition-colors">
                    Contact &amp; Studio Loft
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Studio & Location */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.24em] font-semibold text-espresso">
                Studio Location
              </h3>
              <div className="text-sm text-espresso-muted space-y-1.5 font-sans leading-relaxed">
                <p className="font-medium text-espresso flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-muted flex-shrink-0" />
                  Salon Lofts · Scottsdale Quarter
                </p>
                <p>Loft 28</p>
                <p>15169 N Scottsdale Rd</p>
                <p>Scottsdale, AZ 85254</p>
                <p className="text-xs text-mauve-dusty pt-1">
                  Complimentary garage parking with elevator access.
                </p>
                <a
                  href={brandData.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-espresso font-medium hover:text-rose-muted underline underline-offset-4 pt-1"
                >
                  <span>Google Maps Directions</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Column 4: Hours & Booking */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.24em] font-semibold text-espresso">
                Appointments
              </h3>
              <div className="text-sm text-espresso-muted space-y-2 font-sans">
                <p>
                  <strong className="text-espresso font-medium">Hours:</strong> By Appointment Only.
                </p>
                <p className="text-xs leading-relaxed">
                  Real-time calendar availability and instant reservation confirmed directly via Square.
                </p>
                <div className="pt-2">
                  <a
                    href={brandData.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-espresso font-medium hover:text-rose-muted transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-rose-muted" />
                    <span>Instagram {brandData.links.instagramHandle}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright, Admin & Privacy */}
      <div className="border-t border-stone-hairline py-6 text-xs text-espresso-muted font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            &copy; {currentYear} Flutterhoney. All rights reserved. Scottsdale, Arizona.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-espresso transition-colors">
              Privacy Policy
            </Link>
            <a
              href={brandData.links.squareBooking}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-espresso transition-colors"
            >
              Square Booking
            </a>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-espresso font-medium hover:text-rose-muted transition-colors"
            >
              <Shield className="w-3 h-3 text-rose-muted" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
