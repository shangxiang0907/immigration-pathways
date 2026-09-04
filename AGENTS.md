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

## Website Factory Markdown routing

- Read `.website-factory/START_HERE.md` before planning or changing the site.
- Use `.website-factory/PROJECT_BRIEF.md` for product scope and decisions.
- Use `.website-factory/DEVELOPMENT_PLAN.md` for implementation order.
- Update `.website-factory/PROGRESS.md` whenever a milestone or release gate changes.
- Follow `.website-factory/CONTENT_GUIDELINES.md` for factual content work.
- Run `.website-factory/QUALITY_CHECKLIST.md` at coherent batch boundaries.
- Follow `.website-factory/RELEASE_CHECKLIST.md` in order for external release work;
  later steps never imply authorization for earlier or external account actions.
- These repository-local Markdown files are the working source. Do not depend on
  Website Factory skills or copy a second `AGENTS.md` into this repository.
