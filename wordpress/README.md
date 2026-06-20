# Landings de Mizar → WordPress

Migración de las dos landing pages (React/Vite) a bloques autocontenidos que se
montan como **páginas nuevas** dentro del WordPress de Mizar (mizar.com.co), sin
tocar el resto del sitio y sin necesidad de FTP/cPanel.

Cada bloque reproduce 1:1 el diseño original (colores, tipografías Fraunces +
DM Sans, animaciones, carrusel, FAQ, contador, formulario Sixteam y WhatsApp).
No dependen de ningún CDN externo: los estilos (Tailwind compilado) y los íconos
van incrustados.

| Página | Carpeta de assets | Bloque para pegar | Plantilla Elementor | Standalone (preview) |
|---|---|---|---|---|
| **Terrazas de la Cantera** | `assets/` | `terrazas-embed.html` | `terrazas-elementor.json` | `terrazas.html` |
| **Laureles Campestre** | `laureles-assets/` | `laureles-embed.html` | `laureles-elementor.json` | `laureles.html` |

> Cada página es independiente. Repite los mismos pasos para cada una con su
> propia carpeta de assets y su propio bloque.

---

## Paso 1 — Subir los assets a Medios

1. WordPress → **Medios → Añadir nuevo**.
2. Sube **todos** los archivos de la carpeta correspondiente:
   - **Terrazas** (`assets/`, 17 archivos): `terrazas-fachada.webp`,
     `logo-terrazas.webp`, `render-edificio.webp`, `plano-tipo1.webp`,
     `timeline-edificio.mp4` y `galeria-01.webp` … `galeria-12.webp`.
   - **Laureles** (`laureles-assets/`, 27 archivos): `hero-fachada.webp`,
     `logo-mizar.webp`, `mapa-ubicacion.webp`, `torre-frontal.webp`,
     `torre-con-fondo.webp`, `testimios.mp4`, `t1-plano.webp`,
     `t1-acabados-1..5.webp`, `t1-obra-1..5.webp`, `t2-plano.webp`,
     `t2-acabados-1..5.webp`, `t2-obra-1..5.webp`.
3. Abre cualquier imagen recién subida y copia su **URL**. Tendrá esta forma:
   `https://mizar.com.co/wp-content/uploads/2026/06/logo-mizar.webp`
4. Quédate con la parte de la carpeta (sin el nombre del archivo). Esa es tu
   **ASSET_BASE**: `https://mizar.com.co/wp-content/uploads/2026/06`

> Sube todos los archivos de una página el mismo mes para que compartan carpeta.
> Si WordPress renombra un archivo (por duplicado), vuelve a subirlo con su
> nombre exacto.

---

## Paso 2 — Crear la página

1. WordPress → **Páginas → Añadir nueva**. Título: *Terrazas de la Cantera*
   (o *Laureles Campestre*).
2. En **Atributos de página → Plantilla**, elige **Elementor Full Width** o
   **Elementor Canvas** (página en blanco, sin cabecera/pie del tema).
   > Importante: el bloque trae su propio reset de estilos. Usar Canvas evita
   > que afecte la cabecera/pie del resto de tu sitio.

### Opción A — Pegar el bloque (recomendado)

3. Edita con Elementor → arrastra un widget **HTML**.
4. Abre el `*-embed.html` de la página, copia **todo** el contenido y pégalo.
5. Publica.

### Opción B — Importar la plantilla de Elementor

3. Elementor → **Plantillas → Importar plantillas** → sube el `*-elementor.json`.
4. Edita la página con Elementor → **Añadir plantilla** → elige la plantilla.
5. Publica.

---

## Paso 3 — Apuntar las imágenes (1 sola línea)

Dentro del bloque (al final, en el `<script>`) hay una línea:

```js
var ASSET_BASE = "https://mizar.com.co/wp-content/uploads/2026/06";
```

Reemplázala por **tu ASSET_BASE** del Paso 1. Es lo único que debes editar para
que carguen las imágenes y el video.

---

## Paso 4 — SEO / Open Graph (RankMath)

Los bloques NO traen meta tags (los controla WordPress). En la edición de cada
página, abre el panel de **RankMath** y configura título, descripción e imagen
social:

**Terrazas de la Cantera**
- Título: Terrazas de la Cantera · Apartamentos en Piedecuesta | Mizar
- Descripción: Apartamentos propios en Piedecuesta con vista al Cerro de La
  Cantera. Sin bancos y a cuotas, directo con Mizar. 60 m², 3 alcobas. Entrega
  diciembre 2027.
- Imagen social: `terrazas-fachada.webp`

**Laureles Campestre**
- Título: Laureles Campestre · Apartamentos en Girón | Mizar
- Descripción: Apartamentos sobre planos en Girón, a 150 m del futuro anillo
  vial. Sin bancos y a cuotas, directo con Mizar. Separa con $3.000.000.
  Entregas 2027–2028.
- Imagen social: `hero-fachada.webp`

Esto resuelve, de forma nativa y a prueba de scrapers (WhatsApp/Facebook), el
problema de OG tags que existía en la SPA.

---

## Notas

- **Microsoft Clarity** ya está instalado a nivel de sitio; no hace falta
  agregarlo en los bloques.
- Las imágenes pesadas de Laureles (acabados/obra) se optimizaron a webp
  (~50–190 KB cada una) desde los originales de 2–6 MB.
- El **formulario** es el embed de Sixteam (Terrazas: `3fFCODye6YCSItphtEmo`,
  Laureles: `TtlEMonBrX00yaU7wCme`).
- Las **reseñas** de Laureles cargan vía Featurable (Google Reviews).
- El **WhatsApp** apunta a `wa.me/573112658552`. Para cambiar número o mensaje,
  busca y reemplaza esa URL dentro del bloque.
- Para regenerar un bloque tras editar el diseño en React (CSS global compartido):
  - Terrazas: `cat _embed_head.html ../dist/assets/TerrazasApp-*.css _embed_tail.html > terrazas-embed.html`
  - Laureles: `cat _laureles_head.html ../dist/assets/TerrazasApp-*.css _laureles_tail.html > laureles-embed.html`
