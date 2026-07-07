import { useState, useEffect } from "react";
import { APARTAMENTOS, WHATSAPP_URL } from "../constants";

function AptoCard({ apto, tipoImagenes }) {
  const imagenes = apto.imagenes.filter((img) => img.tipo === tipoImagenes);
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
            className={`w-full h-full ${imagenes[imagenActual].tipo === "plano" ? "object-contain bg-white" : "object-cover"}`}
          />
          <span className="absolute top-3 right-3 bg-navy/90 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
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
        <div className="flex flex-wrap justify-center gap-2 py-3">
          {imagenes.map((_, i) => (
            <button
              key={i}
              onClick={() => setImagenActual(i)}
              aria-label={`Ir a imagen ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 cursor-pointer ${imagenActual === i ? "bg-navy" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>

      <div className="md:w-1/2 p-8 flex flex-col justify-center">
        <h3 className="font-serif text-navy text-2xl mb-6">
          {imagenes[imagenActual].tipoApto}
        </h3>
        <dl className="space-y-3 text-gray-700">
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <dt className="font-semibold">Área</dt>
            <dd>{imagenes[imagenActual]?.area || apto.area}</dd>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <dt className="font-semibold">Habitaciones</dt>
            <dd>{imagenes[imagenActual]?.habitaciones || apto.habitaciones}</dd>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <dt className="font-semibold">Baños</dt>
            <dd>{imagenes[imagenActual]?.banos || apto.banos}</dd>
          </div>
          {(imagenes[imagenActual]?.extra || apto.extra) && (
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <dt className="font-semibold">Vista</dt>
              <dd className="text-right text-sm">
                {imagenes[imagenActual]?.extra || apto.extra}
              </dd>
            </div>
          )}
          {apto.nota && (
            <div className="pt-1">
              <p className="text-sm text-rojo-dark italic">{apto.nota}</p>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}

export default function Apartamentos() {
  const [tipoImagenes, setTipoImagenes] = useState("render");

  return (
    <section className="py-20 px-6 bg-gris-claro">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-navy text-3xl sm:text-4xl md:text-5xl text-center mb-10">
          Conoce los apartamentos
        </h2>

        <div className="flex justify-center mb-10">
          <div className="flex bg-white rounded-full border border-gray-200 p-1 gap-1">
            <button
              onClick={() => setTipoImagenes("render")}
              className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                tipoImagenes === "render"
                  ? "bg-rojo text-navy"
                  : "text-gray-500 hover:text-navy"
              }`}
            >
              Renders
            </button>
            <button
              onClick={() => setTipoImagenes("plano")}
              className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                tipoImagenes === "plano"
                  ? "bg-rojo text-navy"
                  : "text-gray-500 hover:text-navy"
              }`}
            >
              Planos
            </button>
          </div>
        </div>

        <AptoCard
          key={tipoImagenes}
          apto={APARTAMENTOS[0]}
          tipoImagenes={tipoImagenes}
        />

        <p className="text-center text-gray-600 mt-10 text-lg max-w-2xl mx-auto">
          Apartamentos con vista al Cerro de La Cantera. Se entregan con full
          acabados.
        </p>

        <div className="flex justify-center mt-8">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-rojo text-navy font-bold px-8 py-4 rounded-lg text-lg hover:bg-rojo-dark hover:text-navy transition-colors duration-300 shadow-hover"
          >
            Me interesa, quiero precios
          </a>
        </div>
      </div>
    </section>
  );
}
