# Terrazas de la Cantera → WordPress

Migración de la landing de React a un bloque autocontenido que se monta como
**una página nueva** dentro del WordPress de Mizar (mizar.com.co), sin tocar el
resto del sitio y sin necesidad de FTP/cPanel.

El bloque reproduce 1:1 el diseño original (mismos colores, tipografías Fraunces +
DM Sans, animaciones, carrusel, FAQ, contador, formulario Sixteam y botón de
WhatsApp). No depende de ningún CDN externo: los estilos (Tailwind compilado) y
los íconos van incrustados.

---

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `terrazas-embed.html` | **El bloque a pegar** en un widget HTML de Elementor (o bloque "HTML personalizado" de Gutenberg). |
| `terrazas-elementor.json` | Alternativa: plantilla de Elementor lista para *Importar*. Trae el mismo bloque dentro de un widget HTML. |
| `terrazas.html` | Página completa standalone (solo para previsualizar en el navegador antes de subir). |
| `assets/` | Las 17 imágenes + video que hay que subir a la biblioteca de Medios. |

---

## Paso 1 — Subir los assets a Medios

1. WordPress → **Medios → Añadir nuevo**.
2. Sube **todos** los archivos de la carpeta `assets/` (17 en total):
   - `terrazas-fachada.webp`, `logo-terrazas.webp`, `render-edificio.webp`,
     `plano-tipo1.webp`, `timeline-edificio.mp4`
   - `galeria-01.webp` … `galeria-12.webp`
3. Haz clic en cualquiera de las imágenes recién subidas y copia su **URL**.
   Tendrá una forma como:
   `https://mizar.com.co/wp-content/uploads/2026/06/logo-terrazas.webp`
4. Quédate con la parte de la carpeta (sin el nombre del archivo):
   `https://mizar.com.co/wp-content/uploads/2026/06`
   Esa es tu **ASSET_BASE**.

> Sube todos los archivos el mismo mes para que compartan la misma carpeta.
> Si WordPress renombra algún archivo (por duplicado), súbelo de nuevo con su
> nombre exacto o ajusta el nombre en el bloque.

---

## Paso 2 — Crear la página

1. WordPress → **Páginas → Añadir nueva**. Título: *Terrazas de la Cantera*.
2. En **Atributos de página → Plantilla**, elige **Elementor Full Width** o
   **Elementor Canvas** (página en blanco, sin cabecera/pie del tema).
   > Importante: el bloque trae su propio reset de estilos. Usar Canvas evita que
   > afecte la cabecera/pie del resto de tu sitio.

### Opción A — Pegar el bloque (recomendado)

3. Edita con Elementor → arrastra un widget **HTML**.
4. Abre `terrazas-embed.html`, copia **todo** el contenido y pégalo en el widget.
5. Publica.

### Opción B — Importar la plantilla de Elementor

3. Elementor → **Plantillas → Importar plantillas** → sube
   `terrazas-elementor.json`.
4. Edita la página con Elementor → **Añadir plantilla** → elige
   *Terrazas de la Cantera*.
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

El bloque NO trae meta tags (los controla WordPress). En la edición de la página,
abre el panel de **RankMath** y configura:

- **Título SEO:** Terrazas de la Cantera · Apartamentos en Piedecuesta | Mizar
- **Descripción:** Apartamentos propios en Piedecuesta con vista al Cerro de La
  Cantera. Sin bancos y a cuotas, directo con Mizar. 60 m², 3 alcobas. Entrega
  diciembre 2027.
- **Imagen social (OG/Twitter):** sube `terrazas-fachada.webp`.

Esto resuelve, de forma nativa y a prueba de scrapers (WhatsApp/Facebook), el
problema de OG tags que existía en la SPA.

---

## Notas

- **Microsoft Clarity** ya está instalado a nivel de sitio; no hace falta
  agregarlo en el bloque.
- El **formulario** sigue siendo el embed de Sixteam
  (`web.sixteam.pro/widget/form/3fFCODye6YCSItphtEmo`) con autoajuste de altura.
- El **WhatsApp** apunta a `wa.me/573112658552`. Para cambiar el número o el
  mensaje, busca y reemplaza esa URL dentro del bloque.
- Para regenerar el bloque tras editar el diseño en React:
  `cat _embed_head.html ../dist/assets/TerrazasApp-*.css _embed_tail.html > terrazas-embed.html`
