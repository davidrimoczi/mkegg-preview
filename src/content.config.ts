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
    author: z.string().default('David'),
    date: z.preprocess(toBudapestDate, z.date()),
    // Set only when a story changes meaningfully after publishing (shown as "Updated").
    updated: z.preprocess((v) => (v === '' || v == null ? undefined : toBudapestDate(v)), z.date().optional()),
    readTime: z.number().int().positive().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCredit: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
