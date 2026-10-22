"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Calendar,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Sparkles,
  FileText,
  BarChart3,
  Settings,
  Shield,
  LogOut,
  ExternalLink,
  Menu,
  X,
  CreditCard,
} from "lucide-react";
import { User } from "@/lib/db/types";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarCheck },
  { href: "/admin/calendar", label: "Calendar View", icon: Calendar },
  { href: "/admin/products", label: "Product Catalog", icon: Package },
  { href: "/admin/inventory", label: "Inventory & Stock", icon: Layers },
  { href: "/admin/orders", label: "Customer Orders", icon: ShoppingBag },
  { href: "/admin/customers", label: "Client Directory", icon: Users },
  { href: "/admin/services", label: "Services & Studio", icon: Sparkles },
  { href: "/admin/content", label: "Website Content", icon: FileText },
  { href: "/admin/analytics", label: "Analytics & Revenue", icon: BarChart3 },
  { href: "/admin/settings", label: "Platform & Square", icon: Settings },
  { href: "/admin/audit-log", label: "Security Audit Log", icon: Shield },
];

export default function AdminShell({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-porcelain flex text-espresso font-sans">
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden lg:flex flex-col justify-between w-64 bg-ivory border-r border-stone-hairline flex-shrink-0 min-h-screen p-6">
        <div className="space-y-6">
          {/* Brand header */}
          <div className="space-y-1 pb-4 border-b border-stone-hairline">
            <Link href="/" className="block">
              <span className="font-serif text-2xl uppercase tracking-[0.14em] text-espresso font-medium block">
                Flutterhoney
              </span>
              <span className="text-[9px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
                Management Workspace
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
                    isActive
                      ? "bg-espresso text-porcelain shadow-sm"
                      : "text-espresso/70 hover:text-espresso hover:bg-porcelain"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-stone-hairline space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="truncate pr-2">
              <p className="font-medium text-espresso truncate">{user.name}</p>
              <p className="text-[10px] text-mauve-dusty uppercase font-semibold">
                {user.role}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 text-espresso/60 hover:text-espresso rounded"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 bg-porcelain border border-stone-hairline text-[11px] text-espresso uppercase tracking-wider font-medium hover:border-espresso/40"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-mauve-dusty" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-porcelain/95 backdrop-blur-md border-b border-stone-hairline py-3 px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 text-espresso border border-stone-hairline rounded"
            >
              <Menu className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase tracking-[0.2em] text-mauve-dusty font-semibold">
              Loft 28 Business Console
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Square Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 text-[10px] uppercase tracking-wider font-medium rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>Demo / Sandbox Mode</span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-espresso/70 hover:text-espresso font-medium px-2 py-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Mobile Sidebar Overlay with Portal and Momentum Touch Scrolling */}
        {mounted &&
          mobileMenuOpen &&
          createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Admin Navigation Menu"
              className="fixed inset-0 z-[100] lg:hidden flex"
            >
              <div
                className="fixed inset-0 bg-espresso/50 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />

              <div className="relative w-72 max-w-[85vw] bg-ivory border-r border-stone-hairline p-5 flex flex-col justify-between z-10 animate-fadeIn h-[100dvh]">
                <div
                  className="flex-1 overflow-y-auto overscroll-contain min-h-0 space-y-5 pr-1"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  <div className="flex items-center justify-between border-b border-stone-hairline pb-3">
                    <div>
                      <span className="font-serif text-xl uppercase tracking-widest text-espresso font-medium block">
                        Flutterhoney
                      </span>
                      <span className="text-[9px] uppercase tracking-widest text-mauve-dusty font-semibold">
                        Admin Console
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      aria-label="Close admin menu"
                      className="p-1.5 text-espresso hover:text-espresso-muted rounded"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <nav className="space-y-1">
                    {adminNav.map((item) => {
                      const Icon = item.icon;
                      const isActive =
                        item.href === "/admin"
                          ? pathname === "/admin"
                          : pathname.startsWith(item.href);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 text-xs uppercase tracking-wider font-medium transition-colors rounded ${
                            isActive
                              ? "bg-espresso text-porcelain"
                              : "text-espresso/70 hover:bg-porcelain hover:text-espresso"
                          }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                <div className="pt-4 pb-2 border-t border-stone-hairline space-y-2 flex-shrink-0">
                  <div className="text-xs pb-1">
                    <p className="font-medium text-espresso truncate">{user.name}</p>
                    <p className="text-[10px] text-mauve-dusty uppercase font-semibold">{user.role}</p>
                  </div>
                  <Link
                    href="/"
                    target="_blank"
                    className="flex items-center justify-between px-3 py-2 bg-porcelain border border-stone-hairline text-[11px] text-espresso uppercase tracking-wider font-medium hover:border-espresso/40"
                  >
                    <span>View Public Site</span>
                    <ExternalLink className="w-3.5 h-3.5 text-mauve-dusty" />
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-espresso text-porcelain text-xs uppercase tracking-wider font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )}

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
