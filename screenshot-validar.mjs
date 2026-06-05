import { chromium } from 'playwright'

const URL = 'http://localhost:5173/'

async function autoScroll(page) {
  // Baja en pasos para disparar las animaciones whileInView, luego vuelve arriba
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0
      const step = 400
      const timer = setInterval(() => {
        window.scrollBy(0, step)
        y += step
        if (y >= document.body.scrollHeight) {
          clearInterval(timer)
          resolve()
        }
      }, 120)
    })
  })
  await page.waitForTimeout(800)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(400)
}

const browser = await chromium.launch()

// --- MÓVIL ---
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
})
const mPage = await mobile.newPage()
await mPage.goto(URL, { waitUntil: 'networkidle' })
await autoScroll(mPage)
await mPage.screenshot({ path: 'val-movil-full.png', fullPage: true })

// Secciones clave en móvil
const ubic = mPage.locator('text=Estás comprando del lado correcto').first()
await ubic.scrollIntoViewIfNeeded()
await mPage.waitForTimeout(600)
await mPage.screenshot({ path: 'val-movil-ubicacion.png' })

const apt = mPage.locator('text=Los apartamentos').first()
await apt.scrollIntoViewIfNeeded()
await mPage.waitForTimeout(600)
await mPage.screenshot({ path: 'val-movil-apartamentos.png' })

const precios = mPage.locator('text=Pago a cuotas').first()
await precios.scrollIntoViewIfNeeded()
await mPage.waitForTimeout(600)
await mPage.screenshot({ path: 'val-movil-precios.png' })

// --- DESKTOP ---
const desktop = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
})
const dPage = await desktop.newPage()
await dPage.goto(URL, { waitUntil: 'networkidle' })
await autoScroll(dPage)
await dPage.screenshot({ path: 'val-desktop-full.png', fullPage: true })

await browser.close()
console.log('OK screenshots generados')
