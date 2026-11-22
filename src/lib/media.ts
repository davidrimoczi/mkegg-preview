import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

// Photos uploaded in the editor are stored in src/assets/media and referenced as "/media/<file>".
// Keeping them in src/assets lets the build shrink them and convert them to modern formats.
const MEDIA = import.meta.glob<{ default: ImageMetadata }>('/src/assets/media/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP}');

export async function mediaMeta(src?: string): Promise<ImageMetadata | undefined> {
  if (!src || !src.startsWith('/media/')) return undefined;
  const load = MEDIA['/src/assets/media/' + src.slice('/media/'.length)];
  return load ? (await load()).default : undefined;
}

/** Responsive, compressed versions of an uploaded photo for use in <img srcset>. */
export async function responsive(src?: string) {
  const meta = await mediaMeta(src);
  if (!meta) return undefined;
  const widths = [480, 800, 1200, 1600].filter((w) => w <= meta.width);
  if (!widths.length) widths.push(meta.width);
  return getImage({ src: meta, widths, format: 'webp', quality: 78 });
}

/** A 1200px JPEG for social cards and Google (path already includes the site base). */
export async function socialImage(src?: string): Promise<string | undefined> {
  const meta = await mediaMeta(src);
  if (!meta) return undefined;
  const img = await getImage({ src: meta, width: Math.min(1200, meta.width), format: 'jpeg', quality: 80 });
  return img.src;
}
