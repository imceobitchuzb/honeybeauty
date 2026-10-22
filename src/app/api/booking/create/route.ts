import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { servicesData } from "@/data/services";
import { isSquareConfigured } from "@/lib/square";

const bookingSchema = z.object({
  serviceId: z.string().min(1),
  startAt: z.string().min(1),
  endAt: z.string().min(1),
  durationMinutes: z.number().positive(),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(10, "Please provide a valid 10-digit phone number"),
  notes: z.string().optional(),
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
    } = parsed.data;

    // Verify service exists in catalog
    const matchedService = servicesData.find((s) => s.id === serviceId);
    const serviceName = matchedService ? matchedService.name : "Custom Lash & Brow Treatment";

    const isConnected = isSquareConfigured();

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
      priceCents: 15000, // baseline estimate confirmed on Square
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
      },
    });
  } catch (err: any) {
    console.error("Booking creation error:", err);
    return NextResponse.json(
      { error: "Failed to reserve appointment" },
      { status: 500 }
    );
  }
}
