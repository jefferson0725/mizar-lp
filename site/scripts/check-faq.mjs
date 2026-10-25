// Autoverificación del JSON-LD FAQPage y del resto de JSON-LD (tras `npm run build`).
// Uso: node scripts/check-faq.mjs [dist]
// Comprueba, por artículo, que cada pregunta y cada respuesta del FAQPage aparecen tal cual
// (mismo texto, espacios normalizados) en el texto visible de la página, y que todo JSON-LD es JSON válido.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (m, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }[e.toLowerCase()];
  });
const text = (h) => decode(h.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();

let bad = 0;
const root = join(dist, 'blog');
for (const slug of readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
  const file = join(root, slug, 'index.html');
  if (!existsSync(file)) continue;
  const html = readFileSync(file, 'utf8');
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  let parsed = [];
  try {
    parsed = blocks.flatMap((b) => [JSON.parse(b)].flat());
  } catch (e) {
    console.log(`FALLA ${slug}: JSON-LD inválido (${e.message})`);
    bad++;
    continue;
  }
  const visible = text(html.match(/<article[\s\S]*<\/article>/)?.[0] ?? '');
  const faq = parsed.find((o) => o['@type'] === 'FAQPage');
  const hasSection = /Preguntas frecuentes/i.test(visible);
  if (!faq) {
    console.log(`${slug}: sin FAQPage (sección visible: ${hasSection ? 'SÍ' : 'no'})`);
    if (hasSection) bad++;
    continue;
  }
  let pos = 0, ok = 0;
  for (const q of faq.mainEntity) {
    const iq = visible.indexOf(q.name, pos);
    const ia = iq < 0 ? -1 : visible.indexOf(q.acceptedAnswer.text, iq + q.name.length);
    if (iq >= 0 && ia >= 0) { ok++; pos = ia; } else { console.log(`  FALLA: «${q.name}»`); bad++; }
  }
  console.log(`${slug}: FAQPage ${faq.mainEntity.length} P/R, ${ok} verificadas contra el texto visible`);
}
console.log(bad ? `\n${bad} problema(s)` : '\nTodo correcto');
process.exit(bad ? 1 : 0);
