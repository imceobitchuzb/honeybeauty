import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

const schema = z.object({
  id: z.string(),
  fulfillmentStatus: z.enum([
    "UNFULFILLED",
    "READY_FOR_PICKUP",
    "SHIPPED",
    "DELIVERED",
  ]).optional(),
  status: z.enum([
    "PENDING",
    "PROCESSING",
    "COMPLETED",
    "CANCELLED",
    "REFUNDED",
  ]).optional(),
});

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const { id, ...updates } = parsed.data;
    const updated = db.updateOrder(id, updates);

    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    db.logAudit({
      userId: user.id,
      userEmail: user.email,
      action: "ORDER_STATUS_UPDATED",
      entityType: "ORDER",
      entityId: id,
      details: updates,
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
