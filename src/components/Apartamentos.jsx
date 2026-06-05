import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { APARTAMENTOS } from '../constants'

export default function Apartamentos() {
  const [tipoActivo, setTipoActivo] = useState(0)
  const [imagenActual, setImagenActual] = useState(0)

  const apto = APARTAMENTOS[tipoActivo]

  const handleTabChange = (index) => {
    setTipoActivo(index)
    setImagenActual(0)
  }

  const prev = () =>
    setImagenActual((i) => (i === 0 ? apto.imagenes.length - 1 : i - 1))
  const next = () =>
    setImagenActual((i) => (i === apto.imagenes.length - 1 ? 0 : i + 1))

  return (
    <section className="py-20 px-6 bg-crema">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-verde-oscuro text-3xl sm:text-4xl md:text-5xl text-center mb-10">
          Los apartamentos
        </h2>

        <div className="flex justify-center gap-4 mb-10">
          {APARTAMENTOS.map((a, i) => (
            <button
              key={a.id}
              onClick={() => handleTabChange(i)}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors duration-300 cursor-pointer ${
                tipoActivo === i
                  ? 'bg-verde-oscuro text-white'
                  : 'bg-white text-verde-oscuro border border-verde-oscuro hover:bg-verde-oscuro/10'
              }`}
            >
              {a.tipo}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tipoActivo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden md:flex"
          >
            <div className="md:w-1/2 relative">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={apto.imagenes[imagenActual].src}
                  alt={apto.imagenes[imagenActual].alt}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prev}
                  aria-label="Imagen anterior"
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white w-9 h-9 rounded-full flex items-center justify-center text-xl hover:bg-black/60 transition-colors cursor-pointer"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  aria-label="Siguiente imagen"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white w-9 h-9 rounded-full flex items-center justify-center text-xl hover:bg-black/60 transition-colors cursor-pointer"
                >
                  ›
                </button>
              </div>
              <div className="flex justify-center gap-2 py-3">
                {apto.imagenes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImagenActual(i)}
                    aria-label={`Ir a imagen ${i + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 cursor-pointer ${
                      imagenActual === i ? 'bg-verde-oscuro' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h3 className="font-serif text-verde-oscuro text-2xl mb-6">{apto.tipo}</h3>
              <dl className="space-y-3 text-gray-700">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <dt className="font-semibold">Área</dt>
                  <dd>{apto.area}</dd>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <dt className="font-semibold">Habitaciones</dt>
                  <dd>{apto.habitaciones}</dd>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <dt className="font-semibold">Baños</dt>
                  <dd>{apto.banos}</dd>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <dt className="font-semibold">Piso</dt>
                  <dd className="text-right text-sm">{apto.piso}</dd>
                </div>
                {apto.nota && (
                  <div className="pt-1">
                    <p className="text-sm text-dorado italic">{apto.nota}</p>
                  </div>
                )}
              </dl>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-gray-600 mt-10 text-lg max-w-2xl mx-auto">
          Puedes recibirlo en obra gris para terminarlo a tu ritmo, o con acabados. Tú eliges.
        </p>
      </div>
    </section>
  )
}
