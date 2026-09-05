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

## Working with both Codex and Claude Code

This repository is worked on from more than one coding agent. Keep one set of
conventions rather than one per tool.

- `AGENTS.md` is the single source of truth. `CLAUDE.md` is a symlink to it.
  Edit `AGENTS.md` only; never let the two files diverge into real copies.
- Skills live in `.agents/skills/<name>/SKILL.md`. `.claude/skills` is a symlink
  to `.agents/skills`, so both tools load the same skill files. Add new skills
  only under `.agents/skills/`.
- `.website-factory/` Markdown is the shared working source for scope, plan,
  progress, content rules, and release gates. Update it from either tool.
- Tool-specific configuration is not shared and is not a place for project
  rules: Codex reads `~/.codex/config.toml`, Claude Code reads
  `.claude/settings.json` and the Git-ignored `.claude/settings.local.json`.
- Both tools follow the same commit convention: a concise English subject, a
  blank line, then the equivalent Chinese. See `.agents/skills/git-commits/`.
- Both tools verify the same way before committing: `npm test`,
  `npm run check`, `npm run build`, and `npm run test:dist`.
- Symlinks must survive checkout. Clone on Linux, macOS, or WSL, or enable
  `git config core.symlinks true` on Windows.
