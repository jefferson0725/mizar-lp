import { motion } from "framer-motion";
import { WHATSAPP_URL } from "../constants";
import heroImg from "../assets/hero.png";
import torre from "../assets/torre.png";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${torre})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* TODO: reemplazar backgroundImage con imagen real del proyecto */}
      <div className="absolute inset-0 bg-azul-oscuro/60" />
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
          Cómo tener tu apartamento propio, sin bancos y a cuotas, en la zona de
          mayor crecimiento en Girón.
        </h1>
        <p className="text-white/80 text-lg md:text-xl mb-10">
          Apartamentos sobre planos a 150 metros del futuro anillo vial
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-dorado text-azul-oscuro font-bold px-8 py-4 rounded-lg text-lg border-2 border-dorado hover:bg-azul-oscuro hover:text-dorado transition-colors duration-300"
        >
          Quiero saber más
        </a>
        <p className="text-white/60 text-sm mt-6 tracking-widest uppercase">
          Entregas 2027 · 2028
        </p>
      </motion.div>
    </section>
  );
}
