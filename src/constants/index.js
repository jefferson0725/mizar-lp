import {
  planoTipo1,
  tipo1Acabados1,
  tipo1Acabados2,
  tipo1Acabados3,
  tipo1Acabados4,
  tipo1Acabados5,
  obraGris1,
  obraGris2,
  obraGris3,
  obraGris4,
  obraGris5,
  tipo2Acabados1,
  tipo2Acabados2,
  tipo2Acabados3,
  tipo2Acabados4,
  tipo2Acabados5,
  obraGris6,
  obraGris7,
  obraGris8,
  obraGris9,
  obraGris10,
} from "../assets";

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
    acabados: [
      {
        src: planoTipo1,
        alt: "Plano del apartamento Tipo 1 — 48,24 m², 3 alcobas y 1 baño",
        tipo: "plano",
      },
      {
        src: tipo1Acabados1,
        alt: "Acabados Tipo 1 - imagen 1",
        tipo: "render",
      },
      {
        src: tipo1Acabados2,
        alt: "Acabados Tipo 1 - imagen 2",
        tipo: "render",
      },
      {
        src: tipo1Acabados3,
        alt: "Acabados Tipo 1 - imagen 3",
        tipo: "render",
      },
      {
        src: tipo1Acabados4,
        alt: "Acabados Tipo 1 - imagen 4",
        tipo: "render",
      },
      {
        src: tipo1Acabados5,
        alt: "Acabados Tipo 1 - imagen 5",
        tipo: "render",
      },
    ],
    obraGris: [
      {
        src: planoTipo1,
        alt: "Plano del apartamento Tipo 1 — 48,24 m², 3 alcobas y 1 baño",
        tipo: "plano",
      },
      { src: obraGris1, alt: "Obra gris Tipo 1 - imagen 1", tipo: "render" },
      { src: obraGris2, alt: "Obra gris Tipo 1 - imagen 2", tipo: "render" },
      { src: obraGris3, alt: "Obra gris Tipo 1 - imagen 3", tipo: "render" },
      { src: obraGris4, alt: "Obra gris Tipo 1 - imagen 4", tipo: "render" },
      { src: obraGris5, alt: "Obra gris Tipo 1 - imagen 5", tipo: "render" },
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
    acabados: [
      {
        src: "/assets/plano-tipo2-56m.webp",
        alt: "Plano del apartamento Tipo 2 — 56,10 m², 3 alcobas, 1 baño y patio",
        tipo: "plano",
      },
      {
        src: tipo2Acabados1,
        alt: "Acabados Tipo 2 - imagen 1",
        tipo: "render",
      },
      {
        src: tipo2Acabados2,
        alt: "Acabados Tipo 2 - imagen 2",
        tipo: "render",
      },
      {
        src: tipo2Acabados3,
        alt: "Acabados Tipo 2 - imagen 3",
        tipo: "render",
      },
      {
        src: tipo2Acabados4,
        alt: "Acabados Tipo 2 - imagen 4",
        tipo: "render",
      },
      {
        src: tipo2Acabados5,
        alt: "Acabados Tipo 2 - imagen 5",
        tipo: "render",
      },
    ],
    obraGris: [
      {
        src: "/assets/plano-tipo2-56m.webp",
        alt: "Plano del apartamento Tipo 2 — 56,10 m², 3 alcobas, 1 baño y patio",
        tipo: "plano",
      },
      {
        src: obraGris6,
        alt: "Render de la fachada de Laureles Campestre",
        tipo: "render",
      },
      {
        src: obraGris7,
        alt: "Vista panorámica del proyecto Laureles Campestre",
        tipo: "render",
      },
      {
        src: obraGris8,
        alt: "Render del área social de Laureles Campestre",
        tipo: "render",
      },
      {
        src: obraGris9,
        alt: "Render del área social de Laureles Campestre",
        tipo: "render",
      },
      {
        src: obraGris10,
        alt: "Render del área social de Laureles Campestre",
        tipo: "render",
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
