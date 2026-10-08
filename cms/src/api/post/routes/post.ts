import { factories } from '@strapi/strapi';
import type { Core } from '@strapi/strapi';

/**
 * Los borradores solo se leen con un token de API (la vista previa del sitio usa uno de solo
 * lectura). Sin esto, cualquiera podía pedir /api/posts?status=draft y leer artículos sin publicar,
 * porque el rol público tiene find/findOne para que el sitio compile el blog.
 */
const noPublicDrafts: Core.MiddlewareHandler = async (ctx, next) => {
  const status = ctx.query?.status;
  // 'content-api-token' en Strapi 5.x actual; 'api-token' en versiones anteriores.
  const strategy = ctx.state?.auth?.strategy?.name;
  const viaApiToken = strategy === 'content-api-token' || strategy === 'api-token';
  if (status !== undefined && status !== 'published' && !viaApiToken) {
    return ctx.forbidden('Los borradores requieren un token de API.');
  }
  return next();
};

export default factories.createCoreRouter('api::post.post', {
  config: {
    find: { middlewares: [noPublicDrafts] },
    findOne: { middlewares: [noPublicDrafts] },
  },
});
