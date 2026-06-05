// TODO: reemplazar con el número real de WhatsApp
export const WHATSAPP_NUMBER = "573XXXXXXXXX";
export const WHATSAPP_MESSAGE =
  "Me%20interesan%20los%20apartamentos%20de%20Laureles%20Campestre%2C%20mi%20nombre%20es%20";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export const APARTAMENTOS = [
  {
    id: 1,
    tipo: "Tipo 1",
    area: "48,24 m²",
    habitaciones: 3,
    banos: 1,
    piso: "Del segundo al quinto piso",
    nota: null,
    // TODO: reemplazar con imágenes reales del proyecto
    imagenes: [
      {
        src: "https://placehold.co/600x400/2D5016/F5F0E8?text=Plano+Tipo+1",
        alt: "Plano del apartamento Tipo 1",
      },
      {
        src: "https://placehold.co/600x400/C8933A/F5F0E8?text=Render+con+Acabados",
        alt: "Render Tipo 1 con acabados",
      },
      {
        src: "https://placehold.co/600x400/4a4a4a/F5F0E8?text=Render+Obra+Gris",
        alt: "Render Tipo 1 en obra gris",
      },
    ],
  },
  {
    id: 2,
    tipo: "Tipo 2",
    area: "56,10 m²",
    habitaciones: 3,
    banos: 1,
    piso: "Primer piso",
    nota: "Con posibilidad de ampliar a un segundo baño",
    // TODO: reemplazar con imágenes reales del proyecto
    imagenes: [
      {
        src: "https://placehold.co/600x400/2D5016/F5F0E8?text=Plano+Tipo+2",
        alt: "Plano del apartamento Tipo 2",
      },
      {
        src: "https://placehold.co/600x400/C8933A/F5F0E8?text=Render+con+Acabados",
        alt: "Render Tipo 2 con acabados",
      },
      {
        src: "https://placehold.co/600x400/4a4a4a/F5F0E8?text=Render+Obra+Gris",
        alt: "Render Tipo 2 en obra gris",
      },
    ],
  },
];

export const FAQ_ITEMS = [
  {
    pregunta: "¿Tengo que ir a un banco?",
    respuesta:
      "No. El acuerdo es directo con Mizar. Sin estudios de crédito bancario, sin intermediarios.",
  },
  {
    pregunta: "¿Qué pasa si estoy reportado?",
    respuesta:
      "No importa si estás reportado. No revisamos centrales de riesgo.",
  },
  {
    pregunta: "¿Cuándo me entregan el apartamento?",
    respuesta:
      "Las entregas están proyectadas para noviembre de 2027 y noviembre de 2028, según el plan que elijas.",
  },
  {
    pregunta: "¿Y si tengo un carro o moto?",
    respuesta: "Aceptamos permuta con vehículo como parte de tu pago.",
  },
];

// TODO: reemplazar con reseñas reales de Google Maps
export const RESENAS = [
  {
    nombre: "María G.",
    texto: "Reemplazar con reseña real de Google Maps",
    estrellas: 5,
  },
  {
    nombre: "Carlos R.",
    texto: "Reemplazar con reseña real de Google Maps",
    estrellas: 5,
  },
  {
    nombre: "Paola M.",
    texto: "Reemplazar con reseña real de Google Maps",
    estrellas: 5,
  },
];
