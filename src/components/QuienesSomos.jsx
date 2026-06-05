import { motion } from 'framer-motion'
import { Building2, HeartHandshake, ShieldCheck } from 'lucide-react'

const pilares = [
  {
    icono: Building2,
    titulo: 'Diseño y construcción propia',
    texto: 'Cada proyecto nace y se construye con nuestro equipo, de principio a fin.',
  },
  {
    icono: HeartHandshake,
    titulo: 'Financiación directa',
    texto: 'El acuerdo es contigo, sin bancos ni intermediarios de por medio.',
  },
  {
    icono: ShieldCheck,
    titulo: 'Respaldo en Santander',
    texto: 'Construimos en Girón y el área metropolitana de Bucaramanga.',
  },
]

export default function QuienesSomos() {
  return (
    <section className="py-20 px-6 bg-gris-claro">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-rojo font-semibold tracking-widest uppercase text-xs md:text-sm mb-4">
            Quiénes somos
          </p>
          <h2 className="font-serif text-navy text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Detrás de Laureles Campestre está Mizar.
          </h2>
          {/* TODO: ajustar con datos reales (años de trayectoria, proyectos entregados, familias) */}
          <p className="text-gris-oscuro text-lg leading-relaxed">
            Somos una constructora de Santander dedicada al diseño y la construcción de
            vivienda, con un modelo de pago a cuotas directo y sin bancos. Nuestro propósito
            es simple: que más familias tengan su apartamento propio, sin trámites
            imposibles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pilares.map((pilar, i) => {
            const Icon = pilar.icono
            return (
              <motion.div
                key={i}
                className="text-center p-8 rounded-2xl bg-white border border-gris-claro shadow-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rojo/10 mb-5">
                  <Icon className="w-7 h-7 text-rojo" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-navy text-lg mb-2">{pilar.titulo}</h3>
                <p className="text-gris-oscuro text-base leading-relaxed">{pilar.texto}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
