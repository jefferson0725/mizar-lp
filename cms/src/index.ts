import type { Core } from '@strapi/strapi';

async function triggerGithubRebuild() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  if (!token || !repo) return;

  try {
    await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event_type: 'strapi-publish' }),
    });
  } catch (e) {
    console.error('[rebuild] Error triggering GitHub rebuild:', e);
  }
}

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.documents.use(async (context, next) => {
      const result = await next();
      if (context.uid === 'api::post.post' && context.action === 'publish') {
        triggerGithubRebuild();
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
