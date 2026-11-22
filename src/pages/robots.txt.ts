import type { APIRoute } from 'astro';

// The preview site tells search engines to stay away; the real site welcomes them.
export const GET: APIRoute = ({ site }) => {
  const preview = import.meta.env.PUBLIC_PREVIEW === 'true';
  const sitemap = new URL(import.meta.env.BASE_URL.replace(/\/?$/, '/') + 'sitemap-index.xml', site).href;
  const body = preview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
