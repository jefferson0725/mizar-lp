import { useEffect, useRef, useState } from 'react';

/**
 * Carrusel automático de videos e imágenes (personas, grupos, proyectos).
 * props.slides: [{ type: 'video'|'image', src, poster?, label, quote?, autor? }]
 * - Avanza solo cada 6 s (video: espera a que termine o 12 s máx).
 * - Se pausa cuando el usuario interactúa o la sección no es visible.
 */
export default function VideoCarousel({ slides }) {
  const [idx, setIdx] = useState(0);
  const [muted, setMuted] = useState(true);
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const pausedRef = useRef(false);
  const videoRefs = useRef({});

  const go = (i) => {
    const n = (i + slides.length) % slides.length;
    setIdx(n);
    const track = trackRef.current;
    if (track) {
      const slide = track.children[n];
      track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    }
  };

  // autoplay del carrusel
  useEffect(() => {
    const current = slides[idx];
    clearTimeout(timerRef.current);
    if (pausedRef.current) return;
    const delay = current.type === 'video' ? 12000 : 6000;
    timerRef.current = setTimeout(() => go(idx + 1), delay);
    return () => clearTimeout(timerRef.current);
  }, [idx, slides]);

  // reproducir solo el video visible
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([i, v]) => {
      if (!v) return;
      if (Number(i) === idx) v.play().catch(() => {});
      else v.pause();
    });
  }, [idx]);

  // pausa por interacción del usuario
  const pause = () => {
    pausedRef.current = true;
    clearTimeout(timerRef.current);
  };
  const resume = () => {
    pausedRef.current = false;
    go(idx);
  };

  return (
    <div
      onPointerDown={pause}
      onPointerLeave={resume}
      onTouchEnd={() => setTimeout(resume, 4000)}
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3"
        style={{ scrollbarWidth: 'none' }}
        aria-roledescription="carrusel"
        aria-label="Testimonios y proyectos en video"
      >
        {slides.map((s, i) => (
          <figure
            key={s.src}
            className="relative aspect-[9/16] min-w-[68%] snap-start overflow-hidden rounded-2xl bg-plum-dark sm:min-w-[42%] md:min-w-[30%] lg:min-w-[23%]"
          >
            {s.type === 'video' ? (
              <>
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  src={s.src}
                  poster={s.poster}
                  muted={muted}
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setMuted((m) => !m)}
                  className="absolute right-3 bottom-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white"
                  aria-label={muted ? 'Activar sonido' : 'Silenciar'}
                >
                  {muted ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 5 6 9H2v6h4l5 4V5ZM23 9l-6 6M17 9l6 6" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 5 6 9H2v6h4l5 4V5ZM15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
                    </svg>
                  )}
                </button>
              </>
            ) : (
              <img src={s.src} alt={s.label} loading="lazy" className="h-full w-full object-cover" />
            )}

            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5 pt-14 text-white">
              <p className="eyebrow text-gold">{s.label}</p>
              {s.quote && <p className="mt-1.5 max-w-md text-sm leading-relaxed">“{s.quote}”</p>}
              {s.autor && <p className="mt-1 text-xs font-bold text-white/70">{s.autor}</p>}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label="Ir a slide">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={i === idx}
            aria-label={`Slide ${i + 1}: ${s.label}`}
            onClick={() => {
              pause();
              go(i);
            }}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? 'w-8 bg-mizar' : 'w-3 bg-ink/25 hover:bg-ink/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
