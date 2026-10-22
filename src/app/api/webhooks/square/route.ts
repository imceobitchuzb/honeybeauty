import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { verifySquareWebhook, getSquareConfig } from "@/lib/square";
import { db } from "@/lib/db";

// Set to track processed webhook IDs to ensure idempotency
const processedEvents = new Set<string>();

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const headersList = headers();
    const signature = headersList.get("x-square-hmacsha256-signature");
    const config = getSquareConfig();

    // Verify webhook signature if key is configured
    if (config.webhookSignatureKey) {
      if (!signature) {
        return NextResponse.json({ error: "Missing signature" }, { status: 401 });
      }

      const notificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/webhooks/square`;
      const isValid = verifySquareWebhook({
        requestBody: rawBody,
        signatureHeader: signature,
        notificationUrl,
        signatureKey: config.webhookSignatureKey,
      });

      if (!isValid) {
        console.warn("Invalid Square webhook signature received");
        return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
      }
    }

    const payload = JSON.parse(rawBody);
    const eventId = payload.event_id;

    // Idempotency check
    if (eventId && processedEvents.has(eventId)) {
      return NextResponse.json({ message: "Event already processed" }, { status: 200 });
    }
    if (eventId) {
      processedEvents.add(eventId);
      if (processedEvents.size > 1000) {
        const first = processedEvents.values().next().value;
        if (first) processedEvents.delete(first);
      }
    }

    const eventType = payload.type;
    const eventData = payload.data?.object;

    db.logAudit({
      userEmail: "square-webhook@system",
      action: `WEBHOOK_RECEIVED_${eventType || "UNKNOWN"}`,
      entityType: "WEBHOOK",
      entityId: eventId,
      details: { eventType },
    });

    // Handle specific Square events
    if (eventType === "payment.updated" && eventData?.payment) {
      const payment = eventData.payment;
      if (payment.order_id) {
        const order = db.getOrders().find((o) => o.squareOrderId === payment.order_id);
        if (order) {
          db.updateOrder(order.id, {
            paymentStatus: payment.status === "COMPLETED" ? "PAID" : "PENDING",
            squarePaymentId: payment.id,
          });
        }
      }
    }

    if (eventType === "booking.updated" && eventData?.booking) {
      const booking = eventData.booking;
      const apt = db.getAppointments().find((a) => a.squareBookingId === booking.id);
      if (apt) {
        let status: any = apt.status;
        if (booking.status === "ACCEPTED") status = "CONFIRMED";
        if (booking.status === "CANCELLED_BY_SELLER" || booking.status === "CANCELLED_BY_CUSTOMER") status = "CANCELLED";
        if (booking.status === "COMPLETED") status = "COMPLETED";
        db.updateAppointment(apt.id, { status });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook processing error:", err);
    return NextResponse.json({ error: "Webhook processing error" }, { status: 500 });
  }
}
