import fs from 'node:fs';
import type { Core } from '@strapi/strapi';

// Varios cambios seguidos en el blog = un solo deploy: se espera 90 s desde el último cambio.
let rebuildTimer: NodeJS.Timeout | undefined;

function readGithubToken(): string | undefined {
  const file = process.env.GITHUB_TOKEN_FILE ?? '/run/secrets/github_token';
  try {
    const fromFile = fs.readFileSync(file, 'utf8').trim();
    if (fromFile) return fromFile;
  } catch {
    // sin archivo de secreto: se usa la variable de entorno
  }
  return process.env.GITHUB_TOKEN?.trim() || undefined;
}

async function triggerGithubRebuild() {
  const token = readGithubToken();
  const repo = process.env.GITHUB_REPO ?? 'Samuelbf2001/wEBMIZAR';
  if (!token) {
    console.warn('[rebuild] Sin token de GitHub: no se avisa para publicar el sitio');
    return;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'mizar-strapi',
      },
      body: JSON.stringify({ event_type: 'strapi-publish' }),
    });
    if (res.status !== 204) {
      console.error('[rebuild]', res.status, await res.text());
    } else {
      console.log('[rebuild] GitHub avisado');
    }
  } catch (e) {
    console.error('[rebuild] Error triggering GitHub rebuild:', e);
  }
}

const REBUILD_ACTIONS = ['publish', 'unpublish', 'delete'];

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.documents.use(async (context, next) => {
      const result = await next();
      if (context.uid === 'api::post.post' && REBUILD_ACTIONS.includes(context.action)) {
        if (rebuildTimer) clearTimeout(rebuildTimer);
        rebuildTimer = setTimeout(triggerGithubRebuild, 90_000);
      }
      return result;
    });
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Lectura pública del blog: solo find y findOne de posts, de forma idempotente.
    const publicRole = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });
    if (!publicRole) return;

    for (const action of ['api::post.post.find', 'api::post.post.findOne']) {
      const existing = await strapi.db
        .query('plugin::users-permissions.permission')
        .findOne({ where: { action, role: publicRole.id } });
      if (!existing) {
        await strapi.db
          .query('plugin::users-permissions.permission')
          .create({ data: { action, role: publicRole.id } });
      }
    }
  },
};
