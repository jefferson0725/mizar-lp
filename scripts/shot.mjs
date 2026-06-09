import { chromium } from "playwright";

const URL = process.env.SHOT_URL || "http://localhost:4173/";

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = 500;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        y += step;
        if (y >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  await page.waitForTimeout(700);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
}

const browser = await chromium.launch();

// DESKTOP
const desktop = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const d = await desktop.newPage();
await d.goto(URL, { waitUntil: "networkidle" });
await autoScroll(d);
await d.screenshot({ path: "shot-desktop-full.png", fullPage: true });
// hero arriba
await d.evaluate(() => window.scrollTo(0, 0));
await d.waitForTimeout(400);
await d.screenshot({ path: "shot-desktop-hero.png" });

// MOBILE
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
const m = await mobile.newPage();
await m.goto(URL, { waitUntil: "networkidle" });
await autoScroll(m);
await m.screenshot({ path: "shot-mobile-full.png", fullPage: true });

await browser.close();
console.log("OK screenshots");
