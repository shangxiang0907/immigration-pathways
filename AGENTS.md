# Project guidance

- This is the Immigration Pathways content website.
- Purpose: A multilingual immigration information platform for comparing country requirements and delivering in-depth reports.
- Treat `site.config.mjs` as the source of truth for identity, public URL, locale, and navigation.
- Keep preview builds non-indexable. Publication, DNS, analytics, advertising, and indexing require explicit owner authorization.
- Preserve source URLs or equivalent attribution metadata for factual published content.
- Do not fabricate current facts, prices, legal claims, medical claims, statistics, or citations.
- Immigration requirements are time-sensitive and high-impact. Verify eligibility,
  fees, quotas, processing rules, and deadlines against authoritative government
  sources, and retain the source URL and review date with the content.
- Clearly distinguish general educational information from personalized legal advice.
- Paid reports may organize and explain verified public information, but payments,
  checkout, subscriptions, user accounts, and report delivery require explicit owner
  authorization before implementation or external configuration.
- Run `npm run check` and `npm run build` after site or template changes.

## Website Factory skill routing

- When initializing or substantially restructuring the site, use
  `website-factory:website-bootstrap`.
- When researching, drafting, or implementing an approved batch of country,
  immigration-program, visa, requirement, or comparison pages, use
  `website-factory:website-content-batch`.
- Before completing a coherent page batch or preparing a release, use
  `website-factory:website-quality-review`.
- Use the installed Website Factory plugin as the source of these reusable skills.
  Do not copy plugin skill directories into this repository.
