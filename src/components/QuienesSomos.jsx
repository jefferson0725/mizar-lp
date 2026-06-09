import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Building2,
  HeartHandshake,
  Globe2,
  CalendarCheck,
  BadgeCheck,
} from "lucide-react";

// TODO: reemplazar con números reales de Mizar
const metricas = [
  {
    icono: CalendarCheck,
    valor: 20,
    sufijo: "+",
    etiqueta: "Años de experiencia",
  },
  {
    icono: BadgeCheck,
    valor: 100,
    sufijo: "+",
    etiqueta: "Proyectos entregados",
  },
];

const pilares = [
  {
    icono: Building2,
    titulo: "Diseño y construcción propia",
    texto:
      "Cada proyecto nace y se construye con nuestro equipo, de principio a fin.",
  },
  {
    icono: HeartHandshake,
    titulo: "Financiación directa",
    texto: "El acuerdo es contigo, sin bancos ni intermediarios de por medio.",
  },
  {
    icono: Globe2,
    titulo: "Compra desde el exterior",
    texto: "Te acompañamos en todo el proceso a distancia, paso a paso desde tu país.",
  },
];

function Counter({ target, sufijo, duration = 1.8 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let frame = 0;
    const totalFrames = Math.round(duration * 60);
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (frame >= totalFrames) {
        setCount(target);
        clearInterval(timer);
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {sufijo}
    </span>
  );
}

export default function QuienesSomos() {
  return (
    <section className="py-20 px-6 bg-gris-claro">
      <div className="max-w-5xl mx-auto">
        {/* Intro */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-rojo-dark font-semibold tracking-widest uppercase text-xs md:text-sm mb-4">
            Quiénes somos
          </p>
          <h2 className="font-serif text-navy text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Detrás de Terrazas de la Cantera está Mizar.
          </h2>
          <p className="text-gris-oscuro text-lg leading-relaxed">
            Somos una constructora de Santander dedicada al diseño y la
            construcción de vivienda, con pago a cuotas directo y sin bancos.
            Nuestro propósito es simple: que más familias e inversionistas
            tengan su apartamento propio, sin trámites imposibles y sin importar
            dónde vivan hoy.
          </p>
        </motion.div>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-md mx-auto mb-14">
          {metricas.map((m, i) => {
            const Icon = m.icono;
            return (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-navy/10 mb-3">
                  <Icon className="w-6 h-6 text-navy" aria-hidden="true" />
                </div>
                <p className="font-serif text-navy text-4xl md:text-5xl font-bold leading-none mb-1">
                  <Counter target={m.valor} sufijo={m.sufijo} />
                </p>
                <p className="text-gris-oscuro text-sm md:text-base">
                  {m.etiqueta}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Pilares */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pilares.map((pilar, i) => {
            const Icon = pilar.icono;
            return (
              <motion.div
                key={i}
                className="text-center p-8 rounded-2xl bg-white border border-gris-claro shadow-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-navy/10 mb-5">
                  <Icon className="w-7 h-7 text-navy" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-navy text-lg mb-2">
                  {pilar.titulo}
                </h3>
                <p className="text-gris-oscuro text-base leading-relaxed">
                  {pilar.texto}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
