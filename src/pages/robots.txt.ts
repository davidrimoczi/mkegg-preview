import type { APIRoute } from 'astro';

// The preview site tells search engines to stay away; the real site welcomes them.
export const GET: APIRoute = () => {
  const preview = import.meta.env.PUBLIC_PREVIEW === 'true';
  const body = preview ? 'User-agent: *\nDisallow: /\n' : 'User-agent: *\nAllow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
