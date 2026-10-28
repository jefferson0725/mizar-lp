import { getImage } from 'astro:assets';

/**
 * Foto para compartir (og:image): 1200x630 recortada y en JPG, porque WhatsApp no
 * siempre lee webp. Devuelve la ruta; Base y LandingReact la vuelven URL absoluta.
 */
export async function ogImagen(src: ImageMetadata): Promise<string> {
  const img = await getImage({ src, width: 1200, height: 630, fit: 'cover', format: 'jpg' });
  return img.src;
}
