import { motion } from "framer-motion";
import { MapPin, Bus, Trees, Navigation, Building2, ParkingSquare, Sparkles } from "lucide-react";
import { MAPS_URL, MAPS_EMBED_URL } from "../constants";

const puntos = [
  { icono: MapPin, texto: "A 4 cuadras del Parque Principal y la Plaza de Mercado." },
  { icono: Trees, texto: "Frente al Cerro de La Cantera, uno de los pulmones verdes y puntos turísticos del sector." },
  { icono: Bus, texto: "Acceso directo a transporte público y vías principales." },
];

const features = [
  { icono: Building2, texto: "Torre de 5 pisos" },
  { icono: ParkingSquare, texto: "Parqueadero en sótano" },
  { icono: Sparkles, texto: "Full acabados" },
];

export default function Ubicacion() {
  return (
    <section className="py-20 px-6 bg-gris-claro">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="font-serif text-navy text-3xl sm:text-4xl md:text-5xl text-center mb-12 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Estás comprando en el mejor punto de Piedecuesta.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {puntos.map((punto, i) => {
            const Icon = punto.icono;
            return (
              <motion.div
                key={i}
                className="text-center p-6 rounded-xl bg-white border border-gris-claro shadow-card hover:shadow-hover transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <Icon className="w-10 h-10 text-navy mx-auto mb-4" aria-hidden="true" />
                <p className="text-gris-oscuro text-base leading-relaxed">{punto.texto}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {features.map((f, i) => {
            const Icon = f.icono;
            return (
              <motion.div
                key={i}
                className="inline-flex items-center gap-2 bg-navy text-white rounded-full px-5 py-2.5 text-sm font-semibold"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Icon className="w-4 h-4 text-rojo-light" aria-hidden="true" />
                {f.texto}
              </motion.div>
            );
          })}
        </div>

        <motion.p
          className="text-gris-oscuro text-center text-lg max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          El centro de Piedecuesta concentra todo lo que necesitas a pie, y el Cerro de La Cantera le da naturaleza y plusvalía a la zona.
        </motion.p>

        <motion.div
          className="w-full rounded-xl overflow-hidden shadow-card mb-6 border border-gris-claro"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <iframe
            src={MAPS_EMBED_URL}
            title="Ubicación de Terrazas de la Cantera en Piedecuesta"
            className="w-full h-[340px] md:h-[420px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>

        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-rojo text-navy font-semibold px-6 py-3 rounded-lg hover:bg-rojo-dark hover:text-navy transition-colors duration-300 shadow-lg"
          >
            <Navigation className="w-4 h-4" />
            Cómo llegar
          </a>
        </motion.div>

        <p className="text-navy font-bold text-center text-xl md:text-2xl">
          Más conexión, más naturaleza, más ciudad.{" "}
          <span className="text-rojo-dark">Un apartamento que gana valor todos los días.</span>
        </p>
      </div>
    </section>
  );
}
