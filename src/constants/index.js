// TODO: reemplazar con el número real de WhatsApp
export const WHATSAPP_NUMBER = "573XXXXXXXXX";
export const WHATSAPP_MESSAGE =
  "Me%20interesan%20los%20apartamentos%20de%20Laureles%20Campestre%2C%20mi%20nombre%20es%20";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
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
} from "../assets";

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
    acabados: [
      { src: planoTipo1, alt: "Plano Tipo 1" },
      { src: tipo1Acabados1, alt: "Acabados Tipo 1 - imagen 1" },
      {
        src: tipo1Acabados2,
        alt: "Acabados Tipo 1 - imagen 2",
      },
      {
        src: tipo1Acabados3,
        alt: "Acabados Tipo 1 - imagen 3",
      },
      {
        src: tipo1Acabados4,
        alt: "Acabados Tipo 1 - imagen 4",
      },
      {
        src: tipo1Acabados5,
        alt: "Acabados Tipo 1 - imagen 5",
      },
    ],
    obraGris: [
      {
        src: obraGris1,
        alt: "Obra gris Tipo 1 - imagen 1",
      },
      {
        src: obraGris2,
        alt: "Obra gris Tipo 1 - imagen 2",
      },
      {
        src: obraGris3,
        alt: "Obra gris Tipo 1 - imagen 3",
      },
      {
        src: obraGris4,
        alt: "Obra gris Tipo 1 - imagen 4",
      },
      {
        src: obraGris5,
        alt: "Obra gris Tipo 1 - imagen 5",
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
    acabados: [
      {
        src: "https://placehold.co/600x400/C8933A/F5F0E8?text=Acabados+Tipo+2+-+1",
        alt: "Acabados Tipo 2 - imagen 1",
      },
      {
        src: "https://placehold.co/600x400/C8933A/F5F0E8?text=Acabados+Tipo+2+-+2",
        alt: "Acabados Tipo 2 - imagen 2",
      },
    ],
    obraGris: [
      {
        src: "https://placehold.co/600x400/4a4a4a/F5F0E8?text=Obra+Gris+Tipo+2+-+1",
        alt: "Obra gris Tipo 2 - imagen 1",
      },
      {
        src: "https://placehold.co/600x400/4a4a4a/F5F0E8?text=Obra+Gris+Tipo+2+-+2",
        alt: "Obra gris Tipo 2 - imagen 2",
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
