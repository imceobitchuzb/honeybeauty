import Link from "next/link";
import { servicesData } from "@/data/services";
import { brandData } from "@/data/brand";
import { Clock, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";

export default function AdminServicesPage() {
  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-hairline pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
            Studio Menu Operations
          </span>
          <h1 className="text-3xl font-serif text-espresso font-normal">
            Services &amp; Treatment Offerings
          </h1>
        </div>

        <Link
          href="/book"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-espresso text-porcelain text-xs uppercase tracking-wider font-medium hover:bg-espresso-light"
        >
          <span>View Public Booking Page</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {servicesData.map((svc) => (
          <div
            key={svc.id}
            className="p-6 bg-ivory/60 border border-stone-hairline space-y-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-mauve-dusty font-semibold block">
                  {svc.categoryLabel}
                </span>
                <h2 className="font-serif text-xl text-espresso font-medium">
                  {svc.name}
                </h2>
                <p className="text-xs text-mauve-dusty font-medium">
                  {svc.subtitle}
                </p>
              </div>

              {svc.isSignature && (
                <span className="px-2 py-0.5 bg-rose-blush/60 text-espresso text-[9px] uppercase font-semibold">
                  Signature
                </span>
              )}
            </div>

            <p className="text-xs text-espresso-muted leading-relaxed">
              {svc.description}
            </p>

            <div className="p-3 bg-porcelain border border-stone-hairline text-xs space-y-1">
              <p>
                <strong className="text-espresso">Ideal Client: </strong>
                <span className="text-espresso-muted">{svc.idealFor}</span>
              </p>
              <div className="flex items-center gap-3 pt-1 text-[11px] text-mauve-dusty">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-rose-muted" />
                  {svc.estimatedDuration}
                </span>
                <span>·</span>
                <span className="text-emerald-700 font-medium">
                  Verified on Square
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-espresso-muted">
              <span className="font-mono text-[10px] text-mauve-dusty">
                ID: {svc.id}
              </span>
              <a
                href={svc.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-espresso font-medium underline hover:text-rose-muted"
              >
                Square Service Route &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
