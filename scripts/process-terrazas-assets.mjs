// Procesa los assets de "Terrazas de la Cantera" hacia public/assets/.
// - Render del edificio  -> hero + torre (webp)
// - Logo del proyecto    -> recorta el fondo teal a transparente (webp con alpha)
// - Plano Tipo 1         -> webp
// - Carrusel de interiores -> galeria-NN.webp
// - Video timeline       -> copia tal cual
import sharp from "sharp";
import { readFileSync, copyFileSync, mkdirSync, existsSync } from "fs";

const BASE =
  "C:/Users/samue/Downloads/2. Terrazas de la cantera-20260609T204814Z-3-001/2. Terrazas de la cantera";
const OUT = "public/assets";
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const RENDER = `${BASE}/ChatGPT Image 3 jun 2026, 04_15_11 p.m. (1).png`;
const LOGO = "C:/Users/samue/OneDrive/Imágenes/Screenshots/Captura de pantalla 2026-06-09 155412.png";
const PLANO1 = `${BASE}/Planos/Tipo 1_page-0001.jpg`;
const CARRUSEL = `${BASE}/Carrusel imagenes`;
const VIDEO = `${BASE}/Edificio la Cantera_ Día a Noche.mp4`;

const carruselNums = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13];

async function run() {
  // --- Render del edificio: hero (ancho) + versión general ---
  await sharp(RENDER)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`${OUT}/hero-fachada.webp`);
  console.log("✓ hero-fachada.webp");

  await sharp(RENDER)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(`${OUT}/render-edificio.webp`);
  console.log("✓ render-edificio.webp");

  // --- Logo: recortar fondo teal a transparente ---
  const img = sharp(LOGO).ensureAlpha();
  const { data, info } = await img
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  // color de fondo = pixel esquina superior izquierda
  const bg = { r: data[0], g: data[1], b: data[2] };
  for (let i = 0; i < data.length; i += channels) {
    const dr = data[i] - bg.r;
    const dg = data[i + 1] - bg.g;
    const db = data[i + 2] - bg.b;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);
    let alpha;
    if (dist < 60) alpha = 0;
    else if (dist > 120) alpha = 255;
    else alpha = Math.round(((dist - 60) / 60) * 255);
    data[i + 3] = alpha;
    if (alpha > 0) {
      // forzar logo blanco limpio
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    }
  }
  await sharp(data, { raw: { width, height, channels } })
    .resize({ width: 520, withoutEnlargement: true })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(`${OUT}/logo-terrazas.webp`);
  console.log(`✓ logo-terrazas.webp (bg key rgb ${bg.r},${bg.g},${bg.b})`);

  // --- Plano Tipo 1 ---
  await sharp(PLANO1)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(`${OUT}/plano-tipo1.webp`);
  console.log("✓ plano-tipo1.webp");

  // --- Carrusel de interiores ---
  let n = 1;
  for (const num of carruselNums) {
    const src = `${CARRUSEL}/${num}.png`;
    if (!existsSync(src)) {
      console.log(`! falta ${src}`);
      continue;
    }
    const out = `${OUT}/galeria-${String(n).padStart(2, "0")}.webp`;
    await sharp(src)
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out);
    n++;
  }
  console.log(`✓ ${n - 1} imágenes de galería`);

  // --- Video timeline ---
  copyFileSync(VIDEO, `${OUT}/timeline-edificio.mp4`);
  console.log("✓ timeline-edificio.mp4");

  console.log("\nLISTO");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
