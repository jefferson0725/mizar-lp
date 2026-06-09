import { motion } from 'framer-motion'

export default function Contacto() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-navy text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight">
            Tu apartamento propio en Piedecuesta está más cerca de lo que crees,
            sin importar dónde estés hoy.
          </h2>
          <p className="text-gray-600 text-lg">
            Cuéntanos tu caso y te explicamos cuál plan se ajusta a ti.
          </p>
        </motion.div>

        <div id="formulario-contacto" style={{ width: '100%', height: '1214px' }}>
          <iframe
            src="https://web.sixteam.pro/widget/form/3fFCODye6YCSItphtEmo"
            style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
            id="inline-3fFCODye6YCSItphtEmo"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Agendamiento de llamadas Terrazas"
            data-height="1214"
            data-layout-iframe-id="inline-3fFCODye6YCSItphtEmo"
            data-form-id="3fFCODye6YCSItphtEmo"
            title="Agendamiento de llamadas Terrazas"
          />
          <script src="https://web.sixteam.pro/js/form_embed.js" />
        </div>
      </div>
    </section>
  )
}
