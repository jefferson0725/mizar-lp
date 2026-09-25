# Bitácora SEO (solo se agregan entradas; nunca se borra)

## 2026-09-23 — Primer paquete de mejoras (rama `seo-mejoras`, sin publicar)
**Evidencia:** auditoría (GA4, comparación de páginas duplicadas, búsquedas reales en Google CO/US y autocompletado).
**Cambios:**
- Borradores duplicados /apartamentos-giron/ y /apartamentos-piedecuesta/ eliminados; 301 a /laureles-campestre/ y /terrazas/ (aprobado por Ernesto; si había pauta apuntando ahí, el 301 la lleva a la página vigente).
- 301 de fichas viejas /proyectos/<slug>/ a la landing propia; la ficha oculta de Mesa de los Santos redirige a Mirador.
- Barra final en todos los enlaces internos.
- Títulos, descripciones y H1 por palabra clave en 11 páginas.
- FAQ nuevas en Mirador y Charta; FAQPage + BreadcrumbList en las 4 landings.
- Datos de la empresa para Google: razón social, redes reales (antes apuntaban a cuentas equivocadas), zonas, descripción que la separa de otros "Mizar".
- Medición: clics a WhatsApp, llamadas y formularios se envían desde todas las páginas.
- llms.txt con los proyectos actuales.
**Pendiente de confirmar con Mizar antes de publicar:** "queda escriturado a tu nombre" (¿al terminar de pagar?), compra por apoderado desde el exterior, vigencia del "Bono de $5.000.000" en Mirador.
**Cuándo juzgar:** no antes de 2–4 semanas después de publicar.

## 2026-09-23 — Guía para colombianos en el exterior (sin publicar)
**Evidencia:** en "comprar casa en Colombia desde el exterior/USA" rankean guías largas (Amarilo, Bancolombia, Bolívar, Volvé Colombia) y ninguna ofrece "sin banco".
**Cambio:** /inversion-inmobiliaria-colombia-exterior/ pasa de ~420 a ~1.800 palabras: 8 secciones en forma de pregunta con la respuesta en la primera línea, proceso en 6 pasos, cómo evitar estafas, enlaces a los 5 proyectos, FAQ de 6 preguntas.
**Pendiente de confirmar con Mizar:** canales de pago desde el exterior, si todo el proceso se puede hacer sin viajar, documentos que se entregan antes de separar, videollamadas desde la obra.
**Otros hallazgos:** velocidad en celular sin problema (LCP 1,4 s). El sitio usa dos números de WhatsApp distintos como "general"; hay que definir uno.

## 2026-09-24 — Reversión de todo el contenido visible (publicado)
**Regla de Ernesto:** el SEO no cambia nada que vea el visitante. Se revirtieron H1/H2, las FAQ nuevas de Mirador y Charta (y su FAQPage), la guía larga del exterior y la columna "Guías" del pie. El texto visible de las 17 páginas quedó idéntico al de antes del trabajo SEO (comprobado con comparar-texto-visible).
**Se mantiene (invisible):** títulos de pestaña y meta, datos estructurados, barra final, redirecciones 301, noindex, medición automática de clics, llms.txt.
**Publicación:** el push a main no disparó el despliegue automático; se publicó a mano con `.claude/deploy-prod.sh --apply` (copia en ~/backups/public_html-20260924-220127.tgz).
**Tag Manager:** versión 5 publicada con Meta "Contact" en un solo disparador; falta la etiqueta GA4 Event (Analytics sigue en 0 conversiones).
**Método:** skill `seo-sixteam` en ~/.claude/skills/seo-sixteam.
