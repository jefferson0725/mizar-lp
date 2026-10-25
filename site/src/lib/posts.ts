/**
 * Artículos del blog desde dos fuentes: archivos del repo (src/content/blog) y Strapi (opcional).
 * Si un slug está en las dos, gana el archivo. Si Strapi no está configurado o no responde
 * (5 s), el build sigue solo con los archivos.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Post as StrapiPost } from './article';

export const STRAPI_URL = (import.meta.env.STRAPI_URL ?? '').trim().replace(/\/$/, '');

export interface BlogItem {
  slug: string;
  title: string;
  description: string;
  author: string;
  frente: string;
  tags: string[];
  /** ISO 8601 (fecha de publicación, medianoche UTC) */
  pubDate: string;
  /** ISO 8601 */
  modDate: string;
  file?: CollectionEntry<'blog'>;
  strapi?: StrapiPost;
}

async function fromStrapi(): Promise<BlogItem[]> {
  if (!STRAPI_URL) {
    console.warn('[blog] STRAPI_URL no está definida: el blog se compila solo con los archivos de src/content/blog.');
    return [];
  }
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/posts?populate=hero_image&sort=pub_date:desc&pagination[pageSize]=100`,
      { signal: AbortSignal.timeout(5000) },
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { data } = await res.json();
    return ((data ?? []) as StrapiPost[]).map((p) => {
      const pub = new Date(p.pub_date || p.publishedAt).toISOString();
      return {
        slug: p.slug,
        title: p.title,
        description: p.description,
        author: p.author ?? 'Grupo Mizar',
        frente: p.frente ?? '',
        tags: (p.tags ?? '').split(',').map((t) => t.trim()).filter(Boolean),
        pubDate: pub,
        modDate: new Date(p.updatedAt ?? p.pub_date).toISOString(),
        strapi: p,
      };
    });
  } catch (e) {
    console.warn('[blog] No se pudieron leer los artículos de Strapi (se sigue solo con los archivos):', e);
    return [];
  }
}

async function fromFiles(): Promise<BlogItem[]> {
  const entries = await getCollection('blog', (e) => !e.data.draft);
  return entries.map((entry) => {
    const d = entry.data;
    return {
      slug: d.slug ?? entry.id,
      title: d.title,
      description: d.description,
      author: d.author,
      frente: d.frente,
      tags: d.tags,
      pubDate: d.pub_date.toISOString(),
      modDate: (d.updated ?? d.pub_date).toISOString(),
      file: entry,
    };
  });
}

let cache: Promise<BlogItem[]> | undefined;

/** Todos los artículos publicables, el más reciente primero. */
export function getAllPosts(): Promise<BlogItem[]> {
  cache ??= (async () => {
    const [files, strapi] = await Promise.all([fromFiles(), fromStrapi()]);
    const bySlug = new Map<string, BlogItem>();
    for (const p of strapi) bySlug.set(p.slug, p);
    for (const p of files) bySlug.set(p.slug, p); // el archivo gana
    // Un archivo en borrador retira el artículo aunque Strapi tenga una copia con la misma dirección.
    const drafts = await getCollection('blog', (e) => e.data.draft);
    for (const e of drafts) bySlug.delete(e.data.slug ?? e.id);
    return [...bySlug.values()].sort((a, b) => b.pubDate.localeCompare(a.pubDate));
  })();
  return cache;
}
