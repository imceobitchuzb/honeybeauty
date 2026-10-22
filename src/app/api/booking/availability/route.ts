import { NextResponse } from "next/server";
import { getServiceAvailability } from "@/lib/square";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const serviceId = searchParams.get("serviceId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!serviceId || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Missing required parameters: serviceId, startDate, endDate" },
        { status: 400 }
      );
    }

    const availability = await getServiceAvailability({
      serviceId,
      startDate,
      endDate,
    });

    return NextResponse.json(availability);
  } catch (err: any) {
    console.error("Availability error:", err);
    return NextResponse.json(
      { error: "Failed to query availability" },
      { status: 500 }
    );
  }
}
