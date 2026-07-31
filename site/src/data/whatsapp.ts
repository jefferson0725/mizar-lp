/**
 * Configuración de WhatsApp por vista.
 * Edita aquí el teléfono, el mensaje y el nombre de la página de cada ruta.
 *
 * - `phone`   : número en formato internacional sin + (ej. 573112382253)
 * - `page`    : nombre legible de la página/proyecto de origen. Se antepone
 *               automáticamente al mensaje para que el equipo comercial sepa
 *               desde qué página del sitio escribe la persona.
 * - `message` : cuerpo del mensaje pre-llenado (sin la línea de origen).
 */

export interface WhatsAppConfig {
  phone: string;
  page: string;
  message: string;
}

/** Teléfonos disponibles */
const PHONES = {
  general: "573112382253",
  laureles: "573112658552",
  terrazas: "573112658552",
  milote: "573112382253",
  mirador: "573102941376",
} as const;

/** Configuración por ruta — la clave es el pathname exacto o un prefijo */
const CONFIG: Record<string, WhatsAppConfig> = {
  "/": {
    phone: PHONES.general,
    page: "Inicio",
    message: "quiero información sobre sus proyectos.",
  },
  "/nosotros": {
    phone: PHONES.general,
    page: "Nosotros",
    message: "quiero conocer más sobre la empresa y sus proyectos.",
  },
  "/proyectos": {
    phone: PHONES.general,
    page: "Proyectos",
    message: "quiero información sobre los proyectos disponibles.",
  },
  "/contacto": {
    phone: PHONES.general,
    page: "Contacto",
    message: "quiero ponerme en contacto con ustedes.",
  },
  "/blog": {
    phone: PHONES.general,
    page: "Blog",
    message: "tengo una consulta sobre propiedades, mi nombre es",
  },
  "/lotes-cucuta": {
    phone: PHONES.milote,
    page: "Mi Lote — Cúcuta",
    message: "me interesan los lotes urbanos de Mi Lote en Cúcuta, mi nombre es",
  },
  "/laureles-campestre": {
    phone: PHONES.laureles,
    page: "Laureles Campestre — Girón",
    message:
      "me interesan los apartamentos de Laureles Campestre en Girón, mi nombre es",
  },
  "/terrazas": {
    phone: PHONES.terrazas,
    page: "Terrazas de la Cantera — Piedecuesta",
    message:
      "me interesan los apartamentos de Terrazas de la Cantera en Piedecuesta, mi nombre es",
  },
  "/parcelas-campestres-santander": {
    phone: PHONES.general,
    page: "Parcelas campestres — Santander",
    message: "me interesan las parcelas campestres en Santander, mi nombre es",
  },
  "/inversion-inmobiliaria-colombia-exterior": {
    phone: PHONES.general,
    page: "Inversión desde el exterior",
    message:
      "vivo en el exterior y quiero invertir en Colombia con Grupo Mizar, mi nombre es",
  },
  "/mirador-de-la-montana": {
    phone: PHONES.mirador,
    page: "Mirador de la Montaña — Mesa de los Santos",
    message:
      "me interesan los lotes campestres de Mirador de la Montaña en Mesa de los Santos, mi nombre es",
  },
};

/** Fallback para páginas no listadas (ej. /proyectos/[slug], /blog/[slug]) */
const FALLBACK: WhatsAppConfig = {
  phone: PHONES.general,
  page: "Sitio web Grupo Mizar",
  message: "quiero más información.",
};

/**
 * Compone el texto final del mensaje anteponiendo la página de origen.
 * La referencia va al inicio para que el "mi nombre es" quede al final,
 * listo para que la persona escriba su nombre.
 */
export function buildWhatsAppMessage(cfg: WhatsAppConfig): string {
  return `Hola, escribo desde la página "${cfg.page}" del sitio de Grupo Mizar y ${cfg.message}`;
}

/**
 * Devuelve la configuración de WhatsApp para un pathname dado, con el
 * `message` ya compuesto (incluye la página de origen).
 * Busca coincidencia exacta primero; si no, el prefijo más largo.
 */
export function getWhatsAppConfig(pathname: string): WhatsAppConfig {
  const base = resolveConfig(pathname);
  return { ...base, message: buildWhatsAppMessage(base) };
}

function resolveConfig(pathname: string): WhatsAppConfig {
  if (CONFIG[pathname]) return CONFIG[pathname];

  // Prefijo más largo (ej. /proyectos/laureles → /proyectos)
  const prefix = Object.keys(CONFIG)
    .filter((k) => k !== "/" && pathname.startsWith(k))
    .sort((a, b) => b.length - a.length)[0];

  return prefix ? CONFIG[prefix] : FALLBACK;
}
