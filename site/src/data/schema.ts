export const SITE_URL = 'https://grupomizar.com.co';

export const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': `${SITE_URL}/#organizacion`,
  name: 'Grupo Mizar',
  legalName: 'MIZAR Diseño y Construcción S.A.S.',
  alternateName: ['Mizar Diseño y Construcción', 'Mizar Constructora', 'Grupo Mizar Santander', 'Mi Lote Cúcuta'],
  // Separa la marca de otros proyectos inmobiliarios que se llaman "Mizar" en otras ciudades.
  disambiguatingDescription:
    'Constructora santandereana con sede en Bucaramanga (barrio Provenza). Desarrolla proyectos en Girón, Piedecuesta, Charta, Mesa de los Santos y San Cayetano (Cúcuta).',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo-mizar.webp`,
  image: `${SITE_URL}/og-default.jpg`,
  description:
    'Constructora e inmobiliaria con más de 20 años en Colombia. Apartamentos, parcelas campestres y lotes urbanos a cuotas, sin bancos.',
  telephone: '+573112658552',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle 105A #23a-18, Provenza',
    addressLocality: 'Bucaramanga',
    addressRegion: 'Santander',
    addressCountry: 'CO',
  },
  areaServed: [
    { '@type': 'City', name: 'Bucaramanga' },
    { '@type': 'City', name: 'Girón' },
    { '@type': 'City', name: 'Piedecuesta' },
    { '@type': 'City', name: 'Cúcuta' },
    { '@type': 'AdministrativeArea', name: 'Santander' },
    { '@type': 'AdministrativeArea', name: 'Norte de Santander' },
  ],
  knowsAbout: [
    'Apartamentos sobre planos en Girón y Piedecuesta',
    'Parcelas campestres en Santander',
    'Lotes en Cúcuta',
    'Compra de vivienda a cuotas sin banco',
    'Inversión inmobiliaria en Colombia desde el exterior',
  ],
  sameAs: [
    'https://www.instagram.com/mizar.col/',
    'https://www.tiktok.com/@mizar.col',
    'https://www.facebook.com/mizar.arq',
    'https://www.instagram.com/milote.cucuta/',
    'https://www.tiktok.com/@milote.cucuta',
    'https://www.facebook.com/p/Milotecucuta-61575954394010/',
  ],
};

/** BreadcrumbList a partir de pares [nombre, ruta]; el Inicio va implícito. */
export function breadcrumbSchema(items: [name: string, path: string][]) {
  const all: [string, string][] = [['Inicio', '/'], ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: new URL(path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`, SITE_URL).href,
    })),
  };
}

/** FAQPage a partir de preguntas y respuestas en texto plano. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '').trim() },
    })),
  };
}

/** Unidad que se vende en un proyecto (apartamento o lote), con las medidas que muestra la página. */
type Unidad =
  | { tipo: 'apartamento'; nombre: string; alcobas: number; banos: number; areaM2: [min: number, max?: number] }
  | { tipo: 'lote'; nombre: string; medidas?: string; areaDesdeM2?: number };

/**
 * Ficha de un proyecto (RealEstateListing). Regla de Google: solo datos que el visitante ve en
 * la página; si un dato no está a la vista (precio total, área), no va aquí.
 */
export function proyectoSchema(f: {
  path: string;
  nombre: string;
  descripcion: string;
  municipio: string;
  departamento: string;
  imagen?: string;
  geo?: [lat: number, lng: number];
  mapa?: string;
  precioDesde?: number;
  unidad: Unidad;
}) {
  const org = { '@id': `${SITE_URL}/#organizacion` };
  const url = new URL(f.path, SITE_URL).href;
  const u = f.unidad;
  const medidasLote =
    u.tipo === 'lote'
      ? [
          ...(u.medidas ? [{ '@type': 'PropertyValue', name: 'Medidas del lote', value: u.medidas }] : []),
          ...(u.areaDesdeM2
            ? [{ '@type': 'PropertyValue', name: 'Área desde', minValue: u.areaDesdeM2, unitCode: 'MTK', unitText: 'm²' }]
            : []),
        ]
      : [];
  const mainEntity =
    u.tipo === 'apartamento'
      ? {
          '@type': 'Apartment',
          name: u.nombre,
          numberOfRooms: u.alcobas,
          numberOfBathroomsTotal: u.banos,
          floorSize: {
            '@type': 'QuantitativeValue',
            unitCode: 'MTK',
            ...(u.areaM2[1] ? { minValue: u.areaM2[0], maxValue: u.areaM2[1] } : { value: u.areaM2[0] }),
          },
        }
      : {
          '@type': 'Place',
          name: u.nombre,
          ...(medidasLote.length && { additionalProperty: medidasLote }),
        };
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': `${url}#ficha`,
    name: f.nombre,
    description: f.descripcion,
    url,
    inLanguage: 'es-CO',
    ...(f.imagen && { image: new URL(f.imagen, SITE_URL).href }),
    provider: org,
    contentLocation: {
      '@type': 'Place',
      name: `${f.municipio}, ${f.departamento}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: f.municipio,
        addressRegion: f.departamento,
        addressCountry: 'CO',
      },
      ...(f.geo && { geo: { '@type': 'GeoCoordinates', latitude: f.geo[0], longitude: f.geo[1] } }),
      ...(f.mapa && { hasMap: f.mapa }),
    },
    mainEntity,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: org,
      ...(f.precioDesde && {
        priceSpecification: { '@type': 'PriceSpecification', minPrice: f.precioDesde, priceCurrency: 'COP' },
      }),
    },
  };
}
