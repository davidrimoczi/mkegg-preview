import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { toBudapestDate } from './lib/dates';

// Every article is one Markdown file in src/content/articles/.
// The Pages CMS editor (.pages.yml) writes the same fields.
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    standfirst: z.string(),
    // What kind of story it is
    kind: z.enum(['News', 'Feature', 'Interview', 'Analysis', 'Opinion']),
    // How solid the reporting is (M/KE editorial standards)
    // 'None' (or empty) means no label: the story shows just its kind and date.
    label: z.enum(['None', 'Confirmed', 'Report', 'Opinion', 'Rumour']).optional().nullable()
      .transform((v) => (v && v !== 'None' ? v : undefined)),
    league: z.enum(['LEC', 'LCK', 'LPL', 'LCS', 'First Stand', 'MSI', 'Worlds', 'Other']).default('LEC'),
    author: z.string().default('Damilosk'),
    date: z.preprocess(toBudapestDate, z.date()),
    // Set only when a story changes meaningfully after publishing (shown as "Updated").
    updated: z.preprocess((v) => (v === '' || v == null ? undefined : toBudapestDate(v)), z.date().optional()),
    readTime: z.number().int().positive().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCredit: z.string().optional(),
    // Free tags, e.g. ['LEC', 'Carzzy', 'Movistar KOI']. Each becomes a clickable page.
    tags: z.array(z.string()).nullable().optional().transform((t) => (t ?? []).map((x) => x.trim()).filter(Boolean)),
    featured: z.boolean().default(false),
    // Roster cards to show in the article (picked from Teams in the editor).
    // The editor stores the team file's path; we keep just its name, e.g. 'dplus-kia-2027'.
    rosters: z.array(z.string()).nullable().optional()
      .transform((r) => (r ?? []).map((x) => x.split('/').pop()!.replace(/\.ya?ml$/, '')).filter(Boolean)),
    draft: z.boolean().default(false),
  }),
});

// Team rosters for the roster card in articles. One YAML file per team and season.
const teams = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/teams' }),
  schema: z.object({
    name: z.string(),
    league: z.enum(['LEC', 'LCK', 'LPL', 'LCS', 'Other']).default('LEC'),
    season: z.coerce.string().default('2027'),
    coach: z.string().nullable().optional(),
    players: z.array(z.object({
      role: z.enum(['Top', 'Jungle', 'Mid', 'ADC', 'Support', 'Sub']),
      name: z.string(),
      realName: z.string().nullable().optional(),
      note: z.string().nullable().optional(),
      isNew: z.boolean().nullable().optional(),
    })).default([]),
  }),
});

export const collections = { articles, teams };
