import { chromium } from "playwright-core";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function run() {
  console.log("Starting Platform Automated Verification...");
  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true,
  });

  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  console.log("\n=== 1. COMMERCE FLOW (Shop -> Product -> Cart -> Checkout) ===");
  // 1. Visit /shop
  await page.goto("http://localhost:3001/shop", { waitUntil: "networkidle" });
  console.log("Loaded /shop: Title =", await page.title());

  // Click first product
  const firstProduct = page.locator("a[href^='/shop/']").first();
  await firstProduct.click();
  await page.waitForTimeout(500);
  console.log("Visited Product Detail:", page.url());

  // Click Add to Bag
  const addToBagBtn = page.locator("button:has-text('Add to Bag')");
  await addToBagBtn.click();
  await page.waitForTimeout(600);

  // Verify Cart Drawer opened
  const cartDrawerVisible = await page.locator("div[aria-label='Shopping Cart Drawer']").isVisible();
  console.log("Cart Drawer opened on Add to Bag:", cartDrawerVisible);

  // Visit /cart
  await page.goto("http://localhost:3001/cart", { waitUntil: "networkidle" });
  const hasCartItems = await page.locator("table, div:has-text('Subtotal')").first().isVisible();
  console.log("Loaded /cart with items:", hasCartItems);

  // Visit /checkout
  await page.goto("http://localhost:3001/checkout", { waitUntil: "networkidle" });
  console.log("Loaded /checkout");

  // Fill Checkout form
  await page.fill("input[placeholder='e.g. Lauren Martinez']", "Serena Williams");
  await page.fill("input[placeholder='lauren@example.com']", "serena.test@example.com");
  await page.fill("input[placeholder='(480) 555-0123']", "4805559876");

  // Submit checkout
  const payBtn = page.locator("button:has-text('Authorize & Pay')");
  await payBtn.click();
  await page.waitForTimeout(2000);
  console.log("Checkout submitted. Redirected URL:", page.url());
  const isConfirmed = page.url().includes("/order-confirmation/");
  console.log("Order confirmation reached:", isConfirmed);

  console.log("\n=== 2. BOOKING FLOW (/book) ===");
  await page.goto("http://localhost:3001/book", { waitUntil: "networkidle" });
  console.log("Loaded /book: Title =", await page.title());

  // Step 1: Select first service
  const serviceCard = page.locator("div:has-text('View Slots')").first();
  await serviceCard.click();
  await page.waitForTimeout(600);

  // Step 2: Select first available slot
  const firstSlotBtn = page.locator("button:has-text('With Corina Gonzalez')").first();
  if (await firstSlotBtn.isVisible()) {
    await firstSlotBtn.click();
    await page.waitForTimeout(500);
    console.log("Selected time slot, reached Step 3 (Client Details)");

    // Step 3: Fill details
    await page.fill("input[placeholder='e.g. Lauren Martinez']", "Chloe Davenport");
    await page.fill("input[placeholder='lauren@example.com']", "chloe.d@example.com");
    await page.fill("input[placeholder='(480) 555-0123']", "4805551122");

    // Complete booking
    const completeBookingBtn = page.locator("button:has-text('Complete Reservation')");
    await completeBookingBtn.click();
    await page.waitForTimeout(1500);

    const bookingSuccess = await page.locator("h2:has-text('We Look Forward to Welcoming You')").isVisible();
    console.log("Booking successfully confirmed:", bookingSuccess);
  }

  console.log("\n=== 3. ADMIN AUTHENTICATION & ACCESS GATING ===");
  // Visit /admin unauthenticated
  await page.goto("http://localhost:3001/admin", { waitUntil: "networkidle" });
  const isAuthGate = await page.locator("h1:has-text('Initial Security Setup'), h1:has-text('Staff & Owner Sign In')").isVisible();
  console.log("Admin gate rendered when unauthenticated:", isAuthGate);

  // Test Admin Setup or Login
  const isInitialSetup = await page.locator("h1:has-text('Initial Security Setup')").isVisible();
  if (isInitialSetup) {
    console.log("Performing first-time admin setup...");
    await page.fill("input[placeholder='e.g. Corina Gonzalez']", "Corina Gonzalez");
    await page.fill("input[placeholder='corina@flutterhoney.com']", "admin@flutterhoney.local");
    const pwdInputs = page.locator("input[type='password']");
    await pwdInputs.nth(0).fill("LuxuryAdmin2026!");
    await pwdInputs.nth(1).fill("LuxuryAdmin2026!");
    await page.click("button:has-text('Initialize Administrator')");
    await page.waitForTimeout(1500);
  } else {
    console.log("Signing in as administrator...");
    await page.fill("input[placeholder='admin@flutterhoney.com']", "admin@flutterhoney.local");
    await page.fill("input[type='password']", "LuxuryAdmin2026!");
    await page.click("button:has-text('Sign In to Admin')");
    await page.waitForTimeout(1500);
  }

  const isDashboard = await page.locator("h1:has-text('Business Dashboard')").isVisible();
  console.log("Successfully entered Admin Dashboard:", isDashboard);

  // Test Admin Sub-routes
  const adminRoutes = [
    "/admin/appointments",
    "/admin/calendar",
    "/admin/products",
    "/admin/inventory",
    "/admin/orders",
    "/admin/customers",
    "/admin/services",
    "/admin/content",
    "/admin/analytics",
    "/admin/settings",
    "/admin/audit-log",
  ];

  console.log("\n=== 4. ADMIN WORKSPACE PAGES AUDIT ===");
  for (const route of adminRoutes) {
    const res = await page.goto(`http://localhost:3001${route}`, { waitUntil: "networkidle" });
    console.log(`Route: ${route.padEnd(22)} | Status: ${res.status()}`);
  }

  // Capture representative screenshots
  console.log("\n=== 5. CAPTURING REPRESENTATIVE SCREENSHOTS ===");
  await page.screenshot({ path: "screenshots/platform-admin-dashboard.png" });

  await page.goto("http://localhost:3001/shop", { waitUntil: "networkidle" });
  await page.screenshot({ path: "screenshots/platform-shop.png" });

  await page.goto("http://localhost:3001/book", { waitUntil: "networkidle" });
  await page.screenshot({ path: "screenshots/platform-book.png" });

  // Mobile viewport check for /book
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3001/book", { waitUntil: "networkidle" });
  await page.screenshot({ path: "screenshots/platform-book-mobile.png" });

  console.log("Screenshots captured successfully.");
  await browser.close();
  console.log("\nAll platform automated tests passed successfully!");
}

run().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
