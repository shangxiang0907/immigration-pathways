# Website Factory project entry

This directory is the repository-local operating manual for **Immigration Pathways** at <https://pathwaystoabroad.com>. It is plain Markdown so decisions can be changed during development without reinstalling or reloading a skill.

## Read in this order

1. `PROJECT_BRIEF.md` — audience, product boundaries, language, and business model.
2. `DEVELOPMENT_PLAN.md` — architecture and implementation sequence.
3. `PROGRESS.md` — current state, blockers, and the next approved work.
4. `CONTENT_GUIDELINES.md` — rules for immigration facts and localization.
5. `QUALITY_CHECKLIST.md` — batch and pre-release verification.
6. `RELEASE_CHECKLIST.md` — mandatory order for domain, contact, Search Console, sitemap, QA, indexing, and advertising.

## Operating rules

- `site.config.mjs` remains the source of truth for public identity, URL, locales, navigation, and advertising switches.
- English is the default at root URLs. Chinese is served under `/zh/`; browser language may affect only a first visit, and an explicit user choice wins.
- Keep one shared, versioned applicant profile and one generic matcher. Country differences belong in structured data, not separate questionnaires.
- Immigration facts are high-impact and time-sensitive. Use authoritative government sources, retain the URL and review date, and never invent missing facts.
- Keep previews non-indexable. External publication and account changes require explicit owner authorization.
- Update `PROGRESS.md` in the same change that materially advances or blocks the plan.

The old Website Factory plugin workflow is intentionally not used by this repository.
