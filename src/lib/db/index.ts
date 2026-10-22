import fs from "fs";
import path from "path";
import crypto from "crypto";
import {
  User,
  Session,
  Product,
  InventoryLog,
  Order,
  Appointment,
  SiteContent,
  AuditLog,
} from "./types";

interface DatabaseSchema {
  users: User[];
  sessions: Session[];
  products: Product[];
  inventoryLogs: InventoryLog[];
  orders: Order[];
  appointments: Appointment[];
  siteContent: SiteContent;
  auditLogs: AuditLog[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "db.json");

const defaultProducts: Product[] = [
  {
    id: "prod-cleanser-1",
    name: "Lash Detox Foaming Cleanser",
    slug: "lash-detox-foaming-cleanser",
    subtitle: "Oil-Free Botanical Lash Shampoo · 50ml",
    description:
      "A soothing, tea tree and chamomile infused foaming cleanser formulated specifically for eyelash extensions and delicate eyelids. Thoroughly dissolves sebum and makeup buildup without breaking down medical-grade adhesive bonds.",
    usageInstructions:
      "Dispense 1 pump onto a soft cleansing brush or fingertips. Gently massage down through the lashes with eyes closed. Rinse thoroughly with cool water and pat dry.",
    ingredients:
      "Purified Water, Rosa Damascena Flower Water, Melaleuca Alternifolia (Tea Tree) Leaf Water, Chamomilla Recutita (Matricaria) Extract, Decyl Glucoside, Glycerin, Sodium Chloride, Citric Acid.",
    priceCents: 2800,
    comparePriceCents: 3200,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    category: "aftercare",
    categoryLabel: "Lash Aftercare",
    isPublished: true,
    inventoryCount: 24,
    sku: "FH-CLN-50ML",
    isDemo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-mask-2",
    name: "Silk Contour Sleep Mask",
    slug: "silk-contour-sleep-mask",
    subtitle: "3D Deep-Eye Cavity 100% Mulberry Silk",
    description:
      "Crafted from premium 22-momme pure mulberry silk with an elevated contoured eye chamber. Shields your extension fans and lifted lashes from pillow friction during sleep while blocking 100% of light.",
    usageInstructions:
      "Adjust elastic headband for a comfortable, snug fit over the eyes. Hand wash in cold water with delicate silk wash; lay flat to dry in shade.",
    priceCents: 4200,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    category: "tools",
    categoryLabel: "Sleep & Protection",
    isPublished: true,
    inventoryCount: 16,
    sku: "FH-SLK-MSK",
    isDemo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-serum-3",
    name: "Lash & Brow Conditioning Glaze",
    slug: "lash-brow-conditioning-glaze",
    subtitle: "Multi-Peptide & Biotin Fortifying Serum · 6ml",
    description:
      "A prostaglandin-free, physician-tested peptide complex that deeply conditions and hydrates natural lash and brow fibers between lifts, laminations, and extension fills.",
    usageInstructions:
      "Apply a delicate coat along the natural lash line or brush through laminated brows nightly after cleansing. Extension safe.",
    priceCents: 6800,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1608248597359-5975253e7f41?auto=format&fit=crop&w=800&q=80",
    category: "aftercare",
    categoryLabel: "Keratin & Care",
    isPublished: true,
    inventoryCount: 18,
    sku: "FH-SRM-6ML",
    isDemo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-wax-4",
    name: "Fluff & Fix Brow Sculpting Wax",
    slug: "fluff-fix-brow-sculpting-wax",
    subtitle: "Extreme Hold Clear Lamination Styling Wax · 15g",
    description:
      "A clear, residue-free styling wax that locks brow hairs into full, upward feathered alignment without flaking or stiffness. Infused with argan oil to nourish each hair follicle.",
    usageInstructions:
      "Using a clean spoolie wand, pick up a tiny amount of wax. Brush firmly upward through brow hairs, then press flat against skin for a sleek laminated finish.",
    priceCents: 2600,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    category: "brows",
    categoryLabel: "Brow Cosmetics",
    isPublished: true,
    inventoryCount: 20,
    sku: "FH-BRW-WAX",
    isDemo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-wand-5",
    name: "Gold Retractable Spoolie Wand",
    slug: "gold-retractable-spoolie-wand",
    subtitle: "Sanitary Travel Wand with Protective Aluminum Casing",
    description:
      "The hygienic solution for your handbag. Keeps your lash and brow grooming spoolie completely free from dust, lint, and bacteria between appointments.",
    usageInstructions:
      "Twist or slide open to reveal clean spoolie brush. Clean weekly with gentle soap and warm water; air dry before retracting.",
    priceCents: 1600,
    currency: "USD",
    imageUrl:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    category: "tools",
    categoryLabel: "Beauty Tools",
    isPublished: true,
    inventoryCount: 35,
    sku: "FH-GLD-SPL",
    isDemo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const defaultSiteContent: SiteContent = {
  announcementText: "Personalized Lashes & Brows · Scottsdale, AZ",
  announcementSubtext: "Scottsdale Quarter · Loft 28",
  heroHeadline: "Your lashes. Your kind of beautiful.",
  heroSubheadline:
    "Personalized lash and brow artistry, thoughtfully tailored to your unique eye anatomy and personal aesthetic by Corina in Scottsdale, Arizona.",
  studioNotice:
    "Private sanctuary at Salon Lofts Scottsdale Quarter. By appointment only.",
  contactEmailNote: "Appointments & orders managed securely via Square.",
  updatedAt: new Date().toISOString(),
};

const defaultDemoAppointments: Appointment[] = [
  {
    id: "demo-apt-1",
    bookingReference: "FH-APT-7492",
    customerName: "Audrey Campbell",
    customerEmail: "audrey.c@example.com",
    customerPhone: "(480) 555-0192",
    serviceId: "hybrid-textured-set",
    serviceName: "Hybrid / Wispy Full Set",
    staffName: "Corina Gonzalez",
    startAt: new Date(Date.now() + 86400000 * 1.5).toISOString(),
    endAt: new Date(Date.now() + 86400000 * 1.5 + 7200000).toISOString(),
    durationMinutes: 120,
    priceCents: 19500,
    status: "CONFIRMED",
    notes: "Prefers C-curl wispies with natural cat-eye mapping.",
    isDemo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo-apt-2",
    bookingReference: "FH-APT-8314",
    customerName: "Camilla Vance",
    customerEmail: "camilla.v@example.com",
    customerPhone: "(480) 555-0144",
    serviceId: "keratin-lash-lift-tint",
    serviceName: "Keratin Lash Lift & Deep Tint",
    staffName: "Corina Gonzalez",
    startAt: new Date(Date.now() + 86400000 * 2.2).toISOString(),
    endAt: new Date(Date.now() + 86400000 * 2.2 + 3600000).toISOString(),
    durationMinutes: 60,
    priceCents: 11500,
    status: "CONFIRMED",
    notes: "First time lash lift client; sensitive eyes.",
    isDemo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo-apt-3",
    bookingReference: "FH-APT-9041",
    customerName: "Elena Rostova",
    customerEmail: "elena.r@example.com",
    customerPhone: "(480) 555-0188",
    serviceId: "brow-lamination-sculpt",
    serviceName: "Signature Brow Lamination & Sculpt",
    staffName: "Corina Gonzalez",
    startAt: new Date(Date.now() + 86400000 * 3).toISOString(),
    endAt: new Date(Date.now() + 86400000 * 3 + 3000000).toISOString(),
    durationMinutes: 50,
    priceCents: 9500,
    status: "CONFIRMED",
    notes: "Add light tinting to arch peaks.",
    isDemo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const defaultDemoOrders: Order[] = [
  {
    id: "demo-ord-1",
    orderNumber: "FH-10492",
    customerName: "Audrey Campbell",
    customerEmail: "audrey.c@example.com",
    customerPhone: "(480) 555-0192",
    shippingAddress: {
      street: "15169 N Scottsdale Rd, Suite 28",
      city: "Scottsdale",
      state: "AZ",
      zip: "85254",
      isStudioPickup: true,
    },
    items: [
      {
        productId: "prod-cleanser-1",
        name: "Lash Detox Foaming Cleanser",
        priceCents: 2800,
        quantity: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      },
      {
        productId: "prod-wand-5",
        name: "Gold Retractable Spoolie Wand",
        priceCents: 1600,
        quantity: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      },
    ],
    subtotalCents: 4400,
    taxCents: 352,
    shippingCents: 0,
    totalCents: 4752,
    status: "COMPLETED",
    paymentStatus: "PAID",
    fulfillmentStatus: "READY_FOR_PICKUP",
    notes: "Hold for studio pickup during appointment.",
    isDemo: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDataDir();
    this.data = this.loadData();
  }

  private ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadData(): DatabaseSchema {
    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, "utf-8");
        return JSON.parse(raw);
      } catch (err) {
        console.error("Failed to parse db.json, initializing fresh store:", err);
      }
    }

    const initial: DatabaseSchema = {
      users: [],
      sessions: [],
      products: defaultProducts,
      inventoryLogs: [],
      orders: defaultDemoOrders,
      appointments: defaultDemoAppointments,
      siteContent: defaultSiteContent,
      auditLogs: [],
    };

    this.persist(initial);
    return initial;
  }

  private persist(schema: DatabaseSchema) {
    try {
      const tempPath = `${DB_FILE}.tmp.${Date.now()}`;
      fs.writeFileSync(tempPath, JSON.stringify(schema, null, 2), "utf-8");
      fs.renameSync(tempPath, DB_FILE);
    } catch (err) {
      console.error("Failed to persist database file:", err);
    }
  }

  private save() {
    this.persist(this.data);
  }

  // --- USERS & AUTH ---
  public getUsers(): User[] {
    return [...this.data.users];
  }

  public getUserById(id: string): User | undefined {
    return this.data.users.find((u) => u.id === id);
  }

  public getUserByEmail(email: string): User | undefined {
    return this.data.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
  }

  public createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">): User {
    const newUser: User = {
      ...user,
      id: `usr_${crypto.randomBytes(8).toString("hex")}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.users.push(newUser);
    this.save();
    return newUser;
  }

  public updateUser(id: string, updates: Partial<User>): User | undefined {
    const idx = this.data.users.findIndex((u) => u.id === id);
    if (idx === -1) return undefined;
    this.data.users[idx] = {
      ...this.data.users[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.save();
    return this.data.users[idx];
  }

  // --- SESSIONS ---
  public createSession(userId: string, token: string, expiresAt: Date): Session {
    // Purge expired sessions
    this.data.sessions = this.data.sessions.filter(
      (s) => new Date(s.expiresAt) > new Date()
    );

    const session: Session = {
      id: `sess_${crypto.randomBytes(12).toString("hex")}`,
      userId,
      token,
      expiresAt: expiresAt.toISOString(),
      createdAt: new Date().toISOString(),
    };
    this.data.sessions.push(session);
    this.save();
    return session;
  }

  public getSessionByToken(token: string): Session | undefined {
    const session = this.data.sessions.find((s) => s.token === token);
    if (!session) return undefined;
    if (new Date(session.expiresAt) <= new Date()) {
      this.deleteSession(token);
      return undefined;
    }
    return session;
  }

  public deleteSession(token: string) {
    this.data.sessions = this.data.sessions.filter((s) => s.token !== token);
    this.save();
  }

  // --- PRODUCTS ---
  public getProducts(onlyPublished = false): Product[] {
    if (onlyPublished) {
      return this.data.products.filter((p) => p.isPublished);
    }
    return [...this.data.products];
  }

  public getProductById(id: string): Product | undefined {
    return this.data.products.find((p) => p.id === id);
  }

  public getProductBySlug(slug: string): Product | undefined {
    return this.data.products.find((p) => p.slug === slug);
  }

  public createProduct(
    prod: Omit<Product, "id" | "createdAt" | "updatedAt">
  ): Product {
    const newProd: Product = {
      ...prod,
      id: `prod_${crypto.randomBytes(8).toString("hex")}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.products.push(newProd);
    this.save();
    return newProd;
  }

  public updateProduct(
    id: string,
    updates: Partial<Product>
  ): Product | undefined {
    const idx = this.data.products.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    this.data.products[idx] = {
      ...this.data.products[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.save();
    return this.data.products[idx];
  }

  public adjustInventory(
    productId: string,
    delta: number,
    reason: InventoryLog["reason"],
    performedBy: string,
    notes?: string
  ): Product | undefined {
    const prod = this.getProductById(productId);
    if (!prod) return undefined;

    const newQty = Math.max(0, prod.inventoryCount + delta);
    this.updateProduct(productId, { inventoryCount: newQty });

    const log: InventoryLog = {
      id: `inv_${crypto.randomBytes(8).toString("hex")}`,
      productId,
      productName: prod.name,
      quantityChange: delta,
      newQuantity: newQty,
      reason,
      notes,
      performedBy,
      createdAt: new Date().toISOString(),
    };
    this.data.inventoryLogs.unshift(log);
    this.save();
    return this.getProductById(productId);
  }

  public getInventoryLogs(productId?: string): InventoryLog[] {
    if (productId) {
      return this.data.inventoryLogs.filter((l) => l.productId === productId);
    }
    return [...this.data.inventoryLogs];
  }

  // --- ORDERS ---
  public getOrders(): Order[] {
    return [...this.data.orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public getOrderById(id: string): Order | undefined {
    return this.data.orders.find((o) => o.id === id || o.orderNumber === id);
  }

  public createOrder(
    order: Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt">
  ): Order {
    const count = this.data.orders.length + 10500;
    const newOrder: Order = {
      ...order,
      id: `ord_${crypto.randomBytes(8).toString("hex")}`,
      orderNumber: `FH-${count}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.orders.unshift(newOrder);

    // Deduct stock for order
    order.items.forEach((item) => {
      this.adjustInventory(
        item.productId,
        -item.quantity,
        "ORDER_FULFILLED",
        "System Order Processing",
        `Order ${newOrder.orderNumber}`
      );
    });

    this.save();
    return newOrder;
  }

  public updateOrder(id: string, updates: Partial<Order>): Order | undefined {
    const idx = this.data.orders.findIndex(
      (o) => o.id === id || o.orderNumber === id
    );
    if (idx === -1) return undefined;
    this.data.orders[idx] = {
      ...this.data.orders[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.save();
    return this.data.orders[idx];
  }

  // --- APPOINTMENTS ---
  public getAppointments(): Appointment[] {
    return [...this.data.appointments].sort(
      (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
    );
  }

  public getAppointmentById(id: string): Appointment | undefined {
    return this.data.appointments.find(
      (a) => a.id === id || a.bookingReference === id
    );
  }

  public createAppointment(
    apt: Omit<
      Appointment,
      "id" | "bookingReference" | "createdAt" | "updatedAt"
    >
  ): Appointment {
    const ref = `FH-APT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApt: Appointment = {
      ...apt,
      id: `apt_${crypto.randomBytes(8).toString("hex")}`,
      bookingReference: ref,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.appointments.push(newApt);
    this.save();
    return newApt;
  }

  public updateAppointment(
    id: string,
    updates: Partial<Appointment>
  ): Appointment | undefined {
    const idx = this.data.appointments.findIndex(
      (a) => a.id === id || a.bookingReference === id
    );
    if (idx === -1) return undefined;
    this.data.appointments[idx] = {
      ...this.data.appointments[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.save();
    return this.data.appointments[idx];
  }

  // --- SITE CONTENT ---
  public getSiteContent(): SiteContent {
    return { ...this.data.siteContent };
  }

  public updateSiteContent(updates: Partial<SiteContent>): SiteContent {
    this.data.siteContent = {
      ...this.data.siteContent,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.save();
    return this.data.siteContent;
  }

  // --- AUDIT LOGS ---
  public logAudit(log: Omit<AuditLog, "id" | "createdAt">): AuditLog {
    const entry: AuditLog = {
      ...log,
      id: `aud_${crypto.randomBytes(8).toString("hex")}`,
      createdAt: new Date().toISOString(),
    };
    this.data.auditLogs.unshift(entry);
    // Keep max 200 logs
    if (this.data.auditLogs.length > 200) {
      this.data.auditLogs = this.data.auditLogs.slice(0, 200);
    }
    this.save();
    return entry;
  }

  public getAuditLogs(): AuditLog[] {
    return [...this.data.auditLogs];
  }
}

// Global singleton instance
export const db = new Database();
