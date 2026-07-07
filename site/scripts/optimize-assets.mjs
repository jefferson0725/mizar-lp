/**
 * optimize-assets.mjs
 * Optimiza imágenes pesadas del proyecto usando sharp.
 * - obra-*.jpg  → JPEG q78, max 1600px (en sitio, misma extensión)
 * - acabados-*.png  → .webp q80, max 1600px (renombra, elimina .png)
 * - plano-tipo-1.jpg → JPEG q82, max 1600px
 * - torre.png  → .webp q82, max 1600px (renombra, actualiza import en IntroParallax)
 * - planos/*.webp en src → webp q75, max 1600px (solo si > 500 KB)
 *
 * Después de ejecutar, actualiza automáticamente:
 *   - src/landing/assets/index.js  (png → webp en acabados)
 *
 * Uso: node scripts/optimize-assets.mjs
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sharp = require('/Users/jeff-mac/Documents/Proyectos/laureles-campestre/mizar-lp/site/node_modules/sharp/dist/index.cjs');
import { readFileSync, writeFileSync, unlinkSync, statSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(__dirname, '../src/landing/assets');

const MAX_W = 1600;
const results = [];

function kb(bytes) { return Math.round(bytes / 1024); }
function mb(bytes) { return (bytes / 1024 / 1024).toFixed(2); }

async function optimizeJpeg(filePath, quality = 78) {
  const before = statSync(filePath).size;
  const tmp = filePath + '.tmp';
  await sharp(filePath)
    .resize({ width: MAX_W, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(tmp);
  // replace original
  writeFileSync(filePath, readFileSync(tmp));
  unlinkSync(tmp);
  const after = statSync(filePath).size;
  return { before, after };
}

async function pngToWebp(pngPath, quality = 80) {
  const webpPath = pngPath.replace(/\.png$/, '.webp');
  const before = statSync(pngPath).size;
  await sharp(pngPath)
    .resize({ width: MAX_W, withoutEnlargement: true })
    .webp({ quality })
    .toFile(webpPath);
  const after = statSync(webpPath).size;
  unlinkSync(pngPath);
  return { before, after, webpPath };
}

async function optimizeWebp(filePath, quality = 75) {
  const before = statSync(filePath).size;
  if (before < 500 * 1024) return null; // skip if < 500 KB
  const tmp = filePath + '.tmp.webp';
  await sharp(filePath)
    .resize({ width: MAX_W, withoutEnlargement: true })
    .webp({ quality })
    .toFile(tmp);
  writeFileSync(filePath, readFileSync(tmp));
  unlinkSync(tmp);
  const after = statSync(filePath).size;
  return { before, after };
}

// ──────────────────────────────────────────────
// 1. obra-*.jpg (tipo-1 y tipo-2)
// ──────────────────────────────────────────────
console.log('\n▶ Optimizando obra-*.jpg ...');
for (const folder of ['tipo-1', 'tipo-2']) {
  const dir = join(ASSETS, folder);
  const files = readdirSync(dir).filter(f => f.startsWith('obra-') && f.endsWith('.jpg'));
  for (const f of files) {
    const p = join(dir, f);
    const r = await optimizeJpeg(p, 78);
    results.push({ file: `${folder}/${f}`, before: r.before, after: r.after });
    console.log(`  ${folder}/${f}: ${mb(r.before)}MB → ${mb(r.after)}MB (${Math.round((1 - r.after/r.before)*100)}%↓)`);
  }
}

// ──────────────────────────────────────────────
// 2. acabados-*.png → .webp
// ──────────────────────────────────────────────
console.log('\n▶ Convirtiendo acabados-*.png → .webp ...');
for (const folder of ['tipo-1', 'tipo-2']) {
  const dir = join(ASSETS, folder);
  const files = readdirSync(dir).filter(f => f.startsWith('acabados-') && f.endsWith('.png'));
  for (const f of files) {
    const p = join(dir, f);
    const r = await pngToWebp(p, 80);
    results.push({ file: `${folder}/${f} → .webp`, before: r.before, after: r.after });
    console.log(`  ${folder}/${f} → .webp: ${mb(r.before)}MB → ${mb(r.after)}MB (${Math.round((1 - r.after/r.before)*100)}%↓)`);
  }
}

// ──────────────────────────────────────────────
// 3. plano-tipo-1.jpg
// ──────────────────────────────────────────────
console.log('\n▶ Optimizando plano-tipo-1.jpg ...');
{
  const p = join(ASSETS, 'tipo-1/plano-tipo-1.jpg');
  const r = await optimizeJpeg(p, 82);
  results.push({ file: 'tipo-1/plano-tipo-1.jpg', before: r.before, after: r.after });
  console.log(`  plano-tipo-1.jpg: ${mb(r.before)}MB → ${mb(r.after)}MB`);
}

// ──────────────────────────────────────────────
// 4. planos/*.webp en src (solo si > 500 KB)
// ──────────────────────────────────────────────
console.log('\n▶ Optimizando planos/*.webp en src ...');
{
  const dir = join(ASSETS, 'planos');
  const files = readdirSync(dir).filter(f => f.endsWith('.webp'));
  for (const f of files) {
    const p = join(dir, f);
    const r = await optimizeWebp(p, 75);
    if (r) {
      results.push({ file: `planos/${f}`, before: r.before, after: r.after });
      console.log(`  planos/${f}: ${mb(r.before)}MB → ${mb(r.after)}MB`);
    } else {
      console.log(`  planos/${f}: < 500KB, skip`);
    }
  }
}

// ──────────────────────────────────────────────
// 5. Update src/landing/assets/index.js
//    .png?url → .webp?url for acabados
// ──────────────────────────────────────────────
console.log('\n▶ Actualizando index.js (png → webp en acabados) ...');
{
  const indexPath = join(ASSETS, 'index.js');
  let content = readFileSync(indexPath, 'utf8');
  const before = content;
  content = content.replace(/acabados-(\d+)\.png\?url/g, 'acabados-$1.webp?url');
  if (content !== before) {
    writeFileSync(indexPath, content, 'utf8');
    console.log('  index.js actualizado.');
  } else {
    console.log('  index.js sin cambios (ya actualizado?)');
  }
}

// ──────────────────────────────────────────────
// Resumen
// ──────────────────────────────────────────────
const totalBefore = results.reduce((a, r) => a + r.before, 0);
const totalAfter = results.reduce((a, r) => a + r.after, 0);
const saved = totalBefore - totalAfter;
console.log(`\n✓ Total ahorrado: ${mb(saved)} MB (${mb(totalBefore)} → ${mb(totalAfter)} MB)`);
console.log('  Recuerda: rm src/landing/assets/videos/testimios.mp4 ya se hizo aparte.');
