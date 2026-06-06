import { motion } from "framer-motion";

export default function GanchoEmocional() {
  return (
    <section className="bg-navy py-24 px-6">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <p className="text-rojo-light font-semibold tracking-widest uppercase text-xs md:text-sm mb-6">
          Hablemos claro
        </p>

        <h2 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl leading-[1.15] mb-8">
          Llevas años trabajando duro.{" "}
          <span className="text-white/55">¿Y qué tienes a tu nombre?</span>
        </h2>

        <p className="text-white text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto">
          No te falta esfuerzo. Te faltó una oportunidad real, pensada para
          gente como tú.
        </p>
      </motion.div>
    </section>
  );
}
