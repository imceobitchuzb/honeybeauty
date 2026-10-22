import crypto from "crypto";
import { SquareClient, SquareEnvironment } from "square";
import { db } from "@/lib/db";
import { Product, Appointment } from "@/lib/db/types";

export type SquareConnectionStatus =
  | "CONNECTED_LIVE"
  | "CONNECTED_SANDBOX"
  | "DISCONNECTED";

export interface SquareConfig {
  environment: "sandbox" | "production";
  applicationId?: string;
  accessToken?: string;
  locationId?: string;
  webhookSignatureKey?: string;
}

export function getSquareConfig(): SquareConfig {
  const env = (process.env.SQUARE_ENVIRONMENT || "sandbox").toLowerCase();
  return {
    environment: env === "production" ? "production" : "sandbox",
    applicationId: process.env.SQUARE_APPLICATION_ID || "",
    accessToken: process.env.SQUARE_ACCESS_TOKEN || "",
    locationId: process.env.SQUARE_LOCATION_ID || "",
    webhookSignatureKey: process.env.SQUARE_WEBHOOK_SIGNATURE_KEY || "",
  };
}

export function isSquareConfigured(): boolean {
  const config = getSquareConfig();
  return Boolean(config.accessToken && config.locationId);
}

export function getSquareClient(): SquareClient | null {
  const config = getSquareConfig();
  if (!isSquareConfigured()) return null;

  return new SquareClient({
    token: config.accessToken!,
    environment:
      config.environment === "production"
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  });
}

/**
 * Validates connection against Square by pinging the location or merchant API.
 */
export async function testSquareConnection(): Promise<{
  status: SquareConnectionStatus;
  message: string;
  locationName?: string;
}> {
  const config = getSquareConfig();
  if (!isSquareConfigured()) {
    return {
      status: "DISCONNECTED",
      message:
        "Square credentials are not configured. Platform is operating in Demo / Disconnected mode with local persistence.",
    };
  }

  const client = getSquareClient();
  if (!client) {
    return {
      status: "DISCONNECTED",
      message: "Square client initialization failed.",
    };
  }

  try {
    const response = await client.locations.get({
      locationId: config.locationId!,
    });
    const location = response.location;
    const isProd = config.environment === "production";
    return {
      status: isProd ? "CONNECTED_LIVE" : "CONNECTED_SANDBOX",
      message: `Connected successfully to Square ${
        isProd ? "Production" : "Sandbox"
      }`,
      locationName: location?.name || "Scottsdale Studio",
    };
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Failed to verify location with Square";
    return {
      status: "DISCONNECTED",
      message: `Square API error: ${errorMsg}. Falling back to safe Demo Mode.`,
    };
  }
}

/**
 * Searches real booking availability for a service between start and end dates.
 * In disconnected demo mode, returns realistic available time slots.
 */
export async function getServiceAvailability(params: {
  serviceId: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}): Promise<{
  isDemo: boolean;
  slots: { startAt: string; endAt: string; staffName: string }[];
}> {
  const client = getSquareClient();
  const config = getSquareConfig();

  if (client && config.locationId) {
    try {
      const response = await client.bookings.searchAvailability({
        query: {
          filter: {
            startAtRange: {
              startAt: `${params.startDate}T09:00:00Z`,
              endAt: `${params.endDate}T19:00:00Z`,
            },
            locationId: config.locationId,
            segmentFilters: [
              {
                serviceVariationId: params.serviceId,
              },
            ],
          },
        },
      });

      const availabilities = response.availabilities || [];
      const slots = availabilities.map((a: any) => ({
        startAt: a.startAt || "",
        endAt: a.appointmentSegments?.[0]?.serviceVariationVersion?.toString() || "",
        staffName: "Corina Gonzalez",
      }));

      return { isDemo: false, slots };
    } catch (err) {
      console.warn("Square searchAvailability failed, falling back to simulated slots:", err);
    }
  }

  // --- DEMO / DISCONNECTED AVAILABILITY GENERATOR ---
  const demoSlots: { startAt: string; endAt: string; staffName: string }[] = [];
  const startDay = new Date(params.startDate);
  const endDay = new Date(params.endDate);

  for (let d = new Date(startDay); d <= endDay; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay();
    // Monday (1) to Saturday (6)
    if (dayOfWeek !== 0) {
      const dateStr = d.toISOString().split("T")[0];
      const hours = [10, 12, 14, 16];

      hours.forEach((hr) => {
        const start = new Date(`${dateStr}T${hr.toString().padStart(2, "0")}:00:00-07:00`);
        const end = new Date(start.getTime() + 90 * 60 * 1000);

        const existing = db
          .getAppointments()
          .some(
            (apt) =>
              apt.status !== "CANCELLED" &&
              Math.abs(new Date(apt.startAt).getTime() - start.getTime()) < 3600000
          );

        if (!existing) {
          demoSlots.push({
            startAt: start.toISOString(),
            endAt: end.toISOString(),
            staffName: "Corina Gonzalez",
          });
        }
      });
    }
  }

  return { isDemo: true, slots: demoSlots };
}

/**
 * Creates a payment with Square using a payment nonce/sourceId.
 */
export async function processSquarePayment(params: {
  sourceId: string;
  amountCents: number;
  currency: string;
  orderId?: string;
  customerEmail?: string;
  idempotencyKey: string;
}): Promise<{
  success: boolean;
  paymentId?: string;
  status: string;
  errorMessage?: string;
}> {
  const client = getSquareClient();
  const config = getSquareConfig();

  if (!client || !config.locationId) {
    // Demo Mode Payment Simulator
    return {
      success: true,
      paymentId: `demo_pay_${crypto.randomBytes(8).toString("hex")}`,
      status: "COMPLETED",
    };
  }

  try {
    const response = await client.payments.create({
      sourceId: params.sourceId,
      idempotencyKey: params.idempotencyKey,
      amountMoney: {
        amount: BigInt(params.amountCents),
        currency: params.currency as any,
      },
      locationId: config.locationId,
      orderId: params.orderId,
      buyerEmailAddress: params.customerEmail,
      note: "Flutterhoney Luxury Lashes & Brows",
    });

    const payment = response.payment;
    return {
      success: payment?.status === "COMPLETED" || payment?.status === "APPROVED",
      paymentId: payment?.id,
      status: payment?.status || "UNKNOWN",
    };
  } catch (err: any) {
    console.error("Square Payment failed:", err);
    return {
      success: false,
      status: "FAILED",
      errorMessage: err?.errors?.[0]?.detail || err.message || "Payment declined",
    };
  }
}

/**
 * Verifies Square webhook signature according to Square official spec.
 * HMAC-SHA256(webhookSignatureKey, notificationUrl + requestBody) in Base64.
 */
export function verifySquareWebhook(params: {
  requestBody: string;
  signatureHeader: string;
  notificationUrl: string;
  signatureKey: string;
}): boolean {
  try {
    const hmac = crypto.createHmac("sha256", params.signatureKey);
    hmac.update(params.notificationUrl + params.requestBody);
    const expectedSignature = hmac.digest("base64");
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(params.signatureHeader)
    );
  } catch (err) {
    return false;
  }
}
