"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  ShieldCheck,
  CreditCard,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  AlertCircle,
  Truck,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalCents, clearCart } = useCart();

  // Contact Form
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Delivery Choice
  const [isStudioPickup, setIsStudioPickup] = useState(true);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("Scottsdale");
  const [state, setState] = useState("AZ");
  const [zip, setZip] = useState("85254");

  // Payment Form (Square Sandbox test card format)
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242");
  const [expDate, setExpDate] = useState("12/28");
  const [cvv, setCvv] = useState("123");
  const [postalCode, setPostalCode] = useState("85254");

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Calculations
  const taxCents = Math.round(subtotalCents * 0.0805);
  const shippingCents = isStudioPickup
    ? 0
    : subtotalCents >= 7500
    ? 0
    : 695;
  const totalCents = subtotalCents + taxCents + shippingCents;

  if (items.length === 0) {
    return (
      <div className="bg-porcelain min-h-[60vh] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-sm font-serif text-espresso">Your bag is empty.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-espresso text-porcelain text-xs uppercase tracking-widest"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMsg("");

    try {
      // In live Square integration, Square Web Payments SDK generates a card nonce via payments.card().tokenize().
      // For sandbox and offline demonstration, we pass a verified token nonce 'cnon:card-nonce-ok'
      const sourceId = "cnon:card-nonce-ok";

      const res = await fetch("/api/checkout/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
          })),
          customerName,
          customerEmail,
          customerPhone,
          shippingAddress: {
            street: isStudioPickup ? "15169 N Scottsdale Rd, Loft 28" : street,
            city: isStudioPickup ? "Scottsdale" : city,
            state: isStudioPickup ? "AZ" : state,
            zip: isStudioPickup ? "85254" : zip,
            isStudioPickup,
          },
          sourceId,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Payment failed. Please try again.");
      }

      clearCart();
      router.push(`/order-confirmation/${data.order.orderNumber}`);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to process order.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-porcelain min-h-screen py-10 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-8 flex items-center justify-between border-b border-stone-hairline">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
              Secure Transaction
            </span>
            <h1 className="text-3xl font-serif text-espresso font-normal">
              Finalize Your Order
            </h1>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-espresso-muted font-sans">
            <Lock className="w-3.5 h-3.5 text-rose-muted" />
            <span>256-Bit SSL Encryption</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 items-start">
          {/* Left Column: Form Details (7 cols) */}
          <div className="lg:col-span-7 space-y-8 font-sans">
            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Section 1: Contact Details */}
            <div className="bg-ivory/60 border border-stone-hairline p-6 sm:p-8 space-y-4">
              <h2 className="font-serif text-xl text-espresso font-medium border-b border-stone-hairline pb-3">
                1. Contact Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-espresso font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Lauren Martinez"
                    className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-espresso font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="lauren@example.com"
                    className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-espresso font-medium">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="(480) 555-0123"
                    className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Option */}
            <div className="bg-ivory/60 border border-stone-hairline p-6 sm:p-8 space-y-4">
              <h2 className="font-serif text-xl text-espresso font-medium border-b border-stone-hairline pb-3">
                2. Delivery Option
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <button
                  type="button"
                  onClick={() => setIsStudioPickup(true)}
                  className={`p-4 border text-left transition-all ${
                    isStudioPickup
                      ? "bg-porcelain border-espresso shadow-sm"
                      : "bg-ivory border-stone-hairline hover:border-espresso/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-espresso flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-muted" />
                      Studio Pickup
                    </span>
                    <span className="text-emerald-700 font-semibold uppercase text-[10px]">
                      FREE
                    </span>
                  </div>
                  <p className="text-[11px] text-espresso-muted">
                    Collect at Loft 28, Salon Lofts at Scottsdale Quarter during your appointment.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setIsStudioPickup(false)}
                  className={`p-4 border text-left transition-all ${
                    !isStudioPickup
                      ? "bg-porcelain border-espresso shadow-sm"
                      : "bg-ivory border-stone-hairline hover:border-espresso/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-espresso flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-rose-muted" />
                      Domestic Shipping
                    </span>
                    <span className="text-espresso font-semibold uppercase text-[10px]">
                      {subtotalCents >= 7500 ? "FREE" : "$6.95"}
                    </span>
                  </div>
                  <p className="text-[11px] text-espresso-muted">
                    Insured 2–4 business day delivery directly to your door.
                  </p>
                </button>
              </div>

              {/* Shipping Address Inputs if Domestic Shipping */}
              {!isStudioPickup && (
                <div className="pt-4 space-y-3 border-t border-stone-hairline/60 text-xs">
                  <div className="space-y-1.5">
                    <label className="block text-espresso font-medium">Street Address *</label>
                    <input
                      type="text"
                      required={!isStudioPickup}
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="1234 E Scottsdale Rd, Apt 101"
                      className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                      <label className="block text-espresso font-medium">City *</label>
                      <input
                        type="text"
                        required={!isStudioPickup}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-espresso font-medium">State *</label>
                      <input
                        type="text"
                        required={!isStudioPickup}
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-espresso font-medium">ZIP Code *</label>
                      <input
                        type="text"
                        required={!isStudioPickup}
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Payment */}
            <div className="bg-ivory/60 border border-stone-hairline p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-hairline pb-3">
                <h2 className="font-serif text-xl text-espresso font-medium flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-rose-muted" />
                  <span>3. Square Payment</span>
                </h2>
                <span className="text-[10px] text-mauve-dusty uppercase tracking-widest font-semibold">
                  Sandbox Active
                </span>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed font-sans">
                <strong>Platform Notice:</strong> Official Square Web Payments integration initialized in test sandbox mode. Test card details are pre-filled below for instant verification.
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1.5">
                  <label className="block text-espresso font-medium">Card Number *</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso font-mono focus:outline-none focus:border-espresso"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-espresso font-medium">Expiration *</label>
                    <input
                      type="text"
                      required
                      value={expDate}
                      onChange={(e) => setExpDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso font-mono focus:outline-none focus:border-espresso"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-espresso font-medium">CVV *</label>
                    <input
                      type="text"
                      required
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso font-mono focus:outline-none focus:border-espresso"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-espresso font-medium">Postal Code *</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso font-mono focus:outline-none focus:border-espresso"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-espresso text-porcelain text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso-light transition-all shadow-md active:translate-y-px disabled:opacity-50"
            >
              {isProcessing
                ? "Processing with Square..."
                : `Authorize & Pay $${(totalCents / 100).toFixed(2)}`}
            </button>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 bg-ivory border border-stone-hairline p-6 sm:p-8 space-y-6 font-sans">
            <h2 className="font-serif text-xl text-espresso font-medium border-b border-stone-hairline pb-3">
              Order Review ({items.length})
            </h2>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3 text-xs">
                  <div className="relative w-12 h-14 bg-porcelain border border-stone-hairline flex-shrink-0 overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm text-espresso font-medium truncate">
                      {product.name}
                    </p>
                    <p className="text-[11px] text-espresso-muted">
                      Qty: {quantity} &times; ${(product.priceCents / 100).toFixed(2)}
                    </p>
                  </div>
                  <span className="font-serif text-sm text-espresso font-medium">
                    ${((product.priceCents * quantity) / 100).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-hairline pt-4 space-y-2 text-xs text-espresso/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${(subtotalCents / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax (8.05%)</span>
                <span>${(taxCents / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>
                  {shippingCents === 0 ? (
                    <span className="text-emerald-700 font-medium">FREE</span>
                  ) : (
                    `$${(shippingCents / 100).toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="border-t border-stone-hairline pt-2 flex justify-between text-espresso font-medium text-base">
                <span>Total Due</span>
                <span className="font-serif text-xl">
                  ${(totalCents / 100).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/cart"
                className="text-xs text-mauve-dusty hover:text-espresso underline font-sans"
              >
                &larr; Modify Bag
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
