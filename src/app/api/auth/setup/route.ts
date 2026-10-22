import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword, isSetupRequired, createSessionCookie } from "@/lib/auth";

const setupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: Request) {
  try {
    if (!isSetupRequired()) {
      return NextResponse.json(
        { error: "Setup has already been completed. Please sign in." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parsed = setupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;
    const { hash, salt } = hashPassword(password);

    const user = db.createUser({
      name,
      email: email.toLowerCase(),
      role: "ADMIN",
      passwordHash: hash,
      salt,
    });

    await createSessionCookie(user.id);

    db.logAudit({
      userId: user.id,
      userEmail: user.email,
      action: "INITIAL_SETUP_COMPLETED",
      entityType: "USER",
      entityId: user.id,
      details: { role: user.role },
    });

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (err: any) {
    console.error("Setup error:", err);
    return NextResponse.json(
      { error: "Failed to initialize setup" },
      { status: 500 }
    );
  }
}
