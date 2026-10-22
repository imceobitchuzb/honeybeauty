import { NextResponse } from "next/server";
import { testSquareConnection } from "@/lib/square";
import { requireAuth } from "@/lib/auth";

export async function POST() {
  try {
    await requireAuth();
    const result = await testSquareConnection();
    return NextResponse.json(result);
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { status: "DISCONNECTED", message: "Failed to run test" },
      { status: 500 }
    );
  }
}
