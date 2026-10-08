/**
 * Firma de los enlaces de vista previa del blog.
 *
 * Strapi (cms/config/admin.ts, botón «Previsualización») genera:
 *   /vista-previa/blog/?id=<documentId>&status=<draft|published>&exp=<unix s>&sig=<firma>
 * con firma = HMAC-SHA256(PREVIEW_SECRET, "v1:<id>:<status>:<exp>") en base64url (sin "=").
 * La Cloudflare Pages Function la comprueba aquí antes de pedir nada a Strapi.
 * Solo WebCrypto: funciona en Cloudflare y en Node >= 20.
 */

export type PreviewStatus = 'draft' | 'published';

/** Tope de validez aunque Strapi firme con más plazo (defensa ante un error de configuración). */
export const PREVIEW_MAX_TTL_SECONDS = 24 * 60 * 60;

export const previewPayload = (id: string, status: PreviewStatus, exp: number) =>
  `v1:${id}:${status}:${exp}`;

export type PreviewCheck =
  | { ok: true; id: string; status: PreviewStatus; exp: number }
  | { ok: false; reason: 'invalid' | 'expired' };

const ID_RE = /^[a-z0-9]{1,64}$/; // documentId de Strapi 5 (cuid2)
const EXP_RE = /^[0-9]{1,12}$/;
const SIG_RE = /^[A-Za-z0-9_-]{43}$/; // 32 bytes en base64url sin relleno

const enc = new TextEncoder();

function base64UrlToBytes(s: string): Uint8Array {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (s.length % 4)) % 4);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function hmacKey(secret: string, usage: 'sign' | 'verify') {
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [usage]);
}

/** Solo para pruebas locales: en producción firma Strapi. */
export async function signPreview(secret: string, id: string, status: PreviewStatus, exp: number) {
  const key = await hmacKey(secret, 'sign');
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(previewPayload(id, status, exp)));
  return bytesToBase64Url(new Uint8Array(sig));
}

/**
 * Comprueba la firma (crypto.subtle.verify compara en tiempo constante) y luego la caducidad.
 * No distingue entre «firma mala» y «parámetros mal formados»: ambos son 'invalid'.
 */
export async function verifyPreviewToken(
  secret: string,
  params: { id: string | null; status: string | null; exp: string | null; sig: string | null },
  nowSeconds = Math.floor(Date.now() / 1000),
): Promise<PreviewCheck> {
  const { id, status, exp, sig } = params;
  if (!secret || !id || !exp || !sig) return { ok: false, reason: 'invalid' };
  if (status !== 'draft' && status !== 'published') return { ok: false, reason: 'invalid' };
  if (!ID_RE.test(id) || !EXP_RE.test(exp) || !SIG_RE.test(sig)) return { ok: false, reason: 'invalid' };

  const expNum = Number(exp);
  const key = await hmacKey(secret, 'verify');
  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    base64UrlToBytes(sig),
    enc.encode(previewPayload(id, status, expNum)),
  );
  if (!valid) return { ok: false, reason: 'invalid' };
  if (expNum > nowSeconds + PREVIEW_MAX_TTL_SECONDS) return { ok: false, reason: 'invalid' };
  if (expNum < nowSeconds) return { ok: false, reason: 'expired' };
  return { ok: true, id, status, exp: expNum };
}
