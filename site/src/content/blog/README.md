# Cómo añadir un artículo al blog

Cada artículo es **un archivo `.md`** en esta carpeta (`site/src/content/blog/`). Al publicarlo (merge a `main`), el sitio se compila y el artículo aparece en `/blog/<slug>/` y en el índice del blog. No hace falta Strapi.

Este `README.md` no se publica como artículo.

## Plantilla

Copia esto en un archivo nuevo, por ejemplo `como-elegir-parcela.md`:

```md
---
title: "Cómo elegir una parcela en Santander"      # H1 y tarjeta. Hasta 100 caracteres; si pasa de 55, pon seo_title para Google
seo_title: "Cómo elegir una parcela en Santander | Mizar"   # OPCIONAL. Título de Google y de redes (<title> y og:title), máx. 60. Si se omite: "<title> | Grupo Mizar"
slug: como-elegir-parcela                           # opcional; si se omite se usa el nombre del archivo
description: "Entre 140 y 155 caracteres: qué responde el artículo y para quién."
author: "Grupo Mizar"                               # opcional (por defecto "Grupo Mizar")
frente: consejos                                    # ver lista abajo
tags:
  - parcelas campestres
  - comprar sin banco
pub_date: 2026-10-23                                # AAAA-MM-DD
updated: 2026-11-02                                 # opcional: fecha de la última actualización importante
hero_image: ../../assets/blog/como-elegir-parcela.jpg   # opcional; ruta relativa a este archivo
hero_alt: "Descripción de la foto, para lectores de pantalla y Google"   # OBLIGATORIO si hay hero_image
draft: false                                        # true = no se publica (borrador)
---

Párrafo de entrada que responde la pregunta del título en 2-3 frases.

## Primer subtítulo (H2)

Texto. Listas con guion:

- Punto uno
- Punto dos

### Subtítulo menor (H3)

Enlaces internos así: [la página Nosotros](/nosotros/).
```

Valores de `frente`: `consejos`, `parcelas-charta`, `laureles-campestre`, `terrazas`, `mirador-de-la-montana`, `mi-lote`, `colombianos-en-el-exterior`.

## Imágenes

- Van en `site/src/assets/blog/` (créala si no existe). Se referencian con `hero_image: ../../assets/blog/<archivo>`.
- Súbelas en JPG o PNG de buena calidad (hasta ~2 MB está bien); el sitio las convierte solo a webp y a los tamaños necesarios (1200 px la portada, 750 px la tarjeta).
- Fotos reales de Mizar, nada de stock. Siempre con `hero_alt`.
- Imágenes dentro del texto: `![descripción](../../assets/blog/archivo.jpg)`.

## Reglas

- **Título: máx. 55 caracteres.** Descripción: **140 a 155 caracteres**.
- **Slug corto, en minúsculas, sin tildes ni eñes**, con guiones (`constructora-confiable`). **Nunca cambies el slug de un artículo ya publicado**: rompe el enlace y lo que Google ya conoce.
- Los subtítulos (`##`, `###`) reciben un ancla automática (por ejemplo `## Preguntas frecuentes` queda en `#preguntas-frecuentes`), así que se pueden enlazar desde un índice dentro del artículo.
- Un solo H1: lo pone la plantilla con el `title`. En el cuerpo empieza en `##`.
- Los enlaces del texto se abren en la misma pestaña.
- Si dos artículos (archivo y Strapi) tienen el mismo slug, gana el archivo.
- Antes de subir: `npm run build` en `site/` debe pasar. Si un campo está mal, el error dice cuál.
