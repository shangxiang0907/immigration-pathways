import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const sourceSchema = z.object({
  authority: z.string().min(1),
  title: z.string().min(1),
  url: z.url(),
  reviewedAt: z.coerce.date(),
});

const countries = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/data/countries" }),
  schema: z.object({
    name: z.string().min(1),
    nameEn: z.string().min(1),
    region: z.enum(["Africa", "Americas", "Asia", "Europe", "Oceania"]),
    coverage: z.enum(["directory", "overview", "deep"]),
    summary: z.string().min(1),
    summaryEn: z.string().min(1),
    reviewedAt: z.coerce.date(),
    sources: z.array(sourceSchema).min(1),
  }),
});

const requirementSchema = z.object({
  status: z.enum(["required", "not-required", "conditional", "unknown"]),
  summary: z.string().min(1),
  sourceUrls: z.array(z.url()).min(1),
});

export const programSchema = z.object({
  name: z.string().min(1),
  countryId: z.string().min(1),
  category: z.enum(["skilled-work", "work", "study", "business", "family", "other"]),
  status: z.enum(["active", "paused", "closed", "uncertain"]),
  coverage: z.enum(["overview", "deep"]),
  summary: z.string().min(1),
  requirements: z.record(z.string(), requirementSchema),
  sources: z.array(sourceSchema).min(1),
  reviewedAt: z.coerce.date(),
  nextReviewAt: z.coerce.date(),
  disclaimer: z.string().min(1),
});

export const collections = { countries };
