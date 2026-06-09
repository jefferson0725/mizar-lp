import { motion } from "framer-motion";
import { WHATSAPP_URL } from "../constants";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center bg-navy-dark overflow-hidden"
    >
      {/* Fondo: paneo HORIZONTAL en bucle continuo (tipo video), independiente del scroll.
          La imagen es horizontal, así que el movimiento es de lado a lado y se repite solo. */}
      <motion.div
        style={{ backgroundImage: `url(/assets/hero-fachada.webp)` }}
        className="absolute inset-y-0 left-0 w-[135%] bg-gradient-hero bg-cover bg-center will-change-transform"
        animate={{ x: ["0%", "-24%"] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Overlay navy para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 via-navy-dark/65 to-navy-dark/85" />

      {/* Logo Mizar */}
      <motion.img
        src="/assets/logo-mizar.webp"
        alt="Mizar · Diseño y Construcción"
        className="relative z-10 h-9 md:h-11 w-auto mb-10"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      />

      <motion.div
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <p className="text-rojo-light font-semibold tracking-widest uppercase text-xs md:text-sm mb-5">
          Laureles Campestre
        </p>
        <h1 className="font-serif font-black text-white text-4xl sm:text-5xl md:text-6xl leading-[1.08] mb-6">
          Tu apartamento propio en Girón,{" "}
          <span className="text-rojo-light">sin bancos y a cuotas.</span>
        </h1>
        <p className="text-white/85 text-lg md:text-xl mb-10 font-light max-w-2xl mx-auto">
          Apartamentos sobre planos a 150 metros del futuro anillo vial, en la
          zona de mayor crecimiento de Girón.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-rojo text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-rojo-dark transition-colors duration-300 shadow-hover"
        >
          Quiero conocer mis opciones
        </a>
        <p className="text-white/65 text-sm mt-6 tracking-widest uppercase">
          Entregas 2027 · 2028
        </p>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        aria-hidden="true"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
