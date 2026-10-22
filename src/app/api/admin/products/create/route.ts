import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  subtitle: z.string().min(2),
  description: z.string().min(5),
  priceCents: z.number().positive(),
  comparePriceCents: z.number().optional(),
  category: z.enum(["aftercare", "tools", "brows", "skincare"]),
  categoryLabel: z.string().min(2),
  inventoryCount: z.number().int().min(0),
  imageUrl: z.string().url(),
  sku: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const created = db.createProduct({
      ...parsed.data,
      currency: "USD",
      isPublished: true,
      isDemo: true,
    });

    db.logAudit({
      userId: user.id,
      userEmail: user.email,
      action: "PRODUCT_CREATED",
      entityType: "PRODUCT",
      entityId: created.id,
      details: { name: created.name, priceCents: created.priceCents },
    });

    return NextResponse.json({ success: true, product: created });
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
