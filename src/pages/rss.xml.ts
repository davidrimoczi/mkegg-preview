import { authorByName } from '../data/authors';
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { articles, url } from '../lib/site';

// The M/KE feed: used by Google News, aggregators and readers' apps.
export async function GET(context: APIContext) {
  const items = (await articles()).slice(0, 50);
  return rss({
    title: 'M/KE',
    description: 'News. Interviews. Stories. Independent esports media, beyond the game.',
    site: new URL(url('/'), context.site!).href,
    items: items.map((a) => ({
      title: a.data.title,
      description: a.data.standfirst,
      pubDate: a.data.date,
      link: url(`/articles/${a.id}/`),
      categories: [a.data.league, a.data.kind],
      author: `contact@mkegg.com (${authorByName(a.data.author)?.name ?? a.data.author})`,
    })),
    customData: '<language>en</language>',
  });
}
