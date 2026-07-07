import { motion } from "framer-motion";
import { Wallet, CalendarClock, Car, Clock } from "lucide-react";
import { WHATSAPP_URL } from "../constants";

const planes = [
  {
    icono: Wallet,
    tipo: "Ahorro",
    desde: "$30.000.000",
    nota: "durante la construcción",
  },
  {
    icono: CalendarClock,
    tipo: "Cuotas mensuales",
    desde: "desde $4.000.000",
    nota: null,
  },
];

const beneficios = [
  {
    icono: Car,
    texto: "Aceptamos permuta de carro o moto como parte de tu pago.",
  },
  { icono: Clock, texto: "Financiación hasta por 8 años, directo con Mizar." },
];

export default function Precios() {
  return (
    <section className="py-20 px-6 bg-navy">
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
          className="text-white/70 text-lg mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Sin bancos, sin intermediarios.
        </motion.p>

        <motion.p
          className="text-rojo-light font-bold text-4xl md:text-5xl my-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Separas con $2.000.000
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
                  {plan.desde}
                </p>
                {plan.nota && (
                  <p className="text-white/60 text-sm mt-1">{plan.nota}</p>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-3 mb-10">
          {beneficios.map((b, i) => {
            const Icon = b.icono;
            return (
              <div
                key={i}
                className="flex items-start gap-3 text-left max-w-xl mx-auto"
              >
                <Icon
                  className="w-5 h-5 text-rojo-light flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-blanco text-base">{b.texto}</p>
              </div>
            );
          })}
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-rojo text-navy font-bold px-10 py-4 rounded-lg text-lg hover:bg-rojo-dark hover:text-navy transition-colors duration-300 shadow-hover"
        >
          Quiero saber más
        </a>
      </div>
    </section>
  );
}
