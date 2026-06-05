import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAQ_ITEMS } from '../constants'

function FaqItem({ pregunta, respuesta }) {
  const [abierto, setAbierto] = useState(false)

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setAbierto(!abierto)}
        aria-expanded={abierto}
        className="w-full flex items-center justify-between py-5 text-left gap-4 cursor-pointer"
      >
        <span className="font-semibold text-navy text-base md:text-lg">
          {pregunta}
        </span>
        <span
          className={`text-navy text-2xl flex-shrink-0 transition-transform duration-300 ${
            abierto ? 'rotate-45' : ''
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <AnimatePresence>
        {abierto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 pb-5 leading-relaxed">{respuesta}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="py-20 px-6 bg-gris-claro">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="font-serif text-navy text-3xl sm:text-4xl md:text-5xl text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Preguntas frecuentes
        </motion.h2>

        <div className="bg-white rounded-2xl px-6 py-2 shadow-sm">
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
