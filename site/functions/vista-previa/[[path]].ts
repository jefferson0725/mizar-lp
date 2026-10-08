/**
 * Cloudflare Pages Function — vista previa de borradores del blog.
 *
 * Atiende todo /vista-previa/* (ver .claude/cloudflare/_routes.json: el resto del sitio sigue
 * siendo 100 % estático y nunca pasa por aquí). Solo /vista-previa/blog/ muestra algo:
 *   1. comprueba la firma del enlace que genera Strapi (src/lib/previewToken.ts);
 *   2. pide el artículo a Strapi con un token de API de solo lectura (nunca llega al navegador);
 *   3. toma la plantilla estática /vista-previa/blog/ (mismo layout y componente que
 *      /blog/[slug]/) y sustituye los marcadores __MZPV_*__ con los datos del artículo.
 *
 * Variables de entorno (Cloudflare Pages → grupomizar → Configuración → Variables y secretos):
 *   PREVIEW_SECRET          secreto compartido con Strapi (mismo valor en los dos lados)
 *   STRAPI_URL              https://cms.grupomizar.com.co
 *   STRAPI_PREVIEW_TOKEN    token de API de Strapi de solo lectura
 *   PREVIEW_FRAME_ANCESTORS opcional; orígenes que pueden mostrarla en un iframe
 *                           (por defecto https://cms.grupomizar.com.co)
 * Si falta alguna obligatoria responde 503 y no expone nada.
 */
import { toArticleView, type Post } from '../../src/lib/article';
import { verifyPreviewToken, type PreviewStatus } from '../../src/lib/previewToken';

interface Env {
  ASSETS: { fetch(input: Request | URL | string, init?: RequestInit): Promise<Response> };
  PREVIEW_SECRET?: string;
  STRAPI_URL?: string;
  STRAPI_PREVIEW_TOKEN?: string;
  PREVIEW_FRAME_ANCESTORS?: string;
}

interface Context {
  request: Request;
  env: Env;
}

const SHELL_PATH = '/vista-previa/blog/';
const DEFAULT_FRAME_ANCESTORS = 'https://cms.grupomizar.com.co';
const ORIGIN_RE = /^https?:[/][/][a-z0-9.-]+(:[0-9]{1,5})?$/i;

/** Mismo escape que usa Astro al pintar texto y atributos. */
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
}

function frameAncestors(env: Env): string {
  const list = (env.PREVIEW_FRAME_ANCESTORS ?? DEFAULT_FRAME_ANCESTORS)
    .split(/[\s,]+/)
    .filter((o) => ORIGIN_RE.test(o));
  return list.length ? list.join(' ') : "'none'";
}

function securityHeaders(env: Env): Record<string, string> {
  return {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'private, no-store',
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
    'Content-Security-Policy': `frame-ancestors ${frameAncestors(env)}`,
  };
}

function message(env: Env, status: number, title: string, text: string, extra: Record<string, string> = {}) {
  const html =
    '<!doctype html><html lang="es"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<meta name="robots" content="noindex, nofollow">' +
    `<title>${esc(title)} · Vista previa</title></head>` +
    '<body style="font-family:system-ui,sans-serif;max-width:36rem;margin:3rem auto;padding:0 1.25rem;color:#1f1a24">' +
    `<h1 style="font-size:1.25rem">${esc(title)}</h1><p style="line-height:1.5">${esc(text)}</p></body></html>`;
  return new Response(html, { status, headers: { ...securityHeaders(env), ...extra } });
}

function fillShell(shell: string, post: Post, status: PreviewStatus, strapiUrl: string): string {
  const view = toArticleView(post, strapiUrl);
  const values: Record<string, string> = {
    TITLE: esc(view.title ?? ''),
    DESCRIPTION: esc(view.description ?? ''),
    EYEBROW: esc(view.eyebrow),
    META: esc(view.meta),
    HERO: esc(view.heroUrl ?? ''),
    HEROALT: esc(view.heroAlt ?? ''),
    SLUG: esc(post.slug ?? ''),
    STATUS: status === 'draft' ? 'Borrador (sin publicar)' : 'Versión publicada',
    CONTENT: view.contentHtml,
  };
  let html = shell;
  // Sin imagen principal: quitar la etiqueta, igual que hace /blog/[slug]/.
  if (!view.heroUrl) html = html.replace(/<img\b[^>]*\bsrc="__MZPV_HERO__"[^>]*>/g, '');
  // Una sola pasada: lo insertado (p. ej. el cuerpo del artículo) no se vuelve a examinar.
  return html.replace(/__MZPV_([A-Z]+)__/g, (m, key: string) => values[key] ?? m);
}

export async function onRequest({ request, env }: Context): Promise<Response> {
  const url = new URL(request.url);

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return message(env, 405, 'Método no permitido', 'Solo se admite GET.', { Allow: 'GET, HEAD' });
  }
  if (url.pathname !== SHELL_PATH && url.pathname !== '/vista-previa/blog') {
    return message(env, 404, 'Página no encontrada', 'Esta dirección no existe.');
  }

  const secret = env.PREVIEW_SECRET?.trim();
  const strapiUrl = env.STRAPI_URL?.trim().replace(/[/]+$/, '');
  const token = env.STRAPI_PREVIEW_TOKEN?.trim();
  if (!secret || !strapiUrl || !token) {
    return message(env, 503, 'Vista previa no configurada', 'Faltan variables de entorno en Cloudflare Pages.');
  }

  const q = url.searchParams;
  const check = await verifyPreviewToken(secret, {
    id: q.get('id'),
    status: q.get('status'),
    exp: q.get('exp'),
    sig: q.get('sig'),
  });
  if (!check.ok) {
    return check.reason === 'expired'
      ? message(env, 401, 'El enlace de vista previa venció', 'Cierra la vista previa en el CMS y ábrela de nuevo para generar un enlace nuevo.')
      : message(env, 401, 'Enlace no válido', 'Abre la vista previa desde el botón Previsualización del CMS.');
  }

  let res: Response;
  try {
    res = await fetch(
      `${strapiUrl}/api/posts/${encodeURIComponent(check.id)}?status=${check.status}&populate=hero_image`,
      { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } },
    );
  } catch {
    return message(env, 502, 'El CMS no responde', 'No se pudo consultar el artículo. Intenta de nuevo en un momento.');
  }
  if (res.status === 404) {
    const why = check.status === 'published'
      ? 'Este artículo aún no tiene una versión publicada.'
      : 'El artículo no existe o se borró.';
    return message(env, 404, 'Artículo no encontrado', why);
  }
  if (!res.ok) {
    return message(env, 502, 'El CMS no respondió bien', `Código ${res.status}. Revisa el token de solo lectura (STRAPI_PREVIEW_TOKEN).`);
  }
  const body = (await res.json().catch(() => null)) as { data?: Post } | null;
  if (!body?.data) return message(env, 404, 'Artículo no encontrado', 'El CMS no devolvió el artículo.');

  const shell = await env.ASSETS.fetch(new URL(SHELL_PATH, url.origin));
  if (!shell.ok) {
    return message(env, 500, 'Falta la plantilla de vista previa', 'El sitio publicado no incluye /vista-previa/blog/.');
  }

  const html = fillShell(await shell.text(), body.data, check.status, strapiUrl);
  return new Response(request.method === 'HEAD' ? null : html, { status: 200, headers: securityHeaders(env) });
}
