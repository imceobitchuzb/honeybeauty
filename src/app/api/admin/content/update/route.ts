import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

const contentSchema = z.object({
  announcementText: z.string().min(2),
  announcementSubtext: z.string().min(2),
  heroHeadline: z.string().min(5),
  heroSubheadline: z.string().min(10),
  studioNotice: z.string().min(5),
});

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const parsed = contentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid content fields" }, { status: 400 });
    }

    const updated = db.updateSiteContent(parsed.data);

    db.logAudit({
      userId: user.id,
      userEmail: user.email,
      action: "SITE_CONTENT_UPDATED",
      entityType: "CONTENT",
      details: parsed.data,
    });

    return NextResponse.json({ success: true, content: updated });
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
