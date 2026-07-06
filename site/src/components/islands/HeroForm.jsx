import { useState } from 'react';

const WHATSAPP = '573112382253';

const TIPOS = [
  { id: 'apartamento', label: 'Apartamento' },
  { id: 'parcela', label: 'Parcela' },
  { id: 'lote', label: 'Lote urbano' },
];

const PROPOSITOS = [
  { id: 'inversion', label: 'Inversión' },
  { id: 'vivienda', label: 'Vivienda propia' },
];

const PAISES = [
  { code: '+57', label: 'Colombia (+57)' },
  { code: '+1', label: 'EE. UU. (+1)' },
  { code: '+34', label: 'España (+34)' },
  { code: '', label: 'Otro país' },
];

export default function HeroForm() {
  const [tipo, setTipo] = useState('apartamento');
  const [proposito, setProposito] = useState('inversion');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [pais, setPais] = useState('+57');
  const [celular, setCelular] = useState('');

  function enviar(e) {
    e.preventDefault();
    const tipoLabel = TIPOS.find((t) => t.id === tipo)?.label ?? tipo;
    const propLabel = PROPOSITOS.find((p) => p.id === proposito)?.label ?? proposito;
    const msg =
      `Hola, vengo de la web de Grupo Mizar.\n` +
      `Busco: ${tipoLabel} para ${propLabel.toLowerCase()}.\n` +
      `Nombre: ${nombre}\nEmail: ${email}\nCelular: ${pais} ${celular}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  const chip = (active) =>
    `cursor-pointer whitespace-nowrap rounded-full border px-2 py-2 text-center text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${
      active
        ? 'border-gold bg-gold/15 text-gold'
        : 'border-white/25 text-white/80 hover:border-white/50'
    }`;

  const input =
    'w-full rounded-xl border border-white/25 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none';

  return (
    <form
      onSubmit={enviar}
      data-event="form-submit"
      className="w-full max-w-md rounded-2xl border border-white/15 bg-black/15 p-6 shadow-2xl backdrop-blur-[2px] md:p-7"
      aria-label="Cuéntanos qué buscas"
    >
      <fieldset className="mb-5">
        <legend className="eyebrow mb-2.5 text-gold">¿Qué buscas?</legend>
        <div className="grid grid-cols-3 gap-1.5 sm:flex sm:flex-wrap sm:gap-2" role="radiogroup">
          {TIPOS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={tipo === t.id}
              className={chip(tipo === t.id)}
              onClick={() => setTipo(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mb-5">
        <legend className="eyebrow mb-2.5 text-gold">¿Para qué?</legend>
        <div className="flex flex-wrap gap-2" role="radiogroup">
          {PROPOSITOS.map((p) => (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={proposito === p.id}
              className={chip(proposito === p.id)}
              onClick={() => setProposito(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="space-y-3">
        <input
          className={input}
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          autoComplete="name"
        />
        <input
          className={input}
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <div className="flex gap-2">
          <select
            className="rounded-xl border border-white/25 bg-plum-dark px-2.5 py-2.5 text-sm text-white focus:border-gold focus:outline-none"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            aria-label="País"
          >
            {PAISES.map((p) => (
              <option key={p.label} value={p.code}>
                {p.label}
              </option>
            ))}
          </select>
          <input
            className={input}
            type="tel"
            placeholder="Celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            required
            autoComplete="tel"
          />
        </div>
      </div>

      <button type="submit" className="btn-primary mt-5 w-full">
        Quiero más información
      </button>
      <p className="mt-3 text-center text-xs text-white/50">
        Te respondemos por WhatsApp, sin compromiso.
      </p>
    </form>
  );
}
