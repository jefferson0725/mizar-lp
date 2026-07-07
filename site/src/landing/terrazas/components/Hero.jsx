import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-navy-dark overflow-hidden">
      <motion.div
        style={{ backgroundImage: `url(/assets/terrazas-fachada.webp)` }}
        className="absolute inset-y-0 left-0 w-[135%] bg-cover bg-center will-change-transform"
        animate={{ x: ["0%", "-24%"] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/85 via-navy-dark/70 to-navy-dark/88" />

      <motion.img
        src="/assets/logo-terrazas.webp"
        alt="Terrazas de la Cantera"
        className="relative z-10 h-20 md:h-28 w-auto mb-8"
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
        <h1 className="font-serif font-black text-white text-4xl sm:text-5xl md:text-6xl leading-[1.08] mb-6">
          Tu apartamento propio en Piedecuesta,{" "}
          <span className="text-rojo-light">sin bancos y sin viajar.</span>
        </h1>
        <p className="text-white/85 text-lg md:text-xl mb-10 font-light max-w-2xl mx-auto">
          Apartamentos sobre planos en el centro de Piedecuesta. Pago a cuotas
          directo con Mizar, desde donde estés.
        </p>
        <a
          href="#intro"
          className="inline-block bg-rojo text-navy font-bold px-8 py-4 rounded-lg text-lg hover:bg-rojo-dark hover:text-navy transition-colors duration-300 shadow-hover"
        >
          Quiero conocer mis opciones
        </a>
        <p className="text-white/65 text-sm mt-6 tracking-widest uppercase">
          Entrega proyectada · Diciembre 2027
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        aria-hidden="true"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
