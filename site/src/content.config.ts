import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Artículos del blog como archivos (src/content/blog/*.md).
 * Guía para añadir uno: src/content/blog/README.md
 */
const blog = defineCollection({
  // README.md (y cualquier archivo que empiece por "_") no cuenta como artículo.
  loader: glob({ pattern: ['*.md', '!README.md', '!_*'], base: './src/content/blog' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().max(100, 'El título (H1) debe tener 100 caracteres o menos; el de Google va en seo_title'),
        // Si se omite, la URL usa el nombre del archivo.
        slug: z.string().optional(),
        // Título para <title> y og:title (sin sufijo). Si se omite: "<title> | Grupo Mizar".
        seo_title: z.string().max(60, 'seo_title debe tener 60 caracteres o menos').optional(),
        description: z.string(),
        author: z.string().default('Grupo Mizar'),
        // consejos, parcelas-charta, laureles-campestre, terrazas, mirador-de-la-montana, mi-lote, colombianos-en-el-exterior
        frente: z.string(),
        tags: z.array(z.string()).default([]),
        pub_date: z.coerce.date(),
        updated: z.coerce.date().optional(),
        hero_image: image().optional(),
        hero_alt: z.string().optional(),
        // Qué parte de la foto se ve en la franja de portada (CSS object-position), p. ej. "center 22%" para que salgan las caras.
        hero_position: z.string().optional(),
        // Un borrador nunca se publica.
        draft: z.boolean().default(false),
      })
      .refine((d) => !d.hero_image || (d.hero_alt && d.hero_alt.trim().length > 0), {
        message: 'hero_alt es obligatorio cuando hay hero_image',
        path: ['hero_alt'],
      }),
});

export const collections = { blog };
