import { chromium } from 'playwright';

const base = 'http://localhost:4321';
const outDir = process.argv[2] ?? '.';
const routes = [
  ['/', 'home'],
  ['/nosotros', 'nosotros'],
  ['/proyectos', 'proyectos'],
  ['/lotes-cucuta', 'milote'],
  ['/contacto', 'contacto'],
  ['/blog', 'blog'],
];

const browser = await chromium.launch();
for (const [vw, label] of [[390, 'mobile'], [1366, 'desktop']]) {
  const page = await browser.newPage({ viewport: { width: vw, height: 900 } });
  for (const [route, name] of routes) {
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${outDir}/${name}-${label}.png`, fullPage: true });
  }
  await page.close();
}
await browser.close();
console.log('done');
