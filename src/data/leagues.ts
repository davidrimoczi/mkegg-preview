// The competitions M/KE covers, and what each hub page shows.
// Fill in `schedule` and `standings` as Riot publishes them; empty lists show a friendly note.
// Only put a `start` date here once it's officially confirmed.

export type Match = { day: string; a: string; b: string; time: string };
export type Standing = { team: string; w: number; l: number };

export type League = {
  slug: string;          // URL: /lec/
  name: string;          // LEC
  full: string;          // League of Legends EMEA Championship
  badge: string;         // region shown in the slanted badge
  status: string;        // one line under the name in the Leagues panel
  blurb: string;         // standfirst on the hub page
  start?: Date;          // confirmed start, drives the countdown
  schedule: Match[];
  standings: Standing[];
};

export const LEAGUES: League[] = [
  {
    slug: 'lec', name: 'LEC', full: 'League of Legends EMEA Championship', badge: 'EMEA',
    status: 'Winter · from 15 January',
    blurb: 'News, interviews and analysis from Europe\'s top league, starting with the 2027 Winter Split.',
    start: new Date('2027-01-15T00:00:00+01:00'),
    schedule: [], standings: [],
  },
  {
    slug: 'lck', name: 'LCK', full: 'League of Legends Champions Korea', badge: 'KR',
    status: '2027 season · dates TBA',
    blurb: 'The biggest stories from Korea\'s top league.',
    schedule: [], standings: [],
  },
  {
    slug: 'lpl', name: 'LPL', full: 'League of Legends Pro League', badge: 'CN',
    status: '2027 season · dates TBA',
    blurb: 'The biggest stories from China\'s top league.',
    schedule: [], standings: [],
  },
  {
    slug: 'lcs', name: 'LCS', full: 'League Championship Series', badge: 'NA',
    status: '2027 season · dates TBA',
    blurb: 'The biggest stories from North America\'s top league.',
    schedule: [], standings: [],
  },
  {
    slug: 'first-stand', name: 'First Stand', full: 'First Stand', badge: 'INT',
    status: '2027 · dates TBA',
    blurb: 'Riot\'s first international event of the year.',
    schedule: [], standings: [],
  },
  {
    slug: 'msi', name: 'MSI', full: 'Mid-Season Invitational', badge: 'INT',
    status: '2027 · dates TBA',
    blurb: 'The mid-season clash of the world\'s best teams.',
    schedule: [], standings: [],
  },
  {
    slug: 'worlds', name: 'Worlds', full: 'League of Legends World Championship', badge: 'INT',
    status: '2027 · dates TBA',
    blurb: 'The biggest event of the year.',
    schedule: [], standings: [],
  },
];

export const leagueBySlug = (slug: string) => LEAGUES.find((l) => l.slug === slug);
export const leagueByName = (name: string) => LEAGUES.find((l) => l.name === name);
