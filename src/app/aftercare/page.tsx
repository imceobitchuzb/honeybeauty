import type { Metadata } from "next";
import Link from "next/link";
import {
  Droplets,
  Sparkles,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Calendar,
  HeartHandshake,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { brandData } from "@/data/brand";

export const metadata: Metadata = {
  title: "Client Aftercare & Maintenance Guide",
  description:
    "Essential care instructions for lash extensions, lash lifts, and brow lamination from Corina Gonzalez at Flutterhoney in Scottsdale.",
};

export default function AftercarePage() {
  return (
    <div className="bg-porcelain min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pb-12 lg:pb-16 border-b border-stone-hairline">
          <span className="text-[11px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
            Preserve Your Investment
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-espresso font-normal leading-tight">
            Client Aftercare Guide
          </h1>
          <p className="text-base sm:text-lg text-espresso-muted font-sans leading-relaxed">
            Thoughtful aftercare ensures healthy natural lashes, exceptional retention, and fluffy, pristine arches between your appointments.
          </p>
        </div>

        {/* Safety & Medical Disclaimer Banner */}
        <div className="my-10 p-5 bg-ivory border border-stone-hairline flex items-start gap-3.5 text-xs font-sans text-espresso/80">
          <ShieldCheck className="w-5 h-5 text-rose-muted flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-espresso font-medium block">
              Professional &amp; Conservative Guidance
            </strong>
            <p className="leading-relaxed">
              These recommendations provide general guidance for typical appointments. Always prioritize the tailored advice given by Corina during your consultation. If you experience unexpected redness, swelling, or eye discomfort, gently consult Corina or seek professional medical attention promptly.
            </p>
          </div>
        </div>

        {/* Section 1: Eyelash Extensions Aftercare */}
        <div className="space-y-8 pt-6">
          <div className="space-y-2 border-b border-stone-hairline pb-4">
            <span className="text-[10px] uppercase tracking-[0.22em] text-mauve-dusty font-semibold block">
              Section 01
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-espresso font-medium">
              Eyelash Extensions Care
            </h2>
            <p className="text-xs sm:text-sm text-espresso-muted font-sans">
              For Classic, Hybrid, and Volume Full Sets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Do's */}
            <div className="bg-ivory/50 border border-stone-hairline p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-espresso font-medium text-sm font-sans uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Daily Best Practices (The Do&apos;s)</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-espresso-muted font-sans">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-muted flex-shrink-0 mt-2" />
                  <span>
                    <strong>Wash Daily with Lash Foam:</strong> Cleanse your lash line daily using an oil-free, lash-extension safe shampoo to remove natural sebum, dead skin, and environmental pollutants.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-muted flex-shrink-0 mt-2" />
                  <span>
                    <strong>Brush Gently When Dry:</strong> Use your clean spoolie wand to gently detangle the mid-lengths and tips only when your lashes are completely dry.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-muted flex-shrink-0 mt-2" />
                  <span>
                    <strong>Sleep on Back or Silk Pillowcase:</strong> Avoid burying your face in pillows to prevent friction that bends or detaches extensions prematurely.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-muted flex-shrink-0 mt-2" />
                  <span>
                    <strong>Schedule 2–3 Week Fills:</strong> Routine refills replace naturally shed lashes and safely remove grown-out outliners before they strain your follicles.
                  </span>
                </li>
              </ul>
            </div>

            {/* The Don'ts */}
            <div className="bg-ivory/50 border border-stone-hairline p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-espresso font-medium text-sm font-sans uppercase tracking-wider">
                <XCircle className="w-4 h-4 text-rose-muted" />
                <span>What to Avoid (The Don&apos;ts)</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-espresso-muted font-sans">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-muted flex-shrink-0 mt-2" />
                  <span>
                    <strong>No Oil-Based Products:</strong> Avoid oil cleansers, heavy eye creams, and waterproof micellar waters near the eye contour; oils dissolve medical adhesives.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-muted flex-shrink-0 mt-2" />
                  <span>
                    <strong>Never Pick or Pull:</strong> Pulling extensions will pluck the attached natural lash prematurely, potentially damaging the follicle root.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-muted flex-shrink-0 mt-2" />
                  <span>
                    <strong>No Mechanical Curlers:</strong> Mechanical lash curlers crimp and snap extension bonds and natural fibers.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-muted flex-shrink-0 mt-2" />
                  <span>
                    <strong>Avoid Direct High Heat:</strong> Stay mindful around hot ovens, blow dryers, grills, and steam saunas, which can singe synthetic fiber curl.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: Lash Lift & Keratin Tint Care */}
        <div className="space-y-8 pt-16">
          <div className="space-y-2 border-b border-stone-hairline pb-4">
            <span className="text-[10px] uppercase tracking-[0.22em] text-mauve-dusty font-semibold block">
              Section 02
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-espresso font-medium">
              Keratin Lash Lift &amp; Tint Care
            </h2>
            <p className="text-xs sm:text-sm text-espresso-muted font-sans">
              Preserving upward curl for 6 to 8 weeks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm font-sans">
            <div className="p-6 bg-ivory/50 border border-stone-hairline space-y-2.5">
              <div className="w-8 h-8 rounded-full bg-porcelain border border-stone-hairline flex items-center justify-center text-espresso font-semibold">
                24h
              </div>
              <h3 className="font-serif text-lg text-espresso font-medium">
                Initial 24 Hours
              </h3>
              <p className="text-espresso-muted leading-relaxed">
                Keep lashes completely dry and steam-free for the first 24 hours. Avoid swimming, heavy perspiration, and rubbing while keratin bonds lock into place.
              </p>
            </div>

            <div className="p-6 bg-ivory/50 border border-stone-hairline space-y-2.5">
              <div className="w-8 h-8 rounded-full bg-porcelain border border-stone-hairline flex items-center justify-center text-rose-muted">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-lg text-espresso font-medium">
                Gentle Grooming
              </h3>
              <p className="text-espresso-muted leading-relaxed">
                Brush lashes upward with a clean spoolie each morning. After 24 hours, you may wear water-based mascara if desired, though most clients find they don&apos;t need it.
              </p>
            </div>

            <div className="p-6 bg-ivory/50 border border-stone-hairline space-y-2.5">
              <div className="w-8 h-8 rounded-full bg-porcelain border border-stone-hairline flex items-center justify-center text-rose-muted">
                <Droplets className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-lg text-espresso font-medium">
                Conditioning Routine
              </h3>
              <p className="text-espresso-muted leading-relaxed">
                Apply a recommended nourishing lash serum or conditioning balm 2–3 times a week to keep the keratin cuticles hydrated and glossy.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Brow Lamination Care */}
        <div className="space-y-8 pt-16">
          <div className="space-y-2 border-b border-stone-hairline pb-4">
            <span className="text-[10px] uppercase tracking-[0.22em] text-mauve-dusty font-semibold block">
              Section 03
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-espresso font-medium">
              Brow Lamination &amp; Sculpt Care
            </h2>
            <p className="text-xs sm:text-sm text-espresso-muted font-sans">
              Maintaining fluffy, aligned arches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm font-sans">
            <div className="p-6 bg-ivory/50 border border-stone-hairline space-y-3">
              <h3 className="font-serif text-lg text-espresso font-medium">
                First 48 Hours
              </h3>
              <ul className="space-y-2 text-espresso-muted">
                <li>&bull; Do not wet, steam, or apply skincare active ingredients (retinols, AHAs) to the brow area.</li>
                <li>&bull; Sleep on your back to prevent flattening or misshaping the newly set brow hairs.</li>
                <li>&bull; Avoid touching or heavily brushing the brows during the initial setting window.</li>
              </ul>
            </div>

            <div className="p-6 bg-ivory/50 border border-stone-hairline space-y-3">
              <h3 className="font-serif text-lg text-espresso font-medium">
                Long-Term Brow Maintenance
              </h3>
              <ul className="space-y-2 text-espresso-muted">
                <li>&bull; After 48 hours, brush brows into your desired shape each morning with a clear brow gel or nourishing balm.</li>
                <li>&bull; Apply nourishing brow oil nightly to maintain hair elasticity and hydration.</li>
                <li>&bull; Book your next lamination around the 6 to 8 week mark to allow natural brow hair cycles to regenerate.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Callout */}
        <div className="mt-16 p-8 bg-ivory border border-stone-hairline text-center space-y-4">
          <h3 className="font-serif text-2xl text-espresso font-medium">
            Ready to Refresh Your Look?
          </h3>
          <p className="text-sm text-espresso-muted font-sans max-w-lg mx-auto">
            Maintain your symmetry and fullness by reserving your refill or fresh treatment ahead of time.
          </p>
          <div className="pt-2">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-espresso text-porcelain text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso-light transition-colors shadow-sm"
            >
              <Calendar className="w-4 h-4 text-rose-soft" />
              <span>Reserve Your Next Fill Online</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
