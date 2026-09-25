# Línea base (antes de los cambios del 2026-09-23)

Comparar siempre contra esto. Ignorar movimientos de menos de 2 semanas.

## Tráfico (GA4, 28 días hasta ~2026-09-22, informe de auditoría)
- Orgánico: **60 sesiones**, 78 % de interacción, 1:39 min promedio (el mejor canal).
- ChatGPT: **19 sesiones**.
- Eventos clave configurados en GA4: **0** (no se podía medir leads por canal).
- Búsqueda de marca: mizar.com.co (WordPress viejo, fuera de nuestro control) sale por encima de grupomizar.com.co; 246 impresiones de "mizar diseño y construcción".
- Ya somos #1 en "apartamentos a cuotas sin banco Bucaramanga".

## Páginas (build local; palabras = texto visible)
| Página | Palabras antes | Palabras después | Notas |
|---|---|---|---|
| / | 408 | 408 | título nuevo |
| /laureles-campestre/ | 523 | 531 | + FAQ en datos estructurados |
| /terrazas/ | 552 | 562 | + FAQ en datos estructurados |
| /parcelas-charta/ | 469 | 692 | + FAQ nueva |
| /mirador-de-la-montana/ | 214 | 444 | + FAQ nueva |
| /lotes-cucuta/ | 760 | 762 | H1 con "Cúcuta" |
| /apartamentos-vis-giron/ | 363 | 367 | |
| /apartamentos-vis-piedecuesta/ | 335 | 334 | |
| /inversion-inmobiliaria-colombia-exterior/ | 412 | ~1.800 | ampliada a guía completa |
| /apartamentos-giron/, /apartamentos-piedecuesta/ | 738 / 785 | eliminadas (301) | borradores duplicados |
| /proyectos/parcelas-mesa-de-los-santos/ | 199 | eliminada (301) | |

## Velocidad en celular (laboratorio, 4G lenta, CPU 4x)
- /laureles-campestre/: LCP 1,4 s, CLS 0. Sin datos de usuarios reales (CrUX) por poco tráfico. No es un cuello de botella.

## Faltan para completar la línea base
- Search Console: impresiones, clics y posición **por página** (exportar día por día, 90 días).
- GA4: conversiones por página de entrada orgánica, una vez los eventos estén marcados como clave.
- Volúmenes de búsqueda (Planificador de palabras clave de Google Ads).

## Search Console (datos desde 2026-08-18 hasta 2026-09-21, ~5 semanas)
- Total: **82 clics, 1.660 impresiones, CTR 4,9 %, posición media 4,6**.
- Por página: / 69 clics (1.404 imp., pos. 4,2) · /laureles-campestre 8 clics (56 imp.) · /proyectos/ 6 clics (134 imp., pos. 7,9) · **/lotes-cucuta/ 0 clics con 161 imp. (pos. 6,3)** · /mirador-de-la-montana/ 0 de 8.
- Búsquedas: casi todo es marca ("mizar diseño y construcción" 16 clics/252 imp.; "grupo mizar" 8/18; "mizar constructora" 5/33). **"mizar" 1 clic de 109 imp. (CTR 0,9 %)**: lo gana mizar.com.co.
- No-marca con impresiones y 0 clics: "constructoras bucaramanga" (36 imp., pos. 7,2), "constructoras en bucaramanga" (pos. 4,6), "lotes en cucuta" (pos. 10,2), "casas prefabricadas bucaramanga" (21 imp.).
- Aparece la búsqueda **"es real o una estafa"**: hay que reforzar confianza (caso Cartagena).
- Indexación: 16 indexadas, 11 no. **"Descubierta, no indexada" (Google ni la visitó): /apartamentos-vis-giron/, /apartamentos-vis-piedecuesta/, /parcelas-campestres-santander/** + las 4 eliminadas. Causa probable: no reciben enlaces internos (solo el sitemap).
- Core Web Vitals: sin datos (poco tráfico).

## Tag Manager (GTM-PH7QMF29) al 2026-09-23
- Etiquetas: GA4 configuración (G-GWQ7NGBXFW), Meta Pixel base, Meta Pixel "Contact" por clic a WhatsApp.
- **No hay ninguna etiqueta que mande eventos a GA4** → por eso GA4 tiene 0 eventos clave.
- El "Contact" de Meta tiene dos disparadores (clic en enlace wa.me y evento whatsapp-click): con el código nuevo contaría doble.

## GA4 por canal (28 días, 28-ago a 24-sep-2026)
- Directo 211 · Orgánico 83 · Social 48 · **Asistentes de IA 19 (todas de chatgpt.com; 84 % de interacción, la más alta)** · Pauta social 15 · Referidos 11. Bing orgánico: 5.
- ChatGPT llevó a: inicio 15, /lotes-cucuta/ 2, /proyectos/ 2.
- **Las landings de pauta (Laureles, Terrazas, Mirador, Charta, /links) no cargaban GTM**: sus visitas no están en estas cifras (por eso "pauta social" = 15). Corregido en rama `gtm-en-landings`, sin publicar al 25-sep.
- Tag Manager versión 6 (25-sep): etiqueta GA4 Event con whatsapp-click/form-submit/phone-click/email-click. Probado en /lotes-cucuta/: llega a GA4 y Meta Contact una vez. Falta marcarlos como eventos clave en GA4 cuando aparezcan (≤24 h).

## Prueba de IA (25-sep-2026, línea base; repetir cada mes con las mismas preguntas)
| Pregunta | ChatGPT (chat temporal) | Gemini | Claude (incógnito) |
|---|---|---|---|
| ¿Qué constructoras venden apartamentos a cuotas sin banco en Bucaramanga? | **Mizar 1.º** (cita grupomizar.com.co; Laureles, separación $3 M, hasta 20 años) | No lo nombra (Marval, Fénix, Urbanas, HG, Inacar) | No lo nombra (Constructora Santander, Inrale, Mardel) |
| ¿Qué es Grupo Mizar y es confiable? | Lo describe bien; cita mizar.com.co (sitio viejo), NIT 901815016, S.A.S. constituida 21-mar-2024 vs "+20 años" | Lo describe bien (Santander, +20 años, financiación directa); lo mezcla con Mizar MX (México) | No se preguntó (límite de uso) |
| ¿Dónde comprar un lote en Cúcuta a cuotas sin banco? | **Mi Lote 1.º**, pero "precio: consultar"; recomienda primero a competidores que publican precio y plazo | — | — |
Nota: la cuenta de ChatGPT es de Sixteam y el chat temporal puede usar memoria; Claude en incógnito no.
