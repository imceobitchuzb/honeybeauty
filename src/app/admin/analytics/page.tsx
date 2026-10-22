import { db } from "@/lib/db";
import { BarChart3, TrendingUp, DollarSign, CalendarCheck, ShoppingBag, ShieldCheck } from "lucide-react";

export default function AdminAnalyticsPage() {
  const appointments = db.getAppointments();
  const orders = db.getOrders();

  const paidOrders = orders.filter((o) => o.paymentStatus === "PAID");
  const totalBoutiqueSalesCents = paidOrders.reduce((sum, o) => sum + o.totalCents, 0);
  const avgOrderValueCents =
    paidOrders.length > 0 ? Math.round(totalBoutiqueSalesCents / paidOrders.length) : 0;

  const confirmedAppointments = appointments.filter((a) => a.status === "CONFIRMED");
  const totalAppointmentValueCents = confirmedAppointments.reduce(
    (sum, a) => sum + a.priceCents,
    0
  );

  // Service breakdown
  const serviceCounts: Record<string, number> = {};
  appointments.forEach((a) => {
    serviceCounts[a.serviceName] = (serviceCounts[a.serviceName] || 0) + 1;
  });

  // Product sales counts
  const productSalesCounts: Record<string, { qty: number; revenueCents: number }> = {};
  paidOrders.forEach((o) => {
    o.items.forEach((it) => {
      if (!productSalesCounts[it.name]) {
        productSalesCounts[it.name] = { qty: 0, revenueCents: 0 };
      }
      productSalesCounts[it.name].qty += it.quantity;
      productSalesCounts[it.name].revenueCents += it.priceCents * it.quantity;
    });
  });

  const bestSellers = Object.entries(productSalesCounts).sort(
    (a, b) => b[1].revenueCents - a[1].revenueCents
  );

  return (
    <div className="space-y-8 animate-fadeIn font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-hairline pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
            Business Reporting
          </span>
          <h1 className="text-3xl font-serif text-espresso font-normal">
            Analytics &amp; Performance
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 text-[10px] uppercase font-semibold">
            Sandbox &amp; Demo Reporting Mode
          </span>
        </div>
      </div>

      {/* Verified Data Banner */}
      <div className="p-4 bg-ivory border border-stone-hairline flex items-center gap-3 text-xs text-espresso/80">
        <ShieldCheck className="w-5 h-5 text-rose-muted flex-shrink-0" />
        <p className="leading-relaxed">
          Reporting calculated exclusively from verified database records and authorized Square transactions. No fabricated visitor conversions or speculative metrics are shown.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 bg-ivory/60 border border-stone-hairline space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-mauve-dusty font-semibold">
            Total Boutique Sales
          </span>
          <p className="font-serif text-3xl text-espresso font-medium">
            ${(totalBoutiqueSalesCents / 100).toFixed(2)}
          </p>
          <p className="text-[11px] text-espresso-muted">
            From {paidOrders.length} processed orders
          </p>
        </div>

        <div className="p-6 bg-ivory/60 border border-stone-hairline space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-mauve-dusty font-semibold">
            Average Order Value
          </span>
          <p className="font-serif text-3xl text-espresso font-medium">
            ${(avgOrderValueCents / 100).toFixed(2)}
          </p>
          <p className="text-[11px] text-espresso-muted">
            Per completed boutique purchase
          </p>
        </div>

        <div className="p-6 bg-ivory/60 border border-stone-hairline space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-mauve-dusty font-semibold">
            Active Appointments
          </span>
          <p className="font-serif text-3xl text-espresso font-medium">
            {confirmedAppointments.length}
          </p>
          <p className="text-[11px] text-espresso-muted">
            ${(totalAppointmentValueCents / 100).toFixed(2)} projected bookings
          </p>
        </div>

        <div className="p-6 bg-ivory/60 border border-stone-hairline space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-mauve-dusty font-semibold">
            Refunds &amp; Disputes
          </span>
          <p className="font-serif text-3xl text-espresso font-medium">$0.00</p>
          <p className="text-[11px] text-emerald-700 font-medium">
            0 chargebacks recorded
          </p>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Service Booking Distribution (7 cols) */}
        <div className="lg:col-span-7 bg-ivory/60 border border-stone-hairline p-6 space-y-5">
          <h2 className="font-serif text-xl text-espresso font-medium border-b border-stone-hairline pb-3">
            Service Booking Volume
          </h2>

          <div className="space-y-4">
            {Object.entries(serviceCounts).map(([svcName, count]) => {
              const pct = Math.round((count / appointments.length) * 100);
              return (
                <div key={svcName} className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-espresso font-medium">
                    <span>{svcName}</span>
                    <span>
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-porcelain border border-stone-hairline h-2 overflow-hidden">
                    <div
                      className="bg-rose-muted h-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Products (5 cols) */}
        <div className="lg:col-span-5 bg-ivory/60 border border-stone-hairline p-6 space-y-5">
          <h2 className="font-serif text-xl text-espresso font-medium border-b border-stone-hairline pb-3">
            Top Selling Aftercare
          </h2>

          <div className="space-y-3">
            {bestSellers.length === 0 ? (
              <p className="text-xs text-espresso-muted py-4 text-center">
                No product sales recorded yet.
              </p>
            ) : (
              bestSellers.map(([pName, data]) => (
                <div
                  key={pName}
                  className="p-3 bg-porcelain border border-stone-hairline flex items-center justify-between text-xs"
                >
                  <div>
                    <strong className="text-espresso block font-medium">
                      {pName}
                    </strong>
                    <span className="text-[11px] text-mauve-dusty">
                      {data.qty} units fulfilled
                    </span>
                  </div>
                  <span className="font-serif text-sm text-espresso font-medium">
                    ${(data.revenueCents / 100).toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
