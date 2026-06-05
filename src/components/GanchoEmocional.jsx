import { motion } from 'framer-motion'
import { WHATSAPP_URL } from '../constants'

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
        <p className="font-serif text-azul-oscuro text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
          "Llevas años trabajando duro… ¿y qué tienes a tu nombre?"
        </p>
        <p className="text-gray-600 text-lg md:text-xl mb-8">
          No te falta esfuerzo, te faltan oportunidades reales.
        </p>
        <p className="text-azul-oscuro font-bold text-2xl md:text-3xl mb-10">
          Laureles Campestre es el camino correcto.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-azul-oscuro text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-azul-medio transition-colors duration-300"
        >
          Quiero mi apartamento
        </a>
      </motion.div>
    </section>
  )
}
