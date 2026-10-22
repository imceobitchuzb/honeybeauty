import Link from "next/link";
import {
  CalendarCheck,
  ShoppingBag,
  DollarSign,
  Package,
  ArrowUpRight,
  Clock,
  MapPin,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { db } from "@/lib/db";
import { brandData } from "@/data/brand";

export default function AdminDashboardPage() {
  const appointments = db.getAppointments();
  const orders = db.getOrders();
  const products = db.getProducts();

  const confirmedAppointments = appointments.filter((a) => a.status === "CONFIRMED");
  const totalSalesCents = orders
    .filter((o) => o.paymentStatus === "PAID")
    .reduce((sum, o) => sum + o.totalCents, 0);

  const lowStockProducts = products.filter((p) => p.inventoryCount <= 5);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-hairline pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
            Scottsdale Studio Operations
          </span>
          <h1 className="text-3xl font-serif text-espresso font-normal">
            Business Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/appointments"
            className="px-4 py-2 bg-espresso text-porcelain text-xs uppercase tracking-wider font-medium hover:bg-espresso-light transition-colors"
          >
            Manage Bookings
          </Link>
          <Link
            href="/admin/products"
            className="px-4 py-2 border border-espresso/30 text-espresso text-xs uppercase tracking-wider font-medium hover:bg-ivory transition-colors"
          >
            Add Product
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 bg-ivory border border-stone-hairline space-y-2">
          <div className="flex items-center justify-between text-xs text-mauve-dusty uppercase font-semibold">
            <span>Upcoming Appointments</span>
            <CalendarCheck className="w-4 h-4 text-rose-muted" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl text-espresso font-medium">
              {confirmedAppointments.length}
            </span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 font-medium">
              Active
            </span>
          </div>
          <p className="text-[11px] text-espresso-muted">
            Next: {appointments[0]?.customerName || "No upcoming clients"}
          </p>
        </div>

        <div className="p-6 bg-ivory border border-stone-hairline space-y-2">
          <div className="flex items-center justify-between text-xs text-mauve-dusty uppercase font-semibold">
            <span>Completed Orders</span>
            <ShoppingBag className="w-4 h-4 text-rose-muted" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl text-espresso font-medium">
              {orders.length}
            </span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 font-medium">
              Boutique
            </span>
          </div>
          <p className="text-[11px] text-espresso-muted">
            {orders.filter((o) => o.fulfillmentStatus === "READY_FOR_PICKUP").length} awaiting studio pickup
          </p>
        </div>

        <div className="p-6 bg-ivory border border-stone-hairline space-y-2">
          <div className="flex items-center justify-between text-xs text-mauve-dusty uppercase font-semibold">
            <span>Boutique Revenue</span>
            <DollarSign className="w-4 h-4 text-rose-muted" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl text-espresso font-medium">
              ${(totalSalesCents / 100).toFixed(2)}
            </span>
            <span className="text-[9px] text-amber-800 bg-amber-50 px-1.5 py-0.5 font-medium">
              Sandbox
            </span>
          </div>
          <p className="text-[11px] text-espresso-muted">
            Gross online sales processed
          </p>
        </div>

        <div className="p-6 bg-ivory border border-stone-hairline space-y-2">
          <div className="flex items-center justify-between text-xs text-mauve-dusty uppercase font-semibold">
            <span>Low Stock Alerts</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl text-espresso font-medium">
              {lowStockProducts.length}
            </span>
            <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 font-medium">
              Needs Attention
            </span>
          </div>
          <p className="text-[11px] text-espresso-muted">
            {products.length} total active aftercare SKUs
          </p>
        </div>
      </div>

      {/* Two Column Layout: Upcoming Bookings & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Upcoming Appointments (7 cols) */}
        <div className="lg:col-span-7 bg-ivory/60 border border-stone-hairline p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-stone-hairline pb-4">
            <h2 className="font-serif text-xl text-espresso font-medium">
              Upcoming Studio Appointments
            </h2>
            <Link
              href="/admin/appointments"
              className="text-xs text-espresso font-medium uppercase tracking-wider hover:text-rose-muted"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {appointments.slice(0, 4).map((apt) => (
              <div
                key={apt.id}
                className="p-4 bg-porcelain border border-stone-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-sm text-espresso font-medium">
                      {apt.customerName}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider bg-ivory px-2 py-0.5 font-semibold text-espresso-muted">
                      {apt.bookingReference}
                    </span>
                  </div>
                  <p className="text-espresso-muted">{apt.serviceName}</p>
                  <div className="flex items-center gap-3 text-[11px] text-mauve-dusty">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-rose-muted" />
                      {new Date(apt.startAt).toLocaleString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                    <span>·</span>
                    <span>{apt.durationMinutes} min</span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                  <span
                    className={`px-2 py-0.5 text-[9px] uppercase font-semibold tracking-wider ${
                      apt.status === "CONFIRMED"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-stone-200 text-stone-700"
                    }`}
                  >
                    {apt.status}
                  </span>
                  <span className="text-xs font-serif text-espresso">
                    ${(apt.priceCents / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Orders & Quick Alerts (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Recent Orders Box */}
          <div className="bg-ivory/60 border border-stone-hairline p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-hairline pb-4">
              <h2 className="font-serif text-xl text-espresso font-medium">
                Recent Boutique Orders
              </h2>
              <Link
                href="/admin/orders"
                className="text-xs text-espresso font-medium uppercase tracking-wider hover:text-rose-muted"
              >
                View All &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {orders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  className="p-3.5 bg-porcelain border border-stone-hairline space-y-1 text-xs font-sans"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-espresso">
                      {order.orderNumber}
                    </span>
                    <span className="font-serif text-sm font-medium text-espresso">
                      ${(order.totalCents / 100).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[11px] text-espresso-muted">
                    {order.customerName} · {order.items.length} {order.items.length === 1 ? "item" : "items"}
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[10px] uppercase font-medium">
                    <span className="text-emerald-700">{order.paymentStatus}</span>
                    <span className="text-mauve-dusty">
                      {order.shippingAddress.isStudioPickup ? "Studio Pickup" : "Shipping"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Integration Status Callout */}
          <div className="bg-ivory border border-stone-hairline p-6 space-y-3 font-sans text-xs">
            <span className="text-[10px] uppercase tracking-widest text-mauve-dusty font-semibold block">
              System Health
            </span>
            <div className="flex items-center justify-between">
              <span className="font-medium text-espresso">Square API Connector</span>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] uppercase font-medium">
                Sandbox Mode
              </span>
            </div>
            <p className="text-[11px] text-espresso-muted leading-relaxed">
              Appointments and product orders are saved locally. Connect production Square credentials in Settings to sync live with Corina&apos;s Square catalog.
            </p>
            <div className="pt-1">
              <Link
                href="/admin/settings"
                className="text-xs text-espresso font-medium underline hover:text-rose-muted"
              >
                Configure Square Settings &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
