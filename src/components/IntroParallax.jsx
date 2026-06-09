import Hero from "./Hero";
import { motion } from "framer-motion";

export default function IntroParallax() {
  return (
    <>
      <Hero />

      {/* ===================================================================
          SECCIÓN GANCHO + EDIFICIO
          Móvil  : texto (teal) → render del edificio con fundido a gris-claro
          Desktop: dos columnas — render izquierda | texto derecha
      =================================================================== */}
      <section className="bg-navy overflow-hidden">
        <div className="flex flex-col md:grid md:grid-cols-2 md:min-h-[580px]">

          {/* ── Columna texto (derecha en desktop, primera en móvil) ── */}
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

          {/* ── Columna imagen (izquierda en desktop, segunda en móvil) ── */}
          <div className="relative md:order-1">

            {/* Móvil: imagen pega flush con el teal de arriba; sólo fundido inferior a gris-claro */}
            <div className="md:hidden relative">
              <img
                src="/assets/render-edificio.webp"
                alt=""
                aria-hidden="true"
                className="block w-full h-auto object-cover"
              />
              {/* Fundido inferior → gris-claro, sólo en la parte baja de la imagen */}
              <div className="pointer-events-none absolute bottom-0 inset-x-0 h-1/4
                              bg-gradient-to-t from-[#f1f4f3] via-[#f1f4f3]/70 to-transparent" />
            </div>

            {/* Desktop: imagen completa sin recorte ni degradados */}
            <div className="hidden md:flex items-center justify-center h-full">
              <img
                src="/assets/render-edificio.webp"
                alt="Render del edificio Terrazas de la Cantera"
                className="block w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
