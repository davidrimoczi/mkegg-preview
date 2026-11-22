import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

/** Link to a page on this site, working on both mkegg.com and the preview URL. */
export const url = (path = '/') => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : '/' + path}`;
};

export const IS_PREVIEW = import.meta.env.PUBLIC_PREVIEW === 'true';

export const LAUNCH = new Date('2027-01-03T23:00:00Z'); // 4 Jan 2027, 00:00 CET
export const LEC_WINTER_START = new Date('2027-01-15T00:00:00+01:00');

/** Published articles, newest first. Drafts show only on the preview site. */
export async function articles(): Promise<Article[]> {
  const all = await getCollection('articles', ({ data }) => IS_PREVIEW || !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const articleUrl = (a: Article) => url(`/articles/${a.id}/`);

export function fmtDate(d: Date) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Budapest' });
}

/** Short date for lists, e.g. "22 Nov". The site is static, so no "2h ago". */
export function ago(d: Date) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'Europe/Budapest' });
}
