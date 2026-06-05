import { motion } from 'framer-motion'

export default function GanchoEmocional() {
  return (
    <section className="bg-crema py-20 px-6">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <p className="font-serif text-verde-oscuro text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
          "Llevas años trabajando duro… ¿y qué tienes a tu nombre?"
        </p>
        <p className="text-gray-600 text-lg md:text-xl mb-8">
          No te falta esfuerzo, te faltan oportunidades reales.
        </p>
        <p className="text-verde-oscuro font-bold text-2xl md:text-3xl">
          Laureles Campestre es el camino correcto.
        </p>
      </motion.div>
    </section>
  )
}
