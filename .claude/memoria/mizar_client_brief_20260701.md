---
name: mizar-client-brief-20260701
description: "Requisitos verbales de Juliana Parada (clienta, Grupo Mizar) para la reestructuración completa del sitio web, dados en reunión del 2026-07-01"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7fb5420c-fd26-4d59-a322-f14205a7a71b
---

Juliana Parada (clienta, área de Marketing/Arquitectura en Grupo Mizar) pidió en llamada del 2026-07-01 (con Samuel y Sebastián Burgos de sixteam.pro) una reestructuración casi completa del sitio, no un ajuste. Grabación: https://fathom.video/share/JJysnxLyuTZb-qxu3Avadb5NZPDm6zwP

**Por qué:** se vienen varios proyectos nuevos y quiere posicionar la empresa más fuerte — no solo en redes, sino en buscadores tradicionales y en asistentes de IA (cita textual: "si alguien busca por ChatGPT, Inversiones Santander o Bienes Raíces Bucaramanga, estemos bien posicionados").

## Qué SÍ quiere
- Unificar Mizar + Mi Lote en un solo sitio "Grupo Mizar" — Mi Lote deja de ser web aparte, empezando por integrar Cúcuta.
- 4 secciones: Inicio, Nosotros, Proyectos, Blog (blog con enfoque SEO y GEO).
- Formulario de inicio tipo selector ("qué buscas": parcela, propósito, inversión, vivienda) — inspirado en referencia Grupo Briones, esto sí le gustó.
- Prueba social inmediata: videos reales de testimonios de clientes.
- Proyectos muy simple: elegir proyecto → landing propia. Sin desplegables/paneles al pasar el mouse (le molesta esto del Mizar actual).
- Del Mizar actual conservar: paleta de colores/marca, e imagen de ciudad de fondo en el hero.
- Mobile-first — su argumento: "la gente hoy no utiliza mucho el computador".
- Fotos y contenido reales (equipo, obra, proyectos), nada de stock — dice que el stock "da desconfianza".
- ~10 páginas: inicio, nosotros, blog (sistema propio + ~5 posts iniciales), proyectos index + 1 ficha por cada uno de sus 4 proyectos.

## Qué NO quiere
- Nada de complejidad tipo Grupo Briones: páginas "vivas" con filtros dinámicos y disponibilidad en tiempo real — cita textual: "no quiero complicarme".
- Nada de simulador de plan de pagos/cuotas (vio esto en la constructora "Amarillo" y le pareció confuso) — la mayoría de sus clientes compran su primera vivienda.
- Nada de menú desplegable en "Proyectos" del nav.
- Nada de fotos de stock/internet.
- No mantener el orden/estructura actual de Mizar (solo el estilo visual se conserva).

## Compromisos de la reunión
- Juliana → enviar copy de Home/Nosotros/Proyectos/Blog, y assets (fotos, testimonios) por partes en 2-3 semanas desde el 2026-07-01.
- Sixteam → enviar cotización de ~10 páginas + blog (comprometido para el lunes/martes siguiente, ~2026-07-06/07).

**Cómo aplicar:** antes de agregar features al sitio en `site/` (Astro), revisar esta lista — cualquier propuesta de filtros dinámicos, disponibilidad en tiempo real, simuladores de cuotas o menús desplegables en nav choca directamente con lo que la clienta rechazó explícitamente. Ver [[mizar-site-gap-audit-20260704]] para el estado de implementación vs este brief.
