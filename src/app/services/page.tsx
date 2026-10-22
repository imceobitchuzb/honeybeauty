import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, CheckCircle2, Sparkles, Clock, ArrowUpRight, HelpCircle } from "lucide-react";
import { servicesData } from "@/data/services";
import { brandData } from "@/data/brand";

export const metadata: Metadata = {
  title: "Services & Treatments Menu",
  description:
    "Explore bespoke eyelash extensions, lash lifts, and brow artistry by Corina at Flutterhoney in Scottsdale Quarter. Book online via Square.",
};

const categories = [
  { id: "all", label: "All Services" },
  { id: "extensions", label: "Lash Extensions" },
  { id: "lifts", label: "Lash Lift & Tint" },
  { id: "brows", label: "Brow Artistry" },
  { id: "waxing", label: "Waxing & Grooming" },
];

export default function ServicesPage() {
  return (
    <div className="bg-porcelain min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pb-12 lg:pb-16 border-b border-stone-hairline">
          <span className="text-[11px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
            Tailored Treatments
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-espresso font-normal leading-tight">
            Services &amp; Artistry Menu
          </h1>
          <p className="text-base sm:text-lg text-espresso-muted font-sans leading-relaxed">
            Every lash and brow treatment is customized for your individual eye contour, lifestyle, and natural lash health in Loft 28 at Scottsdale Quarter.
          </p>

          <div className="pt-2">
            <a
              href={brandData.links.squareBooking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-espresso text-porcelain text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso-light transition-colors shadow-sm"
            >
              <Calendar className="w-4 h-4 text-rose-soft" />
              <span>Book Direct on Square</span>
            </a>
          </div>
        </div>

        {/* Live Booking Advisory Note */}
        <div className="my-10 p-5 bg-ivory border border-stone-hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-espresso/80">
          <div className="flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-rose-muted flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-espresso font-medium block">
                Official Square Scheduling
              </strong>
              <span>
                Exact real-time calendar availability, service durations, and current pricing are confirmed directly inside the official Square portal.
              </span>
            </div>
          </div>
          <a
            href={brandData.links.squareBooking}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap inline-flex items-center gap-1.5 text-espresso font-medium uppercase tracking-widest hover:text-rose-muted"
          >
            <span>Open Square Scheduler</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Services List - Full Menu */}
        <div className="space-y-12 lg:space-y-16 pt-6">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="bg-ivory/40 border border-stone-hairline p-6 sm:p-10 transition-all duration-300 hover:border-espresso/30"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Image on left/right depending on index for visual rhythm */}
                <div
                  className={`lg:col-span-5 relative aspect-[16/11] overflow-hidden bg-porcelain border border-stone-hairline ${
                    index % 2 === 1 ? "lg:order-last" : ""
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover object-center"
                  />
                  <div className="absolute top-3 left-3 bg-porcelain/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest text-espresso font-medium font-sans">
                    {service.categoryLabel}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-mauve-dusty font-semibold block">
                      {service.subtitle}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif text-espresso font-medium">
                      {service.name}
                    </h2>
                  </div>

                  <p className="text-sm sm:text-base text-espresso-muted font-sans leading-relaxed">
                    {service.description}
                  </p>

                  {/* Ideal For Box */}
                  <div className="p-3 bg-porcelain border border-stone-hairline text-xs font-sans text-espresso/80">
                    <strong className="text-espresso font-medium">Ideal For: </strong>
                    {service.idealFor}
                  </div>

                  {/* Highlights */}
                  <div className="pt-2">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-espresso/70">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-rose-muted flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom bar with action */}
                  <div className="pt-4 border-t border-stone-hairline flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-xs font-sans text-espresso-muted">
                      {service.estimatedDuration && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-rose-muted" />
                          {service.estimatedDuration}
                        </span>
                      )}
                      <span>·</span>
                      <span className="text-espresso font-medium">
                        Live on Square
                      </span>
                    </div>

                    <a
                      href={brandData.links.squareBooking}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-espresso text-porcelain text-xs uppercase tracking-widest font-medium hover:bg-espresso-light transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5 text-rose-soft" />
                      <span>Book on Square</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How to Choose a Service Guide */}
        <div className="mt-20 p-8 sm:p-12 bg-ivory border border-stone-hairline space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
              First-Time Client Advisory
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-espresso font-medium">
              Not Sure Which Treatment to Choose?
            </h3>
            <p className="text-sm text-espresso-muted font-sans leading-relaxed">
              Here is a quick reference to help you decide which appointment best suits your daily routine and desired aesthetic:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs font-sans">
            <div className="p-5 bg-porcelain border border-stone-hairline space-y-2">
              <h4 className="font-serif text-lg text-espresso font-medium">
                Classic or Lift?
              </h4>
              <p className="text-espresso-muted leading-relaxed">
                If you have healthy, long natural lashes and want zero daily maintenance, book a <strong>Keratin Lash Lift &amp; Tint</strong>. If you want added length and curl not possible naturally, choose a <strong>Classic Full Set</strong>.
              </p>
            </div>

            <div className="p-5 bg-porcelain border border-stone-hairline space-y-2">
              <h4 className="font-serif text-lg text-espresso font-medium">
                Hybrid or Volume?
              </h4>
              <p className="text-espresso-muted leading-relaxed">
                Choose <strong>Hybrid / Wispy</strong> for airy, Kim-K inspired texture with varying peak lengths. Choose <strong>Volume</strong> if you have sparse natural lashes and desire full, velvety density along the lash line.
              </p>
            </div>

            <div className="p-5 bg-porcelain border border-stone-hairline space-y-2">
              <h4 className="font-serif text-lg text-espresso font-medium">
                Brow Lamination?
              </h4>
              <p className="text-espresso-muted leading-relaxed">
                Ideal for anyone with downward-growing hairs, thin arches, or unruly brows. Lamination straightens and directs hairs upward for a fuller, runway-ready brushed look lasting 6 to 8 weeks.
              </p>
            </div>
          </div>

          <div className="pt-4 text-center">
            <a
              href={brandData.links.squareBooking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-espresso text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso-light transition-colors"
            >
              <Calendar className="w-4 h-4 text-rose-soft" />
              <span>Select Your Treatment on Square</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
