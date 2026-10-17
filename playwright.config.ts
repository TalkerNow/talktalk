import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.VISUAL_PORT || 3990);

export default defineConfig({
  testDir: "tests/visual",
  snapshotPathTemplate: process.env.VISUAL_SNAPSHOTS
    ? `${process.env.VISUAL_SNAPSHOTS}/{projectName}/{arg}{ext}`
    : "tests/visual/baselines/{projectName}/{arg}{ext}",
  outputDir: process.env.VISUAL_OUTPUT || "test-results/visual",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.002, animations: "disabled", caret: "hide" } },
  use: { baseURL: `http://127.0.0.1:${port}`, contextOptions: { reducedMotion: "reduce" }, locale: "fr-FR", timezoneId: "Europe/Paris" },
  webServer: { command: `npx next start -p ${port}`, url: `http://127.0.0.1:${port}`, reuseExistingServer: false, timeout: 120000 },
  projects: [
    { name: "desktop-1440", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile-390", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 }, isMobile: false } },
    { name: "iphone-webkit", use: { ...devices["iPhone 13"] } },
  ],
});
