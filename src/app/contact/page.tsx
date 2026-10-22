import type { Metadata } from "next";
import {
  MapPin,
  Calendar,
  Instagram,
  Car,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { brandData } from "@/data/brand";

export const metadata: Metadata = {
  title: "Contact & Studio Location",
  description:
    "Visit Flutterhoney at Salon Lofts Scottsdale Quarter, Loft 28. Book online via Square or connect via Instagram @flutterhoney_.",
};

export default function ContactPage() {
  return (
    <div className="bg-porcelain min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pb-12 lg:pb-16 border-b border-stone-hairline">
          <span className="text-[11px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
            Scottsdale Sanctuary
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-espresso font-normal leading-tight">
            Contact &amp; Studio Location
          </h1>
          <p className="text-base sm:text-lg text-espresso-muted font-sans leading-relaxed">
            Located inside Salon Lofts at Scottsdale Quarter, Loft 28. We welcome clients by appointment for a calm, personalized beauty retreat.
          </p>
        </div>

        {/* Main Grid: Location Details & Appointment Preparation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-12 items-start">
          {/* Left Column: Studio Information & Direct Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-8 font-sans">
            {/* Primary Action Card */}
            <div className="bg-ivory border border-stone-hairline p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
                  Online Scheduling
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-espresso font-medium">
                  Reserve Your Appointment
                </h2>
                <p className="text-xs sm:text-sm text-espresso-muted leading-relaxed">
                  All appointments, reschedule requests, and real-time openings are processed directly through our official Square scheduling software.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={brandData.links.squareBooking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-espresso text-porcelain text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso-light transition-colors shadow-md"
                >
                  <Calendar className="w-4 h-4 text-rose-soft" />
                  <span>Open Square Booking</span>
                </a>

                <a
                  href={brandData.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-espresso/30 text-espresso text-xs uppercase tracking-[0.2em] font-medium hover:border-espresso hover:bg-white/40 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-rose-muted" />
                  <span>DM on Instagram</span>
                </a>
              </div>
            </div>

            {/* Address & Venue Details */}
            <div className="bg-porcelain border border-stone-hairline p-8 space-y-6">
              <h3 className="text-xl font-serif text-espresso font-medium border-b border-stone-hairline pb-3">
                Studio Address &amp; Directions
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-espresso-muted">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-rose-muted flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-espresso block font-medium">Location</strong>
                    <p className="text-espresso">Salon Lofts — Scottsdale Quarter</p>
                    <p>Loft 28</p>
                    <p>15169 N Scottsdale Rd</p>
                    <p>Scottsdale, AZ 85254</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-rose-muted flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-espresso block font-medium">Parking &amp; Arrival</strong>
                    <p>
                      Complimentary garage parking is available directly within Scottsdale Quarter. Convenient elevator access brings you right to Salon Lofts. Please head to Loft 28 upon arrival.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-rose-muted flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-espresso block font-medium">Hours &amp; Policies</strong>
                    <p>
                      By appointment only. Due to the serene one-on-one nature of appointments, please arrive right at your scheduled time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={brandData.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-espresso font-medium uppercase tracking-wider hover:text-rose-muted underline underline-offset-4"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Pre-Appointment Etiquette Guide (5 cols) */}
          <div className="lg:col-span-5 bg-ivory/60 border border-stone-hairline p-6 sm:p-8 space-y-6 font-sans">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
                Appointment Preparation
              </span>
              <h3 className="font-serif text-2xl text-espresso font-medium">
                How to Prepare for Your Session
              </h3>
              <p className="text-xs text-espresso-muted leading-relaxed">
                Following these simple pre-care steps ensures seamless adhesive bonding and allows Corina to maximize your styling time:
              </p>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-espresso-muted">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-rose-muted flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-espresso block font-medium">
                    Clean, Makeup-Free Lashes
                  </strong>
                  <span>
                    Arrive with no eye makeup, mascara, strip lash glue, or heavy under-eye serums. Residual mascara prevents extensions from bonding securely.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-rose-muted flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-espresso block font-medium">
                    Limit Caffeine Intake
                  </strong>
                  <span>
                    Avoid excessive caffeine or energy drinks immediately prior to your appointment to prevent involuntary eyelid fluttering during delicate application.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-rose-muted flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-espresso block font-medium">
                    Remove Contact Lenses
                  </strong>
                  <span>
                    If you wear contacts, bringing your lens case or wearing eyeglasses is recommended to prevent eye dryness while your eyes are closed.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-rose-muted flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-espresso block font-medium">
                    Comfortable Attire
                  </strong>
                  <span>
                    Lash appointments typically range from 60 to 120 minutes of peaceful relaxation. Cozy layers are welcomed!
                  </span>
                </div>
              </li>
            </ul>

            <div className="pt-4 border-t border-stone-hairline">
              <p className="text-[11px] text-mauve-dusty italic leading-relaxed">
                Questions prior to booking? Reach out to Corina via Instagram direct message at {brandData.links.instagramHandle}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
