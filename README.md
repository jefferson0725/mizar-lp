# Grupo Mizar — Sitio web

Sitio corporativo de Grupo Mizar (mizar.com.co): inmobiliaria/constructora santandereana. Propiedades a cuotas, directo con la constructora, sin bancos.

## Estructura

- `site/` — la app Astro 7 + Tailwind 4 (todo el sitio, incluidas las landings `/laureles-campestre` y `/terrazas` como Astro estático con islas React). Ver `site/SPEC.md` para el sistema de diseño y el copy oficial.
- `context/` — paleta y contexto de marca.

## Desarrollo

```bash
cd site
npm install
npm run dev
```

Build de producción: `npm run build` (salida en `site/dist/`).

Analytics: configurar `PUBLIC_GA4_ID` (ver `site/.env.example`).
