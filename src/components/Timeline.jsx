import { motion } from "framer-motion";

export default function Timeline() {
  return (
    <section className="py-20 px-6 bg-navy-dark">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          className="text-rojo-light font-semibold tracking-widest uppercase text-xs md:text-sm mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          El proyecto
        </motion.p>
        <motion.h2
          className="font-serif text-white text-3xl sm:text-4xl md:text-5xl leading-tight mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Mira cómo cobra vida, del día a la noche.
        </motion.h2>

        <motion.div
          className="rounded-2xl overflow-hidden shadow-dark border border-white/10"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <video
            className="w-full h-auto block"
            src="/assets/timeline-edificio.mp4"
            poster="/assets/render-edificio.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        </motion.div>

        <p className="text-white/50 text-sm mt-5">
          Render del proyecto · Terrazas de la Cantera
        </p>
      </div>
    </section>
  );
}
