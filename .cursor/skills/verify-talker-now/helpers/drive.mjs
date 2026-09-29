#!/usr/bin/env node
/**
 * Drive talker.now in Chrome the way a visitor would.
 *
 * Usage (from helpers/ after npm install):
 *   node drive.mjs <feature> [--url http://127.0.0.1:3317]
 *
 * Features: home | demo-chat | contact | installer | locale
 */

import { chromium } from "playwright-core";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = path.resolve(__dirname, "..");
const EVIDENCE_DIR = process.env.TALKER_VERIFY_EVIDENCE || path.join(SKILL_DIR, "evidence");
const CHROME_PATH = process.env.CHROME_PATH || "/usr/local/bin/google-chrome";
const BASE_URL = process.env.TALKER_VERIFY_URL || "http://127.0.0.1:3317";

const feature = process.argv[2];
const urlFlag = process.argv.indexOf("--url");
const baseUrl = urlFlag >= 0 ? process.argv[urlFlag + 1] : BASE_URL;

if (!feature) {
  console.error("Usage: node drive.mjs <home|demo-chat|contact|installer|locale> [--url URL]");
  process.exit(2);
}

async function launchBrowser() {
  return chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
}

async function saveProof(page, dir, stem, extra = {}) {
  await mkdir(dir, { recursive: true });
  const png = path.join(dir, `${stem}.png`);
  const html = path.join(dir, `${stem}.html`);
  const aria = path.join(dir, `${stem}.aria.txt`);
  const meta = path.join(dir, `${stem}.meta.json`);
  await page.screenshot({ path: png, fullPage: false });
  await writeFile(html, await page.content(), "utf8");
  const snapshot = await page.locator("body").innerText();
  await writeFile(aria, snapshot, "utf8");
  await writeFile(
    meta,
    JSON.stringify(
      {
        feature,
        url: page.url(),
        title: await page.title(),
        capturedAt: new Date().toISOString(),
        ...extra,
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );
  return { png, html, aria, meta };
}

function mustInclude(haystack, needles, where) {
  for (const needle of needles) {
    if (!haystack.includes(needle)) {
      throw new Error(`${where} missing ${JSON.stringify(needle)}`);
    }
  }
}

async function driveHome(page) {
  const dir = path.join(EVIDENCE_DIR, "home");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/?lang=fr`, { waitUntil: "networkidle" });
  await page.getByLabel("talker.now").first().waitFor();
  const before = await saveProof(page, dir, "01-landing", { step: "open-home" });
  const landingText = await page.locator("body").innerText();
  mustInclude(landingText, ["talker", "Créer mon agent gratuitement", "Fonctionnalités"], "home");

  await page.locator("a[href='/installer']").filter({ hasText: "Créer mon agent gratuitement" }).first().click();
  await page.waitForURL(/\/installer/);
  await page.getByRole("heading", { name: "Télécharger Talker" }).waitFor();
  const after = await saveProof(page, dir, "02-installer-from-hero", { step: "hero-cta" });
  const installerText = await page.locator("body").innerText();
  mustInclude(installerText, ["Télécharger le zip", "talker-now.zip"], "installer after CTA");
  return { before, after };
}

async function driveDemoChat(page) {
  const dir = path.join(EVIDENCE_DIR, "demo-chat");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/?lang=fr`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Voir une démo" }).click();
  const dialog = page.getByRole("dialog", { name: "Talker" });
  await dialog.waitFor();
  await saveProof(page, dir, "01-opened", { step: "see-demo" });
  await dialog.getByRole("button", { name: "Quels sont vos horaires ?" }).click();
  await page.getByText("Nous recevons du lundi au vendredi", { timeout: 8000 }).waitFor();
  const after = await saveProof(page, dir, "02-horaires", { step: "chip-horaires" });
  await dialog.getByRole("button", { name: "Fermer Talker" }).click();
  await dialog.waitFor({ state: "hidden" });
  return after;
}

async function driveContact(page) {
  const dir = path.join(EVIDENCE_DIR, "contact");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/contact?lang=fr`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: /Contact/ }).waitFor();
  await saveProof(page, dir, "01-form", { step: "open-contact" });
  await page.locator("#name").fill("Vérif Agent");
  await page.locator("#company").fill("Talker");
  await page.locator("#email").fill("verify@talker.now");
  await page.locator("#phone").fill("0102030405");
  await page.locator("#message").fill("Message de vérification du site marketing.");
  await page.getByRole("button", { name: "Envoyer" }).click();
  await page.getByText("C’est transmis. On vous écrit à cette adresse.").waitFor();
  return saveProof(page, dir, "02-success", { step: "submit" });
}

async function driveInstaller(page) {
  const dir = path.join(EVIDENCE_DIR, "installer");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/installer?lang=fr`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Télécharger Talker" }).waitFor();
  await saveProof(page, dir, "01-page", { step: "open-installer" });
  const downloadLink = page.getByRole("link", { name: "Télécharger le zip" });
  const href = await downloadLink.getAttribute("href");
  if (href !== "/talker-now.zip") {
    throw new Error(`download href is ${href}, expected /talker-now.zip`);
  }
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    downloadLink.click(),
  ]);
  const suggested = download.suggestedFilename();
  const dest = path.join(dir, suggested || "talker-now.zip");
  await download.saveAs(dest);
  return saveProof(page, dir, "02-after-download", {
    step: "download-zip",
    zip: dest,
    suggestedFilename: suggested,
  });
}

async function driveLocale(page) {
  const dir = path.join(EVIDENCE_DIR, "locale");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/?lang=fr`, { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Fonctionnalités" }).first().waitFor();
  await saveProof(page, dir, "01-fr", { step: "default-fr" });
  await page.getByRole("button", { name: "Langue" }).hover();
  await page.getByRole("option", { name: "English" }).click();
  await page.getByRole("link", { name: "Features" }).first().waitFor();
  const url = page.url();
  if (!url.includes("lang=en")) {
    throw new Error(`expected lang=en in URL, got ${url}`);
  }
  const text = await page.locator("body").innerText();
  mustInclude(text, ["Features", "Start for free"], "english home");
  return saveProof(page, dir, "02-en", { step: "switch-en" });
}

const drivers = {
  home: driveHome,
  "demo-chat": driveDemoChat,
  contact: driveContact,
  installer: driveInstaller,
  locale: driveLocale,
};

const driver = drivers[feature];
if (!driver) {
  console.error(`Unknown feature ${feature}. Known: ${Object.keys(drivers).join(", ")}`);
  process.exit(2);
}

const browser = await launchBrowser();
const page = await browser.newPage();
try {
  const result = await driver(page);
  console.log(JSON.stringify({ ok: true, feature, url: page.url(), result }, null, 2));
} catch (error) {
  const dir = path.join(EVIDENCE_DIR, feature);
  try {
    await saveProof(page, dir, "FAIL", { error: String(error) });
  } catch {
    /* page may already be gone */
  }
  console.error(error);
  process.exit(1);
} finally {
  await browser.close();
}
