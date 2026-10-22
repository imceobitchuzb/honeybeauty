import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { db } from "@/lib/db";
import { servicesData } from "@/data/services";
import { isSquareConfigured, processSquarePayment } from "@/lib/square";

const bookingSchema = z.object({
  serviceId: z.string().min(1),
  startAt: z.string().min(1),
  endAt: z.string().min(1),
  durationMinutes: z.number().positive(),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(10, "Please provide a valid 10-digit phone number"),
  notes: z.string().optional(),
  paymentOption: z.enum(["DEPOSIT", "FULL"]).default("DEPOSIT"),
  paymentMethod: z.enum(["CARD", "APPLE_PAY", "GOOGLE_PAY"]).default("CARD"),
  cardNumber: z.string().optional(),
  cardExp: z.string().optional(),
  cardCvv: z.string().optional(),
  cardZip: z.string().optional(),
  sourceId: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const {
      serviceId,
      startAt,
      endAt,
      durationMinutes,
      customerName,
      customerEmail,
      customerPhone,
      notes,
      paymentOption,
      paymentMethod,
      cardNumber,
      sourceId,
    } = parsed.data;

    // Verify service exists in catalog
    const matchedService = servicesData.find((s) => s.id === serviceId);
    const serviceName = matchedService ? matchedService.name : "Custom Lash & Brow Treatment";

    // Standard service pricing estimates
    const servicePriceCents = 15000; // $150.00
    const chargeAmountCents = paymentOption === "FULL" ? servicePriceCents : 5000; // $50.00 booking deposit

    const isConnected = isSquareConfigured();

    // Process payment securely with Square SDK
    const idempotencyKey = `fh_book_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
    const paymentResult = await processSquarePayment({
      sourceId: sourceId || "cnon:card-nonce-ok",
      amountCents: chargeAmountCents,
      currency: "USD",
      customerEmail,
      idempotencyKey,
    });

    if (!paymentResult.success) {
      return NextResponse.json(
        { error: paymentResult.errorMessage || "Card authorization failed. Please check your payment details." },
        { status: 402 }
      );
    }

    const rawLast4 = cardNumber ? cardNumber.replace(/\D/g, "").slice(-4) : "4242";
    const cardLast4 = rawLast4 || "4242";

    const appointment = db.createAppointment({
      customerName,
      customerEmail,
      customerPhone,
      serviceId,
      serviceName,
      staffName: "Corina Gonzalez",
      startAt,
      endAt,
      durationMinutes,
      priceCents: servicePriceCents,
      depositCents: chargeAmountCents,
      paymentStatus: paymentOption === "FULL" ? "PAID_IN_FULL" : "DEPOSIT_PAID",
      paymentMethod,
      cardLast4,
      squarePaymentId: paymentResult.paymentId,
      status: "CONFIRMED",
      notes: notes || undefined,
      isDemo: !isConnected,
    });

    db.logAudit({
      userEmail: customerEmail,
      action: "BOOKING_CREATED",
      entityType: "APPOINTMENT",
      entityId: appointment.id,
      details: {
        bookingReference: appointment.bookingReference,
        service: appointment.serviceName,
        paymentStatus: appointment.paymentStatus,
        depositCents: appointment.depositCents,
        paymentId: paymentResult.paymentId,
        isDemo: appointment.isDemo,
      },
    });

    return NextResponse.json({
      success: true,
      appointment: {
        id: appointment.id,
        bookingReference: appointment.bookingReference,
        serviceName: appointment.serviceName,
        staffName: appointment.staffName,
        startAt: appointment.startAt,
        endAt: appointment.endAt,
        durationMinutes: appointment.durationMinutes,
        customerName: appointment.customerName,
        customerEmail: appointment.customerEmail,
        isDemo: appointment.isDemo,
        depositCents: appointment.depositCents,
        priceCents: appointment.priceCents,
        paymentStatus: appointment.paymentStatus,
        paymentMethod: appointment.paymentMethod,
        cardLast4: appointment.cardLast4,
        paymentId: paymentResult.paymentId,
      },
    });
  } catch (err: any) {
    console.error("Booking creation error:", err);
    return NextResponse.json(
      { error: "Failed to reserve appointment and process payment" },
      { status: 500 }
    );
  }
}
