/**
 * Configuración de WhatsApp por vista.
 * Edita aquí el mensaje y teléfono que aparece en el botón flotante de cada página.
 *
 * - `phone`   : número en formato internacional sin + (ej. 573112382253)
 * - `message` : texto pre-llenado en WhatsApp
 */

export interface WhatsAppConfig {
  phone: string;
  message: string;
}

/** Teléfonos disponibles */
const PHONES = {
  general: "573112382253",
  laureles: "573112658552",
  terrazas: "573112658552",
  milote: "573112382253",
} as const;

/** Mensajes por ruta — la clave es el pathname exacto o un prefijo */
const CONFIG: Record<string, WhatsAppConfig> = {
  "/": {
    phone: PHONES.general,
    message:
      "Hola, vengo de la web de Grupo Mizar y quiero información sobre sus proyectos.",
  },
  "/nosotros": {
    phone: PHONES.general,
    message:
      "Hola, vi la página de Grupo Mizar y quiero conocer más sobre la empresa y sus proyectos.",
  },
  "/proyectos": {
    phone: PHONES.general,
    message:
      "Hola, vi el portafolio de Grupo Mizar y quiero información sobre los proyectos disponibles.",
  },
  "/contacto": {
    phone: PHONES.general,
    message:
      "Hola, vengo de la web de Grupo Mizar y quiero ponerme en contacto.",
  },
  "/blog": {
    phone: PHONES.general,
    message:
      "Hola, leí el blog de Grupo Mizar y tengo una consulta sobre propiedades.",
  },
  "/lotes-cucuta": {
    phone: PHONES.milote,
    message:
      "Hola, me interesan los lotes urbanos de Mi Lote en Cúcuta, mi nombre es",
  },
  "/laureles-campestre": {
    phone: PHONES.laureles,
    message:
      "Hola, me interesan los apartamentos de Laureles Campestre en Girón, mi nombre es",
  },
  "/terrazas": {
    phone: PHONES.terrazas,
    message:
      "Hola, me interesan los apartamentos de Terrazas de la Cantera en Piedecuesta, mi nombre es",
  },
  "/parcelas-campestres-santander": {
    phone: PHONES.general,
    message:
      "Hola, me interesan las parcelas campestres en Santander, mi nombre es",
  },
  "/inversion-inmobiliaria-colombia-exterior": {
    phone: PHONES.general,
    message:
      "Hola, vivo en el exterior y quiero invertir en Colombia con Grupo Mizar, mi nombre es",
  },
};

/** Fallback para páginas no listadas (ej. /proyectos/[slug], /blog/[slug]) */
const FALLBACK: WhatsAppConfig = {
  phone: PHONES.general,
  message: "Hola, vengo de la web de Grupo Mizar y quiero más información.",
};

/**
 * Devuelve la configuración de WhatsApp para un pathname dado.
 * Busca coincidencia exacta primero; si no, busca el prefijo más largo.
 */
export function getWhatsAppConfig(pathname: string): WhatsAppConfig {
  if (CONFIG[pathname]) return CONFIG[pathname];

  // Prefijo más largo (ej. /proyectos/laureles → /proyectos)
  const prefix = Object.keys(CONFIG)
    .filter((k) => k !== "/" && pathname.startsWith(k))
    .sort((a, b) => b.length - a.length)[0];

  return prefix ? CONFIG[prefix] : FALLBACK;
}
