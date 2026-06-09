import { chromium } from "playwright";
const URL = "http://localhost:4173/";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 } });
const p = await ctx.newPage();
await p.goto(URL, { waitUntil: "networkidle" });

// Sección Apartamentos (la <section> que contiene el h2)
const aptSection = p.locator("section", { hasText: "Conoce el apartamento" }).first();
await aptSection.scrollIntoViewIfNeeded();
await p.waitForTimeout(800);
await aptSection.screenshot({ path: "el-apartamento.png" });

// Mapa (iframe de Ubicación)
const mapWrap = p.locator("iframe").first();
await mapWrap.scrollIntoViewIfNeeded();
await p.waitForTimeout(1500);
await p.screenshot({ path: "el-mapa.png" });

await browser.close();
console.log("OK el");
