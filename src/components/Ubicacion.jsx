import { motion } from 'framer-motion'
import { MapPin, Car, Trees, Navigation } from 'lucide-react'

const puntos = [
  {
    icono: MapPin,
    texto: 'A 150 metros del futuro anillo vial metropolitano Piedecuesta–Girón.',
  },
  {
    icono: Car,
    texto: 'Acceso a parqueaderos de la urbanización.',
  },
  {
    icono: Trees,
    texto: '2,5 hectáreas reservadas para zonas verdes y espacios de uso público.',
  },
]

export default function Ubicacion() {
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
          Estás comprando del lado correcto de Girón.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {puntos.map((punto, i) => {
            const Icon = punto.icono
            return (
              <motion.div
                key={i}
                className="text-center p-6 rounded-xl border border-gray-100 shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <Icon className="w-10 h-10 text-verde-oscuro mx-auto mb-4" aria-hidden="true" />
                <p className="text-gray-700 text-base leading-relaxed">{punto.texto}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          className="text-gray-600 text-center text-lg max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Durante años, el crecimiento de Girón se concentró sobre la vía antigua. El nuevo anillo vial está cambiando esa historia, justo donde está Laureles Campestre.
        </motion.p>

        <motion.div
          className="w-full rounded-xl overflow-hidden shadow-md mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <iframe
            title="Ubicación Laureles Campestre"
            src="https://maps.google.com/maps?q=7.0309838,-73.1721611&output=embed&z=16"
            className="w-full h-80 md:h-96 border-0"
            loading="lazy"
            allowFullScreen
          />
        </motion.div>

        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <a
            href="https://www.google.com/maps/place/LAURELES+CAMPESTRE/@7.0309891,-73.174736,1079m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8e6839005f8dab5f:0x96a0de025729c309!8m2!3d7.0309838!4d-73.1721611!16s%2Fg%2F11yt7fjm25?entry=tts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-verde-oscuro text-white font-semibold px-6 py-3 rounded-lg hover:bg-verde-medio transition-colors duration-300"
          >
            <Navigation className="w-4 h-4" />
            Cómo llegar
          </a>
        </motion.div>

        <p className="text-dorado font-bold text-center text-xl md:text-2xl">
          Un apartamento que gana valor todos los días.
        </p>
      </div>
    </section>
  )
}
