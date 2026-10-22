import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, MapPin, Truck, Calendar, ArrowRight } from "lucide-react";
import { db } from "@/lib/db";

export default function OrderConfirmationPage({
  params,
}: {
  params: { id: string };
}) {
  const order = db.getOrderById(params.id);

  if (!order) {
    return (
      <div className="bg-porcelain min-h-[60vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-ivory border border-stone-hairline p-8 text-center space-y-4">
          <h1 className="font-serif text-2xl text-espresso">Order Reference Not Found</h1>
          <p className="text-xs text-espresso-muted font-sans leading-relaxed">
            We could not locate this order reference. If you recently placed an order, please check your confirmation email.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-espresso text-porcelain text-xs uppercase tracking-widest font-medium"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-porcelain min-h-screen py-10 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-ivory/60 border border-stone-hairline p-8 sm:p-12 space-y-8 shadow-editorial">
          {/* Header */}
          <div className="text-center space-y-3 pb-6 border-b border-stone-hairline">
            <div className="w-16 h-16 rounded-full bg-porcelain border border-stone-hairline flex items-center justify-center mx-auto text-espresso">
              <CheckCircle2 className="w-8 h-8 text-rose-muted" />
            </div>

            <span className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
              Payment Confirmed
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-espresso font-normal">
              Thank You for Your Order
            </h1>
            <p className="font-serif text-lg text-espresso font-medium">
              Order #{order.orderNumber}
            </p>
            <p className="text-xs text-espresso-muted font-sans">
              A receipt has been recorded for {order.customerEmail}.
            </p>
          </div>

          {/* Delivery & Customer Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-sans">
            <div className="p-5 bg-porcelain border border-stone-hairline space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-mauve-dusty font-semibold block">
                Delivery Details
              </span>
              {order.shippingAddress.isStudioPickup ? (
                <div className="space-y-1">
                  <p className="font-medium text-espresso flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-muted" />
                    Studio Pickup at Loft 28
                  </p>
                  <p className="text-espresso-muted">Salon Lofts · Scottsdale Quarter</p>
                  <p className="text-espresso-muted">15169 N Scottsdale Rd, Loft 28</p>
                  <p className="text-espresso-muted">Scottsdale, AZ 85254</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="font-medium text-espresso flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-rose-muted" />
                    Standard Domestic Shipping
                  </p>
                  <p className="text-espresso-muted">{order.shippingAddress.street}</p>
                  <p className="text-espresso-muted">
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                  </p>
                </div>
              )}
            </div>

            <div className="p-5 bg-porcelain border border-stone-hairline space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-mauve-dusty font-semibold block">
                Client &amp; Payment Status
              </span>
              <p className="text-espresso">
                <strong>Recipient: </strong> {order.customerName}
              </p>
              <p className="text-espresso">
                <strong>Phone: </strong> {order.customerPhone}
              </p>
              <p className="text-espresso">
                <strong>Payment Status: </strong>
                <span className="text-emerald-700 font-semibold uppercase text-[11px] ml-1">
                  {order.paymentStatus}
                </span>
              </p>
              {order.isDemo && (
                <p className="text-amber-800 text-[10px] italic pt-1">
                  Sandbox Order Record (Local persistence mode)
                </p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl text-espresso font-medium border-b border-stone-hairline pb-2">
              Items Ordered
            </h2>

            <div className="divide-y divide-stone-hairline/60">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs font-sans">
                  <div>
                    <p className="font-serif text-sm text-espresso font-medium">{item.name}</p>
                    <p className="text-espresso-muted text-[11px]">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-serif text-sm text-espresso font-medium">
                    ${((item.priceCents * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-stone-hairline pt-4 space-y-1.5 text-xs font-sans text-espresso/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${(order.subtotalCents / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Sales Tax (AZ)</span>
                <span>${(order.taxCents / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {order.shippingCents === 0 ? "FREE" : `$${(order.shippingCents / 100).toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-stone-hairline pt-2 flex justify-between text-espresso font-medium text-base">
                <span>Total Paid</span>
                <span className="font-serif text-xl">${(order.totalCents / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-stone-hairline flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto px-7 py-3.5 bg-espresso text-porcelain text-xs uppercase tracking-widest font-medium hover:bg-espresso-light transition-colors text-center"
            >
              Return to Homepage
            </Link>
            <Link
              href="/book"
              className="w-full sm:w-auto px-7 py-3.5 border border-espresso/30 text-espresso text-xs uppercase tracking-widest font-medium hover:border-espresso hover:bg-white/40 transition-colors text-center"
            >
              Book Studio Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
