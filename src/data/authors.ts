// Author profiles. Google gives a lot of weight to who wrote a news story,
// so every byline links to a page like this.

export type Author = { slug: string; name: string; role: string; bio: string; links: { label: string; href: string }[] };

export const AUTHORS: Author[] = [
  {
    slug: 'david',
    name: 'David',
    role: 'Founder and editor',
    bio: 'David founded M/KE after six years in Hungarian esports journalism and shoutcasting. He covers the LEC, the wider League of Legends scene, and the players and staff from Central and Eastern Europe whose stories often go untold.',
    links: [
      { label: 'X', href: 'https://x.com/mkeggcom' },
      { label: 'Email', href: 'mailto:contact@mkegg.com' },
    ],
  },
];

export const authorByName = (name: string) =>
  AUTHORS.find((a) => a.name.toLowerCase() === name.trim().toLowerCase());
