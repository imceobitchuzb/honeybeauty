"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Calendar, ShoppingBag, MapPin } from "lucide-react";
import { brandData } from "@/data/brand";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/book", label: "Book" },
  { href: "/shop", label: "Shop Boutique" },
  { href: "/artist", label: "The Artist" },
  { href: "/gallery", label: "Gallery" },
  { href: "/aftercare", label: "Aftercare" },
  { href: "/contact", label: "Contact & Studio" },
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { toggleCart, itemCount } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll reliably when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Don't render public header on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "py-2.5 sm:py-3 shadow-sm" : "py-3 sm:py-4 lg:py-5"
        }`}
      >
        {/* Isolated background to prevent backdrop-filter containing block bugs */}
        <div
          className={`absolute inset-0 -z-10 transition-colors duration-300 pointer-events-none ${
            scrolled
              ? "bg-porcelain/95 backdrop-blur-md border-b border-stone-hairline/80"
              : "bg-porcelain/90 backdrop-blur-sm border-b border-stone-hairline/50"
          }`}
        />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Wordmark */}
            <Link
              href="/"
              className="group flex flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-espresso rounded pr-2 flex-shrink-0"
            >
              <span className="font-serif text-lg sm:text-2xl lg:text-3xl tracking-[0.1em] sm:tracking-[0.14em] uppercase text-espresso font-medium transition-colors group-hover:text-espresso-muted">
                Flutterhoney
              </span>
              <span className="text-[7.5px] sm:text-[9px] uppercase tracking-[0.22em] sm:tracking-[0.28em] text-mauve-dusty font-sans font-medium -mt-0.5">
                Scottsdale · By Corina
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center gap-3.5 xl:gap-6 text-xs uppercase tracking-[0.12em] xl:tracking-[0.16em] font-sans font-medium"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-1 transition-colors duration-200 hover:text-espresso whitespace-nowrap ${
                      isActive ? "text-espresso font-semibold" : "text-espresso/70"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-rose-muted transition-all" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Bag & Booking CTA & Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Shopping Bag Button */}
              <button
                type="button"
                onClick={toggleCart}
                aria-label={`Shopping bag with ${itemCount} items`}
                className="relative p-2 text-espresso hover:text-espresso-muted transition-colors rounded"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-muted text-white text-[9px] font-medium flex items-center justify-center font-sans">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Booking CTA */}
              <Link
                href="/book"
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 lg:px-5 py-1.5 sm:py-2.5 rounded-none bg-espresso text-porcelain text-[9.5px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.18em] font-medium transition-all duration-200 hover:bg-espresso-light active:translate-y-px whitespace-nowrap shadow-sm"
              >
                <Calendar className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-rose-soft flex-shrink-0" />
                <span>
                  Book<span className="hidden sm:inline lg:hidden xl:inline"> Appointment</span>
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close main menu" : "Open main menu"}
                className="lg:hidden p-2 text-espresso hover:text-espresso-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-espresso rounded flex items-center justify-center border border-espresso/20"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Rendered via Portal directly into document.body */}
      {mounted &&
        isOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className="lg:hidden fixed inset-0 z-[100] bg-porcelain flex flex-col h-[100dvh] w-full animate-fadeIn"
          >
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-stone-hairline/60 bg-porcelain flex-shrink-0">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="group flex flex-col focus:outline-none"
              >
                <span className="font-serif text-lg tracking-[0.1em] uppercase text-espresso font-medium">
                  Flutterhoney
                </span>
                <span className="text-[7.5px] uppercase tracking-[0.22em] text-mauve-dusty font-sans font-medium -mt-0.5">
                  Scottsdale · By Corina
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close main menu"
                className="p-2 text-espresso hover:text-espresso-muted focus:outline-none rounded border border-espresso/20 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Navigation Area with Momentum Touch Scrolling */}
            <div
              className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-8 py-6 min-h-0 flex flex-col justify-between"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="space-y-6">
                <div className="text-[10px] uppercase tracking-[0.26em] text-mauve-dusty font-medium pb-2 border-b border-stone-hairline">
                  Explore Flutterhoney
                </div>

                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-xl sm:text-2xl font-serif tracking-wide py-2.5 flex items-center justify-between border-b border-stone-hairline/40 transition-colors ${
                          isActive
                            ? "text-espresso font-semibold"
                            : "text-espresso/75 hover:text-espresso"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-4 h-4 text-rose-muted flex-shrink-0" />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Actions & Studio Location Info */}
              <div className="pt-6 pb-8 space-y-4 border-t border-stone-hairline mt-8 flex-shrink-0">
                <Link
                  href="/book"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-espresso text-porcelain text-xs uppercase tracking-[0.2em] font-medium shadow-md hover:bg-espresso-light transition-colors"
                >
                  <Calendar className="w-4 h-4 text-rose-soft" />
                  <span>Reserve Appointment</span>
                </Link>

                <div className="text-center space-y-1 text-xs text-espresso-muted font-sans pt-1">
                  <div className="flex items-center justify-center gap-1.5 font-medium text-espresso">
                    <MapPin className="w-3.5 h-3.5 text-rose-muted" />
                    <span>Salon Lofts · Scottsdale Quarter</span>
                  </div>
                  <p className="text-[11px] text-espresso/70">Loft 28 · 15169 N Scottsdale Rd, Scottsdale, AZ</p>
                  <a
                    href={brandData.links.squareBooking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-rose-muted hover:text-espresso font-medium tracking-wider pt-1.5 text-xs"
                  >
                    Official Square Booking Portal &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
