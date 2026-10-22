import Image from "next/image";
import Link from "next/link";
import { Instagram, Calendar, Award, ShieldCheck, MapPin } from "lucide-react";
import { brandData } from "@/data/brand";

export default function MeetArtistSection() {
  return (
    <section className="py-20 lg:py-28 bg-ivory/30 border-b border-stone-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Portrait (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer hairline accent */}
              <div
                className="absolute -inset-4 border border-stone-hairline pointer-events-none hidden sm:block"
                aria-hidden="true"
              />

              <div className="relative aspect-[3/4] overflow-hidden bg-porcelain shadow-editorial">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                  alt="Corina Gonzalez, founder and lash & brow specialist at Flutterhoney"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                  className="object-cover object-center"
                />

                {/* Overlaid credentials tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-porcelain/95 backdrop-blur-md p-4 border border-stone-hairline">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-ivory border border-stone-hairline flex items-center justify-center text-rose-muted flex-shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-serif text-base text-espresso font-medium">
                        Corina Gonzalez
                      </p>
                      <p className="text-[10px] uppercase tracking-widest text-mauve-dusty font-sans">
                        AZ Board-Approved Lash Trainer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Artistry Journey (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
                Meet The Artist
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-espresso font-normal leading-tight">
                Craft, intention, and an eye for quiet elegance.
              </h2>
            </div>

            <div className="space-y-4 text-espresso/80 font-sans leading-relaxed text-base sm:text-lg">
              <p>
                Hello, I&apos;m Corina. For over ten years in the professional beauty industry — and more than four years devoted to the intricate craft of lash extensions — my mission has remained simple: to give every client effortless, tailored beauty that feels like an organic extension of themselves.
              </p>
              <p className="text-sm sm:text-base text-espresso-muted">
                As an Arizona State Board-approved lash trainer, I hold every appointment to uncompromising standards of isolation, sanitary protocol, and lash health. I don&apos;t believe in copy-paste templates; I carefully assess your natural eye shape, brow bone, and curl tolerance to handcraft a set that frames your eyes with balanced distinction.
              </p>
            </div>

            {/* Verified highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-hairline text-xs font-sans">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-rose-muted flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-espresso block font-medium">
                    10+ Years in Beauty
                  </strong>
                  <span className="text-espresso-muted">
                    Comprehensive knowledge of aesthetics, skin, and symmetry.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-rose-muted flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-espresso block font-medium">
                    Board-Approved Educator
                  </strong>
                  <span className="text-espresso-muted">
                    Certified by the Arizona State Board to train emerging artists.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-muted flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-espresso block font-medium">
                    Loft 28 at Scottsdale Quarter
                  </strong>
                  <span className="text-espresso-muted">
                    A peaceful, private studio suite designed for relaxed comfort.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Instagram className="w-4 h-4 text-rose-muted flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-espresso block font-medium">
                    Instagram Portfolio
                  </strong>
                  <span className="text-espresso-muted">
                    Regularly updated with fresh sets and client transformations.
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-espresso text-porcelain text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso-light transition-colors shadow-sm"
              >
                <Calendar className="w-4 h-4 text-rose-soft" />
                <span>Book with Corina</span>
              </Link>

              <a
                href={brandData.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-espresso/30 text-espresso text-xs uppercase tracking-[0.2em] font-medium hover:border-espresso hover:bg-white/40 transition-colors"
              >
                <Instagram className="w-4 h-4 text-rose-muted" />
                <span>Follow {brandData.links.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
