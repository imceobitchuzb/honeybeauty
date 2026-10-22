"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MapPin,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { servicesData, ServiceItem } from "@/data/services";
import { brandData } from "@/data/brand";

type BookingStep = 1 | 2 | 3 | 4;

interface Slot {
  startAt: string;
  endAt: string;
  staffName: string;
}

export default function BookingPage() {
  const [step, setStep] = useState<BookingStep>(1);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<{
    reference: string;
    serviceName: string;
    startAt: string;
    customerName: string;
    isDemo: boolean;
  } | null>(null);

  // Default dates: next 7 days
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

  // When date is selected, query slots
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
      });
      setStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to process booking.");
    } finally {
      setIsSubmitting(false);
    }
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
            Tailored lash extensions, keratin lifts, and architectural brow design with Corina Gonzalez.
          </p>
        </div>

        {/* Live Square Link & Status Banner */}
        <div className="my-6 p-4 bg-ivory border border-stone-hairline flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans">
          <div className="flex items-center gap-2 text-espresso/80">
            <span
              className={`w-2 h-2 rounded-full ${
                isDemoMode ? "bg-amber-500" : "bg-emerald-600"
              }`}
            />
            <span>
              {isDemoMode
                ? "Platform Integration: Demonstration Booking Active"
                : "Live Square Connected"}
            </span>
          </div>

          <a
            href={brandData.links.squareBooking}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-espresso font-medium hover:text-rose-muted underline underline-offset-4"
          >
            <span>Or Book Directly on Official Square Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
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
                3. Your Details
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
                        View Slots &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Choose Date & Time */}
        {step === 2 && selectedService && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-espresso hover:text-rose-muted transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Treatments</span>
              </button>

              <span className="text-xs text-mauve-dusty uppercase tracking-widest">
                Step 2 of 3
              </span>
            </div>

            {/* Selected Service Card */}
            <div className="p-4 bg-ivory border border-stone-hairline flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-mauve-dusty font-semibold">
                  Selected Treatment
                </span>
                <h3 className="font-serif text-lg text-espresso font-medium">
                  {selectedService.name}
                </h3>
              </div>
              <span className="text-xs font-sans text-espresso-muted">
                {selectedService.estimatedDuration}
              </span>
            </div>

            {/* Date Selector */}
            <div className="space-y-3">
              <h3 className="font-serif text-xl text-espresso font-medium">
                Select a Date
              </h3>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {dateOptions.map((opt) => {
                  const isSelected = selectedDate === opt.iso;
                  return (
                    <button
                      key={opt.iso}
                      type="button"
                      onClick={() => setSelectedDate(opt.iso)}
                      className={`flex-shrink-0 px-4 py-3 border text-center transition-all ${
                        isSelected
                          ? "bg-espresso text-porcelain border-espresso shadow-sm"
                          : "bg-ivory/60 border-stone-hairline text-espresso hover:border-espresso/40"
                      }`}
                    >
                      <span className="block text-[10px] uppercase tracking-wider opacity-80">
                        {opt.dayName}
                      </span>
                      <span className="block font-serif text-sm font-medium mt-0.5">
                        {opt.monthDay}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-3">
              <h3 className="font-serif text-xl text-espresso font-medium">
                Available Times
              </h3>

              {isLoadingSlots ? (
                <div className="py-12 text-center text-sm font-sans text-espresso-muted">
                  Checking schedule with Loft 28...
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="p-8 bg-ivory border border-stone-hairline text-center space-y-2">
                  <p className="text-sm font-serif text-espresso">
                    No open appointment slots found for this date.
                  </p>
                  <p className="text-xs text-espresso-muted font-sans">
                    Please select an alternate day or contact Corina directly via Instagram.
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

        {/* STEP 3: Client Details & Review */}
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

              <span className="text-xs text-mauve-dusty uppercase tracking-widest">
                Step 3 of 3
              </span>
            </div>

            {/* Summary Box */}
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
              <div className="flex items-center gap-4 text-xs font-sans text-espresso-muted pt-1">
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
              </div>
            </div>

            {/* Customer Information Form */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-espresso font-medium">
                Client Information
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
                    Phone Number (for SMS appointment reminders) *
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
                    Styling Preferences or Eye Sensitivities (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. First time lash client, prefer wispy hybrid look, sensitive to strong fragrances..."
                    className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                  />
                </div>
              </div>
            </div>

            {/* Policies check */}
            <div className="p-4 bg-ivory/60 border border-stone-hairline text-xs font-sans text-espresso-muted space-y-2">
              <strong className="text-espresso font-medium block">
                Studio Arrival Protocol:
              </strong>
              <p>
                Please arrive on time with clean, makeup-free lashes and avoid caffeine before your appointment. Loft 28 is located inside Salon Lofts at Scottsdale Quarter with complimentary garage parking.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-espresso text-porcelain text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso-light transition-all shadow-md disabled:opacity-50"
            >
              {isSubmitting ? "Reserving Slot..." : "Complete Reservation"}
            </button>
          </form>
        )}

        {/* STEP 4: Confirmed State */}
        {step === 4 && confirmedBooking && (
          <div className="bg-ivory border border-stone-hairline p-8 sm:p-12 text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-porcelain border border-stone-hairline flex items-center justify-center mx-auto text-espresso">
              <CheckCircle2 className="w-8 h-8 text-rose-muted" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.26em] text-mauve-dusty font-medium block">
                Appointment Reserved
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-espresso font-normal">
                We Look Forward to Welcoming You
              </h2>
              <p className="text-xs uppercase tracking-widest text-espresso font-medium">
                Reference: {confirmedBooking.reference}
              </p>
            </div>

            <div className="max-w-md mx-auto p-5 bg-porcelain border border-stone-hairline text-left text-xs font-sans space-y-2">
              <p>
                <strong>Client: </strong> {confirmedBooking.customerName}
              </p>
              <p>
                <strong>Treatment: </strong> {confirmedBooking.serviceName}
              </p>
              <p>
                <strong>Date &amp; Time: </strong>{" "}
                {new Date(confirmedBooking.startAt).toLocaleString("en-US", {
                  dateStyle: "full",
                  timeStyle: "short",
                })}
              </p>
              <p>
                <strong>Location: </strong> Salon Lofts · Scottsdale Quarter, Loft 28
              </p>
              {confirmedBooking.isDemo && (
                <p className="text-amber-700 italic pt-1 border-t border-stone-hairline/60">
                  Note: Demonstration booking saved in application store. In production, this record syncs with Square Bookings API.
                </p>
              )}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto px-7 py-3.5 bg-espresso text-porcelain text-xs uppercase tracking-widest font-medium hover:bg-espresso-light transition-colors"
              >
                Return to Home
              </Link>
              <Link
                href="/shop"
                className="w-full sm:w-auto px-7 py-3.5 border border-espresso/30 text-espresso text-xs uppercase tracking-widest font-medium hover:border-espresso hover:bg-white/40 transition-colors"
              >
                Shop Lash Aftercare
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
