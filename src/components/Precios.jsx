import { motion } from "framer-motion";
import { User, Briefcase, CheckCircle } from "lucide-react";
import { WHATSAPP_URL } from "../constants";

const planes = [
  {
    icono: User,
    tipo: "Empleado",
    desde: "$865.000/mes",
    nota: "(más cesantías y primas)",
  },
  {
    icono: Briefcase,
    tipo: "Independiente",
    desde: "$1.400.000/mes",
    nota: null,
  },
];

const beneficios = [
  "Aplican todos los subsidios de vivienda. Te ayudamos a aprovecharlos.",
  "Financiamos hasta por 20 años",
];

export default function Precios() {
  return (
    <section id="planes-precios" className="py-20 px-6 bg-navy">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="font-serif text-blanco text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Pago a cuotas, directo con nosotros.
        </motion.h2>

        <motion.p
          className="text-rojo-light font-bold text-4xl md:text-5xl my-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Separas con $3.000.000
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {planes.map((plan, i) => {
            const Icon = plan.icono;
            return (
              <motion.div
                key={i}
                className="bg-white/10 border border-white/10 rounded-2xl p-8 text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <Icon
                  className="w-8 h-8 text-rojo-light mb-3"
                  aria-hidden="true"
                />
                <h3 className="text-blanco font-bold text-xl mb-2">
                  {plan.tipo}
                </h3>
                <p className="text-rojo-light text-2xl font-bold">
                  desde {plan.desde}
                </p>
                {plan.nota && (
                  <p className="text-white/60 text-sm mt-1">{plan.nota}</p>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-3 mb-10">
          {beneficios.map((b, i) => (
            <div
              key={i}
              className="flex items-start gap-3 text-left max-w-xl mx-auto"
            >
              <CheckCircle
                className="w-5 h-5 text-rojo-light flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-blanco text-base">{b}</p>
            </div>
          ))}
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-rojo text-white font-bold px-10 py-4 rounded-lg text-lg hover:bg-rojo-dark transition-colors duration-300 shadow-hover"
        >
          Quiero saber más
        </a>
      </div>
    </section>
  );
}
