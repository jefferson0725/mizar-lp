import { chromium } from "playwright";

async function scroll(p) {
  await p.evaluate(async () => {
    await new Promise(r => {
      let y = 0;
      const t = setInterval(() => {
        window.scrollBy(0, 500);
        y += 500;
        if (y >= document.body.scrollHeight) { clearInterval(t); r(); }
      }, 100);
    });
  });
  await p.waitForTimeout(500);
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(300);
}

const browser = await chromium.launch();

// Laureles /
const d1 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p1 = await d1.newPage();
await p1.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await scroll(p1);
await p1.screenshot({ path: "route-laureles-hero.png" });
await p1.screenshot({ path: "route-laureles-full.png", fullPage: true });

// Terrazas /terrazas
const d2 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p2 = await d2.newPage();
await p2.goto("http://localhost:4173/terrazas", { waitUntil: "networkidle" });
await scroll(p2);
await p2.screenshot({ path: "route-terrazas-hero.png" });
await p2.screenshot({ path: "route-terrazas-full.png", fullPage: true });

await browser.close();
console.log("OK");
