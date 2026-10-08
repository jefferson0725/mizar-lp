/**
 * Lógica compartida de la ficha de un artículo del blog.
 *
 * La usan la página estática /blog/[slug]/ (al compilar) y la vista previa de borradores
 * (Cloudflare Pages Function en site/functions/vista-previa/), para que ambas muestren
 * exactamente lo mismo. Sin dependencias de Astro ni de Node: corre en los dos entornos.
 */
import { renderBlocks } from './renderBlocks';

export interface HeroImage {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface Post {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  description: string;
  content: unknown[];
  author: string;
  frente: string;
  tags: string;
  hero_image: (HeroImage & { formats?: Record<string, HeroImage> }) | null;
  pub_date: string;
  publishedAt: string;
  updatedAt: string;
}

/** Datos ya listos para pintar la ficha (componente ArticleView). */
export interface ArticleView {
  eyebrow: string;
  title: string;
  description: string;
  /** "8 de octubre de 2026 · Grupo Mizar" */
  meta: string;
  heroUrl: string | null;
  heroAlt: string;
  /** HTML del cuerpo (bloques de Strapi ya convertidos y escapados) */
  contentHtml: string;
}

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC', // pub_date es solo fecha: sin esto, compilar en Colombia la corre un día
  }).format(new Date(date));

/** URL de la imagen principal. Se usa la versión grande (~1000 px): la original puede pesar varios MB. */
export function heroUrlOf(post: Post, strapiUrl: string): string | null {
  const heroSrc = post.hero_image?.formats?.large?.url ?? post.hero_image?.url;
  if (!heroSrc) return null;
  return heroSrc.startsWith('http') ? heroSrc : `${strapiUrl}${heroSrc}`;
}

export function toArticleView(post: Post, strapiUrl: string): ArticleView {
  return {
    eyebrow: post.frente?.replace(/-/g, ' ') ?? '',
    title: post.title,
    description: post.description,
    meta:
      (post.pub_date ? formatDate(post.pub_date) : '') +
      (post.pub_date ? ' · ' : '') +
      (post.author ?? 'Grupo Mizar'),
    heroUrl: heroUrlOf(post, strapiUrl),
    heroAlt: post.hero_image?.alternativeText || post.title,
    // Bloques JSON de Strapi → HTML
    contentHtml: renderBlocks((post.content ?? []) as Parameters<typeof renderBlocks>[0]),
  };
}
