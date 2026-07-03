import Hero from "./Hero";
import { motion } from "framer-motion";

export default function IntroParallax() {
  return (
    <>
      <Hero />

      <section id="intro" className="bg-navy overflow-hidden">
        <div className="flex flex-col md:grid md:grid-cols-2 md:min-h-[580px]">
          <motion.div
            className="flex flex-col justify-center py-20 px-8 md:py-28 md:px-14 lg:px-20 md:order-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-rojo-light font-semibold tracking-widest uppercase text-xs md:text-sm mb-6">
              Hablemos claro
            </p>
            <h2 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl leading-[1.15] mb-8">
              Llevas años trabajando duro lejos de casa.{" "}
              <span className="text-white/55">
                ¿Qué tienes hoy en Colombia que asegure tu retiro?
              </span>
            </h2>
            <p className="text-white text-xl md:text-2xl font-light max-w-xl">
              Cada vez más personas están eligiendo Piedecuesta para vivir. Tú
              puedes ser dueño en el mejor punto, sin importar dónde estés hoy.
            </p>
          </motion.div>

          <motion.div
            className="relative md:order-1 flex items-center justify-center mb-8 md:mb-0"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-full aspect-[10/12] rounded-3xl overflow-hidden shadow-dark border border-white/10">
              <video
                className="w-full h-full object-cover block"
                src="/assets/timeline-edificio.mp4"
                poster="/assets/render-edificio.webp"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
