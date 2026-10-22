import Link from "next/link";
import { Calendar, Search, Sparkles, CheckCircle2 } from "lucide-react";
import { brandData } from "@/data/brand";

const steps = [
  {
    step: "01",
    title: "Explore & Select",
    description:
      "Browse our curated service menu to select your desired treatment — from tailored classic lashes and wispy hybrid fans to keratin lifts and brow lamination.",
    icon: Search,
  },
  {
    step: "02",
    title: "Reserve Online",
    description:
      "Choose your preferred date, select an open time slot, and securely guarantee your appointment with instant confirmation sent directly to your phone and email.",
    icon: Calendar,
  },
  {
    step: "03",
    title: "Unwind at Loft 28",
    description:
      "Arrive at Salon Lofts Scottsdale Quarter. Relax in our private, peaceful studio suite while Corina custom-maps and handcrafts your personalized set.",
    icon: Sparkles,
  },
];

export default function AppointmentJourney() {
  return (
    <section className="py-20 lg:py-28 bg-porcelain border-b border-stone-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 pb-14 lg:pb-16">
          <span className="text-[11px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
            Seamless &amp; Transparent
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-espresso font-normal">
            The Booking Experience
          </h2>
          <p className="text-sm sm:text-base text-espresso-muted font-sans leading-relaxed">
            From discovering your ideal styling direction to stepping out of Loft 28 with elevated confidence.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative bg-ivory/60 border border-stone-hairline p-8 space-y-5 transition-all duration-300 hover:border-espresso/30 hover:shadow-subtle"
              >
                <div className="flex items-center justify-between border-b border-stone-hairline pb-4">
                  <span className="font-serif text-3xl text-rose-muted font-light">
                    {item.step}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-porcelain border border-stone-hairline flex items-center justify-center text-espresso">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-espresso font-medium">
                    {item.title}
                  </h3>
                  <p className="text-sm text-espresso-muted font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout button */}
        <div className="mt-12 text-center">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 bg-espresso text-porcelain text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso-light transition-all shadow-md active:translate-y-px"
          >
            <Calendar className="w-4 h-4 text-rose-soft" />
            <span>Reserve Your Appointment</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
