import { motion } from "framer-motion";
import { Users, Landmark, Globe2 } from "lucide-react";

const trust = [
  { icono: Users, valor: "Cientos", etiqueta: "de familias e inversionistas" },
  { icono: Landmark, valor: "Sin bancos", etiqueta: "directo con Mizar" },
  { icono: Globe2, valor: "A distancia", etiqueta: "compra desde tu país" },
];

export default function Testimonios() {
  return (
    <section className="py-20 px-6 bg-navy">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          className="text-rojo-light font-semibold tracking-widest uppercase text-xs md:text-sm mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Prueba social
        </motion.p>

        <motion.h2
          className="font-serif text-white text-3xl sm:text-4xl md:text-5xl leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Hemos acompañado a cientos de familias e inversionistas a comprar su
          apartamento de la forma más sencilla.
        </motion.h2>

        <motion.p
          className="text-white/80 text-lg max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          Sin bancos, sin intermediarios y con acompañamiento en cada paso,
          estés donde estés.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {trust.map((t, i) => {
            const Icon = t.icono;
            return (
              <motion.div
                key={i}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rojo/15 mb-4">
                  <Icon className="w-7 h-7 text-rojo-light" aria-hidden="true" />
                </div>
                <p className="font-serif text-white text-2xl md:text-3xl font-bold leading-none mb-1">
                  {t.valor}
                </p>
                <p className="text-white/70 text-sm">{t.etiqueta}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
