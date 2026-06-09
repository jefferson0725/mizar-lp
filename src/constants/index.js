// ===================================================================
//  TERRAZAS DE LA CANTERA · Mizar
//  Apartamentos VIS sobre planos en el centro de Piedecuesta.
//  Las imágenes viven en public/assets (servidas como /assets/*).
// ===================================================================

export const WHATSAPP_NUMBER = "573112658552"; // TODO: confirmar número del proyecto
export const WHATSAPP_MESSAGE =
  "Me%20interesan%20los%20apartamentos%20de%20Terrazas%20de%20La%20Cantera%2C%20mi%20nombre%20es%20";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

// Link a Google Maps del proyecto (del copy)
export const MAPS_URL =
  "https://www.google.com/maps/place/Terrazas+de+la+Cantera/data=!4m2!3m1!1s0x0:0x3cf669ce4908575f?sa=X&ved=1t:2428&ictx=111";
// Embed sin API key
export const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Terrazas+de+la+Cantera+Piedecuesta&z=16&output=embed";

// Carrusel del apartamento Tipo 1: plano + renders de interiores
const galeriaInteriores = [
  { src: "/assets/galeria-01.webp", alt: "Sala con ventanal y vista al Cerro de La Cantera", tipo: "render" },
  { src: "/assets/galeria-02.webp", alt: "Render interior del apartamento — Terrazas de la Cantera", tipo: "render" },
  { src: "/assets/galeria-03.webp", alt: "Render interior del apartamento — Terrazas de la Cantera", tipo: "render" },
  { src: "/assets/galeria-04.webp", alt: "Render interior del apartamento — Terrazas de la Cantera", tipo: "render" },
  { src: "/assets/galeria-05.webp", alt: "Cocina integral y comedor — Terrazas de la Cantera", tipo: "render" },
  { src: "/assets/galeria-06.webp", alt: "Render interior del apartamento — Terrazas de la Cantera", tipo: "render" },
  { src: "/assets/galeria-07.webp", alt: "Render interior del apartamento — Terrazas de la Cantera", tipo: "render" },
  { src: "/assets/galeria-08.webp", alt: "Render interior del apartamento — Terrazas de la Cantera", tipo: "render" },
  { src: "/assets/galeria-09.webp", alt: "Render interior del apartamento — Terrazas de la Cantera", tipo: "render" },
  { src: "/assets/galeria-10.webp", alt: "Render interior del apartamento — Terrazas de la Cantera", tipo: "render" },
  { src: "/assets/galeria-11.webp", alt: "Render interior del apartamento — Terrazas de la Cantera", tipo: "render" },
  { src: "/assets/galeria-12.webp", alt: "Render interior del apartamento — Terrazas de la Cantera", tipo: "render" },
];

export const APARTAMENTOS = [
  {
    id: 1,
    tipo: "Tipo 1",
    area: "60,47 m²",
    habitaciones: 3,
    banos: 2,
    extra: "Vista hacia el cerro",
    nota: null,
    imagenes: [
      {
        src: "/assets/plano-tipo1.webp",
        alt: "Plano del apartamento Tipo 1 — 60,47 m², 3 alcobas y 2 baños",
        tipo: "plano",
      },
      ...galeriaInteriores,
    ],
  },
];

export const FAQ_ITEMS = [
  {
    pregunta: "¿Puedo comprar desde Estados Unidos o Europa?",
    respuesta:
      "Sí. Todo el proceso se puede hacer a distancia. Te acompañamos en cada paso desde tu país.",
  },
  {
    pregunta: "¿Tengo que pasar por un banco?",
    respuesta:
      "No. El acuerdo es directo con Mizar, sin estudios de crédito bancario ni intermediarios.",
  },
  {
    pregunta: "¿Cuándo me entregan el apartamento?",
    respuesta: "La entrega está proyectada para diciembre de 2027.",
  },
  {
    pregunta: "¿El apartamento se entrega terminado?",
    respuesta:
      "Sí. Con acabados de carpintería, puertas, closets, cocina integral y extractor.",
  },
];
