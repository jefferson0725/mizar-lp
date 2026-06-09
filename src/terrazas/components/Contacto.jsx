import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { WHATSAPP_URL } from "../constants";

function WhatsAppIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = () => setEnviado(true);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="font-serif text-navy text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight">
            Tu apartamento propio en Piedecuesta está más cerca de lo que crees, sin importar dónde estés hoy.
          </h2>
          <p className="text-gray-600 text-lg">Cuéntanos tu caso y te explicamos cuál plan se ajusta a ti.</p>
        </motion.div>

        <a id="cta-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white font-bold py-5 rounded-xl text-lg hover:bg-[#128C7E] transition-colors duration-300 mb-8">
          <WhatsAppIcon />
          Quiero saber más por WhatsApp
        </a>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm text-center">¿Prefieres que te contactemos nosotros?</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {enviado ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-navy/10 border border-navy/30 text-navy rounded-xl p-8 text-center">
            <p className="text-xl font-semibold">¡Listo! Te contactamos pronto.</p>
          </motion.div>
        ) : (
          <form id="formulario-contacto" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <div>
              <label htmlFor="tc-nombre" className="block text-sm font-semibold text-gray-700 mb-1">Nombre completo</label>
              <input id="tc-nombre" type="text" placeholder="Tu nombre" {...register("nombre", { required: "Campo requerido" })} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy" />
              {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
            </div>
            <div>
              <label htmlFor="tc-telefono" className="block text-sm font-semibold text-gray-700 mb-1">Teléfono / WhatsApp</label>
              <input id="tc-telefono" type="tel" placeholder="300 000 0000" {...register("telefono", { required: "Campo requerido", pattern: { value: /^[0-9+\s()-]{7,15}$/, message: "Número inválido" } })} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy" />
              {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>}
            </div>
            <div>
              <label htmlFor="tc-pais" className="block text-sm font-semibold text-gray-700 mb-1">¿Desde dónde nos escribes?</label>
              <select id="tc-pais" {...register("pais", { required: "Selecciona una opción" })} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy bg-white">
                <option value="">Selecciona...</option>
                <option value="colombia">Colombia</option>
                <option value="estados-unidos">Estados Unidos</option>
                <option value="europa">Europa</option>
                <option value="otro">Otro país</option>
              </select>
              {errors.pais && <p className="text-red-500 text-xs mt-1">{errors.pais.message}</p>}
            </div>
            <div>
              <label htmlFor="tc-mensaje" className="block text-sm font-semibold text-gray-700 mb-1">Mensaje (opcional)</label>
              <textarea id="tc-mensaje" rows={4} placeholder="Cuéntanos algo sobre tu situación…" {...register("mensaje")} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy resize-none" />
            </div>
            <button type="submit" className="w-full bg-navy text-white font-bold py-4 rounded-xl text-lg hover:bg-navy-light transition-colors duration-300 cursor-pointer">
              Quiero que me contacten
            </button>
            <p className="text-center text-gray-400 text-sm">Un asesor te escribe en menos de 24 horas.</p>
          </form>
        )}
      </div>
    </section>
  );
}
