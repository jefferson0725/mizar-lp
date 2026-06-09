import { chromium } from "playwright";
const URL = "http://localhost:4173/";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto(URL, { waitUntil: "networkidle" });

async function shotByText(text, file) {
  const el = p.locator(`text=${text}`).first();
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(700);
  // captura el viewport actual (sección visible)
  await p.screenshot({ path: file });
}

await shotByText("Estás comprando", "sec-ubicacion.png");
await shotByText("Conoce el apartamento", "sec-apartamentos.png");
await shotByText("Pago a cuotas", "sec-precios.png");
await shotByText("Resumen rápido", "sec-resumen.png");

await browser.close();
console.log("OK sections");
