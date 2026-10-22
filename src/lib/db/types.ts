export type Role = "ADMIN" | "STAFF";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  passwordHash: string;
  salt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  createdAt: string;
}

export interface Product {
  id: string;
  squareId?: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  usageInstructions?: string;
  ingredients?: string;
  priceCents: number;
  comparePriceCents?: number;
  currency: string;
  imageUrl: string;
  category: "aftercare" | "tools" | "brows" | "skincare";
  categoryLabel: string;
  isPublished: boolean;
  inventoryCount: number;
  sku?: string;
  isDemo?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryLog {
  id: string;
  productId: string;
  productName: string;
  quantityChange: number;
  newQuantity: number;
  reason: "MANUAL_ADJUSTMENT" | "ORDER_FULFILLED" | "RETURN_RESTOCK" | "SQUARE_SYNC";
  notes?: string;
  performedBy: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  priceCents: number;
  quantity: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  squareOrderId?: string;
  squarePaymentId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    isStudioPickup: boolean;
  };
  items: OrderItem[];
  subtotalCents: number;
  taxCents: number;
  shippingCents: number;
  totalCents: number;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED" | "REFUNDED";
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  fulfillmentStatus: "UNFULFILLED" | "READY_FOR_PICKUP" | "SHIPPED" | "DELIVERED";
  notes?: string;
  isDemo?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  bookingReference: string;
  squareBookingId?: string;
  squarePaymentId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  variationName?: string;
  staffName: string;
  startAt: string; // ISO 8601
  endAt: string; // ISO 8601
  durationMinutes: number;
  priceCents: number;
  depositCents?: number;
  paymentStatus?: "UNPAID" | "DEPOSIT_PAID" | "PAID_IN_FULL";
  paymentMethod?: "CARD" | "APPLE_PAY" | "GOOGLE_PAY" | "STUDIO";
  cardLast4?: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED" | "NO_SHOW";
  notes?: string;
  isDemo?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SiteContent {
  announcementText: string;
  announcementSubtext: string;
  heroHeadline: string;
  heroSubheadline: string;
  studioNotice: string;
  contactEmailNote: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId?: string;
  userEmail: string;
  action: string;
  entityType: string;
  entityId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
}
