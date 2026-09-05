import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const sourceSchema = z.object({
  authority: z.string().min(1),
  title: z.string().min(1),
  url: z.url(),
  reviewedAt: z.coerce.date(),
});

/** A bilingual block of prose. Both locales must carry the same meaning. */
const bilingualProse = z.object({
  title: z.string().min(1),
  titleEn: z.string().min(1),
  body: z.string().min(1),
  bodyEn: z.string().min(1),
  sourceUrls: z.array(z.url()).min(1),
});

/**
 * Extra structure that only `deep` coverage carries. Every consequential number
 * is dated and individually sourced, and unresolved disagreements between
 * official sources are published rather than silently resolved.
 */
const deepCoverageSchema = z.object({
  scope: z.string().min(1),
  scopeEn: z.string().min(1),
  steps: z.array(bilingualProse).min(1),
  keyFacts: z.array(z.object({
    label: z.string().min(1),
    labelEn: z.string().min(1),
    value: z.string().min(1),
    valueEn: z.string().min(1),
    /** The year or period the figure applies to, so a stale number is visible. */
    appliesTo: z.string().min(1),
    sourceUrl: z.url(),
    reviewedAt: z.coerce.date(),
  })).min(1),
  blockers: z.array(z.object({
    summary: z.string().min(1),
    summaryEn: z.string().min(1),
    sourceUrls: z.array(z.url()).min(1),
  })).min(1),
  /** Documented conflicts between official sources. See CONTENT_GUIDELINES.md. */
  sourceConflicts: z.array(z.object({
    summary: z.string().min(1),
    summaryEn: z.string().min(1),
    sourceUrls: z.array(z.url()).min(2),
  })).default([]),
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
    deepCoverage: deepCoverageSchema.optional(),
  }).superRefine((country, ctx) => {
    // The coverage label is a promise to the reader, so it has to match the data.
    if (country.coverage === "deep" && !country.deepCoverage) {
      ctx.addIssue({ code: "custom", path: ["deepCoverage"], message: "coverage 'deep' requires a deepCoverage block" });
    }
    if (country.coverage !== "deep" && country.deepCoverage) {
      ctx.addIssue({ code: "custom", path: ["deepCoverage"], message: "deepCoverage is only allowed when coverage is 'deep'" });
    }
  }),
});

const requirementSchema = z.object({
  status: z.enum(["required", "not-required", "conditional", "unknown"]),
  summary: z.string().min(1),
  summaryEn: z.string().min(1),
  sourceUrls: z.array(z.url()).min(1),
});

export const programSchema = z.object({
  name: z.string().min(1),
  nameEn: z.string().min(1),
  countryId: z.string().min(1),
  category: z.enum(["skilled-work", "work", "study", "business", "family", "other"]),
  status: z.enum(["active", "paused", "closed", "uncertain"]),
  coverage: z.enum(["overview", "deep"]),
  summary: z.string().min(1),
  summaryEn: z.string().min(1),
  requirements: z.record(z.string(), requirementSchema),
  sources: z.array(sourceSchema).min(1),
  reviewedAt: z.coerce.date(),
  nextReviewAt: z.coerce.date(),
  disclaimer: z.string().min(1),
});

const programs = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/data/programs" }),
  schema: programSchema,
});

export const collections = { countries, programs };
