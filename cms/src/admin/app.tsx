import type { StrapiApp } from '@strapi/strapi/admin';

// Valores por defecto del panel para el equipo de marketing: español y modo claro.
// Solo se aplican si la persona no ha elegido otra cosa en su perfil.
const DEFAULTS: Record<string, string> = {
  'strapi-admin-language': 'es',
  STRAPI_THEME: 'light',
};

export default {
  config: {
    locales: ['es'],
  },
  register() {
    try {
      for (const [key, value] of Object.entries(DEFAULTS)) {
        if (!window.localStorage.getItem(key)) window.localStorage.setItem(key, value);
      }
    } catch {
      // sin almacenamiento local: el panel usa sus valores por defecto
    }
  },
  bootstrap(app: StrapiApp) {},
};
