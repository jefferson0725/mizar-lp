import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { APARTAMENTOS, WHATSAPP_URL } from "../constants";

function AptoCard({ apto, imagenes }) {
  const [imagenActual, setImagenActual] = useState(0);

  useEffect(() => {
    imagenes.forEach((img) => {
      const image = new Image();
      image.src = img.src;
    });
  }, [imagenes]);

  const prev = () =>
    setImagenActual((i) => (i === 0 ? imagenes.length - 1 : i - 1));
  const next = () =>
    setImagenActual((i) => (i === imagenes.length - 1 ? 0 : i + 1));

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden md:flex">
      <div className="md:w-1/2 relative">
        <div className="relative aspect-[4/3] overflow-hidden bg-crema">
          <img
            src={imagenes[imagenActual].src}
            alt={imagenes[imagenActual].alt}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-3 left-3 bg-navy/85 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
            {imagenes[imagenActual].tipo === "plano" ? "Plano" : "Render"}
          </span>
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
          {imagenes.map((_, i) => (
            <button
              key={i}
              onClick={() => setImagenActual(i)}
              aria-label={`Ir a imagen ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 cursor-pointer ${
                imagenActual === i ? "bg-navy" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="md:w-1/2 p-8 flex flex-col justify-center">
        <h3 className="font-serif text-navy text-2xl mb-6">{apto.tipo}</h3>
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
              <p className="text-sm text-rojo italic">{apto.nota}</p>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}

export default function Apartamentos() {
  const [tipoActivo, setTipoActivo] = useState(0);
  const [estadoActivo, setEstadoActivo] = useState("acabados");

  const handleEstadoChange = (estado) => {
    setEstadoActivo(estado);
  };

  return (
    <section className="py-20 px-6 bg-gris-claro">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-navy text-3xl sm:text-4xl md:text-5xl text-center mb-10">
          Los apartamentos
        </h2>

        {/* Pestañas: solo en escritorio */}
        <div className="hidden md:flex justify-center gap-4 mb-4">
          {APARTAMENTOS.map((a, i) => (
            <button
              key={a.id}
              onClick={() => setTipoActivo(i)}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors duration-300 cursor-pointer ${
                tipoActivo === i
                  ? "bg-navy text-white"
                  : "bg-white text-navy border border-navy hover:bg-navy/10"
              }`}
            >
              {a.tipo}
            </button>
          ))}
        </div>

        {/* Toggle acabados / obra gris */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-white rounded-full border border-gray-200 p-1 gap-1">
            <button
              onClick={() => handleEstadoChange("acabados")}
              className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                estadoActivo === "acabados"
                  ? "bg-rojo text-white"
                  : "text-gray-500 hover:text-navy"
              }`}
            >
              Con acabados
            </button>
            <button
              onClick={() => handleEstadoChange("obraGris")}
              className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                estadoActivo === "obraGris"
                  ? "bg-rojo text-white"
                  : "text-gray-500 hover:text-navy"
              }`}
            >
              Obra gris
            </button>
          </div>
        </div>

        {/* Móvil: todos los apartamentos en secuencia, sin botones */}
        <div className="md:hidden space-y-8">
          {APARTAMENTOS.map((a) => (
            <AptoCard
              key={`${a.id}-${estadoActivo}`}
              apto={a}
              imagenes={a[estadoActivo]}
            />
          ))}
        </div>

        {/* Escritorio: solo el tipo seleccionado con la pestaña */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${tipoActivo}-${estadoActivo}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <AptoCard
                apto={APARTAMENTOS[tipoActivo]}
                imagenes={APARTAMENTOS[tipoActivo][estadoActivo]}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-center text-gray-600 mt-10 text-lg max-w-2xl mx-auto">
          Puedes recibirlo en obra gris para terminarlo a tu ritmo, o con
          acabados. Tú eliges.
        </p>

        <div className="flex justify-center mt-8">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-rojo text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-rojo-dark transition-colors duration-300 shadow-hover"
          >
            Me interesa, quiero precios
          </a>
        </div>
      </div>
    </section>
  );
}
