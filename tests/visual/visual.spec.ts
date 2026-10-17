import { test, expect, type Page } from "@playwright/test";

const CONSENT = JSON.stringify({ analytics: false, updatedAt: "2026-01-01T00:00:00.000Z" });

async function open(page: Page, path: string) {
  await page.clock.install({ time: new Date("2026-10-01T09:00:00+02:00") });
  await page.addInitScript((consent) => {
    window.localStorage.setItem("talker_consent", consent);
  }, CONSENT);
  await page.goto(path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: "*,*::before,*::after{transition:none!important;animation:none!important;caret-color:transparent!important} canvas{visibility:hidden!important}" });
}

test.describe("repères visuels", () => {
  test.beforeEach(async ({ page }, info) => {
    test.skip(info.project.name === "iphone-webkit" || page === undefined, "iPhone : test dédié");
  });

  test("hero accueil", async ({ page }) => {
    await open(page, "/");
    await expect(page).toHaveScreenshot("hero.png");
  });

  test("cartes de prix", async ({ page }) => {
    await open(page, "/tarifs");
    await expect(page.locator("#pricing")).toHaveScreenshot("pricing.png");
  });

  test("bulle Talker fermée", async ({ page }) => {
    await open(page, "/");
    const bubble = page.locator("button[data-stage]");
    await expect(bubble).toBeVisible();
    await expect(bubble).toHaveScreenshot("bubble.png");
  });
});

test("iphone : un tap sur la bulle ouvre le chat", async ({ page }, info) => {
  test.skip(info.project.name !== "iphone-webkit", "WebKit iPhone uniquement");
  await open(page, "/");
  const bubble = page.locator("button[data-stage]");
  await expect(bubble).toBeVisible();
  await expect(bubble).toHaveScreenshot("bubble-iphone.png");
  await bubble.tap();
  const panel = page.locator(".talker-demo-panel");
  await expect(panel).toBeVisible();
  await expect(bubble).toHaveAttribute("aria-expanded", "true");
  await expect(panel).toHaveScreenshot("chat-open-iphone.png");
});
