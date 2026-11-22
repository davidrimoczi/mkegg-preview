import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
    label: z.enum(['Confirmed', 'Report', 'Opinion', 'Rumour']).optional(),
    league: z.enum(['LEC', 'LCK', 'LPL', 'LCS', 'International', 'Other']).default('LEC'),
    author: z.string().default('David'),
    date: z.coerce.date(),
    readTime: z.number().int().positive().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCredit: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
