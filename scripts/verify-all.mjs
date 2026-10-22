import { chromium } from "playwright-core";
import fs from "fs";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function run() {
  console.log("Launching Edge via playwright-core...");
  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true,
  });

  const viewports = [
    { name: "mobile-390", width: 390, height: 844 },
    { name: "mobile-430", width: 430, height: 932 },
    { name: "tablet-768", width: 768, height: 1024 },
    { name: "tablet-landscape-1024", width: 1024, height: 768 },
    { name: "desktop-1440", width: 1440, height: 900 },
    { name: "wide-1920", width: 1920, height: 1080 },
  ];

  console.log("\n--- VIEWPORT & OVERFLOW CHECKS ---");
  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
    });

    await page.goto("http://localhost:3001/", { waitUntil: "networkidle" });

    // Check for overflow elements
    const overflowInfo = await page.evaluate((width) => {
      const bad = [];
      document.querySelectorAll("*").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.right > width + 1) {
          bad.push({
            tag: el.tagName,
            id: el.id,
            className: el.className?.toString().slice(0, 50),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
          });
        }
      });
      return {
        windowWidth: width,
        scrollWidth: document.documentElement.scrollWidth,
        hasOverflow: document.documentElement.scrollWidth > width,
        badCount: bad.length,
        badSamples: bad.slice(0, 4),
      };
    }, vp.width);

    console.log(
      `[${vp.name}] Width: ${vp.width}px | ScrollWidth: ${overflowInfo.scrollWidth}px | Overflow: ${
        overflowInfo.hasOverflow ? "FAIL" : "PASS"
      }`
    );

    if (overflowInfo.hasOverflow) {
      console.log("  Overflow culprits:", JSON.stringify(overflowInfo.badSamples, null, 2));
    }

    // Take screenshot
    await page.screenshot({
      path: `screenshots/${vp.name}.png`,
      fullPage: false,
    });

    await page.close();
  }

  console.log("\n--- MULTI-PAGE AUDIT & LINK INTEGRITY ---");
  const routes = [
    { path: "/", title: "Home" },
    { path: "/services", title: "Services" },
    { path: "/artist", title: "The Artist" },
    { path: "/gallery", title: "Gallery" },
    { path: "/aftercare", title: "Aftercare" },
    { path: "/contact", title: "Contact" },
    { path: "/privacy", title: "Privacy" },
  ];

  const auditPage = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  for (const r of routes) {
    const res = await auditPage.goto(`http://localhost:3001${r.path}`, { waitUntil: "networkidle" });
    const status = res.status();

    // Check images
    const brokenImages = await auditPage.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll("img"));
      return imgs
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.src);
    });

    // Check square booking links
    const bookingLinks = await auditPage.evaluate(() => {
      const links = Array.from(document.querySelectorAll("a"));
      return links
        .filter((a) => a.href.includes("square.site"))
        .map((a) => a.href);
    });

    console.log(
      `Route: ${r.path.padEnd(12)} | Status: ${status} | Broken Imgs: ${brokenImages.length} | Square CTAs: ${bookingLinks.length}`
    );

    if (brokenImages.length > 0) {
      console.log("  Broken image URLs:", brokenImages);
    }
  }

  console.log("\n--- MOBILE MENU & KEYBOARD INTERACTION ---");
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto("http://localhost:3001/", { waitUntil: "networkidle" });

  // Locate mobile menu button
  const menuButton = mobilePage.locator('button[aria-label="Open main menu"]');
  const isMenuBtnVisible = await menuButton.isVisible();
  console.log("Mobile menu button visible:", isMenuBtnVisible);

  if (isMenuBtnVisible) {
    await menuButton.click();
    await mobilePage.waitForTimeout(300);

    const dialogVisible = await mobilePage.locator('div[role="dialog"]').isVisible();
    console.log("Mobile drawer opened on click:", dialogVisible);

    // Test Esc key to close
    await mobilePage.keyboard.press("Escape");
    await mobilePage.waitForTimeout(300);
    const dialogClosed = !(await mobilePage.locator('div[role="dialog"]').isVisible());
    console.log("Mobile drawer closed on Escape:", dialogClosed);
  }

  console.log("\n--- GALLERY FILTER & LIGHTBOX TEST ---");
  await auditPage.goto("http://localhost:3001/gallery", { waitUntil: "networkidle" });

  // Click a filter tab
  const hybridTab = auditPage.locator('button:has-text("Wispy & Hybrid")');
  if (await hybridTab.isVisible()) {
    await hybridTab.click();
    await auditPage.waitForTimeout(200);
    console.log("Filter Wispy & Hybrid clicked successfully.");
  }

  // Click first gallery item to open lightbox
  const firstItem = auditPage.locator(".group.relative.cursor-pointer").first();
  if (await firstItem.isVisible()) {
    await firstItem.click();
    await auditPage.waitForTimeout(300);
    const lightboxVisible = await auditPage.locator('div[role="dialog"]').isVisible();
    console.log("Gallery Lightbox opened on click:", lightboxVisible);

    // Close lightbox
    const closeBtn = auditPage.locator('button[aria-label="Close lightbox"]');
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await auditPage.waitForTimeout(200);
      const lightboxClosed = !(await auditPage.locator('div[role="dialog"]').isVisible());
      console.log("Gallery Lightbox closed on close button:", lightboxClosed);
    }
  }

  await mobilePage.close();
  await auditPage.close();
  await browser.close();
  console.log("\nAll automated checks completed.");
}

run().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
