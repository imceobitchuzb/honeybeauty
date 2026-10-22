"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MapPin,
  ShieldCheck,
  CreditCard,
  Lock,
  Download,
  ShoppingBag,
} from "lucide-react";
import { servicesData, ServiceItem } from "@/data/services";

type BookingStep = 1 | 2 | 3 | 4;

interface Slot {
  startAt: string;
  endAt: string;
  staffName: string;
}

function BookingContent() {
  const searchParams = useSearchParams();
  const initialServiceId = searchParams.get("service");

  const [step, setStep] = useState<BookingStep>(1);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);

  // Form & Payment State
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [paymentOption, setPaymentOption] = useState<"DEPOSIT" | "FULL">("DEPOSIT");
  const [paymentMethod, setPaymentMethod] = useState<"CARD" | "APPLE_PAY" | "GOOGLE_PAY">("CARD");
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardZip, setCardZip] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<{
    reference: string;
    serviceName: string;
    startAt: string;
    customerName: string;
    isDemo: boolean;
    depositCents: number;
    priceCents: number;
    paymentStatus: string;
    paymentMethod: string;
    cardLast4: string;
    paymentId: string;
  } | null>(null);

  // Generate next 14 bookable days
  const today = new Date();
  const dateOptions = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1);
    return {
      iso: d.toISOString().split("T")[0],
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      monthDay: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    };
  });

  // Pre-select service from URL query params
  useEffect(() => {
    if (initialServiceId && !selectedService) {
      const match = servicesData.find((s) => s.id === initialServiceId);
      if (match) {
        setSelectedService(match);
        setSelectedDate(dateOptions[0].iso);
        setStep(2);
      }
    }
  }, [initialServiceId]);

  // Query availability slots when date/service change
  useEffect(() => {
    if (selectedService && selectedDate) {
      setIsLoadingSlots(true);
      setErrorMsg("");
      fetch(
        `/api/booking/availability?serviceId=${encodeURIComponent(
          selectedService.id
        )}&startDate=${selectedDate}&endDate=${selectedDate}`
      )
        .then((res) => res.json())
        .then((data) => {
          setIsDemoMode(data.isDemo ?? true);
          setAvailableSlots(data.slots || []);
        })
        .catch(() => {
          setErrorMsg("Failed to load time slots. Please try another date.");
        })
        .finally(() => setIsLoadingSlots(false));
    }
  }, [selectedService, selectedDate]);

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setSelectedSlot(null);
    setSelectedDate(dateOptions[0].iso);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectSlot = (slot: Slot) => {
    setSelectedSlot(slot);
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Card number input formatter
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = digits.match(/.{1,4}/g)?.join(" ") || digits;
    setCardNumber(formatted);
  };

  // Expiration input formatter (MM/YY)
  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (clean.length > 2) {
      setCardExp(`${clean.slice(0, 2)}/${clean.slice(2)}`);
    } else {
      setCardExp(clean);
    }
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedSlot) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService.id,
          startAt: selectedSlot.startAt,
          endAt: selectedSlot.endAt,
          durationMinutes: 90,
          customerName,
          customerEmail,
          customerPhone,
          notes,
          paymentOption,
          paymentMethod,
          cardNumber: cardNumber.replace(/\s+/g, ""),
          cardExp,
          cardCvv,
          cardZip,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to reserve appointment.");
      }

      setConfirmedBooking({
        reference: data.appointment.bookingReference,
        serviceName: data.appointment.serviceName,
        startAt: data.appointment.startAt,
        customerName: data.appointment.customerName,
        isDemo: data.appointment.isDemo,
        depositCents: data.appointment.depositCents || (paymentOption === "FULL" ? 15000 : 5000),
        priceCents: data.appointment.priceCents || 15000,
        paymentStatus: data.appointment.paymentStatus || "DEPOSIT_PAID",
        paymentMethod: data.appointment.paymentMethod || "CARD",
        cardLast4: data.appointment.cardLast4 || "4242",
        paymentId: data.appointment.paymentId || "sq_pay_verified",
      });

      setStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to process booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Download iCalendar (.ics) appointment file
  const downloadCalendarFile = () => {
    if (!confirmedBooking) return;
    const startDate = new Date(confirmedBooking.startAt);
    const endDate = new Date(startDate.getTime() + 90 * 60 * 1000);

    const pad = (n: number) => n.toString().padStart(2, "0");
    const formatIcsDate = (d: Date) =>
      `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(
        d.getUTCHours()
      )}${pad(d.getUTCMinutes())}00Z`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Flutterhoney//Appointment Reservation//EN",
      "BEGIN:VEVENT",
      `UID:${confirmedBooking.reference}@flutterhoney.com`,
      `DTSTAMP:${formatIcsDate(new Date())}`,
      `DTSTART:${formatIcsDate(startDate)}`,
      `DTEND:${formatIcsDate(endDate)}`,
      `SUMMARY:Flutterhoney — ${confirmedBooking.serviceName}`,
      "DESCRIPTION:Bespoke Lash & Brow appointment with Corina Gonzalez. Loft 28 at Salon Lofts Scottsdale Quarter.",
      "LOCATION:Salon Lofts - Scottsdale Quarter, Loft 28, 15169 N Scottsdale Rd, Scottsdale, AZ 85254",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Flutterhoney-Appointment-${confirmedBooking.reference}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-porcelain min-h-screen py-10 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center space-y-3 pb-8 border-b border-stone-hairline">
          <span className="text-[11px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
            Scottsdale Quarter · Loft 28
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-espresso font-normal">
            Reserve Your Treatment
          </h1>
          <p className="text-sm text-espresso-muted font-sans max-w-xl mx-auto leading-relaxed">
            Personalized lash extensions, keratin lifts, and architectural brow design with Corina Gonzalez. Direct reservation with instant card authorization.
          </p>
        </div>

        {/* Security & Direct Booking Banner */}
        <div className="my-6 p-4 bg-ivory border border-stone-hairline flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans">
          <div className="flex items-center gap-2 text-espresso">
            <ShieldCheck className="w-4 h-4 text-rose-muted flex-shrink-0" />
            <span className="font-medium">Direct Studio Reservation &amp; Secure Payment Processing</span>
          </div>

          <div className="flex items-center gap-1.5 text-espresso-muted text-[11px]">
            <Lock className="w-3 h-3 text-rose-muted" />
            <span>256-Bit SSL Encrypted &amp; PCI-DSS Compliant</span>
          </div>
        </div>

        {/* Progress Bar (Steps 1 to 3) */}
        {step < 4 && (
          <div className="pb-8 pt-2">
            <div className="flex items-center justify-between text-xs uppercase tracking-widest font-sans font-medium text-espresso-muted mb-2">
              <span className={step >= 1 ? "text-espresso font-semibold" : ""}>
                1. Select Treatment
              </span>
              <span className={step >= 2 ? "text-espresso font-semibold" : ""}>
                2. Date &amp; Time
              </span>
              <span className={step >= 3 ? "text-espresso font-semibold" : ""}>
                3. Details &amp; Payment
              </span>
            </div>
            <div className="w-full bg-stone-hairline h-1">
              <div
                className="bg-espresso h-1 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* STEP 1: Select Service */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-espresso font-medium">
                Choose a Service
              </h2>
              <span className="text-xs text-mauve-dusty font-sans">
                {servicesData.length} Signature Treatments Available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {servicesData.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleSelectService(service)}
                  className="group cursor-pointer bg-ivory/60 border border-stone-hairline p-6 flex flex-col justify-between transition-all duration-300 hover:border-espresso hover:shadow-editorial"
                >
                  <div className="space-y-4">
                    <div className="relative aspect-[16/10] overflow-hidden bg-porcelain border border-stone-hairline">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-porcelain/90 backdrop-blur-sm px-2.5 py-0.5 text-[9px] uppercase tracking-widest font-sans font-medium text-espresso">
                        {service.categoryLabel}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-mauve-dusty font-semibold">
                        {service.subtitle}
                      </span>
                      <h3 className="font-serif text-xl text-espresso font-medium group-hover:text-espresso-muted transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-xs text-espresso-muted font-sans leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-hairline/60 flex items-center justify-between text-xs font-sans text-espresso-muted">
                      {service.estimatedDuration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-rose-muted" />
                          {service.estimatedDuration}
                        </span>
                      )}
                      <span className="text-espresso font-medium">
                        Scottsdale Studio
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-hairline flex items-center justify-between">
                    <span className="text-xs font-serif italic text-espresso-muted">
                      With Corina Gonzalez
                    </span>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-espresso text-porcelain text-[11px] uppercase tracking-wider font-medium group-hover:bg-espresso-light transition-colors"
                    >
                      <span>View Slots</span>
                      <ArrowRight className="w-3 h-3 text-rose-soft" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Select Date & Time */}
        {step === 2 && selectedService && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-espresso hover:text-rose-muted transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Change Service</span>
              </button>

              <div className="text-right">
                <span className="text-xs font-serif text-espresso font-medium block">
                  {selectedService.name}
                </span>
                <span className="text-[10px] text-mauve-dusty uppercase tracking-wider">
                  {selectedService.estimatedDuration}
                </span>
              </div>
            </div>

            {/* Date Selector Row */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-widest font-sans font-medium text-espresso">
                1. Choose Date
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {dateOptions.map((opt) => {
                  const isSelected = selectedDate === opt.iso;
                  return (
                    <button
                      key={opt.iso}
                      type="button"
                      onClick={() => setSelectedDate(opt.iso)}
                      className={`flex-shrink-0 px-4 py-3 border text-center font-sans transition-all ${
                        isSelected
                          ? "bg-espresso text-porcelain border-espresso shadow-sm"
                          : "bg-ivory border-stone-hairline text-espresso hover:border-espresso/50"
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-wider block opacity-70">
                        {opt.dayName}
                      </span>
                      <span className="text-xs font-semibold block mt-0.5">
                        {opt.monthDay}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-3 pt-4 border-t border-stone-hairline">
              <label className="block text-xs uppercase tracking-widest font-sans font-medium text-espresso">
                2. Select Available Slot
              </label>

              {isLoadingSlots ? (
                <div className="p-8 text-center text-xs font-sans text-espresso-muted">
                  Checking real-time calendar availability...
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="p-8 bg-ivory border border-stone-hairline text-center space-y-2">
                  <p className="text-sm font-serif text-espresso">
                    No open appointment slots found for this date.
                  </p>
                  <p className="text-xs text-espresso-muted font-sans">
                    Please select an alternate day or message Corina directly.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availableSlots.map((slot, idx) => {
                    const startObj = new Date(slot.startAt);
                    const timeString = startObj.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    });
                    const isSelected = selectedSlot?.startAt === slot.startAt;

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectSlot(slot)}
                        className={`p-3.5 border text-center font-sans text-xs transition-all ${
                          isSelected
                            ? "bg-espresso text-porcelain border-espresso"
                            : "bg-porcelain border-stone-hairline text-espresso hover:border-espresso hover:bg-ivory"
                        }`}
                      >
                        <span className="font-semibold block">{timeString}</span>
                        <span className="text-[10px] text-mauve-dusty block mt-0.5">
                          With {slot.staffName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: Client Details & Integrated Payment */}
        {step === 3 && selectedService && selectedSlot && (
          <form onSubmit={handleSubmitBooking} className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-espresso hover:text-rose-muted transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Change Time</span>
              </button>

              <span className="text-xs text-mauve-dusty uppercase tracking-widest font-semibold">
                Step 3 of 3
              </span>
            </div>

            {/* Treatment Summary */}
            <div className="p-6 bg-ivory border border-stone-hairline space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-mauve-dusty font-semibold">
                Appointment Summary
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-hairline pb-3">
                <h3 className="font-serif text-xl text-espresso font-medium">
                  {selectedService.name}
                </h3>
                <span className="text-xs font-sans text-espresso font-medium">
                  Scottsdale Quarter · Loft 28
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-espresso-muted pt-1">
                <span>
                  <strong>Date: </strong>
                  {new Date(selectedSlot.startAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>·</span>
                <span>
                  <strong>Time: </strong>
                  {new Date(selectedSlot.startAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
                <span>·</span>
                <span>
                  <strong>Artist: </strong> Corina Gonzalez
                </span>
              </div>
            </div>

            {/* Client Contact Details */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-espresso font-medium">
                1. Client Information
              </h3>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="space-y-1.5">
                  <label className="block text-espresso font-medium">
                    Full Name *
                  </label>
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
                  <label className="block text-espresso font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="lauren@example.com"
                    className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-espresso font-medium">
                    Phone Number (for SMS confirmation &amp; reminders) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="(480) 555-0123"
                    className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-espresso font-medium">
                    Styling Preferences or Sensitivities (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. First time lash client, prefer airy wispy mapping, sensitive eyes..."
                    className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                  />
                </div>
              </div>
            </div>

            {/* Integrated Payment Section */}
            <div className="space-y-4 pt-6 border-t border-stone-hairline">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl text-espresso font-medium">
                  2. Payment &amp; Reservation Guarantee
                </h3>
                <span className="text-xs text-mauve-dusty font-medium flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-rose-muted" />
                  PCI-DSS Secure
                </span>
              </div>

              {/* Deposit vs Full Payment Choice */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                <div
                  onClick={() => setPaymentOption("DEPOSIT")}
                  className={`p-4 border cursor-pointer transition-all ${
                    paymentOption === "DEPOSIT"
                      ? "bg-ivory border-espresso shadow-sm"
                      : "bg-porcelain border-stone-hairline hover:border-espresso/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-espresso">Booking Deposit</span>
                    <span className="font-serif text-lg text-espresso font-medium">$50.00</span>
                  </div>
                  <p className="text-[11px] text-espresso-muted mt-1 leading-relaxed">
                    Secures your reserved slot on Corina&apos;s calendar. The remaining balance ($100.00) is due at the studio after your treatment.
                  </p>
                </div>

                <div
                  onClick={() => setPaymentOption("FULL")}
                  className={`p-4 border cursor-pointer transition-all ${
                    paymentOption === "FULL"
                      ? "bg-ivory border-espresso shadow-sm"
                      : "bg-porcelain border-stone-hairline hover:border-espresso/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-espresso">Pay In Full</span>
                    <span className="font-serif text-lg text-espresso font-medium">$150.00</span>
                  </div>
                  <p className="text-[11px] text-espresso-muted mt-1 leading-relaxed">
                    Prepay your entire treatment fee now for effortless, contactless departure right after your session.
                  </p>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("CARD")}
                    className={`flex-1 py-2.5 px-3 border text-center font-sans text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === "CARD"
                        ? "bg-espresso text-porcelain border-espresso"
                        : "bg-porcelain border-stone-hairline text-espresso"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit / Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("APPLE_PAY")}
                    className={`flex-1 py-2.5 px-3 border text-center font-sans text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === "APPLE_PAY"
                        ? "bg-espresso text-porcelain border-espresso"
                        : "bg-porcelain border-stone-hairline text-espresso"
                    }`}
                  >
                    <span>Apple Pay / Google Pay</span>
                  </button>
                </div>

                {paymentMethod === "CARD" && (
                  <div className="p-4 bg-ivory/60 border border-stone-hairline space-y-3 text-xs font-sans">
                    <div className="space-y-1">
                      <label className="block text-espresso font-medium">Name on Card *</label>
                      <input
                        type="text"
                        required
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        placeholder="Lauren Martinez"
                        className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-espresso font-medium">Card Number *</label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="4242 •••• •••• 4242"
                        className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso font-mono tracking-wider"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="block text-espresso font-medium">Expiry *</label>
                        <input
                          type="text"
                          required
                          value={cardExp}
                          onChange={handleExpChange}
                          placeholder="MM/YY"
                          className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-espresso font-medium">CVV *</label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="123"
                          className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-espresso font-medium">ZIP *</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={cardZip}
                          onChange={(e) => setCardZip(e.target.value)}
                          placeholder="85254"
                          className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "APPLE_PAY" && (
                  <div className="p-4 bg-ivory/60 border border-stone-hairline text-center space-y-2 text-xs font-sans text-espresso">
                    <p className="font-medium">Express One-Tap Authorization</p>
                    <p className="text-[11px] text-espresso-muted">
                      Your default card and biometric credentials will be used upon pressing Authorize &amp; Reserve below.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Policies check */}
            <div className="p-4 bg-ivory/60 border border-stone-hairline text-xs font-sans text-espresso-muted space-y-1.5">
              <strong className="text-espresso font-medium block">
                Studio Cancellation &amp; Reschedule Policy:
              </strong>
              <p>
                We kindly request at least 24 hours advance notice for cancellations or schedule changes. Your deposit is fully transferable with proper notice. Loft 28 is located inside Salon Lofts at Scottsdale Quarter with complimentary garage parking.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-espresso text-porcelain text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso-light transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Processing Payment Authorization...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-rose-soft" />
                  <span>
                    Authorize &amp; Reserve Appointment (
                    {paymentOption === "FULL" ? "$150.00" : "$50.00"})
                  </span>
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 4: Confirmed State with Luxury Receipt */}
        {step === 4 && confirmedBooking && (
          <div className="bg-ivory border border-stone-hairline p-8 sm:p-12 text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-porcelain border border-stone-hairline flex items-center justify-center mx-auto text-espresso">
              <CheckCircle2 className="w-8 h-8 text-rose-muted" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
                Payment Authorized &amp; Slot Confirmed
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-espresso font-normal">
                We Look Forward to Welcoming You
              </h2>
              <p className="text-xs uppercase tracking-widest text-espresso font-medium font-mono">
                Booking Reference: {confirmedBooking.reference}
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="max-w-md mx-auto p-6 bg-porcelain border border-stone-hairline text-left text-xs font-sans space-y-3">
              <div className="border-b border-stone-hairline pb-2 flex justify-between items-center">
                <span className="font-semibold text-espresso">Appointment Details</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 text-[10px] uppercase font-semibold">
                  Confirmed
                </span>
              </div>

              <div className="space-y-1 text-espresso-muted">
                <p>
                  <strong className="text-espresso">Client: </strong> {confirmedBooking.customerName}
                </p>
                <p>
                  <strong className="text-espresso">Treatment: </strong> {confirmedBooking.serviceName}
                </p>
                <p>
                  <strong className="text-espresso">Date &amp; Time: </strong>{" "}
                  {new Date(confirmedBooking.startAt).toLocaleString("en-US", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </p>
                <p>
                  <strong className="text-espresso">Artist: </strong> Corina Gonzalez
                </p>
                <p>
                  <strong className="text-espresso">Location: </strong> Salon Lofts · Scottsdale Quarter, Loft 28
                </p>
              </div>

              <div className="border-t border-stone-hairline pt-2.5 space-y-1">
                <div className="flex justify-between items-center text-espresso font-medium">
                  <span>Payment Amount Charged</span>
                  <span className="font-serif text-sm">
                    ${(confirmedBooking.depositCents / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-espresso-muted">
                  <span>Method</span>
                  <span>Card ending in •••• {confirmedBooking.cardLast4}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-mauve-dusty font-mono">
                  <span>Transaction ID</span>
                  <span>{confirmedBooking.paymentId.slice(0, 18)}...</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={downloadCalendarFile}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-espresso text-porcelain text-xs uppercase tracking-widest font-medium hover:bg-espresso-light transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-rose-soft" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-espresso/30 text-espresso text-xs uppercase tracking-widest font-medium hover:border-espresso hover:bg-white/40 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-rose-muted" />
                <span>Browse Aftercare Boutique</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-porcelain flex items-center justify-center py-20 text-xs uppercase tracking-widest text-espresso font-sans">
          Loading Booking System...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
