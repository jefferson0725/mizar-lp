// ===================================================================
//  TERRAZAS DE LA CANTERA · Mizar
// ===================================================================

export const WHATSAPP_NUMBER = "573112658552"; // TODO: confirmar número
export const WHATSAPP_MESSAGE =
  "Me%20interesan%20los%20apartamentos%20de%20Terrazas%20de%20La%20Cantera%2C%20mi%20nombre%20es%20";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
export const INSTAGRAM_URL =
  "https://www.instagram.com/mizar.col/?utm_source=ig_embed&ig_rid=eabde098-a6fb-4cce-8c10-5502c784701b";

export const MAPS_URL =
  "https://www.google.com/maps/place/Terrazas+de+la+Cantera/data=!4m2!3m1!1s0x0:0x3cf669ce4908575f?sa=X&ved=1t:2428&ictx=111";
export const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Terrazas+de+la+Cantera+Piedecuesta&z=16&output=embed";

const galeriaInteriores = [
  {
    src: "/assets/renders/galeria-01.webp",
    alt: "Sala con vista al Cerro de La Cantera",
    tipo: "render",
  },
  {
    src: "/assets/renders/galeria-02.webp",
    alt: "Interior apartamento Terrazas de la Cantera",
    tipo: "render",
  },
  {
    src: "/assets/renders/galeria-03.webp",
    alt: "Interior apartamento Terrazas de la Cantera",
    tipo: "render",
  },
  {
    src: "/assets/renders/galeria-04.webp",
    alt: "Interior apartamento Terrazas de la Cantera",
    tipo: "render",
  },
  {
    src: "/assets/renders/galeria-05.webp",
    alt: "Cocina integral — Terrazas de la Cantera",
    tipo: "render",
  },
  {
    src: "/assets/renders/galeria-06.webp",
    alt: "Interior apartamento Terrazas de la Cantera",
    tipo: "render",
  },
  {
    src: "/assets/renders/galeria-07.webp",
    alt: "Interior apartamento Terrazas de la Cantera",
    tipo: "render",
  },
  {
    src: "/assets/renders/galeria-08.webp",
    alt: "Interior apartamento Terrazas de la Cantera",
    tipo: "render",
  },
  {
    src: "/assets/renders/galeria-09.webp",
    alt: "Interior apartamento Terrazas de la Cantera",
    tipo: "render",
  },
  {
    src: "/assets/renders/galeria-10.webp",
    alt: "Interior apartamento Terrazas de la Cantera",
    tipo: "render",
  },
  {
    src: "/assets/renders/galeria-11.webp",
    alt: "Interior apartamento Terrazas de la Cantera",
    tipo: "render",
  },
  {
    src: "/assets/renders/galeria-12.webp",
    alt: "Interior apartamento Terrazas de la Cantera",
    tipo: "render",
  },
];

export const APARTAMENTOS = [
  {
    id: 1,
    tipo: "Apartamentos",
    area: "62,87 m²",
    habitaciones: 3,
    banos: 2,
    extra: "Vista hacia la iglesia",
    nota: null,
    imagenes: [
      {
        src: "/assets/planos/Tipo-1.webp",
        alt: "Plano Tipo 1 — 62,87 m², 3 alcobas y 2 baños",
        tipo: "plano",
        tipoApto: "Tipo 1",
        area: "62,87 m²",
        habitaciones: 3,
        banos: 2,
        extra: "Vista hacia la iglesia",
      },
      {
        src: "/assets/planos/tipo-2.webp",
        alt: "Plano Tipo 2 — 62,87 m², 3 alcobas y 2 baños",
        tipo: "plano",
        tipoApto: "Tipo 2",
        area: "62,87 m²",
        habitaciones: 3,
        banos: 2,
        extra: "Vista hacia la iglesia",
      },
      {
        src: "/assets/planos/tipo-3.webp",
        alt: "Plano Tipo 3 — 60,09 m², 3 alcobas y 2 baños",
        tipo: "plano",
        tipoApto: "Tipo 3",
        area: "60,09 m²",
        habitaciones: 3,
        banos: 2,
        extra: "Vista hacia la iglesia",
      },
      {
        src: "/assets/planos/Tipo-5.webp",
        alt: "Plano Tipo 5 — 58,40 m², 3 alcobas y 2 baños",
        tipo: "plano",
        tipoApto: "Tipo 5",
        area: "58,40 m²",
        habitaciones: 3,
        banos: 2,
        extra: "Vista hacia la iglesia",
      },
      {
        src: "/assets/planos/tipo-8.webp",
        alt: "Plano Tipo 8 — 35,64 m², 1 alcoba y 1 baño",
        tipo: "plano",
        tipoApto: "Tipo 8",
        area: "35,64 m²",
        habitaciones: 1,
        banos: 1,
        extra: "Vista hacia el cerro",
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
