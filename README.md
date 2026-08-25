# Grupo Mizar — Sitio web corporativo

Sitio en producción: **https://grupomizar.com.co**

Grupo Mizar es una inmobiliaria/constructora santandereana con más de 20 años y más de 100 proyectos entregados. El modelo comercial del sitio es **propiedad a cuotas, directo con la constructora, sin bancos**, dirigido a compradores en Colombia y a colombianos en el exterior (EE. UU. y España).

---

## Stack

| | |
|---|---|
| Framework | Astro 7 (salida estática, sin servidor) |
| Estilos | Tailwind CSS 4 (tema en `site/src/styles/global.css`) |
| Interactividad | Islas de Preact/React solo donde hace falta |
| Blog | Contenido servido desde Strapi (CMS externo) |
| Hosting | Hostinger — despliegue por SSH/rsync |
| Analítica | Google Analytics 4 |

El sitio compila a HTML/CSS/JS estático. No requiere Node ni base de datos en el servidor.

---

## Estructura del repositorio

```
site/                       La aplicación completa
  src/
    pages/                  Una página = una ruta pública
    landing/                Landings por proyecto (laureles, terrazas, mirador)
    components/             Componentes compartidos
    layouts/Base.astro      Layout global: header, footer, SEO, JSON-LD
    data/                   Datos editables: proyectos, WhatsApp, schema
    styles/global.css       Paleta, tipografía y utilidades de marca
    assets/                 Imágenes optimizadas en build
  public/                   Archivos servidos tal cual (videos, .htaccess)
  SPEC.md                   Sistema de diseño y copy oficial
context/                    Paleta y contexto de marca
.github/workflows/          Despliegue automático
```

---

## Rutas publicadas

| Ruta | Contenido |
|---|---|
| `/` | Home |
| `/nosotros` | Trayectoria y proyectos entregados |
| `/proyectos` · `/proyectos/[slug]` | Listado y detalle de proyectos |
| `/laureles-campestre` | Landing Laureles Campestre |
| `/terrazas` | Landing Terrazas de la Cantera |
| `/mirador-de-la-montana` | Landing Mirador de la Montaña |
| `/apartamentos-giron` · `/apartamentos-vis-giron` | Campañas Girón |
| `/apartamentos-piedecuesta` · `/apartamentos-vis-piedecuesta` | Campañas Piedecuesta |
| `/lotes-cucuta` · `/parcelas-campestres-santander` | Campañas de lotes y parcelas |
| `/inversion-inmobiliaria-colombia-exterior` | Captación de colombianos en el exterior |
| `/blog` · `/blog/[slug]` | Blog (requiere Strapi) |
| `/contacto` | Contacto |
| `/404` | Página de error |

`sitemap-index.xml` se genera automáticamente en cada build.

---

## Desarrollo local

Requiere **Node 22.12 o superior**.

```bash
cd site
npm install
npm run dev
```

Queda disponible en `http://localhost:4321`.

Build de producción:

```bash
cd site
npm run build
```

La salida queda en `site/dist/` — esos son los archivos que se suben al hosting.

---

## Variables de entorno

Copiar `site/.env.example` a `site/.env` y completar. Ninguna es obligatoria para que el sitio compile; sin ellas el blog queda vacío y no se registra analítica.

| Variable | Para qué sirve |
|---|---|
| `STRAPI_URL` | URL del CMS que alimenta el blog |
| `PUBLIC_GA4_ID` | ID de medición de Google Analytics 4 |
| `BLOG_API_URL` | Alternativa a `STRAPI_URL` en el listado del blog |

---

## Despliegue

El despliegue es **automático**. Cada `push` a `main` que toque `site/` dispara [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que compila el sitio y lo sincroniza por rsync contra el `public_html` del dominio en Hostinger.

También se puede lanzar a mano desde la pestaña **Actions** de GitHub (`workflow_dispatch`), o automáticamente cuando Strapi publica un artículo (`repository_dispatch`).

Secrets necesarios en el repositorio (Settings → Secrets and variables → Actions):

- `SSH_PRIVATE_KEY` — llave privada con acceso al hosting
- `STRAPI_URL` — URL del CMS en producción

### Despliegue manual

Si en algún momento se quiere subir sin GitHub Actions, basta con compilar y copiar el contenido de `site/dist/` a la raíz del dominio. No hay paso de instalación en el servidor.

---

## Cómo editar el contenido

| Qué cambiar | Dónde |
|---|---|
| Textos de una página | El `.astro` correspondiente en `site/src/pages/` |
| Textos de una landing | La carpeta del proyecto en `site/src/landing/` |
| Datos de proyectos | `site/src/data/proyectos.ts` |
| Números de WhatsApp | `site/src/data/whatsapp.ts` y `site/src/data/proyectos.ts` |
| Header, footer, SEO base | `site/src/layouts/Base.astro` |
| Colores y tipografía | `site/src/styles/global.css` |
| Artículos del blog | Desde el panel de Strapi, no desde este repositorio |

Antes de tocar diseño, leer [`site/SPEC.md`](site/SPEC.md): define la paleta, la tipografía, las reglas de layout y los patrones que el proyecto evita deliberadamente.

---

## Optimización de imágenes y video

Las imágenes en `site/src/assets/` se optimizan y convierten a WebP durante el build. Las que van en `site/public/` se sirven tal cual, así que deben subirse ya optimizadas.

Para los videos existe `site/optimize-videos.sh`, que genera las versiones comprimidas a partir de los originales guardados en `site/videos-originals/`.

Esa carpeta vive fuera de `site/public/` a propósito: los originales se conservan en el repositorio para poder revertir, pero no se copian al build ni se publican en el sitio.
