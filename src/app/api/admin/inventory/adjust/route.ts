import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

const adjustSchema = z.object({
  productId: z.string(),
  delta: z.number().int(),
  reason: z.enum([
    "MANUAL_ADJUSTMENT",
    "ORDER_FULFILLED",
    "RETURN_RESTOCK",
    "SQUARE_SYNC",
  ]),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const parsed = adjustSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const { productId, delta, reason, notes } = parsed.data;
    const updated = db.adjustInventory(
      productId,
      delta,
      reason,
      user.name || user.email,
      notes
    );

    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    db.logAudit({
      userId: user.id,
      userEmail: user.email,
      action: "INVENTORY_ADJUSTED",
      entityType: "PRODUCT",
      entityId: productId,
      details: { delta, newQuantity: updated.inventoryCount, reason },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to adjust inventory" }, { status: 500 });
  }
}
