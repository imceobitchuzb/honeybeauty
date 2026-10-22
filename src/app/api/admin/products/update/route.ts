import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

const updateSchema = z.object({
  id: z.string(),
  isPublished: z.boolean().optional(),
  priceCents: z.number().positive().optional(),
  inventoryCount: z.number().int().min(0).optional(),
});

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const { id, ...updates } = parsed.data;
    const updated = db.updateProduct(id, updates);

    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    db.logAudit({
      userId: user.id,
      userEmail: user.email,
      action: "PRODUCT_UPDATED",
      entityType: "PRODUCT",
      entityId: id,
      details: updates,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}
