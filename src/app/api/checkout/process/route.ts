import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { db } from "@/lib/db";
import { processSquarePayment, isSquareConfigured } from "@/lib/square";

const checkoutSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
    })
  ).min(1, "Cart cannot be empty"),
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Valid email required"),
  customerPhone: z.string().min(10, "Valid phone number required"),
  shippingAddress: z.object({
    street: z.string().min(3),
    city: z.string().min(2),
    state: z.string().min(2),
    zip: z.string().min(5),
    isStudioPickup: z.boolean(),
  }),
  sourceId: z.string().min(1, "Payment method is required"),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const {
      items,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      sourceId,
      notes,
    } = parsed.data;

    // 1. Server-side validation against authoritative catalog
    const validatedItems = [];
    let subtotalCents = 0;

    for (const item of items) {
      const product = db.getProductById(item.productId);
      if (!product || !product.isPublished) {
        return NextResponse.json(
          { error: `Item "${item.productId}" is currently unavailable.` },
          { status: 400 }
        );
      }

      if (product.inventoryCount < item.quantity) {
        return NextResponse.json(
          {
            error: `Insufficient stock for "${product.name}". Only ${product.inventoryCount} available.`,
          },
          { status: 400 }
        );
      }

      const itemTotal = product.priceCents * item.quantity;
      subtotalCents += itemTotal;

      validatedItems.push({
        productId: product.id,
        name: product.name,
        priceCents: product.priceCents,
        quantity: item.quantity,
        imageUrl: product.imageUrl,
      });
    }

    // 2. Verified Scottsdale, AZ sales tax (~8.05%)
    const taxCents = Math.round(subtotalCents * 0.0805);

    // 3. Shipping logic
    let shippingCents = 0;
    if (!shippingAddress.isStudioPickup) {
      shippingCents = subtotalCents >= 7500 ? 0 : 695; // Free over $75, otherwise $6.95
    }

    const totalCents = subtotalCents + taxCents + shippingCents;
    const idempotencyKey = crypto.randomUUID();

    // 4. Process Payment
    const paymentResult = await processSquarePayment({
      sourceId,
      amountCents: totalCents,
      currency: "USD",
      customerEmail,
      idempotencyKey,
    });

    if (!paymentResult.success) {
      return NextResponse.json(
        {
          error:
            paymentResult.errorMessage ||
            "Payment failed. Please verify your card details and try again.",
        },
        { status: 402 }
      );
    }

    const isConnected = isSquareConfigured();

    // 5. Create Order
    const order = db.createOrder({
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items: validatedItems,
      subtotalCents,
      taxCents,
      shippingCents,
      totalCents,
      status: "COMPLETED",
      paymentStatus: "PAID",
      fulfillmentStatus: shippingAddress.isStudioPickup
        ? "READY_FOR_PICKUP"
        : "UNFULFILLED",
      notes: notes || undefined,
      squarePaymentId: paymentResult.paymentId,
      isDemo: !isConnected,
    });

    db.logAudit({
      userEmail: customerEmail,
      action: "ORDER_PLACED",
      entityType: "ORDER",
      entityId: order.id,
      details: {
        orderNumber: order.orderNumber,
        totalCents: order.totalCents,
        paymentId: paymentResult.paymentId,
        isDemo: order.isDemo,
      },
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        totalCents: order.totalCents,
        subtotalCents: order.subtotalCents,
        taxCents: order.taxCents,
        shippingCents: order.shippingCents,
        items: order.items,
        shippingAddress: order.shippingAddress,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt,
        isDemo: order.isDemo,
      },
    });
  } catch (err: any) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred during checkout processing." },
      { status: 500 }
    );
  }
}
