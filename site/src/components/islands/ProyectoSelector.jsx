import { useMemo, useState } from 'react';

const TIPOS = [
  { id: 'todos', label: 'Todos' },
  { id: 'apartamento', label: 'Apartamentos' },
  { id: 'parcela', label: 'Parcelas' },
  { id: 'lote', label: 'Lotes' },
];

const PROPOSITOS = [
  { id: 'todos', label: 'Cualquier propósito' },
  { id: 'inversion', label: 'Inversión' },
  { id: 'vivienda', label: 'Vivienda propia' },
];

/**
 * props.items: [{ slug, nombre, tipo, ubicacion, estado, propositos, resumen, imgSrc|null, href }]
 */
export default function ProyectoSelector({ items, singleRow = false }) {
  const [tipo, setTipo] = useState('todos');
  const [proposito, setProposito] = useState('todos');

  const visibles = useMemo(
    () =>
      items.filter(
        (p) =>
          (tipo === 'todos' || p.tipo === tipo) &&
          (proposito === 'todos' || p.propositos.includes(proposito)),
      ),
    [items, tipo, proposito],
  );

  const chip = (active) =>
    `cursor-pointer rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${
      active
        ? 'border-teal bg-teal text-white'
        : 'border-ink/20 text-ink/70 hover:border-teal/60'
    }`;

  return (
    <div>
      {singleRow ? (
        <div
          className="mb-8 flex flex-nowrap gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0"
          style={{ scrollbarWidth: 'thin' }}
          role="group"
          aria-label="Filtrar proyectos"
        >
          {TIPOS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`${chip(tipo === t.id)} shrink-0`}
              onClick={() => setTipo(t.id)}
            >
              {t.label}
            </button>
          ))}
          <span className="mx-1 hidden h-6 w-px shrink-0 self-center bg-ink/15 lg:block" aria-hidden="true" />
          {PROPOSITOS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`${chip(proposito === p.id)} shrink-0`}
              onClick={() => setProposito(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="mb-8 flex flex-col gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-ink/50">¿Qué buscas?</p>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filtrar por tipo"
            >
              {TIPOS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`${chip(tipo === t.id)} shrink-0`}
                  onClick={() => setTipo(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-ink/50">¿Para qué?</p>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filtrar por propósito"
            >
              {PROPOSITOS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`${chip(proposito === p.id)} shrink-0`}
                  onClick={() => setProposito(p.id)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((p) => (
          <a
            key={p.slug}
            href={p.href}
            className="group block overflow-hidden rounded-2xl border border-ink/10 bg-white transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-plum">
              {p.imgSrc ? (
                <img
                  src={p.imgSrc}
                  alt={`Render de ${p.nombre} en ${p.ubicacion}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div
                  className="flex h-full w-full items-end p-4"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 14px)',
                  }}
                >
                  <span className="display-lg text-lg text-white/85">{p.nombre}</span>
                </div>
              )}
              <span className="absolute top-3 left-3 rounded-full bg-plum-dark/85 px-2 py-1 text-[0.65rem] font-bold tracking-widest text-gold uppercase">
                {p.tipo}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold leading-snug">{p.nombre}</h3>
              <p className="mt-1 text-sm text-teal">{p.ubicacion}</p>
              <p className="mt-2 line-clamp-2 text-sm text-ink/70">{p.resumen}</p>
            </div>
          </a>
        ))}
      </div>

      {visibles.length === 0 && (
        <p className="py-10 text-center text-ink/60">
          No hay proyectos con esos filtros por ahora.{' '}
          <a href="/contacto" className="font-semibold text-mizar underline">
            Cuéntanos qué buscas
          </a>{' '}
          y te avisamos primero.
        </p>
      )}
    </div>
  );
}
