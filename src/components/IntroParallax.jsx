import Hero from "./Hero";
import { motion } from "framer-motion";

export default function IntroParallax() {
  return (
    <>
      <Hero />

      {/* ===================================================================
          SECCIÓN GANCHO + TORRE
          Móvil  : texto (navy) → imagen (torre-frontal) con fundido a gris-claro
          Desktop: dos columnas — torre-con-fondo izquierda | texto derecha
      =================================================================== */}
      <section id="proposicion-valor" className="bg-navy overflow-hidden">
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
              Llevas años trabajando duro.{" "}
              <span className="text-white/55">¿Y qué tienes a tu nombre?</span>
            </h2>
            <p className="text-white text-xl md:text-2xl font-light max-w-xl">
              No te falta esfuerzo. Te faltó una oportunidad real, pensada para
              gente como tú.
            </p>
          </motion.div>

          {/* ── Columna imagen (izquierda en desktop, segunda en móvil) ── */}
          <div className="relative md:order-1">
            {/* Móvil: imagen pega flush con el navy de arriba; sólo fundido inferior a gris-claro */}
            <div className="md:hidden relative">
              <img
                src="/assets/torre-frontal.webp"
                alt=""
                aria-hidden="true"
                className="block w-full h-auto"
              />
              {/* Fundido inferior → gris-claro, sólo en la parte baja de la imagen */}
              <div
                className="pointer-events-none absolute bottom-0 inset-x-0 h-1/4
                              bg-gradient-to-t from-[#F5F5F5] via-[#F5F5F5]/70 to-transparent"
              />
            </div>

            {/* Desktop: imagen completa sin recorte ni degradados */}
            <div className="hidden md:flex items-center justify-center">
              <img
                src="/assets/torre-con-fondo.png"
                alt="Render Torre Mizar"
                className="block w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
