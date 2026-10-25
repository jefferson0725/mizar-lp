/**
 * Extrae las preguntas frecuentes de un artículo a partir de su HTML YA RENDERIZADO
 * (nunca de texto re-escrito), para el JSON-LD FAQPage. Solo lee: no cambia lo visible.
 *
 * Reglas:
 *  - La sección empieza en un encabezado (h2-h6) cuyo texto empieza por «Preguntas frecuentes».
 *  - Termina en el siguiente encabezado del mismo nivel o superior, o en un <hr>.
 *  - Una pregunta es un encabezado de nivel inferior al de la sección (h3 bajo h2) o un
 *    párrafo cuyo contenido completo es <strong>pregunta</strong>.
 *  - La respuesta son los párrafos/listas siguientes hasta la próxima pregunta. No cuenta como
 *    respuesta (y la corta) el cierre del artículo: un párrafo que empieza por <strong> o <em>
 *    (p. ej. «Sigue leyendo:», «Actualizado…») o por «¿» (invitación a escribir por WhatsApp).
 */

export interface FaqItem {
  question: string;
  answer: string;
}

interface Block {
  tag: string;
  inner: string;
}

const NAMED: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
};

function decode(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === '#') {
      const code = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return NAMED[e.toLowerCase()] ?? m;
  });
}

/** Texto visible de un fragmento HTML: sin etiquetas, entidades decodificadas, espacios normalizados. */
export function htmlToText(html: string): string {
  return decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

/** Divide el HTML en bloques de primer nivel (h1-h6, p, ul, ol, blockquote, table, pre, hr). */
function topLevelBlocks(html: string): Block[] {
  const blocks: Block[] = [];
  const open = /<(h[1-6]|p|ul|ol|blockquote|table|pre|hr)\b[^>]*>/gi;
  let m: RegExpExecArray | null;
  let pos = 0;
  while (pos < html.length && (open.lastIndex = pos, (m = open.exec(html)))) {
    const tag = m[1].toLowerCase();
    if (tag === 'hr') {
      blocks.push({ tag, inner: '' });
      pos = m.index + m[0].length;
      continue;
    }
    // Cierre correspondiente, contando anidamiento del mismo tag (listas dentro de listas).
    const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi');
    re.lastIndex = m.index + m[0].length;
    let depth = 1;
    let t: RegExpExecArray | null;
    let end = -1;
    while ((t = re.exec(html))) {
      depth += t[1] ? -1 : 1;
      if (depth === 0) {
        end = t.index;
        pos = t.index + t[0].length;
        break;
      }
    }
    if (end === -1) break;
    blocks.push({ tag, inner: html.slice(m.index + m[0].length, end) });
  }
  return blocks;
}

const level = (tag: string) => (/^h[1-6]$/.test(tag) ? Number(tag[1]) : 0);

/** Pregunta en negrita: el párrafo entero es un único <strong>…</strong>. */
function boldQuestion(inner: string): string | null {
  const m = inner.trim().match(/^<strong\b[^>]*>([\s\S]*)<\/strong>$/i);
  if (!m || /<strong\b/i.test(m[1])) return null;
  return htmlToText(m[1]) || null;
}

/** Cierre del artículo (no es respuesta): empieza por <strong>/<em> o por «¿». */
function isClosing(inner: string): boolean {
  const t = inner.trim();
  return /^<(strong|em)\b/i.test(t) || t.startsWith('¿');
}

export function extractFaq(html: string): FaqItem[] {
  const blocks = topLevelBlocks(html);
  const start = blocks.findIndex(
    (b) => level(b.tag) >= 2 && /^preguntas frecuentes/i.test(htmlToText(b.inner)),
  );
  if (start === -1) return [];
  const L = level(blocks[start].tag);

  const items: FaqItem[] = [];
  let q: string | null = null;
  let answer: string[] = [];
  const flush = () => {
    if (q && answer.length) items.push({ question: q, answer: answer.join(' ') });
    q = null;
    answer = [];
  };

  for (let i = start + 1; i < blocks.length; i++) {
    const b = blocks[i];
    const lv = level(b.tag);
    if (b.tag === 'hr' || (lv && lv <= L)) break;
    if (lv > L) {
      flush();
      q = htmlToText(b.inner);
      continue;
    }
    if (b.tag === 'p') {
      const bq = boldQuestion(b.inner);
      if (bq) {
        flush();
        q = bq;
        continue;
      }
      if (isClosing(b.inner)) break;
    }
    if (q) {
      const text = htmlToText(b.inner);
      if (text) answer.push(text);
    }
  }
  flush();
  return items;
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  };
}
