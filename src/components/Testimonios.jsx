import { motion } from 'framer-motion'
import { RESENAS } from '../constants'

export default function Testimonios() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="font-serif text-verde-oscuro text-3xl sm:text-4xl md:text-5xl text-center mb-12 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Hemos ayudado a cientos de personas a comprar su apartamento de la forma más sencilla.
        </motion.h2>

        <motion.div
          className="w-full aspect-video bg-gray-900 rounded-2xl flex flex-col items-center justify-center mb-14 overflow-hidden"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* TODO: reemplazar con <iframe> de YouTube o Vimeo */}
          <svg
            className="w-16 h-16 text-white/70 mb-3"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="text-white/50 text-sm tracking-widest uppercase">
            Video Testimonio
          </span>
        </motion.div>

        {/* TODO: reemplazar RESENAS en constants/index.js con reseñas reales de Google Maps */}
        <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
          {RESENAS.map((resena, i) => (
            <motion.div
              key={i}
              className="min-w-[280px] md:min-w-0 bg-crema rounded-xl p-6 flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className="text-dorado text-xl mb-3"
                aria-label={`${resena.estrellas} estrellas`}
              >
                {'★'.repeat(resena.estrellas)}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                "{resena.texto}"
              </p>
              <p className="font-semibold text-verde-oscuro text-sm">{resena.nombre}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
