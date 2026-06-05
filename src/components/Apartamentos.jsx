import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { APARTAMENTOS, WHATSAPP_URL } from '../constants'

export default function Apartamentos() {
  const [tipoActivo, setTipoActivo] = useState(0)
  const [estadoActivo, setEstadoActivo] = useState('acabados')
  const [imagenActual, setImagenActual] = useState(0)

  const apto = APARTAMENTOS[tipoActivo]
  const imagenes = apto[estadoActivo]

  const handleTabChange = (index) => {
    setTipoActivo(index)
    setImagenActual(0)
  }

  const handleEstadoChange = (estado) => {
    setEstadoActivo(estado)
    setImagenActual(0)
  }

  const prev = () =>
    setImagenActual((i) => (i === 0 ? imagenes.length - 1 : i - 1))
  const next = () =>
    setImagenActual((i) => (i === imagenes.length - 1 ? 0 : i + 1))

  return (
    <section className="py-20 px-6 bg-crema">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-azul-oscuro text-3xl sm:text-4xl md:text-5xl text-center mb-10">
          Los apartamentos
        </h2>

        {/* Selector de tipo */}
        <div className="flex justify-center gap-4 mb-4">
          {APARTAMENTOS.map((a, i) => (
            <button
              key={a.id}
              onClick={() => handleTabChange(i)}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors duration-300 cursor-pointer ${
                tipoActivo === i
                  ? 'bg-azul-oscuro text-white'
                  : 'bg-white text-azul-oscuro border border-azul-oscuro hover:bg-azul-oscuro/10'
              }`}
            >
              {a.tipo}
            </button>
          ))}
        </div>

        {/* Selector de estado */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-white rounded-full border border-gray-200 p-1 gap-1">
            <button
              onClick={() => handleEstadoChange('acabados')}
              className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                estadoActivo === 'acabados'
                  ? 'bg-dorado text-white'
                  : 'text-gray-500 hover:text-azul-oscuro'
              }`}
            >
              Con acabados
            </button>
            <button
              onClick={() => handleEstadoChange('obraGris')}
              className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                estadoActivo === 'obraGris'
                  ? 'bg-azul-oscuro text-white'
                  : 'text-gray-500 hover:text-azul-oscuro'
              }`}
            >
              Obra gris
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${tipoActivo}-${estadoActivo}`}
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
                  src={imagenes[imagenActual].src}
                  alt={imagenes[imagenActual].alt}
                  className="w-full h-full object-cover"
                />
                {imagenes.length > 1 && (
                  <>
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
                  </>
                )}
              </div>
              {imagenes.length > 1 && (
                <div className="flex justify-center gap-2 py-3">
                  {imagenes.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImagenActual(i)}
                      aria-label={`Ir a imagen ${i + 1}`}
                      className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 cursor-pointer ${
                        imagenActual === i ? 'bg-azul-oscuro' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h3 className="font-serif text-azul-oscuro text-2xl mb-6">{apto.tipo}</h3>
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

        <p className="text-center text-gray-600 mt-10 text-lg max-w-2xl mx-auto mb-10">
          Puedes recibirlo en obra gris para terminarlo a tu ritmo, o con acabados. Tú eliges.
        </p>

        <div className="flex justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-dorado text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-azul-oscuro transition-colors duration-300"
          >
            Me interesa este apartamento
          </a>
        </div>
      </div>
    </section>
  )
}
