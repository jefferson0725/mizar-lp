# site/ — Aplicación Astro de Grupo Mizar

Esta carpeta contiene todo el sitio. La documentación de entrega, el despliegue y las variables de entorno están en el [README raíz](../README.md).

## Comandos

Todos se ejecutan desde esta carpeta (`site/`). Requiere Node 22.12 o superior.

| Comando | Qué hace |
| :--- | :--- |
| `npm install` | Instala las dependencias |
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Compila el sitio a `./dist/` |
| `npm run preview` | Previsualiza el build antes de desplegar |

## Antes de tocar el diseño

Leer [`SPEC.md`](SPEC.md). Define la paleta, la tipografía, las reglas de layout y los patrones que el proyecto evita de forma deliberada.

## Notas

- `public/` se copia tal cual al build: lo que se ponga ahí se publica y debe ir ya optimizado.
- `videos-originals/` guarda los videos sin comprimir. Está fuera de `public/` a propósito para que no se publiquen; `optimize-videos.sh` los usa como fuente.
