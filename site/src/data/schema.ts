export const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Grupo Mizar',
  alternateName: 'Mizar Diseño y Construcción',
  url: 'https://mizar.com.co',
  logo: 'https://mizar.com.co/logo-mizar.webp',
  description:
    'Constructora e inmobiliaria con más de 20 años en Colombia. Apartamentos, parcelas campestres y lotes urbanos a cuotas, sin bancos.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle 105A #23a-18, Provenza',
    addressLocality: 'Bucaramanga',
    addressRegion: 'Santander',
    addressCountry: 'CO',
  },
  areaServed: ['Santander', 'Norte de Santander', 'Colombia'],
  sameAs: [
    'https://www.facebook.com/mizarconstructora',
    'https://www.instagram.com/mizarconstructora',
  ],
};
