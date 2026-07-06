import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const p = await ctx.newPage();
await p.goto("http://localhost:4321/", { waitUntil: "networkidle" });
await p.waitForTimeout(1200);
await p.screenshot({ path: process.argv[2] + "/home-mobile-hero.png" });

// medir el hero
const rect = await p.evaluate(() => {
  const s = document.querySelector("section");
  const r = s.getBoundingClientRect();
  return { w: Math.round(r.width), h: Math.round(r.height), vw: innerWidth, vh: innerHeight };
});
console.log("hero:", JSON.stringify(rect), "aspect:", (rect.w / rect.h).toFixed(3));
await browser.close();
