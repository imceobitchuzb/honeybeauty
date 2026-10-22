import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, ExternalLink } from "lucide-react";
import { brandData } from "@/data/brand";

export const metadata: Metadata = {
  title: "Privacy & Data Policy",
  description:
    "Privacy and data practices for the Flutterhoney website. Transparency regarding external Square booking and personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-porcelain min-h-screen py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 pb-10 border-b border-stone-hairline">
          <span className="text-[11px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
            Client Transparency
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-espresso font-normal">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-espresso-muted font-sans">
            Last Updated: October 2026
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-8 pt-10 text-sm font-sans text-espresso/80 leading-relaxed">
          <div className="p-6 bg-ivory border border-stone-hairline space-y-2">
            <div className="flex items-center gap-2 text-espresso font-medium">
              <ShieldCheck className="w-4 h-4 text-rose-muted" />
              <span>Core Commitment to Client Privacy</span>
            </div>
            <p className="text-xs text-espresso-muted leading-relaxed">
              Flutterhoney (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), operated by Corina Gonzalez in Scottsdale, Arizona, is committed to respecting and protecting the privacy of our visitors and clients. This website functions primarily as an informational portfolio and brand showcase.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-espresso font-medium">
              1. Information Handling &amp; External Booking
            </h2>
            <p>
              This website does not directly collect, process, or store credit card numbers, payment credentials, or sensitive personal identity records.
            </p>
            <p>
              When you select &ldquo;Book Appointment&rdquo; or choose a service, you are redirected to our official booking scheduler hosted by <strong>Square (Block, Inc.)</strong> at <code>flutterhoney-lash.square.site</code>. All booking details, contact numbers, email addresses, and payment transactions are processed directly by Square under their industry-standard security and PCI-compliant privacy protocols.
            </p>
            <div className="pt-1">
              <a
                href="https://squareup.com/help/us/en/article/3796-privacy-and-security"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-espresso font-medium underline underline-offset-4 hover:text-rose-muted"
              >
                <span>Read Square&apos;s Official Privacy and Security Policy</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-espresso font-medium">
              2. Cookies &amp; Tracking
            </h2>
            <p>
              This website does not deploy third-party advertising tracking networks, persistent behavioral tracking cookies, or sale of client browsing telemetry. Essential functional cookies may be used solely for session stability and proper website rendering.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-espresso font-medium">
              3. Client Inquiries &amp; Communications
            </h2>
            <p>
              If you reach out to Corina via Instagram direct message or schedule an appointment on Square, any information you provide (such as your name, appointment notes, or service preferences) is used strictly to communicate regarding your appointment and deliver personalized lash and brow services. We do not sell, rent, or distribute client contact lists to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-espresso font-medium">
              4. External Links
            </h2>
            <p>
              Our website includes links to third-party services including Square, Instagram, and Google Maps. We encourage you to review the individual privacy policies of any third-party websites you visit.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-stone-hairline">
            <h2 className="text-xl font-serif text-espresso font-medium">
              5. Contacting the Studio
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy or your personal information, please connect with Corina at Loft 28, Salon Lofts at Scottsdale Quarter, or message via Instagram at{" "}
              <a
                href={brandData.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-espresso font-medium underline hover:text-rose-muted"
              >
                {brandData.links.instagramHandle}
              </a>.
            </p>
          </section>

          <div className="pt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-espresso/30 text-xs uppercase tracking-widest text-espresso font-medium hover:border-espresso hover:bg-white/40 transition-colors"
            >
              &larr; Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
