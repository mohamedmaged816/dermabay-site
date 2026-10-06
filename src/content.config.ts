import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faq = z.object({ q: z.string(), a: z.string() });
const lang = z.enum(['en', 'ar']);

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({
    lang,
    slug: z.string(),
    order: z.number(),
    title: z.string(),
    metaTitle: z.string(),
    description: z.string().max(170),
    summary: z.string(),
    icon: z.enum(['laser', 'scar', 'drop', 'sun', 'lift', 'acne', 'hair', 'sparkle']),
    forWho: z.array(z.string()),
    notFor: z.array(z.string()).default([]),
    session: z.array(z.string()),
    downtime: z.string(),
    results: z.string(),
    sessions: z.string(),
    price: z.string().optional(),
    faqs: z.array(faq).min(5),
    related: z.array(z.string()).default([]),
  }),
});

const guide = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guide', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({
    lang,
    slug: z.string(),
    title: z.string(),
    description: z.string().max(170),
    summary: z.string(),
    date: z.coerce.date(),
    service: z.string().optional(),
    faqs: z.array(faq).default([]),
  }),
});

export const collections = { services, guide };
