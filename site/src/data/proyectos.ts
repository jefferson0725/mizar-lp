/**
 * Fuente única de datos de proyectos.
 * La usan: Home (miniaturas + selector), /proyectos y las landings SEO.
 */
export type TipoProyecto = 'apartamento' | 'parcela' | 'lote';
export type Proposito = 'inversion' | 'vivienda';

export interface Proyecto {
  slug: string;
  nombre: string;
  tipo: TipoProyecto;
  ubicacion: string;
  ciudad: string;
  estado: 'sobre-planos' | 'en-obra' | 'terminado' | 'disponible';
  propositos: Proposito[];
  resumen: string;
  /** nombre de archivo en src/assets/proyectos/ (sin ruta), o null si aún no hay imagen */
  imagen: string | null;
  /** URL externa de landing dedicada si existe */
  lpUrl: string | null;
  destacado: boolean;
}

export const PROYECTOS_CON_LANDING_PROPIA = new Set([
  'lotes-cucuta',
]);

export function getProyectoHref(proyecto: Pick<Proyecto, 'slug' | 'lpUrl'>) {
  if (PROYECTOS_CON_LANDING_PROPIA.has(proyecto.slug)) return `/${proyecto.slug}`;
  return proyecto.lpUrl ?? `/proyectos/${proyecto.slug}`;
}

export const proyectos: Proyecto[] = [
  {
    slug: 'apartamentos-giron',
    nombre: 'Laureles Campestre — Girón',
    tipo: 'apartamento',
    ubicacion: 'Girón, Santander',
    ciudad: 'Girón',
    estado: 'sobre-planos',
    propositos: ['vivienda', 'inversion'],
    resumen:
      'Apartamentos sobre planos a 150 m del futuro anillo vial, en la zona de mayor crecimiento de Girón. A cuotas y sin bancos.',
    imagen: 'giron.png',
    lpUrl: '/laureles-campestre',
    destacado: true,
  },
  {
    slug: 'apartamentos-piedecuesta',
    nombre: 'Terrazas de la Cantera — Piedecuesta',
    tipo: 'apartamento',
    ubicacion: 'Piedecuesta, Santander',
    ciudad: 'Piedecuesta',
    estado: 'sobre-planos',
    propositos: ['vivienda', 'inversion'],
    resumen:
      'Apartamentos sobre planos en el centro de Piedecuesta con financiación directa: cuotas fijas, sin intereses bancarios ni intermediarios.',
    imagen: 'piedecuesta.png',
    lpUrl: '/terrazas',
    destacado: true,
  },
  {
    slug: 'parcelas-charta',
    nombre: 'Parcelas campestres — Charta',
    tipo: 'parcela',
    ubicacion: 'Charta, Santander',
    ciudad: 'Charta',
    estado: 'disponible',
    propositos: ['inversion', 'vivienda'],
    resumen:
      'Parcelas campestres en Charta, Santander: naturaleza, clima de montaña y una inversión que se valoriza antes de que todos la vean.',
    imagen: null,
    lpUrl: null,
    destacado: true,
  },
  {
    slug: 'parcelas-mesa-de-los-santos',
    nombre: 'Parcelas — Mesa de los Santos',
    tipo: 'parcela',
    ubicacion: 'Mesa de los Santos, Santander',
    ciudad: 'Mesa de los Santos',
    estado: 'disponible',
    propositos: ['inversion', 'vivienda'],
    resumen:
      'Parcelas en la Mesa de los Santos, el destino campestre que los colombianos dentro y fuera del país están descubriendo.',
    imagen: null,
    lpUrl: null,
    destacado: true,
  },
  {
    slug: 'lotes-cucuta',
    nombre: 'Mi Lote — Lotes urbanos en Cúcuta',
    tipo: 'lote',
    ubicacion: 'San Cayetano, Cúcuta',
    ciudad: 'Cúcuta',
    estado: 'disponible',
    propositos: ['inversion'],
    resumen:
      'La urbanización más grande de San Cayetano: lotes de 7x10 y 7x16 con escritura independiente, a 100 m de la futura Universidad Simón Bolívar.',
    imagen: 'lotes-cucuta.png',
    lpUrl: null,
    destacado: true,
  },
];

export const WHATSAPP_GENERAL = '573112382253'; // TODO: confirmar número general de Mizar (este es el de Mi Lote)
export const WHATSAPP_MILOTE = '573112382253';
