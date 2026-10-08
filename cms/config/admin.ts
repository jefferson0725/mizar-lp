import crypto from 'node:crypto';
import fs from 'node:fs';
import type { Core } from '@strapi/strapi';

/**
 * Vista previa del blog (botón «Previsualización» en la edición de un artículo).
 *
 * Genera un enlace firmado y de corta duración a https://grupomizar.com.co/vista-previa/blog/,
 * donde una Cloudflare Pages Function comprueba la firma, pide el borrador a Strapi y lo pinta
 * con la misma plantilla que el blog publicado (site/functions/vista-previa/).
 * Firma: HMAC-SHA256(PREVIEW_SECRET, "v1:<documentId>:<status>:<exp>") en base64url
 * (mismo formato que site/src/lib/previewToken.ts).
 *
 * Secreto: archivo /run/secrets/preview_secret (o la ruta de PREVIEW_SECRET_FILE), igual que el
 * token de GitHub; si no existe, variable PREVIEW_SECRET. Mismo valor que en Cloudflare Pages.
 * Si falta o mide menos de 32 caracteres, la vista previa se desactiva.
 * PREVIEW_SITE_URL: opcional, por defecto https://grupomizar.com.co.
 * (En EasyPanel las variables de entorno viajan como --build-arg y se ven en «ps»: mejor archivo.)
 */
const PREVIEW_TTL_SECONDS = 2 * 60 * 60; // el enlace vale 2 h; al reabrir la vista previa se genera otro

function readPreviewSecret(env: Core.Config.Shared.ConfigParams['env']): string {
  const file = env('PREVIEW_SECRET_FILE', '/run/secrets/preview_secret');
  try {
    const fromFile = fs.readFileSync(file, 'utf8').trim();
    if (fromFile) return fromFile;
  } catch {
    // sin archivo de secreto: se usa la variable de entorno
  }
  return env('PREVIEW_SECRET', '').trim();
}

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => {
  const previewSecret = readPreviewSecret(env);
  const previewSite = new URL(env('PREVIEW_SITE_URL', 'https://grupomizar.com.co')).origin;

  return {
    auth: {
      secret: env('ADMIN_JWT_SECRET')!,
    },
    apiToken: {
      salt: env('API_TOKEN_SALT')!,
    },
    transfer: {
      token: {
        salt: env('TRANSFER_TOKEN_SALT')!,
      },
    },
    secrets: {
      encryptionKey: env('ENCRYPTION_KEY')!,
    },
    flags: {
      nps: env.bool('FLAG_NPS', true),
      promoteEE: env.bool('FLAG_PROMOTE_EE', true),
      docLinks: env.bool('FLAG_DOC_LINKS', true),
    },
    preview: {
      enabled: previewSecret.length >= 32,
      config: {
        // Strapi copia esta lista a la CSP frame-src del panel (y la reemplaza): se conserva 'self',
        // que antes valía por default-src, y se añade el sitio para poder mostrarlo en el iframe.
        allowedOrigins: ["'self'", previewSite],
        async handler(uid, { documentId, status }) {
          if (uid !== 'api::post.post' || !documentId) return null;
          const st = status === 'published' ? 'published' : 'draft';
          const exp = Math.floor(Date.now() / 1000) + PREVIEW_TTL_SECONDS;
          const sig = crypto
            .createHmac('sha256', previewSecret)
            .update(`v1:${documentId}:${st}:${exp}`)
            .digest('base64url');
          const qs = new URLSearchParams({ id: documentId, status: st, exp: String(exp), sig });
          return `${previewSite}/vista-previa/blog/?${qs}`;
        },
      },
    },
  };
};

export default config;
